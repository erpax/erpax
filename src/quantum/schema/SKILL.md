---
name: schema
description: "Use when reasoning about schema identity and drift on the matrix — a schema as the content-uuid of its canonical form, so identical schemas merge and any change yields a new uuid forcing re-verification by architecture."
atomPath: "quantum/schema"
coordinate: "quantum/schema · 4/weave · 3101d3ae"
contentUuid: "350b5053-1f42-5d05-af85-b8b88a489d1a"
diamondUuid: "f1b8546d-1076-84a4-a222-fe0984adbe53"
uuid: "3101d3ae-2ea4-82c6-835d-03c6eb335a8e"
horo: 4
typography:
  partition: quantum
  bondDegree: 57
standards:
  - "RFC 9562 §5.8 content-uuid; schema.org"
bindings: []
signatures:
  computationUuid: "62e484d1-fe5a-8b22-a62d-26361c3b3872"
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
      stageUuid: "e29ca9af-6af1-81bc-bc3a-85993723694e"
    - stage: seal
      stageUuid: "dbe0e97e-797c-8188-8642-d83860061016"
    - stage: uuid
      stageUuid: "3c82fe95-74d1-8086-854a-ac540f24f902"
quantum:
  superposition:
    - cardinality
    - collections
    - constraint
    - database
    - field
    - law
    - partition
    - payload
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
    computationUuid: "62e484d1-fe5a-8b22-a62d-26361c3b3872"
    contentUuid: "350b5053-1f42-5d05-af85-b8b88a489d1a"
version: 2
---
# quantum/schema — schema identity + drift as a content-uuid

The quantum facet of [[schema]]: a **schema is a content-uuid** — identified by the content-uuid of its canonical form (a schema.org type, a collection shape). So identical schemas **merge** (one uuid), and **any change yields a new uuid** — versioning and re-verification **by architecture**, the same law as [[verification]] / `domain/verification` (the published version drifts the instant the shape changes). Where [[schema]] is the vocabulary, this facet makes schema identity + drift computable on the [[matrix]] substrate ([[quantum]]).

**HONEST.** Content-addressing of a canonical schema string; the "quantum" is the uuid substrate, not a quantum computer.

Matter-twin: `src/quantum/schema/index.ts` (`schemaUuid` · `sameSchema` · `drifted`). Composes [[schema]] · [[uuid]] · [[merge]] · [[verification]] · [[matrix]] · [[quantum]] · [[type]].

**Law — [[law]]: a schema's identity is exactly the content-uuid of its canonical form, so two shapes are the same schema if and only if their uuids match — identical schemas merge to one, and any change to the shape yields a different uuid. Drift is therefore detectable by architecture: the moment the shape changes its uuid no longer matches the published version, forcing re-verification — versioning is structural, not by convention.**

@standard RFC 9562 §5.8 content-uuid; schema.org

<sub>content-uuid `350b5053-1f42-5d05-af85-b8b88a489d1a` · account `quantum/schema` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
