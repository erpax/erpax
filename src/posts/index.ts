import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  CodeBlock,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { createMembershipAdminMutateAccess } from '@/membership/admin/mutate/access'
import { tenantScopedPostsReadAccess } from '@/tenant/scoped/read'
import { documentPreviewAdmin } from '@/shareds'
import { defaultVersionedDrafts } from '@/shareds'
import { codeLanguages, documentFeatures } from '@/default/lexical'
import { Banner, Code, MediaBlock } from '@/blocks/config'
import { ensureUniqueSlugWithinTenant } from '@/hooks/fields/shared/ensureUniqueSlugWithinTenant'
import { postsBeforeChange } from '@/posts/hooks'
import { populateAuthors } from '@/posts/hooks'
import { revalidateDelete, revalidatePost } from '@/posts/hooks'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'
import { localeRecord } from '@/i18n'
import { fillSeo, markdownField, publishedStates } from '@/seed/content'

/**
 * Posts — CMS articles with versioned drafts and tenant-scoped read.
 *
 * @rfc 3986 uri slug-to-url
 * @standard schema.org Article
 * @standard schema.org BlogPosting
 * @standard W3C HTML5 Living Standard
 * @standard BCP-47 language-tag i18n-routing
 * @standard ECMA-402 internationalization-api
 * @compliance WCAG-2.1 level-AA accessibility
 * @see docs/STANDARDS.md §3
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: localeRecord('posts.singular'),
    plural: localeRecord('posts.plural'),
  },
  access: {
    create: createMembershipAdminMutateAccess('posts'),
    delete: createMembershipAdminMutateAccess('posts'),
    read: tenantScopedPostsReadAccess,
    update: createMembershipAdminMutateAccess('posts'),
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  /** Query presets on `_status`, `publishedAt` — future publishes use Payload scheduled publishing (see `versions.drafts`). */
  enableQueryPresets: true,
  admin: {
    defaultColumns: ['title', 'slug', '_status', 'publishedAt', 'updatedAt'],
    ...documentPreviewAdmin('posts'),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: localeRecord('posts.title'),
      localized: true,
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              label: localeRecord('posts.heroImage'),
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    ...documentFeatures(),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock, CodeBlock({ slug: 'Fence', languages: codeLanguages(), defaultLanguage: 'plaintext' })] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
            markdownField('content'),
          ],
          label: localeRecord('tab.content'),
        },
        {
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              label: localeRecord('posts.relatedPosts'),
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              type: 'relationship',
              label: localeRecord('posts.categories'),
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
            {
              name: 'pages',
              type: 'relationship',
              admin: {
                position: 'sidebar',
                description: 'The nested pages (documents) this publication is based on.',
              },
              hasMany: true,
              relationTo: 'pages',
            },
            {
              name: 'variants',
              type: 'relationship',
              admin: {
                position: 'sidebar',
                description: 'The product variants this publication is based on.',
              },
              hasMany: true,
              relationTo: 'variants',
            },
          ],
          label: localeRecord('tab.meta'),
        },
        {
          name: 'meta',
          label: localeRecord('tab.seo'),
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: { validate: publishedStates('title') },
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({ overrides: { validate: publishedStates('description') } }),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'seed',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Content address of the seed row this document was loaded from — an unchanged row is not rewritten.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: localeRecord('posts.publishedAt'),
      index: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      label: localeRecord('posts.authors'),
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      label: localeRecord('posts.populatedAuthors'),
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
          label: localeRecord('posts.authorId'),
        },
        {
          name: 'name',
          type: 'text',
          label: localeRecord('posts.authorName'),
        },
      ],
    },
    slugField({
      disableUnique: true,
      overrides: (field) => {
        const slugText = field.fields?.[1]
        if (slugText && slugText.type === 'text') {
          slugText.hooks = {
            ...slugText.hooks,
            beforeValidate: [
              ...(slugText.hooks?.beforeValidate || []),
              ensureUniqueSlugWithinTenant('posts'),
            ],
          }
        }
        return field
      },
    }),
  ],
  hooks: {
    beforeValidate: [fillSeo],
    beforeChange: postsBeforeChange,
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: defaultVersionedDrafts,
}
