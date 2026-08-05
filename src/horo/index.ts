/**
 * horo — the seven-position state ring, the erpax matter-twin of
 * `svilena-me/.vitepress/horo-band.js`.
 *
 * Every flow/lifecycle STATE in erpax lives on one ring: the measure-order
 * digits `[1,2,4,8,7,5,9]` (base·share·weave·crest·descent·round·unity) — the
 * multiplicative subgroup of Z/9Z minus the control triad {3,6} (the triad
 * 3·6·9·0 GOVERNS — access/hooks/auth/config — it is not a flow state). States
 * are limited to these positions, ordered, and position-decoded: the digit IS
 * the meaning. Content at a position is optional; the ring defines the slots,
 * and anything off-ring is "escape" — disharmony the validator (and the
 * generated payload-types) surface immediately.
 *
 * The group is CLOSED: two states compose to a third on the same ring
 * (`composeSteps`). 9 (unity/close) mirror-twins 10 (next ring's 1/base), so a
 * close is the next octave's open (`nextOctave`, `isMergePoint`) — the
 * accounting period close→open, the lifecycle seal→begin. Fractal inward
 * (state×state) and outward (octave ×10).
 *
 * This atom is structured into 4 semantic children (constants, arithmetic, ring, geometry),
 * each addressable, each sealed with trinity proof. The parent is a pure barrel.
 *
 * @standard ISO-16:1975 a432-tuning-reference (the anchor; value from position)
 * @quality ISO-25010 maintainability bounded-stable-state-space
 * @see ~/github/ceccec/svilena-me/.vitepress/horo-band.js (the source twin)
 * @see ~/github/ceccec/svilena-me/.claude/skills/HORO.md
 * @see src/sti/index.ts (`type` = what a thing IS; the horo step = where in the flow)
 */

// Facade: re-export all public symbols from semantic children
export * from './constants'
export * from './arithmetic'
export * from './ring'
export * from './geometry'
