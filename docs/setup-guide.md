# Local Setup and Troubleshooting (DEMO-10)
**Status**: Proposed Design
**Responsible Person**: Wang Yajie
**Last Update**: 2026-09-23
**Related Task**: DEMO-10 Write the developer setup guide
---
## 1. Purpose and Current Limitation
This document demonstrates the contents of a reproducible onboarding guide. There is no Campus Rooms source repository yet. The commands and paths below are a proposed repository contract and cannot currently be run against an implementation. 

*(In a real project, you must replace them with commands you have actually executed on a clean checkout and record the tested revision.)*
---
## 2. Prerequisites to Document
Before starting, a new developer needs to know:
- Exact tested Node.js and package-manager versions, plus the lockfile to use.
- Exact PostgreSQL version, required extensions, and the command that starts an isolated development database.
- The real repository URL, default branch, and required access.
- Expected local ports and supported operating systems.
- Configuration variable names and where a developer obtains their own development values.
---
## 3. Proposed Configuration Names
Create a safe `.env.example` with names and placeholders. **Never** commit real `.env` values or database dumps containing personal data to Git.
```env
DATABASE_URL=<local development database connection>
SESSION_SECRET=<your own development secret>
CAMPUS_TIME_ZONE=Europe/Oslo
PORT=3000