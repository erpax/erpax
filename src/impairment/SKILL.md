---
name: impairment
description: "Use when an asset's fair value or recoverable amount falls permanently below book value, triggering writedown testing and loss recognition — mandatory under IAS-36 for all assets"
atomPath: impairment
coordinate: impairment · 5/round · d441a6ec
contentUuid: "4df41ac1-505b-5121-8859-cb43d0b90b9f"
diamondUuid: "bdcb3f3a-2542-88a0-86eb-63d5ddb74e09"
uuid: "d441a6ec-e7b4-88e1-b8a5-2081e539c107"
horo: 5
bonds:
  in:
    - assets
    - goodwill
    - intangible
    - law
    - perennial
    - properties
    - terroir
  out:
    - assets
    - goodwill
    - intangible
    - law
    - perennial
    - properties
    - terroir
typography:
  partition: impairment
  bondDegree: 25
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - assets
    - goodwill
    - intangible
    - law
    - properties
  matrix:
    - assets
    - goodwill
    - intangible
    - law
    - perennial
    - properties
    - terroir
  backlinks:
    - assets
    - goodwill
    - intangible
    - law
    - perennial
    - properties
    - terroir
signatures:
  computationUuid: "1a86056c-ddad-85cd-8997-939a955f2caf"
  stages:
    - stage: path
      stageUuid: "08f769e0-ddba-87a3-adfa-be322e95a879"
    - stage: trinity
      stageUuid: "811e0ac0-aeff-8322-91f9-ae796a6ed660"
    - stage: boundary
      stageUuid: "4001d84b-9bb0-88cf-85a4-5c75a75766b1"
    - stage: links
      stageUuid: "07069c99-d5c7-8d18-9830-31e9e9060368"
    - stage: horo
      stageUuid: "88d7e9ad-1b2a-8bb8-82dd-9b137e906880"
    - stage: seal
      stageUuid: "476056f5-c427-84ad-b8a5-5728fe0511fd"
    - stage: uuid
      stageUuid: "9b4c03f9-8cbf-83f7-b449-08698b0723f4"
version: 2
---
# impairment

Use when an asset's fair value or recoverable amount falls permanently below book value, triggering writedown testing and loss recognition — mandatory under IAS-36 for all assets

Composes: [[fixed/assets]] · [[intangible]] · [[goodwill]] · [[properties/investment/properties]] · [[biological/assets]].

## Standards
- IAS-36 (impairment of assets)
- IFRS-5 §20-25 (non-current assets held for sale)
- FASB ASC 360 (property, plant, equipment)

**Law — [[law]]: when an asset's recoverable amount falls permanently below book value, the excess is written down and recognized as a loss (IAS-36, mandatory for all assets).**
