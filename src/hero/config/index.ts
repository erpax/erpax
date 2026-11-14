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

import { linkGroup } from '@/link/group'
import { localeRecord } from '@/i18n'

/** @index-cross.foldback child=hero/config parent=hero — this cross folds back into its parent. */
