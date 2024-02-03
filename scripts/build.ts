import { walk } from "https://deno.land/std/fs/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

type Entry = {
  path: string,
  title: string,
  date: string
}

const entries: Entry[] = []

const addToTree = async (path: string) => {
  for await (const entry of walk(path)) {
    if (entry.isFile && entry.name.endsWith('.html')) {
      // eg: 2023/01/01/index.html
      const [date] = entry.path.split('/index.html')
      const file = await Deno.readTextFile(entry.path)
      const document = new DOMParser().parseFromString(file, "text/html")
      entries.push({
        date,
        title: document.title,
        path: entry.path,
      })
    }
  }
}

await addToTree('2023')
await addToTree('2024')

// sort by date
entries.sort((a, b) => a.date.localeCompare(b.date))

const document = new DOMParser().parseFromString(
  `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>odad</title>
      <style>
        body {
          font-family: monospace;
        }
      </style>
    </head>
    <body>
      <h1>One Document A Day (ODAD)</h1>
    </body>
  </html>`,
  "text/html"
)


const ul = document.createElement('ul')

for (const { date, title, path } of entries) {
  const li = document.createElement('li')
  const a = document.createElement('a')
  a.textContent = `${date} - ${title}`
  // set attribute - href does not work
  a.setAttribute('href', path)
  li.appendChild(a)
  ul.appendChild(li)
}

document.body.appendChild(ul)

// write the file
await Deno.writeTextFile('index.html', document.documentElement.outerHTML)
