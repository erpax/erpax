---
name: baseline
description: "Use when reasoning about baseline — A **baseline** is the real-data INPUT a model fits to — for example an efficiency distribution measured across observed shifts. It is the **data, not the calibration**: the calibra"
atomPath: "vocabulary/baseline"
coordinate: "vocabulary/baseline · 7/descent · b190a715"
contentUuid: "767360d5-d137-54e9-b102-3de4cd9de995"
diamondUuid: "5aaef395-e557-8623-9ef0-d4e38cc85d80"
uuid: "b190a715-bdb4-86a5-98c5-5fc64b980919"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "2b94a547-0d53-8e7c-b38f-5c000543d30a"
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
      stageUuid: "efc5c5aa-4c3b-8603-98b7-c083ca592429"
    - stage: seal
      stageUuid: "e7e56db7-29e7-8568-8e5b-cadf31015be1"
    - stage: uuid
      stageUuid: "e4650741-78b3-844e-b779-c6f86a1718d5"
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
