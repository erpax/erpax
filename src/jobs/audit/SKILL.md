---
name: audit
description: "Use when reasoning about audit — builds each tenant's standardised monthly audit file for the month that has closed — is what decides which — and submits it where an mTLS submitter is wired."
atomPath: "jobs/audit"
coordinate: "jobs/audit · 5/round · afbac011"
contentUuid: "8d064eff-929a-5136-8399-58c4a7951b9d"
diamondUuid: "1490de8d-d2d6-8c5d-be80-343be9d01830"
uuid: "afbac011-a51e-8530-9074-5a76ca21e8e6"
horo: 5
typography:
  partition: jobs
  bondDegree: 125
standards:
  - "BG Наредба-Н-18 §Приложение-38 monthly-audit-file"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "7fbf6346-698f-84c6-8158-55f49e60a1fd"
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
      stageUuid: "8dff5ec2-81fb-8925-ae10-0e775bd9175c"
    - stage: seal
      stageUuid: "0c1bef98-6bde-8325-833f-db7dec038455"
    - stage: uuid
      stageUuid: "4ad29d9f-ce9d-8d01-bc7f-66517883bd79"
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
