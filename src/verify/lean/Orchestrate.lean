/-
  Orchestrate — decomposition and convergence, stated about the functions that produce them.

  What stood here was four `sorry`s over arbitrary data, and the danger was not that they were
  unproved. Two of them were provable by FABRICATION: `decomposition_complete` asks only that SOME
  list of tasks be long enough, and `convergence_requires_all_convergent` asks only that SOME list
  of convergent results exist — both are discharged by inventing the list. A theorem satisfied by
  manufacturing its own evidence certifies nothing, which is precisely the failure [[rules]]/forge
  catches in code and [[rules]]/mirror catches in tests.

  So the claims are restated about the OPERATIONS. `decompose` builds the tasks, `converged` is
  COMPUTED from the results rather than stored as a flag someone sets, and the theorems say what
  those functions guarantee — which is the only thing a caller can rely on.
-/

namespace Orchestrate

inductive Outcome where
  | convergent
  | divergent
  | inconclusive
  deriving DecidableEq, Repr

structure Task where
  problem : Nat
  index : Nat
  deriving DecidableEq, Repr

structure Result where
  problem : Nat
  outcome : Outcome
  confidence : Nat
  deriving DecidableEq, Repr

/-- The bar, DECLARED once and shared with Wave: convergent and at least 95% confident. -/
def strong (r : Result) : Bool := (r.outcome = Outcome.convergent) && 95 ≤ r.confidence

/-- Every problem decomposes into at least one task, and each task CARRIES the problem it came
    from — so the mapping is a fact about the construction, never an assumption about the data. -/
def decompose (problems : List Nat) : List Task :=
  problems.map (fun p => { problem := p, index := 0 })

/-- A problem is settled when the results contain a strong result FOR THAT PROBLEM. -/
def settled (results : List Result) (p : Nat) : Bool :=
  results.any (fun r => r.problem = p && strong r)

/-- The wave converged when every problem is settled — COMPUTED from the results, never a flag. -/
def converged (problems : List Nat) (results : List Result) : Bool :=
  problems.all (settled results)

/-- Decomposition loses no problem: one task each, so the count cannot fall. -/
theorem decomposition_is_complete (problems : List Nat) :
    problems.length ≤ (decompose problems).length := by
  simp [decompose]

/-- Every task names a problem that was actually given — the bijection claim, made true by
    construction instead of assumed of an arbitrary list. -/
theorem every_task_names_a_given_problem (problems : List Nat) :
    ∀ t ∈ decompose problems, t.problem ∈ problems := by
  intro t ht
  simp only [decompose, List.mem_map] at ht
  obtain ⟨p, hp, ht⟩ := ht
  subst ht
  exact hp

/-- Convergence REQUIRES a strong result for every problem. The old statement asked for the mere
    existence of a convergent list, which fabrication satisfies; this one reaches into the results
    the wave actually holds. -/
theorem convergence_requires_every_problem_settled (problems : List Nat) (results : List Result) :
    converged problems results = true → ∀ p ∈ problems, settled results p = true := by
  intro h p hp
  simpa using (List.all_eq_true.mp h) p hp

/-- One unsettled problem refuses the whole wave — the contrapositive, and the half that bites. -/
theorem an_unsettled_problem_refuses_convergence (problems : List Nat) (results : List Result)
    (p : Nat) (hp : p ∈ problems) (hn : settled results p = false) :
    converged problems results = false := by
  cases hc : converged problems results with
  | false => rfl
  | true =>
    have hs := convergence_requires_every_problem_settled problems results hc p hp
    rw [hn] at hs
    exact Bool.noConfusion hs

/-- A weak result does not settle a problem: neither a divergent one nor a convergent one below
    the bar. Without this the threshold would be decoration. -/
theorem weak_results_do_not_settle :
    settled [{ problem := 1, outcome := Outcome.convergent, confidence := 94 },
             { problem := 1, outcome := Outcome.divergent, confidence := 99 }] 1 = false := by
  decide

/-- The control: a strong result does settle it, so the refusals above are not vacuous. -/
theorem a_strong_result_settles :
    converged [1] [{ problem := 1, outcome := Outcome.convergent, confidence := 96 }] = true := by
  decide

end Orchestrate
