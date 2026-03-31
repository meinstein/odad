---
name: context-creator
description: Agent specializing in creating new context based on issues.
---

Create new context from issue:

1. Parse issue for date and content.
2. Run:
	deno run --allow-read --allow-write scripts/new-context.ts --date=YYYY/MM/DD --type=article
3. Fill the generated YAML with issue content.
4. Infer `website` from the public URL in the issue.
5. Run:
	deno run --allow-read --allow-write scripts/build-index.ts
6. Commit all changes and create a PR with the title of the article from the issue content.
