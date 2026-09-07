---
name: audit
description: "Use when reasoning about audit — builds each tenant's standardised monthly audit file for the month that has closed — is what decides which — and submits it where an mTLS submitter is wired."
atomPath: "jobs/audit"
coordinate: "jobs/audit · 5/round · e0449ab8"
contentUuid: "fb312773-4e88-5352-bc0c-295fd0624a4b"
diamondUuid: "9379c00e-d9b3-8294-a262-e5f7d48a7288"
uuid: "e0449ab8-dc1b-8bb8-b661-b8c307ca1901"
horo: 5
typography:
  partition: jobs
  bondDegree: 137
standards:
  - "BG Наредба-Н-18 §Приложение-38 monthly-audit-file"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "c8a040c2-5310-8ddf-a8ad-72cfae1583c6"
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
      stageUuid: "5057f533-3ce0-8fc0-9652-2686fb67553e"
    - stage: seal
      stageUuid: "0c1bef98-6bde-8325-833f-db7dec038455"
    - stage: uuid
      stageUuid: "db35d9ac-1daa-84b2-b9f0-afb1c88f89dd"
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
