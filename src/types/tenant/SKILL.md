---
name: tenant
description: "Use when reasoning about tenant — carries what differs between instances: , the it reports under, and its . The request types — create, update, batch — are the only shapes the management API accepts."
atomPath: "types/tenant"
coordinate: "types/tenant · 2/share · f913d2c8"
contentUuid: "034cbd1f-95ab-5a2f-a23a-506d9481ec67"
diamondUuid: "c5547105-4ee6-807f-9f55-6b36fd91a79d"
uuid: "f913d2c8-b173-87ec-ae12-5b43946dff00"
horo: 2
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
  computationUuid: "63a4d676-f0fa-84a6-a90e-5d9f30e64999"
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
      stageUuid: "4352fe3d-af37-8f8b-86d9-cf3372956bc1"
    - stage: seal
      stageUuid: "5565db82-d0bb-8361-a0a6-3569152bd3f5"
    - stage: uuid
      stageUuid: "9c366818-4032-8436-8d3d-02723f378584"
version: 2
---
# types/tenant — the configuration that makes one instance a distinct business

`Tenant` carries what differs between instances: `TenantStatus`, the `AccountingStandard` it
reports under, and its `FiscalYearEnd`. The request types — create, update, batch — are the only
shapes the management API accepts.

Two tenants under different accounting standards must produce different statements from the same
code, which is why the standard is tenant configuration and never a constant.

Composes: [[tenant]] · [[law]].
