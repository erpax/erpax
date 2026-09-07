---
name: cli
description: "Use when invoking operational gates from package.json — erpax routes readme, lint, test, rules, apply, and confirm without bloating scripts."
atomPath: cli
coordinate: "cli · 1/base · bf8a3506"
contentUuid: "0326949e-d855-5e96-b8d7-8a9a01597af3"
diamondUuid: "77d718c3-e713-8370-91c1-9516d6d1cb10"
uuid: "bf8a3506-cad5-8220-a7d8-84ff282430f1"
horo: 1
typography:
  partition: cli
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "b4518c2e-7481-88e0-81f7-856da25a316e"
  stages:
    - stage: path
      stageUuid: "ec9bf598-cfd2-850f-adf6-08c8935f70dd"
    - stage: trinity
      stageUuid: "e95d41cf-ba06-8318-8b76-d25f30a7f21e"
    - stage: boundary
      stageUuid: "562251fa-5b3b-87b6-8411-92ecaf965925"
    - stage: links
      stageUuid: "44b5c7c5-6565-8330-bcdc-7d8115986ffc"
    - stage: horo
      stageUuid: "c0d7df18-54f3-8df3-b04e-184303e0d19a"
    - stage: seal
      stageUuid: "387a768d-e694-819c-8b4c-131931d83d67"
    - stage: uuid
      stageUuid: "98cb1275-d537-8857-953f-cd29f3bee668"
version: 2
---
# cli

The minimal operational router (`pnpm erpax`, `pnpm check`). Matter lives in src atoms; package.json keeps lifecycle scripts only.

@see ./index.ts · ./registry.ts · ./gate.ts
