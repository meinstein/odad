import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";
import { validateDate } from "./common.ts";

const validTypes = ["article", "podcast", "video"]

const flags = parseArgs(Deno.args, {
  string: ["date", "type"],
});

if (!flags.date || !flags.type) {
  throw new Error("Missing date or type flag")
}

validateDate(flags.date)

if (!validTypes.includes(flags.type)) {
  throw new Error(`Invalid type: ${flags.type}`)
}

const id = Math.floor(Date.now() / 1000)
const path = `./${flags.date}/context`
const filePath = `${path}/${id}.yml`

// create path
await Deno.mkdir(path, { recursive: true })
// load template
const template = await Deno.readTextFile(`./scripts/templates/${flags.type}.yml`)
// write file to path
await Deno.writeTextFile(filePath, template)
console.log(`🎉 Created new ${flags.type} context ${flags.date}`)

