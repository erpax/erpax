---
name: dunning
description: "Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not."
atomPath: dunning
coordinate: dunning · 1/base · 20c1c04e
contentUuid: "ba7d458b-1f30-5950-8bd5-4156e975d1a4"
diamondUuid: "5d256f6b-999c-88f8-bc14-3db676dd9a3a"
uuid: "20c1c04e-b13f-8625-8ac6-fdca89d5f4d3"
horo: 1
bonds:
  in:
    - accounting
    - commerce
    - customers
    - cycles
    - invoices
    - law
    - payments
    - transaction
  out:
    - accounting
    - commerce
    - customers
    - cycles
    - invoices
    - law
    - payments
    - transaction
typography:
  partition: dunning
  bondDegree: 24
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - customers
    - cycles
    - invoices
    - law
    - payments
    - transaction
  matrix:
    - accounting
    - commerce
    - customers
    - cycles
    - invoices
    - law
    - payments
    - transaction
  backlinks:
    - accounting
    - commerce
    - customers
    - cycles
    - invoices
    - law
    - payments
    - transaction
signatures:
  computationUuid: "976ef68b-d78c-8b1d-8741-1dee5082ed82"
  stages:
    - stage: path
      stageUuid: "bbf10449-0728-87b0-8ee2-6666ece60bd2"
    - stage: trinity
      stageUuid: "a02c657c-780b-8c5c-9597-0f9dcaf52a61"
    - stage: boundary
      stageUuid: "5b69b55a-1d8f-8235-b73d-146e5f6be996"
    - stage: links
      stageUuid: "4183b76c-dc63-8b55-bf80-2e62556833c4"
    - stage: horo
      stageUuid: "2e1a5312-e72a-8e0c-8bf5-1b4ff772f74b"
    - stage: seal
      stageUuid: "596fcea8-cb97-86b0-829e-7a18291b37a1"
    - stage: uuid
      stageUuid: "66d6a5f0-9a60-8b89-b6a4-8c6ba5a5bb52"
version: 2
---
# dunning

Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not.

Composes: [[invoices/dunning/cycles]] · [[Payments]] · [[Invoices]] · [[Customers]] · [[accounting]] · [[transaction]].

**Law — [[law]]: dunning is the parent collections-policy (rule · retry schedule · messaging) over the dunning-cycles that automate payment retry and collections.**

## Standards
- CRM-generic
