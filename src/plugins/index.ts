import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import type { Field } from 'payload'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/components/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/components/search/beforeSync'

import localization from '@/i18n/localization'
import { localeRecord } from '@/i18n'
import { Page, Post, Product } from '@/payload-types'
import { getServerSideURL } from '@/standards/rfc-3986/get-url'
import { accountingPlugin } from '@/plugins/accounting'

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

function localizeFormBuilderFields(defaultFields: Field[]): Field[] {
  return defaultFields.map((field) => {
    if (!field || typeof field !== 'object') return field

    if (field.name === 'confirmationType' && field.type === 'radio') {
      return {
        ...field,
        label: localeRecord('formConfirmationTypeLabel'),
        admin: {
          ...field.admin,
          description: localeRecord('formConfirmationTypeDescription'),
        },
        options: (field.options || []).map((option: { value?: string; label?: unknown }) => {
          if (option?.value === 'message') {
            return { ...option, label: localeRecord('formConfirmationMessageOption') }
          }
          if (option?.value === 'redirect') {
            return { ...option, label: localeRecord('formConfirmationRedirectOption') }
          }
          return option
        }),
      }
    }

    if (field.name === 'redirect' && field.type === 'group') {
      return {
        ...field,
        label: localeRecord('formRedirectLabel'),
        fields: (field.fields || []).map((subField: Field) => {
          if (subField?.name === 'type' && subField.type === 'radio') {
            return {
              ...subField,
              options: (subField.options || []).map((option: { value?: string; label?: unknown }) => {
                if (option?.value === 'reference') {
                  return { ...option, label: localeRecord('formRedirectTypeInternal') }
                }
                if (option?.value === 'custom') {
                  return { ...option, label: localeRecord('formRedirectTypeCustom') }
                }
                return option
              }),
            }
          }
          if (subField?.name === 'reference') {
            return { ...subField, label: localeRecord('formRedirectReferenceLabel') }
          }
          if (subField?.name === 'url') {
            return { ...subField, label: localeRecord('formRedirectURLLabel') }
          }
          return subField
        }),
      }
    }

    if (field.name === 'emails' && field.type === 'array') {
      return {
        ...field,
        label: localeRecord('formEmailsLabel'),
        admin: {
          ...field.admin,
          description: localeRecord('formEmailsDescription'),
        },
        fields: (field.fields || []).map((row: Field & { fields?: Field[] }) => {
          if (!row?.fields || !Array.isArray(row.fields)) return row
          return {
            ...row,
            fields: row.fields.map((subField: Field) => {
              if (subField?.name === 'emailTo') {
                return {
                  ...subField,
                  label: localeRecord('formEmailToLabel'),
                }
              }
              if (subField?.name === 'cc') {
                return { ...subField, label: localeRecord('formCcLabel') }
              }
              if (subField?.name === 'bcc') {
                return { ...subField, label: localeRecord('formBccLabel') }
              }
              if (subField?.name === 'replyTo') {
                return {
                  ...subField,
                  label: localeRecord('formReplyToLabel'),
                }
              }
              if (subField?.name === 'emailFrom') {
                return {
                  ...subField,
                  label: localeRecord('formEmailFromLabel'),
                }
              }
              if (subField?.name === 'subject') {
                return { ...subField, label: localeRecord('formSubjectLabel') }
              }
              if (subField?.name === 'message') {
                return {
                  ...subField,
                  label: localeRecord('formMessageLabel'),
                  admin: {
                    ...subField.admin,
                    description: localeRecord('formMessageDescription'),
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
  // Accounting plugin - Provides 20 collections for GL posting, A/R, A/P, Assets, and Financial Analysis
  accountingPlugin(),
  redirectsPlugin({
    collections: ['pages', 'posts', 'products'],
    overrides: {
      admin: {
        group: localeRecord('plugins.redirectsGroup'),
      },
      labels: {
        plural: localeRecord('redirects.plural'),
        singular: localeRecord('redirects.singular'),
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: localeRecord('plugins.redirectFromHelp'),
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
    collections: ['pages', 'categories'],
    generateURL: (docs, _currentDoc, _collection, _req) =>
      docs.reduce((url, doc) => `${url}/${String((doc as { slug?: unknown }).slug ?? '')}`, ''),
    generateLabel: (docs, _currentDoc, _collection, _req) =>
      docs
        .map((doc) => String((doc as { title?: unknown }).title ?? ''))
        .filter(Boolean)
        .join(' / '),
    parentFieldSlug: 'parent',
    breadcrumbsFieldSlug: 'breadcrumbs',
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
      labels: {
        plural: localeRecord('forms.plural'),
        singular: localeRecord('forms.singular'),
      },
      fields: ({ defaultFields }) => {
        return localizeFormBuilderFields(
          defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              label: localeRecord('formConfirmationMessageLabel'),
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
    formSubmissionOverrides: {
      labels: {
        plural: localeRecord('form-submissions.plural'),
        singular: localeRecord('form-submissions.singular'),
      },
    },
  }),
  searchPlugin({
    collections: ['posts', 'products'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      admin: {
        group: localeRecord('plugins.searchGroup'),
      },
      labels: {
        plural: localeRecord('search.plural'),
        singular: localeRecord('search.singular'),
      },
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
