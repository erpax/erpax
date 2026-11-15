/-
  Prompt — a prompt is a program: each word a step, the prompt its words run in order.

  Clay: none

  The twin is src/utilities/prompt.

  A lexicon gives some words a meaning: a step on the program's state that either goes on or halts.
  `run` reads a prompt word by word. A known word acts; a word that halts ends the program with its
  state. An unknown word is not refused: the twin researches it (Payload's `search` collection) and
  records what it found as an `emerging_gap` memory keyed by the word. On the state it acts as the
  identity, so an unknown word can never break, end or change the program it stands in.

  Proved:
    · a known word acts, a halting word stops, an unknown word is skipped
    · a prompt of words that never halt means its words composed: run (xs ++ ys) = run ys ∘ run xs
    · inserting unknown words anywhere leaves what a prompt does unchanged
    · the gap program `feel think emote aware`: a pleasant feeling halts at `feel` with nothing
      written; an unpleasant one runs to the end, recorded and broadcast; an unknown word in it
      changes neither outcome

  Proved by `cases`, `rfl` and induction on the words. No Mathlib, no sorry, no axiom.
-/

namespace Prompt

/-- What a word does to the state: go on with a new state, or halt with one. -/
inductive Step (σ : Type) where
  | go : σ → Step σ
  | halt : σ → Step σ

/-- A lexicon: the meaning of each known word; an unknown word has none. -/
abbrev Lexicon (σ : Type) := String → Option (σ → Step σ)

/-- Run a prompt's words in order. -/
def run {σ : Type} (lex : Lexicon σ) : List String → σ → σ
  | [], s => s
  | w :: ws, s =>
    match lex w with
    | none => run lex ws s
    | some f =>
      match f s with
      | .go s' => run lex ws s'
      | .halt s' => s'

theorem run_nil {σ : Type} (lex : Lexicon σ) (s : σ) : run lex [] s = s := rfl

/-- An unknown word is skipped: it acts as the identity on the state. -/
theorem unknown_skips {σ : Type} (lex : Lexicon σ) (w : String) (ws : List String) (s : σ)
    (h : lex w = none) : run lex (w :: ws) s = run lex ws s := by
  show (match lex w with
    | none => run lex ws s
    | some f => match f s with
      | .go s' => run lex ws s'
      | .halt s' => s') = run lex ws s
  rw [h]

/-- A known word that goes on hands its state to the rest of the prompt. -/
theorem go_continues {σ : Type} (lex : Lexicon σ) (w : String) (ws : List String) (s s' : σ)
    (f : σ → Step σ) (h : lex w = some f) (hf : f s = .go s') : run lex (w :: ws) s = run lex ws s' := by
  show (match lex w with
    | none => run lex ws s
    | some f => match f s with
      | .go s' => run lex ws s'
      | .halt s' => s') = run lex ws s'
  rw [h]
  show (match f s with
    | .go s' => run lex ws s'
    | .halt s' => s') = run lex ws s'
  rw [hf]

/-- A known word that halts ends the program: the words after it are not read. -/
theorem halt_stops {σ : Type} (lex : Lexicon σ) (w : String) (ws : List String) (s s' : σ)
    (f : σ → Step σ) (h : lex w = some f) (hf : f s = .halt s') : run lex (w :: ws) s = s' := by
  show (match lex w with
    | none => run lex ws s
    | some f => match f s with
      | .go s' => run lex ws s'
      | .halt s' => s') = s'
  rw [h]
  show (match f s with
    | .go s' => run lex ws s'
    | .halt s' => s') = s'
  rw [hf]

/-- A lexicon whose words never halt: each meaning is a plain function of the state. -/
def total {σ : Type} (g : String → Option (σ → σ)) : Lexicon σ := fun w =>
  match g w with
  | none => none
  | some f => some (fun s => .go (f s))

/-- A prompt of words that never halt means its words composed. -/
theorem run_append {σ : Type} (g : String → Option (σ → σ)) :
    ∀ (xs ys : List String) (s : σ), run (total g) (xs ++ ys) s = run (total g) ys (run (total g) xs s)
  | [], _, _ => rfl
  | w :: ws, ys, s => by
    cases h : g w with
    | none =>
      have hl : total g w = none := by show (match g w with | none => none | some f => some _) = none; rw [h]
      rw [List.cons_append, unknown_skips _ w _ s hl, unknown_skips _ w _ s hl]
      exact run_append g ws ys s
    | some f =>
      have hl : total g w = some (fun s => .go (f s)) := by
        show (match g w with | none => none | some f => some _) = _; rw [h]
      rw [List.cons_append, go_continues _ w _ s (f s) _ hl rfl, go_continues _ w _ s (f s) _ hl rfl]
      exact run_append g ws ys (f s)

/-- Insert an unknown word anywhere: what the prompt does is unchanged. -/
theorem unknown_anywhere {σ : Type} (lex : Lexicon σ) (u : String) (hu : lex u = none) :
    ∀ (xs ys : List String) (s : σ), run lex (xs ++ u :: ys) s = run lex (xs ++ ys) s
  | [], ys, s => unknown_skips lex u ys s hu
  | w :: ws, ys, s => by
    rw [List.cons_append, List.cons_append]
    cases h : lex w with
    | none => rw [unknown_skips _ w _ s h, unknown_skips _ w _ s h]; exact unknown_anywhere lex u hu ws ys s
    | some f =>
      cases hf : f s with
      | go s' => rw [go_continues _ w _ s s' f h hf, go_continues _ w _ s s' f h hf]; exact unknown_anywhere lex u hu ws ys s'
      | halt s' => rw [halt_stops _ w _ s s' f h hf, halt_stops _ w _ s s' f h hf]

/-! The gap program: the MCP `afterToolCall` hook, as the prompt `feel think emote aware`. -/

/-- The hook's state: whether the call failed, and what has been written so far. -/
structure Gap where
  failed : Bool
  felt : Bool := false
  gap : Bool := false
  memory : Bool := false
  broadcast : Bool := false
  deriving DecidableEq, Repr

/-- The four words. `feel` halts on a pleasant (successful) call: nothing to record. -/
def gapLexicon : Lexicon Gap
  | "feel" => some fun s => if s.failed then .go { s with felt := true } else .halt { s with felt := true }
  | "think" => some fun s => .go { s with gap := true }
  | "emote" => some fun s => .go { s with memory := true }
  | "aware" => some fun s => .go { s with broadcast := true }
  | _ => none

def gapProgram : List String := ["feel", "think", "emote", "aware"]

/-- A successful call halts at `feel`: no gap, no memory, no broadcast. -/
theorem gap_pleasant_writes_nothing :
    run gapLexicon gapProgram { failed := false } = { failed := false, felt := true } := by decide

/-- A failed call runs the whole program: the gap is recorded and broadcast. -/
theorem gap_unpleasant_records_and_broadcasts :
    run gapLexicon gapProgram { failed := true } =
      { failed := true, felt := true, gap := true, memory := true, broadcast := true } := by decide

/-- An unknown word in the program is researched, not refused: both outcomes are unchanged. -/
theorem gap_unknown_word_changes_nothing (failed : Bool) :
    run gapLexicon ["feel", "think", "ponder", "emote", "aware"] { failed } =
      run gapLexicon gapProgram { failed } := by
  cases failed <;> decide

end Prompt
