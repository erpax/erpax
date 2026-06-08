/**
 * Hero field config — page hero section types (high/medium/low/none).
 *
 * @standard W3C HTML5 section-element
 * @standard schema.org WebPageElement
 * @standard WAI-ARIA 1.2 region-landmark-role
 * @compliance WCAG-2.1 §1.4.3 contrast-minimum hero-overlay
 * @compliance WCAG-2.1 §2.4.6 headings-and-labels
 * @see src/components/README.md
 * @see docs/STANDARDS.md §3
 */

import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/link'
import { localeRecord } from '@/i18n'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  localized: true,
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: localeRecord('hero.type'),
      options: [
        {
          label: localeRecord('hero.none'),
          value: 'none',
        },
        {
          label: localeRecord('hero.highImpact'),
          value: 'highImpact',
        },
        {
          label: localeRecord('hero.mediumImpact'),
          value: 'mediumImpact',
        },
        {
          label: localeRecord('hero.lowImpact'),
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
