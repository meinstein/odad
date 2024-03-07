# one document a day (odad)

[https://meinstein.github.io/odad](https://meinstein.github.io/odad)

```sh
# start simple dev server with live reload capability
npx live-server --port=1234

# make a new document
deno run --allow-read --allow-write scripts/new-document.ts --date=YYYY/MM/DD

# make a new piece of context
deno run --allow-read --allow-write scripts/new-context.ts --date=YYYY/MM/DD --type=article

# build root index.html
deno run --allow-read --allow-write scripts/build-index.ts
```
