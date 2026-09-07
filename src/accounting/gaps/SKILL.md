---
name: gaps
description: "Use when scanning the corpus's own accounting for entropy gaps — waveAccountingGapViolations walks the README model in OOM-safe horo waves; fixGapsOnP0 applies P0 fixes. Corpus SELF-accounting dev tooling, nested off the mountable @erpax/accounting face."
atomPath: "accounting/gaps"
coordinate: "accounting/gaps · 5/round · 27b70097"
contentUuid: "6390a2d8-386d-5f53-a44d-0faeb0a5c9ab"
diamondUuid: "5f2c69fe-9207-8f9b-b919-2c5f6dc2b4a7"
uuid: "27b70097-567e-8d63-b524-72ecd527e46b"
horo: 5
typography:
  partition: accounting
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "b883ee00-d4b5-8223-85b8-b8fd22ab003f"
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
      stageUuid: "7733e512-6c40-89e8-afc0-f8a2df270223"
    - stage: seal
      stageUuid: "6d298312-c457-8782-b636-dad0c4075578"
    - stage: uuid
      stageUuid: "c9c03c39-4436-8c4f-930e-74d8469bf773"
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
