/**
 * Code block — syntax-highlighted source-code snippet.
 *
 * @standard schema.org SoftwareSourceCode
 * @standard W3C HTML5 pre-and-code-elements
 * @standard ECMA-262 ECMAScript language-token
 * @compliance WCAG-2.1 §1.4.10 reflow horizontal-scroll
 * @see src/components/README.md
 * @see docs/STANDARDS.md §3
 */

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
