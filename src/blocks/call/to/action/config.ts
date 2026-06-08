/**
 * Call-to-action block — promoted link group + supporting copy.
 *
 * @standard schema.org Action
 * @standard W3C HTML5 anchor-element
 * @rfc 3986 uniform-resource-identifier
 * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
 * @compliance WCAG-2.1 §2.4.6 headings-and-labels
 * @see src/components/README.md
 * @see docs/STANDARDS.md §3
 */

import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/link'
import { localeRecord } from '@/i18n'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
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
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: localeRecord('cta.plural'),
    singular: localeRecord('cta.singular'),
  },
}
