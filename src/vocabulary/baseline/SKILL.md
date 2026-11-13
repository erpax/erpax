---
name: baseline
description: "Use when reasoning about baseline — A **baseline** is the real-data INPUT a model fits to — for example an efficiency distribution measured across observed shifts. It is the **data, not the calibration**: the calibra"
atomPath: "vocabulary/baseline"
coordinate: "vocabulary/baseline · 4/weave · 10cbac99"
contentUuid: "4dbef73e-bf58-5044-b075-e0caea082ec0"
diamondUuid: "dc3419be-55b1-8933-946f-ad5b4c866e23"
uuid: "10cbac99-5d6d-8a12-937b-4e2692bf5ca9"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 36
standards: []
bindings: []
signatures:
  computationUuid: "e68654d9-70ba-8ca6-af86-9bcef69df199"
  stages:
    - stage: path
      stageUuid: "ba4f60de-fff5-8bba-bf7b-a91573b10ca4"
    - stage: trinity
      stageUuid: "ec3bfc40-769c-838c-a083-af4dae76515b"
    - stage: boundary
      stageUuid: "54c1d17f-950d-8137-8695-52794f135e07"
    - stage: links
      stageUuid: "0d9f4e1a-61e7-832c-a399-8baa46f07739"
    - stage: horo
      stageUuid: "7826f9db-6511-865c-bc7f-83fa4f131fe7"
    - stage: seal
      stageUuid: "e7e56db7-29e7-8568-8e5b-cadf31015be1"
    - stage: uuid
      stageUuid: "578a55fb-f9cd-86e0-a9bd-dfc6a68e1f43"
version: 2
---
# baseline — the measured reference a calibration is computed from

A **baseline** is the real-data INPUT a model fits to — for example an efficiency distribution `{ median 75, p99 167, standard 100 }` measured across observed shifts. It is the **data, not the calibration**: the calibration is [[derive]]d from the baseline, never hardcoded.

```ts
// the baseline is the observed distribution; the calibration is COMPUTED from it
export const BASELINE_EFFICIENCY = { medianPct: 75, p99Pct: 167, standardPct: 100 }
export const EFFICIENCY_CALIBRATION = computeCalibration(BASELINE_EFFICIENCY)
```

**Why split baseline from calibration.** Separating the measured input from the fitted output makes the model **self-recomputing**: change the source — another tenant, another year — and the curve refits itself with no edit to code. A hardcoded `{ 0.75, 1.0, 1.67 }` is a frozen guess; a baseline + `computeCalibration` is a living fit. This is the [[derive]] / [[empirical]] law in one artifact.

**Agnostic naming.** A baseline is named for its **role** — `BASELINE_EFFICIENCY`, `BASELINE_PAY` — never for the organisation it was measured at. The provenance (which company, which host, which rows, which years) is [[empirical]] warrant that lives in [[akashic]] / [[lineage]], not in the identifier. The number is universal; only the proper noun is anonymised away. This is anonymisation as agnostic architecture: the same baseline shape accepts any source.

**On the ring.** A real distribution tends to cluster on a small set of harmonic positions ([[horo]] · [[rodin]]) — the median sits *below* the standard (off-gassing, see [[decompression]]), and the calibration reads those positions as the pay/allocation curve ([[allocation]]). The baseline is therefore also the bridge from raw measurement to the harmonic model.

Composes [[empirical]] · source · [[derive]] · [[calculate]] · [[measure]] · sampling · [[akashic]] · [[lineage]] · [[horo]] · [[rodin]] · [[decompression]] · [[allocation]] · [[manufacturing]].
