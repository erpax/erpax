---
name: workflow
description: "Use when reasoning about workflow — A bill moves through a fixed set of states, and only along edges the graph allows."
atomPath: "payable/workflow"
coordinate: "payable/workflow · 1/base · dd93ce79"
contentUuid: "52adfced-880f-5db4-9b28-821aa529206e"
diamondUuid: "cc0f586f-8089-8872-ae32-872e93e335b8"
uuid: "dd93ce79-3361-8f59-9aba-8032ce183f2e"
horo: 1
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
  computationUuid: "6f3eff38-9f11-8cc2-a741-b6e09d37d986"
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
      stageUuid: "dcc4960e-770d-8ae3-afd2-3c6dc137f551"
    - stage: seal
      stageUuid: "4c2ea20b-64f8-87ce-8a7e-764e704a1ce3"
    - stage: uuid
      stageUuid: "5fd0a0e3-dc53-8ab4-b94a-9a0bdaf35421"
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
