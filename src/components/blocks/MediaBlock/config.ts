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
