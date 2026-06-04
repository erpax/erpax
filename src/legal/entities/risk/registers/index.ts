/**
 * Risk Register — single-folder collection node.
 *
 * @standard COSO ERM-2017 enterprise-risk-management
 * @standard ISO-31000:2018 risk-management
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/role/based/access'

export const RiskRegister: CollectionConfig = {
  slug: 'risk-register',
  admin: {
    useAsTitle: 'riskTitle',
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
      name: 'riskId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Unique risk identifier (e.g., "FIN-001", "OPS-022").' },
    },
    {
      name: 'riskTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'riskDescription',
      type: 'richText',
      required: true,
      admin: { description: 'Detailed description of the risk and its potential impact.' },
    },
    {
      name: 'riskCategory',
      type: 'select',
      options: [
        { label: 'Financial Reporting', value: 'financial-reporting' },
        { label: 'Operational', value: 'operational' },
        { label: 'Compliance & Regulatory', value: 'compliance' },
        { label: 'Strategic', value: 'strategic' },
        { label: 'Cybersecurity & IT', value: 'cybersecurity' },
        { label: 'Reputational', value: 'reputational' },
        { label: 'Credit', value: 'credit' },
        { label: 'Liquidity', value: 'liquidity' },
        { label: 'Market', value: 'market' },
        { label: 'Fraud', value: 'fraud' },
      ],
      required: true,
    },
    {
      name: 'cosoComponent',
      type: 'select',
      options: [
        { label: 'Control Environment', value: 'control-environment' },
        { label: 'Risk Assessment', value: 'risk-assessment' },
        { label: 'Control Activities', value: 'control-activities' },
        { label: 'Information & Communication', value: 'information-communication' },
        { label: 'Monitoring', value: 'monitoring' },
      ],
      admin: { description: 'Primary COSO-2013 component affected (IFRS 13 §31).' },
    },
    {
      name: 'riskOwner',
      type: 'text',
      required: true,
      admin: { description: 'Executive or manager responsible for risk management.' },
    },
    {
      name: 'riskOwnerContact',
      type: 'text',
      admin: { description: 'Email or phone.' },
    },
    {
      name: 'inherentRiskLikelihood',
      type: 'select',
      options: [
        { label: 'Remote (1-10%)', value: 'remote' },
        { label: 'Low (11-25%)', value: 'low' },
        { label: 'Moderate (26-50%)', value: 'moderate' },
        { label: 'High (51-75%)', value: 'high' },
        { label: 'Almost Certain (76-100%)', value: 'almost-certain' },
      ],
      required: true,
    },
    {
      name: 'inherentRiskImpact',
      type: 'select',
      options: [
        { label: 'Negligible (<€0.1M)', value: 'negligible' },
        { label: 'Minor (€0.1M - €1M)', value: 'minor' },
        { label: 'Moderate (€1M - €10M)', value: 'moderate' },
        { label: 'Major (€10M - €50M)', value: 'major' },
        { label: 'Catastrophic (>€50M)', value: 'catastrophic' },
      ],
      required: true,
    },
    {
      name: 'inherentRiskScore',
      type: 'number',
      admin: { description: 'Calculated: likelihood × impact (1-25 scale).' },
    },
    {
      name: 'mitigatingControls',
      type: 'relationship',
      relationTo: 'internal-controls',
      hasMany: true,
      required: true,
      admin: { description: 'Controls in place to mitigate this risk.' },
    },
    {
      name: 'residualRiskLikelihood',
      type: 'select',
      options: [
        { label: 'Remote (1-10%)', value: 'remote' },
        { label: 'Low (11-25%)', value: 'low' },
        { label: 'Moderate (26-50%)', value: 'moderate' },
        { label: 'High (51-75%)', value: 'high' },
        { label: 'Almost Certain (76-100%)', value: 'almost-certain' },
      ],
      required: true,
    },
    {
      name: 'residualRiskImpact',
      type: 'select',
      options: [
        { label: 'Negligible (<€0.1M)', value: 'negligible' },
        { label: 'Minor (€0.1M - €1M)', value: 'minor' },
        { label: 'Moderate (€1M - €10M)', value: 'moderate' },
        { label: 'Major (€10M - €50M)', value: 'major' },
        { label: 'Catastrophic (>€50M)', value: 'catastrophic' },
      ],
      required: true,
    },
    {
      name: 'residualRiskScore',
      type: 'number',
      admin: { description: 'Calculated: residual likelihood × residual impact (1-25 scale).' },
    },
    {
      name: 'riskAppetite',
      type: 'select',
      options: [
        { label: 'Not Acceptable (>20)', value: 'not-acceptable' },
        { label: 'Tolerable (11-20)', value: 'tolerable' },
        { label: 'Acceptable (1-10)', value: 'acceptable' },
      ],
      required: true,
    },
    {
      name: 'acceptabilityAssessment',
      type: 'richText',
      required: true,
      admin: { description: 'Is residual risk acceptable? Justification.' },
    },
    {
      name: 'furtherMitigationRequired',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'additionalMitigationPlan',
      type: 'richText',
      admin: { description: 'If risk not acceptable, planned mitigation actions.' },
    },
    {
      name: 'relatedComplianceRequirements',
      type: 'relationship',
      relationTo: 'compliance-requirements',
      hasMany: true,
    },
    {
      name: 'relatedAuditFindings',
      type: 'relationship',
      relationTo: 'audit-findings',
      hasMany: true,
    },
    {
      name: 'lastAssessmentDate',
      type: 'date',
      required: true,
    },
    {
      name: 'nextAssessmentDate',
      type: 'date',
      required: true,
    },
    {
      name: 'riskStatus',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Monitoring', value: 'monitoring' },
        { label: 'Under Mitigation', value: 'under-mitigation' },
        { label: 'Mitigated', value: 'mitigated' },
        { label: 'Closed', value: 'closed' },
      ],
      required: true,
      defaultValue: 'active',
    },
    {
      name: 'riskRegisterDocument',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Heat map or formal risk register extract (PDF).' },
    },
  ],
}
