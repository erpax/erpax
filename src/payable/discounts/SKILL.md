---
name: discounts
description: "Use when reasoning about discounts — \"2/10 Net 30\" — 2% off if paid within 10 days, otherwise the full balance at 30."
atomPath: "payable/discounts"
coordinate: "payable/discounts · 1/base · 0afd05fa"
contentUuid: "8464b5e0-d6ca-5d78-8c6e-bda7548b186a"
diamondUuid: "a541dc13-413b-84bb-9f35-7eaab7c6f748"
uuid: "0afd05fa-96df-8044-b779-c4c460ebdaa4"
horo: 1
typography:
  partition: payable
  bondDegree: 9
standards:
  - "EN-16931:2017 §BG-20 document-level-allowances"
  - "EN-16931:2017 §BG-22 document-level-charges"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time discount-deadline"
  - "US-GAAP ASC-705 cost-of-sales-and-services discount-recognition"
bindings: []
signatures:
  computationUuid: "1716e178-2350-8891-b349-69e8d2e17807"
  stages:
    - stage: path
      stageUuid: "32d7178d-9ca7-8808-9ad5-66765215517c"
    - stage: trinity
      stageUuid: "1466e08c-756a-887f-aad9-0db8be7bdc1c"
    - stage: boundary
      stageUuid: "260ce0b8-d4b8-8593-b15c-7f8f9598dd9a"
    - stage: links
      stageUuid: "6eca2f8e-08c2-84ff-a2f0-f85d2c9610f4"
    - stage: horo
      stageUuid: "379351a2-13b1-848c-b8f8-38c4c2ee4a5d"
    - stage: seal
      stageUuid: "768356e4-0bcd-8f03-af4d-13aa1be07b18"
    - stage: uuid
      stageUuid: "fadd7daf-b12b-8ff5-b780-a5e626e0aa48"
version: 2
---
# payable/discounts — the early-payment discount, priced as an annual rate

"2/10 Net 30" — 2% off if paid within 10 days, otherwise the full balance at 30. The
calculator prices that as an ANNUALISED return, because the decision is not "is 2% worth it" but
"is 2% over 20 days better than what the cash earns elsewhere".

Stating it as a rate is the whole point: a discount quoted as a percentage of an invoice is not
comparable to anything, and a treasury decision made on the raw percentage is made on the wrong
number.

**Why it is a child atom.** It was `discounts.service.ts` beside the barrel. When [[payable]] gained
the SKILL its code always warranted, that folder became an ATOM — and matter at an atom root is a
stray sibling ([[rules]]): only the trinity lives beside a barrel. Nesting it is the lawful form, and
the parent re-exports it, so no caller changed.

**Honest boundary.** This computes; it does not decide. The inputs — rates, terms, thresholds — are
given by the caller or the tenant, and nothing here validates that they are the right ones.

Composes: [[payable]] · [[law]].

## Standards

- **US-GAAP ASC-405** — liabilities.
