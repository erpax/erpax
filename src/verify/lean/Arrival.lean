/-
  Arrival — a push has landed exactly when something judged it, nothing failed, and nothing of
  this push is still running.

  The twin is pushVerdict in src/arrival, the verdict the landing lane asks the forge for. It is
  not a judgement typed into code: it is this conjunction, and every refusal it makes is a
  theorem below.

    judged   at least one check on the sha reached a verdict FOR THIS PUSH
    failed   at least one of those judged checks failed
    pending  at least one push check has not finished

  UNMEASURED is the case this atom exists for: `judged = false` is not a pass. A forge that has
  not indexed the commit, a run that was cancelled, a sha whose every check belongs to another
  event — each reports nothing, and nothing is not agreement. Release.lean consumes this
  landing as its `agreed` fact, so an over-generous verdict here would carry a DOI with it.

  Stated over Bool and proved by case analysis with `decide` over the eight cases: no axiom,
  nothing trusted but the kernel. What is proved is the DECISION, not the facts — whether a
  check really failed is measured by src/arrival, and no theorem here can make a red build green.
-/

namespace Arrival

def landed (judged failed pending : Bool) : Bool :=
  judged && !failed && !pending

/-- The decision is exactly the conjunction: nothing else lands, and nothing else refuses. -/
theorem landed_iff (judged failed pending : Bool) :
    landed judged failed pending = true ↔
      (judged = true ∧ failed = false ∧ pending = false) := by
  cases judged <;> cases failed <;> cases pending <;> decide

/-- UNMEASURED is never a pass: nothing judged the push, so nothing agreed to it. -/
theorem unmeasured_never_lands (failed pending : Bool) :
    landed false failed pending = false := by
  cases failed <;> cases pending <;> decide

/-- A failing check refuses the landing, however many others passed. -/
theorem no_landing_with_a_failure (judged pending : Bool) :
    landed judged true pending = false := by
  cases judged <;> cases pending <;> decide

/-- A push still running has not landed — an unfinished check has produced no evidence. -/
theorem no_landing_while_pending (judged failed : Bool) :
    landed judged failed true = false := by
  cases judged <;> cases failed <;> decide

/-- The control: the green path does land, so the refusals above are not vacuous. -/
theorem the_green_path_lands : landed true false false = true := by decide

end Arrival
