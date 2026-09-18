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


/-
  THE COLLISION — two instruments, one commit, opposite answers.

  `Workers Builds: erpax` reported FAILED on nine of twelve pushes (2026-09-13 … 09-18) while every
  other check was green, twice going red AFTER it had already deployed, and the live Worker serves
  the very commit it condemns. Two honest measurements contradict each other.

  Exempting the check would be the cheap way out, and it is default-ALLOW by omission: a check that
  cannot fire reports green forever, over exactly the case it exists for. So the contradiction is
  given a NAME of its own instead of a verdict it has not earned.

    checkFailed  a judged push check failed
    liveIsThis   an independent instrument — the deployed Worker carries THIS commit's tag

  Three states, and `contradicted` is neither of the other two: it does not land, and it is not the
  same thing as a plain refusal, because a plain refusal has no evidence standing against it.
-/

/-- The push landed and nothing contradicts it. -/
def agreed (checkFailed liveIsThis : Bool) : Bool := !checkFailed && liveIsThis

/-- The forge refused and nothing contradicts the refusal. -/
def refused (checkFailed liveIsThis : Bool) : Bool := checkFailed && !liveIsThis

/-- The instruments disagree: the check failed, yet this exact commit is live. -/
def contradicted (checkFailed liveIsThis : Bool) : Bool := checkFailed && liveIsThis

/-- A contradiction is NOT a landing. Colliding the two never manufactures agreement. -/
theorem a_contradiction_never_lands (checkFailed liveIsThis : Bool) :
    contradicted checkFailed liveIsThis = true → agreed checkFailed liveIsThis = false := by
  cases checkFailed <;> cases liveIsThis <;> decide

/-- Nor is it a plain refusal — it is its own state, and it must be reported as one. -/
theorem a_contradiction_is_not_a_refusal (checkFailed liveIsThis : Bool) :
    contradicted checkFailed liveIsThis = true → refused checkFailed liveIsThis = false := by
  cases checkFailed <;> cases liveIsThis <;> decide

/-- Exactly one of the three holds for any pair of readings: the collision partitions the space. -/
theorem exactly_one_state (checkFailed liveIsThis : Bool) :
    (if agreed checkFailed liveIsThis then 1 else 0)
      + (if refused checkFailed liveIsThis then 1 else 0)
      + (if contradicted checkFailed liveIsThis then 1 else 0)
      + (if !checkFailed && !liveIsThis then 1 else 0) = 1 := by
  cases checkFailed <;> cases liveIsThis <;> decide

/-- Live evidence alone is not agreement: a green check is still required, so the collision can
    never be used to promote a red build by pointing at a Worker someone deployed by hand. -/
theorem live_alone_is_not_agreement : agreed true true = false := by decide

end Arrival
