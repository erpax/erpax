---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 1/base · 83df24b2"
contentUuid: "2e09f98d-2473-5f86-857c-31bb00c03e84"
diamondUuid: "35252299-3af5-8a9b-836a-145f7b416706"
uuid: "83df24b2-ae83-8ad8-9dda-a64c1905d52b"
horo: 1
typography:
  partition: trading
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "689f0f69-e9f7-842b-b039-cdc44db1d419"
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
      stageUuid: "a01ef884-545b-85c5-a79d-abcdee6ee9c3"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "6d978ad2-9c0e-8e17-98e8-9845191e3fe3"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
