---
name: sales
description: "Use when fiscalizing revenue under Наредба Н-18 СУПТО — each sale receives an immutable gapless УНП, is frozen on close (no delete — corrections via сторно reversals), emits sale:closed event with content-uuid tamper-proof hash, covering orders, subscriptions, invoices and POS. The СУПТО sale register."
atomPath: "fiscal/devices/sales"
coordinate: "fiscal/devices/sales · 2/share · 8cb84630"
contentUuid: "0dc228cb-1b57-51ea-8aad-dfd08e168475"
diamondUuid: "a997ea41-a1d0-8918-9de7-43d734244689"
uuid: "8cb84630-b8b1-8ca0-b33f-f2af199137d8"
horo: 2
typography:
  partition: fiscal
  bondDegree: 37
standards:
  - "BG Наредба-Н-18 §СУПТО sale-register · УНП · no-delete · сторно"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-19011`"
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27001:2022`"
  - "Naredba-N-18"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "8a41b40d-e85d-83d6-865b-556d38a220ad"
  stages:
    - stage: path
      stageUuid: "41422dd4-5c4d-89cb-9fdb-4a2486ee7d1f"
    - stage: trinity
      stageUuid: "a2d23abc-a187-890e-a1c0-ad335b16cbf3"
    - stage: boundary
      stageUuid: "d649c604-2839-821b-ae74-6493a8ce06e8"
    - stage: links
      stageUuid: "2f2ea5c8-ce39-8223-9cfc-7f5dfccd5ba2"
    - stage: horo
      stageUuid: "fba338a4-330e-8fbb-af11-028d496cc0e1"
    - stage: seal
      stageUuid: "b05e8bac-090b-88e6-8fce-5765ee8ccc42"
    - stage: uuid
      stageUuid: "018f84f9-d7d1-8270-86d8-846200941469"
version: 2
---
# sales

СУПТО Sales (продажби) — the Наредба Н-18 sale register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO/IEC-27001:2022`
- `@standard ISO-19011`

- BG Наредба-Н-18 §СУПТО sale-register · УНП · no-delete · сторно
- IFRS IFRS-15 revenue-from-contracts-with-customers
- US-GAAP ASC-606 revenue-from-contracts-with-customers
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Receipts]] · [[access]] · [[standard]] · [[accounting]].

**Law — [[law]]: every sale receives an immutable, gapless УНП and is frozen on close — there is no delete; a mistake is corrected only by a сторно reversal, and the content-uuid hash makes the closed sale tamper-proof (Наредба Н-18 СУПТО).**
