---
name: schema
description: "Use when reasoning about schema identity and drift on the matrix — a schema as the content-uuid of its canonical form, so identical schemas merge and any change yields a new uuid forcing re-verification by architecture."
atomPath: "quantum/schema"
coordinate: "quantum/schema · 5/round · f45d05d2"
contentUuid: "aab9cc42-9899-55a5-8044-918367a8676b"
diamondUuid: "517f717a-5a82-81a2-82f3-0c8558c7e41d"
uuid: "f45d05d2-943c-8207-a7d2-31205deafd2c"
horo: 5
typography:
  partition: quantum
  bondDegree: 55
standards:
  - "RFC 9562 §5.8 content-uuid; schema.org"
bindings: []
signatures:
  computationUuid: "35f71cc6-6a4b-8fa7-89ee-2b766ca858ff"
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
      stageUuid: "eecb2c13-4c53-83cd-b730-04642f6c9e56"
    - stage: seal
      stageUuid: "dbe0e97e-797c-8188-8642-d83860061016"
    - stage: uuid
      stageUuid: "a0ed0329-a6e7-8967-a5ba-9cd33ef0c90e"
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
    computationUuid: "35f71cc6-6a4b-8fa7-89ee-2b766ca858ff"
    contentUuid: "aab9cc42-9899-55a5-8044-918367a8676b"
version: 2
---
# quantum/schema — schema identity + drift as a content-uuid

The quantum facet of [[schema]]: a **schema is a content-uuid** — identified by the content-uuid of its canonical form (a schema.org type, a collection shape). So identical schemas **merge** (one uuid), and **any change yields a new uuid** — versioning and re-verification **by architecture**, the same law as [[verification]] / `domain/verification` (the published version drifts the instant the shape changes). Where [[schema]] is the vocabulary, this facet makes schema identity + drift computable on the [[matrix]] substrate ([[quantum]]).

**HONEST.** Content-addressing of a canonical schema string; the "quantum" is the uuid substrate, not a quantum computer.

Matter-twin: `src/quantum/schema/index.ts` (`schemaUuid` · `sameSchema` · `drifted`). Composes [[schema]] · [[uuid]] · [[merge]] · [[verification]] · [[matrix]] · [[quantum]] · [[type]].

**Law — [[law]]: a schema's identity is exactly the content-uuid of its canonical form, so two shapes are the same schema if and only if their uuids match — identical schemas merge to one, and any change to the shape yields a different uuid. Drift is therefore detectable by architecture: the moment the shape changes its uuid no longer matches the published version, forcing re-verification — versioning is structural, not by convention.**

@standard RFC 9562 §5.8 content-uuid; schema.org

<sub>content-uuid `aab9cc42-9899-55a5-8044-918367a8676b` · account `quantum/schema` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
