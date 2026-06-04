/**
 * Form block — embedded form-builder form on a page.
 *
 * @standard W3C HTML5 form-validation
 * @standard WAI-ARIA 1.2 form-roles
 * @rfc 5322 internet-message-format email-field-format
 * @compliance WCAG-2.1 §1.3.5 identify-input-purpose
 * @compliance WCAG-2.1 §3.3.1 error-identification
 * @compliance WCAG-2.1 §3.3.2 labels-or-instructions
 * @compliance GDPR Art.6(1)(a) consent
 * @see src/components/README.md
 * @see docs/STANDARDS.md §3
 */

import type { Block } from 'payload'

import { localeRecord } from '@/i18n'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: localeRecord('formBlock.enableIntro'),
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
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
      label: localeRecord('formBlock.introContent'),
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: localeRecord('formBlock.plural'),
    singular: localeRecord('formBlock.singular'),
  },
}
