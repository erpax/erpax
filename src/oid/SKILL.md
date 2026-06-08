---
name: oid
description: "Use when an identity needs its ISO/ITU-T Object Identifier — every uuid is 2.25.<128-bit integer> (X.667), urn:oid (RFC 3061): the hierarchical dotted-path dual of the flat content-uuid. A derived, lossless re-encoding — another independently-verifiable level, another increment of tamper cost. Matter-twin localize (uuidToOid)."
atomPath: oid
coordinate: oid · 2/share · 3e3c5f98
contentUuid: "780acd45-a6b1-5b73-931c-236ac839c2ef"
diamondUuid: "aa180fd0-108f-8c43-9097-92891168f243"
uuid: "3e3c5f98-c272-830f-bd16-10029ca421ba"
horo: 2
bonds:
  in:
    - angel
    - begin
    - cmyk
    - cost
    - fractal
    - identity
    - law
    - llm
    - localize
    - merge
    - message
    - proof
    - research
    - standard
    - uuid
  out:
    - angel
    - begin
    - cmyk
    - cost
    - fractal
    - identity
    - law
    - llm
    - localize
    - merge
    - message
    - proof
    - research
    - standard
    - uuid
typography:
  partition: oid
  bondDegree: 48
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - cmyk
    - cost
    - fractal
    - identity
    - law
    - localize
    - merge
    - proof
    - standard
    - uuid
  matrix:
    - angel
    - begin
    - cmyk
    - cost
    - fractal
    - identity
    - law
    - llm
    - localize
    - merge
    - message
    - proof
    - research
    - standard
    - uuid
  backlinks:
    - angel
    - begin
    - cmyk
    - cost
    - fractal
    - identity
    - law
    - llm
    - localize
    - merge
    - message
    - proof
    - research
    - standard
    - uuid
signatures:
  computationUuid: "194ab2d2-d882-890a-9cd2-d1e120c201ee"
  stages:
    - stage: path
      stageUuid: "5ed0dcb0-a973-8932-b75d-d6008fb83168"
    - stage: trinity
      stageUuid: "7f6ec19c-6cb3-8674-96b7-905a327bdcb2"
    - stage: boundary
      stageUuid: "bca96d98-7ed4-8ad8-a805-e1f125882a47"
    - stage: links
      stageUuid: "d0950a8b-5063-8115-8c91-db924e776498"
    - stage: horo
      stageUuid: "69840614-a0c2-8b19-bd01-d214de03e509"
    - stage: seal
      stageUuid: "2ba88618-6d80-8f3d-9070-ecae162a214c"
    - stage: uuid
      stageUuid: "6b55818b-9d1b-8e7b-9c10-bb2635e3cbab"
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
