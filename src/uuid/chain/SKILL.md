---
name: chain
description: "Use when reasoning about chain — starts a chain at and extends it: addresses the pair (previous, content), so each link's identity depends on everything before it. walks the and reports where the walk breaks."
atomPath: "uuid/chain"
coordinate: "uuid/chain · 2/share · bceead43"
contentUuid: "4dc75fa9-74d2-5d4a-9f46-5459e6566a82"
diamondUuid: "d00dcd96-2b0e-80f6-bc13-36f5a8c691ad"
uuid: "bceead43-b2c7-8887-9a2b-fda3e3f466db"
horo: 2
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
  computationUuid: "3cea8fb5-8358-8172-8f32-f6c581162d4d"
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
      stageUuid: "af661f2e-ce5b-8c49-8433-157385dd19d7"
    - stage: seal
      stageUuid: "2a2aa3d5-c1d7-86d6-be60-6ddf960a37db"
    - stage: uuid
      stageUuid: "a93a2dc9-49d2-846c-895a-088a7c7cfe4a"
version: 2
---
# uuid/chain — a uuid bound to its predecessor IS a blockchain leaf

`forgeGenesisLink` starts a chain at `GENESIS_PREV_UUID` and `forgeChainLink` extends it:
`computeChainLinkUuid` addresses the pair (previous, content), so each link's identity depends on
everything before it. `verifyChain` walks the `LinkStore` and reports where the walk breaks.

There is no separate ledger structure here. The binding of one uuid to another is already the
leaf, which is why the tamper cost is the cost of re-forging every link after the one changed.

Composes: [[uuid]] · [[merge]] · [[law]].
