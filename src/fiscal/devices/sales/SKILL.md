---
name: sales
description: "Use when fiscalizing revenue under Наредба Н-18 СУПТО — each sale receives an immutable gapless УНП, is frozen on close (no delete — corrections via сторно reversals), emits sale:closed event with content-uuid tamper-proof hash, covering orders, subscriptions, invoices and POS. The СУПТО sale register."
atomPath: "fiscal/devices/sales"
coordinate: "fiscal/devices/sales · 4/weave · e0c1b867"
contentUuid: "30420a20-b1cd-5433-92f9-7d4288aca49f"
diamondUuid: "079673fd-8277-8f3a-b0d2-813bcba7915e"
uuid: "e0c1b867-f208-861b-be11-93a5dee62ab8"
horo: 4
typography:
  partition: fiscal
  bondDegree: 29
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
  computationUuid: "60352b19-d8fc-805d-8658-51bae923f6da"
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
      stageUuid: "434acb39-4e6e-8d06-87ba-141c9e7464f0"
    - stage: seal
      stageUuid: "b05e8bac-090b-88e6-8fce-5765ee8ccc42"
    - stage: uuid
      stageUuid: "6f3e7f06-9dcb-8707-a903-bd67a9f18ef4"
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
