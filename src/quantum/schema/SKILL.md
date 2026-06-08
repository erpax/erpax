---
name: schema
description: "Use when reasoning about schema identity and drift on the matrix — a schema as the content-uuid of its canonical form, so identical schemas merge and any change yields a new uuid forcing re-verification by architecture."
atomPath: quantum/schema
coordinate: quantum/schema · 2/share · b32be724
contentUuid: "f61d4900-e190-570f-9c7e-3440062a6871"
diamondUuid: "d9c66c8f-e785-8158-aee1-7a82a762e081"
uuid: "b32be724-11da-8b29-ac6a-b4c4ee6a3e83"
horo: 2
bonds:
  in:
    - cardinality
    - collections
    - constraint
    - database
    - field
    - fields
    - law
    - partition
    - payload
    - quantum
    - schema
    - sti
    - test
    - testing
    - type
    - types
  out:
    - cardinality
    - collections
    - constraint
    - database
    - field
    - fields
    - law
    - partition
    - payload
    - schema
    - sti
    - test
    - testing
    - type
    - types
typography:
  partition: quantum
  bondDegree: 55
  neighbors: []
standards:
  - "RFC 9562 §5.8 content-uuid; schema.org"
bindings: []
neighbors:
  wikilink:
    - law
    - matrix
    - merge
    - quantum
    - schema
    - type
    - uuid
    - verification
  matrix:
    - cardinality
    - collections
    - constraint
    - database
    - field
    - fields
    - law
    - partition
    - payload
    - schema
    - sti
    - test
    - testing
    - type
    - types
  backlinks:
    - cardinality
    - collections
    - constraint
    - database
    - field
    - fields
    - law
    - partition
    - payload
    - schema
    - sti
    - test
    - testing
    - type
    - types
signatures:
  computationUuid: "31add35c-64d9-8980-b626-65cca7a732a6"
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
      stageUuid: "e097c8b3-26df-8ff5-9976-ab1092d9ddc1"
    - stage: seal
      stageUuid: "dbe0e97e-797c-8188-8642-d83860061016"
    - stage: uuid
      stageUuid: "23ce8b97-f219-8dc8-9f24-23e4163fd3c1"
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
    computationUuid: "31add35c-64d9-8980-b626-65cca7a732a6"
    contentUuid: "f61d4900-e190-570f-9c7e-3440062a6871"
version: 2
---
# quantum/schema — schema identity + drift as a content-uuid

The quantum facet of [[schema]]: a **schema is a content-uuid** — identified by the content-uuid of its canonical form (a schema.org type, a collection shape). So identical schemas **merge** (one uuid), and **any change yields a new uuid** — versioning and re-verification **by architecture**, the same law as [[verification]] / `domain/verification` (the published version drifts the instant the shape changes). Where [[schema]] is the vocabulary, this facet makes schema identity + drift computable on the [[matrix]] substrate ([[quantum]]).

**HONEST.** Content-addressing of a canonical schema string; the "quantum" is the uuid substrate, not a quantum computer.

Matter-twin: `src/quantum/schema/index.ts` (`schemaUuid` · `sameSchema` · `drifted`). Composes [[schema]] · [[uuid]] · [[merge]] · [[verification]] · [[matrix]] · [[quantum]] · [[type]].

**Law — [[law]]: a schema's identity is exactly the content-uuid of its canonical form, so two shapes are the same schema if and only if their uuids match — identical schemas merge to one, and any change to the shape yields a different uuid. Drift is therefore detectable by architecture: the moment the shape changes its uuid no longer matches the published version, forcing re-verification — versioning is structural, not by convention.**

@standard RFC 9562 §5.8 content-uuid; schema.org

<sub>content-uuid `f61d4900-e190-570f-9c7e-3440062a6871` · account `quantum/schema` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
