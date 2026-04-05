---
name: New Article
about: Submit a new article for context extraction
title: "[ARTICLE] INSERT_URL_HERE"
labels: article
assignees: copilot
---

## Copilot Task

Use this issue to create exactly one new context.yml file.

Priority of truth:

1. Explicit field values in this issue
2. Optional notes

If sources conflict, prefer the higher-priority source.

## Required Inputs

### Date

2026-MM-DD

### Public URL

PASTE_ARTICLE_URL_HERE

### Select Language

- [] english
- [] dutch
- [] german

### Title

ADD_TITLE_HERE

### Website

ADD_WEBSITE_HERE

### Author

ADD_AUTHOR_HERE

## Optional Inputs

### Archive URL

ADD_ARCHIVE_URL_HERE

### Private URL

ADD_PRIVATE_URL_HERE

### Notes

ADD_NOTES_ABOUT_ARTICLE_HERE

---

## Output Contract

Generate one YAML file using this template:

```yml
type: article
language: <from Language field, or null>
author: <from Author field, or null>
date: <from Date field, or null>
title: <from Title field, or null>
website: <from Website field, or null>
url: <from Public URL field, or null>
archive_url: <from Archive URL field, or null>
private_url: <from Private URL field, or null>
notes: <from Notes field, or null>
```

If a field is not provided, set it to null.

Save file as: `<YYYY>/<MM>/<DD>/context/<unix_timestamp_of_issue_created_at>/context.yml`

Where:

- YYYY/MM/DD is based on the Date field
- unix_timestamp_of_issue_created_at is based on the GitHub issue creation timestamp

Then:

1. Create missing directories (if a context.yml already exists at that location, stop and comment).
2. Commit and open a PR.
3. Use the repository default branch as PR base (do not assume `main`).
4. Do not ask follow-up questions unless blocked.
