---
name: default
description: "Use when reasoning about defaults — nothing defines a default; the default is by architecture, derived from the content-uuid and the path, never a hardcoded fallback, because a defined default is an assumption and an assumption is entropy."
atomPath: default
coordinate: "default · 4/weave · 68108657"
contentUuid: "c03310ba-8549-52bd-8a36-dd2d5307a701"
diamondUuid: "87d0aa32-b0ae-813a-b20b-d9b1814a8745"
uuid: "68108657-5881-84fb-ba22-903af34fa293"
horo: 4
typography:
  partition: default
  bondDegree: 0
standards:
  - "BCP-47"
  - "computed-not-hardcoded · content-addressed identity (RFC 9562) · no free parameters (zero entropy)"
bindings: []
signatures:
  computationUuid: "1d1cdec1-9d83-81ba-ac08-3fb68030d457"
  stages:
    - stage: path
      stageUuid: "c340c85e-5b4c-8efd-806f-2eb2ee73fe77"
    - stage: trinity
      stageUuid: "dbe2b1d9-6ec6-8f62-8395-ef32243735d2"
    - stage: boundary
      stageUuid: "85f1550e-52c6-85a6-98e2-4fbfac376520"
    - stage: links
      stageUuid: "861efd06-c433-808b-a5b2-faab459d1aad"
    - stage: horo
      stageUuid: "8178669d-f98a-80d9-8c8a-8e210654ecf1"
    - stage: seal
      stageUuid: "dc131036-cc7b-8d4e-8eff-39c1bfc58778"
    - stage: uuid
      stageUuid: "495b4c8c-fa36-826c-886b-f776f64bf2ff"
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
