---
name: family
description: "Use when asking what the MCP surface still lacks without deciding it by hand — every erpax.<area>.* family read as a trinity of declared legs (measure · involute · act); a family with all three closes in one turn, one missing a leg names its own next tool. erpax.family.trinities reports it from the live tool list."
atomPath: "agents/mcp/family"
coordinate: "agents/mcp/family · 8/crest · 8b722824"
contentUuid: "5813239f-2517-5f33-b863-712a76ae2a19"
diamondUuid: "212bca1f-de75-8f09-8033-1e80cb36df17"
uuid: "8b722824-a6d2-8e1d-805b-62c8fcb2d0c0"
horo: 8
typography:
  partition: agents
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "eae988e8-3f69-83c8-b162-8898d5b662b2"
  stages:
    - stage: path
      stageUuid: "606f1e52-4415-81f3-80e1-8e6f75561d90"
    - stage: trinity
      stageUuid: "99c7249d-b1d1-8fee-afee-c46f2d5e7643"
    - stage: boundary
      stageUuid: "f9c2ad66-d4f2-8103-ab73-62f5fb4fc757"
    - stage: links
      stageUuid: "f48a2a47-5dc6-8aac-b23d-b5af05267c86"
    - stage: horo
      stageUuid: "daa4f49c-d395-8569-a66a-5028feed07d3"
    - stage: seal
      stageUuid: "4866013b-e261-8825-9c14-6edad2c2015b"
    - stage: uuid
      stageUuid: "39762059-2703-80df-a9e8-aea1b43160b8"
version: 2
---
# agents/mcp/family — the surface read as trinity families

The tools of this corpus come in families: `erpax.gate.*`, `erpax.frontier.*`, `erpax.quantum.*`.
Until now a family was whatever its area file happened to export. This atom reads each family as a
**trinity** — the three legs one turn of a coil needs ([[quantum]]/coil):

| leg | what it does | example |
| --- | --- | --- |
| `measure` | says what is | `erpax.frontier.next` · `erpax.gate.verdicts` |
| `involute` | asks the dual seat what refutes it | `erpax.frontier.involute` · `erpax.gate.crosses` |
| `act` | emits the computed manifest the scalpel applies — never a hand | `erpax.frontier.develop` |

A family with all three is a trinity and closes in one turn each way. A family missing a leg
**names the leg**, and that list is the next development of the surface — computed from the tools
that exist, not chosen. Measured 2026-10-03: `frontier` is the first trinity; `gate`, `quantum`,
`novelty` and `witness` measure and involute and lack an `act`; the single-tool families (`kyc`,
`aml`, `risk`, `float`, `staffing`) measure and lack both.

## Declared, never read off the name

A role is a field on the tool (`role: 'measure' | 'involute' | 'act'`), written where the tool is
defined. Reading it off the name — `next` is a measure, `cross` an involution — would be a guess
about a word, the kind every gate here has paid for ([[rules]]/probe). A tool with no declared role
is reported `undeclared`: a family that cannot yet be read, which is itself the finding.

## The family's own trinity — roles (involute) · declare (act)

Asked through the gateway the day the families first rode it, `erpax.family.trinities` reported
**51 families, 2 trinities, 39 with every leg missing** — not because 39 areas lacked tools but
because none of their tools declared a leg. Reading them by hand would be the manual pass this
corpus refuses; reading them off their names is the guess the section above forbids. So the family
got its own two legs:

- **`erpax.family.roles`** — the involution: each tool's declared leg against the leg its handler's
  **shape** implies. A body that calls `create` · `update` · `delete` · `writeFile…` · `applyScalpel`
  (`WRITE_CALLS`, declared in the open) is an act; a body that only reads is a measure. The involute leg
  is never inferred — a dual is a claim, not a shape. A measure that writes is a **lie** about the
  surface, and on first run there was exactly one: `erpax.outward.leads` wrote the harvest behind a
  `write: true` flag. The write moved to `erpax.outward.record`, the leg that says it writes.
- **`erpax.family.declare`** — the act: one scalpel op per undeclared literal-named tool, the `name:`
  line as the unique anchor and `role: <shape>` written after it; dry-run by default, `apply: true`
  through the scalpel's ring, verified by re-parsing. A template-named family (`erpax.auto.*`, 226
  `verify` tools among them) is declared **once, at its generator**, which is what the parser's skip
  of template names forces.

**Honest boundary.** The shape sees one direction only: a write call in the body. A tool that writes
through a helper whose body it cannot see reads as a measure, and a measure placed by shape still has
no involute leg until a dual is written — `missing: ['involute']` is the honest next tool for most
families after the declaration lands. And the act paid for its own anchor rule on the first run: it
wrote `role:` after a tool spelled on **one line** inside a `*.test.ts` fixture, landing after the
closing brace — a parse error the Lint lane caught. A fixture is not a tool (test files are skipped
in both spellings), and an anchor must be a `name:`-only line (`NAME_LINE`) or the tool is reported
`unanchored` and never cut.

## Why this exists

The leads the frontier generates were being developed by hand — a leaf extracted here, a hub split
there, a dead export wired by reading the file. Each was right and none was repeatable. The act leg
turns that into a computed manifest, and the family reading says which families still have no act
to turn to. Nothing manual: the surface measures its own gaps.

**Honest boundary.** This proves a family declares three legs, never that the legs are good — an
`act` that emits decisions instead of ops is still an act, and the manifest it emits is the thing to
read. And a trinity is per family; the whole surface coiled is [[quantum]]/coil's question, not this one.

**Law — [[law]]: a tool family is a trinity or it is incomplete, and the missing leg is computed from
the tools that exist. Measure, involute, act — and declare which is which, because a name is a guess.**

Composes: [[quantum]]/coil · [[self]]/involute · [[scalpel]] · [[law]].
