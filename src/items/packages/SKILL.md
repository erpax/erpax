---
name: packages
description: "Use when modelling the packing hierarchy for a shipment — GS1 SSCC serial shipping container codes, self-referential nesting (pallet → carton → contents), dimensions/weight, item-lot lines, and UN/CEFACT packaging codes. The logistic handling-unit collection that links line items to a shipment."
atomPath: "items/packages"
coordinate: "items/packages · 8/crest · 68c7c4eb"
contentUuid: "044c912b-eea7-5736-9d11-3228661df30b"
diamondUuid: "22e9d43b-bf94-8f8c-88b7-b169dd7b8e7e"
uuid: "68c7c4eb-012d-8a84-9944-384bdca598b0"
horo: 8
typography:
  partition: items
  bondDegree: 27
standards:
  - "GS1 General Specifications AI(00) SSCC serial-shipping-container-code"
  - GS1 Logistic Label
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "ISO/IEC 15459-1:2014 unique-identification transport-units"
  - "ISO/IEC 15459-1:2014 unique-identification transport-units`"
  - "UN-CEFACT"
  - "UN/CEFACT Recommendation 21 packaging-codes"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ca19c9b4-2999-8bf8-bf3a-48d6a9893652"
  stages:
    - stage: path
      stageUuid: "8ea3744e-cdbf-8fe2-bf73-27dfdf390c3c"
    - stage: trinity
      stageUuid: "d837c175-52e7-8d24-921e-c09d31abe098"
    - stage: boundary
      stageUuid: "7053e3a2-71a3-8f3e-9a66-64ba44a34654"
    - stage: links
      stageUuid: "455d7c67-611d-8c32-be6c-eac41fa816ec"
    - stage: horo
      stageUuid: "1495ed57-64d0-828e-9e9b-53d6ff8e310f"
    - stage: seal
      stageUuid: "a8f125be-03c8-8591-86e0-eb8f19594a06"
    - stage: uuid
      stageUuid: "c10dd835-b2bc-8ba0-8258-de821cbb4298"
version: 2
---
# packages

Packages — logistic handling units (pallet / carton / case …) with SSCC.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 15459-1:2014 unique-identification transport-units`
- `@standard ISO-8601-1:2019 date-time`

- GS1 General Specifications AI(00) SSCC serial-shipping-container-code
- ISO/IEC 15459-1:2014 unique-identification transport-units
- GS1 Logistic Label
- ISO-8601-1:2019 date-time
- UN/CEFACT Recommendation 21 packaging-codes
- ISO-19011:2018 audit-trail packing-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a logistic handling unit identified by a unique SSCC, self-nesting (pallet → carton → contents), binding item-lot lines to one shipment.**

Composes: [[collections]] · [[field]] · [[access]] · [[hooks]] · [[accounting]] · [[standard]].
