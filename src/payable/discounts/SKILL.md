---
name: discounts
description: "Use when reasoning about discounts — \"2/10 Net 30\" — 2% off if paid within 10 days, otherwise the full balance at 30."
atomPath: "payable/discounts"
coordinate: "payable/discounts · 8/crest · 642ba161"
contentUuid: "ccaa9b15-5a78-5def-bc0b-a7b9c8e5deed"
diamondUuid: "aa837be7-ad3f-869d-8025-05e34e2c7baa"
uuid: "642ba161-dbae-8de9-8c89-5703c2b5e8e7"
horo: 8
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
  computationUuid: "6da62395-f9c2-87f3-b5ed-d8a2dd070494"
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
      stageUuid: "db385cec-6fd8-8dc3-8fe9-3da1d57c4a15"
    - stage: seal
      stageUuid: "768356e4-0bcd-8f03-af4d-13aa1be07b18"
    - stage: uuid
      stageUuid: "75287d2a-9d6e-87d2-b808-2fefc4efd3b5"
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
