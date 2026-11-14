/**
 * The two discriminators the collapse reveals — position 1 ([[field]]) of the
 * `1·2·4·8` build arc. Every collection that sprawled into bespoke columns
 * folds back through exactly two context-keys on the content-uuid:
 *
 *   `type`  — what a thing IS   → STI subtype discriminator   (see [[sti]])
 *   `role`  — how a thing RELATES → party-role context         (see [[party]], [[tags]])
 *
 * Both are reusable field-factories applied uniformly, never re-rolled per
 * collection — the matter-twin of the `sti`/`party` skills.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @quality ISO-25010 maintainability single-discriminator-vocabulary
 * @see src/types/sti/index.ts (the typed-STI discriminated-union overlay)
 * @see .claude/skills/sti/SKILL.md · .claude/skills/party/SKILL.md
 */

import type { CollectionSlug, Field } from 'payload'

type Option = { label: string; value: string }
const toOptions = (xs: ReadonlyArray<Option | string>): Option[] =>
  xs.map((x) => (typeof x === 'string' ? { label: x, value: x } : x))
