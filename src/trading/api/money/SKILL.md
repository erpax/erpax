---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 8/crest · 38e0cde7"
contentUuid: "d6b45197-342f-5026-8f40-a76d60989f3b"
diamondUuid: "faeafb39-a122-8db7-9510-7a052cd7cf9b"
uuid: "38e0cde7-8e22-8126-908e-8b805f456429"
horo: 8
typography:
  partition: trading
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "5f45d54a-0764-8732-8a5e-810f6c5af586"
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
      stageUuid: "7945bc33-e616-8b77-981b-7458c6378f42"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "eb6171c8-9551-87f2-b6f5-704209fbe717"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
