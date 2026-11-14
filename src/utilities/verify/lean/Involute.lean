/-
  Involute — a lead is tagged by its involution, and the codomain is exactly three.

  The twin is `tagOf` in src/self/involute, the decision the frontier runs over every lead it
  generates. A lead is a claim one instrument makes about the corpus ("nothing reaches this atom",
  "this gate is red"). Its INVOLUTION is the same question asked from the other seat — who names
  the atom, which members the red count has — and the tag is decided by two facts:

    askable   a dual instrument exists for this kind of lead AND answered for this target
    refuted   the dual contradicts the claim

  A refuted claim is a LIE: it does not survive the flip. A claim no dual can answer is a
  MANIPULATION: one witness speaking for itself, which is the shape [[rules]]/mirror refuses when a
  test restates the constant it asserts. Everything else is a THEOREM — held from both seats.

  Proved over the four cases by `decide`, no axiom. What is proved is the DECISION: whether the
  dual really refutes is measured in src/rules/unreached (`referrersOf`) and the frontier's
  populations, and no theorem here can make a false lead true.
-/

namespace Involute

inductive Tag where
  | «theorem»
  | lie
  | manipulation
  deriving DecidableEq, Repr

/-- The decision: silence first, then the verdict. -/
def tag (askable refuted : Bool) : Tag :=
  if askable then (if refuted then Tag.lie else Tag.«theorem») else Tag.manipulation

/-- No lead remains untagged: the three tags exhaust the codomain for every pair of facts. -/
theorem every_lead_is_tagged (a r : Bool) :
    tag a r = Tag.«theorem» ∨ tag a r = Tag.lie ∨ tag a r = Tag.manipulation := by
  cases a <;> cases r <;> decide

/-- A claim nothing can ask from the other seat is a manipulation, whatever it says about itself. -/
theorem unaskable_is_manipulation (r : Bool) : tag false r = Tag.manipulation := by
  cases r <;> decide

/-- A refutation from an instrument that could not be asked is not a refutation: silence outranks
    the verdict it would have carried. -/
theorem silence_before_verdict : tag false true = Tag.manipulation := by decide

/-- The dual contradicts the claim: the lead is a lie. -/
theorem refuted_is_lie : tag true true = Tag.lie := by decide

/-- The dual agrees: the lead holds from both seats. -/
theorem agreed_is_theorem : tag true false = Tag.«theorem» := by decide

/-- A theorem needs a witness — nothing reads `theorem` without an askable dual. -/
theorem no_theorem_without_a_dual (a r : Bool) : tag a r = Tag.«theorem» → a = true := by
  cases a <;> cases r <;> decide

/-- The tag is a function of the two facts and nothing else: equal facts, equal tag. -/
theorem decided_by_the_facts (a r a' r' : Bool) (ha : a = a') (hr : r = r') : tag a r = tag a' r' := by
  subst ha; subst hr; rfl

end Involute
