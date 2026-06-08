---
name: account
description: "Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom."
atomPath: account
coordinate: account · 7/descent · bdc42ba5
contentUuid: "800f0d63-d5ec-53cc-b878-1e03b3dcb6f1"
diamondUuid: "c76147f3-d768-8442-9113-e84f7ce9cf2b"
uuid: "bdc42ba5-9a52-8061-9092-bc6f59b56c5f"
horo: 7
bonds:
  in:
    - accounting
    - amount
    - bank
    - brokerage
    - code
    - deposit
    - fields
    - identity
    - inflow
    - law
    - minimum
    - overdraft
    - research
    - wallet
  out:
    - accounting
    - amount
    - bank
    - brokerage
    - code
    - deposit
    - fields
    - identity
    - inflow
    - law
    - minimum
    - overdraft
    - research
    - wallet
typography:
  partition: account
  bondDegree: 43
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - amount
    - bank
    - code
    - fields
    - identity
    - law
  matrix:
    - accounting
    - amount
    - bank
    - brokerage
    - code
    - deposit
    - fields
    - identity
    - inflow
    - law
    - minimum
    - overdraft
    - research
    - wallet
  backlinks:
    - accounting
    - amount
    - bank
    - brokerage
    - code
    - deposit
    - fields
    - identity
    - inflow
    - law
    - minimum
    - overdraft
    - research
    - wallet
signatures:
  computationUuid: "53182468-5693-81ad-84eb-aa18857807eb"
  stages:
    - stage: path
      stageUuid: "e1cfc1dd-3557-8880-93a0-f232873f4b3e"
    - stage: trinity
      stageUuid: "f1e05295-98cf-845d-bc30-b87cf0991cfa"
    - stage: boundary
      stageUuid: "8c302b9a-e57f-8ba9-939a-78f00bdf998e"
    - stage: links
      stageUuid: "8f2bbec8-21b1-8b84-81f3-195293065d67"
    - stage: horo
      stageUuid: "592ec25d-1f6b-8c5b-9915-22a81bfd6e9a"
    - stage: seal
      stageUuid: "993bb32a-05b2-86be-9fa3-f76fb8e15833"
    - stage: uuid
      stageUuid: "95d6420f-ce49-889e-8463-e41081748ef7"
version: 2
---
# account

Use when a transaction or GL entry references a chart-of-accounts item — bank account, GL account, cost-center account, liability account. Payload relationTo: 'gl-accounts' or 'bank-accounts'; denormalized fields (accountNumber, accountName) wire via account atom.

Composes: [[accounting]] · [[fields]] · [[identity]] · [[code]] · [[bank]] · [[amount]].

**Law — [[law]]: an account is the chart-of-accounts item a transaction or GL entry references (bank/GL/cost-center/liability) — the relation through which denormalized accountNumber/accountName wire, never the [[amount]] itself.**
