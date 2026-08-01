---
name: oid
description: "Use when an identity needs its ISO/ITU-T Object Identifier — every uuid is 2.25.<128-bit integer> (X.667), urn:oid (RFC 3061): the hierarchical dotted-path dual of the flat content-uuid. A derived, lossless re-encoding — another independently-verifiable level, another increment of tamper cost. Matter-twin localize (uuidToOid)."
atomPath: "vocabulary/oid"
coordinate: "vocabulary/oid · 5/round · 7599f071"
contentUuid: "002ed2a6-560f-5766-8927-d2d4d95b96ef"
diamondUuid: "dee2ff25-24fb-8682-8c34-9977c495a671"
uuid: "7599f071-0a67-813a-9305-6b4494613157"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "7b437b98-7941-8898-91b2-2991c69e7300"
  stages:
    - stage: path
      stageUuid: "6ca28f66-df71-8c1f-99ed-fde44d457423"
    - stage: trinity
      stageUuid: "237ef514-8be2-8aa9-888a-6e9c1534e1cc"
    - stage: boundary
      stageUuid: "011da852-4658-89f5-8fce-74d9f6cff436"
    - stage: links
      stageUuid: "1011ebe2-3de5-847a-86e6-afb8a981af4b"
    - stage: horo
      stageUuid: "1765313c-6e71-899a-94f6-1f5d7f423dc7"
    - stage: seal
      stageUuid: "70d24586-e5b5-832e-bbcf-7232d0bac6ca"
    - stage: uuid
      stageUuid: "4516fa17-afc7-8c48-8183-bfed636d22c1"
version: 2
---
# oid — the uuid on the ISO 2.25 arc

`oid` is the **hierarchical** identity encoding, dual to the flat content-[[uuid]]: the ITU-T/ISO Object Identifier. Every uuid has a canonical OID — its 128 bits read as a big integer under the registered UUID arc **`2.25`** (ITU-T X.667 / ISO-IEC 9834-8), with the `urn:oid:` URN form (RFC 3061). `uuidToOid`/`oidToUuid` round-trip losslessly: the OID carries **no new entropy** — it is the *same* identity in a second notation.

Why it matters to [[tamper/cost]]: a derived level is still an independent **check**. To forge an element a tamper must keep its content-uuid, its OID, its [[cmyk]] channel and its [[localize]] locale-map all coherent at once — and each recomputes from the bits, so any disagreement is detectable. The OID is also the machine-registerable name (X.660 trees, ASN.1, SNMP, X.509) — the [[proof]] side: anyone can verify the dotted name resolves to the same uuid. The dotted path is the [[fractal]] address-law made standard.

Matter-twin: `localize/index.ts` (`uuidToOid` · `oidToUuid` · `oidUrn` · `UUID_OID_ARC`). Composes: [[uuid]] · [[identity]] · [[localize]] · [[tamper/cost]] · [[proof]] · [[cmyk]] · [[merge]] · [[fractal]] · [[standard]].

## Common mistakes
- Treating the OID as a new id to store — it is *derived* from the uuid; recompute, never persist a second source of truth ([[merge]]).
- Using an enterprise/NID arc — UUIDs live on `2.25`, and the integer is the *whole* uuid, not a hash of it.

**Law — [[law]]: every uuid has a canonical OID on the ISO `2.25` arc — a lossless re-encoding carrying no new entropy, so it is recomputed not stored; a second independently-verifiable notation of the same identity that increments [[tamper/cost]].**
