---
name: hooks
description: "Use when reasoning about hooks — books the run when it reaches posted, so the ledger entry is made by the row that caused it rather than by whichever screen happened to save it."
atomPath: "bank/accounts/payroll/runs/hooks"
coordinate: "bank/accounts/payroll/runs/hooks · 6/6 · 55181b59"
contentUuid: "0cac5742-632c-5ee7-85d3-1cf8aaead6ed"
diamondUuid: "5895a87c-4962-8748-ab01-d1595c0f94bf"
uuid: "55181b59-8a35-80e5-a221-a2f203ee2627"
horo: 6
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
  computationUuid: "16709ee3-717e-84e5-adf3-4d4fe2990fb3"
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
      stageUuid: "4c7d6e80-cfda-894c-81cd-be263f5c37dd"
    - stage: seal
      stageUuid: "4e82c845-d8d2-8548-a941-5413b1ffed23"
    - stage: uuid
      stageUuid: "61f4c5fd-7951-83a3-9e42-48e986bae0c9"
version: 2
---
# bank/accounts/payroll/runs/hooks — a payroll run posts its own journal, at the collection

`payrollRunPostingHook` books the run when it reaches posted, so the ledger entry is made by the
row that caused it rather than by whichever screen happened to save it. The disbursement child
carries the payment side.

A hook folder is the collection's canonical entry point: importers name `./hooks`, never each file,
so a hook added tomorrow reaches every caller without one of them editing an import.

Composes: [[law]].
