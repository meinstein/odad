import { walk } from "https://deno.land/std/fs/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { parse } from "https://deno.land/std@0.207.0/yaml/mod.ts";

type Entry = {
  path: string,
  title: string,
  date: string
}

// this is a subset of what the new-context-template.yml contains
type Context = {
  title: string
  original_url: string
}

const entries: Entry[] = []
const context: [string, Context[]][] = []

const addToTree = async (path: string) => {
  for await (const entry of walk(path)) {
    if (entry.isFile && entry.name.endsWith('.html')) {
      // eg: 2023/01/01/index.html
      const [date] = entry.path.split('/index.html')
      const file = await Deno.readTextFile(entry.path)
      const document = new DOMParser().parseFromString(file, "text/html")
      entries.push({
        date,
        title: document?.title || 'untitled',
        path: entry.path,
      })
    }

    if (entry.isFile && entry.name.endsWith('.yml')) {
      // eg: 2024/03/04/context/1709554621.yml
      const [date] = entry.path.split('/context')
      // read yml file
      const file = await Deno.readTextFile(entry.path)
      // parse yml
      const data = parse(file) as Partial<Context>

      if (!data?.title || !data?.original_url) {
        throw new Error(`Invalid context file: ${entry.path}`)
      }

      const newContext = {
        title: data.title,
        original_url: data.original_url
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

const document = new DOMParser().parseFromString(await Deno.readTextFile("./scripts/index-document-template.html"), "text/html")
const contextDocument = new DOMParser().parseFromString(await Deno.readTextFile("./scripts/context-document-template.html"), "text/html")

if (!document || !contextDocument) {
  throw new Error('Could not create document')
}

/**
 * Create the index.html file
 */
const ul = document.createElement('ul')

for (const { date, title, path } of entries) {
  const li = document?.createElement('li')
  const a = document?.createElement('a')

  a.textContent = `${date} - ${title}`
  // set attribute - href does not work
  a.setAttribute('href', path)
  li.appendChild(a)
  ul.appendChild(li)
}

document.body.appendChild(ul)

const outerHTML = document.documentElement?.outerHTML

if (!outerHTML) {
  throw new Error('Could not create outerHTML')
}

// write the file
await Deno.writeTextFile('index.html', outerHTML)
console.log('🎉 Created index.html')


/**
 * Create the context.html file
 */
for (const [date, contexts] of context) {
  const div = contextDocument.createElement('div')
  const p = contextDocument.createElement('p')
  p.textContent = date
  const ul = document.createElement('ul')
  // add the title and original url as anchor tags
  for (const { title, original_url } of contexts) {
    const li = contextDocument.createElement('li')
    const a = contextDocument.createElement('a')
    a.textContent = title
    a.setAttribute('href', original_url)
    li.appendChild(a)
    ul.appendChild(li)
  }
  div.appendChild(p)
  div.appendChild(ul)
  contextDocument.body.appendChild(div)
}

// write the file
await Deno.writeTextFile('context.html', contextDocument.documentElement?.outerHTML || '')

