---
name: shares
description: "Use when granting, checking, or revoking uuid-based RBAC access (Law 59) — share bindings (granteeUuid, accessRole, targetUuid) per tenant over content-uuid-addressed resources; the access-control source of truth checkShare reads at read time, with each grant/revoke attested by a chain-linked audit leaf. Revocation is a soft flag, never a delete. The uuid-share RBAC binding collection."
atomPath: shares
coordinate: shares · 7/descent · 71d3583a
contentUuid: "3822ca1c-0cf3-537e-98fd-508f572b3165"
diamondUuid: "93a6f736-c656-8187-9bd0-e99c95d19c55"
uuid: "71d3583a-3812-851d-b54e-897c33ff52a6"
horo: 7
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: shares
  bondDegree: 9
  neighbors: []
standards:
  - "Conservation Law 59 uuid-based-sharing-with-rbac"
  - "GDPR Article 32(1)(b) ongoing-confidentiality"
  - "ISO/IEC 27001 Annex A.9.2.3 privileged-access-rights"
  - "ISO/IEC 27001 Annex A.9.4.1 information-access-restriction"
  - "NIST SP 800-162 §3 attribute-based-access-control"
  - "NIST-SP-800-162"
  - "SOX §404 access-controls audit-evidenced-via-chain"
  - eIDAS
  - "eIDAS §3 sealed-grants (sign/admin)"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "078f960a-edc8-8a04-92f1-b1b64d1a212e"
  stages:
    - stage: path
      stageUuid: "ec32f3ed-127b-8f0a-bf2f-5e9b6a630ce6"
    - stage: trinity
      stageUuid: "5dd60bfe-2a28-8192-b824-1571d63b167f"
    - stage: boundary
      stageUuid: "b60935b5-0fae-8cd4-a583-97aa5f0e622c"
    - stage: links
      stageUuid: "a6e592bb-5be1-857c-b0e9-e17d2dbd22fe"
    - stage: horo
      stageUuid: "9aad4642-4cc9-880e-8904-6a6045efb7a5"
    - stage: seal
      stageUuid: "20953764-3741-8daf-9c17-480226ec388f"
    - stage: uuid
      stageUuid: "898e154f-d355-887a-a857-2a58fae82673"
version: 2
---
# shares

Shares — uuid-based RBAC share bindings (Law 59): each row is a `(granteeUuid, accessRole, targetUuid)` grant per tenant, carrying its deterministic `shareUuid` and the chain-linked audit leaf; `checkShare` reads it as the read-time access-control source of truth. Created/revoked via the uuid-share service + `erpax.share.*` MCP tools; revocation is a soft flag, never a delete.

This is the single-folder collection node: `index.ts` (schema + standards banners) lives here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- NIST SP 800-162 §3 attribute-based-access-control
- ISO/IEC 27001 Annex A.9.2.3 privileged-access-rights
- ISO/IEC 27001 Annex A.9.4.1 information-access-restriction
- eIDAS §3 sealed-grants (sign/admin)
- GDPR Article 32(1)(b) ongoing-confidentiality
- SOX §404 access-controls audit-evidenced-via-chain
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- Conservation Law 59 uuid-based-sharing-with-rbac

**Law — [[law]]: each row is a `(granteeUuid, accessRole, targetUuid)` grant per tenant that `checkShare` reads as the read-time access source of truth; every grant/revoke is chain-attested and revocation is a soft flag, never a delete.**
