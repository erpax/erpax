---
name: hooks
description: "Use when reasoning about hooks — books the run when it reaches posted, so the ledger entry is made by the row that caused it rather than by whichever screen happened to save it."
atomPath: "bank/accounts/payroll/runs/hooks"
coordinate: "bank/accounts/payroll/runs/hooks · 9/unity · 18abfc20"
contentUuid: "ce361aa1-3b4b-5f1f-aa15-8cd3f33cb225"
diamondUuid: "0f402f5e-503c-8f35-b44d-600c8bb9a45c"
uuid: "18abfc20-da2e-8550-82b0-9a6f435c4064"
horo: 9
typography:
  partition: bank
  bondDegree: 345
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
  computationUuid: "5632090d-267a-88ba-8533-2187d839bd57"
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
      stageUuid: "87d2cee8-dcd2-8e8e-bb65-0b546023fa19"
    - stage: seal
      stageUuid: "4e82c845-d8d2-8548-a941-5413b1ffed23"
    - stage: uuid
      stageUuid: "33785d75-2783-80a7-8bbb-5cbfc050017a"
version: 2
---
# bank/accounts/payroll/runs/hooks — a payroll run posts its own journal, at the collection

`payrollRunPostingHook` books the run when it reaches posted, so the ledger entry is made by the
row that caused it rather than by whichever screen happened to save it. The disbursement child
carries the payment side.

A hook folder is the collection's canonical entry point: importers name `./hooks`, never each file,
so a hook added tomorrow reaches every caller without one of them editing an import.

Composes: [[law]].
