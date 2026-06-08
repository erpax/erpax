/**
 * Consolidations Collection
 *
 * Tracks multi-entity consolidation processes: which entities are included,
 * closing readiness assessment, intercompany balance reconciliation,
 * and elimination entry preparation.
 *
 * Consolidation workflow: in-progress → ready-for-elimination → elimination-posted → consolidated
 *
 * @invariant Consolidation can only proceed if all entities closed + all IC balanced
 * @invariant Elimination entries prepared but not auto-posted (requires approval)
 * @invariant Audit trail tracks all consolidation milestones (entity closure, IC reconciliation, eliminations)
  * @accounting IFRS-10 consolidated-financial-statements
 * @accounting IAS-27 separate-financial-statements
 * @accounting US-GAAP ASC-810 consolidation
*/

import { CollectionConfig } from 'payload'
import { accountingCollectionAccess } from '@/auth'
import { validateConsolidationReadiness } from '@/validate/consolidation/readiness'

export const Consolidations: CollectionConfig = {
  slug: 'consolidations',
  admin: {
    useAsTitle: 'consolidationName',
  },
  access: accountingCollectionAccess(),
  hooks: {
    beforeValidate: [validateConsolidationReadiness],
  },
  fields: [
    {
      name: 'consolidationName',
      type: 'text',
      unique: true,
      required: true,
      admin: { description: 'Unique ID: e.g., "PARENT-GROUP-FY2026-FULL"' },
    },
    {
      name: 'consolidationGroup',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
      admin: { description: 'Parent entity (top of consolidation hierarchy)' },
    },
    {
      name: 'subsidiaryEntities',
      type: 'relationship',
      relationTo: 'legal-entities',
      hasMany: true,
      admin: { description: 'Subsidiary entities included in consolidation' },
    },
    {
      name: 'associateEntities',
      type: 'relationship',
      relationTo: 'legal-entities',
      hasMany: true,
      admin: { description: 'Associate entities (equity method accounting)' },
    },
    {
      name: 'fiscalYear',
      type: 'number',
      required: true,
      admin: { description: 'Fiscal year of consolidation' },
    },
    {
      name: 'periodClosingDate',
      type: 'date',
      required: true,
      admin: { description: 'Period-end date for all entities in consolidation' },
    },
    {
      name: 'consolidationCurrency',
      type: 'text',
      admin: { description: 'Reporting/consolidation currency (ISO 4217 code, e.g., USD)' },
    },
    {
      name: 'consolidationType',
      type: 'select',
      options: [
        { label: 'Full Consolidation', value: 'full' },
        { label: 'Proportionate Consolidation', value: 'proportionate' },
        { label: 'Equity Method', value: 'equity' },
      ],
      required: true,
      admin: { description: 'Type of consolidation accounting' },
    },
    {
      name: 'consolidatedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'User who initiated consolidation process' },
    },
    {
      name: 'consolidationStatus',
      type: 'select',
      options: [
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Ready for Elimination', value: 'ready-for-elimination' },
        { label: 'Elimination Posted', value: 'elimination-posted' },
        { label: 'Consolidated', value: 'consolidated' },
      ],
      required: true,
      defaultValue: 'in-progress',
      admin: { description: 'Consolidation workflow status' },
    },
    {
      name: 'consolidationReadiness',
      type: 'json',
      admin: {
        description:
          'Phase B4: Consolidation readiness assessment (all entities closed status, IC balance reconciliation, elimination entries prepared). Auto-populated by validateConsolidationReadiness hook.',
      },
    },
    {
      name: 'eliminationEntries',
      type: 'array',
      fields: [
        {
          name: 'sequenceNumber',
          type: 'number',
          required: true,
          admin: { description: 'Order of elimination entry' },
        },
        {
          name: 'journalEntryId',
          type: 'relationship',
          relationTo: 'journal-entries',
          admin: { description: 'Link to elimination GL posting (if posted)' },
        },
        {
          name: 'fromEntity',
          type: 'text',
          required: true,
          admin: { description: 'Entity eliminating the balance' },
        },
        {
          name: 'toEntity',
          type: 'text',
          required: true,
          admin: { description: 'Entity receiving elimination' },
        },
        {
          name: 'account',
          type: 'text',
          required: true,
          admin: { description: 'GL account being eliminated (e.g., 2000-2999 for IC payables)' },
        },
        {
          name: 'accountType',
          type: 'select',
          options: [
            { label: 'Payable', value: 'payable' },
            { label: 'Receivable', value: 'receivable' },
            { label: 'Investment', value: 'investment' },
            { label: 'Equity', value: 'equity' },
          ],
          admin: { description: 'Type of account being eliminated' },
        },
        {
          name: 'eliminationAmount',
          type: 'number',
          required: true,
          admin: { description: 'Amount to eliminate' },
        },
        {
          name: 'description',
          type: 'text',
          admin: { description: 'Elimination entry description' },
        },
        {
          name: 'posted',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Check once elimination posted to GL' },
        },
        {
          name: 'postedDate',
          type: 'date',
          admin: { description: 'When elimination was posted' },
        },
      ],
      admin: { description: 'Elimination entries prepared for consolidation' },
    },
    {
      name: 'governanceScope',
      type: 'json',
      admin: {
        description:
          'Phase B4: Law 63 self-governance metadata. Stores consolidation authority, approval thresholds, consolidation level. Auto-populated from group profile.',
      },
    },
    {
      name: 'chainLeafUuid',
      type: 'text',
      admin: {
        description:
          'Phase B4: Law 60 audit chain leaf. Computed as sha256(JCS-canonical(Consolidations) || prior_leaf_uuid). Enables tamper detection.',
      },
    },
    {
      name: 'auditTrail',
      type: 'richText',
      admin: {
        description:
          'Immutable audit trail of consolidation activities (readiness assessment, elimination posting, consolidation completion). Append-only.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'General notes on this consolidation process' },
    },
  ],
}
