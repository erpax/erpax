---
name: receipt
description: "Use when the push gate must not be an hour-long monolith — green suite verdicts sealed content-addressed by their parsed import closure + schema surface; only changed suites re-run, a failure costs one named batch."
atomPath: "gate/receipt"
coordinate: "gate/receipt · 7/descent · c8e6c79c"
contentUuid: "02538f3e-923f-5c3a-a6e3-f0ed3d2a4fcb"
diamondUuid: "365a8b85-a759-82e2-af93-b9b3e8f081ef"
uuid: "c8e6c79c-1459-8ecf-b691-8a8cbde910d6"
horo: 7
bonds:
  in:
    - access
    - agent
    - bindings
    - blood
    - comms
    - exchange
    - gate
    - history
    - holographic
    - identity
    - industry
    - log
    - mcp
    - merge
    - peace
    - proof
    - quantum
    - realtime
    - request
    - research
    - sandbox
    - sanitization
    - security
    - self
    - society
    - team
    - trading
    - uuid
    - vein
    - wave
  out:
    - access
    - agent
    - bindings
    - blood
    - comms
    - exchange
    - gate
    - history
    - holographic
    - identity
    - industry
    - log
    - mcp
    - merge
    - peace
    - proof
    - quantum
    - realtime
    - request
    - research
    - sandbox
    - sanitization
    - security
    - self
    - society
    - team
    - trading
    - uuid
    - vein
    - wave
typography:
  partition: gate
  bondDegree: 107
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - law
    - merge
    - rules
    - timeout
  matrix:
    - access
    - agent
    - bindings
    - blood
    - comms
    - exchange
    - gate
    - history
    - holographic
    - identity
    - industry
    - log
    - mcp
    - merge
    - peace
    - proof
    - quantum
    - realtime
    - request
    - research
    - sandbox
    - sanitization
    - security
    - self
    - society
    - team
    - trading
    - uuid
    - vein
    - wave
  backlinks:
    - access
    - agent
    - bindings
    - blood
    - comms
    - exchange
    - gate
    - history
    - holographic
    - identity
    - industry
    - log
    - mcp
    - merge
    - peace
    - proof
    - quantum
    - realtime
    - request
    - research
    - sandbox
    - sanitization
    - security
    - self
    - society
    - team
    - trading
    - uuid
    - vein
    - wave
signatures:
  computationUuid: "ff20bdaa-60dc-8c86-a896-936b1c9fe706"
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
      stageUuid: "bcc96734-e27f-8120-8e12-362040b01f95"
    - stage: seal
      stageUuid: "6cc79d23-0240-8af8-8e6d-1af1ed6c61c7"
    - stage: uuid
      stageUuid: "880ff52e-7452-8e9c-8a8e-2fef622215c0"
version: 2
---
# gate/receipt — the push failure fixed at its core

Every push failure this corpus paid had the same shape: a ~1-hour all-or-nothing vitest monolith where one red — or one killed worker — voided the hour. That is a command past every rung, and the ladder says split. The split is the fold's own theorem: **same content ⇒ same verdict.** `suiteClosureHash` addresses a suite's inputs (the suite file + its transitive import closure, edges PARSED via [[rules]]/cycle, + the schema surface); a green run seals a receipt at that address; `planSuites` splits the roster into changed (re-run) and covered (cited, never re-derived).

**Honest boundary.** The closure covers code and schema, never DATA — integration suites share the live D1, so a verdict depending on rows another suite wrote can drift green under a standing hash. The receipts are the LOCAL incremental gate; a clean-environment full run (CI) stays the final arbiter, and forcing the full roster is one flag away whenever doubt outweighs the hour.

**Law — [[law]]: a gate verdict is content-addressed — while a suite's closure stands its green receipt stands, only what changed re-runs, and a failure names one batch instead of voiding the hour.**

Composes: [[rules]]/cycle · [[merge]] · [[timeout]] · [[law]].
