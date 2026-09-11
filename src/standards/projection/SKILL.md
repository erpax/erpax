---
name: projection
description: "Use when the standards catalogue must be read rather than changed — coverage by schema, UI improvement waves, and O(1) address lookup, each memoized on the catalogue's own content-address."
atomPath: "standards/projection"
coordinate: "standards/projection · 5/round · be0e08c4"
contentUuid: "2633880b-5cc2-5e7d-b64c-f4b6332dde19"
diamondUuid: "1244b7f1-11cd-8968-86e2-b098321defda"
uuid: "be0e08c4-b040-8a72-81c6-e8b3453db69b"
horo: 5
typography:
  partition: standards
  bondDegree: 57
standards:
  - "ISO/IEC-25010:2023 §5.1 functional-completeness (every standard is covered)"
bindings: []
signatures:
  computationUuid: "239ae2ac-6a6c-891a-84d1-9df8bc500730"
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
      stageUuid: "6f8087fe-6700-8fd2-a6b6-dc158dcbb375"
    - stage: seal
      stageUuid: "e3cc8139-d132-85d5-980c-0529b846d216"
    - stage: uuid
      stageUuid: "f61d537a-5214-89de-9b50-0a6325656a35"
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
