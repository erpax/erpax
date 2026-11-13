---
name: workflow
description: "Use when reasoning about workflow — An invoice moves through a fixed set of states, and only along edges the graph allows."
atomPath: "receivable/workflow"
coordinate: "receivable/workflow · 8/crest · bac8616c"
contentUuid: "77b96c3c-e250-5e92-a4dc-d1a3b12fb122"
diamondUuid: "907aac26-e881-8529-bdd7-54eb60eb6d86"
uuid: "bac8616c-2844-8aa1-b2cb-4884956feae0"
horo: 8
typography:
  partition: receivable
  bondDegree: 55
standards:
  - "EN-16931:2017 invoice-lifecycle"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "IFRS IFRS-9 written_off impairment"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "6f83514b-6d29-859a-9578-6a35cc8eda54"
  stages:
    - stage: path
      stageUuid: "f8d03570-37c1-8cd7-a44b-9f6b7d796f83"
    - stage: trinity
      stageUuid: "06289518-2609-8db5-b10e-13651fcec91a"
    - stage: boundary
      stageUuid: "35c144fa-12b7-8671-a236-378d1546062a"
    - stage: links
      stageUuid: "7019c206-d64f-8d0d-9fef-cf86c95bbc77"
    - stage: horo
      stageUuid: "903872a8-598a-81cf-81a2-32eef61beb80"
    - stage: seal
      stageUuid: "ba465e34-a0cc-8109-aa96-d3d8339653aa"
    - stage: uuid
      stageUuid: "5284f915-e8be-84f6-be86-b8429e72a490"
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
