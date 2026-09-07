---
name: projection
description: "Use when the standards catalogue must be read rather than changed — coverage by schema, UI improvement waves, and O(1) address lookup, each memoized on the catalogue's own content-address."
atomPath: "standards/projection"
coordinate: "standards/projection · 7/descent · 76f4f5c8"
contentUuid: "8a930125-2feb-5e5a-93e2-7fb3fd72181a"
diamondUuid: "5a017f35-8ff9-8c2b-84ca-d815919fdc95"
uuid: "76f4f5c8-2048-8a30-a570-27dd937e189b"
horo: 7
typography:
  partition: standards
  bondDegree: 57
standards:
  - "ISO/IEC-25010:2023 §5.1 functional-completeness (every standard is covered)"
bindings: []
signatures:
  computationUuid: "9e93513f-c627-8935-b324-e90f59148b45"
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
      stageUuid: "b7814bb2-213a-8b8c-a090-11c0cfd4dc58"
    - stage: seal
      stageUuid: "e3cc8139-d132-85d5-980c-0529b846d216"
    - stage: uuid
      stageUuid: "7f8b9eea-6446-8086-936c-bee131ffd05d"
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
