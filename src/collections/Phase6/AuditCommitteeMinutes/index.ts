import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const AuditCommitteeMinutes: CollectionConfig = {
  slug: 'audit-committee-minutes',
  admin: {
    useAsTitle: 'meetingTitle',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin'],
    update: ['superadmin', 'admin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'auditCommittee',
      type: 'relationship',
      relationTo: 'audit-committees',
      required: true,
    },
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
    },
    {
      name: 'meetingTitle',
      type: 'text',
      required: true,
      admin: { description: 'E.g., "Audit Committee Meeting - Q4 2026".' },
    },
    {
      name: 'meetingDate',
      type: 'date',
      required: true,
    },
    {
      name: 'meetingTime',
      type: 'text',
      admin: { description: 'Meeting time and duration (e.g., "14:00-16:30 CET").' },
    },
    {
      name: 'meetingLocation',
      type: 'text',
      admin: { description: 'Physical or virtual location.' },
    },
    {
      name: 'chairPerson',
      type: 'text',
      admin: { description: 'Committee chair.' },
    },
    {
      name: 'attendees',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'title', type: 'text' },
        { name: 'affiliation', type: 'text' },
        { name: 'status', type: 'select', options: [
          { label: 'Present', value: 'present' },
          { label: 'Absent', value: 'absent' },
          { label: 'Excused', value: 'excused' },
        ]},
      ],
    },
    {
      name: 'agenda',
      type: 'array',
      fields: [
        { name: 'sequence', type: 'number', required: true },
        { name: 'topic', type: 'text', required: true },
        { name: 'presenter', type: 'text' },
        { name: 'timeAllocated', type: 'text' },
      ],
    },
    {
      name: 'discussionSummary',
      type: 'richText',
      required: true,
      admin: { description: 'Comprehensive summary of discussions, issues raised, concerns.' },
    },
    {
      name: 'keyDecisions',
      type: 'array',
      fields: [
        { name: 'decision', type: 'richText', required: true },
        { name: 'rationale', type: 'richText' },
      ],
    },
    {
      name: 'actionItems',
      type: 'array',
      required: true,
      fields: [
        { name: 'sequence', type: 'number', required: true },
        { name: 'actionDescription', type: 'richText', required: true },
        { name: 'assignedTo', type: 'text', required: true },
        { name: 'dueDate', type: 'date', required: true },
        { name: 'status', type: 'select', options: [
          { label: 'Open', value: 'open' },
          { label: 'In Progress', value: 'in-progress' },
          { label: 'Completed', value: 'completed' },
        ], defaultValue: 'open'},
        { name: 'completionDate', type: 'date' },
        { name: 'completionNotes', type: 'richText' },
      ],
    },
    {
      name: 'risksIdentified',
      type: 'richText',
      admin: { description: 'Risks, concerns, or matters brought to committee attention.' },
    },
    {
      name: 'auditorObservations',
      type: 'richText',
      admin: { description: 'Observations from internal or external auditors.' },
    },
    {
      name: 'complianceMatters',
      type: 'richText',
      admin: { description: 'Compliance, regulatory, or legal matters discussed.' },
    },
    {
      name: 'relatedBoardActions',
      type: 'relationship',
      relationTo: 'board-actions',
      hasMany: true,
      admin: { description: 'Resolutions or actions resulting from this meeting.' },
    },
    {
      name: 'relatedAuditFindings',
      type: 'relationship',
      relationTo: 'audit-findings',
      hasMany: true,
      admin: { description: 'Audit findings discussed.' },
    },
    {
      name: 'relatedComplianceGaps',
      type: 'relationship',
      relationTo: 'compliance-gaps',
      hasMany: true,
      admin: { description: 'Compliance gaps discussed.' },
    },
    {
      name: 'minutesStatus',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Approval', value: 'pending-approval' },
        { label: 'Approved', value: 'approved' },
        { label: 'Filed', value: 'filed' },
      ],
      required: true,
      defaultValue: 'draft',
    },
    {
      name: 'approvedBy',
      type: 'text',
      admin: { description: 'Chair or designated approver.' },
    },
    {
      name: 'approvalDate',
      type: 'date',
    },
    {
      name: 'minutesDocument',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Formal minutes document (PDF).' },
    },
    {
      name: 'confidentiality',
      type: 'select',
      options: [
        { label: 'Confidential - Limited Distribution', value: 'confidential' },
        { label: 'Internal', value: 'internal' },
        { label: 'Public', value: 'public' },
      ],
      defaultValue: 'confidential',
    },
  ],
}
