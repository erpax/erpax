---
name: registry
description: Use when reasoning about registry — binds each role to the standards it answers to and the chain steps it may execute.
atomPath: "roles/registry"
coordinate: "roles/registry · 5/round · 48a8e414"
contentUuid: "e6c1ce0b-5bf5-5bcd-b431-df7bac12877c"
diamondUuid: "c24739f6-1cf8-89fa-b250-261ba08aca49"
uuid: "48a8e414-9333-875b-b7df-b9a0205e108a"
horo: 5
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
  computationUuid: "676d10c0-591b-866d-b71b-73db20cd0f04"
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
      stageUuid: "c0ae7b2e-650c-8f09-830a-01c91761a6f7"
    - stage: seal
      stageUuid: "fc9ea01a-31f0-878d-8d0d-de7ab34785cc"
    - stage: uuid
      stageUuid: "d3de2bb5-c8f8-8526-bc8d-92044e2d985f"
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
