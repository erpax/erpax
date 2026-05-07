import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/components/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/components/search/beforeSync'

import localization from '@/i18n/localization'
import { t } from '@/i18n'
import { Page, Post, Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page | Product> = ({ doc }) => {
  return doc?.title ? `${doc.title} | site` : 'site'
}

const generateURL: GenerateURL<Post | Page | Product> = ({ doc }) => {
  const base = getServerSideURL()
  const loc = localization.defaultLocale

  if (!doc?.slug) {
    return `${base}/${loc}`
  }

  if ('content' in doc && doc.content) {
    return `${base}/${loc}/posts/${doc.slug}`
  }

  if ('priceInUSD' in doc || 'enableVariants' in doc) {
    return `${base}/${loc}/products/${doc.slug}`
  }

  return doc.slug === 'home' ? `${base}/${loc}` : `${base}/${loc}/${doc.slug}`
}

const translateKey =
  (key: string) =>
  ({ t }: { t: (k: string) => string }) =>
    t(`${key}`)

function localizeFormBuilderFields(defaultFields: any[]) {
  return defaultFields.map((field) => {
    if (!field || typeof field !== 'object') return field

    if (field.name === 'confirmationType' && field.type === 'radio') {
      return {
        ...field,
        label: translateKey('formConfirmationTypeLabel'),
        admin: {
          ...field.admin,
          description: translateKey('formConfirmationTypeDescription'),
        },
        options: (field.options || []).map((option: any) => {
          if (option?.value === 'message') {
            return { ...option, label: translateKey('formConfirmationMessageOption') }
          }
          if (option?.value === 'redirect') {
            return { ...option, label: translateKey('formConfirmationRedirectOption') }
          }
          return option
        }),
      }
    }

    if (field.name === 'redirect' && field.type === 'group') {
      return {
        ...field,
        label: translateKey('formRedirectLabel'),
        fields: (field.fields || []).map((subField: any) => {
          if (subField?.name === 'type' && subField.type === 'radio') {
            return {
              ...subField,
              options: (subField.options || []).map((option: any) => {
                if (option?.value === 'reference') {
                  return { ...option, label: translateKey('formRedirectTypeInternal') }
                }
                if (option?.value === 'custom') {
                  return { ...option, label: translateKey('formRedirectTypeCustom') }
                }
                return option
              }),
            }
          }
          if (subField?.name === 'reference') {
            return { ...subField, label: translateKey('formRedirectReferenceLabel') }
          }
          if (subField?.name === 'url') {
            return { ...subField, label: translateKey('formRedirectURLLabel') }
          }
          return subField
        }),
      }
    }

    if (field.name === 'emails' && field.type === 'array') {
      return {
        ...field,
        label: translateKey('formEmailsLabel'),
        admin: {
          ...field.admin,
          description: translateKey('formEmailsDescription'),
        },
        fields: (field.fields || []).map((row: any) => {
          if (!row?.fields || !Array.isArray(row.fields)) return row
          return {
            ...row,
            fields: row.fields.map((subField: any) => {
              if (subField?.name === 'emailTo') {
                return {
                  ...subField,
                  label: translateKey('formEmailToLabel'),
                }
              }
              if (subField?.name === 'cc') {
                return { ...subField, label: translateKey('formCcLabel') }
              }
              if (subField?.name === 'bcc') {
                return { ...subField, label: translateKey('formBccLabel') }
              }
              if (subField?.name === 'replyTo') {
                return {
                  ...subField,
                  label: translateKey('formReplyToLabel'),
                }
              }
              if (subField?.name === 'emailFrom') {
                return {
                  ...subField,
                  label: translateKey('formEmailFromLabel'),
                }
              }
              if (subField?.name === 'subject') {
                return { ...subField, label: translateKey('formSubjectLabel') }
              }
              if (subField?.name === 'message') {
                return {
                  ...subField,
                  label: translateKey('formMessageLabel'),
                  admin: {
                    ...subField.admin,
                    description: translateKey('formMessageDescription'),
                  },
                }
              }
              return subField
            }),
          }
        }),
      }
    }

    return field
  })
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts', 'products'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: t('plugins.redirectFromHelp'),
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return localizeFormBuilderFields(
          defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              label: translateKey('formConfirmationMessageLabel'),
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
          }),
        )
      },
    },
  }),
  searchPlugin({
    collections: ['posts', 'products'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
