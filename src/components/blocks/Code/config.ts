import type { Block } from 'payload'

import { PL } from '@/i18n/payloadLabels'

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
          label: PL.code.typescript,
          value: 'typescript',
        },
        {
          label: PL.code.javascript,
          value: 'javascript',
        },
        {
          label: PL.code.css,
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
