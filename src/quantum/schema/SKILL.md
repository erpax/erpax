---
name: schema
description: "Use when reasoning about schema identity and drift on the matrix — a schema as the content-uuid of its canonical form, so identical schemas merge and any change yields a new uuid forcing re-verification by architecture."
atomPath: "quantum/schema"
coordinate: "quantum/schema · 7/descent · 0ab75e83"
contentUuid: "99069280-d3fa-5be0-828d-d1c65a585cc6"
diamondUuid: "e9640eab-8759-8e15-837f-50f3787790d2"
uuid: "0ab75e83-35dd-87c2-a578-993e8f7b8843"
horo: 7
typography:
  partition: quantum
  bondDegree: 56
standards:
  - "RFC 9562 §5.8 content-uuid; schema.org"
bindings: []
signatures:
  computationUuid: "5f5e2928-2de7-8853-a135-f3436c901bf5"
  stages:
    - stage: path
      stageUuid: "890f2351-43b3-8760-83d4-31bc0ffd08c3"
    - stage: trinity
      stageUuid: "1ed8aaee-be81-83e3-861b-942515001f5e"
    - stage: boundary
      stageUuid: "9f885a27-439f-8729-8fa5-2241f4ce08a6"
    - stage: links
      stageUuid: "1fa13aaa-b6c5-86ab-91ca-5bdf0e0ccf94"
    - stage: horo
      stageUuid: "857ab55b-90fd-88b8-9239-76279459db4b"
    - stage: seal
      stageUuid: "dbe0e97e-797c-8188-8642-d83860061016"
    - stage: uuid
      stageUuid: "bc5fdb76-bcbe-88d1-8d91-e936bc4c22c7"
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
    computationUuid: "5f5e2928-2de7-8853-a135-f3436c901bf5"
    contentUuid: "99069280-d3fa-5be0-828d-d1c65a585cc6"
version: 2
---
# quantum/schema — schema identity + drift as a content-uuid

The quantum facet of [[schema]]: a **schema is a content-uuid** — identified by the content-uuid of its canonical form (a schema.org type, a collection shape). So identical schemas **merge** (one uuid), and **any change yields a new uuid** — versioning and re-verification **by architecture**, the same law as verification / `domain/verification` (the published version drifts the instant the shape changes). Where [[schema]] is the vocabulary, this facet makes schema identity + drift computable on the [[matrix]] substrate ([[quantum]]).

**HONEST.** Content-addressing of a canonical schema string; the "quantum" is the uuid substrate, not a quantum computer.

Matter-twin: `src/quantum/schema/index.ts` (`schemaUuid` · `sameSchema` · `drifted`). Composes [[schema]] · [[uuid]] · [[merge]] · verification · [[matrix]] · [[quantum]] · [[type]].

**Law — [[law]]: a schema's identity is exactly the content-uuid of its canonical form, so two shapes are the same schema if and only if their uuids match — identical schemas merge to one, and any change to the shape yields a different uuid. Drift is therefore detectable by architecture: the moment the shape changes its uuid no longer matches the published version, forcing re-verification — versioning is structural, not by convention.**

@standard RFC 9562 §5.8 content-uuid; schema.org

<sub>content-uuid `99069280-d3fa-5be0-828d-d1c65a585cc6` · account `quantum/schema` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
