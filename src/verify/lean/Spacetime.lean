/-
  Spacetime — the decidable core of special relativity, and the one theorem in it that
  a distributed ledger actually needs.

  Natural units: c = 1. A separation between two events is (t, x) : Int × Int, meaning
  Δt and Δx. Signature (+,-), so the interval is positive for timelike separation.

  A Lorentz boost by rational velocity β = p/q is applied UNNORMALIZED — without the
  factor γ = q/√(q²-p²), which is irrational for almost every β and would drag this
  development into the reals for no gain. Dropping it multiplies the interval by the
  POSITIVE integer q²-p², so every claim about SIGN — timelike vs spacelike, before vs
  after — is untouched. Those signs are the entire causal content.

  Everything here is proved for all integers, not checked on a carrier.
-/

namespace Spacetime

/-! ## 0. Two facts about squares, so nothing below has to reason nonlinearly

  `grind` proves ring identities over `Int` but does not multiply inequalities. Every
  nonlinear step in this file is one of these two, and each is proved by FACTORING —
  b² - a² = (b-a)(b+a) — so the tactic only ever sees a product of things known positive.
-/

/-- Inside the band ⇒ smaller square. -/
theorem sq_lt (a b : Int) (hl : -b < a) (hr : a < b) : a*a < b*b := by
  have h1 : 0 < b - a := by omega
  have h2 : 0 < b + a := by omega
  have hp : 0 < (b - a) * (b + a) := Int.mul_pos h1 h2
  grind

/-- Smaller square (with b positive) ⇒ inside the band. This is the direction that needs care. -/
theorem lt_of_sq (a b : Int) (hb : 0 < b) (h : a*a < b*b) : -b < a ∧ a < b := by
  have hp : 0 < (b - a) * (b + a) := by grind
  refine ⟨?_, ?_⟩
  · -- a ≤ -b would make (b+a) ≤ 0 while (b-a) ≥ 0: the product cannot then be positive
    by_cases hc : -b < a
    · exact hc
    · exact absurd (Int.mul_nonneg (by omega : (0:Int) ≤ b - a) (by omega : (0:Int) ≤ -(b + a)))
        (by grind)
  · -- a ≥ b would make (b-a) ≤ 0 while (b+a) ≥ 0: the same contradiction, mirrored
    by_cases hc : a < b
    · exact hc
    · exact absurd (Int.mul_nonneg (by omega : (0:Int) ≤ -(b - a)) (by omega : (0:Int) ≤ b + a))
        (by grind)

/-- The Minkowski interval, signature (+,-): positive is timelike, zero is null. -/
def interval (t x : Int) : Int := t*t - x*x

/-- Boost by β = p/q, unnormalized (the positive factor γ/q is dropped). -/
def boostT (p q t x : Int) : Int := q*t - p*x
def boostX (p q t x : Int) : Int := q*x - p*t

/-- A physical boost: q > 0 and |β| = |p|/q < 1. Nothing here is a frame at or above c. -/
def subluminal (p q : Int) : Prop := 0 < q ∧ -q < p ∧ p < q

/-! ## 1. The interval is invariant up to a positive scale -/

theorem interval_scales (p q t x : Int) :
    interval (boostT p q t x) (boostX p q t x) = (q*q - p*p) * interval t x := by
  unfold interval boostT boostX; grind

theorem scale_positive (p q : Int) (h : subluminal p q) : 0 < q*q - p*p := by
  obtain ⟨_, hl, hr⟩ := h
  have := sq_lt p q hl hr; omega

/-! ## 2. Causal character is absolute — the light cone is not a matter of opinion -/

/-- Timelike stays timelike in every subluminal frame. -/
theorem timelike_invariant (p q t x : Int) (h : subluminal p q) (ht : 0 < interval t x) :
    0 < interval (boostT p q t x) (boostX p q t x) := by
  have hs := scale_positive p q h
  rw [interval_scales]; exact Int.mul_pos hs ht

/-- Spacelike stays spacelike. No boost can make a spacelike separation reachable. -/
theorem spacelike_invariant (p q t x : Int) (h : subluminal p q) (ht : interval t x < 0) :
    interval (boostT p q t x) (boostX p q t x) < 0 := by
  have hs := scale_positive p q h
  rw [interval_scales]; exact Int.mul_neg_of_pos_of_neg hs ht

/-- The light cone itself is frame-independent: null in one frame is null in all. -/
theorem null_invariant (p q t x : Int) (ht : interval t x = 0) :
    interval (boostT p q t x) (boostX p q t x) = 0 := by
  rw [interval_scales, ht]; grind

/-! ## 3. Time ORDER — the theorem the ledger rests on -/

/--
  For a TIMELIKE separation, every subluminal observer agrees which event came first.

  This is the whole basis of a causally-ordered log: if one event could have caused the
  other, their order is not a matter of frame.
-/
theorem timelike_order_absolute (p q t x : Int) (h : subluminal p q)
    (hfuture : 0 < t) (hcausal : x*x ≤ t*t) :
    0 < boostT p q t x := by
  obtain ⟨hq, hl, hr⟩ := h
  -- The CLOSED cone: |x| ≤ t. The null case |x| = t is in on purpose, and a TEST is what put
  -- it there: `sealable` was first written strict, and every frame agreed on exactly the null
  -- separations it excluded. A light signal carries causation, so its order is absolute too.
  have hband : -t ≤ x ∧ x ≤ t := by
    refine ⟨?_, ?_⟩
    · by_cases hc : -t ≤ x
      · exact hc
      · exact absurd (Int.mul_pos (by omega : (0:Int) < t - x) (by omega : (0:Int) < -(t + x)))
          (by grind)
    · by_cases hc : x ≤ t
      · exact hc
      · exact absurd (Int.mul_pos (by omega : (0:Int) < -(t - x)) (by omega : (0:Int) < t + x))
          (by grind)
  obtain ⟨hbl, hbr⟩ := hband
  -- 2(qt - px) = (q-p)(t+x) + (q+p)(t-x). Both terms are ≥ 0, and they cannot both vanish:
  -- (t+x) + (t-x) = 2t > 0, so one of the two factors is strictly positive.
  have hA : 0 ≤ (q - p) * (t + x) := Int.mul_nonneg (by omega) (by omega)
  have hB : 0 ≤ (q + p) * (t - x) := Int.mul_nonneg (by omega) (by omega)
  have h3 : 0 < (q - p) * (t + x) + (q + p) * (t - x) := by
    by_cases hx0 : 0 < t + x
    · have : 0 < (q - p) * (t + x) := Int.mul_pos (by omega) hx0
      omega
    · have : 0 < (q + p) * (t - x) := Int.mul_pos (by omega) (by omega)
      omega
  unfold boostT; grind

/--
  For a SPACELIKE separation there is a subluminal frame in which the order REVERSES —
  exhibited, not merely asserted to exist.

  With 0 < t < x, the boost β = (2t+1)/(2x) is subluminal and sends Δt ↦ -x < 0.
-/
theorem spacelike_order_reverses (t x : Int) (ht : 0 < t) (hx : t < x) :
    subluminal (2*t+1) (2*x) ∧ boostT (2*t+1) (2*x) t x = -x := by
  refine ⟨⟨by omega, by omega, by omega⟩, ?_⟩
  unfold boostT; grind

/-- …and a frame in which they are SIMULTANEOUS: β = t/x sends Δt ↦ 0. -/
theorem spacelike_simultaneous (t x : Int) (ht : 0 < t) (hx : t < x) :
    subluminal t x ∧ boostT t x t x = 0 := by
  refine ⟨⟨by omega, by omega, by omega⟩, ?_⟩
  unfold boostT; grind

/-! ## 4. Composition of velocities never reaches c -/

/--
  β₁ ⊕ β₂ = (β₁+β₂)/(1+β₁β₂), as integer numerator and denominator.
  Two subluminal boosts compose to a subluminal boost: c is not approached by adding.
-/
def addNum (p₁ q₁ p₂ q₂ : Int) : Int := p₁*q₂ + p₂*q₁
def addDen (p₁ q₁ p₂ q₂ : Int) : Int := q₁*q₂ + p₁*p₂

theorem velocity_addition_subluminal (p₁ q₁ p₂ q₂ : Int)
    (h₁ : subluminal p₁ q₁) (h₂ : subluminal p₂ q₂) :
    subluminal (addNum p₁ q₁ p₂ q₂) (addDen p₁ q₁ p₂ q₂) := by
  obtain ⟨a, b, c⟩ := h₁; obtain ⟨d, e, f⟩ := h₂
  -- den - num = (q₁-p₁)(q₂-p₂) and den + num = (q₁+p₁)(q₂+p₂): both positive, so |num| < den
  have hm : 0 < (q₁ - p₁) * (q₂ - p₂) := Int.mul_pos (by omega) (by omega)
  have hp : 0 < (q₁ + p₁) * (q₂ + p₂) := Int.mul_pos (by omega) (by omega)
  unfold subluminal addNum addDen; grind

/-! ## 5. What this means for a ledger — the reason the development exists

  erpax seals a chain of rows, and the seal is ORDER-DEPENDENT: reversing the rows
  changes every receipt after the first and changes the root. So a ledger that seals rows
  in coordinate-time order is well-defined only where that order is frame-independent.

  Sections 3 says exactly where that is: on causal (timelike) separation and nowhere else.
  For spacelike-separated writes there is no "the" order — two honest observers disagree,
  and both are right.
-/

/-- The order relation a ledger may seal on: causally-ordered separations only. -/
def sealable (t x : Int) : Prop := 0 < t ∧ x*x ≤ t*t

/--
  Every sealable separation has one time-order for all subluminal observers,
  and no spacelike separation does.
-/
theorem ledger_order_wellposed (t x : Int) (hs : sealable t x) (p q : Int) (h : subluminal p q) :
    0 < boostT p q t x :=
  timelike_order_absolute p q t x h hs.1 hs.2

theorem spacelike_is_not_sealable (t x : Int) (ht : 0 < t) (hx : t < x) : ¬ sealable t x := by
  have : t*t < x*x := sq_lt t x (by omega) hx
  unfold sealable; omega

end Spacetime
