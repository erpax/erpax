---
name: bank
description: "Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar."
atomPath: bank
coordinate: bank · 8/crest · a5408513
contentUuid: "d75207c6-6653-5e13-bc57-fd3a00c9b7f9"
diamondUuid: "e87b6d15-3d12-84a8-866c-68f9ac7bc51e"
uuid: "a5408513-546f-8676-ab4b-7a876339d2ac"
horo: 8
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
  computationUuid: "d2f07d94-ddea-8510-ad07-b817ab431a5e"
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
      stageUuid: "c01e0444-19ad-8261-813a-22a7da8e44cf"
    - stage: seal
      stageUuid: "50d8be56-7bc5-8cc7-9986-b3af6e6b59df"
    - stage: uuid
      stageUuid: "68a10eda-54fa-82f1-a31e-da4426bff119"
version: 2
---
# bank

Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar.

Composes: [[accounting]] · [[fields]] · [[identity]] · [[reconcile]] · [[transaction]].

**Law — [[law]]: `bank` is the financial-institution context a [[transaction]] or account references (account, statement, transfer, reconciliation) — it points OUT to the bank-accounts store, it is not the cash account itself.**
