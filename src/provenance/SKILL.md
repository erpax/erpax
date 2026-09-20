---
name: provenance
description: "Use when reasoning about provenance — Measured 2026-09-20, in the literature a bank would price remediation from:"
atomPath: provenance
coordinate: "provenance · 5/round · 6e2fd4e2"
contentUuid: "d7e144fa-e924-5a0b-b43d-9b235d762475"
diamondUuid: "218aa274-9cf5-8232-b564-84e38fee389a"
uuid: "6e2fd4e2-17a2-85eb-a91c-a29e15768e75"
horo: 5
typography:
  partition: provenance
  bondDegree: 11
standards:
  - "ISO 19011:2018 §6.4 — audit evidence: the citation must lead to the evidence"
  - "W3C PROV-DM — provenance as a graph of entities and derivations"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "a9847b2a-dacb-8df9-9a3a-3307d4ce195d"
  stages:
    - stage: path
      stageUuid: "4109fefd-11ff-82bd-8061-8a4383a229a4"
    - stage: trinity
      stageUuid: "b6b4e4f2-ef65-8847-8b33-a56a760ffd1b"
    - stage: boundary
      stageUuid: "4a3a3f6f-fddb-8b65-a411-be7d86db3bb3"
    - stage: links
      stageUuid: "245aa63c-c141-8352-a574-f969bee2671a"
    - stage: horo
      stageUuid: "ed6638f0-d333-8e7e-85d0-950b174dc83d"
    - stage: seal
      stageUuid: "ea2d4bd8-1a66-8e29-983d-1ba477901fb6"
    - stage: uuid
      stageUuid: "eb60348c-88eb-8ab1-b462-0e4e395cb9d9"
version: 2
---
# provenance — PROVE·nance: a chain that must be walked, because restatement is not corroboration

Measured 2026-09-20, in the literature a bank would price remediation from:

> The per-unit cost advantage of phytoremediation over excavation appears in dozens of papers,
> several published in **2024**. Every one traces to the **same 1997 report**. That report's own
> cost tables cite **a vendor's technical summary** and **a personal communication**.

Read as a field, it looks corroborated. Walked as a graph, it is **one source, thirty years old,
unwalkable at its root.**

**No link in that chain lied.** Each paper cited honestly. The failure is *emergent*: N citations of
one root read as N sources unless somebody dedupes by **root**, and nobody does that by hand.
[[rules]]/copy names the same shape in code — one truth at many addresses, where the count of
addresses is mistaken for evidence.

## The two questions a citation count cannot answer

| question | function |
| --- | --- |
| What is at the **end** of the chain? | `unwalkableRoots` |
| How many **distinct** ends are there? | `independentRoots` |

A diamond — two papers, one root — counts as **one**. A ring counts as **zero**, and terminates the
walker rather than taking it round forever, because a literature that cites itself is a real thing.

## What may end a chain

`primary` and `peer-reviewed` may terminate. **`vendor`, `personal-communication` and
`market-projection` may never** — a supplier is not disinterested, an unpublished conversation
cannot be checked by a reader, and a proprietary projection has no disclosed method. `TERMINAL` is
**declared**, because what counts as a primary source is a judgement about the world and no theorem
derives it.

## Age is measured at the oldest root

A 2024 paper resting on a 1997 table is a **1997 claim wearing a 2024 date** — and the newest
citation is exactly the number a reader takes for freshness. `ageAt` reads the root year, which
returned **29 years** for the remediation case and **0** for a Congressional appropriation.

## Why a bank should care

An asset class becomes bankable when its unit economics are auditable. Nature-based remediation is
roughly 75% grant-funded and still seeking finance — and its central cost claim bottoms out in a
1997 vendor summary. **The finance gap is a measurement gap**, and this is the instrument that says
so about a specific number rather than as an opinion.

**Honest boundary.** `grounded` is deliberately weak: it proves the claim reaches at least one root
a reader **can check**, never that the root is **correct**. A primary source can be wrong and a
peer-reviewed measurement can fail to replicate — this closes the case where there is nothing to
check at all. The chain itself is **supplied**, not discovered: this walks what someone recorded, and
a citation nobody wrote down is invisible to it. And `LinkKind` is assigned by a human, so a vendor
report filed as `primary` passes — the instrument cannot see a mislabelled link, only a missing one.

**Law — [[law]]: count roots, never citations. A field can restate one source until it looks like
consensus, and the arithmetic that distinguishes them is a graph walk nobody performs by hand —
so perform it, and date the claim at its oldest root rather than its newest reader.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **W3C PROV-DM** — provenance as a graph of entities and derivations.

Composes: [[rules]]/reference · [[rules]]/forge · [[rules]]/copy · [[rules]]/refutable · [[law]].
