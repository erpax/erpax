/-
  Uuid — the v8 layout is a partition, and the sixteen program bits round-trip in both directions.

  The twin is encodeStructured / decodeStructured in src/uuid/format. A uuid there is not a handle
  to a record: its 128 bits ARE the record, read back with no side-table.

    bits  0..47   message   content digest (48 bits)
    bits 48..51   VERSION   8 — RFC 9562 §4.2, immovable
    bits 52..63   message   content digest (12 bits)
    bits 64..65   VARIANT   0b10 — RFC 4122 §4.1.2, immovable
    bits 66..81   program   slot tag (4) · capability flags (8) · schema version (4)
    bits 82..127  message   content digest (46 bits)

  Two different things can silently go wrong, so two different things are proved.

  THE LAYOUT — every one of the 128 bits belongs to exactly one band, so the program can never be
  widened over the version or variant bits. A uuid that loses those is not a uuid, and nothing
  downstream would say so.

  THE ROUND TRIP, BOTH WAYS — and the two directions are NOT the same statement. Packing asks: given
  fields in range, does the decoder read back what the encoder was given? Unpacking asks the converse:
  given any 16-bit word, do the three fields it decodes to re-pack to exactly that word? The first
  admits an unbounded slot and is bounded below by its neighbours; the second is bounded by the word
  and says the decode loses nothing. A layout can satisfy one and fail the other — a decoder that
  masked a bit off would pass the first for every value and fail the second — which is why both are here.

  AXIOM FOOTPRINT, stated rather than implied. The layout theorems are decided over a finite domain
  and depend on NO axioms. The arithmetic theorems quantify over unbounded Nat, so they reach for
  core's division lemmas and carry `propext` (and `Quot.sound`) with them — Lean's own logic, not a
  `sorry` and not `native_decide`'s `ofReduceBool`, which would trust the compiler instead of the
  kernel. Proving them axiom-free needs 65,536 kernel cases per theorem; measured at over four
  minutes for one, and a proof nobody will wait for is a proof nobody runs.

  What is proved is the PARTITION and the PACKING, never that the digest is honest — that the program
  bits are also hashed into the message digest is src/uuid/format's doing, and no theorem here can
  make a forged digest verify.
-/

namespace Uuid

/-- The four bands, as the decoder reads them. -/
def versionBand (i : Nat) : Bool := 48 ≤ i && i ≤ 51
def variantBand (i : Nat) : Bool := 64 ≤ i && i ≤ 65
def programBand (i : Nat) : Bool := 66 ≤ i && i ≤ 81
def messageBand (i : Nat) : Bool := i ≤ 47 || (52 ≤ i && i ≤ 63) || (82 ≤ i && i ≤ 127)

/-- Exactly one band claims a bit. -/
def claimedOnce (i : Nat) : Bool :=
  (if versionBand i then 1 else 0) + (if variantBand i then 1 else 0)
    + (if programBand i then 1 else 0) + (if messageBand i then 1 else 0) == 1

/-- The layout is a PARTITION of all 128 bits: no bit is homeless, no bit is claimed twice. -/
theorem every_bit_has_exactly_one_band : ∀ i, i < 128 → claimedOnce i = true := by decide

/-- The program can never be read out of the bits the RFC owns. -/
theorem program_never_touches_the_fixed_bits :
    ∀ i, i < 128 → programBand i = true → versionBand i = false ∧ variantBand i = false := by decide

/-- Nor can the message — a digest bit overlapping version or variant would decode as content. -/
theorem message_never_touches_the_fixed_bits :
    ∀ i, i < 128 → messageBand i = true → versionBand i = false ∧ variantBand i = false := by decide

/-- The program is sixteen bits. Every bit it takes is a bit the digest does not have. -/
theorem the_program_is_sixteen_bits :
    ((List.range 128).filter programBand).length = 16 := by decide

/-- The message is 106 bits — 128 less the 4 version bits, the 2 variant bits and the 16 program bits. -/
theorem the_message_is_one_hundred_six_bits :
    ((List.range 128).filter messageBand).length = 106 := by decide

/-- The program band packed as one 16-bit word: slot ‖ capabilities ‖ schema. -/
def pack (slot capabilities schema : Nat) : Nat := slot * 4096 + capabilities * 16 + schema

def slotOf (w : Nat) : Nat := w / 4096
def capabilitiesOf (w : Nat) : Nat := (w / 16) % 256
def schemaOf (w : Nat) : Nat := w % 16

/-- Forward: what the decoder reads is what the encoder was given. Each theorem carries only the
    bounds it needs — the slot sits at the TOP of the word, so its own size never enters; what could
    corrupt it is a neighbour overflowing upward into it. -/
theorem slot_round_trips (slot capabilities schema : Nat)
    (hc : capabilities < 256) (hv : schema < 16) :
    slotOf (pack slot capabilities schema) = slot := by
  unfold slotOf pack; omega

theorem capabilities_round_trip (slot capabilities schema : Nat)
    (hc : capabilities < 256) (hv : schema < 16) :
    capabilitiesOf (pack slot capabilities schema) = capabilities := by
  unfold capabilitiesOf pack; omega

theorem schema_round_trips (slot capabilities schema : Nat) (hv : schema < 16) :
    schemaOf (pack slot capabilities schema) = schema := by
  unfold schemaOf pack; omega

/-- The asymmetric converse: every 16-bit word re-packs from the three fields it decodes to, so the
    decode drops nothing. A decoder that masked a bit away would satisfy every theorem above and fail
    this one.

    It needs NO bound on the word, and that is the sharper statement: the three extractors partition the
    value, so re-packing is the identity for any w. The 16-bit bound belongs to the FORWARD direction
    only, where it is what keeps neighbouring fields from colliding. -/
theorem the_decode_loses_nothing (w : Nat) :
    pack (slotOf w) (capabilitiesOf w) (schemaOf w) = w := by
  unfold pack slotOf capabilitiesOf schemaOf; omega

/-- The packed program never overflows its sixteen bits, so it cannot reach the message. -/
theorem the_program_fits (slot capabilities schema : Nat)
    (hs : slot < 16) (hc : capabilities < 256) (hv : schema < 16) :
    pack slot capabilities schema < 65536 := by
  unfold pack; omega

end Uuid
