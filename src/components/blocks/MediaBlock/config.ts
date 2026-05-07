import type { Block } from 'payload'
import { t } from '@/i18n'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      label: t('mediaBlock.media'),
      relationTo: 'media',
      required: true,
    },
  ],
}
