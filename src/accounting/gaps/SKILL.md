---
name: gaps
description: "Use when scanning the corpus's own accounting for entropy gaps — waveAccountingGapViolations walks the README model in OOM-safe horo waves; fixGapsOnP0 applies P0 fixes. Corpus SELF-accounting dev tooling, nested off the mountable @erpax/accounting face."
atomPath: "accounting/gaps"
coordinate: "accounting/gaps · 7/descent · e134102b"
contentUuid: "8533bb95-d8cb-5294-bc58-b5213c11c5a5"
diamondUuid: "5c85ecd5-7b2e-8149-ac30-8dae68f4a8a2"
uuid: "e134102b-5e36-8f40-b89f-964af1e4c7ca"
horo: 7
typography:
  partition: accounting
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "ccf12eb3-c66c-8cf6-a3cd-f31197f1e8d6"
  stages:
    - stage: path
      stageUuid: "cdd8b4fb-244b-811e-a4aa-afcd766cbcc0"
    - stage: trinity
      stageUuid: "26f4e229-aeed-8e32-9a3c-94b173b665a1"
    - stage: boundary
      stageUuid: "eb15d54a-8194-8a7d-b4c7-bf7b26273ef9"
    - stage: links
      stageUuid: "f8f3be61-17df-8db0-8b09-ec161c5688a0"
    - stage: horo
      stageUuid: "54ec2a8f-fcdd-8fc6-a86c-ea829e135fcf"
    - stage: seal
      stageUuid: "6d298312-c457-8782-b636-dad0c4075578"
    - stage: uuid
      stageUuid: "ab7284c7-9ca9-8a76-9c97-96a849b52181"
version: 2
---
# accounting/gaps — the wave-batch entropy gap scan

Corpus **self**-accounting, not ERP accounting: `waveAccountingGapViolations` walks the
README corpus model in OOM-safe horo waves and reports the entropy gaps (unbalanced
atoms) as violations; `fixGapsOnP0` applies the P0 fixes + regen;
`accountingGapsInWaves`/`formatAccountingGapsReport` are the scan + report faces.
CLI lane: `erpax accounting gaps` (`./cli.ts`).

Nested as a child atom so the domain face stays mountable: this module scans **this
repo's** corpus (filesystem walks through [[readme]]/compute), which a host app
mounting `@erpax/accounting` does not have. Keeping it off the [[accounting]] barrel
severs the edge that dragged readme/compute — and through it the 4MB generated
matrix — into every accounting bundle.

**Law — [[law]]: dev tooling that scans the corpus rides its own child-atom face,
never the mountable domain barrel — a host app has no corpus, and the edge it
drags in is pure bundle entropy.**

**Sealed.** `waveAccountingGapViolations` folded the whole readme model on every call — measured 22.5–40.2 s
on an unchanged tree, paid by every coil and every develop. It is a pure function of the tree, so it is
sealed by the corpus fingerprint ([[cache]]/fingerprint, on disk): 0.17 s on the hit, recomputed on any
edit. Through the gateway a develop call fell from 226 s to 12 s once both this and the unreached census
were sealed (2026-10-03).

Composes: [[accounting]] · [[readme]] · [[wave]] · [[rules]] · [[cache]]/fingerprint.
