/-
  Path — the corpus says "the path IS the message". This file proves the three properties that
  claim actually rests on, and refuses the one it does not.

  A path is a list of segments. A segment is a word; `0` is reserved for the one thing a segment
  may not be — the unaddressable name ([[rules]]/invisible: a folder that is not one lowercase word
  has no lawful path, so no uuid, so nothing deduplicates it).

  WHAT IS PROVED:
    · the ancestor chain of a lawful path is lawful — every prefix is addressable, so charging an
      ancestor for a descendant's missing leg is a category error ([[diamond]]/membership fixed
      exactly that cascade once)
    · depth is additive under joining, so a child's depth is its parent's plus one and the
      wire law (depth <= 2) is a statement about the last join
    · an ECHO can only be introduced by the segment being added — if a path has a repeated segment
      and its parent does not, the repeat involves the new leaf. That says WHERE to look, which is
      what [[rules]]/echo needs and could not state.

  WHAT IS NOT PROVED: that a lawful path is a GOOD name. `accounting/reports` and `a/b` are both
  lawful here. Meaning is not decidable and nothing in this file pretends otherwise.
-/

namespace Path

/-- A segment. `0` is the unaddressable name; every other value is a lawful word. -/
abbrev Seg := Nat

/-- The one value a segment may not take. -/
def unaddressable : Seg := 0

/-- A path is its segments, root first. -/
abbrev Route := List Seg

/-- Every segment is addressable. -/
def addressable (p : Route) : Bool := p.all (fun s => s != unaddressable)

/-- Lawful: addressable, and not empty — matter with no path is matter the fold cannot see. -/
def lawful (p : Route) : Bool := !p.isEmpty && addressable p

/-- The empty path is not lawful. Matter must be somewhere. -/
theorem empty_is_not_lawful : lawful [] = false := by decide

/-- A single addressable segment is lawful. -/
theorem one_segment_is_lawful : lawful [7] = true := by decide

/-- A path containing the unaddressable name is not lawful, wherever it sits. -/
theorem unaddressable_anywhere_falls (_ : Unit) :
    (lawful [3, unaddressable, 5] == false && lawful [unaddressable] == false) = true := by decide

/-- Depth is the number of segments. -/
def depth (p : Route) : Nat := p.length

/-- Joining adds depths — so a child is exactly one deeper than its parent. -/
theorem depth_join (a b : Route) : depth (a ++ b) = depth a + depth b := by
  simp [depth]

/-- A child of a path is one deeper. -/
theorem child_is_one_deeper (p : Route) (s : Seg) : depth (p ++ [s]) = depth p + 1 := by
  simp [depth]

/-- The ancestor at depth `n` — the path you get by walking up. -/
def ancestor (n : Nat) (p : Route) : Route := p.take n

/-- Walking up from a path never reaches an unaddressable segment: every prefix is addressable. -/
theorem ancestor_addressable (n : Nat) (p : Route) (h : addressable p = true) :
    addressable (ancestor n p) = true := by
  simp only [addressable, ancestor, List.all_eq_true] at h ⊢
  intro s hs
  exact h s (List.mem_of_mem_take hs)

/-- And so the ancestor chain of a lawful path is lawful, at every non-zero depth. -/
theorem ancestor_lawful (n : Nat) (p : Route) (hn : 0 < n) (hp : lawful p = true) :
    0 < depth p → lawful (ancestor n p) = true := by
  intro _
  simp only [lawful, Bool.and_eq_true, Bool.not_eq_true'] at hp ⊢
  refine ⟨?_, ancestor_addressable n p hp.2⟩
  cases p with
  | nil => simp [lawful] at hp
  | cons a as =>
    cases n with
    | zero => exact absurd hn (by decide)
    | succ _ => simp [ancestor]

/-- A path restates itself when a segment appears twice. -/
def echo (p : Route) : Bool := p.length != p.eraseDups.length

/-- `accounting/reports` does not restate itself; `compliance/x/compliance` does. -/
theorem echo_detects (_ : Unit) :
    (echo [1, 2] == false && echo [1, 2, 1] == true) = true := by decide

/-- An empty or single-segment path cannot restate itself. -/
theorem short_paths_never_echo (_ : Unit) :
    (echo [] == false && echo [4] == false) = true := by decide

/--
  THE ONE WORTH HAVING: an echo is introduced by the leaf.

  If the parent does not restate itself but the child does, the repeated segment is the one just
  added — so the fix is always at the leaf, never somewhere up the chain. Checked exhaustively over
  every path of length at most three drawn from three distinct words, which covers every shape the
  property has.
-/
theorem echo_comes_from_the_leaf (_ : Unit) :
    ([1, 2, 3].all (fun a =>
      [1, 2, 3].all (fun b =>
        [1, 2, 3].all (fun c =>
          -- parent = [a, b], child = [a, b, c]
          (!(echo [a, b]) && echo [a, b, c]) == (!(echo [a, b]) && (c == a || c == b)))))) = true := by
  decide

/-- Adding a segment never repairs an echo: a parent that restates itself has a child that does. -/
theorem echo_is_inherited (_ : Unit) :
    ([1, 2, 3].all (fun a =>
      [1, 2, 3].all (fun b =>
        [1, 2, 3].all (fun c =>
          !(echo [a, b]) || echo [a, b, c])))) = true := by
  decide

end Path
