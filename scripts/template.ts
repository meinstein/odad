import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";

const document = `
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>add title here</title>
    <style>
      /* add styles here */
    </style>
  </head>

  <body>
    <script type="module">
      import { Context2D } from 'https://unpkg.com/context2d';

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

// ensure that the date format YYYY/MM/DD - else throw
const [
  year,
  month,
  day,
] = flags.date.split("/")
console.log(year, month, day)
// validate
if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
  throw new Error("Invalid date format")
}


// check if the directory exists
try {
  await Deno.stat(flags.date)
  throw new Error("Directory already exists")
} catch (error) {
  // create the directory
  await Deno.mkdir(flags.date)
  await Deno.writeTextFile(`${flags.date}/index.html`, document)
}

