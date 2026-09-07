---
name: discounts
description: "Use when reasoning about discounts — \"2/10 Net 30\" — 2% off if paid within 10 days, otherwise the full balance at 30."
atomPath: "payable/discounts"
coordinate: "payable/discounts · 4/weave · a673e0f1"
contentUuid: "fa2838ea-8c71-5ac3-8b27-3178dc408bed"
diamondUuid: "b62f7d3b-2d05-89a5-a913-cb0684f3e800"
uuid: "a673e0f1-13e0-82c9-ac30-561202434835"
horo: 4
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
  computationUuid: "a32af6f3-6167-80b8-b2b4-534e54046ad3"
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
      stageUuid: "1f5999fa-5f9a-87ae-a874-d6ad4f14b7e2"
    - stage: seal
      stageUuid: "768356e4-0bcd-8f03-af4d-13aa1be07b18"
    - stage: uuid
      stageUuid: "a25df13a-a6ca-879a-878c-8d129e5ec29d"
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
