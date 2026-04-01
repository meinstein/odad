---
name: New Context
about: Convert article screenshots into structured context files
title: "[New Context]"
labels: ["new context"]
assignees: ["@copilot"]
---

## Task

Review the issue body and attached screenshot.

Prefer screenshot content over issue text if there are conflicts. Use the issue body only for supplemental notes or to fill in missing information.

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

Optional notes may be included below:

[ADD NOTES ABOUT ARTICLE HERE]

Optioanl Archive URL may be included below:

[ADD ARCHIVE URL HERE]

Generate a YAML file using this template:

```yml
type: article
language: english | dutch | german | swiss-german
author: null
date: "YYYY-MM-DD"
title: null
website: null
url: null
archive_url: null
private_url: null
notes: null
```

Save the file as: `<YYYY>/<MM>/<DD>/context/<unix_timestamp_of_issue_created_at>/context.yml`

Where:

- YYYY/MM/DD is based on the article date
- unix_timestamp_of_issue_created_at is based on the GitHub issue creation timestamp

Create any missing directories, commit the new file, and open a PR.
