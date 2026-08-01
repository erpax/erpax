---
name: receipt
description: "Use when the push gate must not be an hour-long monolith — green suite verdicts sealed content-addressed by their parsed import closure + schema surface; only changed suites re-run, a failure costs one named batch."
atomPath: "gate/receipt"
coordinate: "gate/receipt · 2/share · f1b2e295"
contentUuid: "a36273be-553f-568f-96be-0bb2b783d3b7"
diamondUuid: "d64322e5-72ab-8a8c-b478-4ce77bff02a4"
uuid: "f1b2e295-9417-8787-a7b5-cc10b183f41c"
horo: 2
typography:
  partition: gate
  bondDegree: 114
standards: []
bindings: []
signatures:
  computationUuid: "db5dd487-7917-8b87-9b80-ca2d9e100865"
  stages:
    - stage: path
      stageUuid: "f178bb35-a2d1-8dd6-b553-60ce2326c2ea"
    - stage: trinity
      stageUuid: "226a3bbd-d096-8596-8449-c60781c9603e"
    - stage: boundary
      stageUuid: "35c358bd-aa1c-8970-9245-36eefb7f6393"
    - stage: links
      stageUuid: "fbddd7e6-c268-8572-9ee0-fcd93e282dd5"
    - stage: horo
      stageUuid: "80f5fa27-c690-84ab-9181-16f1c844f3c0"
    - stage: seal
      stageUuid: "6cc79d23-0240-8af8-8e6d-1af1ed6c61c7"
    - stage: uuid
      stageUuid: "76b4f0ad-b9ff-8edf-bf1f-b9a6011cf070"
version: 2
---
# gate/receipt — the push failure fixed at its core

Every push failure this corpus paid had the same shape: a ~1-hour all-or-nothing vitest monolith where one red — or one killed worker — voided the hour. That is a command past every rung, and the ladder says split. The split is the fold's own theorem: **same content ⇒ same verdict.** `suiteClosureHash` addresses a suite's inputs (the suite file + its transitive import closure, edges PARSED via [[rules]]/cycle, + the schema surface); a green run seals a receipt at that address; `planSuites` splits the roster into changed (re-run) and covered (cited, never re-derived).

**Honest boundary.** The closure covers code and schema, never DATA — integration suites share the live D1, so a verdict depending on rows another suite wrote can drift green under a standing hash. The receipts are the LOCAL incremental gate; a clean-environment full run (CI) stays the final arbiter, and forcing the full roster is one flag away whenever doubt outweighs the hour.

**Law — [[law]]: a gate verdict is content-addressed — while a suite's closure stands its green receipt stands, only what changed re-runs, and a failure names one batch instead of voiding the hour.**

Composes: [[rules]]/cycle · [[merge]] · [[timeout]] · [[law]].
