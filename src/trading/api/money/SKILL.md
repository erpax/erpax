---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 8/crest · 27a71964"
contentUuid: "4478f79c-17ec-53d9-9348-5e163c2d31a3"
diamondUuid: "ac4d3b02-ad47-8cab-9f3f-c6f6c279ebbe"
uuid: "27a71964-d025-8d27-b1c4-d8de9c93a4b1"
horo: 8
typography:
  partition: trading
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "131ebe26-b4a5-8fc6-922f-67cfaf08c4ad"
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
      stageUuid: "6c69f1b7-ecf2-893c-9afd-4a4ec5221083"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "c1bdd7a6-544f-8a0a-b696-f24503b8c01a"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
