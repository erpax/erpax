---
name: workflow
description: "Use when reasoning about workflow — An invoice moves through a fixed set of states, and only along edges the graph allows."
atomPath: "receivable/workflow"
coordinate: "receivable/workflow · 4/weave · 25538d97"
contentUuid: "08532a3e-594d-575f-9d30-c75172cab43c"
diamondUuid: "ccd9d789-4fbf-8c74-bd08-5c86dd6562a6"
uuid: "25538d97-21d5-86a5-a8dd-0a44b57578b6"
horo: 4
typography:
  partition: receivable
  bondDegree: 107
standards:
  - "EN-16931:2017 invoice-lifecycle"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "IFRS IFRS-9 written_off impairment"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "448d6573-316e-8266-84b5-0b568c31eda1"
  stages:
    - stage: path
      stageUuid: "f8d03570-37c1-8cd7-a44b-9f6b7d796f83"
    - stage: trinity
      stageUuid: "06289518-2609-8db5-b10e-13651fcec91a"
    - stage: boundary
      stageUuid: "e6bc596e-2f12-81a9-a6df-7f64c17fec2b"
    - stage: links
      stageUuid: "7019c206-d64f-8d0d-9fef-cf86c95bbc77"
    - stage: horo
      stageUuid: "0f28e134-47a9-8e02-b3bc-4db51e491bd8"
    - stage: seal
      stageUuid: "ba465e34-a0cc-8109-aa96-d3d8339653aa"
    - stage: uuid
      stageUuid: "8bc1982b-2c02-8a8f-89cc-78ff0bad4076"
version: 2
---
# receivable/workflow — the invoice lifecycle as a directed graph

An invoice moves through a fixed set of states, and only along edges the graph allows.

`draft → issued → partial | paid | overdue | written_off`

The mirror of [[payable]]/workflow, and deliberately not the same graph: an invoice becomes live on
ISSUE and stays live through its grace period, where a bill becomes live on APPROVAL. Folding the
two lifecycles into one is what silently changed A/P behaviour once already
([[invoices]]/hooks/transition).

`written_off` is a terminal state that must be reachable only from an overdue one — a write-off of
something never issued is an entry with no counterpart.

**Why it is a child atom.** It was `workflow.service.ts` beside the barrel. When [[receivable]] gained
the SKILL its code always warranted, that folder became an ATOM — and matter at an atom root is a
stray sibling ([[rules]]): only the trinity lives beside a barrel. Nesting it is the lawful form, and
the parent re-exports it, so no caller changed.

**Honest boundary.** This computes; it does not decide. The inputs — rates, terms, thresholds — are
given by the caller or the tenant, and nothing here validates that they are the right ones.

Composes: [[receivable]] · [[law]].

## Standards

- **IFRS 15** — revenue from contracts with customers.
