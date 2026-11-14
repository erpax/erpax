/-
  Cross — the corpus's claims, composed. A theorem that holds only inside its own file proves a
  fragment; what a reader needs is that the fragments CHAIN.

  Four files decide things that feed each other, and until now each was proved alone:

    Arrival.landed      did the forge agree on this commit?
    Release.release     may this commit be released — mint a permanent DOI?
    Ftl.holds           does the FTL claim stand: reuse ∧ amortize∞ ∧ cracks=∅?
    Uuid.programBand    can the program bits reach the bits the RFC owns?

  The composition is where the real risk lives. `Release.release` takes `agreed` as a FACT, and the
  fact is produced by `Arrival.landed`; if that seam is loose, a permanent identifier can be minted
  over a red build, and no single-file theorem would notice. These theorems close the seam by
  stating it: wherever `agreed` is the landing, the chain holds end to end.

  Every one is decided over Bool: no axioms, nothing trusted but the kernel.
-/

import Arrival
import Release
import Ftl
import Uuid

namespace Cross

/-- THE SEAM. When the release's `agreed` fact IS the landing verdict, a failing check stops the
    DOI — not by convention, by composition. -/
theorem a_failing_check_stops_the_doi (judged pending tip changed releasedToday : Bool)
    (seam : Arrival.landed judged true pending = true → False) :
    Release.release (Arrival.landed judged true pending) tip changed releasedToday = false := by
  cases judged <;> cases pending <;> cases tip <;> cases changed <;> cases releasedToday <;> decide

/-- And UNMEASURED stops it too: nothing judged the push, so nothing agreed, so nothing is released.
    This is the case the corpus exists to refuse — silence reading as consent. -/
theorem unmeasured_stops_the_doi (failed pending tip changed releasedToday : Bool) :
    Release.release (Arrival.landed false failed pending) tip changed releasedToday = false := by
  cases failed <;> cases pending <;> cases tip <;> cases changed <;> cases releasedToday <;> decide

/-- A push still running is not a release either: the DOI waits for the evidence, never anticipates it. -/
theorem a_pending_push_stops_the_doi (judged failed tip changed releasedToday : Bool) :
    Release.release (Arrival.landed judged failed true) tip changed releasedToday = false := by
  cases judged <;> cases failed <;> cases tip <;> cases changed <;> cases releasedToday <;> decide

/-- The green chain, end to end: a judged push with no failure and nothing pending, on the verified
    tip, with changed content and no release today — releases. So the refusals above are not vacuous. -/
theorem the_green_chain_releases :
    Release.release (Arrival.landed true false false) true true false = true := by decide

/-- THE FTL SEAM. The corpus's strongest claim rests on `cracks = ∅`, and a crack is exactly what a
    stale citation is. So a cracked corpus cannot claim FTL, whatever its reuse and amortization. -/
theorem a_crack_stops_the_ftl_claim (reuseWins amortizeInfinite : Bool) :
    Ftl.holds reuseWins amortizeInfinite false = false := by
  cases reuseWins <;> cases amortizeInfinite <;> decide

/-- And the cost says the same thing in the other language: with a crack, every answer pays the
    whole search again — the two statements of the premise agree. -/
theorem the_crack_premise_agrees (c answers : Nat) :
    Ftl.costOf true c answers = Ftl.naive c answers ∧ Ftl.holds true true false = false := by
  exact ⟨Ftl.a_crack_costs_the_whole_search c answers, by decide⟩

/-- THE IDENTITY SEAM. Reuse is only sound because a citation names its content exactly, and the
    uuid layout is what makes the name stable: no program bit may reach the version or variant
    field. If it could, two different contents could wear one address and a "reuse" would return
    the wrong answer. -/
theorem reuse_rests_on_a_stable_address :
    ∀ i, i < 128 → Uuid.programBand i = true →
      Uuid.versionBand i = false ∧ Uuid.variantBand i = false := by
  decide

/-- The whole chain in one statement, for a reader who wants the composition rather than the parts:
    a green landing releases, a red one does not, and neither can a cracked corpus claim FTL. -/
theorem the_corpus_chain :
    Release.release (Arrival.landed true false false) true true false = true
      ∧ Release.release (Arrival.landed false true true) true true false = false
      ∧ Ftl.holds true true false = false := by
  decide

end Cross
