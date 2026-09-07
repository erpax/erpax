---
name: chain
description: "Use when reasoning about chain — starts a chain at and extends it: addresses the pair (previous, content), so each link's identity depends on everything before it. walks the and reports where the walk breaks."
atomPath: "uuid/chain"
coordinate: "uuid/chain · 7/descent · fb8648af"
contentUuid: "86563d11-6177-5f0c-bee2-517d78b39cf8"
diamondUuid: "60bc1a8e-df3c-8681-ac7a-89782e502c96"
uuid: "fb8648af-1059-872f-aeef-255c945a3384"
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
  computationUuid: "2cba5f76-b4c8-8d2f-af30-72ed56aed844"
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
      stageUuid: "af03ba00-7323-87cb-950b-91f306449edb"
    - stage: seal
      stageUuid: "2a2aa3d5-c1d7-86d6-be60-6ddf960a37db"
    - stage: uuid
      stageUuid: "395f3cd4-2ef9-87a6-bd7f-bf10a4b3665c"
version: 2
---
# uuid/chain — a uuid bound to its predecessor IS a blockchain leaf

`forgeGenesisLink` starts a chain at `GENESIS_PREV_UUID` and `forgeChainLink` extends it:
`computeChainLinkUuid` addresses the pair (previous, content), so each link's identity depends on
everything before it. `verifyChain` walks the `LinkStore` and reports where the walk breaks.

There is no separate ledger structure here. The binding of one uuid to another is already the
leaf, which is why the tamper cost is the cost of re-forging every link after the one changed.

Composes: [[uuid]] · [[merge]] · [[law]].
