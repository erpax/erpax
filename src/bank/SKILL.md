---
name: bank
description: "Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar."
atomPath: bank
coordinate: "bank · 4/weave · 079b8ce9"
contentUuid: "2f93de4b-66f2-5597-b945-84aeba658341"
diamondUuid: "54db541c-09ee-8f2d-84b5-52cdc178f0ea"
uuid: "079b8ce9-d3df-8d16-ba2c-4fe6518cfeac"
horo: 4
bonds:
  in:
    - account
    - accounting
    - beneficiary
    - credit
    - fields
    - identity
    - law
    - reconcile
    - transaction
    - union
  out:
    - account
    - accounting
    - beneficiary
    - credit
    - fields
    - identity
    - law
    - reconcile
    - transaction
    - union
typography:
  partition: bank
  bondDegree: 0
  neighbors: []
standards:
  - "EU-2002/58"
  - "EU-2015/847"
  - "EU-2015/849"
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "ILO-C001"
  - "ISO-13616-1"
  - "ISO-20022"
  - "ISO-4217"
  - "ISO-8601-1"
  - "ISO-9362"
  - "SWIFT-MT"
bindings: []
neighbors:
  wikilink:
    - accounting
    - fields
    - identity
    - law
    - reconcile
    - transaction
  matrix:
    - account
    - accounting
    - beneficiary
    - credit
    - fields
    - identity
    - law
    - reconcile
    - transaction
    - union
  backlinks:
    - account
    - accounting
    - beneficiary
    - credit
    - fields
    - identity
    - law
    - reconcile
    - transaction
    - union
signatures:
  computationUuid: "0271a021-23a5-8d0f-a7c1-ccfc481f8e0c"
  stages:
    - stage: path
      stageUuid: "f47989eb-c24a-8670-ba84-08dc33d21aeb"
    - stage: trinity
      stageUuid: "d53c31c6-dbef-832d-aaf5-c8097b1cecc6"
    - stage: boundary
      stageUuid: "d4aef433-170f-8d6b-a5fc-68f19b6f432e"
    - stage: links
      stageUuid: "4b166b48-5a2d-87f5-8ff3-3aa77af9f713"
    - stage: horo
      stageUuid: "70cb79f2-f952-8e0a-a469-eaa8f78d93f6"
    - stage: seal
      stageUuid: "50d8be56-7bc5-8cc7-9986-b3af6e6b59df"
    - stage: uuid
      stageUuid: "485cb222-479e-8ab0-b434-2f5de47a252f"
version: 2
---
# bank

Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar.

Composes: [[accounting]] · [[fields]] · [[identity]] · [[reconcile]] · [[transaction]].

**Law — [[law]]: `bank` is the financial-institution context a [[transaction]] or account references (account, statement, transfer, reconciliation) — it points OUT to the bank-accounts store, it is not the cash account itself.**
