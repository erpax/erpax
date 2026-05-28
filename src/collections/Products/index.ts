import { CallToAction } from '../../components/blocks/CallToAction/config'
import { Content } from '../../components/blocks/Content/config'
import { MediaBlock } from '../../components/blocks/MediaBlock/config'
import { slugField } from 'payload'
import type { PayloadRequest } from 'payload'
import { generatePreviewPath } from '../../standards/rfc-3986/generate-preview-path'
import type { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { DefaultDocumentIDType, Where } from 'payload'
import { localeRecord } from '../../i18n'

import { productsBeforeChange } from './hooks/beforeChange'

/**
 * Products — ecommerce-plugin product override (variants, pricing, SEO).
 *
 * @standard schema.org Product
 * @standard GS1 GTIN global-trade-item-number
 * @standard UN-CEFACT UNSPSC product-classification
 * @standard ISO-4217:2015 currency-codes
 * @standard BCP-47 language-tag i18n
 * @rfc 3986 uri slug-to-url
 * @compliance WCAG-2.1 level-AA accessibility
 * @see docs/STANDARDS.md §3
 */
export const ProductsCollection: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  admin: {
    ...defaultCollection?.admin,
    defaultColumns: ['title', 'enableVariants', '_status', 'variants.variants'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'products',
          req: req as PayloadRequest,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'products',
        req: req as PayloadRequest,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    ...defaultCollection?.defaultPopulate,
    title: true,
    slug: true,
    variantOptions: true,
    variants: true,
    enableVariants: true,
    gallery: true,
    // Currency-agnostic: pull the canonical EUR column the ecommerce plugin
    // generates per Slice WW (single supported currency = EUR). Application
    // code reads via `getProductPrice()` from `@/utilities/productPrice`.
    priceInEUR: true,
    inventory: true,
    meta: true,
  },
  fields: [
    { name: 'title', type: 'text', label: localeRecord('products.title'), required: true },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: false,
            },
            {
              name: 'gallery',
              type: 'array',
              label: localeRecord('products.gallery'),
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: localeRecord('products.image'),
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'variantOption',
                  type: 'relationship',
                  label: localeRecord('products.variantOption'),
                  relationTo: 'variantOptions',
                  admin: {
                    condition: (data) => {
                      return data?.enableVariants === true && data?.variantTypes?.length > 0
                    },
                  },
                  filterOptions: ({ data }) => {
                    if (data?.enableVariants && data?.variantTypes?.length) {
                      const variantTypeIDs = data.variantTypes.map((item: unknown) => {
                        if (typeof item === 'object' && item !== null && 'id' in item) {
                          return (item as { id: DefaultDocumentIDType }).id
                        }
                        return item
                      }) as DefaultDocumentIDType[]

                      if (variantTypeIDs.length === 0)
                        return {
                          variantType: {
                            in: [],
                          },
                        }

                      const query: Where = {
                        variantType: {
                          in: variantTypeIDs,
                        },
                      }

                      return query
                    }

                    return {
                      variantType: {
                        in: [],
                      },
                    }
                  },
                },
              ],
            },

            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock],
            },
          ],
          label: localeRecord('tab.content'),
        },
        {
          fields: [
            ...defaultCollection.fields,
            {
              name: 'relatedProducts',
              type: 'relationship',
              label: localeRecord('products.relatedProducts'),
              filterOptions: ({ id }) => {
                if (id) {
                  return {
                    id: {
                      not_in: [id],
                    },
                  }
                }

                return {
                  id: {
                    exists: true,
                  },
                }
              },
              hasMany: true,
              relationTo: 'products',
            },
          ],
          label: localeRecord('tab.productDetails'),
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
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      label: localeRecord('products.categories'),
      admin: {
        position: 'sidebar',
        sortOptions: 'title',
      },
      hasMany: true,
      relationTo: 'categories',
    },
    slugField(),
  ],
  hooks: {
    ...defaultCollection.hooks,
    beforeChange: productsBeforeChange(defaultCollection),
  },
})
