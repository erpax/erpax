---
name: workflow
description: Use when reasoning about workflow — .
atomPath: "receivable/workflow"
coordinate: "receivable/workflow · 5/round · 921c40ff"
contentUuid: "3cfb65bd-27ce-5d6e-b78c-12c14f5ece91"
diamondUuid: "f299ba35-f078-8628-9396-4a509b1663f8"
uuid: "921c40ff-1f75-8e30-99b9-61dfeecb1a2f"
horo: 5
typography:
  partition: receivable
  bondDegree: 79
standards:
  - "EN-16931:2017 invoice-lifecycle"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "IFRS IFRS-9 written_off impairment"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "4c2ccc88-e6f2-8e52-9a30-902122ded235"
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
      stageUuid: "4ef34c3c-73ff-8fbc-8a3d-172fae66bd93"
    - stage: seal
      stageUuid: "ba465e34-a0cc-8109-aa96-d3d8339653aa"
    - stage: uuid
      stageUuid: "55b7b6e4-9111-85c6-819d-03bf1a9c19c4"
version: 2
---
# receivable/workflow — the invoice lifecycle as a directed graph

`draft → issued → partial | paid | overdue | written_off`.

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
