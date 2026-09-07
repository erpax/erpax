---
name: baseline
description: "Use when reasoning about baseline — A **baseline** is the real-data INPUT a model fits to — for example an efficiency distribution measured across observed shifts. It is the **data, not the calibration**: the calibra"
atomPath: "vocabulary/baseline"
coordinate: "vocabulary/baseline · 7/descent · 43c70d51"
contentUuid: "89f9128b-be39-5540-9dde-0b7a5f65924a"
diamondUuid: "af415f73-23ba-887d-9252-3fe68b5763d4"
uuid: "43c70d51-499f-89fa-adfb-c2c6450f9330"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "4bc7f073-4b68-8bc2-92f0-10c2442119eb"
  stages:
    - stage: path
      stageUuid: "ba4f60de-fff5-8bba-bf7b-a91573b10ca4"
    - stage: trinity
      stageUuid: "ec3bfc40-769c-838c-a083-af4dae76515b"
    - stage: boundary
      stageUuid: "b886a231-6688-8da3-a18d-ef79384cc1c3"
    - stage: links
      stageUuid: "651e4b8e-5d02-8ebe-868e-322e21b7c59a"
    - stage: horo
      stageUuid: "169bb172-b7b2-8824-8c1b-90d1a464ca1c"
    - stage: seal
      stageUuid: "e7e56db7-29e7-8568-8e5b-cadf31015be1"
    - stage: uuid
      stageUuid: "70160807-d3fe-8dcf-b2d6-2f3bf04322ec"
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
