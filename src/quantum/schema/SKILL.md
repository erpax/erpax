---
name: schema
description: "Use when reasoning about schema identity and drift on the matrix — a schema as the content-uuid of its canonical form, so identical schemas merge and any change yields a new uuid forcing re-verification by architecture."
atomPath: "quantum/schema"
coordinate: "quantum/schema · 7/descent · 0ab75e83"
contentUuid: "f4ec04ff-f00e-52f2-8dca-dcf24b12f874"
diamondUuid: "79c730ac-fc56-889d-9ce9-13333c08ff38"
uuid: "0ab75e83-35dd-87c2-a578-993e8f7b8843"
horo: 7
typography:
  partition: quantum
  bondDegree: 40
standards:
  - "RFC 9562 §5.8 content-uuid; schema.org"
bindings: []
signatures:
  computationUuid: "ab2b0e80-3449-8fd5-bd07-77c0fdb6342a"
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
      stageUuid: "f927828e-274c-8959-bcc9-f58f9732d83b"
    - stage: seal
      stageUuid: "dbe0e97e-797c-8188-8642-d83860061016"
    - stage: uuid
      stageUuid: "64383787-aee0-8181-a35a-5cac6093e42f"
quantum:
  superposition:
    - collections
    - field
    - law
    - payload
    - quantum
    - schema
    - sti
    - test
    - testing
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
    computationUuid: "ab2b0e80-3449-8fd5-bd07-77c0fdb6342a"
    contentUuid: "f4ec04ff-f00e-52f2-8dca-dcf24b12f874"
version: 2
---
# quantum/schema — schema identity + drift as a content-uuid

The quantum facet of [[schema]]: a **schema is a content-uuid** — identified by the content-uuid of its canonical form (a schema.org type, a collection shape). So identical schemas **merge** (one uuid), and **any change yields a new uuid** — versioning and re-verification **by architecture**, the same law as verification / `domain/verification` (the published version drifts the instant the shape changes). Where [[schema]] is the vocabulary, this facet makes schema identity + drift computable on the [[matrix]] substrate ([[quantum]]).

**HONEST.** Content-addressing of a canonical schema string; the "quantum" is the uuid substrate, not a quantum computer.

Matter-twin: `src/quantum/schema/index.ts` (`schemaUuid` · `sameSchema` · `drifted`). Composes [[schema]] · [[uuid]] · [[merge]] · verification · [[matrix]] · [[quantum]] · [[type]].

**Law — [[law]]: a schema's identity is exactly the content-uuid of its canonical form, so two shapes are the same schema if and only if their uuids match — identical schemas merge to one, and any change to the shape yields a different uuid. Drift is therefore detectable by architecture: the moment the shape changes its uuid no longer matches the published version, forcing re-verification — versioning is structural, not by convention.**

@standard RFC 9562 §5.8 content-uuid; schema.org

<sub>content-uuid `f4ec04ff-f00e-52f2-8dca-dcf24b12f874` · account `quantum/schema` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
