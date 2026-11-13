---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 2/share · 7b285b58"
contentUuid: "c46779a8-fd3b-56f4-90d7-8cf1a8025465"
diamondUuid: "2977e692-282c-899f-8cae-e2ef8ee9cd1a"
uuid: "7b285b58-9dd8-827c-b541-a9cec2aeea83"
horo: 2
typography:
  partition: trading
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "fc70fb9d-aae8-83f8-bc1a-f9055cb74fdd"
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
      stageUuid: "ab128e4e-803b-89bd-bfd1-fec82586a311"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "8dee5450-e1cc-8ac1-8678-036a74ebf3d0"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
