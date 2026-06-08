---
name: fodder
description: "Use when animals are fed harvested or provided feed rather than grazing — fodder/feed: hay, silage, grain, concentrate, the formulated ration (TMR), and the feed-conversion ratio. The cost driver of confined livestock and the harvested twin of grazed forage; FCR reuses the conversion atom."
atomPath: fodder
coordinate: fodder · 7/descent · 0ee657c9
contentUuid: "a2212331-5d77-55e4-adf0-e99eaac3623d"
diamondUuid: "a2eb16f6-b8fd-82de-b7eb-c38abcd2d608"
uuid: "0ee657c9-3812-81ce-a7be-1844b333edbb"
horo: 7
bonds:
  in:
    - animal
    - conversion
    - cost
    - grazing
    - harvest
    - herd
    - law
    - livestock
    - manufacturing
    - manure
    - postharvest
    - rate
    - throughput
  out:
    - animal
    - conversion
    - cost
    - grazing
    - harvest
    - herd
    - law
    - livestock
    - manufacturing
    - manure
    - postharvest
    - rate
    - throughput
typography:
  partition: fodder
  bondDegree: 42
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - animal
    - conversion
    - cost
    - grazing
    - harvest
    - herd
    - law
    - livestock
    - manufacturing
    - postharvest
    - rate
    - throughput
  matrix:
    - animal
    - conversion
    - cost
    - grazing
    - harvest
    - herd
    - law
    - livestock
    - manufacturing
    - manure
    - postharvest
    - rate
    - throughput
  backlinks:
    - animal
    - conversion
    - cost
    - grazing
    - harvest
    - herd
    - law
    - livestock
    - manufacturing
    - manure
    - postharvest
    - rate
    - throughput
signatures:
  computationUuid: "ff79188c-8de1-8589-b9bc-ed21f9e385c3"
  stages:
    - stage: path
      stageUuid: "ac4a3ca2-0b80-89f8-8542-66f121118399"
    - stage: trinity
      stageUuid: "178fecc5-61ff-8836-b830-960ba1577f7b"
    - stage: boundary
      stageUuid: "53e04ff9-525f-8015-9f37-39b9471ad8fd"
    - stage: links
      stageUuid: "e7264aff-d0cd-8abf-a5c5-7c6b8d5d0a51"
    - stage: horo
      stageUuid: "a8243327-00e7-8786-a629-f53d3d2cfc73"
    - stage: seal
      stageUuid: "394c628e-98fd-8981-af24-5978a53931b6"
    - stage: uuid
      stageUuid: "92f7380a-2a0c-8c7c-90b0-0853547f286e"
version: 2
---
# fodder — harvested/provided animal feed (the cut twin of grazed forage)

**fodder** is feed brought to the [[animal]] rather than grazed in place — the harvested/conserved/purchased twin of [[grazing|grazed forage]]: **hay** and **silage** (conserved forage, a [[harvest]] + [[postharvest]] event), **grain**, and **concentrate**. The formulated daily allotment is the **ration** (a total mixed ration / TMR — a feed bill-of-materials, the [[manufacturing|recipe]] of nutrition). Fodder is the dominant **[[cost]]** of confined [[livestock]].

Its efficiency is the **feed-conversion ratio** (feed mass ÷ live-weight or milk/egg gain) — a [[conversion]] [[rate]] ([[throughput]]). Fodder and [[grazing]] are the two feeding modes a [[herd]] runs on; what is not grazed must be fed.

## Standards
- Land-grant animal-nutrition extension (rations, TMR, feed-conversion ratio); Merck Veterinary Manual
- IFRS IAS-2 / IAS-41 (feed inventory; standing forage as biological asset)

Composes [[livestock]] · [[animal]] · [[grazing]] · [[herd]] · [[harvest]] · [[postharvest]] · [[conversion]] · [[rate]] · [[throughput]] · [[cost]] · [[manufacturing]].

**Law — [[law]]: fodder is feed brought to the [[livestock]] (the harvested twin of [[grazing|grazed forage]]) — the dominant [[cost]] of confined animals, its efficiency the feed-conversion ratio (a [[conversion]] [[rate]]); what is not grazed must be fed.**
