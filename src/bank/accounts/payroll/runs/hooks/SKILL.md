---
name: hooks
description: "Use when reasoning about hooks — books the run when it reaches posted, so the ledger entry is made by the row that caused it rather than by whichever screen happened to save it."
atomPath: "bank/accounts/payroll/runs/hooks"
coordinate: "bank/accounts/payroll/runs/hooks · 9/unity · 18abfc20"
contentUuid: "7a9bf27d-ebb0-5033-b11e-7af976b49aaf"
diamondUuid: "e914ae76-7c21-8685-894f-ae3ac7390b92"
uuid: "18abfc20-da2e-8550-82b0-9a6f435c4064"
horo: 9
typography:
  partition: bank
  bondDegree: 333
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
  computationUuid: "5bf239a6-5677-8355-b093-2750cbd900ef"
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
      stageUuid: "28e1ecdc-c083-8989-a800-9e3675a8ae1e"
    - stage: seal
      stageUuid: "4e82c845-d8d2-8548-a941-5413b1ffed23"
    - stage: uuid
      stageUuid: "821dbea2-2ab1-86c7-816b-7ea5d741202c"
version: 2
---
# bank/accounts/payroll/runs/hooks — a payroll run posts its own journal, at the collection

`payrollRunPostingHook` books the run when it reaches posted, so the ledger entry is made by the
row that caused it rather than by whichever screen happened to save it. The disbursement child
carries the payment side.

A hook folder is the collection's canonical entry point: importers name `./hooks`, never each file,
so a hook added tomorrow reaches every caller without one of them editing an import.

Composes: [[law]].
