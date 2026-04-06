---
name: New Article
about: Submit a new article for context extraction
title: "[ARTICLE] YYYY-MM-DD"
labels: article
assignees: copilot
---

## Required Inputs

### Public URL

PASTE_ARTICLE_URL_HERE

### Archive URL

PASTE_ARCHIVE_URL_HERE

## Optional Inputs

### Private URL

ADD_PRIVATE_URL_HERE

### Notes

ADD_NOTES_ABOUT_ARTICLE_HERE

---

## Copilot Task

Use this issue to create exactly one new context.yml file.

Priority of truth:

1. Explicit field values in this issue
2. Optional notes
3. Values inferred from the fetched archive content

If sources conflict, prefer the higher-priority source.

## LLM Content Fetching and Field Inference

Fetch the article content from the Archive URL. Use the fetched content to infer any fields not explicitly provided in this issue, including:

- **title**: infer from the article's `<title>` tag or main heading
- **language**: infer from the content's language (use BCP 47 codes, e.g. `en`, `fr`)
- **date**: infer from the article's published/updated date metadata or byline; set to null if not present
- **website**: infer from the archive URL's origin domain (e.g. `example.com`)
- **tags**: analyze the main body of the article and generate a list of relevant tags that describe what the article is about

Tags should be concise, lowercase, and reflect the main topics, entities, or themes present in the article.

## Output Contract

Generate one YAML file using this template:

```yml
type: article
language: <from Language field, or inferred from article content>
author: <from Author field, or null>
date: <from Date field, or inferred from article content, or null>
title: <from Title field, or inferred from article content>
website: <from Website field, or inferred from archive URL>
url: <from Public URL field, or null>
archive_url: <from Archive URL field, or null>
private_url: <from Private URL field, or null>
notes: <from Notes field, or null>
tags:
	- tag1
	- tag2
	- ...
```

Explicit field values in this issue always take precedence over inferred values. If a field cannot be provided or inferred, set it to null. If no tags are generated, set `tags: []`.

Save file as: `<YYYY>/<MM>/<DD>/context/<unix_timestamp_of_issue_created_at>/context.yml`

Where:

- YYYY/MM/DD is based on the date in the issue title
- unix_timestamp_of_issue_created_at is based on the GitHub issue creation timestamp

Then:

1. Create missing directories (if a context.yml already exists at that location, stop and comment).
2. Commit and open a PR.
3. Use the repository default branch as PR base (do not assume `main`).
4. Do not ask follow-up questions unless blocked.
