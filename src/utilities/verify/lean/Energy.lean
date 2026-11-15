/-
  Energy — why the conserved energy cannot bound the peak velocity.

  Clay: navier-stokes meta

  For the three-dimensional incompressible Navier–Stokes equations the one quantity known to stay
  bounded for all time is the kinetic energy, the sum of the squared velocities (the L² norm). Global
  regularity needs control of the PEAK velocity (the L^∞ norm, or something stronger). An argument
  that used only the energy bound would need the energy to control the peak. This file shows, in a
  discrete model, that it does not: a field can keep its energy while its peak grows, by
  concentrating. That is the discrete shadow of the known obstruction: in three dimensions the energy
  is supercritical, too weak to rule out concentration.

  A field is a list of non-negative integer velocity components. For k = 1 … 8:
    · spread k   k² components equal to 1                 energy k²   peak 1
    · spike  k   one component k, then k² − 1 zeros       energy k²   peak k

  What is proved, by `decide` alone: for every k from 1 to 8 the two fields have the same length and
  the same energy, and the spike's peak is k times the spread's.

  What is NOT proved: anything about solutions of the Navier–Stokes equations. The model has no
  dynamics, no viscosity and no incompressibility. It shows only that an argument resting on the energy
  alone cannot bound the peak, because equal energy permits an arbitrarily larger peak.
-/

namespace Energy

/-- The discrete energy: the sum of squared components. -/
def energy (v : List Nat) : Nat := (v.map (fun x => x * x)).foldl (· + ·) 0

/-- The peak: the largest component. -/
def peak (v : List Nat) : Nat := v.foldl max 0

/-- k² components equal to 1. -/
def spread (k : Nat) : List Nat := List.replicate (k * k) 1

/-- One component k, then k² − 1 zeros. -/
def spike (k : Nat) : List Nat := k :: List.replicate (k * k - 1) 0

set_option maxRecDepth 100000 in
/-- Same length, same energy, k times the peak: for every k from 1 to 8. -/
theorem same_energy_larger_peak :
    ∀ k, k < 9 → 1 ≤ k →
      (spike k).length = (spread k).length ∧ energy (spike k) = energy (spread k) ∧ peak (spike k) = k * peak (spread k) := by
  decide

set_option maxRecDepth 100000 in
/-- The spread field's peak stays 1 while its energy grows: the peak is not a function of the energy. -/
theorem spread_peak_is_one : ∀ k, k < 9 → 1 ≤ k → peak (spread k) = 1 := by decide

end Energy
