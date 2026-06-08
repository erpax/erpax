import type { CollectionConfig } from 'payload'

import { createMembershipAdminMutateAccess } from '@/membership/admin/mutate/access'
import { tenantScopedCollectionReadAccess } from '@/tenant/scoped/read'
import { slugField } from 'payload'
import { localeRecord } from '@/i18n'

import { ensureUniqueSlugWithinTenant } from '@/ensure/unique/slug/within/tenant'
import { categoriesBeforeChange } from '@/categories/hooks'

/**
 * Categories — taxonomy for posts/products with per-tenant slug uniqueness.
 *
 * @rfc 3986 uri slug-to-url
 * @standard schema.org Category
 * @standard schema.org DefinedTerm taxonomic-term
 * @see docs/STANDARDS.md §3
 */
export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: localeRecord('categories.singular'),
    plural: localeRecord('categories.plural'),
  },
  access: {
    create: createMembershipAdminMutateAccess('categories'),
    delete: createMembershipAdminMutateAccess('categories'),
    read: tenantScopedCollectionReadAccess,
    update: createMembershipAdminMutateAccess('categories'),
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: localeRecord('categories.title'),
      required: true,
    },
    slugField({
      position: undefined,
      disableUnique: true,
      overrides: (field) => {
        const slugText = field.fields?.[1]
        if (slugText && slugText.type === 'text') {
          slugText.hooks = {
            ...slugText.hooks,
            beforeValidate: [
              ...(slugText.hooks?.beforeValidate || []),
              ensureUniqueSlugWithinTenant('categories'),
            ],
          }
        }
        return field
      },
    }),
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Parent Category',
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
          relationTo: 'categories',
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
    beforeChange: categoriesBeforeChange,
  },
}
