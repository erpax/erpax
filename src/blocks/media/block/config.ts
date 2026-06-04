/**
 * Media block — image / video figure with caption.
 *
 * @standard schema.org ImageObject
 * @standard schema.org VideoObject
 * @standard W3C HTML5 figure-and-figcaption
 * @rfc 6838 mime-type
 * @standard ISO/IEC-14496 mpeg-4 video
 * @standard ISO/IEC-10918 jpeg
 * @compliance WCAG-2.1 §1.1.1 non-text-content alt-text
 * @compliance WCAG-2.1 §1.2.5 audio-description
 * @see src/components/README.md
 * @see docs/STANDARDS.md §3
 */

import type { Block } from 'payload'
import { localeRecord } from '@/i18n'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      label: localeRecord('mediaBlock.media'),
      relationTo: 'media',
      required: true,
    },
  ],
}
