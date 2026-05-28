import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '../../../access/roleBasedAccess'

export const ManagementAssessmentICFR: CollectionConfig = {
  slug: 'management-assessment-icfr',
  admin: {
    useAsTitle: 'assessmentPeriod',
  },
  access: roleBasedAccess({
    read: ['superadmin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['superadmin', 'admin'],
    update: ['superadmin', 'admin'],
    delete: ['superadmin'],
  }),
  fields: [
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
    },
    {
      name: 'assessmentPeriod',
      type: 'text',
      required: true,
      admin: { description: 'Fiscal period (e.g., "FY 2026", "Q4 2026").' },
    },
    {
      name: 'assessmentDate',
      type: 'date',
      required: true,
      admin: { description: 'Date of management assessment conclusion (SOX 302/906 certification date).' },
    },
    {
      name: 'scope',
      type: 'richText',
      required: true,
      admin: { description: 'Description of scope: processes, locations, systems covered.' },
    },
    {
      name: 'controlFramework',
      type: 'select',
      options: [
        { label: 'COSO 2013', value: 'coso-2013' },
        { label: 'COSO 1992', value: 'coso-1992' },
        { label: 'COSO Guidance (Enterprise Risk Management)', value: 'coso-erm' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'controlEnvironmentAssessment',
      type: 'richText',
      required: true,
      admin: { description: 'Assessment of control environment (tone at top, integrity, values, competence).' },
    },
    {
      name: 'riskAssessmentAssessment',
      type: 'richText',
      required: true,
      admin: { description: 'Assessment of risk identification and assessment processes.' },
    },
    {
      name: 'controlActivitiesAssessment',
      type: 'richText',
      required: true,
      admin: { description: 'Assessment of preventive/detective control activities.' },
    },
    {
      name: 'informationCommunicationAssessment',
      type: 'richText',
      required: true,
      admin: { description: 'Assessment of information systems and communication.' },
    },
    {
      name: 'monitoringAssessment',
      type: 'richText',
      required: true,
      admin: { description: 'Assessment of ongoing and separate monitoring activities.' },
    },
    {
      name: 'significantDeficienciesIdentified',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'materialWeaknessesIdentified',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'deficiencyDetails',
      type: 'richText',
      admin: { description: 'Description of any significant deficiencies or material weaknesses.' },
    },
    {
      name: 'remediationActions',
      type: 'richText',
      admin: { description: 'Remediation actions planned or in progress.' },
    },
    {
      name: 'conclusionStatement',
      type: 'richText',
      required: true,
      admin: { description: 'Conclusion: "...effective" or "...not effective" per SOX 302/906.' },
    },
    {
      name: 'managementAcknowledgment',
      type: 'richText',
      required: true,
      admin: { description: 'Management certification statement acknowledging responsibility for ICFR.' },
    },
    {
      name: 'certifyingOfficers',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'signatureDate', type: 'date', required: true },
        { name: 'signatureDocument', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'attestationDocument',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Auditor attestation report (SOX 404(b) for accelerated filers).' },
    },
    {
      name: 'relatedAuditFindings',
      type: 'relationship',
      relationTo: 'audit-findings',
      hasMany: true,
    },
    {
      name: 'relatedControlTests',
      type: 'relationship',
      relationTo: 'control-tests',
      hasMany: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Final', value: 'final' },
        { label: 'Auditor-Reviewed', value: 'auditor-reviewed' },
        { label: 'Certified', value: 'certified' },
        { label: 'Filed', value: 'filed' },
      ],
      required: true,
      defaultValue: 'draft',
    },
  ],
}
