---
name: hyphen
description: "Use when driving the hyphenated-filename campaign — computes, as a read-only scalpel manifest, which stems can be renamed because the PATH already says the redundant word, and which need a human because more than one word survives. Specifiers are parsed (declarations, re-exports and dynamic import), ops are anchored on whole lines so an import and a re-export of the same module both cut, and a rename whose ops refuse is withheld rather than forced."
atomPath: "rules/hyphen"
coordinate: "rules/hyphen · 7/descent · e81a0b0d"
contentUuid: "8ff903d0-3e81-5a3b-8439-9a81250242ed"
diamondUuid: "fe306ae5-4821-8fa0-8bc4-70ebda60053b"
uuid: "e81a0b0d-dcac-8ad5-9050-255f4f3f3b3c"
horo: 7
typography:
  partition: rules
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "ec2f3228-a643-8246-bd79-7d540833d8f1"
  stages:
    - stage: path
      stageUuid: "c36f962a-e3c7-87c7-aa81-aa82ab413119"
    - stage: trinity
      stageUuid: "f8603421-acd2-898d-b543-3c8dbf6e4938"
    - stage: boundary
      stageUuid: "d8a8cb40-958f-86e0-b99f-8a58ed617cfc"
    - stage: links
      stageUuid: "d3df50b6-2d76-8963-aa6d-8b5352a68873"
    - stage: horo
      stageUuid: "27b6c61a-2884-8a93-b557-0ba5fd0cd9a5"
    - stage: seal
      stageUuid: "ba0c1085-6a36-892b-b4c1-32afb38ba1e2"
    - stage: uuid
      stageUuid: "cdbb9756-3a32-88ac-83fd-0a2186804761"
version: 2
---
# rules/hyphen — the campaign, computed instead of swept

365 code stems still carry a hyphen ([[rules]] `alphanumeric-name`). Doing that by
hand is this corpus's own documented failure: a changeset over **8** files with no
manifest is a sweep ([[rules]]/manifest), and a hand-rolled regex sweep in this very
session missed a dynamic `await import('./x')` that only `tsc` caught.

So this atom is the **read-only researcher** of [[scalpel]]: it writes nothing and
emits ops. The split it computes is the honest part.

| class | count | what it is |
| --- | ---: | --- |
| **viable** | 52 | the stem repeats a word its own path already says |
| **nesting** | 309 | more than one word survives — a child atom, and a judgement |
| withheld | 3 | ops refuse (ambiguous); named, never forced |

## Why "viable" is correct and not merely convenient

`ai/ai-security.ts` → `ai/security.ts` is not a shortcut. **The path is the message,
and this path said `ai` twice** ([[rules]]/echo) — the rename folds a message that was
never folded. Nothing new is invented: no atom, no SKILL, no meaning decided.

`agent/cost-policy.ts` is the opposite. Its path says neither *cost* nor *policy*, so
there is no redundant word and **no mechanical answer** — the lawful form is a child
atom, and a child atom needs a SKILL stating what it is. Generating 309 of those
mechanically would be prose with nothing behind it, which [[rules]]/prose refuses.
**That is why the 309 are not swept here.**

## Two things the scalpel taught this manifest

- **A bare specifier is not a safe `find`.** A module is commonly both imported and
  re-exported, so `'./x'` matches twice and the scalpel **refuses** — correctly. Ops
  are anchored on the whole line, so the import line and the export line each cut
  once, and a line that genuinely repeats still refuses.
- **A rename whose ops refuse is withheld entirely.** Moving the file anyway would
  leave that importer dangling. Unique-match-or-refuse applies to the campaign, not
  only to the op.

A batch is a set of **renames**, never a set of files: the move and the specifier
rewrites must land together or the ring reddens on work that is merely half-done.
The ring is `danglingSpecifiers` measured against the count that existed **before**
the run, so a gate does not demand someone else's debt be cleared first. That count
is now **0**: the two it once carried were one real dead import and one PHANTOM —
`./x.js` naming a `.ts` source, which TypeScript resolves and this resolver did not.
A phantom in a baseline is not cosmetic; the ring compares a **count**, so each one
silently buys a real dangle.

**Honest boundary.** A green ring proves every specifier **resolves**, never that the
new name is **better** — it proves only that the path already said the word being
dropped. It does not typecheck: `tsc` is the complement, run once at the end rather
than per batch. And `apply: false` is the default and the contract.

**Law — [[law]]: a mass rename is a manifest, not a sweep. Compute the cuts, name
every refusal before a byte moves, and let a batch that reddens roll back to the
byte.**

Composes: [[scalpel]] · [[rules]]/manifest · [[rules]]/echo · [[syntax]] · [[law]].
