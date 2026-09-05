# jobs/audit — Приложение-38 is due by the 15th, so the job builds the PRIOR month

`processSalesAuditFiles` builds each tenant's standardised monthly audit file for the month that
has closed — `priorMonthUtc` is what decides which — and submits it where an mTLS submitter is
wired. `SalesAuditRunResult` is what the run leaves behind.

Наредба Н-18 expects the file by the fifteenth. A job that built the CURRENT month would produce
an incomplete file on time, which is worse than a late one.

**Honest boundary.** Submission requires a configured mTLS credential; without one the file is
built and the run reports that it was not submitted, rather than reporting success.

## Standards

- **BG Наредба Н-18** — the monthly standardised audit file.

Composes: [[law]].
