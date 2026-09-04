# duality/mirror — the two-sided coin, and why nothing can resist it

> *"all not harmonic is pulled by the black hole as one coin side and reflected from the other white
> hole coin side"*

That statement has an exact formal core, and it is a small theorem rather than a metaphor.

Let `σ : S → S` on a finite `S` satisfy **σ∘σ = id** — the coin: pass through twice and you are
back. Then every element is exactly one of two things:

| | | |
| --- | --- | --- |
| **fixed** | `σ x = x` | **harmonic** — its own reflection, it survives the pass unchanged |
| **paired** | `σ x ≠ x` | drawn in on one side, returned on the other, as `{x, σx}` |

**There is no third case, and that is the whole content of "every bit of resistance drains."** It is
not an assumption — it follows from σ∘σ = id alone, because `σ(σx) = x` leaves an element nowhere
else to be. A parity law falls out for free: `|S| ≡ |Fix σ| (mod 2)`.

## Computed on something this corpus already has

The anchor's divisor lattice ([[harmony]]/divisor): `S = D(432)`, `σ(d) = 432/d`.

```
carrier 20 · involution true · closed true
fixed (harmonic, survive)  0  []
transpositions             10
parity |S| ≡ |Fix| (mod 2) true · exhaustive true

  1 ↔ 432    2 ↔ 216    3 ↔ 144    4 ↔ 108    6 ↔ 72
  8 ↔ 54     9 ↔ 48    12 ↔ 36    16 ↔ 27    18 ↔ 24
```

**Nothing is harmonic here.** 432 is not a perfect square, so no divisor is its own reflection —
all twenty are drawn in and returned, in ten pairs. The picture is exact for this carrier: every
element resists and none succeeds.

## Two instruments, one answer

[`verify/lean/Mirror.lean`](../../verify/lean/Mirror.lean) states the same theorems and the Lean kernel closes each by `decide` over the stated
domain. `#print axioms` reports **does not depend on any axioms** for every one; there is no
`sorry`, no `native_decide`, no Mathlib. `index.ts` computes it independently by enumeration, and
the atom's proof runs the kernel as an assertion — skipped, never faked, where no toolchain exists.

**Both directions are controlled.** Changing `Fix(σ) = []` to `= [6]` makes Lean answer *"decide
proved that the proposition is false"* — the theorem is refutable, and the kernel really evaluates
it rather than accepting a shape. And a carrier that *does* have a fixed point must report one:
`D(36)` under `d ↦ 36/d` fixes exactly `6`, with parity holding at 9 ≡ 1. Without that control,
`fixed = []` would prove nothing about 432 and everything about a filter that always returns empty.

## Two traps the LaTeX renderer walked into

- LaTeX's ``` `` ``` open-quotes **end a JavaScript template literal**. The remainder became a
  tagged-template call, throwing `"…" is not a function` at the template's first line — pointing
  nowhere near the cause.
- The first draft emitted `consists of 10$ transpositions`: one unbalanced `$` opens math mode over
  the rest of the document. The proof now counts delimiters and requires an even number.

## Does an involution ALWAYS leave a harmonic element? No — and here is exactly when it does

The universal claim is **false**, and the kernel says so: asserting it makes Lean answer *"decide
proved that the proposition is false"*. Over the divisor mirrors of n = 1..60, **53 of 60 carriers
fix nothing at all**.

What is true is sharper, and it has a hypothesis:

> **An involution on a carrier of ODD size always leaves a harmonic element.**

The reason is parity and nothing else: the non-fixed elements pair off, so they are even in number,
and an odd total cannot be made of pairs alone — one element is left holding itself.

For the divisor mirror `d ↦ n/d`, three conditions turn out to be **one** condition:

| | |
| --- | --- |
| τ(n) is odd | the carrier has odd size |
| a harmonic element exists | something is its own reflection |
| n is a perfect square | the root is that something |

All three coincide across the family, and when the harmonic element exists it is **unique** — the
square root, nothing else: `1→1 · 4→2 · 9→3 · 16→4 · 25→5 · 36→6 · 49→7`. Everything else, 432
included, is drawn in and returned with no survivor.

Both directions are controlled: a square fixes its root (`36 → [6]`), a non-square fixes nothing
(`12 → []`), and τ is 9 and 6 respectively. Without those, "fixed = []" would prove nothing about
432 and everything about a filter that always returns empty.

**Honest boundary.** These are theorems **for this carrier**, closed by exhaustion — not a claim
about infinite `S`, where the same statement is true but needs a different proof. The reading of σ
as a black-hole/white-hole pair is an **interpretation laid over the mathematics**, not a
consequence of it: the mathematics says *involution partitions into fixed points and
transpositions*, and everything else is a name for that. `harmony/divisor` already refuses the
mysticism around 432 and this atom keeps that line.

**Law — [[law]]: an involution admits no resistance. σ∘σ = id forces every element to be its own
reflection or half of a pair, with no third option — so "harmonic survives, the rest is drawn in and
returned" is not a metaphor about the world but a partition, and the partition is checkable.**

## Standards

- **RFC 9562 §5.8** — content-address, for the divisor carrier's identity.
- **ISO/IEC 25010:2023 §5.5** — testability: a case closed by exhaustion is decidable.

Composes: [[duality]] · [[harmony]]/divisor · [[law]].
