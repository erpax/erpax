---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 7/descent · 4a98a2a4"
contentUuid: "a54e2add-dd3b-5fa0-8fe8-c26887ccc2c0"
diamondUuid: "ad366eab-08f9-83fa-b2d7-fc609811ba94"
uuid: "4a98a2a4-fa9e-87bc-9499-28ba9c6a5a56"
horo: 7
typography:
  partition: trading
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "c4dfe382-4779-861b-9d15-ca123f971ca5"
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
      stageUuid: "a7af8563-60bd-8dc0-b40a-a8c6328d6569"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "106f48e5-3d7b-81a3-ac28-e0eec2b9abc1"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
