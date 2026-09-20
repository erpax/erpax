/-
  Direction — the six ways to move inside an address, and the one constraint that governs all of them.

  The corpus moves through its addresses in pairs: forward/reverse, left/right, up/down, and the two
  reflections — inverse (beyond) and the hexbit flip (within). Each pair must undo itself, or a
  "round trip" silently lands somewhere else.

  THE CONSTRAINT, and it is the whole content of this file: a uuid is not 128 free bits. Uuid.lean
  proves bits 48..51 are the VERSION and 64..65 the VARIANT, fixed by RFC 9562 and RFC 4122. A
  direction that moves a message bit onto a version bit does not encrypt anything — it produces a
  string that is no longer a uuid, and every decoder downstream is entitled to reject it.

  So each direction is proved twice: that its pair undoes it (an involution, or a genuine inverse),
  and whether it is CLOSED on the message band. The two that are not closed are named as not closed.
  That refusal is the useful half — it says where the direction may be applied at all.

  WHAT THIS IS NOT. A permutation of bit positions is not encryption: it moves known bits to known
  places and is undone by anyone who reads this file. Confidentiality comes from an AEAD
  (@/beyond/pqc), never from an address algebra. Nothing here is a cipher, and calling it one would
  be a claim no theorem below supports.
-/

namespace Direction

/-- The message band, as Uuid.lean partitions it: everything the RFC does not own. -/
def isMessage (i : Nat) : Bool := (i ≤ 47) || (52 ≤ i && i ≤ 63) || (82 ≤ i && i ≤ 127)

/-- The RFC's own bits — version 48..51, variant 64..65. -/
def isFixed (i : Nat) : Bool := (48 ≤ i && i ≤ 51) || (64 ≤ i && i ≤ 65)

/-- FORWARD and REVERSE — rotation of the whole 128-bit ring by one step. -/
def forward (i : Nat) : Nat := (i + 1) % 128
def reverse (i : Nat) : Nat := (i + 127) % 128

/-- UP and DOWN — a whole byte, the unit a decoder actually reads. -/
def up (i : Nat) : Nat := (i + 8) % 128
def down (i : Nat) : Nat := (i + 120) % 128

/-- LEFT and RIGHT — inside one byte, so the byte a bit belongs to never changes. -/
def left (i : Nat) : Nat := i - i % 8 + (i % 8 + 1) % 8
def right (i : Nat) : Nat := i - i % 8 + (i % 8 + 7) % 8

/-- INVERSE (beyond) — the reflection through the whole address. -/
def inverse (i : Nat) : Nat := 127 - i

/-- WITHIN — the hexbit flip the sibling lattice uses: (i ⊕ 4) ⊕ 4 = i. -/
def within (i : Nat) : Nat := i ^^^ 4

/-- Every position of the address, once. -/
def positions : List Nat := (List.range 128)

/-- forward and reverse undo each other, everywhere. -/
theorem forward_reverse (_ : Unit) : positions.all (fun i => reverse (forward i) == i) = true := by decide

/-- and in the other order, so neither is merely a left inverse. -/
theorem reverse_forward (_ : Unit) : positions.all (fun i => forward (reverse i) == i) = true := by decide

/-- up and down undo each other. -/
theorem up_down (_ : Unit) : positions.all (fun i => down (up i) == i) = true := by decide

/-- and in the other order. Proving one order proves one order: `right ∘ left = id` says left is a
    RIGHT inverse of right, and a function can have one without the other. The pairs here happen to
    be bijections, but that is a fact to state, not one to assume from the sibling theorem. -/
theorem down_up (_ : Unit) : positions.all (fun i => up (down i) == i) = true := by decide

/-- left and right undo each other, and stay inside their byte. -/
theorem left_right (_ : Unit) : positions.all (fun i => right (left i) == i) = true := by decide

/-- and in the other order. -/
theorem right_left (_ : Unit) : positions.all (fun i => left (right i) == i) = true := by decide

theorem left_stays_in_its_byte (_ : Unit) : positions.all (fun i => left i / 8 == i / 8) = true := by decide

/-- and so does right — the byte is a wall in both directions, not only the one that was checked. -/
theorem right_stays_in_its_byte (_ : Unit) : positions.all (fun i => right i / 8 == i / 8) = true := by decide

/-- inverse is an involution: beyond, and back. -/
theorem inverse_is_an_involution (_ : Unit) : positions.all (fun i => inverse (inverse i) == i) = true := by decide

/-- within is an involution too — the hexbit flip, twice, is the identity. -/
theorem within_is_an_involution (_ : Unit) : positions.all (fun i => within (within i) == i) = true := by decide

/-- THE CROSS CLOSES. Every direction applied with its opposite returns the address unchanged, so a
    round trip through all six is the identity — nothing is lost by travelling. -/
theorem the_cross_closes (_ : Unit) :
    positions.all (fun i =>
      within (inverse (right (left (down (up (reverse (forward i))))))) == within (inverse i)) = true := by
  decide

/-- No direction is the identity in disguise: each MOVES something, so the theorems above are not
    statements about doing nothing. -/
theorem every_direction_moves (_ : Unit) :
    (positions.any (fun i => forward i != i) && positions.any (fun i => up i != i)
      && positions.any (fun i => left i != i) && positions.any (fun i => inverse i != i)
      && positions.any (fun i => within i != i)) = true := by decide

/-
  CLOSURE — and the refusal the kernel forced.

  This file first claimed `within` and `left` were closed on the message band. `decide` proved both
  FALSE, and the reason generalises to every direction here: the RFC's fields sit INSIDE bytes —
  version is bits 48..51, the top half of byte 6 — so a within-byte rotation carries bit 55 onto bit
  48, and the hexbit flip carries 52 onto 48. There is no direction below that is closed.

  That is the useful result, not a setback: a direction may not be applied to raw uuid positions at
  all. The message bits must first be COMPACTED into their own index space (0..105), permuted there,
  and expanded back — which is closed by construction, because the fixed bits are never in the space.
-/

/-- Not one of the six is closed on the message band: each carries some message bit onto a bit the
    RFC owns. Proved for every direction, so no reader has to take it per-case. -/
theorem no_direction_is_closed_on_the_message (_ : Unit) :
    (positions.any (fun i => isMessage i && isFixed (forward i))
      && positions.any (fun i => isMessage i && isFixed (reverse i))
      && positions.any (fun i => isMessage i && isFixed (up i))
      && positions.any (fun i => isMessage i && isFixed (down i))
      && positions.any (fun i => isMessage i && isFixed (left i))
      && positions.any (fun i => isMessage i && isFixed (right i))
      && positions.any (fun i => isMessage i && isFixed (inverse i))
      && positions.any (fun i => isMessage i && isFixed (within i))) = true := by
  decide

/-- The message positions, in order — the space a direction may legally act on. -/
def messageIndex : List Nat := positions.filter isMessage

/-- It is the 106 bits Uuid.lean counts: the compaction loses nothing and invents nothing. -/
theorem the_message_space_is_one_hundred_six (_ : Unit) : messageIndex.length = 106 := by decide

/-- No fixed bit is inside it, so a permutation OF THIS SPACE cannot touch version or variant —
    closure by construction, which is what the raw directions could not give. -/
theorem the_message_space_holds_no_fixed_bit (_ : Unit) :
    messageIndex.all (fun i => !isFixed i) = true := by decide

/-- Rotation inside the compacted space, and its inverse. -/
def spin (n i : Nat) : Nat := (i + n) % 106
def unspin (n i : Nat) : Nat := (i + (106 - n % 106)) % 106

/-- It undoes itself for every step and every position — the round trip the raw directions promised
    and could not keep. -/
theorem spin_round_trips (_ : Unit) :
    (List.range 106).all (fun n => (List.range 106).all (fun i => unspin n (spin n i) == i)) = true := by
  decide

/-- and the other order, for the same reason the raw pairs each needed two theorems. -/
theorem unspin_round_trips (_ : Unit) :
    (List.range 106).all (fun n => (List.range 106).all (fun i => spin n (unspin n i) == i)) = true := by
  decide

/- Bijectivity needs no theorem of its own, and the reason is the whole point of the return legs
   above. A function with a two-sided inverse IS a bijection: `reverse ∘ forward = id` and
   `forward ∘ reverse = id` together give it for the forward/reverse pair, `up_down` with `down_up`
   for the vertical one, `left_right` with `right_left` for the horizontal, and an involution is
   its own two-sided inverse, which covers `inverse` and `within`.

   Before the return legs existed only ONE order was proved for up/down and left/right, and one
   order is a one-sided inverse — which a non-bijection can have. So the pairs were not known to be
   bijections until those two theorems were added, and now they are, without a further theorem.

   An explicit `eraseDups` census over 128 positions × 8 directions was written here first and the
   kernel REFUSED it — maximum recursion depth. That refusal was correct twice over: the check was
   expensive, and it was redundant. -/

end Direction

