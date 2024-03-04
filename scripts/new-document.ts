import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";

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

try {
  // check if dir exists
  await Deno.stat(flags.date)
  throw new Error("Directory already exists")
} catch {
  // create dir - recursively
  await Deno.mkdir(flags.date, { recursive: true })
  // load template
  const template = await Deno.readTextFile("./scripts/new-document-template.html")
  await Deno.writeTextFile(`${flags.date}/index.html`, template)
  console.log(`🎉 Created ${flags.date}`)
}

