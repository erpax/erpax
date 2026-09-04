/-
  Order — a root addresses a SET or a SEQUENCE, and the two are never interchangeable.

  erpax folds content-uuids to a root in two different ways, and both are correct for what
  they answer:

    setRoot      sorts first, so it addresses the MEMBERS and no permutation moves it
    sequenceRoot folds as given, so it addresses the ORDER and any transposition moves it

  Using one where the other belongs is silent: a set-root over ordered rows stops being
  tamper-evident under reordering, and a sequence-root over an unordered collection makes the
  address an accident of traversal.

  This is Spacetime.timelike_order_absolute one level up. There the question was which
  separations have a frame-independent order; here it is which collections have a
  representation-independent address. Same shape, same answer: declare the order, or the seal
  is sealing an accident.

  `step` stands in for `merge`: what is proved is the ORDER LAW, not the hash.
-/

namespace Order

def step (acc x : Nat) : Nat := (acc * 131 + x) % 1000003

def sequenceRoot (l : List Nat) : Nat := l.foldl step 0

/-- Insertion sort, written STRUCTURALLY so `decide` can reduce it. `List.mergeSort` is defined
    by well-founded recursion and gets stuck; `native_decide` would unstick it at the cost of
    trusting the compiler (`Lean.ofReduceBool`), and a proof that needs a new axiom to check an
    ordering law is not worth the law. -/
def insert (x : Nat) : List Nat → List Nat
  | [] => [x]
  | y :: ys => if x ≤ y then x :: y :: ys else y :: insert x ys

def sort : List Nat → List Nat
  | [] => []
  | x :: xs => insert x (sort xs)

def setRoot (l : List Nat) : Nat := sequenceRoot (sort l)

/-- A carrier and a permutation of it. Distinct elements, so the two orders really differ. -/
def rows : List Nat := [7, 3, 9, 1]

/-! ## The separation -/

/-- A SET root does not move under permutation — that is the whole point of sorting first. -/
theorem set_root_is_order_free : setRoot rows = setRoot rows.reverse := by decide

/-- A SEQUENCE root does move. The witness is what makes the distinction real. -/
theorem sequence_root_is_order_bound : sequenceRoot rows ≠ sequenceRoot rows.reverse := by decide

/-- And they are not each other: substituting one for the other changes the address. -/
theorem the_two_roots_are_not_interchangeable : setRoot rows ≠ sequenceRoot rows.reverse := by
  decide

/-! ## Why the sequence root is the one a ledger needs

  A tamper that REORDERS rows without changing any of them is invisible to a set root and
  visible to a sequence root. That is exactly the attack a chained receipt exists to catch.
-/

/-- A reordering tamper: same members, different order. -/
def tampered : List Nat := [3, 7, 9, 1]

theorem set_root_misses_a_reordering : setRoot rows = setRoot tampered := by decide

theorem sequence_root_catches_it : sequenceRoot rows ≠ sequenceRoot tampered := by decide

end Order
