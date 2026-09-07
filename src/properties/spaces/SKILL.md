---
name: spaces
description: "Use when managing IWMS sub-property zones — floors, rooms, open-plan areas, desks, parking bays — with area, capacity, occupancy, amenities, fire-zone, bookability flag, and GL-account or cost-centre allocation under a parent property. The ISO 41011 §3.3.5 space-management collection."
atomPath: "properties/spaces"
coordinate: "properties/spaces · 1/base · 52339afe"
contentUuid: "9e3c47c6-4ec4-521c-9111-bad41c809715"
diamondUuid: "09e943f9-ce3d-8e76-be58-fab7b1e7fb15"
uuid: "52339afe-8edd-816c-a909-b8a0a40c00f3"
horo: 1
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
  computationUuid: "c7cb304d-db2b-8a9e-8cbb-91d38f3c63c7"
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
      stageUuid: "e47a1a12-9922-8edc-b973-cffd550cda73"
    - stage: seal
      stageUuid: "85bf9bd1-ef6b-8d41-8733-a3b1db6bdc60"
    - stage: uuid
      stageUuid: "5f51acf6-0f74-85e9-bb29-020ebad1ce70"
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
