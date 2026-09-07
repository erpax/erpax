---
name: workflow
description: "Use when reasoning about workflow — A bill moves through a fixed set of states, and only along edges the graph allows."
atomPath: "payable/workflow"
coordinate: "payable/workflow · 7/descent · 898228f1"
contentUuid: "2cfc5fc0-dec1-514a-8985-1259214fbe3f"
diamondUuid: "b2fda8f0-ae8f-8147-abb3-c081e4affebc"
uuid: "898228f1-e6b4-86a6-b10b-8815e33de5a4"
horo: 7
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
  computationUuid: "4eb71cdb-674a-8b27-bea8-d97d33255306"
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
      stageUuid: "5bc71fde-a856-8ea1-91c8-8225007b25cb"
    - stage: seal
      stageUuid: "4c2ea20b-64f8-87ce-8a7e-764e704a1ce3"
    - stage: uuid
      stageUuid: "b5a9b64f-fa6a-8b61-adc6-28fc346842d9"
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
