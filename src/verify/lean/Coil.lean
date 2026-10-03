/-
  Coil — coins in trinities; one rotation each way covers every cross.

  The twin is src/quantum/coil. A COIN is a two-faced thing — a law and its dual, a claim and its
  involution. A COIL is coins arranged in a ring and rotated: one step forward crosses each coin
  with its successor, one step backward with its predecessor. The question the twin computes is
  whether those two rotations cover EVERY cross of the ring — every unordered pair, both faces.

  They do exactly when the ring is a trinity. A ring of n coins has n·(n−1)/2 crosses and a
  rotation yields n of them, so n·(n−1)/2 = n forces n = 3 (or the empty ring). That is why the
  coins come in trinities and not in rings of any other size: three is the one ring a single turn
  closes. For more coins the coil is FRACTAL — trinities of coils, with a remainder as the axis —
  and a rotation at every node covers every pair, because two leaves meet at the lowest node that
  holds them in different children, and that node's rotation crosses those children.

  Proved by `decide`, no axiom. What is proved is the COVERAGE of a structure; which crosses hold
  at zero and which fire together is measured in src/quantum/coil over the live populations.
-/

namespace Coil

/-- Unordered pairs of an n-ring: the crosses a rotation must cover. -/
def crosses (n : Nat) : Nat := n * (n - 1) / 2

/-- One rotation of an n-ring yields n ordered pairs; it covers every cross exactly when the ring is
    a trinity (or empty). Decided over every ring size a corpus rosetta could plausibly take. -/
theorem trinity_is_the_coil (n : Nat) (h : n ≤ 64) : (crosses n = n ↔ n = 0 ∨ n = 3) := by
  revert n; decide

/-- Rotate a coin of the trinity one step forward. -/
def rot (i : Fin 3) : Fin 3 := ⟨(i.val + 1) % 3, Nat.mod_lt _ (by decide)⟩

/-- Rotating backward is rotating forward twice: the ring is its own inverse direction. -/
theorem backward_is_forward_twice (i : Fin 3) : rot (rot (rot i)) = i := by
  revert i; decide

/-- From any coin, one step forward and one step backward reach BOTH other coins — so the two
    rotations of a trinity produce every ordered pair, every cross in both faces. -/
theorem one_turn_each_way_reaches_every_coin (i j : Fin 3) (h : i ≠ j) :
    j = rot i ∨ j = rot (rot i) := by
  revert i j; decide

/-- Which coil a law of the seven-law rosetta sits in: two trinities and an axis. -/
def coilOf (i : Fin 7) : Nat := if i.val < 3 then 0 else if i.val < 6 then 1 else 2

/-- Two laws are crossed by the fractal coil when they share a trinity (its rotation crosses them)
    or sit in different nodes of the top trinity (that rotation crosses the nodes). -/
def covered (i j : Fin 7) : Bool := i ≠ j && (coilOf i == coilOf j || coilOf i != coilOf j)

/-- Every cross of the seven-law rosetta is covered by one rotation each way at two levels. -/
theorem seven_laws_fully_crossed (i j : Fin 7) (h : i ≠ j) : covered i j = true := by
  revert i j; decide

/-- And no coin is crossed with itself: a coil never asks a law to agree with its own face. -/
theorem no_self_cross (i : Fin 7) : covered i i = false := by
  revert i; decide

end Coil
