---
name: grade
description: "Use when produce is sorted into quality classes — grading against uniform standards (USDA US No. 1, Fancy), with culling (discarding unmarketable units) and the packout (the marketable fraction packed from a harvested lot). Grade sets price and the gross-vs-marketable yield gap; °Brix, size, color, and defects are the criteria."
atomPath: grade
coordinate: grade · 7/descent · eedb07f1
contentUuid: "0eb0bbda-b02d-5c21-a86a-4a8311987795"
diamondUuid: "ef01cbae-545e-80b2-bb94-811133402589"
uuid: "eedb07f1-349f-870e-b2b6-3c8cb907a2dd"
horo: 7
bonds:
  in:
    - agriculture
    - harvest
    - lactation
    - lineage
    - lots
    - maturity
    - measure
    - packs
    - postharvest
    - pruning
    - quota
    - rate
    - standards
    - trellis
    - withdrawal
    - yield
  out:
    - agriculture
    - harvest
    - lactation
    - lineage
    - lots
    - maturity
    - measure
    - packs
    - postharvest
    - pruning
    - quota
    - rate
    - standards
    - trellis
    - withdrawal
    - yield
typography:
  partition: grade
  bondDegree: 51
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - harvest
    - lots
    - measure
    - packs
    - postharvest
    - quota
    - rate
    - standards
    - yield
  matrix:
    - agriculture
    - harvest
    - lactation
    - lineage
    - lots
    - maturity
    - measure
    - packs
    - postharvest
    - pruning
    - quota
    - rate
    - standards
    - trellis
    - withdrawal
    - yield
  backlinks:
    - agriculture
    - harvest
    - lactation
    - lineage
    - lots
    - maturity
    - measure
    - packs
    - postharvest
    - pruning
    - quota
    - rate
    - standards
    - trellis
    - withdrawal
    - yield
signatures:
  computationUuid: "19b0ff6b-f95c-89da-acdd-5451e4b0937b"
  stages:
    - stage: path
      stageUuid: "886e2af3-cff8-8b6d-bd08-65bd42136f77"
    - stage: trinity
      stageUuid: "899514de-cde1-84c0-bae1-0453ce5183f8"
    - stage: boundary
      stageUuid: "b1af0399-baa4-82ec-a424-31ab1ed41046"
    - stage: links
      stageUuid: "23b89c75-817c-873e-b800-6f06eb10d8b6"
    - stage: horo
      stageUuid: "b826fe92-df7e-80c1-8ae7-4a28151fe741"
    - stage: seal
      stageUuid: "c48e2e1d-6dc1-8ddd-9efe-81bd5b2a5b67"
    - stage: uuid
      stageUuid: "f9aeae36-3c09-84b5-96c8-7fd8f4d1e83c"
version: 2
---
# grade — sorting produce into quality classes

**grade** is the sorting of harvested produce into **quality classes** against uniform standards (USDA **US Fancy / No. 1 / No. 2**) — by size, color, firmness, **°Brix**, and freedom from defects. Its acts: **sorting** (separate by quality), **culling** (discard the unmarketable — defects, decay, off-size), **trimming** (dress to pack spec); the result is the **packout** (the marketable fraction packed from a harvested [[lots|lot]]). Grade **sets price** (a Fancy box clears above a No. 2) and defines the gross-vs-marketable [[yield]] gap that [[postharvest]] works to minimize.

Grade is the [[measure]]-against-a-[[standards|standard]] step between [[harvest]] and [[packs|packing]] — the same observe→classify logic as a [[quota]] or a quality gate, applied to produce. The packout % (marketable ÷ harvested) is a [[rate]] that, fed back, corrects the next plan's [[yield]] coefficients.

## Standards
- USDA AMS — Grade Standards for Fresh Vegetables (US Fancy / No. 1 / No. 2)
- UC Davis — quality indices; OSU Ohioline — °Brix grade thresholds
- GLOBALG.A.P. / GS1 — produce grade & pack labeling

Composes [[agriculture]] · [[harvest]] · [[postharvest]] · [[packs]] · [[yield]] · [[lots]] · [[measure]] · [[standards]] · [[rate]] · [[quota]].
