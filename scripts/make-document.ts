import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";

const document = `
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>add title here</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <script type="module">
      import { Context2D } from 'https://unpkg.com/context2d@0.0.8';

      const draw =  ({ ctx, w, h, oscillate, memoize }) => {
        // add code here
      }

      const context2d = new Context2D()
      context2d.draw(draw)
    </script>
  </body>

</html>
`

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
  await Deno.writeTextFile(`${flags.date}/index.html`, document)
  console.log(`🎉 Created ${flags.date}`)
}

