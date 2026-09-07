---
name: refutable
description: "Use when checking that the corpus's claims can be contradicted — an @invariant is a proposition asserted in prose, and one with no test beside it is unfalsifiable: it reads as true forever and nothing will ever say no. A lie is not found by checking truth (fiction and truth read identically); it is found by demanding refutability, because an unrefutable claim is the only place a lie is safe. Run: tsx src/rules/refutable/index.ts"
atomPath: "rules/refutable"
coordinate: "rules/refutable · 7/descent · e745f8a8"
contentUuid: "a9e3ff36-c942-5dad-b5c0-e68803c8cfea"
diamondUuid: "ed19380c-6f64-83b5-9c91-9016cdc778f4"
uuid: "e745f8a8-401a-8e46-bf3d-de726b59c06e"
horo: 7
typography:
  partition: rules
  bondDegree: 9
standards:
  - "ISO/IEC 25010:2023 §5.5 testability"
  - Popper — a proposition that forbids nothing explains nothing
bindings: []
signatures:
  computationUuid: "5786b9de-df54-86a9-850d-c3a77bd9d120"
  stages:
    - stage: path
      stageUuid: "be9d294a-90c2-8a1c-a7ec-b66ad746b98f"
    - stage: trinity
      stageUuid: "f5f8a15a-76ba-813b-bfd9-0b8b81f0f229"
    - stage: boundary
      stageUuid: "dc1d2586-e74f-86ee-be54-66f55e39145a"
    - stage: links
      stageUuid: "40fecfaa-a150-8d79-b048-42fc0a34e9d8"
    - stage: horo
      stageUuid: "c207abd4-5fc8-89a5-87b7-a0fda01d2b1a"
    - stage: seal
      stageUuid: "7db266a0-dc44-88d4-a7bc-60dd9e59f99e"
    - stage: uuid
      stageUuid: "2368611a-022c-8134-9624-23687c1d44aa"
version: 2
---
# refutable — a claim nothing can refute is where a lie lives

**A lie is computationally findable — but not by checking truth.** [[rules]]/prose catches **fiction**: prose citing code that does not exist. A lie is worse — it says something **false about something real**, and it reads exactly like the truth. No scan tells them apart by looking.

What *is* decidable is whether a claim can be **refuted at all**. An `@invariant` is a proposition the corpus asserts about its own matter. With a proof beside it, reality can say no. Without one it is unfalsifiable — it will read as true forever, and nothing will ever contradict it. **That is not a law; it is a decoration — and it is exactly the space a lie occupies.**

| | count (2026-07-16) |
| --- | ---: |
| `@invariant` claims | **151** |
| refutable (a proof leg beside them) | 87 |
| **that nothing can contradict** | **64** |

### This is not theory — a claim was false and read as law

[[work]]/shifts asserted its efficiency identity as a hard implication. Against **344,516 real rows it holds 99.463% — 1,849 rows violate it.** The claim had read as law for as long as it existed; seeing it took querying the source database. The same atom's prose said efficiency *"falls back to 100"* while the Rails source says `||=` **preserves** — a straight contradiction between a sentence and the code it described. Both were lies in the precise sense: false statements about real things.

### The most consequential one

`double/entry/validator` contains **only** an `index.ts` — no proof — and asserts `debits.sum() === credits.sum()`, plus that account-type matches debit/credit polarity. **The fundamental law of accounting, the thing an ERP exists to guarantee, with nothing that can contradict it.** That is the finding this gate exists for.

**Honest boundary.** A test *beside* an invariant does not prove that invariant is tested — this finds the **definitely-unrefutable**, never the merely-unchecked. And refutability is **not truth**: a claim can be falsifiable and false — that is precisely what makes it worth testing. This closes the space where a lie is *safe*, not the lie itself.

**Law — [[law]]: a claim must be refutable. An `@invariant` with no proof beside it forbids nothing, so it asserts nothing — give it a test, or stop asserting it.**

## Standards

- **Popper** — a proposition that forbids nothing explains nothing.
- **ISO/IEC 25010:2023 §5.5** — testability.

Composes: [[rules]] · [[law]].
