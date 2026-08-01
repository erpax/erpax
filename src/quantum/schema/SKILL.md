---
name: schema
description: "Use when reasoning about schema identity and drift on the matrix — a schema as the content-uuid of its canonical form, so identical schemas merge and any change yields a new uuid forcing re-verification by architecture."
atomPath: "quantum/schema"
coordinate: "quantum/schema · 2/share · d3adbc1f"
contentUuid: "ee4ddc6b-8a0c-5fce-8ee4-85989adad6c4"
diamondUuid: "147097ed-e959-81e0-92d3-7f3930c28056"
uuid: "d3adbc1f-92a2-84a3-a1cf-a962d95617f6"
horo: 2
typography:
  partition: quantum
  bondDegree: 55
standards:
  - "RFC 9562 §5.8 content-uuid; schema.org"
bindings: []
signatures:
  computationUuid: "f2d02904-f002-8665-83bb-9375fa35d7a3"
  stages:
    - stage: path
      stageUuid: "890f2351-43b3-8760-83d4-31bc0ffd08c3"
    - stage: trinity
      stageUuid: "1ed8aaee-be81-83e3-861b-942515001f5e"
    - stage: boundary
      stageUuid: "9f885a27-439f-8729-8fa5-2241f4ce08a6"
    - stage: links
      stageUuid: "25a260d1-a2bc-8816-aa70-0debbee7303b"
    - stage: horo
      stageUuid: "ee6aabff-c694-8629-bcfb-12118107a62e"
    - stage: seal
      stageUuid: "dbe0e97e-797c-8188-8642-d83860061016"
    - stage: uuid
      stageUuid: "e14d0e2d-6b9e-82b1-baa0-cb85fc84ab57"
quantum:
  superposition:
    - cardinality
    - collections
    - constraint
    - database
    - field
    - fields
    - law
    - partition
    - superposition
  collapse:
    - "RFC 9562 §5.8 content-uuid; schema.org"
    - "Use when reasoning about schema identity and drift on the matrix — a schema as the content-uuid of its canonical form, so identical schemas merge and any change yields a new uuid forcing re-verification by architecture."
    - "a schema's identity is exactly the content-uuid of its canonical form, so two shapes are the same schema if and only if their uuids match — identical schemas merge to one, and any change to the shape yields a different uuid. Drift is therefore detectable by architecture: the moment the shape changes its uuid no longer matches the published version, forcing re-verification — versioning is structural, not by convention."
    - "matter-twin:src/quantum/schema/index.ts"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "f2d02904-f002-8665-83bb-9375fa35d7a3"
    contentUuid: "ee4ddc6b-8a0c-5fce-8ee4-85989adad6c4"
version: 2
---
# quantum/schema — schema identity + drift as a content-uuid

The quantum facet of [[schema]]: a **schema is a content-uuid** — identified by the content-uuid of its canonical form (a schema.org type, a collection shape). So identical schemas **merge** (one uuid), and **any change yields a new uuid** — versioning and re-verification **by architecture**, the same law as [[verification]] / `domain/verification` (the published version drifts the instant the shape changes). Where [[schema]] is the vocabulary, this facet makes schema identity + drift computable on the [[matrix]] substrate ([[quantum]]).

**HONEST.** Content-addressing of a canonical schema string; the "quantum" is the uuid substrate, not a quantum computer.

Matter-twin: `src/quantum/schema/index.ts` (`schemaUuid` · `sameSchema` · `drifted`). Composes [[schema]] · [[uuid]] · [[merge]] · [[verification]] · [[matrix]] · [[quantum]] · [[type]].

**Law — [[law]]: a schema's identity is exactly the content-uuid of its canonical form, so two shapes are the same schema if and only if their uuids match — identical schemas merge to one, and any change to the shape yields a different uuid. Drift is therefore detectable by architecture: the moment the shape changes its uuid no longer matches the published version, forcing re-verification — versioning is structural, not by convention.**

@standard RFC 9562 §5.8 content-uuid; schema.org

<sub>content-uuid `ee4ddc6b-8a0c-5fce-8ee4-85989adad6c4` · account `quantum/schema` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
