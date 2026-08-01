---
name: constitution
description: "Use when reasoning about the entrenched foundation, or when judging whether a proposed change may ship — two rules at the root (no expectation: claim no result you have not computed; no judgment: reject nothing you have not measured, discernment by test kept), the nine laws that are their lemmas (duality · legality · honest boundaries · balance · service · conservation · reciprocity · reproducibility · regeneration), and the seven supreme articles saying what a majority may amend versus what is perpetual; every predicate computed, fails closed, and heads every agent prompt."
atomPath: constitution
coordinate: "constitution · 4/weave · c67b69e0"
contentUuid: "90ef653c-34a1-5a7e-8e3a-5d63f7db67e7"
diamondUuid: "a6d19c97-ebf6-8c66-a7f4-951d3ad2cfd1"
uuid: "c67b69e0-27e5-8581-9f2a-756cc11adbe2"
horo: 4
bonds:
  in:
    - legislation
    - plugin
    - separation
    - surface
    - trello
  out:
    - legislation
    - plugin
    - separation
    - surface
    - trello
typography:
  partition: constitution
  bondDegree: 32
  neighbors: []
standards:
  - "ISO 37000:2021 governance-of-organizations principle-of-purpose"
  - "ISO 37000:2021 governance-of-organizations principle-of-purpose`"
  - "ISO-37000"
  - "US-CTA-2021"
  - Venice Commission Rule of Law (entrenched fundamental guarantees)
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - balance
    - civilization
    - corruption
    - governance
    - identity
    - legislation
    - merge
    - row
    - rules
    - separation
    - sequence
    - society
    - surface
    - trello
    - zeropoint
  matrix:
    - legislation
    - plugin
    - separation
    - surface
    - trello
  backlinks:
    - legislation
    - plugin
    - separation
    - surface
    - trello
signatures:
  computationUuid: "e6ff7f49-9c89-8fe5-a956-c96a3f980e63"
  stages:
    - stage: path
      stageUuid: "210a2855-2ef2-8f53-8a65-93ebae61b5f1"
    - stage: trinity
      stageUuid: "ac1e1ca0-eb52-8c87-ae84-421d296ba945"
    - stage: boundary
      stageUuid: "9815a851-a4c3-86d1-877f-6d59b6ec14e3"
    - stage: links
      stageUuid: "f884e2b1-1a03-8756-95d8-fa23f5d26198"
    - stage: horo
      stageUuid: "1878b6f3-49dd-86b5-ac3d-bcf64152e70b"
    - stage: seal
      stageUuid: "79d6cdcb-5abc-8ea1-af80-6c8ad39015bf"
    - stage: uuid
      stageUuid: "f4da62f3-580a-81b0-b15e-cb786de5e9bc"
version: 2
---
# constitution — the 0 of the sequence, the supreme law erpax derives from

FORM: **a sovereign polity, and a foundation that sovereign cannot touch.** [[society]] is sovereign over erpax — [[governance]] ratifies the rules. But a majority that could vote away the integrity laws could legalise corruption. So the constitution ENTRENCHES the foundation: some articles are perpetual, amendable by no vote however large; the rest are amendable by a supermajority. The whole arc resolved — society holds the judgment, the constitution bounds the judgment so the foundation cannot be judged away. Pure → testable (`index.test.ts`).

The seven articles (`CONSTITUTION`):

0. **Identity** *(entrenched)* — every actor is one typeless person, addressed by content-uuid ([[identity]]); no actor has a type, only relations.
1. **Integrity & Anti-corruption** *(entrenched)* — the four invariants are perpetual; corruption cannot be made lawful ([[anti/corruption]]).
2. **Conservation** *(entrenched)* — value is conserved; every flow has two sides that net to zero ([[balance]]).
3. **Sovereignty & Federation** — each community governs itself and federates by content ([[merge]]); no central authority owns the whole.
4. **Governance** *(entrenched)* — society governs erpax by ratification; one person, one vote, perpetual ([[governance]]).
5. **Rights** — privacy by crypto-shred, due process by adjudicated claims, participation by the vote.
6. **Amendment** *(entrenched)* — amend by supermajority, save the entrenched articles, which are perpetual.

`amend(articleId, ballots, electorate)` is the only door: an entrenched article can NEVER pass it (the perpetual limit on the majority); a non-entrenched article is amended iff the polity ratifies at the supermajority bar (`AMENDMENT_RULE` — quorum ½, threshold ⅔, a higher bar than ordinary [[legislation]]). The gap between the two bars is the rule of law.

This is the foundation [[separation]] applies at the scale of the branches and [[legislation]] builds ordinary statute upon — the law organ of the [[civilization]], the lowest-entropy form everything else derives from ([[zeropoint]]). It is the 0 of the [[sequence]]: the source the whole ring radiates from and returns to.

## The two rules at the root

    No expectation.
    No judgment.

The second follows from the first: **judgment is the gap between what was expected and what arrived**, so removing the expectation leaves nothing to condemn. Applied to code: *claim no result you have not computed; reject nothing you have not measured.*

What is **kept** is **discernment** — this test passes, this one does not. That is the service, and it is not judgment, because it is measured. A gate that refuses on a hunch is exactly what these two sentences forbid; a gate that refuses on a red test is exactly what they are for.

`noExpectation(change)` and `noJudgment(change)` are the axis. Rule 2 carries the one term no lemma covers: a `Rejection` with no executable basis is judgment — `unmeasuredRejections(change)` is its fix list. A change that rejects **nothing** satisfies Rule 2 outright: there is nothing to condemn.

## The nine laws — lemmas of the two rules

The articles bound what the **polity** may vote away. The laws bound what a **change** may be: nine predicates over a proposed `Change`, one per erpax defining property, **each reducing to one of the two rules** (`rule` on every law), each carrying the invariant that enforces it in `test.ts` — so a violation fails `pnpm check` rather than being noticed later. Breaking a lemma implicates its rule and no other, which is what makes the reduction load-bearing rather than decorative.

| # | law | the invariant that enforces it |
| --- | --- | --- |
| 1 | **Duality** (build ⊕ break) | a build with no adversarial counterpart is unsealed; coverage cannot reach 1 on a build-only axis |
| 2 | **Legality** (change through the system) | a flow with no valid normative anchor fails closed |
| 3 | **Honest boundaries** | an unconditional guarantee with no stated boundary blocks the build |
| 4 | **Balance** (no single ring) | balance is a computed fraction across dual axes; expansion is gated on it |
| 5 | **Service** | every served result ships a recompute path |
| 6 | **Conservation** (double-entry, moral) | Σdebit = Σcredit; an unmatched extraction is caught |
| 7 | **Reciprocity** (both rings or neither) | reciprocity = 1 across bound edges; a one-way edge marks the pair unsealed |
| 8 | **Reproducibility** (proven, not quoted) | a quantity with no executable derivation is rejected as hand-asserted |
| 9 | **Regeneration** (heal from seed) | reconstructs from seed and re-verifies in O(N); single-keeper deps are flagged |

`judge(change)` runs all nine in one pass and returns a **computed** fraction per law — never a hand-set flag. A change is `sealed` only when every law holds at fraction 1; `violatedLaws(change)` is the fix list. **Every law fails closed on the empty case**: a change that declares no duality, no anchor, no posting, no edge, no quantity and no seed does not pass nine vacuous checks — it fails nine. Default-ALLOW by omission is the defect that makes a gate report green over the exact case it exists for ([[rules]]/unraised), and the constitution may not be built on it.

**Law 2 governs the constitution itself.** `amendmentIsLegal(articleId, change, ballots, electorate)` is the only door to reform: the amendment must first be constitutional under all nine laws, and only then meets `amend()`'s supermajority bar — where the entrenched articles remain perpetual. Reform the rules by the rules, or not at all. Anchors are the published norms (ISO · IEC · RFC · NIST · W3C · EN · SOX · statute) **and** the Bitcoin genesis block hash — the one timestamp no party here controls.

`constitutionDocument()` is **computed** from the two rules, the articles and the laws, so there is no second copy to drift; `constitutionDigest()` content-addresses it (amend it and the address moves); `prependToAgentPrompt(prompt)` loads it as the **head** of any erpax-driven agent's system prompt, **the two sentences first** — an anchor read after the act is a post-mortem.

Law 9's O(N) is proven **structurally**, not by a stopwatch: `verificationCost(changes)` is exactly nine evaluations per change with no cross-change term, and the test asserts that doubling the corpus doubles the work and that `judgeAll` emits precisely that many verdicts. A timing assertion measures the machine; this measures the algorithm.

The first atoms built under it are [[trello]] (an external system entered as an entangled atom) and [[anchor/surface]] (Rule 1 applied to attention: a surface you did not declare is a surface you dismissed). Its own agnostic matter seeds through [[seed/row]], so the entanglement continues one scale down.

**Honest boundary.** The laws are predicates over a **declared** `Change` — they prove that a change *states* its dualities, anchors, postings and derivations, never that the statements are **true**. A change can declare a break-test that does not attack, or an anchor to a clause that says something else, and pass. This closes the space where an obligation is simply **absent** — which is where every failure in this corpus has lived — not the space where it is present and wrong. The role→norm judgement in Law 2 is likewise DECLARED (`NORMATIVE_FAMILIES`), written in the open so it can be argued with, never inferred.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 37000:2021 governance-of-organizations principle-of-purpose`


- **ISO 37000:2021** — governance-of-organizations, principle-of-purpose.
- **Venice Commission Rule of Law** — entrenched fundamental guarantees beyond the reach of a transient majority.
