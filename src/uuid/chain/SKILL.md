---
name: chain
description: "Use when reasoning about chain — starts a chain at and extends it: addresses the pair (previous, content), so each link's identity depends on everything before it. walks the and reports where the walk breaks."
atomPath: "uuid/chain"
coordinate: "uuid/chain · 7/descent · 498d669b"
contentUuid: "2202c6b7-8798-5041-9f01-66c591639fc5"
diamondUuid: "a504043b-c0ae-814b-b33b-ff1bebdf1acb"
uuid: "498d669b-5a5f-8070-8233-3ad4efd05662"
horo: 7
typography:
  partition: uuid
  bondDegree: 18
standards:
  - "ISO/IEC 23257-1 blockchain reference architecture"
  - "ITU-T Y.4810 DLT terminology"
  - "NIST FIPS 180-4 SHA-256"
  - RFC 8785 JSON Canonicalization Scheme
  - RFC 9562 §5.8 uuidv8
bindings: []
signatures:
  computationUuid: "c2dd898a-843d-85e2-8085-84167df3e58d"
  stages:
    - stage: path
      stageUuid: "c5f13dd5-f7be-81b1-94cc-47d9549dfeba"
    - stage: trinity
      stageUuid: "8e790429-6c76-86a6-9108-f72fac72e33b"
    - stage: boundary
      stageUuid: "d1ecf18a-792b-8d61-9c90-3afd2c365b98"
    - stage: links
      stageUuid: "b89a37ab-de12-8270-a224-4ff792482272"
    - stage: horo
      stageUuid: "75231313-0520-8e41-bbe0-f554ba489948"
    - stage: seal
      stageUuid: "2a2aa3d5-c1d7-86d6-be60-6ddf960a37db"
    - stage: uuid
      stageUuid: "bed7eeb9-3d66-85f7-bd20-5cb363929592"
version: 2
---
# uuid/chain — a uuid bound to its predecessor IS a blockchain leaf

`forgeGenesisLink` starts a chain at `GENESIS_PREV_UUID` and `forgeChainLink` extends it:
`computeChainLinkUuid` addresses the pair (previous, content), so each link's identity depends on
everything before it. `verifyChain` walks the `LinkStore` and reports where the walk breaks.

There is no separate ledger structure here. The binding of one uuid to another is already the
leaf, which is why the tamper cost is the cost of re-forging every link after the one changed.

Composes: [[uuid]] · [[merge]] · [[law]].
