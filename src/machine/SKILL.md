---
name: machine
description: "Use when modelling shop-floor equipment mined from the upstream source of truth (etrima, 20 years of garment manufacturing) — the machine node of the production-traceability spine. Every machine carries a three-rate spread (pay ≤ cost ≤ price per hour) that is double-entry economics on the floor: machineRate decomposes a machine-hour into revenue = cost + margin and cost = pay + overhead. A machine runs a work/phase for a lot variant during a shift; fields are the real etrima columns, never invented."
atomPath: machine
coordinate: "machine · 2/share · f0af7ccf"
contentUuid: "828797a9-b7ba-5131-86ae-51c6bcddbe81"
diamondUuid: "91671b87-61d6-817f-8301-18f4b6c6e13d"
uuid: "f0af7ccf-5907-8d83-b0c2-93d6f5f46c0d"
horo: 2
bonds:
  in:
    - accounting
    - contracts
    - law
    - lots
    - port
    - work
  out:
    - accounting
    - contracts
    - law
    - lots
    - port
    - work
typography:
  partition: machine
  bondDegree: 18
  neighbors: []
standards:
  - "mined from etrima (Rails source-of-truth) · the machine rate spread as double-entry"
bindings: []
neighbors:
  wikilink:
    - accounting
    - law
    - lots
    - work
  matrix:
    - accounting
    - contracts
    - law
    - lots
    - port
    - work
  backlinks:
    - accounting
    - contracts
    - law
    - lots
    - port
    - work
signatures:
  computationUuid: "910c96a7-c1a2-8d07-9ce6-c7b654a14964"
  stages:
    - stage: path
      stageUuid: "ee1ac092-ea90-8ee0-be23-a48b5d927d1d"
    - stage: trinity
      stageUuid: "c13fa082-138c-86f4-b71a-e0b9c3e90241"
    - stage: boundary
      stageUuid: "a4a44ecc-6d2a-8e5b-9732-28c56c54d0cd"
    - stage: links
      stageUuid: "58de7a37-bb34-8486-8340-e18bf594c02e"
    - stage: horo
      stageUuid: "854df84b-fe62-8e21-9d0e-da45530037ee"
    - stage: seal
      stageUuid: "1e89d487-806b-8232-9825-099d3c3e4ae8"
    - stage: uuid
      stageUuid: "201d7db1-6a8e-85b4-b443-31d811b77b5d"
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
