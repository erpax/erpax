---
name: spaces
description: "Use when managing IWMS sub-property zones — floors, rooms, open-plan areas, desks, parking bays — with area, capacity, occupancy, amenities, fire-zone, bookability flag, and GL-account or cost-centre allocation under a parent property. The ISO 41011 §3.3.5 space-management collection."
atomPath: "properties/spaces"
coordinate: "properties/spaces · 8/crest · 1628f860"
contentUuid: "367725eb-3901-5dda-9647-2a567a8f6fbb"
diamondUuid: "b6c43cfa-9dc9-8a25-be87-b1add47557d4"
uuid: "1628f860-9ca5-8b71-87bc-b793ef5e1c5c"
horo: 8
typography:
  partition: properties
  bondDegree: 16
standards:
  - "EN-15221-6:2011 facility-management area-and-space-measurement"
  - "EN-15221-6:2011 facility-management area-and-space-measurement`"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO-19650-1:2018 information-management-using-bim"
  - "ISO-19650-1:2018 information-management-using-bim`"
  - "ISO-41001"
  - "ISO-41001:2018 facility-management-management-systems"
  - "ISO-41001:2018 facility-management-management-systems`"
  - "ISO-41011:2017 §3.3.5 facility-management space-vocabulary"
  - "ISO-41011:2017 §3.3.5 facility-management space-vocabulary`"
  - "SOX §404 internal-controls space-allocation"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "361a2179-9d2b-8878-b044-be210f060e8d"
  stages:
    - stage: path
      stageUuid: "b7ae036a-f5af-89a2-920e-2dbedf47e9ef"
    - stage: trinity
      stageUuid: "93b55b3d-1970-8e1c-b4dc-98c6bac1b87f"
    - stage: boundary
      stageUuid: "de776bfa-f5ea-824e-aa30-60bd67f428d6"
    - stage: links
      stageUuid: "14321fef-2867-837d-988b-4edab6c29c9b"
    - stage: horo
      stageUuid: "0539bcc2-9940-8a20-8cec-ba3aca998bf7"
    - stage: seal
      stageUuid: "85bf9bd1-ef6b-8d41-8733-a3b1db6bdc60"
    - stage: uuid
      stageUuid: "8de5de58-dcd7-80d9-b881-364981a4e1ce"
version: 2
---
# spaces

Sub-property zones (floor / room / desk / zone) for IWMS. Single-folder collection: schema + standards in `index.ts`, opening data in `seed.ts`, invariant checks in `index.test.ts`.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-41001:2018 facility-management-management-systems`
- `@standard ISO-41011:2017 §3.3.5 facility-management space-vocabulary`
- `@standard ISO-19650-1:2018 information-management-using-bim`
- `@standard EN-15221-6:2011 facility-management area-and-space-measurement`

- ISO-41001:2018 facility-management-management-systems
- ISO-41011:2017 §3.3.5 facility-management space-vocabulary
- ISO-19650-1:2018 information-management-using-bim
- EN-15221-6:2011 facility-management area-and-space-measurement
- ISO-19011:2018 audit-trail space-master-changes
- SOX §404 internal-controls space-allocation
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[standard]] · [[accounting]] · [[Properties]].
