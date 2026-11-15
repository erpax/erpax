import { APIError, Forbidden, type Access, type CollectionBeforeChangeHook, type Field, type PayloadRequest, type Where } from 'payload'

import { abilityOf, type AbilityOf } from '@/access/collections/shared/abilityAccess'
import { GOVERNED_TYPES } from '@/utilities/governed'

import { isSuperAdmin } from '@/access/collections/shared/superAdminOnly'
import { wherePublished } from '@/utilities/scope/filters'

/**
 * Governed documents — every narrative or governed document is a page in one tree ([[project-fold-map]]),
 * the way upstream erpax keeps one `invoices` table for every commercial document: the TYPE is a
 * discriminator (`documentType`, like `invoice_type`) and what the types share is one concern (the
 * `document` group), so a former collection becomes a value, not a table. The page's title is the
 * document's name, its content is the document's text, its versions are its issues.
 *
 * A governed page is never public: a website page is readable by anyone once published, a governed
 * page only by the roles its type names, whatever its status. Each type names who writes it, where a
 * website page is written by its tenant's admins; nobody turns a page into a type they may not write,
 * or out of one.
 */

/**
 * The governed types the request may read or write: a role the type names, held as the user's own
 * role, through a role assignment, or through a `<role>@<app>` group — the last two from the request's
 * ability, computed once and kept on its context (`abilityOf`). A super-admin holds every type.
 */
export const typesFor = async (req: PayloadRequest, mode: 'read' | 'write', of: AbilityOf = abilityOf): Promise<string[]> => {
  if (isSuperAdmin(req.user)) return GOVERNED_TYPES.map((t) => t.value)
  if (!req.user) return []
  const own = ((req.user as { roles?: unknown }).roles as string[] | undefined) ?? []
  const ability = await of(req)
  return GOVERNED_TYPES.filter((t) => t[mode].some((r) => own.includes(r)) || ability.permits(mode === 'read' ? 'read' : 'update', t.value)).map((t) => t.value)
}

const typeOf = (data: unknown): string | null | undefined => (data as { documentType?: string | null } | null)?.documentType
const notGoverned: Where = { documentType: { exists: false } }
const governedIn = (types: string[]): Where => ({ documentType: { in: types } })

/** Read: anonymous → published and not governed; signed in → website pages and the readable types. */
export const pageRead: Access = async ({ req }) => {
  if (!req.user) return { and: [wherePublished, notGoverned] }
  if (isSuperAdmin(req.user)) return true
  const types = await typesFor(req, 'read')
  return types.length ? { or: [notGoverned, governedIn(types)] } : notGoverned
}

/** Create / update / delete: a website page by `site` (the tenant-admin rule), a governed page by its type's writers. */
export const pageWrite =
  (site: Access): Access =>
  async (args) => {
    if (isSuperAdmin(args.req.user)) return true
    const writable = await typesFor(args.req, 'write')
    const declared = typeOf(args.data)
    if (declared) return writable.includes(declared)
    const siteAccess = await site(args)
    const siteBranch: Where | null = siteAccess === true ? notGoverned : siteAccess ? { and: [notGoverned, siteAccess] } : null
    const branches = [...(siteBranch ? [siteBranch] : []), ...(writable.length ? [governedIn(writable)] : [])]
    return branches.length === 0 ? false : branches.length === 1 ? branches[0]! : { or: branches }
  }

/** Why a governed page is incomplete for its type, or true. */
export const documentError = (type: string | null | undefined, document: Record<string, unknown> | null | undefined): string | true => {
  const spec = GOVERNED_TYPES.find((t) => t.value === type)
  if (!spec) return true
  const missing = spec.requires.filter((f) => !document?.[f])
  return missing.length ? `A ${spec.label.toLowerCase()} names its ${missing.join(', ')}.` : true
}

/** Refuses a change into or out of a type the writer may not write, and a governed page missing what its type requires. */
export const governedDocument: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  if (!data) return data
  const stored = originalDoc as { documentType?: string | null; document?: Record<string, unknown> } | undefined
  const next = typeOf(data) === undefined ? (stored?.documentType ?? null) : (typeOf(data) ?? null)
  const prev = stored?.documentType ?? null
  if (next !== prev && !isSuperAdmin(req.user)) {
    const writable = await typesFor(req, 'write')
    if ((next && !writable.includes(next)) || (prev && !writable.includes(prev))) throw new Forbidden()
  }
  const error = documentError(next, { ...stored?.document, ...(data as { document?: Record<string, unknown> }).document })
  if (error !== true) throw new APIError(error, 400)
  return data
}

/** The page's governed-document type and the concern the types share. */
export const governedDocumentFields = (): Field[] => [
  {
    name: 'documentType',
    type: 'select',
    index: true,
    options: GOVERNED_TYPES.map((t) => ({ label: t.label, value: t.value })),
    admin: { position: 'sidebar', description: 'A governed document is never public; its type names who reads and writes it. Empty for a website page.' },
  },
  {
    name: 'document',
    type: 'group',
    admin: { description: 'What every governed document has. The title is its name and the content its text.' },
    fields: [
      {
        type: 'row',
        fields: [
          { name: 'code', type: 'text', admin: { description: 'e.g. IFRS 15, ASC 606.' } },
          { name: 'version', type: 'text' },
          { name: 'effectiveDate', type: 'date' },
          {
            name: 'classification',
            type: 'select',
            options: [
              { label: 'GAAP', value: 'gaap' },
              { label: 'IFRS', value: 'ifrs' },
              { label: 'SOX', value: 'sox' },
              { label: 'Tax', value: 'tax' },
              { label: 'Other', value: 'other' },
            ],
          },
        ],
      },
      { name: 'jurisdiction', type: 'relationship', relationTo: 'tax-jurisdictions' },
      { name: 'attachments', type: 'upload', relationTo: 'media', hasMany: true, admin: { description: 'Reference material and evidence.' } },
      {
        name: 'links',
        type: 'array',
        admin: { description: 'Links FROM this document to another — a standard mapped to another, a template to its source — with the element rules.' },
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'name', type: 'text', required: true },
              { name: 'page', type: 'relationship', relationTo: 'pages', required: true, admin: { description: 'The document linked to.' } },
              {
                name: 'kind',
                type: 'select',
                required: true,
                options: [
                  { label: 'Account Mapping', value: 'account-mapping' },
                  { label: 'Line Item Mapping', value: 'line-item-mapping' },
                  { label: 'Disclosure Mapping', value: 'disclosure-mapping' },
                  { label: 'Metric Mapping', value: 'metric-mapping' },
                  { label: 'Supersedes', value: 'supersedes' },
                  { label: 'References', value: 'references' },
                ],
              },
              {
                name: 'status',
                type: 'select',
                defaultValue: 'pending-review',
                options: [
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                  { label: 'Pending Review', value: 'pending-review' },
                ],
              },
            ],
          },
          {
            name: 'rules',
            type: 'array',
            fields: [
              { name: 'sourceElement', type: 'text' },
              { name: 'targetElement', type: 'text' },
              { name: 'transformation', type: 'richText' },
            ],
          },
        ],
      },
    ],
  },
]
