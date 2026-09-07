---
name: shares
description: "Use when granting, checking, or revoking uuid-based RBAC access (Law 59) — share bindings (granteeUuid, accessRole, targetUuid) per tenant over content-uuid-addressed resources; the access-control source of truth checkShare reads at read time, with each grant/revoke attested by a chain-linked audit leaf. Revocation is a soft flag, never a delete. The uuid-share RBAC binding collection."
atomPath: shares
coordinate: "shares · 2/share · 1bc661e0"
contentUuid: "cc00ffb8-4b11-5bbf-80ab-ae3809b688fb"
diamondUuid: "4abe4920-0bfb-867f-b87a-28d3d57ac661"
uuid: "1bc661e0-44aa-8151-b5e8-c1c4eab8d39c"
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
  computationUuid: "132ebeb8-0dc4-81d1-87d6-69eab9b9f349"
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
      stageUuid: "b4b97d83-1683-8f0a-afae-fc7dd1bd6e58"
    - stage: seal
      stageUuid: "023fe6c2-9d77-8671-86c6-b544648ede27"
    - stage: uuid
      stageUuid: "9adb642a-dd98-829e-a987-8e08d792de76"
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
