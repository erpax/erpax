---
name: spaces
description: "Use when managing IWMS sub-property zones — floors, rooms, open-plan areas, desks, parking bays — with area, capacity, occupancy, amenities, fire-zone, bookability flag, and GL-account or cost-centre allocation under a parent property. The ISO 41011 §3.3.5 space-management collection."
atomPath: "properties/spaces"
coordinate: "properties/spaces · 7/descent · 5d930e82"
contentUuid: "83217e8f-4b97-5ce2-89c0-6df65116b4a9"
diamondUuid: "ac02b9e7-7014-867a-b029-f97115d38894"
uuid: "5d930e82-c7bb-8ea2-a60e-a5ea2e20df18"
horo: 7
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
  computationUuid: "e5a4ef68-9932-823c-a28e-42c0f67a9464"
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
      stageUuid: "cc1cd704-0c38-89e2-bc88-40302a249b45"
    - stage: seal
      stageUuid: "85bf9bd1-ef6b-8d41-8733-a3b1db6bdc60"
    - stage: uuid
      stageUuid: "fad8fcf1-c5b0-8337-ad1b-9bdad265b249"
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
