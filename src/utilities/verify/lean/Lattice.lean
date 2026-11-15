/-
  Lattice — why the Hodge type condition cannot stand in for rationality.

  Clay: hodge meta

  The Hodge conjecture says that on a smooth complex projective variety every RATIONAL cohomology
  class of type (p, p) is a rational combination of classes of algebraic cycles. The statement has
  two hypotheses: the type condition, which comes from the Hodge decomposition over ℂ, and
  rationality. Algebraic classes are always rational. An argument that used only the type condition
  would therefore have to show that type-(p, p) classes are rational, and this file shows, in a finite
  model, that the type condition does not give that: it is a linear condition over a field that
  contains irrational numbers, and it has irrational solutions.

  Numbers are taken in ℤ[√2]: a pair (a, b) stands for a + b√2, and a number is rational when b = 0.
  A class is a pair of such numbers. The type operator W exchanges the two coordinates, and a class
  is of type (p, p) when W fixes it.

  What is proved, by `decide` alone:
    1. W is an involution on the classes checked.
    2. The class ((1, 1), (1, 1)), that is (1 + √2, 1 + √2), is of type (p, p) and is not rational.
    3. The class ((1, 0), (1, 0)), that is (1, 1), is of type (p, p) and is rational.

  What is NOT proved: anything about the Hodge conjecture, Hodge structures or algebraic cycles. The
  file shows only that the type condition is satisfied by irrational classes, so any proof must use
  rationality, and the geometry that produces algebraic cycles, beyond the type condition.
-/

namespace Lattice

/-- a + b√2. -/
structure Q2 where
  a : Int
  b : Int
  deriving DecidableEq

/-- A class: two coordinates in ℤ[√2]. -/
structure Cls where
  x : Q2
  y : Q2
  deriving DecidableEq

/-- The type operator: exchange the coordinates. -/
def W (c : Cls) : Cls := ⟨c.y, c.x⟩

/-- Type (p, p): fixed by W. -/
def typePP (c : Cls) : Bool := W c == c

/-- Rational: no √2 part in either coordinate. -/
def rational (c : Cls) : Bool := c.x.b == 0 && c.y.b == 0

/-- (1 + √2, 1 + √2). -/
def irrationalPP : Cls := ⟨⟨1, 1⟩, ⟨1, 1⟩⟩

/-- (1, 1). -/
def rationalPP : Cls := ⟨⟨1, 0⟩, ⟨1, 0⟩⟩

theorem W_is_an_involution_here : W (W irrationalPP) = irrationalPP ∧ W (W rationalPP) = rationalPP := by decide

theorem type_pp_does_not_imply_rational : typePP irrationalPP = true ∧ rational irrationalPP = false := by decide

theorem a_rational_type_pp_class_exists : typePP rationalPP = true ∧ rational rationalPP = true := by decide

end Lattice
