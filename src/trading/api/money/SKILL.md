---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 2/share · 7b285b58"
contentUuid: "f9721ecd-48ec-536f-a1f2-079227c81f35"
diamondUuid: "b48b5cbe-817e-869d-b53c-3fc8c7cc0f4e"
uuid: "7b285b58-9dd8-827c-b541-a9cec2aeea83"
horo: 2
typography:
  partition: trading
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "d212c690-77dc-88d6-8433-dfdff0f6e91b"
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
      stageUuid: "368f6690-1013-8039-8680-1d2ea1bd683e"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "7445c263-8901-8ed7-a810-affed4e6a70c"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
