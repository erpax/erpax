---
name: sales
description: "Use when fiscalizing revenue under Наредба Н-18 СУПТО — each sale receives an immutable gapless УНП, is frozen on close (no delete — corrections via сторно reversals), emits sale:closed event with content-uuid tamper-proof hash, covering orders, subscriptions, invoices and POS. The СУПТО sale register."
atomPath: "fiscal/devices/sales"
coordinate: "fiscal/devices/sales · 1/base · f59c09e3"
contentUuid: "8c6c66fc-8849-56ef-88de-b01041ac5b77"
diamondUuid: "31375be7-3a7b-83a6-8884-e0597d437db1"
uuid: "f59c09e3-7b7f-8150-95ac-e6d259b79106"
horo: 1
bonds:
  in:
    - access
    - accounting
    - commission
    - devices
    - law
    - opportunity
    - receipts
    - standard
  out:
    - access
    - accounting
    - commission
    - devices
    - law
    - opportunity
    - receipts
    - standard
typography:
  partition: fiscal
  bondDegree: 37
  neighbors: []
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
neighbors:
  wikilink:
    - access
    - accounting
    - law
    - receipts
    - standard
  matrix:
    - access
    - accounting
    - commission
    - devices
    - law
    - opportunity
    - receipts
    - standard
  backlinks:
    - access
    - accounting
    - commission
    - devices
    - law
    - opportunity
    - receipts
    - standard
signatures:
  computationUuid: "4169e945-8b10-81f7-961d-f5f0d7f3ac6c"
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
      stageUuid: "dd61c968-f0d4-85f1-9b85-bc737656589e"
    - stage: seal
      stageUuid: "b05e8bac-090b-88e6-8fce-5765ee8ccc42"
    - stage: uuid
      stageUuid: "1ffc168a-9491-870b-8bbb-7b19125fddf1"
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
