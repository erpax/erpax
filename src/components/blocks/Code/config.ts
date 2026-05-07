import type { Block } from 'payload'

import { localeRecord } from '@/i18n'

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
          label: localeRecord('code.typescript'),
          value: 'typescript',
        },
        {
          label: localeRecord('code.javascript'),
          value: 'javascript',
        },
        {
          label: localeRecord('code.css'),
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
