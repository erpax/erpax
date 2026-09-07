---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 8/crest · fe31d2d9"
contentUuid: "5731590c-1da5-5f0f-a406-25b21dda3a26"
diamondUuid: "9a647109-46d0-826a-94c9-d12cee85b24a"
uuid: "fe31d2d9-77c1-8481-859a-d7b405c25700"
horo: 8
typography:
  partition: trading
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "dbb3b7c4-6fcb-8e9f-af59-14ed2e7fddfd"
  stages:
    - stage: path
      stageUuid: "20c274ea-f1d9-8fe0-8d30-561e9ddc4dc2"
    - stage: trinity
      stageUuid: "efb66f1c-5b2e-8787-8df8-1cd5ac36237c"
    - stage: boundary
      stageUuid: "22c5d021-99fc-8e12-addd-8096fee8a43f"
    - stage: links
      stageUuid: "0605dd02-aa1f-82d9-bde3-7d7db7a0540e"
    - stage: horo
      stageUuid: "1052893b-f021-89d4-ac98-60d7f28e9c11"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "e398f5ce-1e3f-8457-9413-c34c232cf64c"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
