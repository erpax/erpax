---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 2/share · 7b285b58"
contentUuid: "0241f25f-62e0-5a3d-8b78-145f77c69359"
diamondUuid: "4b6cc10e-293e-8f59-a697-b6a8ab098a3a"
uuid: "7b285b58-9dd8-827c-b541-a9cec2aeea83"
horo: 2
typography:
  partition: trading
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "25db2cf5-eddd-8a86-bc04-fb47da9c57f0"
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
      stageUuid: "0664e9de-de98-8996-a8e5-121b71d13312"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "e50fe71d-66a8-814b-8ce3-e3f709cbf98a"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
