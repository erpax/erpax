---
name: spaces
description: "Use when managing IWMS sub-property zones — floors, rooms, open-plan areas, desks, parking bays — with area, capacity, occupancy, amenities, fire-zone, bookability flag, and GL-account or cost-centre allocation under a parent property. The ISO 41011 §3.3.5 space-management collection."
atomPath: properties/spaces
coordinate: properties/spaces · 2/share · f1ebbe08
contentUuid: "573eebdb-c2b4-528e-9763-f4db928e17b7"
diamondUuid: "5178872b-d4f8-8478-aacf-348e545567f0"
uuid: "f1ebbe08-674b-8f6b-9094-933945eb060d"
horo: 2
bonds:
  in:
    - accounting
    - properties
    - requests
    - space
    - standard
  out:
    - accounting
    - properties
    - requests
    - space
    - standard
typography:
  partition: properties
  bondDegree: 16
  neighbors: []
standards:
  - "EN-15221-6:2011 facility-management area-and-space-measurement"
  - "EU-2011/83"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ILO-C100"
  - "ISO-19011:2018 audit-trail space-master-changes"
  - "ISO-19650-1:2018 information-management-using-bim"
  - "ISO-41001"
  - "ISO-41001:2018 facility-management-management-systems"
  - "ISO-41011:2017 §3.3.5 facility-management space-vocabulary"
  - "SOX §404 internal-controls space-allocation"
bindings: []
neighbors:
  wikilink:
    - accounting
    - properties
    - standard
  matrix:
    - accounting
    - properties
    - requests
    - space
    - standard
  backlinks:
    - accounting
    - properties
    - requests
    - space
    - standard
signatures:
  computationUuid: "253c1f94-6805-8c72-91e1-670cfca7f7e6"
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
      stageUuid: "87317b1b-0248-81d1-90b2-a4eef3d13f36"
    - stage: seal
      stageUuid: "38b8514a-f90e-8e1b-8601-7621df486e01"
    - stage: uuid
      stageUuid: "b65ae8e9-6988-8014-834f-f61685def444"
version: 2
---
# spaces

Sub-property zones (floor / room / desk / zone) for IWMS. Single-folder collection: schema + standards in `index.ts`, opening data in `seed.ts`, invariant checks in `index.test.ts`.

## Standards
- ISO-41001:2018 facility-management-management-systems
- ISO-41011:2017 §3.3.5 facility-management space-vocabulary
- ISO-19650-1:2018 information-management-using-bim
- EN-15221-6:2011 facility-management area-and-space-measurement
- ISO-19011:2018 audit-trail space-master-changes
- SOX §404 internal-controls space-allocation
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[standard]] · [[accounting]] · [[Properties]].
