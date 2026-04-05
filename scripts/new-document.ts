import { parseArgs } from "@std/cli"
import { validateDate } from "./common.ts";
import { createOdad } from "./build-index.ts";

const flags = parseArgs(Deno.args, {
  string: ["date"],
});

if (!flags.date) {
  throw new Error("Missing date flag")
}

validateDate(flags.date)

const path = `./${flags.date}`
const filePath = `${path}/index.html`

// NOTE: the following try/catch is counter-intuitive
try {
  // Deno.stat throws an error if the file doesn't exist
  await Deno.stat(filePath)
  // If it doesn't throw an error, the file exists
  console.log(`🚨 ${flags.date} already exists`)
} catch {
  // If it throws an error, the file doesn't exist and we can create it
  await Deno.mkdir(path, { recursive: true })
  const template = await Deno.readTextFile("./scripts/templates/new-document.html")
  await Deno.writeTextFile(filePath, template)
  console.log(`🎉 Created ${flags.date}`)
  // Create the index.html file
  await createOdad()
}

