/-
  Wave — the ledger's guarantees are properties of the OPERATIONS, not hopes about the data.

  What stood here was seven `sorry`s over arbitrary `WaveState`, and every one of them was false as
  written. `ledger_append_only` compared two unrelated states. `publication_bounded` compared an
  arbitrary `Nat` field to a list length. `convergent_publication` asserted that any record carrying
  a DOI is convergent, of a record anyone could construct.

  The sharpest of them is worth naming: `convergence_requires_all_convergent` could be "proved" by
  EXHIBITING a list of convergent results — that is, by fabricating them. A theorem satisfiable by
  inventing evidence is the [[rules]]/forge defect wearing a proof's clothes.

  So the ledger is modelled by its operations. `append` is the only way a record enters, `publish`
  the only way a DOI attaches, and `published` is COUNTED from the ledger rather than stored beside
  it — a stored count is a second source of truth, and the old theorem existed to reconcile it.
-/

namespace Wave

inductive Outcome where
  | convergent
  | divergent
  | inconclusive
  deriving DecidableEq, Repr

structure Record where
  problem : Nat
  outcome : Outcome
  confidence : Nat
  doi : Option Nat
  deriving DecidableEq, Repr

/-- The publication bar, DECLARED: convergent and at least 95% confident. -/
def publishable (r : Record) : Bool :=
  (r.outcome = Outcome.convergent) && 95 ≤ r.confidence

/-- A record enters the ledger UNPUBLISHED, whatever the caller hoped. -/
def append (ledger : List Record) (r : Record) : List Record :=
  ledger ++ [{ r with doi := none }]

/-- Attaching a DOI is GATED, and the gate is TOTAL: it grants an id to a publishable record and
    CLEARS one from anything else. The first version only granted, so a caller could hand in a record
    that already carried a DOI and the gate would wave it through — the proof refused, which is what a
    proof is for. The gate is the
    only door, so "only convergent records are published" is true by construction rather than by
    assertion. The id is the ledger position, so two records cannot receive the same one. -/
def publish (ledger : List Record) : List Record :=
  ledger.zipIdx.map (fun (r, i) => { r with doi := if publishable r then some i else none })

/-- The publication count is COUNTED, never stored beside the ledger it describes. -/
def published (ledger : List Record) : Nat := (ledger.filter (fun r => r.doi.isSome)).length

/-- Append-only, stated where it is true: every record already in the ledger is still in it. -/
theorem append_keeps_every_record (ledger : List Record) (r x : Record) (h : x ∈ ledger) :
    x ∈ append ledger r := by
  simp [append, List.mem_append]
  exact Or.inl h

/-- And the ledger only grows. -/
theorem append_only_grows (ledger : List Record) (r : Record) :
    ledger.length ≤ (append ledger r).length := by
  simp [append]

/-- The count can never exceed the ledger, because it is a filter OF the ledger. The old file made
    this a theorem about a stored field, where it was simply false. -/
theorem publication_bounded (ledger : List Record) : published ledger ≤ ledger.length := by
  simpa [published] using ledger.length_filter_le (fun r => r.doi.isSome)

/-- A record entering the ledger carries no DOI, whatever it arrived with: publication is not a
    property a caller may assert about its own data. -/
theorem append_never_publishes (ledger : List Record) (r : Record) :
    ∀ x ∈ append ledger r, x ∉ ledger → x.doi = none := by
  intro x hx hnot
  simp [append, List.mem_append] at hx
  cases hx with
  | inl h => exact absurd h hnot
  | inr h => simp [h]

/-- Only a publishable record leaves `publish` with a DOI — the gate, proved rather than promised. -/
theorem only_publishable_records_get_a_doi (ledger : List Record) :
    ∀ x ∈ publish ledger, x.doi.isSome → publishable x = true := by
  intro x hx hdoi
  simp only [publish, List.mem_map] at hx
  obtain ⟨p, _, hp⟩ := hx
  by_cases hpub : publishable p.1
  · subst hp; simpa [publishable, hpub] using hpub
  · subst hp; simp [hpub] at hdoi

/-- The control: a convergent, confident record does get published, so the gate is not vacuous. -/
theorem the_publishable_record_is_published :
    published (publish [{ problem := 1, outcome := Outcome.convergent, confidence := 96, doi := none }]) = 1 := by
  decide

/-- And one below the bar is not — divergent evidence never mints an identifier. -/
theorem the_unpublishable_record_is_not :
    published (publish [{ problem := 1, outcome := Outcome.divergent, confidence := 99, doi := none }]) = 0 := by
  decide

/-- Nor is a convergent record that is not confident enough. -/
theorem low_confidence_is_not_published :
    published (publish [{ problem := 1, outcome := Outcome.convergent, confidence := 94, doi := none }]) = 0 := by
  decide

end Wave
