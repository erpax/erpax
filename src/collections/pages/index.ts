import type { CollectionConfig } from 'payload'

import { governedDocument, governedDocumentFields, pageRead, pageWrite } from '@/fields/group/governedDocument'
import { Archive, CallToAction, Content, FormBlock, MediaBlock } from '@/blocks/config'
import { hero } from '@/components/hero'
import { documentPreviewAdmin } from '@/utilities/shareds'
import { defaultVersionedDrafts } from '@/utilities/shareds'
import { superAdminOrTenantAdminAccess } from '@/utilities/cmspage/access'
import { pagesBeforeChange } from '@/utilities/cmspage/hooks'
import { revalidateDelete, revalidatePage } from '@/utilities/cmspage/hooks'
import { localeRecord } from '@/i18n'
import { fillSeo, publishedStates } from '@/seed/content'
import { checkLeadPage } from '@/utilities/think/document/check'

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
  llmInstructions:
    'Pages are the nested documents of a tenant. Set `parent` to a page id to nest one under another (the nested-docs plugin fills `breadcrumbs`). A page needs a `tenant`, a `title`, a `slug`, a hero and a layout of content blocks.',
  labels: {
    singular: localeRecord('pages.singular'),
    plural: localeRecord('pages.plural'),
  },
  // A website page: published → public, written by its tenant's admins. A governed page (a document
  // type, src/fields/group/governedDocument): never public, read and written by the roles its type names.
  access: {
    create: pageWrite(superAdminOrTenantAdminAccess),
    delete: pageWrite(superAdminOrTenantAdminAccess),
    read: pageRead(),
    update: pageWrite(superAdminOrTenantAdminAccess),
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
      label: localeRecord('pages.publishedAt'),
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    // Payload's native slug field; `unique` becomes (tenant, slug) through the indexes plugin.
    { name: 'slug', type: 'slug', useAsSlug: 'title', unique: true },
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
    // the governed document this page is, if any (formerly separate collections: reporting-standards, …)
    ...governedDocumentFields(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeValidate: [fillSeo, checkLeadPage],
    beforeChange: [...pagesBeforeChange, governedDocument],
    afterDelete: [revalidateDelete],
  },
  versions: defaultVersionedDrafts,
}
