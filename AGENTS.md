# AGENTS.md

## Deployment

There is no CI/CD: pushing to `main` does **not** deploy, so the live site goes stale on every push.

Deploy by hand after pushing, from the repo root (the directory is already linked to the Vercel project; the CLI must be logged in as `evasiloudes`):

```bash
vercel --prod
```

Completion: the command reports the production URL (https://epic-economics.dimis.org) as ready, and `curl` on the homepage reflects the change that triggered the deploy.
