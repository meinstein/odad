# one document a day (odad)

[https://meinstein.github.io/odad](https://meinstein.github.io/odad)

```sh
# start simple dev server with live reload capability
npx live-server --port=1234

# make document for new date
deno run --allow-read --allow-write scripts/make-document.ts --date=YYYY/MM/DD

# build root index.html
deno run --allow-read --allow-write scripts/build-index.ts
```
