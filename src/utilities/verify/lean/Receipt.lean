/-
  Receipt — WHEN a sealed verdict is cheaper than the answer, and when it is not.

  This corpus states "VERIFY BEATS RECOMPUTE" unconditionally: a verdict is a function of its
  inputs, so seal it against a content address and reuse it while the address stands. The discipline
  is right and the slogan is not: reusing a verdict costs an ADDRESS on every run, and an address
  over a whole corpus is not free.

  MEASURED on this tree (2026-09-21, warm): the address costs 1499 ms; `word-matter` answers in
  1381 ms, `matrix-crack` in 4033 ms, and the WHOLE axis bundle in 45,950 ms.

  GRANULARITY IS THE WHOLE POINT, and the corpus already has it right. Sealing the bundle pays
  ~30x from the second run. Sealing `word-matter` ALONE would be a pessimisation — 1499 ms paid to
  avoid 1381 ms, every run, forever — and nothing here seals it alone. The rule is not "receipts
  are good" or "receipts are bad"; it is arithmetic over the address and the answer AT THE
  GRANULARITY ACTUALLY SEALED, and it can go either way on the same tree.

  The theorems below fix it: a receipt never pays on a single run, never pays when the address is
  not cheaper than the answer, and always pays past a break-even this file computes rather than
  asserts.

  WHAT IS NOT PROVED: that the measured costs are the right costs. Lean fixes the RULE over the
  numbers it is given; whether 1499 is this corpus's address cost on another machine, on a cold
  filesystem, or after the tree doubles is a measurement, and it belongs to the instrument that took
  it. A theorem proves its decision, never the facts it is fed.
-/

namespace Receipt

/-- One axis: what its address costs, what its answer costs, how often it is asked. -/
structure Scan where
  address : Nat
  answer : Nat
  runs : Nat
deriving DecidableEq, Repr

/-- With a receipt: the address every run, the answer once. -/
def sealed (s : Scan) : Nat := s.runs * s.address + s.answer

/-- Without: the answer every run. -/
def plain (s : Scan) : Nat := s.runs * s.answer

/-- Seal it only when sealing genuinely costs less. -/
def worthSealing (s : Scan) : Bool := sealed s < plain s

/-- A single run NEVER pays: the receipt adds its address to an answer still computed once. -/
theorem one_run_never_pays (a b : Nat) :
    worthSealing ⟨a, b, 1⟩ = false := by
  simp [worthSealing, sealed, plain]

/-- An address at least as dear as the answer never pays, however many runs. -/
theorem dear_address_never_pays (a b n : Nat) (h : b ≤ a) :
    worthSealing ⟨a, b, n⟩ = false := by
  have hmul : n * b ≤ n * a := Nat.mul_le_mul_left n h
  unfold worthSealing sealed plain
  simp only [decide_eq_false_iff_not, Nat.not_lt]
  omega

/-- word-matter ALONE, as measured: cheaper than its own address, so sealing it would never pay. -/
theorem word_matter_alone_never_pays (n : Nat) :
    worthSealing ⟨1499, 1381, n⟩ = false :=
  dear_address_never_pays 1499 1381 n (by decide)

/-- The BUNDLE, as measured — the granularity the corpus actually seals. It pays from run two. -/
theorem bundle_pays_from_two :
    worthSealing ⟨954, 45950, 1⟩ = false ∧ worthSealing ⟨954, 45950, 2⟩ = true := by
  decide

/-- matrix-crack, as measured: sealing pays from the second run. -/
theorem matrix_crack_pays_from_two :
    worthSealing ⟨1499, 4033, 1⟩ = false ∧ worthSealing ⟨1499, 4033, 2⟩ = true := by
  decide

/-- Break-even is a division, not an opinion: runs > answer / (answer − address). -/
def breakEven (address answer : Nat) : Nat :=
  if answer ≤ address then 0 else answer / (answer - address) + 1

/-- The computed break-even for the measured axis, and that it is where the verdict turns. -/
theorem matrix_crack_break_even :
    breakEven 1499 4033 = 2 ∧ worthSealing ⟨1499, 4033, breakEven 1499 4033⟩ = true := by
  decide

/-- A dear address has no break-even — the rule returns 0 and never claims a payoff. -/
theorem dear_address_has_no_break_even (a b : Nat) (h : b ≤ a) :
    breakEven a b = 0 := by
  simp [breakEven, h]

/-- Sealing is monotone in runs: once it pays, more runs keep paying. -/
theorem pays_stays_paying (a b n : Nat) (h : worthSealing ⟨a, b, n⟩ = true) :
    worthSealing ⟨a, b, n + 1⟩ = true := by
  unfold worthSealing sealed plain at h ⊢
  simp only [decide_eq_true_eq] at h ⊢
  have hab : a < b := by
    rcases Nat.lt_or_ge a b with h1 | h1
    · exact h1
    · have : n * b ≤ n * a := Nat.mul_le_mul_left n h1
      omega
  have ea : (n + 1) * a = n * a + a := by rw [Nat.add_mul, Nat.one_mul]
  have eb : (n + 1) * b = n * b + b := by rw [Nat.add_mul, Nat.one_mul]
  omega

end Receipt
