import type { Field } from 'payload'

/**
 * NACE Rev.2 economic activity code text field (e.g. `62.01`).
 * Companion section enum lives in `src/nace/rev2/index.ts`.
 *
 * @standard EU Regulation (EC) No 1893/2006 NACE Rev.2
 */
export const naceCodeField = (
  opts: { name?: string; description?: string } = {},
): Field => ({
  name: opts.name ?? 'naceCode',
  type: 'text',
  admin: {
    description:
      opts.description ??
      'NACE Rev.2 economic activity code (e.g. `62.01`). Used by EU CSRD ESRS 2 §80(b) sector classification.',
  },
});
