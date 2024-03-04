import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";
import { parse, stringify } from "https://deno.land/std@0.207.0/yaml/mod.ts";

const flags = parseArgs(Deno.args, {
  string: ["date"],
});

if (!flags.date) {
  throw new Error("Missing date flag")
}

// ensure that the date format YYYY/MM/DD - else throw
const [
  year,
  month,
  day,
] = flags.date.split("/")

// validate
if (
  year.length !== 4 ||
  month.length !== 2 ||
  day.length !== 2 ||
  isNaN(Number(year)) ||
  isNaN(Number(month)) ||
  isNaN(Number(day))
) {
  throw new Error("Invalid date format")
}

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

