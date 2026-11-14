/**
 * Internal Policies — single-folder collection node.
 *
 * @security ISO-27001 A.5.1 policies-for-information-security
 * @standard ISO-37301:2021 compliance-policy
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/access/collections/shared/roleBasedAccess'

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
  ],
}
