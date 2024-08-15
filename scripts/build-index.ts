import { walk } from "https://deno.land/std/fs/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { parse } from "https://deno.land/std@0.207.0/yaml/mod.ts";

type Keyword = 'poem' | 'data'

type Entry = {
  path: string,
  title: string,
  date: string
  keywords: Keyword[]
}

// this is a subset of what the new-context.yml contains
type Context = {
  id: string
  title: string
  url: string
  type: string
  archive_url: string | null
  language: string
}

const entries: Entry[] = []
const context: [string, Context[]][] = []

const addToTree = async (path: string) => {
  for await (const entry of walk(path)) {
    if (entry.isFile && entry.name.endsWith('.html')) {
      // eg: 2023/01/01/index.html
      const [date] = entry.path.split('/index.html')
      const file = await Deno.readTextFile(entry.path)
      const keywords = file.match(/<meta name="keywords" content="(.*?)">/)?.[1]?.split(",") || [];
      const document = new DOMParser().parseFromString(file, "text/html");
      entries.push({
        date,
        keywords: keywords as Keyword[],
        title: document?.title || 'untitled',
        path: entry.path,
      })
    }

    if (entry.isFile && entry.name.endsWith('.yml')) {
      // eg: 2024/03/04/context/1709554621.yml
      const id = entry.path.split('/context/')[1].split('.yml')[0]
      const [date] = entry.path.split('/context')
      // read yml file
      const file = await Deno.readTextFile(entry.path)
      // parse yml
      const data = parse(file) as Partial<Context>

      if (!data?.title || !data?.url || !data?.type || !data?.language) {
        throw new Error(`Invalid context file: ${entry.path}`)
      }

      const newContext = {
        id,
        title: data.title,
        url: data.url,
        type: data.type,
        language: data.language,
        archive_url: data.archive_url || null,
      }

      // find if the date already exists in the list  of context
      const index = context.findIndex(([key]) => key === date)
      if (index === -1) {
        context.push([date, [newContext]])
      } else {
        context[index][1].push(newContext)
      }
    }
  }
}

await addToTree('2023')
await addToTree('2024')

// sort by date, descending
entries.sort((a, b) => {
  return a.date > b.date ? -1 : 1
})

// sort context by date, descending
context.sort((a, b) => {
  return a[0] > b[0] ? -1 : 1
})

const odadDocument = new DOMParser().parseFromString(await Deno.readTextFile("./scripts/templates/index-document.html"), "text/html")
const contextDocument = new DOMParser().parseFromString(await Deno.readTextFile("./scripts/templates/context-document.html"), "text/html")

if (!odadDocument || !contextDocument) {
  throw new Error('Could not create document')
}

/**
 * =============
 * Create the index.html file
 * =============
 */

const createOdad = async () => {
  const table = odadDocument.querySelector('table')
  const thead = odadDocument.createElement('thead')
  const tbody = odadDocument.createElement('tbody')
  const headerRow = odadDocument.createElement('tr')

  const headers = [
    {
      label: 'num',
      width: '3ch'
    },
    {
      label: 'date',
      width: '8ch'
    },
    {
      label: 'title',
    },
    {
      label: 'type',
      width: '4ch'
    },
  ]

  const legendMap: Record<Keyword, string> = {
    visual: 'vis.',
    poem: 'poem',
    data: 'data'
  }

  // ADD HEADERS
  for (const header of headers) {
    const th = odadDocument.createElement('th')
    th.textContent = header.label

    if (header.width){
      th.setAttribute('style', `width: ${header.width}`)
    }

    headerRow.appendChild(th)
  }

  // APPEND HEADERS
  thead.appendChild(headerRow)

  let num = entries.length;

  for (const { date, title, path, keywords } of entries) {
      const tr = odadDocument.createElement('tr')
      tr.id = `${num}`
      // NUM
      const numCell = odadDocument.createElement('td')
      numCell.textContent = `${num}`
      tr.appendChild(numCell)
      // DATE
      const dateCell = odadDocument.createElement('td')
      const formattedDate = new Date(date)
      const formattedDateString = formattedDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
      })
      dateCell.textContent = formattedDateString
      dateCell.setAttribute('style', 'text-align: center;')
      tr.appendChild(dateCell)
      // TITLE
      const titleCell = odadDocument.createElement('td')
      const a = odadDocument.createElement('a')
      a.textContent = 'link'
      a.setAttribute('href', path)
      a.textContent = title
      titleCell.appendChild(a)
      tr.appendChild(titleCell)
      // TYPE
      const typeCell = odadDocument.createElement('td')
      typeCell.textContent = keywords.map(k => legendMap[k]).join(' ') || 'n/a'
      tr.appendChild(typeCell)
      tbody.appendChild(tr)
      // decrement num
      num--
  }

  table?.appendChild(thead)
  table?.appendChild(tbody)

  const outerHTML = odadDocument.documentElement?.outerHTML

  if (!outerHTML) {
    throw new Error('Could not create outerHTML')
  }

  await Deno.writeTextFile('index.html', outerHTML)
  console.log('🎉 Created index.html')
}



/**
 * =============
 * Create the context.html file
 * =============
 */
const makeContext = async () => {
  const table = contextDocument.querySelector('table')
  const thead = contextDocument.createElement('thead')
  const tbody = contextDocument.createElement('tbody')
  const headerRow = contextDocument.createElement('tr')

  const headers = [
    {
      label: '',
      width: '2ch',
    },
    {
      label: 'title (link)',
    },
    {
      label: '',
      width: '3ch'
    }
  ]

  for (const header of headers) {
    const th = contextDocument.createElement('th')
    th.textContent = header.label
    if (header.width){
      th.setAttribute('style', `width: ${header.width}`)
    }
    headerRow.appendChild(th)
  }

  thead.appendChild(headerRow)

  const typeMap = {
    'podcast': '🎧',
    'video': '📺',
    'article': '📰',
  } as Record<string, string>

  const languageMap = {
    'english': '🇺🇸',
    'swiss-german': '🇨🇭',
    'german': '🇩🇪',
    'dutch': '🇳🇱',
  } as Record<string, string>

  for (const [_date, contexts] of context) {
    // add the title and original url as anchor tags
    for (const { title, url, archive_url, type, id, language } of contexts) {
      const tr = contextDocument.createElement('tr')
      tr.id = id
      // TYPE
      const typeCell = contextDocument.createElement('td')
      typeCell.textContent = `${typeMap[type]}`
      // add style no wrap
      typeCell.setAttribute('style', 'text-align: center;')
      tr.appendChild(typeCell)
      // TITLE
      const titleCell = contextDocument.createElement('td')
      const titleLink = contextDocument.createElement('a')
      titleLink.textContent = title
      titleLink.setAttribute('href', url)
      titleCell.appendChild(titleLink)
      tr.appendChild(titleCell)
      // ARCHIVE LINK
      const archiveLinkCell = contextDocument.createElement('td')
      const altA = contextDocument.createElement('a')
      altA.textContent = archive_url ? 'alt' : ''
      altA.setAttribute('href', archive_url || '')
      archiveLinkCell.setAttribute('style', 'text-align: center;')
      archiveLinkCell.appendChild(altA)
      tr.appendChild(archiveLinkCell)
      tbody.appendChild(tr)
    }
  }

  table?.appendChild(thead)
  table?.appendChild(tbody)

  await Deno.writeTextFile('context.html', contextDocument.documentElement?.outerHTML || '')
  console.log('🎉 Created context.html')
}


await createOdad()
await makeContext()
