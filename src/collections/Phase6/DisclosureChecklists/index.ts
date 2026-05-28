import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const DisclosureChecklists: CollectionConfig = {
  slug: 'disclosure-checklists',
  admin: {
    useAsTitle: 'checklistName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
    },
    {
      name: 'checklistName',
      type: 'text',
      required: true,
      admin: { description: 'E.g., "IFRS 12 Group Disclosure Checklist - FY 2026".' },
    },
    {
      name: 'standard',
      type: 'relationship',
      relationTo: 'compliance-frameworks',
      required: true,
    },
    {
      name: 'standardSection',
      type: 'text',
      admin: { description: 'IFRS standard reference (e.g., "IFRS 12 §B4-B6", "IAS 1 §138").' },
    },
    {
      name: 'fiscalPeriod',
      type: 'text',
      required: true,
      admin: { description: 'Fiscal period covered (e.g., "FY 2026", "Q4 2026").' },
    },
    {
      name: 'disclosureItems',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'sequence',
          type: 'number',
          required: true,
        },
        {
          name: 'disclosureTitle',
          type: 'text',
          required: true,
          admin: { description: 'Title of the required disclosure.' },
        },
        {
          name: 'disclosureRequirement',
          type: 'richText',
          required: true,
          admin: { description: 'Text of the requirement from the standard.' },
        },
        {
          name: 'applicability',
          type: 'select',
          options: [
            { label: 'Always Required', value: 'always' },
            { label: 'Conditional (certain balances/transactions)', value: 'conditional' },
            { label: 'Not Applicable', value: 'not-applicable' },
          ],
          required: true,
        },
        {
          name: 'applicabilityCondition',
          type: 'text',
          admin: { description: 'Condition for applicability (e.g., "if entity has segments").' },
        },
        {
          name: 'completionStatus',
          type: 'select',
          options: [
            { label: 'Not Started', value: 'not-started' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Complete - Requires Review', value: 'complete-review' },
            { label: 'Reviewed & Approved', value: 'approved' },
          ],
          required: true,
          defaultValue: 'not-started',
        },
        {
          name: 'assignedTo',
          type: 'text',
          admin: { description: 'Team member or department responsible.' },
        },
        {
          name: 'targetDate',
          type: 'date',
        },
        {
          name: 'completionDate',
          type: 'date',
        },
        {
          name: 'notes',
          type: 'richText',
          admin: { description: 'Progress notes, challenges, workarounds.' },
        },
        {
          name: 'relatedEvidence',
          type: 'relationship',
          relationTo: 'audit-evidence',
          hasMany: true,
          admin: { description: 'Supporting documentation (note reference, GL printout, etc.).' },
        },
      ],
    },
    {
      name: 'overallCompletionPercentage',
      type: 'number',
      admin: { description: 'Auto-calculated or manually entered (0-100%).' },
    },
    {
      name: 'reviewedBy',
      type: 'text',
      admin: { description: 'Name of reviewer (CFO, audit partner, compliance officer).' },
    },
    {
      name: 'reviewDate',
      type: 'date',
    },
    {
      name: 'checklistStatus',
      type: 'select',
      options: [
        { label: 'In Preparation', value: 'in-preparation' },
        { label: 'Pending Review', value: 'pending-review' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Finalized', value: 'finalized' },
      ],
      required: true,
      defaultValue: 'in-preparation',
    },
    {
      name: 'checklistDocument',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Formal checklist workpaper (PDF).' },
    },
  ],
}
