# one document a day (odad)

```sh
# start simple dev server with live reload capability
npx live-server --port=1234

# create document for new date
deno run --allow-read --allow-write scripts/template.ts --date=YYYY/MM/DD

# build root index.html
deno run --allow-read --allow-write scripts/build.ts
```
