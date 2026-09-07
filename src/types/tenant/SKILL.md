---
name: tenant
description: "Use when reasoning about tenant — carries what differs between instances: , the it reports under, and its . The request types — create, update, batch — are the only shapes the management API accepts."
atomPath: "types/tenant"
coordinate: "types/tenant · 4/weave · e618b396"
contentUuid: "44691889-42ad-59ce-be0d-94e6ca297dcc"
diamondUuid: "f40ca756-6a36-8c09-901c-5f8e366d58a0"
uuid: "e618b396-be0d-8262-91f1-ac43a71559ea"
horo: 4
typography:
  partition: types
  bondDegree: 59
standards:
  - "BCP-47 language-tag"
  - "CN-ASBE Chinese-Accounting-Standards-for-Business-Enterprises"
  - "GB-FRS UK-Financial-Reporting-Standards"
  - "GDPR Art.4(7) data-controller"
  - "IFRS International-Financial-Reporting-Standards"
  - "IN-IndAS Indian-Accounting-Standards"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei legal-entity-identifier"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-4217:2015 currency-codes"
  - "JP-J-GAAP Japanese-GAAP"
  - "US-GAAP ASC-105 generally-accepted-accounting-principles"
bindings: []
signatures:
  computationUuid: "b87d13ab-ae3c-8579-be73-82926d38d47b"
  stages:
    - stage: path
      stageUuid: "797ea17b-b9ef-8935-b5e2-7bd64f77109a"
    - stage: trinity
      stageUuid: "0ba24cde-65b6-89c8-9efe-84cc0246923f"
    - stage: boundary
      stageUuid: "4c0e8ed9-1501-85c3-a077-4d8ffb992f28"
    - stage: links
      stageUuid: "d35ea554-f47c-8238-8b23-d9b3b0dfd6b9"
    - stage: horo
      stageUuid: "533e496e-48ce-8027-933a-490690c27e5a"
    - stage: seal
      stageUuid: "5565db82-d0bb-8361-a0a6-3569152bd3f5"
    - stage: uuid
      stageUuid: "9d22871e-9d74-8634-a217-67344a9a3233"
version: 2
---
# types/tenant — the configuration that makes one instance a distinct business

`Tenant` carries what differs between instances: `TenantStatus`, the `AccountingStandard` it
reports under, and its `FiscalYearEnd`. The request types — create, update, batch — are the only
shapes the management API accepts.

Two tenants under different accounting standards must produce different statements from the same
code, which is why the standard is tenant configuration and never a constant.

Composes: [[tenant]] · [[law]].
