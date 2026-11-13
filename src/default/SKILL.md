---
name: default
description: "Use when reasoning about defaults — nothing defines a default; the default is by architecture, derived from the content-uuid and the path, never a hardcoded fallback, because a defined default is an assumption and an assumption is entropy."
atomPath: default
coordinate: "default · 1/base · 2d647e8e"
contentUuid: "1a372895-cf7b-5ae1-b11b-ea5220f1f49e"
diamondUuid: "fd8b0a87-ef80-829f-b215-29e99b31c433"
uuid: "2d647e8e-ebd4-8d03-8262-46c04d82c423"
horo: 1
typography:
  partition: default
  bondDegree: 19
standards:
  - "BCP-47"
  - "RFC-3986"
  - "W3C-HTML5"
  - "computed-not-hardcoded · content-addressed identity (RFC 9562) · no free parameters (zero entropy)"
bindings: []
signatures:
  computationUuid: "5feead11-000d-8dc5-aad2-9010b1e3bf1e"
  stages:
    - stage: path
      stageUuid: "c340c85e-5b4c-8efd-806f-2eb2ee73fe77"
    - stage: trinity
      stageUuid: "dbe2b1d9-6ec6-8f62-8395-ef32243735d2"
    - stage: boundary
      stageUuid: "af18b1e6-885d-8b33-939f-646f0ce54271"
    - stage: links
      stageUuid: "d62c9c09-0fbc-8aa8-a517-767833f3bf19"
    - stage: horo
      stageUuid: "8d90efaa-2ca9-8032-b455-38681165ed65"
    - stage: seal
      stageUuid: "70a802ce-0bc7-815e-8057-94a24ced5629"
    - stage: uuid
      stageUuid: "bce12bd5-a543-820e-890d-8528ac797e9d"
version: 2
---
# default — nothing defines a default; the default is by architecture

The schema.org word is `defaultValue` — a value to fall back to. The corpus inverts it: a **defined** default — `x || fallback`, `y ?? literal`, `param = value` — is an **assumption**, and an assumption is entropy, a free parameter an adversary can satisfy without touching the truth. So the corpus defines none. The value is already there, **by architecture**: a [[name]] hashes to its content-[[uuid]], the uuid reduces to its [[digit]], the path locates it. `architecturalDefault(name)` *derives* the identity; it does not assign it. There is nothing to default to, because the structure already decided.

This is why the [[collider]] has no default — its coverages are bounded [0,1] by construction and its atom count is positive by architecture, so no fallback is written. It is computed-not-hardcoded seen from the value's side: every value flows from the structure, never from a literal a human chose. `isByArchitecture(name, value)` holds only when the value equals what the architecture computes — proof it was derived, not defaulted.

Matter-twin: `src/default/index.ts` (`architecturalDefault` · `isByArchitecture`). Composes [[name]] · [[digit]] · [[uuid]] · [[collider]].

**Law — [[law]]: nothing defines a default — the default is by architecture. A defined default (a hardcoded fallback — `|| x`, `?? x`, `= literal`) is an assumption, hence entropy; the architecture (the content-uuid, the path, the computed structure) already determines the value, so derive it, never assign it. The collider has no default for exactly this reason — computed-not-hardcoded at every scale.**

Entangled with — value

Attested in schema.org — defaultValue

@audit the architectural default is computed from the name (uuid → digit); nothing is assigned
@standard computed-not-hardcoded · content-addressed identity (RFC 9562) · no free parameters (zero entropy)
