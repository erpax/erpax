---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 4/weave · a80c35cd"
contentUuid: "c8a7a326-cbb3-53e5-921e-bea1ba8011fe"
diamondUuid: "116572bb-0b33-8579-bc1d-afedd2a9d4e8"
uuid: "a80c35cd-b08d-8623-9f27-bca22e73b326"
horo: 4
typography:
  partition: trading
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "b2cb4295-c9ca-8514-bf76-4a09115224b3"
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
      stageUuid: "043283cf-f9a4-8e68-ae54-77770595f791"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "d1caa6d9-c6e1-83ce-9838-1accf5de3a25"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
