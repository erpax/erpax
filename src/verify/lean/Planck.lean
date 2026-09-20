/-
  Planck — the three combinations, and what each one is made of.

  A Planck quantity is a product of powers of hbar, G and c. Every exponent is a half-integer, so
  this file carries them DOUBLED and every statement becomes integer arithmetic a kernel can decide:

      l_P = (hbar G / c^3)^(1/2)   ->   (1,  1, -3)
      m_P = (hbar c / G)^(1/2)     ->   (1, -1,  1)
      t_P = (hbar G / c^5)^(1/2)   ->   (1,  1, -5)

  The three pairwise combinations isolate the three constants, and that is the whole content:

      l / t  =  c        both hbar and G cancel  — pure kinematics
      l * m  =  hbar/c   G cancels               — pure quantum
      l / m  =  G/c^2    hbar cancels            — pure gravity

  WHAT THIS PROVES: an exponent identity. Dimensional analysis is bookkeeping, and bookkeeping is
  exactly what a kernel is good for — it cannot be fudged, and a wrong exponent fails by `decide`.

  WHAT THIS DOES NOT PROVE: any physics. That the Planck length is where a Compton wavelength meets
  a Schwarzschild radius is a claim about the world, checked numerically in the matter twin and not
  here; nothing in this file says the constants take the values they do, or that a length that small
  means anything operational.
-/

namespace Planck

/-- A quantity as DOUBLED exponents of (hbar, G, c). Doubled, so half-integers stay integers. -/
structure Dim where
  hbar : Int
  g : Int
  c : Int
deriving DecidableEq, Repr

/-- Multiplying quantities adds exponents. -/
def mul (a b : Dim) : Dim := ⟨a.hbar + b.hbar, a.g + b.g, a.c + b.c⟩

/-- Dividing subtracts them. -/
def div (a b : Dim) : Dim := ⟨a.hbar - b.hbar, a.g - b.g, a.c - b.c⟩

/-- The three Planck quantities. -/
def length : Dim := ⟨1, 1, -3⟩
def mass : Dim := ⟨1, -1, 1⟩
def time : Dim := ⟨1, 1, -5⟩

/-- The three constants, also doubled. -/
def cc : Dim := ⟨0, 0, 2⟩
def hbarOverC : Dim := ⟨2, 0, -2⟩
def gOverCSquared : Dim := ⟨0, 2, -4⟩

/-- length / time = c. Both hbar and G cancel. -/
theorem length_over_time_is_c : div length time = cc := by decide

/-- length * mass = hbar / c. G cancels: the combination is purely quantum. -/
theorem length_times_mass_is_hbar_over_c : mul length mass = hbarOverC := by decide

/-- length / mass = G / c^2. hbar cancels: the combination is purely gravitational. -/
theorem length_over_mass_is_g_over_c_squared : div length mass = gOverCSquared := by decide

/-- Each combination really does drop the constant it claims to drop, and only that one. -/
theorem each_cancels_exactly_what_it_claims (_ : Unit) :
    ((div length time).hbar == 0 && (div length time).g == 0
      && (mul length mass).g == 0 && (mul length mass).hbar != 0
      && (div length mass).hbar == 0 && (div length mass).g != 0) = true := by
  decide

/-- Time is not redundant: length/mass and length/time are different quantities. -/
theorem the_three_combinations_are_distinct (_ : Unit) :
    ((div length time != mul length mass)
      && (mul length mass != div length mass)
      && (div length time != div length mass)) = true := by
  decide

/-- Multiplying then dividing by the same quantity returns it — the bookkeeping is a group. -/
theorem mul_div_cancels (a b : Dim) : div (mul a b) b = a := by
  simp [div, mul]

/-- And dividing then multiplying, the other order. -/
theorem div_mul_cancels (a b : Dim) : mul (div a b) b = a := by
  simp [div, mul]

/--
  The Planck mass is where the two length scales meet.

  A Compton wavelength is hbar/(m c) and a Schwarzschild radius is 2 G m / c^2. Set the exponents
  equal and solve: hbar^1 m^-1 c^-1 = G^1 m^1 c^-2 forces m^2 = hbar G^-1 c^1, which doubled is
  exactly `mass`. The factor 2 is a pure number and carries no exponents, so it cannot enter here —
  which is why this proves the SCALE and not the coefficient.
-/
def comptonPerMass : Dim := ⟨2, 0, -2⟩
def schwarzschildPerMass : Dim := ⟨0, 2, -4⟩

theorem compton_meets_schwarzschild_at_the_planck_mass :
    div comptonPerMass schwarzschildPerMass = mul mass mass := by decide

end Planck
