---
name: anchor
description: "Use when a memory, note or doc OUTSIDE the corpus points at something inside it — anchorOf computes the target's content-uuid so the pointer can prove it is still current, and verifyAnchor reads fresh · moved · gone. A name says WHERE and rots silently; a content-address says WHAT and is derived. Run: tsx src/memory/anchor/index.ts <path…>"
atomPath: "memory/anchor"
coordinate: "memory/anchor · 2/share · 12cfa4b7"
contentUuid: "c7062553-edda-537a-8818-b691bda0ba28"
diamondUuid: "867589fa-60b3-81bc-b275-398d7d4b56be"
uuid: "12cfa4b7-9896-8a37-adb4-4850bc68ca29"
horo: 2
typography:
  partition: memory
  bondDegree: 121
standards:
  - "RFC 9562 §5.8 — uuidv8 content-uuid"
bindings: []
signatures:
  computationUuid: "f1cd3a58-7cf0-872d-b7f0-24ae6940a75d"
  stages:
    - stage: path
      stageUuid: "46701383-7bb2-8bde-baf9-9df2dc4f2f98"
    - stage: trinity
      stageUuid: "c07ea929-9d19-8802-ad9d-580d8e05ae6e"
    - stage: boundary
      stageUuid: "4a6e3d85-f1a9-8247-b44c-26403de37d94"
    - stage: links
      stageUuid: "58076480-0270-8ff4-9b73-23745d0a5cc6"
    - stage: horo
      stageUuid: "6ec86780-2c97-856a-a19b-2bf463e81834"
    - stage: seal
      stageUuid: "28f4173d-50f5-8ce8-9df2-934c623de954"
    - stage: uuid
      stageUuid: "29f6ec4d-6b75-88e1-849f-191c6f90b171"
version: 2
---
# anchor — the content-address is what links inside and outside, both ways

An agent's memory lives **outside** (`~/.claude/projects/<project>/memory/`). The corpus lives **inside**. They are **duals, not copies**:

| inside (`src`) | outside (memory) |
| --- | --- |
| the **content** — a law that binds, a test that re-runs | the **address** — a belief that only re-reads |
| the corpus's self-knowledge | an agent's knowledge *of* the corpus |

Storing the content outside breaks the corpus's own rule — *derivable content is not stored* — and produces a second copy that drifts. **A pointer is the honest form.**

## But a pointer is not enough — a NAME rots silently

This is not a hypothesis. It is what this corpus is made of:

| | |
| --- | --- |
| **46 dead statutory pointers** | the clause→code trace an inspector follows, landing nowhere |
| `standards/catalogue.ts` | named a generator that had **moved** — and an agent read the banner and believed it |
| `APP_COLLECTION_SLUGS` | *"the source of truth for which collections the app registers"* — **8** of **231** |

Each was a **name**: it said *where*, kept saying it after the world moved, and nothing contradicted it. **A memory built out of names is built out of the exact material that rotted.**

## The link, both ways

A content-address is **derived**, not assigned — so it cannot lie about its target:

```
inside → outside   the content computes its own address; the memory cannot invent one
outside → inside   the memory holds the address; a mismatch PROVES the content moved
```

That is the bidirection. `toUuid` is a **theorem** (same content, same address — [[merge]]); a path is a **guess about a filesystem**. It is the same instrument that never lied once today, where every pattern-based scan lied fifteen times.

```
<!-- anchor: src/rules/SKILL.md e5d921c3-80ec-80ad-ae26-cb6a9fcfd40f -->
```

`verifyAnchor` reads **fresh** · **moved** · **gone** — and `moved` is not an error. It is the memory saying, computably, **"I am out of date"**: the one thing a prose note can never say about itself.

`gone` and `moved` are kept apart on purpose. A rotted path is not a changed truth, and a memory that cannot tell them apart will guess — which is how a stale pointer becomes a confident lie.

**Honest boundary.** This proves the content **changed**, never that the memory is **wrong** — a typo fix moves the uuid and invalidates nothing. It anchors a **file**, not a section: editing anything in `rules/SKILL.md` marks every pointer into it as moved. That is deliberate — **a false `moved` costs a re-read; a false `fresh` costs a lie**, and this corpus has paid the second price many times and the first never.

**Law — [[law]]: a citation across a boundary carries the content-address of what it cites. A name says WHERE and rots in silence; an address says WHAT, and its rot is computable.**

## Standards

- **RFC 9562 §5.8** — uuidv8 content-uuid.

Composes: [[memory]] · [[merge]] · [[uuid]] · [[law]].
