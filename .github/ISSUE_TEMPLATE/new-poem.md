---
name: New Poem
about: Create poem to HTML document
title: "[Poem] INSERT_TITLE_HERE"
labels: ["poem"]
assignees: ["copilot"]
---

## Copilot Task

Use this issue to create exactly one new index.html file.

Priority of truth:

1. Draft poem text in this issue
2. Explicit metadata fields in this issue
3. Optional notes

If sources conflict, prefer the higher-priority source.

## Required Inputs

### Date

Use format: `YYYY-MM-DD`

ADD_DATE_HERE

### Location

ADD_LOCATION_HERE

### Draft poem text

ADD_POEM_TEXT_HERE

## Optional Inputs

### Notes

ADD_NOTES_ABOUT_POEM_REFINEMENTS_HERE

## General refinement rules

Rules:

- do not use em dashes
- do not change casing and do not add punctuation
- do not guess or invent missing values
- preserve line breaks from the draft poem text; each non-empty line is a `<p>` tag
- fetch the title from the issue title
- if required inputs are missing, stop and comment what is missing
- preserve the original voice, tone, and emotional temperature
- preserve ambiguity and strangeness; do not "clarify" metaphors into literal statements
- preserve repetition, stutter, fragmentation, and intentional grammatical breaks
- preserve unusual word choice, dialect, slang, and code-switching
- preserve line order and stanza boundaries; do not merge or split lines unless explicitly requested in notes
- do not replace vivid or risky imagery with safer or more generic language
- do not substitute synonyms for style only; only change words to fix clear typos from notes
- keep edits minimal and local: prefer micro-edits over rewrites
- if a line has multiple valid readings, keep the most open-ended reading
- do not impose a rhyme scheme, meter, or formal structure that is not present in the draft
- do not remove tension, contradiction, or unresolved endings
- if notes conflict with preserving voice, prioritize preserving voice and structure

## Output Contract

Generate one `index.html` file using this template:

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="location" content="{{from location mentioned in issue>}}">
    <meta name="keywords" content="poem">
    <title>{{from title mentioned in issue}}</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100dvh;
        background-color: whitesmoke;
      }

      #text {
        font-family: monospace;
        font-size: 16px;
        line-height: 32px;
        text-align: left;
        padding: 16px;

      }

      p {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <div id="text">
      ...
    </div>
  </body>

</html>
```

Save file as: `<YYYY>/<MM>/<DD>/index.html`

Where:

- YYYY/MM/DD is based on the provided poem date

Then:

1. Create missing directories (if an `index.html` already exists at that location, stop and comment).
2. Commit and open a PR.
3. Use the repository default branch as PR base (do not assume `main`).
4. Do not ask follow-up questions unless blocked.
