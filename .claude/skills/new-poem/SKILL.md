---
name: new-poem
description: Add a new odad poem for today (or a given date) from user-supplied text and title, then rebuild the root index. Use when the user says something like "here's the poem text and title, add it for today".
---

# new-poem

Add a poem the user wrote as a new odad document. **Never write or edit poem text or titles yourself.** Use exactly what the user gives. If the title or text is missing, ask for it.

## Inputs

- **text**: the poem, from the user.
- **title**: from the user.
- **date**: defaults to today, formatted `YYYY/MM/DD`.
- **location**: use whatever the user gives. If they don't give one, reuse the `location` meta from the most recent poem (newest dated folder whose `keywords` include `poem`), and say which location you used.

## Steps

1. Create the document with the existing script:
   ```sh
   deno run --allow-read --allow-write scripts/new-document.ts --date=YYYY/MM/DD
   ```
   If it reports the date already exists, stop and ask the user before overwriting.

2. Replace the generated canvas template in `YYYY/MM/DD/index.html` with the poem layout below. Keep it identical to earlier poems, such as `2026/01/15/index.html`:
   - `<meta name="location" content="...">` and `<meta name="keywords" content="poem">` after the viewport meta, with no robots meta.
   - `<title>` set to the title.
   - The same `<style>` block as earlier poems (flex-centered body, `whitesmoke` background, monospace `#text` at 16px/32px, zeroed `p` margins).
   - Inside `<div id="text">`, one `<p>` per line, kept verbatim, including punctuation and lowercase. Use `<br>` only for real stanza breaks. If every line in the paste is separated by a blank line, treat that as a paste artifact and use no `<br>`s. If the stanza structure is ambiguous, ask.

3. Rebuild the index:
   ```sh
   deno run --allow-read --allow-write scripts/build-index.ts
   ```
   Confirm the new row shows up in `index.html`, for example by grepping for the new `<tr id=...>` row with the date and title.

4. Report the entry number, date, title, and location. Never commit or offer to commit. The user always does their own commits in this project.
