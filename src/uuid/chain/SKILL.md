---
name: chain
description: "Use when reasoning about chain — starts a chain at and extends it: addresses the pair (previous, content), so each link's identity depends on everything before it. walks the and reports where the walk breaks."
atomPath: "uuid/chain"
coordinate: "uuid/chain · 8/crest · bf17ad6f"
contentUuid: "8e48dbdf-139f-515a-ad5a-be294a00a0ba"
diamondUuid: "d22f297e-e408-8d27-a00a-c8f4f5a77ca3"
uuid: "bf17ad6f-0da7-8b7b-a226-13659fc4b89a"
horo: 8
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
  computationUuid: "3daf0844-d74c-8789-b58b-eb9a2ad54309"
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
      stageUuid: "19652735-7828-8e9a-99f3-e9212ca61f9d"
    - stage: seal
      stageUuid: "2a2aa3d5-c1d7-86d6-be60-6ddf960a37db"
    - stage: uuid
      stageUuid: "7ee91517-0898-8749-9b4c-1363f4204ab0"
version: 2
---
# uuid/chain — a uuid bound to its predecessor IS a blockchain leaf

`forgeGenesisLink` starts a chain at `GENESIS_PREV_UUID` and `forgeChainLink` extends it:
`computeChainLinkUuid` addresses the pair (previous, content), so each link's identity depends on
everything before it. `verifyChain` walks the `LinkStore` and reports where the walk breaks.

There is no separate ledger structure here. The binding of one uuid to another is already the
leaf, which is why the tamper cost is the cost of re-forging every link after the one changed.

Composes: [[uuid]] · [[merge]] · [[law]].
