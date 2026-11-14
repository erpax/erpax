/-
  Main — the system claim, reduced to what the three models actually guarantee.

  What stood here claimed a whole quantum system correct: for EVERY list of problems there EXISTS a
  wave whose ledger answers each of them. Two `sorry`s held it up, and no proof was ever going to
  arrive, because the statement is not a theorem about software — it says that running the system
  succeeds, which is a fact about the world and its evidence, not about the code. Worse, the
  existential form is satisfied by EXHIBITING a wave: fabricate the ledger and the claim is
  discharged. That is the shape [[rules]]/forge refuses.

  What the three models really give is composition, and that is what is proved here: a converged
  wave settles every problem it names, only publishable records carry an identifier, and the
  published count never exceeds the ledger. Each is a statement about the OPERATIONS, so it holds
  of whatever the system actually produced rather than of a witness a prover invented.

  The honest boundary is the same one every file here carries: this proves the DECISIONS, never the
  facts. No theorem makes a divergent computation convergent, and none of this says a Millennium
  problem was solved — only that a wave claiming convergence must hold a strong result for every
  problem it lists.
-/

import Orchestrate
import Automate
import Wave

namespace MillenniumProof

/-- Safety, composed: what the ledger publishes is what the gate allowed, and the count it reports
    is bounded by the ledger it counts. Both legs come from Wave, where they are proved of the
    operations rather than assumed of a state. -/
theorem published_records_are_earned (ledger : List Wave.Record) :
    (∀ x ∈ Wave.publish ledger, x.doi.isSome → Wave.publishable x = true)
      ∧ Wave.published (Wave.publish ledger) ≤ (Wave.publish ledger).length :=
  ⟨Wave.only_publishable_records_get_a_doi ledger, Wave.publication_bounded (Wave.publish ledger)⟩

/-- Progress, composed: a wave that reports convergence holds a strong result for every problem it
    names — and one unsettled problem refuses the whole wave. -/
theorem convergence_is_earned (problems : List Nat) (results : List Orchestrate.Result) :
    (Orchestrate.converged problems results = true →
      ∀ p ∈ problems, Orchestrate.settled results p = true)
      ∧ (∀ p ∈ problems, Orchestrate.settled results p = false →
          Orchestrate.converged problems results = false) :=
  ⟨Orchestrate.convergence_requires_every_problem_settled problems results,
   fun p hp hn => Orchestrate.an_unsettled_problem_refuses_convergence problems results p hp hn⟩

/-- Termination, composed and stated honestly: a refinement loop that has converged is a FIXED
    POINT — no further evidence moves it. That is what "terminates" can mean about a loop whose
    input is unbounded; the old claim that any long-enough run must converge or diverge was simply
    false, and a list of still-running states refutes it. -/
theorem converged_loops_stay_converged (s : Automate.LoopState) (evidence : List Nat)
    (h : s.status = Automate.Status.converged) :
    Automate.run s evidence = s :=
  Automate.converged_survives_the_run s evidence h

/-- And the loop never loses ground: confidence across a whole run never falls below where it
    started, however the evidence arrives. -/
theorem loops_never_lose_ground (s : Automate.LoopState) (evidence : List Nat) :
    s.confidence ≤ (Automate.run s evidence).confidence :=
  Automate.run_never_lowers_confidence s evidence

end MillenniumProof
