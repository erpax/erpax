---
name: oid
description: "Use when an identity needs its ISO/ITU-T Object Identifier — every uuid is 2.25.<128-bit integer> (X.667), urn:oid (RFC 3061): the hierarchical dotted-path dual of the flat content-uuid. A derived, lossless re-encoding — another independently-verifiable level, another increment of tamper cost. Matter-twin localize (uuidToOid)."
atomPath: "vocabulary/oid"
coordinate: "vocabulary/oid · 8/crest · 5d3c9f6a"
contentUuid: "470d9e85-b5a3-55bb-865a-01eee7e8bee2"
diamondUuid: "6d5ec822-667b-812c-8c0a-7e32c36e1faf"
uuid: "5d3c9f6a-ec8f-8a8a-b5d9-96dcc31aec75"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 48
standards: []
bindings: []
signatures:
  computationUuid: "49e9c2a9-06d9-83d4-b295-fafbd8b76bfc"
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
      stageUuid: "f117d471-4770-8468-8413-599723c9b1b2"
    - stage: seal
      stageUuid: "8883633b-da2f-876b-80ff-9c99867417d0"
    - stage: uuid
      stageUuid: "5c092355-c0b7-8251-b302-876ed83ce52d"
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
