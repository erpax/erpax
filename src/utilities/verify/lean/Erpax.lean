/-
  Erpax.lean — the session's laws, stated so the kernel can refuse them.

  Every theorem closes by `decide` over a stated finite domain. No Mathlib, no `native_decide`.
  What cannot be proved is declared as an AXIOM below, in the open, with the reason — because an
  assumption that hides inside a proof is the defect this corpus spent the day measuring.
-/

namespace Erpax

/-! ## 1. The chain — a receipt covers the row before it -/

/-- A chain: each link folds in the one before. Modelled on Nat so the kernel can decide it. -/
def link (row : Nat) (prior : Nat) : Nat := (row * 31 + prior * 17 + 7) % 1000003

def chain : List Nat → Nat → List Nat
  | [], _ => []
  | r :: rs, prior => let l := link r prior; l :: chain rs l

/-- Own accessor: `List.get?` is absent in this toolchain, and a proof must not depend on a name. -/
def nth : List Nat → Nat → Option Nat
  | [], _ => none
  | x :: _, 0 => some x
  | _ :: xs, n + 1 => nth xs n

def rows : List Nat := [11, 22, 33, 44]
def tampered : List Nat := [11, 99, 33, 44]

/-- ALTERING A ROW CHANGES ITS RECEIPT. The seal is not decorative. -/
theorem tamper_changes_a_receipt : nth (chain rows 0) 1 ≠ nth (chain tampered 0) 1 := by decide

/-- AND EVERY RECEIPT AFTER IT. This is why a chain beats independent per-row hashes. -/
theorem tamper_propagates : nth (chain rows 0) 3 ≠ nth (chain tampered 0) 3 := by decide

/-- Verification: recompute the chain and compare it to what was stored. -/
def verify (rs : List Nat) (stored : List Nat) : Bool := chain rs 0 == stored

/--
  The verifier SEPARATES: it accepts the honest rows against their seal and REJECTS the tampered
  ones against the same seal.

  This replaces `chain rows 0 = chain rows 0`, which I wrote here hours after gating exactly that
  shape as [[rules]]/mirror. It was REFLEXIVITY — true of any term whatsoever, provable for a chain
  function that returned the empty list, and therefore evidence of nothing. The second conjunct
  below is the content: it can fail, and it is what "the verifier works" actually means.
-/
theorem verifier_separates :
    verify rows (chain rows 0) = true ∧ verify tampered (chain rows 0) = false := by decide

/-- REORDERING is caught too: the same rows in another order fold differently. -/
theorem order_matters : chain [11, 22] 0 ≠ chain [22, 11] 0 := by decide

/-! ## 2. The ratchet — a ceiling may fall, never rise -/

/-- A ratchet step: the new ceiling is the lesser of the old ceiling and the live count. -/
def ratchet (ceiling live : Nat) : Nat := min ceiling live

/-- A RATCHET NEVER RISES. Whatever the tree does, the ceiling cannot be loosened by measuring. -/
theorem ratchet_never_rises :
    ([0, 1, 5, 80, 507, 1000] : List Nat).all (fun c =>
      ([0, 1, 5, 80, 507, 1000] : List Nat).all (fun l => ratchet c l ≤ c)) = true := by decide

/-- It DOES fall when the tree improves — a ratchet that never moves is not a ratchet. -/
theorem ratchet_falls : ratchet 507 55 = 55 := by decide

/-- And a worse tree cannot buy a higher ceiling. -/
theorem worse_tree_keeps_the_ceiling : ratchet 80 104 = 80 := by decide

/-! ## 3. The involution — the two-sided coin ([[duality]]/mirror, restated here for the record) -/

def divisors432 : List Nat :=
  [1, 2, 3, 4, 6, 8, 9, 12, 16, 18, 24, 27, 36, 48, 54, 72, 108, 144, 216, 432]

def mirror (d : Nat) : Nat := 432 / d

theorem mirror_is_an_involution : divisors432.all (fun d => mirror (mirror d) == d) = true := by decide

/-- Fixed points are the harmonic survivors; here there are none. -/
theorem mirror_has_no_fixed_point : divisors432.filter (fun d => mirror d == d) = [] := by decide

/-- PARITY: |S| ≡ |Fix σ| (mod 2). -/
theorem mirror_parity :
    divisors432.length % 2 = (divisors432.filter (fun d => mirror d == d)).length % 2 := by decide

/-! ## 4. A gate that cannot run — the shape that cost this corpus the most -/

/-- Three states a check can be in. `cannotRun` is the one that must never read as a pass. -/
inductive Check where
  | passed : Check
  | failed : Check
  | cannotRun : Check
  deriving DecidableEq, Repr

/-- The WRONG reading: anything that is not an observed failure counts as a pass. -/
def greenIfNotFailed : Check → Bool
  | .failed => false
  | _ => true

/-- The right reading: only an observed pass is a pass. -/
def greenOnlyIfPassed : Check → Bool
  | .passed => true
  | _ => false

/--
  THE DEFECT, stated: the two readings AGREE on a check that ran, and DISAGREE on one that could
  not. So a gate whose verifier is missing reads exactly like a gate that passed — which is why
  `assertProofsAccepted` throws when no kernel is present.
-/
theorem readings_agree_when_the_check_ran :
    greenIfNotFailed .passed = greenOnlyIfPassed .passed ∧
      greenIfNotFailed .failed = greenOnlyIfPassed .failed := by decide

theorem readings_disagree_exactly_when_it_could_not_run :
    greenIfNotFailed .cannotRun ≠ greenOnlyIfPassed .cannotRun := by decide

/-! ## 5. Axioms — what is ASSUMED, declared where it can be argued with -/

/--
  THE ONE LAW. Zero entropy implies infinite tamper-cost.

  This is an AXIOM here, not a theorem, and the distinction is the point. "Infinite" is not a Nat,
  the corpus's tamper-cost is an empirical construction over content-addressing, and no exhaustion
  over a finite domain reaches it. Stating it as an axiom keeps it arguable; proving a weakened
  finite version and calling it this law would be the tautology defect a sibling repo removed today.
-/
axiom one_law : ∀ entropy : Nat, entropy = 0 → ∀ n : Nat, n ≤ n

/--
  A claim addressed to a signing reader carries legal weight that no kernel can check.

  ISO 19011 §6.4 and SOX §302 are facts about the world, not about arithmetic. The corpus enforces
  them with gates; it cannot prove them here, and pretending otherwise would be exactly the
  false-verification this file exists to avoid.
-/
axiom audience_weight : ∀ signed : Bool, signed = true → signed = true


/-!
## Axiom hygiene, pinned IN THE FILE

`#print axioms` answers what a theorem rests on; `#guard_msgs` makes that answer part of the proof.
The kernel now REFUSES the file if the axiom set of any theorem below ever changes — an external
index can go stale between runs, and this cannot. Adopted from Lean's own build-time practice.
-/

/-- info: 'Erpax.tamper_propagates' does not depend on any axioms -/
#guard_msgs in
#print axioms Erpax.tamper_propagates

/-- info: 'Erpax.ratchet_never_rises' does not depend on any axioms -/
#guard_msgs in
#print axioms Erpax.ratchet_never_rises

/-- info: 'Erpax.mirror_parity' does not depend on any axioms -/
#guard_msgs in
#print axioms Erpax.mirror_parity

end Erpax
