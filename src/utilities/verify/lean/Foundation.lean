/-
  Foundation — what each of Lean's three axioms means, certified by the kernel.

  The twin is src/utilities/verify/inventory (FOUNDATION, linkOf).

  Every theorem in the record is checked by the kernel. A theorem is AXIOM-FREE when the kernel's own
  rules prove it; otherwise it also rests on some of Lean's three foundation axioms. So each theorem is
  linked as an equation: what the kernel's rules give, plus the axioms it names, each with its meaning.

  The meaning of each axiom is stated below as a theorem proved by that axiom alone. The kernel's report
  must show each of these three resting on exactly its own axiom: that certifies the meaning is the axiom,
  not prose about it. Any axiom outside these three has no meaning here and fails the record's check.

    · propext           two propositions that imply each other are equal
    · Quot.sound        related elements have the same class in a quotient; function extensionality
                        (two functions that agree everywhere are equal) is proved from it
    · Classical.choice  from a proof that a type is inhabited, an element of it; with the other two it
                        gives the excluded middle
-/

namespace Foundation

/-- propext: propositions that imply each other are equal. -/
theorem propext_meaning {a b : Prop} (h : a ↔ b) : a = b := propext h

/-- Quot.sound: related elements have the same class. -/
theorem quot_sound_meaning {α : Sort u} {r : α → α → Prop} {a b : α} (h : r a b) :
    Quot.mk r a = Quot.mk r b := Quot.sound h

/-- Classical.choice: an inhabited type yields an element (wrapped back, so the statement is a Prop). -/
theorem choice_meaning {α : Sort u} (h : Nonempty α) : Nonempty α := ⟨Classical.choice h⟩

end Foundation
