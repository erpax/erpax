---
name: anchor
description: "Use when a memory, note or doc OUTSIDE the corpus points at something inside it — anchorOf computes the target's content-uuid so the pointer can prove it is still current, and verifyAnchor reads fresh · moved · gone. A name says WHERE and rots silently; a content-address says WHAT and is derived. Run: tsx src/memory/anchor/index.ts <path…>"
atomPath: "memory/anchor"
coordinate: "memory/anchor · 5/round · 0df72290"
contentUuid: "310176bb-b507-5dd1-9b1d-5af4fbe4b904"
diamondUuid: "527901e2-c7c4-8ad2-8bd1-a86bea5dfad3"
uuid: "0df72290-c923-8e22-b3d8-00d188f2dc3b"
horo: 5
typography:
  partition: memory
  bondDegree: 139
standards:
  - "RFC 9562 §5.8 — uuidv8 content-uuid"
bindings: []
signatures:
  computationUuid: "c3f44b8d-3c20-8171-b3d9-c29ecdb5c29c"
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
      stageUuid: "2f5bc35a-408a-80e1-a4de-a2d261491512"
    - stage: seal
      stageUuid: "28f4173d-50f5-8ce8-9df2-934c623de954"
    - stage: uuid
      stageUuid: "10bf4ca6-e731-8fff-800e-511311bcf75d"
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
