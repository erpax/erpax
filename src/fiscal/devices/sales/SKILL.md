---
name: sales
description: "Use when fiscalizing revenue under Наредба Н-18 СУПТО — each sale receives an immutable gapless УНП, is frozen on close (no delete — corrections via сторно reversals), emits sale:closed event with content-uuid tamper-proof hash, covering orders, subscriptions, invoices and POS. The СУПТО sale register."
atomPath: "fiscal/devices/sales"
coordinate: "fiscal/devices/sales · 7/descent · 70a33bdf"
contentUuid: "80f4c5e0-12e9-5e92-98e8-82f094e423f1"
diamondUuid: "3518b589-f3c0-852d-a55d-4d8b4c6e3921"
uuid: "70a33bdf-3cdf-8505-b743-18e64fb23e15"
horo: 7
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
  computationUuid: "7f82dad3-db3c-882e-a736-55b4f33ed571"
  stages:
    - stage: path
      stageUuid: "41422dd4-5c4d-89cb-9fdb-4a2486ee7d1f"
    - stage: trinity
      stageUuid: "a2d23abc-a187-890e-a1c0-ad335b16cbf3"
    - stage: boundary
      stageUuid: "133733f3-9a6b-8443-9f44-d69c409b4c2b"
    - stage: links
      stageUuid: "2f2ea5c8-ce39-8223-9cfc-7f5dfccd5ba2"
    - stage: horo
      stageUuid: "e615b17a-2d21-8c3d-90fd-2632dd233a23"
    - stage: seal
      stageUuid: "b05e8bac-090b-88e6-8fce-5765ee8ccc42"
    - stage: uuid
      stageUuid: "04b97cfe-095e-8b06-adfb-97d89deb1dba"
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
