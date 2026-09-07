---
name: default
description: "Use when reasoning about defaults — nothing defines a default; the default is by architecture, derived from the content-uuid and the path, never a hardcoded fallback, because a defined default is an assumption and an assumption is entropy."
atomPath: default
coordinate: "default · 5/round · 015c0e78"
contentUuid: "aa6c9a63-9d2b-51ab-914e-6dbdb6dd982b"
diamondUuid: "d2521e10-7211-8658-9526-79318c61ed53"
uuid: "015c0e78-01fc-86ed-abb1-fe94b661d7ca"
horo: 5
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
  computationUuid: "4764d6f3-3f17-812a-9272-0edc747b4cf9"
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
      stageUuid: "23e4337f-a353-87ed-842a-e27123e99150"
    - stage: seal
      stageUuid: "70a802ce-0bc7-815e-8057-94a24ced5629"
    - stage: uuid
      stageUuid: "a11d60c4-5606-871c-bff7-98c327dcf3b6"
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
