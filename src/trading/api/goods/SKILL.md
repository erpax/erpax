---
name: goods
description: "Use when reasoning about goods — Use for the goods-movement trading APIs — e-commerce platforms, marketplaces, shipping carriers/aggregators, and product-data/document-validation networks. The goods slice of the trading-API registry."
atomPath: "trading/api/goods"
coordinate: "trading/api/goods · 8/crest · 790b58f3"
contentUuid: "edf834eb-2ec4-55ef-93e0-f239bf522241"
diamondUuid: "8ec9035c-53dd-83db-8e71-335798fae022"
uuid: "790b58f3-aa46-8892-800a-082119cca745"
horo: 8
typography:
  partition: trading
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "0265b19d-fb17-8340-9dbd-7c18078a799f"
  stages:
    - stage: path
      stageUuid: "10773e52-6a3d-873b-a875-499bc2ba389f"
    - stage: trinity
      stageUuid: "83c22513-0559-8815-a3ac-d940f6dd62be"
    - stage: boundary
      stageUuid: "c27632c9-fe02-8dda-8431-b7b2fed4862e"
    - stage: links
      stageUuid: "045d2c54-41bf-842c-b2ac-41456b7e1a29"
    - stage: horo
      stageUuid: "4c56e1ba-8a73-8ecb-ac12-26f0eeb13e00"
    - stage: seal
      stageUuid: "0a2c5832-f7f7-8bef-8165-6df3d13dbd36"
    - stage: uuid
      stageUuid: "4b1e019d-4dce-8ac4-95dd-af6d4b1fd932"
version: 2
---
# trading/api/goods

The **goods** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
