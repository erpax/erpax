---
name: audit
description: "Use when reasoning about audit — builds each tenant's standardised monthly audit file for the month that has closed — is what decides which — and submits it where an mTLS submitter is wired."
atomPath: "jobs/audit"
coordinate: "jobs/audit · 1/base · 5d24398c"
contentUuid: "90ae9a0f-a992-532e-9e76-9483d0350856"
diamondUuid: "98954f58-8f0c-86f5-b574-6b85991c2778"
uuid: "5d24398c-1aa3-8d42-ab1e-4c3e02ba04eb"
horo: 1
typography:
  partition: jobs
  bondDegree: 137
standards:
  - "BG Наредба-Н-18 §Приложение-38 monthly-audit-file"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "60dde2dd-9970-8420-8f64-ffb5b36cb67f"
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
      stageUuid: "b8a37aae-116b-8a9f-81c7-e549ca167528"
    - stage: seal
      stageUuid: "0c1bef98-6bde-8325-833f-db7dec038455"
    - stage: uuid
      stageUuid: "6e6eeea4-f517-8e9f-86a4-911e54eb142b"
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
