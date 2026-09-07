---
name: audit
description: "Use when reasoning about audit — builds each tenant's standardised monthly audit file for the month that has closed — is what decides which — and submits it where an mTLS submitter is wired."
atomPath: "jobs/audit"
coordinate: "jobs/audit · 4/weave · 2440f78d"
contentUuid: "1b1c629f-497d-5916-9321-5ce1dc875fbb"
diamondUuid: "2c1201d6-5ff3-847e-a16c-8936e339197b"
uuid: "2440f78d-e0af-8812-ad7a-eb8e25cf20dd"
horo: 4
typography:
  partition: jobs
  bondDegree: 125
standards:
  - "BG Наредба-Н-18 §Приложение-38 monthly-audit-file"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "809106cf-d710-8685-b592-9e2b553c29a1"
  stages:
    - stage: path
      stageUuid: "ec61f366-3cfe-82d1-a06d-50dce9a012ae"
    - stage: trinity
      stageUuid: "cb01daa6-ce67-81d7-b6af-49636b90b51a"
    - stage: boundary
      stageUuid: "a7ef9c5e-3f27-8db5-9e7c-b730a471177d"
    - stage: links
      stageUuid: "df42c74a-9ad6-8de1-90a4-f03477c987f7"
    - stage: horo
      stageUuid: "31d6d284-b45c-88c9-8eeb-ebe775502a0a"
    - stage: seal
      stageUuid: "0c1bef98-6bde-8325-833f-db7dec038455"
    - stage: uuid
      stageUuid: "7bd70d0e-8a63-8338-a7e1-534a70dae610"
version: 2
---
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
