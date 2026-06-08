/**
 * Header global config — site-wide navigation + brand mark.
 *
 * @standard schema.org WPHeader
 * @standard W3C HTML5 header-element
 * @standard WAI-ARIA 1.2 banner-landmark-role
 * @compliance WCAG-2.1 §2.4.1 bypass-blocks skip-link
 * @standard BCP-47 language-tag
 * @see src/components/README.md
 * @see docs/STANDARDS.md §3
 */

import type { GlobalConfig } from 'payload'

import { link } from '@/link'
import { localeRecord } from '@/i18n'
import { revalidateHeader } from './hook/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: localeRecord('header.global'),
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: localeRecord('header.navItems'),
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
