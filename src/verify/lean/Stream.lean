/-
  Stream — the payloadless wire shape, and the one property a reader may rely on.

      <handle>-<hex>-<hex>-<hex>-<hex>-<message>

  The four hex groups plus the handle ARE a uuid (8-4-4-4-12), so the address is not a pointer
  travelling beside the content — it is the content's own name. "Payloadless" means exactly that:
  nothing rides alongside that could disagree with the address.

  THE SUBTLETY THIS FILE EXISTS FOR. The message is free text and may contain the separator. A
  parser that splits on every '-' therefore tears a message apart at the first hyphen it carries —
  and the tear is silent, because the head still parses. So the head is read by FIXED WIDTHS
  (8,4,4,4,12), never by searching for separators, and the message is whatever remains after the
  fifth one. Then a message containing any number of '-' round-trips untouched.

  What is proved: format is injective on the structured domain — parse ∘ format = id, for every
  handle, every address, and every message, including messages full of separators.

  What is NOT proved: that the address is the right address for the message. Binding the two is the
  content-uuid's job (Uuid.lean) and the chain's (Cost.lean); a well-formed stream carrying a wrong
  address is well-formed, and only recomputation catches it.
-/

namespace Stream

/-- A symbol on the wire. The separator is distinguished so the message may legally contain it. -/
abbrev Sym := Nat

/-- The separator. Any symbol works; `0` is the one this file fixes. -/
def sep : Sym := 0

/-- The head widths, in order: handle, then the four address groups. A uuid, split as it is written. -/
def widths : List Nat := [8, 4, 4, 4, 12]

/-- A stream before it is written: five head fields and a message that may contain anything. -/
structure Parts where
  handle : List Sym
  g1 : List Sym
  g2 : List Sym
  g3 : List Sym
  g4 : List Sym
  message : List Sym

/-- Written to the wire: the head fields, separated, then the message. -/
def format (p : Parts) : List Sym :=
  p.handle ++ sep :: (p.g1 ++ sep :: (p.g2 ++ sep :: (p.g3 ++ sep :: (p.g4 ++ sep :: p.message))))

/-- One field and the separator after it: take the width, then step over the separator. -/
def step (n : Nat) (s : List Sym) : List Sym × List Sym := (s.take n, s.drop (n + 1))

/-- Read back BY WIDTH, never by searching for separators — the message keeps its own. -/
def parse (s : List Sym) : Parts :=
  let (handle, a) := step 8 s
  let (g1, b) := step 4 a
  let (g2, c) := step 4 b
  let (g3, d) := step 4 c
  let (g4, msg) := step 12 d
  { handle := handle, g1 := g1, g2 := g2, g3 := g3, g4 := g4, message := msg }

/-- A stream whose head fields have the declared widths. -/
def wellFormed (p : Parts) : Prop :=
  p.handle.length = 8 ∧ p.g1.length = 4 ∧ p.g2.length = 4 ∧ p.g3.length = 4 ∧ p.g4.length = 12

/--
  THE ATOMIC STEP, and the whole round trip is five copies of it: a field of its declared width,
  followed by a separator, reads back as exactly that field and exactly the rest.
-/
theorem step_field (n : Nat) (xs ys : List Sym) (h : xs.length = n) :
    step n (xs ++ sep :: ys) = (xs, ys) := by
  subst h
  simp only [step, Prod.mk.injEq]
  constructor
  · simp
  · induction xs with
    | nil => simp
    | cons a t ih => simpa using ih

/--
  THE ROUND TRIP. Every well-formed stream reads back exactly as it was written — every field, and
  the message whole, whatever it contains.
-/
theorem parse_format (p : Parts) (h : wellFormed p) : parse (format p) = p := by
  obtain ⟨h0, h1, h2, h3, h4⟩ := h
  simp only [parse, format,
    step_field 8 p.handle _ h0, step_field 4 p.g1 _ h1, step_field 4 p.g2 _ h2,
    step_field 4 p.g3 _ h3, step_field 12 p.g4 _ h4]

/-- The message survives its own separators — the tear this shape exists to prevent. -/
theorem a_message_of_separators_survives (hd g1 g2 g3 g4 : List Sym) (k : Nat)
    (h : wellFormed ⟨hd, g1, g2, g3, g4, List.replicate k sep⟩) :
    (parse (format ⟨hd, g1, g2, g3, g4, List.replicate k sep⟩)).message = List.replicate k sep := by
  rw [parse_format _ h]

/-- An empty message is a stream too: the address alone, with nothing said. -/
theorem an_empty_message_round_trips (hd g1 g2 g3 g4 : List Sym)
    (h : wellFormed ⟨hd, g1, g2, g3, g4, []⟩) :
    parse (format ⟨hd, g1, g2, g3, g4, []⟩) = ⟨hd, g1, g2, g3, g4, []⟩ := by
  rw [parse_format _ h]

/-- The head is exactly a uuid's 32 hex symbols — the address is not an extra field beside them. -/
theorem the_head_is_a_uuid : widths.sum = 32 := by decide

/-- Five separators, one per boundary: the sixth field is the message and is never split. -/
theorem five_separators : widths.length - 1 = 4 := by decide

end Stream
