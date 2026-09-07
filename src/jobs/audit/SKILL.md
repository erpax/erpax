---
name: audit
description: "Use when reasoning about audit — builds each tenant's standardised monthly audit file for the month that has closed — is what decides which — and submits it where an mTLS submitter is wired."
atomPath: "jobs/audit"
coordinate: "jobs/audit · 5/round · e3edb7c4"
contentUuid: "3a30910f-7bd1-5064-94e9-9935ff27d9e0"
diamondUuid: "ac75a6cd-3545-8157-91bf-a01983921ef7"
uuid: "e3edb7c4-d69d-8300-a143-97d28f670621"
horo: 5
typography:
  partition: jobs
  bondDegree: 137
standards:
  - "BG Наредба-Н-18 §Приложение-38 monthly-audit-file"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "16f9fbde-e9b6-8ca8-8c6b-fa9cffa68944"
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
      stageUuid: "ec98e32d-2e0d-8a5e-a140-bb54c05b5623"
    - stage: seal
      stageUuid: "0c1bef98-6bde-8325-833f-db7dec038455"
    - stage: uuid
      stageUuid: "8423f12b-d8a9-8155-ac45-22f45a73dba4"
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
