/**
 * Affect block — feeling, thought and emotion turning as one loop, drawn in CSS.
 *
 * The algebra is src/utilities/affect (proved in src/utilities/verify/lean/Affect.lean and
 * Observer.lean): three turns come back, the flip reverses valence at every corner, and the centre
 * is the one point the turning leaves still. The words on the wheel are the editor's data.
 *
 * @compliance WCAG-2.1 §2.3.3 animation-from-interactions (honours prefers-reduced-motion)
 * @compliance WCAG-2.1 §1.1.1 non-text-content (the figure carries a text caption)
 */
import type { Block } from 'payload'

export const Affect: Block = {
  slug: 'affect',
  interfaceName: 'AffectBlock',
  fields: [
    { name: 'feeling', type: 'text', defaultValue: 'Feeling', required: true },
    { name: 'thought', type: 'text', defaultValue: 'Thought', required: true },
    { name: 'emotion', type: 'text', defaultValue: 'Emotion', required: true },
    {
      name: 'direction',
      type: 'select',
      defaultValue: 'forward',
      required: true,
      options: [
        { label: 'Feeling → thought → emotion', value: 'forward' },
        { label: 'Emotion → thought → feeling', value: 'backward' },
      ],
    },
    {
      name: 'valence',
      type: 'select',
      defaultValue: 'pleasant',
      required: true,
      options: [
        { label: 'Pleasant', value: 'pleasant' },
        { label: 'Unpleasant', value: 'unpleasant' },
      ],
    },
  ],
}
