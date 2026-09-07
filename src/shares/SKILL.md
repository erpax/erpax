---
name: shares
description: "Use when granting, checking, or revoking uuid-based RBAC access (Law 59) — share bindings (granteeUuid, accessRole, targetUuid) per tenant over content-uuid-addressed resources; the access-control source of truth checkShare reads at read time, with each grant/revoke attested by a chain-linked audit leaf. Revocation is a soft flag, never a delete. The uuid-share RBAC binding collection."
atomPath: shares
coordinate: "shares · 1/base · ae6d29be"
contentUuid: "10668647-0c36-5048-b3fb-2bc832682fa0"
diamondUuid: "2ac95f67-9f72-894f-9217-be0b0a0f7252"
uuid: "ae6d29be-0bc2-88cf-8cd2-80f1cee38a54"
horo: 1
typography:
  partition: shares
  bondDegree: 16
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
  computationUuid: "54256c06-02a1-848e-a7a7-e025640586bf"
  stages:
    - stage: path
      stageUuid: "ec32f3ed-127b-8f0a-bf2f-5e9b6a630ce6"
    - stage: trinity
      stageUuid: "5dd60bfe-2a28-8192-b824-1571d63b167f"
    - stage: boundary
      stageUuid: "b60935b5-0fae-8cd4-a583-97aa5f0e622c"
    - stage: links
      stageUuid: "705b9f8a-bee1-8f92-8847-9e1d0d0a2b1d"
    - stage: horo
      stageUuid: "791db325-faf1-8889-8a3b-e57f7bd1d519"
    - stage: seal
      stageUuid: "023fe6c2-9d77-8671-86c6-b544648ede27"
    - stage: uuid
      stageUuid: "3eb26ba9-522c-8321-ae1a-c21f38c0b009"
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
