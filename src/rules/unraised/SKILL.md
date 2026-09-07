---
name: unraised
description: "Use when a declared failure kind is never raised — a `…Kind` union member that nothing in src ever constructs is a check that cannot fire, so its claim defaults to TRUE by omission. Parsed via ts.createSourceFile, never matched. Run: tsx src/rules/unraised/index.ts"
atomPath: "rules/unraised"
coordinate: "rules/unraised · 5/round · 19c1c075"
contentUuid: "87acd73c-cb71-529f-a16b-630f2e8ab58a"
diamondUuid: "9b328986-07da-8959-aa02-32a6aff7923f"
uuid: "19c1c075-8ac3-8d7f-b814-179a17ad7b3d"
horo: 5
typography:
  partition: rules
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "665979ca-9126-8c29-b699-ce9e7fb2d9d8"
  stages:
    - stage: path
      stageUuid: "b60dad88-5945-832b-8446-10ee08a57e87"
    - stage: trinity
      stageUuid: "c4af7a23-1bee-8fd6-88df-f57dca2104e1"
    - stage: boundary
      stageUuid: "734e6826-c4a1-8805-ae98-0d3e1616ecdc"
    - stage: links
      stageUuid: "0ccf65af-137b-84a7-87d9-c0c3da62d6e6"
    - stage: horo
      stageUuid: "8cc97ff4-ab34-83aa-a941-5e5293060d88"
    - stage: seal
      stageUuid: "2706b24c-7df7-8886-9bad-5a455e692e99"
    - stage: uuid
      stageUuid: "82f3f287-efe1-8d16-a296-596634613ceb"
version: 2
---
# unraised — a case that is never raised is a check that cannot fire

A taxonomy of failures is a promise: *these are the ways this can go wrong, and each is detected.* A member declared in the union and **constructed nowhere** breaks that promise silently. The check does not fail — it never runs, and the claim it guards reads as true forever because nothing is left to contradict it.

This is the same defect as a location axis that exempts every path outside the root: **default-ALLOW by omission**. Not a wrong answer, an unasked question — and a false negative in a gate is worse than a false positive, because it reports green over the exact case it exists for.

| | count (2026-07-31) |
| --- | ---: |
| declared `…Kind` union members | parsed from every `.ts` under `src` |
| **never constructed anywhere** | **7** |

`ChainKind.atproto` · `ChainKind.cardano-metadata` · `DocumentKind.customs_declaration` · `DocumentKind.id_document` · `DocumentKind.shipping_label` · `IdentifierKind.jws` · `StandardsFtlGapKind.linear-catalogue-lookup`.

## Parsed, not matched

`declaredKinds` reads union members from `ts.TypeAliasDeclaration`; `constructedLiterals` collects only **expression-position** string literals, so a `LiteralTypeNode` in the declaration can never count as its own construction site. A regex over TypeScript is a guess, and this corpus has paid for that guess in every gate built on one.

The parser earned its place immediately: it **refused** the author's claim that `CrackKind.spacetime` was unraised. It is raised, at `src/quantum/ftl/index.ts:118`. The claim had been built on a shell glob that errored and returned nothing — absence of evidence read as evidence of absence.

**Honest boundary.** This proves a member is **never constructed as a literal**, never that the case is **unreachable** — a kind assembled dynamically (`obj[name]`, a value threaded from config) is invisible to a lexical scan. Generated faces (`payload-types`, `skills.index`, `.d.ts`) restate every symbol, so they are not evidence. And an unraised kind is a **candidate**: some are honest forward declarations for work not yet wired. It names where a check cannot fire; a human decides whether to raise it or drop it.

**Law — [[law]]: a declared failure kind must be raised somewhere, or it is decoration. A case nothing constructs is a check that cannot fire, and its claim defaults to true by omission — raise it, or stop declaring it.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: a case that cannot occur cannot be tested.

Composes: [[rules]] · [[syntax]] · [[law]].
