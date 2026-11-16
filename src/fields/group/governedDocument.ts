import { APIError, Forbidden, type Access, type CollectionAfterChangeHook, type CollectionBeforeChangeHook, type Field, type PayloadRequest, type Where } from 'payload'
import { auditTrailAfterChange } from '@/hooks/collections/shared/auditTrailAfterChange'

import { abilityOf, type AbilityOf } from '@/access/collections/shared/abilityAccess'
import { GOVERNED_TYPES } from '@/utilities/governed'

import { isSuperAdmin } from '@/access/collections/shared/superAdminOnly'
import { wherePublished } from '@/utilities/scope/filters'
import { checkFeatureAccess } from '@/utilities/subscription/gate'

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

/** The types a user's own roles (the users `roles` select) read or write. */
const ownTypes = (user: unknown, mode: 'read' | 'write'): string[] => {
  const own = ((user as { roles?: unknown } | null)?.roles as string[] | undefined) ?? []
  return GOVERNED_TYPES.filter((t) => t[mode].some((r) => own.includes(r))).map((t) => t.value)
}

const typeOf = (data: unknown): string | null | undefined => (data as { documentType?: string | null } | null)?.documentType
const notGoverned: Where = { documentType: { exists: false } }
const governed: Where = { documentType: { exists: true } }
const governedIn = (types: string[]): Where => ({ documentType: { in: types } })

/**
 * The governed pages the request's ability allows — its roles from the role engine and from
 * `<role>@<app>` groups (kept to the app's collections and tenant), computed once and kept on the
 * request's context (`abilityOf`). Each governed type is a condition on `pages` in the role rules.
 */
const byAbility = async (req: PayloadRequest, action: 'read' | 'update' | 'delete', of: AbilityOf): Promise<Where | null> => {
  const where = (await of(req)).accessibleBy(action, 'pages')
  if (where === false) return null
  return where === true ? governed : { and: [governed, where] }
}

/** Whether the request may write a page of `type` in `tenant` — own roles or the ability, on the document itself. */
export const mayWrite = async (req: PayloadRequest, type: string, tenant: unknown, of: AbilityOf = abilityOf): Promise<boolean> => {
  if (isSuperAdmin(req.user)) return true
  if ((await unplanned(req)).includes(type)) return false
  return ownTypes(req.user, 'write').includes(type) || (await of(req)).permits('update', 'pages', { documentType: type, tenant })
}

/**
 * The types the request's tenant holds no plan for (a type's `feature`, as `accountingCollectionAccess({ feature })`
 * gated a collection): nobody but a super-admin reads or writes them. The subscription is read once per request.
 */
const unplanned = async (req: PayloadRequest): Promise<string[]> => {
  const gated = GOVERNED_TYPES.filter((t) => t.feature)
  const allowed = await Promise.all(gated.map(async (t) => (await checkFeatureAccess(req, t.feature!)).allowed))
  return gated.filter((_, i) => !allowed[i]).map((t) => t.value)
}
const planned = (where: Where | null, blocked: string[]): Where | null => (!where || blocked.length === 0 ? where : { and: [where, { documentType: { not_in: blocked } }] })

const any = (branches: (Where | null)[]): Where | false => {
  const kept = branches.filter((b): b is Where => b !== null)
  return kept.length === 0 ? false : kept.length === 1 ? kept[0]! : { or: kept }
}

/** Read: anonymous → published and not governed; signed in → website pages and the governed pages their roles read. */
export const pageRead =
  (of: AbilityOf = abilityOf): Access =>
  async ({ req }) => {
    if (!req.user) return { and: [wherePublished, notGoverned] }
    if (isSuperAdmin(req.user)) return true
    const blocked = await unplanned(req)
    const own = ownTypes(req.user, 'read').filter((type) => !blocked.includes(type))
    return any([notGoverned, own.length ? governedIn(own) : null, planned(await byAbility(req, 'read', of), blocked)])
  }

/** Create / update / delete: a website page by `site` (the tenant-admin rule), a governed page by its type's writers. */
export const pageWrite =
  (site: Access, of: AbilityOf = abilityOf): Access =>
  async (args) => {
    const { req, data } = args
    if (isSuperAdmin(req.user)) return true
    const declared = typeOf(data)
    if (declared) return mayWrite(req, declared, (data as { tenant?: unknown }).tenant, of)
    const siteAccess = await site(args)
    const siteBranch: Where | null = siteAccess === true ? notGoverned : siteAccess ? { and: [notGoverned, siteAccess] } : null
    const blocked = await unplanned(req)
    const own = ownTypes(req.user, 'write').filter((type) => !blocked.includes(type))
    return any([siteBranch, own.length ? governedIn(own) : null, planned(await byAbility(req, 'update', of), blocked)])
  }

/** "A reporting standard", "An internal audit function": the type as the subject of a message. */
const aDocument = (label: string): string => {
  // an acronym keeps its capitals ("An EPS computation"); any other first word starts the phrase in lower case
  const phrase = label.replace(/^\S+/, (word) => (word === word.toUpperCase() ? word : word.toLowerCase()))
  return `${/^[aeiou]/i.test(label) ? 'An' : 'A'} ${phrase}`
}

/** Why a governed page is incomplete for its type, or true. */
export const documentError = (type: string | null | undefined, document: Record<string, unknown> | null | undefined): string | true => {
  const spec = GOVERNED_TYPES.find((t) => t.value === type)
  if (!spec) return true
  const missing = spec.requires.filter((f) => !document?.[f])
  if (missing.length) return `${aDocument(spec.label)} names its ${missing.join(', ')}.`
  const details = (document?.details as { blockType?: string }[] | undefined)?.[0]
  if (details && details.blockType !== spec.value) return `${aDocument(spec.label)} carries its own details, not ${details.blockType}.`
  if (spec.block && !details) return `${aDocument(spec.label)} carries its details.`
  return details && spec.check ? spec.check(details as Record<string, unknown>, document ?? {}) : true
}

/** Refuses a change into or out of a type the writer may not write, and a governed page missing what its type requires. */
export const governedDocument: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  if (!data) return data
  const stored = originalDoc as { documentType?: string | null; document?: Record<string, unknown> } | undefined
  const next = typeOf(data) === undefined ? (stored?.documentType ?? null) : (typeOf(data) ?? null)
  const prev = stored?.documentType ?? null
  if (next !== prev && !isSuperAdmin(req.user)) {
    const tenant = (data as { tenant?: unknown }).tenant ?? (originalDoc as { tenant?: unknown } | undefined)?.tenant
    if ((next && !(await mayWrite(req, next, tenant))) || (prev && !(await mayWrite(req, prev, tenant)))) throw new Forbidden()
  }
  const error = documentError(next, { ...stored?.document, ...(data as { document?: Record<string, unknown> }).document })
  if (error !== true) throw new APIError(error, 400)
  const spec = GOVERNED_TYPES.find((t) => t.value === next)
  const merged = { ...stored?.document, ...(data as { document?: Record<string, unknown> }).document }
  for (const key of spec?.unique ?? []) {
    const value = key === 'title' ? ((data as { title?: unknown }).title ?? (originalDoc as { title?: unknown } | undefined)?.title) : merged.code
    if (value === undefined || value === null || value === '') continue
    const tenant = idOf((data as { tenant?: unknown }).tenant ?? (originalDoc as { tenant?: unknown } | undefined)?.tenant)
    const self = (originalDoc as { id?: unknown } | undefined)?.id
    const twins = await req.payload.find({
      collection: 'pages',
      where: { and: [{ documentType: { equals: next } }, { [key === 'title' ? 'title' : 'document.code']: { equals: value } }, ...(tenant ? [{ tenant: { equals: tenant } }] : []), ...(self ? [{ id: { not_equals: self } }] : [])] },
      limit: 1,
      pagination: false,
      depth: 0,
      overrideAccess: true,
      req,
    })
    if (twins.docs.length) throw new APIError(`${aDocument(spec!.label)} ${key === 'title' ? 'named' : 'with code'} "${String(value)}" already exists here.`, 409)
  }
  return data
}

const idOf = (value: unknown): unknown => (value && typeof value === 'object' && 'id' in value ? (value as { id: unknown }).id : value)

const auditTrail = auditTrailAfterChange('pages')
/** Every change to a governed document leaves an audit-trail entry (ISO 19011); a website page needs none. */
export const governedAuditTrail: CollectionAfterChangeHook = (args) => ((args.doc as { documentType?: unknown } | undefined)?.documentType ? auditTrail(args) : args.doc)

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
    // A governed document refers to things of every app (an entity type, a jurisdiction, findings); that says
    // nothing about which app they belong to, so these references do not move them (src/packages/engine).
    custom: { places: false },
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
        name: 'details',
        type: 'blocks',
        maxRows: 1,
        blocks: GOVERNED_TYPES.flatMap((t) => (t.block ? [t.block] : [])),
        admin: { description: 'What the standard of this type needs beyond the fields above: one block, matching the type.' },
      },
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
