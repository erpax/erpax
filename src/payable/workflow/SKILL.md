---
name: workflow
description: "Use when reasoning about workflow — A bill moves through a fixed set of states, and only along edges the graph allows."
atomPath: "payable/workflow"
coordinate: "payable/workflow · 2/share · d80c3fbc"
contentUuid: "75ff669b-270a-5907-a700-0b7deb83b108"
diamondUuid: "5aac1a42-3043-8b86-bf02-0ec139d2f80d"
uuid: "d80c3fbc-46b6-882a-b06e-5fc74cd2552b"
horo: 2
typography:
  partition: payable
  bondDegree: 107
standards:
  - "EN-16931:2017 invoice-lifecycle"
  - "IFRS IAS-37 provisions-contingent-liabilities"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-405 liabilities"
bindings: []
signatures:
  computationUuid: "781d258b-e9ec-8a85-b66d-06a3e89b070c"
  stages:
    - stage: path
      stageUuid: "e23d7671-e347-8a44-b885-22c03db77daa"
    - stage: trinity
      stageUuid: "a3116daa-93eb-864b-a53e-acc64ff1d048"
    - stage: boundary
      stageUuid: "b06f83ac-850d-854f-b6c7-349acc863b5c"
    - stage: links
      stageUuid: "59241121-f287-87d1-8876-e90a3cfee801"
    - stage: horo
      stageUuid: "380cc3e9-57f8-8c13-85f0-1e686f1cefeb"
    - stage: seal
      stageUuid: "4c2ea20b-64f8-87ce-8a7e-764e704a1ce3"
    - stage: uuid
      stageUuid: "9844f7b3-0d6c-8445-af31-4ccdca90669b"
version: 2
---
# payable/workflow — the bill lifecycle as a directed graph, not a free-text field

A bill moves through a fixed set of states, and only along edges the graph allows.

`draft → received → approved → scheduled → partial | paid | disputed`

A status field with no transition rule is a text box that happens to hold words. As a graph, a
transition either exists or it does not, and "approved" cannot be reached without passing the step
that means someone approved it — which is the segregation-of-duties claim the A/P control rests on.

`approved` is also where a bill becomes LIVE for event purposes, which is the one status the A/R
side has no equivalent of ([[invoices]]/hooks/transition).

**Why it is a child atom.** It was `workflow.service.ts` beside the barrel. When [[payable]] gained
the SKILL its code always warranted, that folder became an ATOM — and matter at an atom root is a
stray sibling ([[rules]]): only the trinity lives beside a barrel. Nesting it is the lawful form, and
the parent re-exports it, so no caller changed.

**Honest boundary.** This computes; it does not decide. The inputs — rates, terms, thresholds — are
given by the caller or the tenant, and nothing here validates that they are the right ones.

Composes: [[payable]] · [[law]].

## Standards

- **ISO/IEC 27002 §5.4** — segregation of duties.
