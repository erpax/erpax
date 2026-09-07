---
name: hooks
description: "Use when reasoning about hooks — books the run when it reaches posted, so the ledger entry is made by the row that caused it rather than by whichever screen happened to save it."
atomPath: "bank/accounts/payroll/runs/hooks"
coordinate: "bank/accounts/payroll/runs/hooks · 9/unity · 2a882db9"
contentUuid: "47df3a99-f027-56ec-910c-d54149342360"
diamondUuid: "58589a11-fae9-89c8-a60a-78d47ac1ff2b"
uuid: "2a882db9-3552-87ef-a9fb-07a3acec4153"
horo: 9
typography:
  partition: bank
  bondDegree: 348
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "ISO-13616-1"
  - "ISO-20022"
  - "ISO-4217"
  - "ISO-8601-1"
  - "ISO-9362"
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "c176f15d-e45b-8f5e-92a2-cc8a78c10716"
  stages:
    - stage: path
      stageUuid: "31fb1050-191e-8317-8324-d8efb4786271"
    - stage: trinity
      stageUuid: "d0062e8c-c48b-8955-8da5-56a0655e248b"
    - stage: boundary
      stageUuid: "fbf87b82-655c-8b33-a39c-d3916911aa0b"
    - stage: links
      stageUuid: "967272c5-d1b4-84f5-b991-d2ec8223a2ec"
    - stage: horo
      stageUuid: "f62d0fcb-30c8-8cf3-ba05-894a29b92a41"
    - stage: seal
      stageUuid: "4e82c845-d8d2-8548-a941-5413b1ffed23"
    - stage: uuid
      stageUuid: "313c3042-9db1-8f7f-acfd-49f70d434256"
version: 2
---
# bank/accounts/payroll/runs/hooks — a payroll run posts its own journal, at the collection

`payrollRunPostingHook` books the run when it reaches posted, so the ledger entry is made by the
row that caused it rather than by whichever screen happened to save it. The disbursement child
carries the payment side.

A hook folder is the collection's canonical entry point: importers name `./hooks`, never each file,
so a hook added tomorrow reaches every caller without one of them editing an import.

Composes: [[law]].
