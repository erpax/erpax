---
name: goods
description: "Use when reasoning about goods — Use for the goods-movement trading APIs — e-commerce platforms, marketplaces, shipping carriers/aggregators, and product-data/document-validation networks. The goods slice of the trading-API registry."
atomPath: "trading/api/goods"
coordinate: "trading/api/goods · 1/base · 2522f74b"
contentUuid: "b9f3295c-0c24-5622-a613-acd7ed64b363"
diamondUuid: "df163748-44e1-811a-a289-af2a9efbd134"
uuid: "2522f74b-e58e-845c-97b2-3ecad3db6233"
horo: 1
typography:
  partition: trading
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "1fd7fa5f-c34b-8df0-b2be-f56dc7840a1b"
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
      stageUuid: "8285d6dc-ffac-86bd-88a9-53f4a00a9369"
    - stage: seal
      stageUuid: "0a2c5832-f7f7-8bef-8165-6df3d13dbd36"
    - stage: uuid
      stageUuid: "f23655ae-9a70-8274-aff3-1e7aa5041703"
version: 2
---
# trading/api/goods

The **goods** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
