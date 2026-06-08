/**
 * Footer global config — site-wide colophon + secondary navigation.
 *
 * @standard schema.org WPFooter
 * @standard W3C HTML5 footer-element
 * @standard WAI-ARIA 1.2 contentinfo-landmark-role
 * @standard BCP-47 language-tag
 * @see src/components/README.md
 * @see docs/STANDARDS.md §3
 */

import type { GlobalConfig } from 'payload'

import { link } from '@/link/field'
import { localeRecord } from '@/i18n'
import { revalidateFooter } from './hook/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: localeRecord('footer.global'),
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: localeRecord('footer.navItems'),
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
