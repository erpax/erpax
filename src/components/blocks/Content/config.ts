/**
 * Content block — multi-column rich-text + optional inline link.
 *
 * @standard W3C HTML5 article-section-elements
 * @standard schema.org WebPageElement
 * @standard CommonMark 0.31 markdown-fallback
 * @compliance WCAG-2.1 §1.3.1 info-and-relationships
 * @compliance WCAG-2.1 §1.4.10 reflow
 * @see src/components/README.md
 * @see docs/STANDARDS.md §3
 */

import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { localeRecord } from '@/i18n'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: localeRecord('contentBlock.oneThird'),
        value: 'oneThird',
      },
      {
        label: localeRecord('contentBlock.half'),
        value: 'half',
      },
      {
        label: localeRecord('contentBlock.twoThirds'),
        value: 'twoThirds',
      },
      {
        label: localeRecord('contentBlock.full'),
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: localeRecord('contentBlock.enableLink'),
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: localeRecord('contentBlock.columns'),
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
