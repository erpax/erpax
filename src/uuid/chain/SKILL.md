---
name: chain
description: "Use when reasoning about chain — starts a chain at and extends it: addresses the pair (previous, content), so each link's identity depends on everything before it. walks the and reports where the walk breaks."
atomPath: "uuid/chain"
coordinate: "uuid/chain · 5/round · 64e6b6d0"
contentUuid: "21c76eb8-1f2b-5e20-9ee4-debec11ebaaa"
diamondUuid: "034bbdbb-04ef-87df-b2be-3189d343d44e"
uuid: "64e6b6d0-ba27-8c10-a3f4-a4bf10b94bfe"
horo: 5
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
  computationUuid: "38eafd18-0552-8319-8430-0a79cb5d56a3"
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
      stageUuid: "8e488081-2b57-867a-a3db-f71dcf6eaa8d"
    - stage: seal
      stageUuid: "2a2aa3d5-c1d7-86d6-be60-6ddf960a37db"
    - stage: uuid
      stageUuid: "cfaf99cf-7313-8724-8d49-98428e331237"
version: 2
---
# uuid/chain — a uuid bound to its predecessor IS a blockchain leaf

`forgeGenesisLink` starts a chain at `GENESIS_PREV_UUID` and `forgeChainLink` extends it:
`computeChainLinkUuid` addresses the pair (previous, content), so each link's identity depends on
everything before it. `verifyChain` walks the `LinkStore` and reports where the walk breaks.

There is no separate ledger structure here. The binding of one uuid to another is already the
leaf, which is why the tamper cost is the cost of re-forging every link after the one changed.

Composes: [[uuid]] · [[merge]] · [[law]].
