---
name: hooks
description: "Use when reasoning about hooks — books the run when it reaches posted, so the ledger entry is made by the row that caused it rather than by whichever screen happened to save it."
atomPath: "bank/accounts/payroll/runs/hooks"
coordinate: "bank/accounts/payroll/runs/hooks · 9/unity · fe7335b7"
contentUuid: "e06a121b-9796-5fe1-8974-229a8deb0b46"
diamondUuid: "89e868e9-dee1-8bdd-981f-bd6ebc4cfa29"
uuid: "fe7335b7-4480-84e0-b6d1-f0a2ce4c7cb2"
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
  computationUuid: "57cd7dec-a6dc-86e4-be09-74f926563bb0"
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
      stageUuid: "33f5d55c-5a57-87f5-a66a-06d129681f5a"
    - stage: seal
      stageUuid: "4e82c845-d8d2-8548-a941-5413b1ffed23"
    - stage: uuid
      stageUuid: "1185105c-2931-86a6-8262-062e17748403"
version: 2
---
# bank/accounts/payroll/runs/hooks — a payroll run posts its own journal, at the collection

`payrollRunPostingHook` books the run when it reaches posted, so the ledger entry is made by the
row that caused it rather than by whichever screen happened to save it. The disbursement child
carries the payment side.

A hook folder is the collection's canonical entry point: importers name `./hooks`, never each file,
so a hook added tomorrow reaches every caller without one of them editing an import.

Composes: [[law]].
