---
name: machine
description: "Use when modelling shop-floor equipment mined from the upstream source of truth (etrima, 20 years of garment manufacturing) — the machine node of the production-traceability spine. Every machine carries a three-rate spread (pay ≤ cost ≤ price per hour) that is double-entry economics on the floor: machineRate decomposes a machine-hour into revenue = cost + margin and cost = pay + overhead. A machine runs a work/phase for a lot variant during a shift; fields are the real etrima columns, never invented."
atomPath: machine
coordinate: "machine · 4/weave · bc4a6f12"
contentUuid: "8a96e33f-ed5b-5b28-a5a0-9b65f377723c"
diamondUuid: "0c4aa942-1710-86a6-9819-587c0a0af74d"
uuid: "bc4a6f12-143b-8f39-a4b4-c0511f1599ee"
horo: 4
typography:
  partition: machine
  bondDegree: 18
standards:
  - "mined from etrima (Rails source-of-truth) · the machine rate spread as double-entry"
bindings: []
signatures:
  computationUuid: "fab25c34-a5e4-8b85-a23e-bd7137883db7"
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
      stageUuid: "ee8e3697-0b65-8443-bd93-27140e74d6e9"
    - stage: seal
      stageUuid: "1e89d487-806b-8232-9825-099d3c3e4ae8"
    - stage: uuid
      stageUuid: "3dd00c04-5863-8249-ac06-89603f530d7a"
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
