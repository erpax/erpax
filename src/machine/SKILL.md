---
name: machine
description: "Use when modelling shop-floor equipment mined from the upstream source of truth (etrima, 20 years of garment manufacturing) — the machine node of the production-traceability spine. Every machine carries a three-rate spread (pay ≤ cost ≤ price per hour) that is double-entry economics on the floor: machineRate decomposes a machine-hour into revenue = cost + margin and cost = pay + overhead. A machine runs a work/phase for a lot variant during a shift; fields are the real etrima columns, never invented."
atomPath: machine
coordinate: "machine · 2/share · 8e70cbc0"
contentUuid: "75b83230-29eb-5c05-9da4-db20c01b5f29"
diamondUuid: "54fcb5ec-c1a9-857c-820a-fc9bd930b13b"
uuid: "8e70cbc0-c46f-8637-8f45-9ab79de69ae8"
horo: 2
typography:
  partition: machine
  bondDegree: 18
standards:
  - "mined from etrima (Rails source-of-truth) · the machine rate spread as double-entry"
bindings: []
signatures:
  computationUuid: "c4e8d456-2b35-89ae-8b51-cfec4e174900"
  stages:
    - stage: path
      stageUuid: "ee1ac092-ea90-8ee0-be23-a48b5d927d1d"
    - stage: trinity
      stageUuid: "c13fa082-138c-86f4-b71a-e0b9c3e90241"
    - stage: boundary
      stageUuid: "0ba4f5da-7880-8ae4-9098-d8ee6eb8ba3f"
    - stage: links
      stageUuid: "58de7a37-bb34-8486-8340-e18bf594c02e"
    - stage: horo
      stageUuid: "9f505eef-d94d-8857-bea5-e07ee96cb846"
    - stage: seal
      stageUuid: "1e89d487-806b-8232-9825-099d3c3e4ae8"
    - stage: uuid
      stageUuid: "11140aae-d0cb-8b44-a290-46e6482d54ce"
version: 2
---
# machine — the equipment node, mined from upstream

The first fold of the **upstream gap**: erpax had the governance/fiscal tiers but not the manufacturing operations spine. `machine` is the equipment node, taken from the real source of truth — etrima's 20-year production DB (101 machines · 172 machine_types).

The schema handed over the fold. Every machine carries **three real per-hour rates**:

- `payPerHour` — what labour running it is paid
- `costPerHour` — what the run truly costs (labour + overhead + wear)
- `pricePerHour` — what the order is charged

That is **double-entry economics on the shop floor**. `machineRate(rates, hours)` decomposes a machine-hour exactly:

`revenue = cost + margin` · `cost = pay + overhead`

— the same conservation the corpus books everywhere else ([[accounting]]), now on the floor. A machine-hour is Dr cost / Cr revenue; the margin is the sealed difference, and a loss machine surfaces a negative margin rather than hiding it.

Matter-twin: `src/machine/index.ts` — `machineRate` · `typeThroughput` · `MachineType` (the etrima classification: `machinesPerWorker`, per-minute economics). A machine runs a [[work]]/phase for a [[lots]] variant during a work-shift — the traceability **edges** (`lot_work_phase`, 291k rows) are the larger fold; this is the node they attach to.

**Honest boundary.** Fields are the *real etrima columns*, mined from the Rails source-of-truth — never invented. This is the node; the full spine (`work_phase → lot_work_phase → machine → work_shift`, plus variants and packing detail) is the ongoing upstream fold. The rate spread is exact arithmetic; the tie to double-entry is the corpus's own conservation law, not a metaphor.

**Law — [[law]]: a machine-hour is a spread, not a number — price = cost + margin, cost = pay + overhead — mined from the upstream source of truth and booked like every other entry. The equipment node of the traceability spine; the edges follow.**

## Standards

- **etrima (Rails source-of-truth)** — the real `machines` / `machine_types` schema; the mining directive is *always fold upstream*.
- **Double-entry** — the machine rate spread as a conserved Dr/Cr decomposition.

Composes: [[accounting]] · [[work]] · [[lots]] · [[law]].
