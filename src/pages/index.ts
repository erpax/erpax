import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '@/authenticated/or/published'
import { Archive, CallToAction, Content, FormBlock, MediaBlock } from '@/blocks/config'
import { hero } from '@/hero'
import { slugField } from 'payload'
import { documentPreviewAdmin } from '@/shareds'
import { defaultVersionedDrafts } from '@/shareds'
import { superAdminOrTenantAdminAccess } from '@/pages/access'
import { ensureUniqueSlugWithinTenant } from '@/ensure/unique/slug/within/tenant'
import { pagesBeforeChange } from '@/pages/hooks'
import { revalidateDelete, revalidatePage } from '@/pages/hooks'
import { localeRecord } from '@/i18n'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

/**
 * Pages — CMS pages with versioned drafts and per-tenant slug uniqueness.
 *
 * @rfc 3986 uri slug-to-url
 * @standard schema.org WebPage
 * @standard W3C HTML5 Living Standard
 * @standard BCP-47 language-tag i18n-routing
 * @standard ECMA-402 internationalization-api
 * @compliance WCAG-2.1 level-AA accessibility
 * @see docs/STANDARDS.md §3
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: localeRecord('pages.singular'),
    plural: localeRecord('pages.plural'),
  },
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: authenticatedOrPublished,
    update: superAdminOrTenantAdminAccess,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  enableQueryPresets: true,
  admin: {
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    ...documentPreviewAdmin('pages'),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: localeRecord('pages.title'),
      localized: true,
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: localeRecord('tab.hero'),
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: localeRecord('pages.layout'),
              localized: true,
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: localeRecord('tab.content'),
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
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
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
      name: 'publishedAt',
      type: 'date',
      label: localeRecord('pages.publishedAt'),
      index: true,
      admin: {
        position: 'sidebar',
      },
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
              ensureUniqueSlugWithinTenant('pages'),
            ],
          }
        }
        return field
      },
    }),
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Parent Page',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      admin: {
        hidden: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'doc',
          type: 'relationship',
          relationTo: 'pages',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: pagesBeforeChange,
    afterDelete: [revalidateDelete],
  },
  versions: defaultVersionedDrafts,
}
