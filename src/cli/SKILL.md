---
name: cli
description: "Use when invoking operational gates from package.json — erpax routes readme, lint, test, rules, apply, and confirm without bloating scripts."
atomPath: cli
coordinate: "cli · 1/base · 56bb8dea"
contentUuid: "e144a589-dd19-516f-86ec-442e4d4d94e0"
diamondUuid: "289991a9-54dd-8527-a8b9-c41021e27f7c"
uuid: "56bb8dea-844a-80ef-b14c-6db43babfff2"
horo: 1
bonds:
  in:
    - scalpel
  out:
    - scalpel
typography:
  partition: cli
  bondDegree: 3
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink: []
  matrix:
    - scalpel
  backlinks:
    - scalpel
signatures:
  computationUuid: "bd61a55e-1271-8103-aed2-3673fdbd262b"
  stages:
    - stage: path
      stageUuid: "ec9bf598-cfd2-850f-adf6-08c8935f70dd"
    - stage: trinity
      stageUuid: "e95d41cf-ba06-8318-8b76-d25f30a7f21e"
    - stage: boundary
      stageUuid: "9543e402-0de3-8a91-8719-261d69f65f49"
    - stage: links
      stageUuid: "44b5c7c5-6565-8330-bcdc-7d8115986ffc"
    - stage: horo
      stageUuid: "fbe5ae1b-7c91-88c9-b4f9-c8812d16e53b"
    - stage: seal
      stageUuid: "387a768d-e694-819c-8b4c-131931d83d67"
    - stage: uuid
      stageUuid: "ed667041-5289-8225-88bb-c902dff3962c"
version: 2
---
# cli

The minimal operational router (`pnpm erpax`, `pnpm check`). Matter lives in src atoms; package.json keeps lifecycle scripts only.

@see ./index.ts · ./registry.ts · ./gate.ts
