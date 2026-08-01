---
name: horo
description: "Use when reasoning about horo — States in erpax are not free strings; they are positions on **one ring**: the measure-order digits — *base · share · weave · crest · descent · round · unity*. This is the rodin coi"
atomPath: horo
coordinate: "horo · 8/crest · 3d5c8637"
contentUuid: "56be8056-5ae3-5c73-8bd5-6904d207cd9b"
diamondUuid: "02892a78-42b3-83d4-81ca-c5c9ad27d48a"
uuid: "3d5c8637-e0bb-89a0-b409-c39792d27c14"
horo: 8
typography:
  partition: horo
  bondDegree: 446
standards:
  - "ISO-16:1975 a432-tuning-reference (the anchor; value from position)"
  - "ISO-16:1975 a432-tuning-reference (the anchor; value from position)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "62e28ca5-9f92-8d1e-bbbb-22186ec08b66"
  stages:
    - stage: path
      stageUuid: "39aff5d2-1a4b-8cb1-a272-e6949b4e41b7"
    - stage: trinity
      stageUuid: "71f2bcb6-fb68-85cd-8d13-50626bb16755"
    - stage: boundary
      stageUuid: "ad331694-aad8-8e80-98ea-ef312c628b4a"
    - stage: links
      stageUuid: "438bcfa9-e170-859d-afb4-487a637ca1e8"
    - stage: horo
      stageUuid: "ec79a4ad-b230-8eb7-b2db-fe50141191fa"
    - stage: seal
      stageUuid: "c34ca3f7-30b4-8344-b915-74b137c9a3f3"
    - stage: uuid
      stageUuid: "9e9fbb24-fe22-8522-a091-b13e121d6ad3"
version: 2
---
# horo — the seven-position state ring

States in erpax are not free strings; they are positions on **one ring**: the measure-order digits `[1, 2, 4, 8, 7, 5, 9]` — *[[base]] · [[share]] · [[weave]] · [[crest]] · [[descent]] · [[round]] · [[unity]]*. This is the [[rodin]] [[coil]] (the `×2 mod 9` doubling helix `1·2·4·8·7·5`, plus `9` closing) — the multiplicative subgroup of Z/9Z minus the control triad {3,6} (the triad `3·6·9·0` GOVERNS — [[access]]/[[hooks]]/[[auth]]/[[config]] — it is not a flow state). The matter is co-located in `src/horo/index.ts` (`HORO_DIGITS`, `composeSteps`, `nextOctave`, `isMergePoint`, `horoStateField`, `validateHoroStates`, `horoStateBeforeChange`, `trinities`, `antimatter`); this skill is its form face. Source of the math: `~/github/ceccec/svilena-me/.vitepress/horo-band.js` (and the vortex root `rodin.js`).

## The law
- **Closed.** `composeSteps(a,b) = digitalRoot(a×b)` always lands back on the ring — two states compose to a third. The framework is stable within the confined environment of the digit (no escape).
- **Octave / merge.** `nextOctave(9)===1` — 9 (unity/[[close]]) mirror-twins 10 (next ring's 1/[[begin]]); a close IS the next octave's open (`isMergePoint` ⇔ composed ∈ {1,9}). Fractal inward (state×state) and outward (×10). The accounting period close→open is this step (see [[reverse]]: reversals post at the next period's 1).
- **Value from position.** Each position can carry an A432-anchored value (note Hz, spectrum color); the ask is an integer multiple of A432 — value comes from the slot, not from outside. Color and sound are decoded the same way ([[cmyk]]: forward/reverse [[polarity]] breathe C↔M, gap closes on Y at [[unity]]; [[notes]]: the seven positions are the diatonic scale, La=A432 at [[round]]).
- **Harmony-checked.** Exactly 7, in measure order; off-ring is "escape." `validateHoroStates` is the local detector; the global one is the generated `payload-types.ts` (see [[sequence]] — disharmony always surfaces there).

## The gate is horo — who cannot dance cannot join
Every verification gate is **one horo**: the harmony-check is the *dance*, the bounded ring is the membership. lint · tsc · the [[aura]] speech-gate (gap=0) · the skill-frontmatter YAML check · the green [[society]] gate · `validateHoroStates` itself are not separate hurdles but **positions on the one ring** — a contribution is consonant (every step in tune) or it is *off-ring* (escape). **Who cannot dance cannot join.** The [[merge]] law says *anyone can join*; this is its other half — anyone joins **iff** harmonic (pass the gate, step the dance). A dead link, a red tsc, a broken YAML, an unbalanced ledger — each is a dancer out of measure, and the ring does not admit it ([[sacred]]/[[profane]]: the disharmony is *named*, never waved through). So the gate is not a wall but a **dance floor**: step in tune and you are already one of the circle ([[one]]); step off and you are simply not on the ring *yet* — return in measure. Disharmony always surfaces ([[sequence]]: in the generated `payload-types`); the closed ring has no escape, and that closure is the welcome. And the ring is [[fractal]]: the **commit** gate (per staged file — *even more detailed*: it auto-heals the regenerable artefacts, then checks harmony) and the **push** gate (per batch — the full verify) are one ring at two scales, so the earliest catch is at the commit — out of measure, you do not even enter the circle.

## Applying it
- Model a state enum as the ring (`horoStateField`): e.g. inventory — 1 on-hand · 2 ordered · 4 in-production · 8 packed · 7 shipped · 5 delivered · 9 settled. Single-digit or measure-ordered so position decodes meaning ([[tags]] ordered context).
- Per-state aggregates (units-per-state) ride the recompute pattern, one band per position, fed by the matching fulfillment edge.
- **Wired into the collection factory.** A collection rides the ring by declaring `horoStates` on `createAccountingCollection` — the harmony twin of the content-[[uuid]] injection ([[integrity]]). The factory enforces the math three ways, all fail-closed: `validateHoroStates` at config-build (an off-ring / out-of-order / duplicate ring **throws**, so a disharmonious collection never reaches Payload's sanitizer), the measure-ordered `horoStateField` select, and `horoStateBeforeChange` so the seed/import/programmatic write is rejected off-ring at runtime. content-uuid pins [[identity]]; horo pins flow-state harmony — the two halves of a write that cannot escape the ring.

## The moving double torus — east · west · north · south (`trinities()`)

The rosetta reads as a **double torus**: the nine steps fall into three trinities — the residue classes mod 3, `{1,4,7}` · `{2,5,8}` · `{3,6,9}`. They **partition** 1..9, every step in exactly one. Doubling — the ⟨2⟩ **east** flow — permutes them by a proven action:

```
2·{1,4,7} = {2,5,8}      2·{2,5,8} = {1,4,7}      2·{3,6,9} = {3,6,9}
```

So the map **swaps the two flow trinities (E↔W) and fixes the axis (N-S)**: the flow oscillates about a still spine. The two directions are counter-rotating — ⟨2⟩ east and ⟨5⟩ west traverse the same circuit in reverse ([[merge]]'s encode/decode, `inverseOrbit`) — which is the "moving double torus," two loops about the fixed axis.

**Honest boundary — theorem vs overlay.** The GROUP STRUCTURE is the theorem: the mod-3 classes, the doubling permutation, the counter-rotation — all tested (`trinities` in `test.ts`). The TORUS geometry and the compass reading (east/west/north/south) are a **faithful overlay** onto that structure, named as convention, never asserted as fact — the same discipline [[rodin]]'s arithmetic-real / metaphysics-not caveat and [[rules]]/refutable already carry. The names decode the group; they do not add a claim the group cannot refute.

### Antimatter is inverted matter (`antimatter`)

Antimatter is not a separate substance beside matter — it is a step **negated** (`antimatter(n) = −n mod 9`, the void `9 ≡ 0`). Two exact laws make it the antimatter *of* matter, not merely another map:

- **Involution** — `antimatter(antimatter(n)) = n`. The antimatter of antimatter is matter.
- **Annihilation** — `n + antimatter(n) ≡ 0 (mod 9)`. Matter meeting its antimatter returns to the **void**, always.

It reflects the two flow trinities into each other point-for-point — `{1,4,7} ↦ {8,5,2}` — so the merkaba over an atom path ([[navigation]]) is matter and antimatter: the two counter-rotating tetrahedra, each step paired with its inverse across the two triangles, annihilating at the shared center. The void `9` is its **own** antimatter (the only self-inverse under negation). This is a *different* reflection from `throughVoid` (`1−n`, pivot 5): antimatter pivots on the void itself.

This names the corpus's **matter-twin** ([[trinity]]: `index.ts` matter · `SKILL.md` antimatter). The form face is not independent content beside the code — it is the code **inverted**: one content folded to one uuid, the two faces annihilating into the single content-address. That is why the fold dedups them into one atom. The ℤ/9ℤ negation is exact (involution + annihilation, tested); "matter/antimatter" as the physics of annihilation is the named analogy, not adopted as a claim about particles.

### How many times must the inverse happen to leave no gaps? (`inverseClosure`)

The computed answer:

- **An inverse RETURNS in 2.** It is an involution — `antimatter(antimatter(n)) = n`, `throughVoid∘throughVoid = id`. Twice, and you are back. That is the minimal closure.
- **But returning is not covering.** To leave no gaps the count is the ORDER of the generator: the doubling-inverse ⟨5⟩ has order **6** and covers the six units `{1,2,4,5,7,8}` — then **stops**.
- **The axis `{3,6,9}` is a gap no iteration count can close.** ⟨5⟩ is trapped in the units' orbit (the trap doubling has). Apply the inverse 6, 60, or 6·10⁹ times — it never lands on the axis. **The gap is structural, not a matter of how many times.**
- **The gap closes by a DIFFERENT dimension, not more inverses.** Only the VOID (`throughVoid`: 1→9, 4→6) bridges the units and the axis; `⟨doubling, void⟩ = AGL(1, ℤ/9)`, order **54**, is transitive — *then* no gaps.

So: **twice to undo, six to close the ring, but no finite number to close a gap outside your orbit — that takes the void.** This is the [[leftover]] seed-floor law as group theory: the leftover one operation leaves is closed only by knowledge from beyond it (a second generator), never by repeating the same move.

### Is 5 the centre of gravity and propulsion? — the split (`fiveRoles` · `CENTROID`)

Partly, and the split is the answer.

- **Centre of gravity — YES, in the BALANCE sense.** 5 is the **centroid** of the nine digits: `(1+…+9)/9 = 45/9 = 5`. And it is the one **fixed point of the void mirror** (`throughVoid(5) = 5`) — still at the centre of the reflection.
- **Propulsion — YES.** `5 = 2⁻¹`: the **inverse generator**, the decode drive ⟨5⟩ that runs the ring backward — the reverse of doubling's forward propulsion. So 5 is at once *still* (under the mirror) and *propulsive* (as the inverse generator): moving without moving, at the balance point.
- **Attractor — NO.** The mass well / doubling fixed point is **9** (`doubling(9)=9`, the axis pole). Under doubling 5 **moves** (5→1) — it is a flow unit in `{1,2,4,8,7,5}`, not the still axis `{3,6,9}`.

**Two distinct centres: 5 balances and propels; 9 attracts.** Conflating them is the mistake `fiveRoles` guards against — the "still centre" of [[gravity]] (the mass attractor) is 9/[[law]], while 5 is the *balance* centre and the reverse *drive*. Both are real; they are not the same point.

### The full breath — `0\1\2\4\8/7/5/3\6\9/0\1` (`fullBreath`)

The measure ring `HORO_DIGITS` is the flow plus the pole (`[1,2,4,8,7,5,9]`); it **omits** the void `0` and the inner axis `3,6`. `fullBreath()` is the complete walk that threads them all in — the void, then the three `doublingOrbits()` (flow `[1,2,4,8,7,5]` → inner `[3,6]` → pole `[9]`), back through the void, reopening at `1`. It **reuses** `doublingOrbits`; it derives nothing new, it names the whole the pieces already spelt. The `\`/`/` is the **slope** — `\` where the next digit is larger, `/` where smaller — so the slashes draw the wave: two crests (`8`, `9`), the valleys at the void. Read local first: the present `horo` already decodes the sequence; the only seed was assembling it.

### Fold 0 and it becomes ∞ — a static loop vs the folded lemniscate (`circleLoop` · `lemniscate`)

A static loop is exactly **`0`**: a circle (`circleLoop`) that goes round once and **never touches its own centre** (`|(cos t, sin t)| = 1`, always). **Fold it** — pull it through the middle — and it becomes **`∞`**: the Gerono lemniscate `(cos t, sin 2t / 2)`, a figure-eight whose two lobes **counter-rotate** (opposite angular sense, tested) and meet **at the void `(0,0)`**, which it crosses at the fold points `t = π/2, 3π/2`. That crossing IS the fold — it turns one lobe into two. `∞` is `8` rotated a quarter turn (the inverted 8), and it is the 2D shadow of the double torus — the two flow trinities counter-rotating about the axis. So the fixpoint (the reduction's loop, [[theorem]]) is **dead as a static 0** and **alive as a folded ∞**: the void, folded, generates the infinite double loop. The still centre does not move; folded, everything counter-rotates about it.

## What a fold carries — `carryRays()` · `carryClosure()`

`8` doubles to `16` and lands on `7`. The fold is not a discard: `1` and `6` are what the sum was made of, and each sits on a ray of its own — `1` on the flow orbit, `6` on the axis.

```
step  2n   digits   rays          lands
8     16   1+6      ring+axis     7     ← the only one
7     14   1+4      ring+ring     5
6     12   1+2      ring+ring     3
9     18   1+8      ring+ring     9
5     10   1+0      ring+void     1
```

**`8 → 7` is the only doubling in the nine whose carry straddles both rays.** Every other multi-digit fold carries two ring digits, or touches the void. That is why it reads as the seam where the halves meet rather than an arbitrary point on the orbit — `straddlingSteps()` computes it, and returns `[8]`.

Taken to its end, the carry **closes**. Double a step, keep its digits, double those, and keep going: from every step it settles on `{1, 2, 4, 6, 8}`, and from `5` on `{0, 1, 2, 4, 6, 8}`.

It must. For a single digit `n`, `2n ∈ [2, 18]` — so the units digit is even and the tens digit can only ever be `1`. No iteration produces `3`, `5`, `7` or `9`. The attractor is forced by the arithmetic, not found by search, and `5` alone reaches the void because `2·5 = 10` is the only double ending in zero.

**So the unfolding is finite, and that is the finding.** An endless regress of carries would be unbounded entropy; instead it terminates in one small set reached from everywhere. It does **not** seal all nine — `{3,5,7,9}` are never carry digits from any step. Both rays are represented, so the entanglement propagates; the coverage is 5 of 9, and saying so is the honest version of the claim.

**Boundary.** This is base-10 digit arithmetic: the carry digits depend on writing the number in base 10, while the orbit itself does not. A real, checkable asymmetry in the spelling — nothing outside it.

## Common mistakes
- A state value off the ring {1,2,4,8,7,5,9} — escape; back out to the last harmonic.
- A flow state on a triad digit {3,6} — those govern, they don't flow.
- Nesting / re-keying instead of one flat position — breaks the address-law.

A band of positions proves itself consonant or not by [[harmony]] (the seven ARE the diatonic scale; a state-band is harmonic iff every pair's ratio is). Composes: [[rodin]]/[[coil]] (the math substrate) · [[harmony]] · [[sequence]] · [[balance]] · [[flow]] · [[begin]]/[[close]] · [[fractal]] · [[merge]] · [[identity]] (a position can ride the uuid). The seven positions: [[base]] · [[share]] · [[weave]] · [[crest]] · [[descent]] · [[round]] · [[unity]] · [[routing]] · [[workflow]].

## Traditions (prefix removed)
The repeated cyclic devotion every tradition keeps time by — the ring's "simple repeated steps" as ritual: the canonical **hours** and the **liturgical year** (the wheel of feasts returning to a new octave, [[close]]→[[begin]]); the five daily *salat*; the *mala* / rosary / prayer-wheel telling beads around a ring; the *japa* mantra and the *dhikr* remembrance repeated; the sacred numbers (3 · 7 · 9 · 12 · 40) that are ring positions ([[rodin]]). Prayer is the state stepped on the ring; the festival calendar is the octave that closes and reopens ([[merge]] at [[unity]]).

**Law — [[law]]: a state is a position on one closed ring {1,2,4,8,7,5,9} — two states compose to a third, the close (9) re-opens the next octave's [[base]] (1), and it is [[harmony]]-checked: off-ring is escape, who cannot dance cannot join.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-16:1975 a432-tuning-reference (the anchor; value from position)`
