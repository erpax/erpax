/**
 * FiscalPeriodSnapshots Collection
 *
 * Immutable snapshots of FiscalPeriods at critical moments: creation, amendment, validation, closing, regulatory audit.
 * Implements Law 60 (chain) and GDPR Art. 32 (audit trail for system modifications).
 *
 * Purpose: Proves state of fiscal configuration at each event. Prevents retroactive amendment denial.
 * Used by: Audit trail reconstruction, regulatory evidence, compliance proof.
 *
 * @standard GDPR:2016/679 Art. 32 (audit evidence, access control, encryption)
 * @standard eIDAS:2014/910/EU (signature on critical amendments)
 * @standard SOX:2002 (access control audit evidence, change log)
 * @standard NIST-SP-800-92 (audit logging, integrity verification)
 * @invariant One snapshot per event (creation, amendment, validation, closing, regulatory audit)
 * @invariant snapshotData is JSON copy of FiscalPeriods state at event time
 * @invariant eventType enum constrains event classification
 * @invariant priorSnapshot points to previous snapshot (creates immutable audit chain)
 * @invariant signedUuid: optional eIDAS QES signature for amendments/regulatory events
 * @invariant Never updated; only created and read
 */

import { CollectionConfig } from 'payload'
import { accountingCollectionAccess } from '../../access/auth'

export const FiscalPeriodSnapshots: CollectionConfig = {
  slug: 'fiscal-period-snapshots',
  admin: {
    useAsTitle: 'snapshotLabel',
  },
  access: accountingCollectionAccess(),
  fields: [
    {
      name: 'fiscalPeriods',
      type: 'relationship',
      relationTo: 'fiscal-periods',
      required: true,
      admin: { description: 'FiscalPeriods record for which this snapshot was created' },
    },
    {
      name: 'snapshotLabel',
      type: 'text',
      required: true,
      admin: {
        description:
          'Human-readable label (e.g., "FY2026-Creation", "FY2026-Amendment-2026-05-12", "FY2026-YearEndClose-2026-12-31")',
      },
    },
    {
      name: 'eventType',
      type: 'select',
      options: [
        { label: 'Creation (initial config)', value: 'creation' },
        { label: 'Amendment (config changed, new supercedes link)', value: 'amendment' },
        { label: 'Validation (calendar generated, integrity checked)', value: 'validation' },
        { label: 'Period Closed (period lock → locked status)', value: 'closing' },
        { label: 'Regulatory Audit (external audit of fiscal config)', value: 'regulatory-audit' },
        { label: 'Status Changed (draft→active→archived)', value: 'status-change' },
      ],
      required: true,
      admin: { description: 'Type of event that triggered this snapshot' },
    },
    {
      name: 'snapshotData',
      type: 'json',
      required: true,
      admin: {
        description:
          'Full FiscalPeriods state at snapshot time (JSON copy). Immutable for audit trail reconstruction.',
      },
    },
    {
      name: 'priorSnapshot',
      type: 'relationship',
      relationTo: 'fiscal-period-snapshots',
      admin: {
        description:
          'Previous snapshot of this FiscalPeriods (null if creation). Creates immutable chain for diff analysis.',
      },
    },
    {
      name: 'changes',
      type: 'json',
      admin: {
        description:
          'Only if eventType=amendment. JSON object of {field: {prior, new}} showing what changed. Null for other events.',
      },
    },
    {
      name: 'triggeredBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { description: 'User who triggered this snapshot event' },
    },
    {
      name: 'triggeredAt',
      type: 'date',
      required: true,
      admin: { description: 'Timestamp of event' },
    },
    {
      name: 'reason',
      type: 'textarea',
      admin: {
        description:
          'Why was this snapshot created? (e.g., "Annual fiscal policy review", "Regulatory compliance amendment", "Bug fix in period boundaries")',
      },
    },
    {
      name: 'signedUuid',
      type: 'text',
      admin: {
        description:
          'Optional eIDAS QES signature on snapshotData (for amendments, regulatory audits). Base64-encoded SignedUuid envelope.',
      },
    },
    {
      name: 'auditTrail',
      type: 'richText',
      admin: {
        description: 'Immutable audit trail: who viewed/reviewed this snapshot, forensic notes. Append-only.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Snapshot-specific notes' },
    },
  ],
}
