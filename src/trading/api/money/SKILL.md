---
name: money
description: "Use when reasoning about money — Use for the money-movement trading APIs — payment gateways/PSPs, direct-debit/payout, open-banking aggregators, FX/market-data feeds, and Peppol/EDI e-invoicing networks. The money slice of the trading-API registry."
atomPath: "trading/api/money"
coordinate: "trading/api/money · 1/base · 356a2336"
contentUuid: "c6ed0f6a-e776-5a2a-a6ce-08a5a5f8e239"
diamondUuid: "9a49e500-2bf9-8472-b16b-8e4465bbfc61"
uuid: "356a2336-13de-820c-96e3-e24236cd1f60"
horo: 1
typography:
  partition: trading
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "34e27f1d-b892-8a60-8ecd-1230c5b3967c"
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
      stageUuid: "a53c2119-76f8-85a1-beee-818bd35ccdf4"
    - stage: seal
      stageUuid: "a5e2169b-da73-89a5-ba80-e5551c1aa40d"
    - stage: uuid
      stageUuid: "1ed3ad9a-fd02-8fbf-b082-afd6e1b2c34d"
version: 2
---
# trading/api/money

The **money** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
