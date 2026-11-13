---
name: contingencies
description: "Use when disclosing off-balance-sheet obligations in financial statement notes — capex commitments, purchase obligations, litigation, guarantees, performance bonds, tax disputes, insurance recoveries — with IAS-37 likelihood ladder and reclassification-to-provision workflow; IAS-37 §86-92 / ASC-440 / ASC-450 disclosure. The structured notes-disclosure register distinct from recognised provisions."
atomPath: "commitments/and/contingencies"
coordinate: "commitments/and/contingencies · 4/weave · 922220bd"
contentUuid: "fdc7498a-ed14-50f3-a44e-156387b35c9b"
diamondUuid: "336886fa-679d-8609-aae6-e148183ce798"
uuid: "922220bd-f506-8979-bb63-0a180281b8a7"
horo: 4
typography:
  partition: commitments
  bondDegree: 22
standards:
  - "IFRS IAS-37 §86-92 disclosure-requirements"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time`"
  - "US-GAAP ASC-450-20-50 loss-contingency-disclosure"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "0110c888-7915-84f1-ab11-8ac5687d8899"
  stages:
    - stage: path
      stageUuid: "364be235-3d55-8a1a-8ce7-0d0931e13720"
    - stage: trinity
      stageUuid: "0713e8e0-586d-899e-b674-abe9eb0e5954"
    - stage: boundary
      stageUuid: "6cdf5a14-8e27-8c38-b501-ade705a467c8"
    - stage: links
      stageUuid: "74b1942d-bbb2-8903-bce4-1e014af4329b"
    - stage: horo
      stageUuid: "4e8226bd-d8e1-8afb-b342-e498182cf89f"
    - stage: seal
      stageUuid: "3b9143ef-9e29-8e1d-94c5-ab71081921c7"
    - stage: uuid
      stageUuid: "c6b45b1f-60a5-85da-b4e8-a87dd3ca99a1"
version: 2
---
# commitments-and-contingencies

Commitments & Contingencies — IAS-37 §27-92 + IFRS-15 §B50 mandatory.

## The disclosed stage of a provision

This used to be a collection with a read-only pointer at the provision a row became. IAS-37 covers
both because they are one obligation at two stages, so the row now lives in `provisions` and its
status says which stage it is at: `disclosed`, `settled` or `released` here; drafted and
recognised there. What this atom keeps is the view:

- `contingenciesWhere()` — the filter selecting the rows still off the balance sheet.
- `contingenciesPreset()` — the saved list that stands where the collection's list stood.

**Honest boundary.** The list is declared and not yet loaded into any tenant. Nothing moves a row
from disclosed to recognised by itself: `recognitionOwed` in the provisions atom says when IAS-37
§14 requires it, and a person makes the move.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IAS-37 §10 contingent-liability-definition
- IFRS IAS-37 §27-30 recognition-prohibition
- IFRS IAS-37 §86-92 disclosure-requirements
- IFRS IAS-1 §112(c) other-disclosures
- IFRS IFRS-15 §B50 onerous-contract-disclosure
- US-GAAP ASC-440 commitments
- US-GAAP ASC-450-20-50 loss-contingency-disclosure
- ISO-19011:2018 audit-trail off-balance-sheet
- SOX §404 internal-controls disclosure-completeness
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Provisions]] · [[accounting]] · [[transaction]] · [[proof]] · [[standard]] · [[identity]].

**Law — [[law]]: an off-balance-sheet obligation is disclosed in the notes under the IAS-37 likelihood ladder but recognition is prohibited until it crosses the probable+measurable threshold — at which point it reclassifies to a recognised provision, never the reverse silently.**
