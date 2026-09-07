---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 1/base · fbdf2298"
contentUuid: "509d40af-c2b1-5da5-ac60-a28ca498e8a0"
diamondUuid: "48a468d8-1992-8b4a-8365-038d4e4509d7"
uuid: "fbdf2298-1f11-8795-9ddc-05fae5a072e7"
horo: 1
typography:
  partition: trading
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "e64ab065-7036-8594-a4f6-11b1e805dbf6"
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
      stageUuid: "f68bb3ef-6383-86ae-9a0a-81821d38ec94"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "bdd6ab11-0149-8524-be6e-5a92f27344b4"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
