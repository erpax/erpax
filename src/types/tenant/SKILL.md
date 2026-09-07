---
name: tenant
description: "Use when reasoning about tenant — carries what differs between instances: , the it reports under, and its . The request types — create, update, batch — are the only shapes the management API accepts."
atomPath: "types/tenant"
coordinate: "types/tenant · 5/round · fec65dfe"
contentUuid: "35902f0e-c75c-5850-abba-750400707aa4"
diamondUuid: "151fa2e6-0ae9-825f-a332-8780610d0b84"
uuid: "fec65dfe-5302-827f-ac3f-df2efb7bdb89"
horo: 5
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
  computationUuid: "c80366ab-7473-846e-811e-ec0fd7682533"
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
      stageUuid: "206aa01f-2465-8db1-9bed-7995ae1cedbe"
    - stage: seal
      stageUuid: "5565db82-d0bb-8361-a0a6-3569152bd3f5"
    - stage: uuid
      stageUuid: "70a3076d-25c7-8cf6-bab8-d3d0a7784ebf"
version: 2
---
# types/tenant — the configuration that makes one instance a distinct business

`Tenant` carries what differs between instances: `TenantStatus`, the `AccountingStandard` it
reports under, and its `FiscalYearEnd`. The request types — create, update, batch — are the only
shapes the management API accepts.

Two tenants under different accounting standards must produce different statements from the same
code, which is why the standard is tenant configuration and never a constant.

Composes: [[tenant]] · [[law]].
