/-
  Automate — a refinement loop's guarantees hold BY CONSTRUCTION, or they do not hold.

  What stood here was a wish list: five theorems about arbitrary `List LoopState`, four of them
  `sorry`, and at least two FALSE as stated. `confidence_monotonic` claimed every list of states
  rises; nothing stopped a list from falling. `loop_termination` claimed any list longer than
  maxIter contains a converged or diverged state; a list of running states refutes it. A claim
  about arbitrary data is not a theorem about a loop — it is a hope that the data will be nice.

  So the loop is MODELLED here and the invariants are proved about the model. `step` is the only
  way to advance a state, and it cannot lower confidence or leave a converged state; a run is a
  fold of `step`, so a guarantee proved of `step` holds of every run by induction.

  Confidence is a Nat percent (0…100), never a Float: equality on Float is not decidable and a
  proof that cannot be decided cannot be checked by `decide`. Status is an inductive, never a
  String, so "converged" cannot be misspelled into a different state.
-/

namespace Automate

inductive Status where
  | running
  | converged
  | diverged
  deriving DecidableEq, Repr

structure LoopState where
  iteration : Nat
  confidence : Nat
  status : Status
  deriving DecidableEq, Repr

/-- Convergence is DECLARED at 95%: the threshold is a judgement, stated where it can be argued with. -/
def threshold : Nat := 95

/--
  One step. Evidence may raise confidence and never lower it (`max`), the iteration counter always
  advances, and the status is a function of the confidence reached. A converged state is ABSORBING:
  no further evidence moves it, which is what "irreversible" has to mean if it means anything.
-/
def step (s : LoopState) (evidence : Nat) : LoopState :=
  if s.status = Status.converged then s
  else
    let c := max s.confidence evidence
    { iteration := s.iteration + 1
      confidence := c
      status := if threshold ≤ c then Status.converged else Status.running }

/-- A run is the fold of `step` over the evidence it was given. -/
def run (s : LoopState) : List Nat → LoopState
  | [] => s
  | e :: es => run (step s e) es

/-- Confidence never decreases in a step — the claim the old file could not make about a list. -/
theorem step_never_lowers_confidence (s : LoopState) (e : Nat) :
    s.confidence ≤ (step s e).confidence := by
  simp only [step]
  split
  · exact Nat.le_refl _
  · exact Nat.le_max_left _ _

/-- And therefore never decreases across a whole run, by induction on the evidence. -/
theorem run_never_lowers_confidence (s : LoopState) (es : List Nat) :
    s.confidence ≤ (run s es).confidence := by
  induction es generalizing s with
  | nil => exact Nat.le_refl _
  | cons e es ih => exact Nat.le_trans (step_never_lowers_confidence s e) (ih (step s e))

/-- Convergence is irreversible: a converged state is a fixed point of `step`. -/
theorem converged_is_absorbing (s : LoopState) (e : Nat) (h : s.status = Status.converged) :
    step s e = s := by
  simp [step, h]

/-- And of an entire run, however much evidence arrives afterwards. -/
theorem converged_survives_the_run (s : LoopState) (es : List Nat) (h : s.status = Status.converged) :
    run s es = s := by
  induction es generalizing s with
  | nil => rfl
  | cons e es ih => rw [run, converged_is_absorbing s e h]; exact ih s h

/-- The iteration counter advances on every step that is not already converged. -/
theorem iteration_increments (s : LoopState) (e : Nat) (h : s.status ≠ Status.converged) :
    (step s e).iteration = s.iteration + 1 := by
  simp [step, h]

/-- Reaching the threshold IS convergence — the status cannot disagree with the number. -/
theorem threshold_converges (s : LoopState) (e : Nat)
    (hrun : s.status ≠ Status.converged) (hth : threshold ≤ max s.confidence e) :
    (step s e).status = Status.converged := by
  simp [step, hrun, hth]

/-- Below the threshold it keeps running: no state diverges by accident, and none converges early. -/
theorem below_threshold_keeps_running (s : LoopState) (e : Nat)
    (hrun : s.status ≠ Status.converged) (hth : ¬ threshold ≤ max s.confidence e) :
    (step s e).status = Status.running := by
  simp [step, hrun, hth]

/-- The control: a run that reaches the threshold really does converge, so the theorems above are
    not vacuous — they forbid something that can otherwise happen. -/
theorem the_green_path_converges :
    (run { iteration := 0, confidence := 10, status := Status.running } [40, 96]).status
      = Status.converged := by
  decide

/-- And one that never reaches it is still running at the end. -/
theorem the_low_path_keeps_running :
    (run { iteration := 0, confidence := 10, status := Status.running } [40, 50]).status
      = Status.running := by
  decide

end Automate
