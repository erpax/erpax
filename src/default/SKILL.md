---
name: default
description: "Use when reasoning about defaults — nothing defines a default; the default is by architecture, derived from the content-uuid and the path, never a hardcoded fallback, because a defined default is an assumption and an assumption is entropy."
atomPath: default
coordinate: "default · 8/crest · 302d12f4"
contentUuid: "b61186e1-d944-58c5-8d68-753174c1577d"
diamondUuid: "08a80ae0-e41b-8b1e-a73d-c1417934eb0b"
uuid: "302d12f4-1abd-82dc-a7f4-3e3c7a127434"
horo: 8
typography:
  partition: default
  bondDegree: 22
standards:
  - "BCP-47"
  - "RFC-3986"
  - "W3C-HTML5"
  - "computed-not-hardcoded · content-addressed identity (RFC 9562) · no free parameters (zero entropy)"
bindings: []
signatures:
  computationUuid: "856456ba-6917-89e8-8dd3-b0768226f64c"
  stages:
    - stage: path
      stageUuid: "c340c85e-5b4c-8efd-806f-2eb2ee73fe77"
    - stage: trinity
      stageUuid: "dbe2b1d9-6ec6-8f62-8395-ef32243735d2"
    - stage: boundary
      stageUuid: "af18b1e6-885d-8b33-939f-646f0ce54271"
    - stage: links
      stageUuid: "861efd06-c433-808b-a5b2-faab459d1aad"
    - stage: horo
      stageUuid: "74c80e34-e8c3-8cc2-8009-d7e56b453788"
    - stage: seal
      stageUuid: "70a802ce-0bc7-815e-8057-94a24ced5629"
    - stage: uuid
      stageUuid: "067d14dc-569b-8c07-b6bf-cb616e08b39b"
version: 2
---
# default — nothing defines a default; the default is by architecture

The schema.org word is `defaultValue` — a value to fall back to. The corpus inverts it: a **defined** default — `x || fallback`, `y ?? literal`, `param = value` — is an **assumption**, and an assumption is entropy, a free parameter an adversary can satisfy without touching the truth. So the corpus defines none. The value is already there, **by architecture**: a [[name]] hashes to its content-[[uuid]], the uuid reduces to its [[digit]], the path locates it. `architecturalDefault(name)` *derives* the identity; it does not assign it. There is nothing to default to, because the structure already decided.

This is why the [[collider]] has no default — its coverages are bounded [0,1] by construction and its atom count is positive by architecture, so no fallback is written. It is computed-not-hardcoded seen from the value's side: every value flows from the structure, never from a literal a human chose. `isByArchitecture(name, value)` holds only when the value equals what the architecture computes — proof it was derived, not defaulted.

Matter-twin: `src/default/index.ts` (`architecturalDefault` · `isByArchitecture`). Composes [[name]] · [[digit]] · [[uuid]] · [[collider]].

**Law — [[law]]: nothing defines a default — the default is by architecture. A defined default (a hardcoded fallback — `|| x`, `?? x`, `= literal`) is an assumption, hence entropy; the architecture (the content-uuid, the path, the computed structure) already determines the value, so derive it, never assign it. The collider has no default for exactly this reason — computed-not-hardcoded at every scale.**

Entangled with — [[value]]

Attested in schema.org — defaultValue

@audit the architectural default is computed from the name (uuid → digit); nothing is assigned
@standard computed-not-hardcoded · content-addressed identity (RFC 9562) · no free parameters (zero entropy)
