import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";
import { validateDate } from "./common.ts";

const flags = parseArgs(Deno.args, {
  string: ["date"],
});

if (!flags.date) {
  throw new Error("Missing date flag")
}

validateDate(flags.date)

const id = Math.floor(Date.now() / 1000)
const path = `./${flags.date}/context`
const filePath = `${path}/${id}.yml`

// create path
await Deno.mkdir(path, { recursive: true })
// load template
const template = await Deno.readTextFile("./scripts/new-context-template.yml")
// write file to path
await Deno.writeTextFile(filePath, template)
console.log(`🎉 Created new context ${flags.date}`)

