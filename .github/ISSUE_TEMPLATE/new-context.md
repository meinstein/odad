---
name: New Context
about: Convert article screenshots into structured context files
title: "[New Context] [INSERT_POEM_HERE]"
labels: ["new context"]
assignees: ["copilot"]
---

## Copilot Task

Use this issue to create exactly one new context file.

Priority of truth:

1. Screenshot/image content
2. Explicit field values in this issue
3. Optional notes

If sources conflict, prefer the higher-priority source.

## Required Inputs

### Public URL

[PASTE ARTICLE URL HERE]

### Screenshot (required)

Paste or attach the screenshot directly under this heading so Copilot can find it reliably.

[PASTE OR DRAG IMAGE HERE]

## Optional Inputs

### Notes

[ADD NOTES ABOUT ARTICLE HERE]

### Archive URL

[ADD ARCHIVE URL HERE]

## Extraction Rules

Extract the following fields:

- `language` — one of: `english`, `dutch`, `german`
- `author` — if multiple authors, use a comma-separated list
- `date` — format as `YYYY-MM-DD`
- `title`
- `website`
- `url` — derive from the issue title if provided

Rules:

- If a value cannot be confidently determined, use `null`
- Do not guess or invent missing values
- Preserve original capitalization for titles, author names, and publication names
- Extract text conservatively if the screenshot quality is poor
- Clean up obvious typos and grammar issues in notes, but do not significantly rewrite them
- Ensure the final YAML is valid
- If the screenshot is missing or unreadable, stop and comment what is missing

## Output Contract

Generate one YAML file using this template:

```yml
type: article
language: english | dutch | german
author: null
date: "YYYY-MM-DD"
title: null
website: null
url: null
archive_url: null
private_url: null
notes: null
```

Save file as: `<YYYY>/<MM>/<DD>/context/<unix_timestamp_of_issue_created_at>/context.yml`

Where:

- YYYY/MM/DD is based on the article date
- unix_timestamp_of_issue_created_at is based on the GitHub issue creation timestamp

Then:

1. Create missing directories.
2. Commit and open a PR.
3. Use the repository default branch as PR base (do not assume `main`).
4. Do not ask follow-up questions unless blocked.
