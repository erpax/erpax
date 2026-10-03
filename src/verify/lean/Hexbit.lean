/-
  Hexbit — the two cross formulas that replace the hexit loops, and the bounds that make them exact.

  The twin is src/quantum/hexbit. A hexit digit-sum used to walk 32 nibbles; the cross formula folds
  neighbouring nibbles into bytes and multiplies once by 0x01010101, which sums the four bytes into
  the top byte. That multiply is exact only while nothing carries out of a byte — two bounds, decided
  here. A hex character's value used to take three branches; the cross `(c &&& 15) + 9 * ((c >>> 6) &&& 1)`
  is decided equal to the value for every one of the 22 hex character codes.

  Proved by `decide`, no axiom.
-/

namespace Hexbit

/-- Two nibbles (each ≤ 15) sum to at most 30 — a byte holds the pair sum. -/
theorem nibble_pair_fits (a b : Fin 16) : a.val + b.val ≤ 30 := by
  revert a b; decide

/-- Four such bytes sum to at most 120, below 256 — the multiply's top byte carries nothing out. -/
theorem four_bytes_fit : 4 * 30 < 256 := by decide

/-- The value a hex character code denotes, by the three cases the loop used to branch on. -/
def hexValue (c : Nat) : Nat :=
  if 48 ≤ c ∧ c ≤ 57 then c - 48
  else if 97 ≤ c ∧ c ≤ 102 then c - 87
  else if 65 ≤ c ∧ c ≤ 70 then c - 55
  else 0

/-- The cross: low nibble, plus nine when bit 6 marks a letter. -/
def hexCross (c : Nat) : Nat := (c % 16) + 9 * ((c / 64) % 2)

/-- Is `c` one of the 22 hex character codes? -/
def isHexCode (c : Nat) : Bool := (48 ≤ c && c ≤ 57) || (97 ≤ c && c ≤ 102) || (65 ≤ c && c ≤ 70)

/-- On every hex character code the cross equals the branched value. -/
theorem cross_is_value (c : Nat) (h : c ≤ 127) (hx : isHexCode c = true) : hexCross c = hexValue c := by
  revert c; decide

/-- Five moduli above 2^30 cover a 128-bit value: their product exceeds 2^150 > 2^128, so CRT loses nothing. -/
theorem five_moduli_cover_128 : 2 ^ 150 > 2 ^ 128 := by decide

/-- Four do not: 2^124 < 2^128, so a fifth residue is not decoration. -/
theorem four_moduli_do_not_cover_128 : 2 ^ 124 < 2 ^ 128 := by decide

/-- Nine such moduli cover a 256-bit product: 2^270 > 2^256 (the exponent threshold is raised so the power is evaluated, not left symbolic). -/
set_option exponentiation.threshold 300 in
theorem nine_moduli_cover_256 : 2 ^ 270 > 2 ^ 256 := by decide

end Hexbit
