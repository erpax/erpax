import type { Block } from 'payload'

import { t } from '@/i18n'

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        {
          label: t('code.typescript'),
          value: 'typescript',
        },
        {
          label: t('code.javascript'),
          value: 'javascript',
        },
        {
          label: t('code.css'),
          value: 'css',
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
    },
  ],
}
