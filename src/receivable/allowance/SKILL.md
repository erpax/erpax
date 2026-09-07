---
name: allowance
description: "Use when reasoning about allowance — The allowance for doubtful accounts as an IFRS 9 §5.5 expected-credit-loss estimate driven by the aging buckets: each bucket carries a loss rate, and the allowance is their…"
atomPath: "receivable/allowance"
coordinate: "receivable/allowance · 7/descent · e0b605f7"
contentUuid: "dcba2065-8b49-5070-9fc0-df819f63de52"
diamondUuid: "5bc2697e-92f1-808d-b0f3-50512272faca"
uuid: "e0b605f7-ecdb-833b-a999-af53c64b2fbd"
horo: 7
typography:
  partition: receivable
  bondDegree: 9
standards:
  - "IFRS IFRS-9 §5.5 expected-credit-loss"
  - "ISO-4217:2015 currency-codes"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-310 receivables"
  - "US-GAAP ASC-326 §20 current-expected-credit-loss"
bindings: []
signatures:
  computationUuid: "8142fb86-8f56-8565-aca5-71d071d7660d"
  stages:
    - stage: path
      stageUuid: "f949d3e1-4701-8717-ab23-83f809b76abc"
    - stage: trinity
      stageUuid: "449430e3-97ea-819d-8356-e480ed101698"
    - stage: boundary
      stageUuid: "3732fd51-44c1-88c4-ac01-739e55ace8bc"
    - stage: links
      stageUuid: "ae62d7f1-14d7-821f-9561-ec2b922dc5bc"
    - stage: horo
      stageUuid: "b21ef0f8-8f97-80b2-9a14-258c6d12a6f4"
    - stage: seal
      stageUuid: "4e79e307-9d68-8c84-b2bc-f725429d29df"
    - stage: uuid
      stageUuid: "cfd97c37-3d4f-830b-8f89-0a7bb633994f"
version: 2
---
# receivable/allowance — expected credit loss, estimated from the aging buckets

The allowance for doubtful accounts as an IFRS 9 §5.5 expected-credit-loss estimate driven
by the aging buckets: each bucket carries a loss rate, and the allowance is their weighted sum.

This is an ESTIMATE and the code says so. The rates are inputs, not derivations — a corpus that
computed them from its own history would be asserting a forecast as a measurement.

**Why it is a child atom.** It was `allowance.service.ts` beside the barrel. When [[receivable]] gained
the SKILL its code always warranted, that folder became an ATOM — and matter at an atom root is a
stray sibling ([[rules]]): only the trinity lives beside a barrel. Nesting it is the lawful form, and
the parent re-exports it, so no caller changed.

**Honest boundary.** This computes; it does not decide. The inputs — rates, terms, thresholds — are
given by the caller or the tenant, and nothing here validates that they are the right ones.

Composes: [[receivable]] · [[law]].

## Standards

- **IFRS 9 §5.5** — expected credit loss.
