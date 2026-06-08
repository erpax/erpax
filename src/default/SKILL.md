---
name: default
description: "Use when reasoning about defaults — nothing defines a default; the default is by architecture, derived from the content-uuid and the path, never a hardcoded fallback, because a defined default is an assumption and an assumption is entropy."
atomPath: default
coordinate: default · 4/weave · 4571afd1
contentUuid: "2f782347-9c36-504b-b636-85ae1e631967"
diamondUuid: "b3a36ae5-c472-8381-9cea-ae5a16cbeaf8"
uuid: "4571afd1-034a-8ae4-9083-c9782058b045"
horo: 4
bonds:
  in:
    - collider
    - digit
    - law
    - name
    - sealed
    - uuid
    - value
  out:
    - collider
    - digit
    - law
    - name
    - sealed
    - uuid
    - value
typography:
  partition: default
  bondDegree: 0
  neighbors: []
standards:
  - "BCP-47"
  - "computed-not-hardcoded · content-addressed identity (RFC 9562) · no free parameters (zero entropy)"
  - the architectural default is computed from the name (uuid → digit); nothing is assigned
bindings: []
neighbors:
  wikilink:
    - collider
    - digit
    - law
    - name
    - uuid
    - value
  matrix:
    - collider
    - digit
    - law
    - name
    - sealed
    - uuid
    - value
  backlinks:
    - collider
    - digit
    - law
    - name
    - sealed
    - uuid
    - value
signatures:
  computationUuid: "6d46be2e-468a-84d0-97da-8feb585f369f"
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
      stageUuid: "a5638c43-b1bd-88dd-b471-86f00b47d680"
    - stage: seal
      stageUuid: "dc131036-cc7b-8d4e-8eff-39c1bfc58778"
    - stage: uuid
      stageUuid: "464be631-ba9d-8008-9438-53a631e61a59"
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
