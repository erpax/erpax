---
name: registry
description: Use when reasoning about registry — binds each role to the standards it answers to and the chain steps it may execute.
atomPath: "roles/registry"
coordinate: "roles/registry · 1/base · c197a7f4"
contentUuid: "567feb85-3997-56a1-ae14-d66bb9798749"
diamondUuid: "1a32b7f3-3bb3-88db-8bfa-f750bb544b07"
uuid: "c197a7f4-b9fe-80ed-9da0-ff2a1c2717d7"
horo: 1
typography:
  partition: roles
  bondDegree: 31
standards:
  - "COBIT 5 PO4.11 segregation-of-duties"
  - "GDPR Art.37-39 data-protection-officer"
  - "GDPR Art.5 lawfulness-of-processing"
  - "GDPR Art.5(1)(b) purpose-limitation"
  - IFAC Code of Ethics §100
  - "IFAC IES 1-8 international-education-standards"
  - IFRS Conceptual Framework
  - IIA IPPF
  - IIA International Professional Practices Framework (IPPF)
  - "ISA 200-720 international-standards-on-auditing"
  - "ISA 600 group-audits"
  - "ISAE 3000 limited-assurance"
  - "ISAE 3410 ghg-statements"
  - "ISO 19011:2018 §7 auditor-competence"
  - "ISO 27001 A.5.15 access-control"
  - "ISO 27001 A.5.16 identity-management"
  - "ISO 27001 A.5.18 access-rights"
  - "ISO 27001 A.5.23 cloud-service-tenant-isolation"
  - "ISO 27002 §5.18 access-rights"
  - "ISO 27002 §5.4 segregation-of-duties"
  - "ISO 27002:2022 §5.4 segregation-of-duties"
  - "ISO 37301:2021 compliance-management"
  - "ISO-27002"
  - "ISO/IEC-27002:2022"
  - "NIST INCITS-359-2012 role-based-access-control"
  - "NIST SP-800-53 AC-5 separation-of-duties"
  - SOX
  - "SOX §302 officer-certifications"
  - "SOX §404 four-eyes"
  - "SOX §404 internal-controls"
  - "SOX §404 internal-controls + §302 officer-certifications"
bindings: []
signatures:
  computationUuid: "572d0cd8-c510-8c1d-82ee-49e57a1e59cb"
  stages:
    - stage: path
      stageUuid: "26075980-9fce-8ec4-9e0a-aa832af2995c"
    - stage: trinity
      stageUuid: "cec828fa-019a-87a4-9907-e52cb2699da1"
    - stage: boundary
      stageUuid: "65b737bb-fcf0-80d8-8c79-a40df405a84f"
    - stage: links
      stageUuid: "c85cbb49-ebef-896c-b465-0ced7a69792c"
    - stage: horo
      stageUuid: "d23a30a0-21a4-8f91-9af0-d8a672461084"
    - stage: seal
      stageUuid: "fc9ea01a-31f0-878d-8d0d-de7ab34785cc"
    - stage: uuid
      stageUuid: "9ea6bc7f-855a-84ba-9086-526793014423"
version: 2
---
# roles/registry — a role is what a person must satisfy, not a label on a user row

`ROLES_REGISTRY` binds each role to the standards it answers to and the chain steps it may
execute. `rolesIncompatibleWith` names the pairs one person may not hold at once, and
`validateUserRoleSet` refuses the combination — segregation of duties, enforced rather than
documented.

`ACCOUNTING_WRITE_ROLES` is the set that may move the ledger, which is the set an auditor asks
about first.

Composes: [[law]].
