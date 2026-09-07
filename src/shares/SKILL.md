---
name: shares
description: "Use when granting, checking, or revoking uuid-based RBAC access (Law 59) — share bindings (granteeUuid, accessRole, targetUuid) per tenant over content-uuid-addressed resources; the access-control source of truth checkShare reads at read time, with each grant/revoke attested by a chain-linked audit leaf. Revocation is a soft flag, never a delete. The uuid-share RBAC binding collection."
atomPath: shares
coordinate: "shares · 2/share · e98477fc"
contentUuid: "54edaf85-67c5-5686-8ae4-1e84f465ed0a"
diamondUuid: "a72adb4f-58b7-8738-b6cb-3afd20b9e4b5"
uuid: "e98477fc-4082-8a3a-833e-7f79fde1e1a1"
horo: 2
typography:
  partition: shares
  bondDegree: 14
standards:
  - "GDPR Article 32(1)(b) ongoing-confidentiality"
  - "ISO/IEC 27001 Annex A.9.2.3 privileged-access-rights"
  - "ISO/IEC 27001 Annex A.9.2.3 privileged-access-rights`"
  - "ISO/IEC 27001 Annex A.9.4.1 information-access-restriction"
  - "ISO/IEC 27001 Annex A.9.4.1 information-access-restriction`"
  - "NIST SP 800-162 §3 attribute-based-access-control"
  - "NIST SP 800-162 §3 attribute-based-access-control`"
  - "NIST-SP-800-162"
  - "SOX §404 access-controls audit-evidenced-via-chain"
  - eIDAS
  - "eIDAS §3 sealed-grants (sign/admin)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b6993fc2-0d84-85e1-875a-b4424c5c4dd2"
  stages:
    - stage: path
      stageUuid: "ec32f3ed-127b-8f0a-bf2f-5e9b6a630ce6"
    - stage: trinity
      stageUuid: "5dd60bfe-2a28-8192-b824-1571d63b167f"
    - stage: boundary
      stageUuid: "b60935b5-0fae-8cd4-a583-97aa5f0e622c"
    - stage: links
      stageUuid: "266298e2-a565-8646-8e90-92a2815d5af8"
    - stage: horo
      stageUuid: "f163e836-ffaa-88b6-a3fa-62d30e07d71a"
    - stage: seal
      stageUuid: "023fe6c2-9d77-8671-86c6-b544648ede27"
    - stage: uuid
      stageUuid: "c10d6f21-4c9d-87e7-bcc3-df38b83c7bf1"
version: 2
---
# shares

Shares — uuid-based RBAC share bindings (Law 59): each row is a `(granteeUuid, accessRole, targetUuid)` grant per tenant, carrying its deterministic `shareUuid` and the chain-linked audit leaf; `checkShare` reads it as the read-time access-control source of truth. Created/revoked via the uuid-share service + `erpax.share.*` MCP tools; revocation is a soft flag, never a delete.

This is the single-folder collection node: `index.ts` (schema + standards banners) lives here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST SP 800-162 §3 attribute-based-access-control`
- `@standard ISO/IEC 27001 Annex A.9.2.3 privileged-access-rights`
- `@standard ISO/IEC 27001 Annex A.9.4.1 information-access-restriction`

- NIST SP 800-162 §3 attribute-based-access-control
- ISO/IEC 27001 Annex A.9.2.3 privileged-access-rights
- ISO/IEC 27001 Annex A.9.4.1 information-access-restriction
- eIDAS §3 sealed-grants (sign/admin)
- GDPR Article 32(1)(b) ongoing-confidentiality
- SOX §404 access-controls audit-evidenced-via-chain
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- Conservation Law 59 uuid-based-sharing-with-rbac

**Law — [[law]]: each row is a `(granteeUuid, accessRole, targetUuid)` grant per tenant that `checkShare` reads as the read-time access source of truth; every grant/revoke is chain-attested and revocation is a soft flag, never a delete.**

Composes: [[access]] · [[tenant]].
