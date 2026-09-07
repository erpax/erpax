---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 2/share · b62e89b1"
contentUuid: "08c26a19-19e6-597e-8d76-fb2b2e6f41e0"
diamondUuid: "47233d1c-1317-8abc-be84-b112e3293161"
uuid: "b62e89b1-0ee1-858d-b021-94e9a68bcb44"
horo: 2
typography:
  partition: trading
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "078f0ba8-50d4-8a0a-9fcb-e4043e0f6319"
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
      stageUuid: "e0e649fc-a745-82ae-b6b0-f786de308178"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "10a329b7-7268-822b-bc1e-5b1e87720f1b"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
