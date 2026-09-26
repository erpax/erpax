# cost/bits/floors — four floors, one formula `d/k`, each proving the others

A digest of `d` bits has four security floors, and they are **one formula** over the first three
harmonics. What decides `k` is whether the target is free (**symmetric**) and whether the adversary
is quantum:

| floor | symmetry | adversary | `k` | exponent |
| --- | --- | --- | --: | --- |
| `secondPreimageLog2` | **asymmetric** — the target digest is FIXED | classical | 1 | `d` |
| `birthdayLog2` | **symmetric** — ANY two of the set collide | classical | 2 | `d/2` |
| `groverPreimageLog2` | **asymmetric** | quantum | 2 | `d/2` |
| `bhtCollisionLog2` | **symmetric** | quantum | 3 | `d/3` |

Four cells of a 2×2, and the harmonic indices are exactly `1, 2, 2, 3`.

## Symmetrising halves the exponent

Fix the target and only one side may vary. Free it and **both** sides vary, so the candidate pairs
square — and squaring the candidates square-roots the work:

```
secondPreimageLog2(d) = 2 · birthdayLog2(d)        2^(d/2) · 2^(d/2) = 2^d
```

## The two threats meet at the octave, by different arguments

`groverPreimageLog2(d) = birthdayLog2(d)`, and **neither derives the other**. Grover is a quadratic
speedup on the *asymmetric* problem; the birthday bound is combinatorics on the *symmetric* one. They
land on one exponent from opposite corners of the 2×2 — same `harmonic`, opposite `symmetry`,
opposite `quantum`. That is why both names survive rather than being folded: [[rules]]/copy declares
the pair a coincidence, and folding it would remove their ability to move independently.

## The quantum symmetric floor refutes the obvious guess

Applying Grover *inside* the birthday problem predicts `d/4`. It is **`d/3`** — BHT trades queries
against quantum **memory**, so the gain is smaller than a second quadratic speedup. The proof asserts
`bhtCollisionLog2(d) === (2/3)·birthdayLog2(d)` **and** asserts it is not `birthdayLog2(d)/2`.

## Proving each other

`d = k · floor`. Any one floor plus its harmonic index recovers `d`, and `d` gives every other floor
— `digestFromFloor` and `floorsFromOne` are that, and the proof runs the round trip from all four
starting points. The family is one formula and a classification, not four facts.

`FLOORS` is module-private behind `floorFamily()`: it is declared physics, not derivable from the
tree, and [[matrix]]/constants-audit counts an exported const as a static datum. The same convention
`EMPIRICAL` and `COINCIDENT_FORMULAS` follow.

**Honest boundary.** `d/3` is the conservative theoretical floor: BHT needs `2^(d/3)` quantum memory,
and a memory-bound quantum collision is nearer `d/2`. Which floor BINDS is a judgement about the
adversary, not arithmetic. And a quantum cross breaks an RSA/ECC anchor (Shor → ~0), so keeping even
the `d/2` floor needs a hash-based post-quantum anchor — which is [[law]]'s `anchorBits` ceiling, a
cap on the forge rather than a floor under it.

Composes: [[cost]]/bits · [[rules]]/copy · [[law]].
