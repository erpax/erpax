---
name: goods
description: "Use when reasoning about goods — Use for the goods-movement trading APIs — e-commerce platforms, marketplaces, shipping carriers/aggregators, and product-data/document-validation networks. The goods slice of the trading-API registry."
atomPath: "trading/api/goods"
coordinate: "trading/api/goods · 8/crest · 790b58f3"
contentUuid: "78f53940-3e3c-5fd9-805f-48baf2dad37b"
diamondUuid: "59545098-e987-8ecd-8bbe-e517899a065f"
uuid: "790b58f3-aa46-8892-800a-082119cca745"
horo: 8
typography:
  partition: trading
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "057344fc-1862-8a28-9592-0cc814334f4a"
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
      stageUuid: "fa6a628a-ec13-8f2c-9fff-d5e2965e88ac"
    - stage: seal
      stageUuid: "0a2c5832-f7f7-8bef-8165-6df3d13dbd36"
    - stage: uuid
      stageUuid: "9658dd28-ac6f-8777-a1c1-934b4134fa42"
version: 2
---
# trading/api/goods

The **goods** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
