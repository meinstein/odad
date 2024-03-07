import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";
import { validateDate } from "./common.ts";

const flags = parseArgs(Deno.args, {
  string: ["date"],
});

if (!flags.date) {
  throw new Error("Missing date flag")
}

validateDate(flags.date)

const path = `./${flags.date}`
const filePath = `${path}/index.html`

try {
  // throws if file path does not exist
  await Deno.stat(filePath)
  console.log(`🚨 ${flags.date} already exists`)
} catch {
  await Deno.mkdir(path, { recursive: true })
  const template = await Deno.readTextFile("./scripts/templates/new-document.html")
  await Deno.writeTextFile(filePath, template)
  console.log(`🎉 Created ${flags.date}`)
}

