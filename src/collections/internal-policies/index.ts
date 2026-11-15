/**
 * Internal Policies — single-folder collection node.
 *
 * @security ISO-27001 A.5.1 policies-for-information-security
 * @standard ISO-37301:2021 compliance-policy
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'
import { validations } from 'payload/shared'
import { roleBasedAccess } from '@/access/collections/shared/roleBasedAccess'
import { stampWhen } from '@/hooks/collections/shared/stampWhen'

// ── Acknowledgments (formerly the policy-acknowledgments collection) ─────────────────────────────
// An acknowledgment is a person accepting this policy as it stood, so it is a row here (ISO-27001
// A.5.1, SOX §404 attestation), under the policy's own access and version history.

interface Acknowledgment {
  id?: string | null
  employeeId?: string | null
  employeeName?: string | null
  policyVersion?: string | null
}

/**
 * The version each row acknowledged: a row already stored keeps its version (matched by row id), and a
 * new row takes the policy's current `versionNumber`, whatever a caller sent. So a later revision of the
 * policy never changes what was acknowledged, and no caller can claim another version.
 */
export const acknowledgedVersions = (rows: readonly Acknowledgment[], stored: readonly Acknowledgment[], current: string | null | undefined): Acknowledgment[] => {
  const kept = new Map(stored.filter((row) => row.id).map((row) => [row.id, row.policyVersion]))
  return rows.map((row) => ({ ...row, policyVersion: (row.id && kept.get(row.id)) || current || null }))
}

/**
 * Computed before validation (Payload validates before field hooks run), so the one-per-version rule
 * below sees the versions that will be stored.
 */
const stampAcknowledgedVersions: CollectionBeforeValidateHook = ({ data, originalDoc }) => {
  const rows = (data as { acknowledgments?: Acknowledgment[] } | undefined)?.acknowledgments
  if (!data || !Array.isArray(rows)) return data
  const current = (data as { versionNumber?: string | null }).versionNumber ?? (originalDoc as { versionNumber?: string | null } | undefined)?.versionNumber
  const stored = ((originalDoc as { acknowledgments?: Acknowledgment[] } | undefined)?.acknowledgments ?? []) as Acknowledgment[]
  return { ...data, acknowledgments: acknowledgedVersions(rows, stored, current) }
}

/** A person acknowledges a given version once. */
export const duplicateAcknowledgmentError = (rows: unknown): string | true => {
  const keys = (Array.isArray(rows) ? (rows as Acknowledgment[]) : []).map(
    (row) => `${(row.employeeId || row.employeeName || '').trim().toLowerCase()}@${row.policyVersion ?? ''}`,
  )
  return new Set(keys).size === keys.length ? true : 'A person acknowledges a policy version once.'
}

type Check = (value: unknown, args: never) => string | true | Promise<string | true>

export const InternalPolicies: CollectionConfig = {
  slug: 'internal-policies',
  admin: {
    useAsTitle: 'policyName',
  },
  // The policy's version history IS Payload's native versioning: every save is a version row
  // carrying `versionNumber` / `versionName` / `changes` as they stood, and `restoreVersion`
  // brings one back. This replaces the hand-kept `policy-versions` collection. Kept without limit
  // (maxPerDoc: 0) — a superseded policy text is audit evidence, so the plugin-wide cap of 50 must
  // not prune it. Declared here so the versions plugin leaves it alone ("the richer config wins").
  versions: { maxPerDoc: 0 },
  hooks: { beforeValidate: [stampAcknowledgedVersions] },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'policyName',
      type: 'text',
      required: true,
    },
    {
      name: 'policyNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'policyType',
      type: 'select',
      options: [
        { label: 'Accounting', value: 'accounting' },
        { label: 'Internal Control', value: 'internal-control' },
        { label: 'Compliance', value: 'compliance' },
        { label: 'Financial Reporting', value: 'financial-reporting' },
        { label: 'Risk Management', value: 'risk-management' },
        { label: 'Data Protection', value: 'data-protection' },
        { label: 'Conflict of Interest', value: 'conflict-of-interest' },
        { label: 'Code of Conduct', value: 'code-of-conduct' },
      ],
      required: true,
    },
    {
      name: 'owner',
      type: 'text',
    },
    {
      name: 'effectiveDate',
      type: 'date',
      required: true,
    },
    {
      name: 'lastReviewDate',
      type: 'date',
    },
    {
      name: 'nextReviewDate',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Superseded', value: 'superseded' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'policyDocument',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'versionNumber',
      type: 'text',
      admin: { description: 'The current version of the policy text (e.g. 3.1). Earlier versions are in the document\'s version history.' },
    },
    {
      name: 'versionName',
      type: 'text',
      admin: { description: 'Name of the current version (e.g. "2026 annual review").' },
    },
    {
      name: 'releaseDate',
      type: 'date',
      admin: { description: 'When the current version was released.' },
    },
    {
      name: 'changes',
      type: 'richText',
      admin: { description: 'What changed in the current version.' },
    },
    {
      name: 'applicableControls',
      type: 'relationship',
      relationTo: 'internal-controls',
      hasMany: true,
    },
    {
      name: 'acknowledgments',
      type: 'array',
      admin: { description: 'Who acknowledged which version of this policy, and when.' },
      // Payload's own array check first: a bare validate would drop it
      validate: (async (value: unknown, args: never) => {
        const first = await (validations.array as unknown as Check)(value, args)
        return first === true ? duplicateAcknowledgmentError(value) : first
      }) as never,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'employeeName', type: 'text', required: true },
            { name: 'employeeId', type: 'text' },
            {
              name: 'status',
              type: 'select',
              defaultValue: 'pending',
              options: [
                { label: 'Acknowledged', value: 'acknowledged' },
                { label: 'Pending', value: 'pending' },
                { label: 'Overdue', value: 'overdue' },
                { label: 'Expired', value: 'expired' },
              ],
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'policyVersion',
              type: 'text',
              index: true,
              admin: { readOnly: true, description: 'The version acknowledged: stamped from the policy, never changed.' },
            },
            {
              name: 'acknowledgedAt',
              type: 'date',
              admin: { readOnly: true, description: 'Set by the server when the row is acknowledged.' },
              hooks: { beforeChange: [stampWhen('acknowledged')] },
            },
            { name: 'acknowledgedBy', type: 'text' },
          ],
        },
        { name: 'signedDocument', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
