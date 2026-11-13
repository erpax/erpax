---
name: emr
description: "Use when reasoning about the electronic medical record as a quantum snapshot chain — a patient's health state captured as content-addressed, immutable, append-only encounters and observations, nesting layer after layer, never erased so the full history stays reversible and tamper-evident."
atomPath: "quantum/emr"
coordinate: "quantum/emr · 7/descent · 4b82e652"
contentUuid: "7b289ed8-2345-5e80-af52-6d53fe90430e"
diamondUuid: "b679537f-827e-8044-bd3f-ee7f026811c9"
uuid: "4b82e652-7a1a-804b-a1b7-0e7d714a90c8"
horo: 7
typography:
  partition: quantum
  bondDegree: 44
standards: []
bindings: []
signatures:
  computationUuid: "a9480d79-1c78-8bb1-bbe9-beebb56fd3a2"
  stages:
    - stage: path
      stageUuid: "ec99e960-190c-8ced-a8a5-5b79cc1f7f0b"
    - stage: trinity
      stageUuid: "dbdb3841-d9f9-8e12-b320-11dfac615aca"
    - stage: boundary
      stageUuid: "75174803-b73d-8d06-a14e-a7fc1f245f68"
    - stage: links
      stageUuid: "e22c10ea-d8b5-8db6-ae72-aded3a9927c6"
    - stage: horo
      stageUuid: "069c934f-2800-8281-b959-434a161c2de4"
    - stage: seal
      stageUuid: "c4596230-70d3-8c75-a5a2-332349f60434"
    - stage: uuid
      stageUuid: "bc40f0c2-b232-8ce1-8b04-25460ba342d2"
quantum:
  superposition:
    - akashic
    - analog
    - device
    - diagnosis
    - finality
    - law
    - monitor
    - observation
    - superposition
  collapse:
    - "Use when reasoning about the electronic medical record as a quantum snapshot chain — a patient's health state captured as content-addressed, immutable, append-only encounters and observations, nesting layer after layer, never erased so the full history stays reversible and tamper-evident."
    - "[[akashic]]"
    - "analog"
    - "finality"
    - "observation"
    - "[[patient]]"
    - "[[record]]"
    - "[[uuid]]"
    - "`analogResults` · `reconstructAt` · `EmrObservation` · `AnalogResult`."
    - health
    - "matter-twin:src/quantum/emr/index.ts"
    - snapshot
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: true
    speechResults: false
    computationUuid: "a9480d79-1c78-8bb1-bbe9-beebb56fd3a2"
    contentUuid: "7b289ed8-2345-5e80-af52-6d53fe90430e"
version: 2
---
# quantum/emr — the health-state snapshot chain

The electronic medical record, read quantumly: a [[patient]]'s health is a state that is never overwritten, only **snapshotted**. Each encounter, each observation, each [[diagnosis]] is a content-[[uuid]]'d, immutable capture, append-only — a correction is a *new* superseding entry, never a deletion (reverseible; finality one way — a clinical fact, once recorded, stands).

The layers nest: the record is a snapshot of encounters, each a snapshot of observations — layer after layer (FHIR resources are exactly this content-addressed graph). The whole is the patient's [[akashic]] chain — reconstruct the health state at any past moment and prove nothing was silently changed ([[tamper]]-evident care).

**Analog results.** The chain does not collapse to binary on/off flags — it **provides analog results**: a continuous timeline of measured quantities (vital signs, labs, observation values) sorted by instant, with supersede semantics and point-in-time reconstruction. A systolic BP series is the worked example — `analogResults(entries)` maps the append-only chain to the stream; `reconstructAt(entries, t)` replays the chart as known at *t* (corrections supersede, never delete). Matter-twin: `src/quantum/emr/index.ts` — `analogResults` · `reconstructAt` · `EmrObservation` · `AnalogResult`.

**Law — [[law]]: the EMR is a health-state snapshot chain that provides analog results — each encounter and observation is content-addressed, immutable, append-only; a correction is a new superseding entry never a deletion, so the full history stays reversible, tamper-evident, and reconstructible at any instant.**

@see [[patient]] · health · observation · vital · analog · record · snapshot · [[uuid]] · finality · [[akashic]]

<sub>content-uuid `7b289ed8-2345-5e80-af52-6d53fe90430e` · account `quantum/emr` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
