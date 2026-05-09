/**
 * Banner block — full-width informational notice (info / warning / error / success).
 *
 * @standard W3C HTML5 aside-element
 * @standard WAI-ARIA 1.2 status-role
 * @compliance WCAG-2.1 §1.4.3 contrast-minimum
 * @compliance WCAG-2.1 §1.3.1 info-and-relationships
 * @see src/components/README.md
 * @see docs/STANDARDS.md §3
 */

import type { Block } from 'payload'

import { localeRecord } from '@/i18n'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Banner: Block = {
  slug: 'banner',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: localeRecord('banner.info'), value: 'info' },
        { label: localeRecord('banner.warning'), value: 'warning' },
        { label: localeRecord('banner.error'), value: 'error' },
        { label: localeRecord('banner.success'), value: 'success' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: true,
    },
  ],
  interfaceName: 'BannerBlock',
}
