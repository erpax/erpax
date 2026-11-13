/**
 * Default Lexical editor — base feature set + link validation rules.
 *
 * @standard W3C HTML5 Living Standard rich-text-output
 * @standard CommonMark 0.31 markdown-fallback
 * @rfc 3986 uniform-resource-identifier link-fields
 * @standard BCP-47 language-tag locale-aware-content
 * @compliance WCAG-2.1 level-AA accessibility
 * @standard schema.org HTMLRichText
 * @see docs/STANDARDS.md §3 §4.3
 */

import type { TextFieldSingleValidation } from 'payload'
import {
  BlockquoteFeature,
  EXPERIMENTAL_TableFeature,
  InlineCodeFeature,
  OrderedListFeature,
  UnorderedListFeature,
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

/**
 * What a DOCUMENT needs beyond a marketing paragraph: lists, tables, inline code and quotes. The
 * nested pages and the posts hold seeded documents written in markdown, and a feature the editor
 * does not carry is a construct the markdown converter leaves as raw text.
 */
/**
 * The fence languages a document may carry, keyed as authors write them (`ts`, not `typescript`):
 * a fence whose language is not listed here fails validation, so the list is the short names
 * markdown actually uses. A fence with no language is plain text.
 */
export const codeLanguages = (): Record<string, string> => ({
  plaintext: 'Plain text', txt: 'Text', ts: 'TypeScript', tsx: 'TSX', js: 'JavaScript', jsx: 'JSX',
  typescript: 'TypeScript', javascript: 'JavaScript', json: 'JSON', jsonc: 'JSON with comments',
  bash: 'Shell', sh: 'Shell', shell: 'Shell', zsh: 'Shell', sql: 'SQL', graphql: 'GraphQL',
  yaml: 'YAML', yml: 'YAML', toml: 'TOML', css: 'CSS', scss: 'SCSS', html: 'HTML', xml: 'XML',
  md: 'Markdown', markdown: 'Markdown', mdx: 'MDX', diff: 'Diff', lean: 'Lean', python: 'Python',
  ruby: 'Ruby', rust: 'Rust', go: 'Go', dockerfile: 'Dockerfile', ini: 'INI', text: 'Text',
})

export const documentFeatures = () => [
  UnorderedListFeature(),
  OrderedListFeature(),
  InlineCodeFeature(),
  BlockquoteFeature(),
  EXPERIMENTAL_TableFeature(),
]

export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
  ],
})

/** @index-cross.foldback child=default/lexical parent=default — this cross folds back into its parent. */
