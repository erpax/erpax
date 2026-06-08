---
name: "lead-score"
description: "Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales."
atomPath: "lead-score"
coordinate: "lead-score · 4/weave · 0f7c211a"
contentUuid: "2a1fa83d-7549-5a51-9b27-21c5cea22582"
diamondUuid: "f0430b98-21c1-828f-988c-7bf600b209b4"
uuid: "0f7c211a-c6a3-8a06-86ab-00a69f52307b"
horo: 4
bonds:
  in:
    - activities
    - law
    - leads
    - opportunities
    - prospect
    - segment
  out:
    - activities
    - law
    - leads
    - opportunities
    - prospect
    - segment
typography:
  partition: "lead-score"
  bondDegree: 19
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - activities
    - law
    - leads
    - opportunities
    - prospect
    - segment
  matrix:
    - activities
    - law
    - leads
    - opportunities
    - prospect
    - segment
  backlinks:
    - activities
    - law
    - leads
    - opportunities
    - prospect
    - segment
signatures:
  computationUuid: "a67d71d2-aebe-8982-b580-92c9bfa01db3"
  stages:
    - stage: path
      stageUuid: "b86b5f7b-0150-8a50-8509-a33db611db9f"
    - stage: trinity
      stageUuid: "d7c479df-e87d-8d5e-972b-fdcc0653b088"
    - stage: boundary
      stageUuid: "345bbd45-5f57-8eb2-ac85-9c9b1a77b5b1"
    - stage: links
      stageUuid: "103c6a71-b61d-8453-a9c8-789f4bd5541e"
    - stage: horo
      stageUuid: "5f5582ea-754f-8f45-9829-55fdbd6d7fc6"
    - stage: seal
      stageUuid: "e54c23ea-6b0b-8631-92a7-fc482403f78a"
    - stage: uuid
      stageUuid: "500741e5-4e9d-863c-896b-e4e89455e36c"
version: 2
---
# lead-score

Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales.

Composes: [[Leads]] · [[Opportunities]] · [[segment]] · [[Activities]] · [[prospect]].

**Law — [[law]]: a lead-score is a DERIVED ranking of prospect quality (behavioural + firmographic signals against a model), not stored truth — a threshold crossing is the handoff event to sales.**

## Standards
- CRM-generic
