/-
  Correct — error correction as syndrome arithmetic: each single error names itself.

  Ported from qpu.uuidna.com (Qpu.Processing.QuantumErrorCorrection, same author). A code corrects
  an error when the checks it trips identify it. That is a statement about which checks read which
  positions — finite, classical arithmetic — and it is the part of quantum error correction a
  kernel can decide without amplitudes.

  Three codes, smallest first. The three-bit repetition code decodes by majority. Steane's
  seven-qubit code uses the Hamming checks: check `j` reads the positions whose number has bit `j`
  set, so the syndrome of an error at position `i` is `i` itself. It is CSS because every pair of
  checks overlaps on an even number of positions, which is what lets the same checks be used for
  bit flips and phase flips. Shor's nine-qubit code gives every bit flip its own syndrome and
  locates every phase flip to its block of three — and no finer, which is correct: a phase flip on
  any qubit of a block acts the same on the code.

  WHAT THIS PROVES: the repetition code corrects every single bit flip; each single error in the
  Steane code trips the nonzero syndrome naming its position; the Steane checks overlap evenly;
  Shor's bit-flip syndromes are distinct and nonzero and its phase-flip syndromes agree exactly
  within a block; and at distance d ≥ 2t + 1 two error patterns of weight ≤ t never span d. By
  `decide` and `omega`. The Steane and Shor theorems use no axiom; the two repetition theorems use
  `propext`, and the distance bound `propext` and `Quot.sound` — Lean's standard axioms, nothing
  declared here.

  WHAT THIS DOES NOT PROVE: that the codes protect a quantum state. That needs the stabilizer
  formalism over amplitudes — that the checks commute as operators and that the code space is
  preserved — and this file has neither. It is the classical skeleton: the syndrome tables are
  right. Nothing here models noise, a threshold, or a device.
-/

namespace Correct

/-! ## 1. Three-bit repetition -/

/-- The three-bit repetition code word of `b`. -/
def encode (b : Bool) : Nat := if b then 7 else 0
/-- Flip bit `e` of the word (no flip when `e = 3`). -/
def flip (e w : Nat) : Nat := if e < 3 then w ^^^ 2 ^ e else w
/-- Majority decoding. -/
def decode (w : Nat) : Bool := ((List.range 3).filter fun k => (w / 2 ^ k) % 2 == 1).length ≥ 2

/-- THE REPETITION CODE CORRECTS EVERY SINGLE BIT FLIP, and no flip at all. -/
theorem repetition_corrects : ∀ b : Bool, ∀ e, e < 4 → decode (flip e (encode b)) = b := by decide

/-- AND IT DOES NOT CORRECT TWO: the claim above is sharp, not vacuous. -/
theorem repetition_fails_on_two : decode (flip 1 (flip 0 (encode false))) ≠ false := by decide

/-! ## 2. Steane's seven-qubit code — the Hamming checks -/

/-- Hamming check `j` reads the qubits whose position (1 to 7) has bit `j` set. -/
def hamming (j i : Nat) : Bool := (i + 1) / 2 ^ j % 2 == 1
/-- The syndrome of one error on qubit `i` (0 to 6): the checks it trips, read as a number. -/
def syndrome (i : Nat) : Nat := (List.range 3).foldl (fun s j => s + if hamming j i then 2 ^ j else 0) 0

/-- EACH SINGLE-QUBIT ERROR TRIPS ITS OWN NONZERO SYNDROME — the position it names. -/
theorem steane_corrects : ∀ i, i < 7 → syndrome i = i + 1 := by decide

/-- Steane is CSS: every pair of checks overlaps on an even number of qubits. -/
theorem steane_css :
    ∀ a, a < 3 → ∀ b, b < 3 → ((List.range 7).filter fun i => hamming a i && hamming b i).length % 2 = 0 := by
  decide

/-! ## 3. Shor's nine-qubit code -/

/-- The two Z checks inside each block of three, and the two X checks between blocks. -/
def bitChecks : List (List Nat) := [[0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8]]
def phaseChecks : List (List Nat) := [[0, 1, 2, 3, 4, 5], [3, 4, 5, 6, 7, 8]]
/-- The checks an error on qubit `q` trips (qubit 9 is none). -/
def flags (checks : List (List Nat)) (q : Nat) : List Bool := checks.map (·.contains q)

/-- EVERY SINGLE BIT FLIP TRIPS ITS OWN SYNDROME, AND EVERY SINGLE PHASE FLIP NAMES ITS BLOCK. -/
theorem shor_nine :
    (∀ a, a < 9 → flags bitChecks a ≠ flags bitChecks 9
        ∧ ∀ b, b < 9 → flags bitChecks a = flags bitChecks b → a = b) ∧
    ∀ a, a < 9 → flags phaseChecks a ≠ flags phaseChecks 9
        ∧ ∀ b, b < 9 → (flags phaseChecks a = flags phaseChecks b ↔ a / 3 = b / 3) := by
  decide

/-! ## 4. Distance -/

/-- At distance d ≥ 2t + 1, two error patterns of weight at most t never span d. -/
theorem distance_corrects (d t e₁ e₂ : Nat) (h : 2 * t + 1 ≤ d) (h₁ : e₁ ≤ t) (h₂ : e₂ ≤ t) :
    e₁ + e₂ < d := by omega

end Correct
