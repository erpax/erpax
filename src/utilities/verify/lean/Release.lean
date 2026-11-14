/-
  Release — a green landing is released exactly when four facts hold, and at most once a day.

  The twin is releaseDecision in src/arrival, the decision the landing lane runs before it tags a
  version. It is not a judgement typed into code: it is this conjunction, and every refusal it
  makes is a theorem below.

    agreed         the forge agreed on HEAD: CI green AND the Cloudflare build deployed
    tip            HEAD is exactly origin/main — the commit the forge judged
    changed        the release planner: the content fold differs from the last release
    releasedToday  a corpus release was already cut this UTC day — every release mints a DOI,
                   and a DOI is permanent

  Proven by case analysis and `decide` over the sixteen cases: no axiom, nothing trusted but the
  kernel. What is proved is the DECISION, not the facts — whether the forge really agreed is
  measured by src/arrival, and no theorem here can make a red build green.
-/

namespace Release

def release (agreed tip changed releasedToday : Bool) : Bool :=
  agreed && tip && changed && !releasedToday

/-- The decision is exactly the conjunction: nothing else releases, and nothing else refuses. -/
theorem release_iff (agreed tip changed releasedToday : Bool) :
    release agreed tip changed releasedToday = true ↔
      (agreed = true ∧ tip = true ∧ changed = true ∧ releasedToday = false) := by
  cases agreed <;> cases tip <;> cases changed <;> cases releasedToday <;> decide

/-- A tip the forge has not agreed on is never released, whatever else holds. -/
theorem no_release_without_the_forge (tip changed releasedToday : Bool) :
    release false tip changed releasedToday = false := by
  cases tip <;> cases changed <;> cases releasedToday <;> decide

/-- A release names exactly the commit the forge judged, never a newer unverified one. -/
theorem no_release_off_the_verified_tip (agreed changed releasedToday : Bool) :
    release agreed false changed releasedToday = false := by
  cases agreed <;> cases changed <;> cases releasedToday <;> decide

/-- Content already released is not released again under a second name. -/
theorem no_release_of_released_content (agreed tip releasedToday : Bool) :
    release agreed tip false releasedToday = false := by
  cases agreed <;> cases tip <;> cases releasedToday <;> decide

/-- At most one release a UTC day: a DOI is permanent, and the corpus lands many times a day. -/
theorem one_release_a_day (agreed tip changed : Bool) :
    release agreed tip changed true = false := by
  cases agreed <;> cases tip <;> cases changed <;> decide

/-- The control: the green path does release, so the refusals above are not vacuous. -/
theorem the_green_path_releases : release true true true false = true := by decide

end Release
