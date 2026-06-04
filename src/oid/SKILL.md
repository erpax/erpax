---
name: oid
description: "Use when an identity needs its ISO/ITU-T Object Identifier — every uuid is 2.25.<128-bit integer> (X.667), urn:oid (RFC 3061): the hierarchical dotted-path dual of the flat content-uuid. A derived, lossless re-encoding — another independently-verifiable level, another increment of tamper cost. Matter-twin localize (uuidToOid)."
---

# oid — the uuid on the ISO 2.25 arc

`oid` is the **hierarchical** identity encoding, dual to the flat content-[[uuid]]: the ITU-T/ISO Object Identifier. Every uuid has a canonical OID — its 128 bits read as a big integer under the registered UUID arc **`2.25`** (ITU-T X.667 / ISO-IEC 9834-8), with the `urn:oid:` URN form (RFC 3061). `uuidToOid`/`oidToUuid` round-trip losslessly: the OID carries **no new entropy** — it is the *same* identity in a second notation.

Why it matters to [[tamper-cost]]: a derived level is still an independent **check**. To forge an element a tamper must keep its content-uuid, its OID, its [[cmyk]] channel and its [[localize]] locale-map all coherent at once — and each recomputes from the bits, so any disagreement is detectable. The OID is also the machine-registerable name (X.660 trees, ASN.1, SNMP, X.509) — the [[proof]] side: anyone can verify the dotted name resolves to the same uuid. The dotted path is the [[fractal]] address-law made standard.

Matter-twin: `localize/index.ts` (`uuidToOid` · `oidToUuid` · `oidUrn` · `UUID_OID_ARC`). Composes: [[uuid]] · [[identity]] · [[localize]] · [[tamper-cost]] · [[proof]] · [[cmyk]] · [[merge]] · [[fractal]] · [[standard]].

## Common mistakes
- Treating the OID as a new id to store — it is *derived* from the uuid; recompute, never persist a second source of truth ([[merge]]).
- Using an enterprise/NID arc — UUIDs live on `2.25`, and the integer is the *whole* uuid, not a hash of it.
