---
name: baseline
description: "Use when reasoning about baseline — A **baseline** is the real-data INPUT a model fits to — for example an efficiency distribution measured across observed shifts. It is the **data, not the calibration**: the calibra"
atomPath: baseline
coordinate: baseline · 8/crest · 156cb177
contentUuid: "23bf7416-536a-51a1-b575-f1eed7833876"
diamondUuid: "9d765c83-ab5d-81d6-93b8-674c46fa128f"
uuid: "156cb177-8811-8ac3-88ed-214ff5fb0b38"
horo: 8
bonds:
  in:
    - akashic
    - allocation
    - calculate
    - decompression
    - derive
    - empirical
    - horo
    - lineage
    - manufacturing
    - measure
    - rodin
    - sampling
    - source
  out:
    - akashic
    - allocation
    - calculate
    - decompression
    - derive
    - empirical
    - horo
    - lineage
    - manufacturing
    - measure
    - rodin
    - sampling
    - source
typography:
  partition: baseline
  bondDegree: 40
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - akashic
    - allocation
    - calculate
    - decompression
    - derive
    - empirical
    - horo
    - lineage
    - manufacturing
    - measure
    - rodin
    - sampling
    - source
  matrix:
    - akashic
    - allocation
    - calculate
    - decompression
    - derive
    - empirical
    - horo
    - lineage
    - manufacturing
    - measure
    - rodin
    - sampling
    - source
  backlinks:
    - akashic
    - allocation
    - calculate
    - decompression
    - derive
    - empirical
    - horo
    - lineage
    - manufacturing
    - measure
    - rodin
    - sampling
    - source
signatures:
  computationUuid: "c6642f3f-61d0-8cc2-8308-8fd0e9f4a1e3"
  stages:
    - stage: path
      stageUuid: "e91d0ccc-bcb4-82cd-92a1-91579a4c5808"
    - stage: trinity
      stageUuid: "3f438d6e-766f-83c3-87f4-278bb8a893a0"
    - stage: boundary
      stageUuid: "b2d82659-0b2f-80d3-8097-f516bece40e7"
    - stage: links
      stageUuid: "d91ca300-536b-8cef-964d-a6407f3ff441"
    - stage: horo
      stageUuid: "794d4b62-fb7b-8f81-ab09-f87378b4966d"
    - stage: seal
      stageUuid: "61c44c64-4c7b-86bd-a492-067119cf6b57"
    - stage: uuid
      stageUuid: "daf99409-e978-8f6f-b7f6-f03494ac2239"
version: 2
---
# baseline — the measured reference a calibration is computed from

A **baseline** is the real-data INPUT a model fits to — for example an efficiency distribution `{ median 75, p99 167, standard 100 }` measured across observed shifts. It is the **data, not the calibration**: the calibration is [[derive]]d from the baseline, never hardcoded.

```ts
// the baseline is the observed distribution; the calibration is COMPUTED from it
export const BASELINE_EFFICIENCY = { medianPct: 75, p99Pct: 167, standardPct: 100 }
export const EFFICIENCY_CALIBRATION = computeCalibration(BASELINE_EFFICIENCY)
```

**Why split baseline from calibration.** Separating the measured input from the fitted output makes the model **self-recomputing**: change the [[source]] — another tenant, another year — and the curve refits itself with no edit to code. A hardcoded `{ 0.75, 1.0, 1.67 }` is a frozen guess; a baseline + `computeCalibration` is a living fit. This is the [[derive]] / [[empirical]] law in one artifact.

**Agnostic naming.** A baseline is named for its **role** — `BASELINE_EFFICIENCY`, `BASELINE_PAY` — never for the organisation it was measured at. The provenance (which company, which host, which rows, which years) is [[empirical]] warrant that lives in [[akashic]] / [[lineage]], not in the identifier. The number is universal; only the proper noun is anonymised away. This is anonymisation as agnostic architecture: the same baseline shape accepts any [[source]].

**On the ring.** A real distribution tends to cluster on a small set of harmonic positions ([[horo]] · [[rodin]]) — the median sits *below* the standard (off-gassing, see [[decompression]]), and the calibration reads those positions as the pay/allocation curve ([[allocation]]). The baseline is therefore also the bridge from raw measurement to the harmonic model.

Composes [[empirical]] · [[source]] · [[derive]] · [[calculate]] · [[measure]] · [[sampling]] · [[akashic]] · [[lineage]] · [[horo]] · [[rodin]] · [[decompression]] · [[allocation]] · [[manufacturing]].
