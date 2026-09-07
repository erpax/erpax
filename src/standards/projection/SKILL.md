---
name: projection
description: "Use when the standards catalogue must be read rather than changed — coverage by schema, UI improvement waves, and O(1) address lookup, each memoized on the catalogue's own content-address."
atomPath: "standards/projection"
coordinate: "standards/projection · 5/round · 2c0d6c68"
contentUuid: "60c173f4-4ca6-5267-8da0-6f726c7641db"
diamondUuid: "ca0c8487-5893-807a-af81-57311162ecc3"
uuid: "2c0d6c68-04e5-86c0-81b2-2a19f358d17b"
horo: 5
typography:
  partition: standards
  bondDegree: 57
standards:
  - "ISO/IEC-25010:2023 §5.1 functional-completeness (every standard is covered)"
bindings: []
signatures:
  computationUuid: "fda4e049-ecb1-8b38-9db4-42420195ddec"
  stages:
    - stage: path
      stageUuid: "05064c17-3515-88cb-b7d7-f6b5a0e951d7"
    - stage: trinity
      stageUuid: "58283489-5bde-8410-af0b-5417f0dc99f2"
    - stage: boundary
      stageUuid: "43691545-0a08-84c0-8628-f85f875603df"
    - stage: links
      stageUuid: "5a52d981-f2a6-88d9-b9bd-189164e71265"
    - stage: horo
      stageUuid: "8e872a5a-4122-8663-8f75-a06ec8ffe526"
    - stage: seal
      stageUuid: "e3cc8139-d132-85d5-980c-0529b846d216"
    - stage: uuid
      stageUuid: "372a63e3-0436-8da4-b99c-80a9af4b773e"
version: 2
---
# standards/projection — the catalogue, seen three ways

Three questions about one body of matter:

| projection | the question it answers |
| --- | --- |
| `schemaCoverage` | is every standard covered by a schema (family)? |
| `standardsUiWaves` | which admin surface is worth improving, biggest impact first? |
| `standardsIndex` · `lookupStandard` | where is standard `X`, in O(1)? |

They lived inline in the [[standards]] hub, which is a Payload collection — so a file that declares a table also held the derivations read off it. A hub holds no matter ([[rules]]/concentration); these are one child atom because they share one spine: **memoized on `catalogueRoot()`**, the content-address of the catalogue itself. Same catalogue ⇒ same root ⇒ the answer is reused, never re-folded.

That is the corpus's own economy applied to a read: the address is the memo key, so an unchanged catalogue costs a fold instead of a scan ([[gate]]/receipt says the same thing about the corpus).

**Honest boundary.** "Schema" here is the standard's FAMILY — its taxonomy — never a promise that a schema.org TYPE exists for each. Total coverage by SOME schema is the law; it is computed and refutable, and `uncovered` names every gap rather than rounding it away.

Composes: [[standards]] · [[merge]] · [[rules]].
