---
name: gaps
description: "Use when scanning the corpus's own accounting for entropy gaps — waveAccountingGapViolations walks the README model in OOM-safe horo waves; fixGapsOnP0 applies P0 fixes. Corpus SELF-accounting dev tooling, nested off the mountable @erpax/accounting face."
atomPath: "accounting/gaps"
coordinate: "accounting/gaps · 4/weave · 768bea66"
contentUuid: "cb3bce26-096e-5247-bcca-0e67485d6977"
diamondUuid: "b08ac82e-ef30-8db4-b166-2406da619f6d"
uuid: "768bea66-981f-825b-864c-30a0c93610ec"
horo: 4
typography:
  partition: accounting
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "0b971ffc-90a4-80da-b56f-9f284b5dab8e"
  stages:
    - stage: path
      stageUuid: "cdd8b4fb-244b-811e-a4aa-afcd766cbcc0"
    - stage: trinity
      stageUuid: "26f4e229-aeed-8e32-9a3c-94b173b665a1"
    - stage: boundary
      stageUuid: "88d82950-e084-8295-ac79-c5180e5dcfc4"
    - stage: links
      stageUuid: "0c1cc9a5-2870-8a05-a231-5da1a844c352"
    - stage: horo
      stageUuid: "831d9349-4669-82c4-bec9-762d33e91710"
    - stage: seal
      stageUuid: "6d298312-c457-8782-b636-dad0c4075578"
    - stage: uuid
      stageUuid: "63f7bb97-ee78-8652-bcd7-7b2bcbaae4f4"
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

Composes: [[accounting]] · [[readme]] · [[wave]] · [[rules]].
