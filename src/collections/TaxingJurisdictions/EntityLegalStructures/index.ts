/**
 * Entity Legal Structures — single-folder collection node.
 *
 * @accounting IFRS-10 §B86 reporting-entity
 * @standard ISO-17442-1:2020 legal-entity-identifier
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { CollectionConfig } from 'payload'
import { authenticated } from '../../../access/authenticated'
import { superAdminOnly } from '../../../access/auth'

export const EntityLegalStructures: CollectionConfig = {
  slug: 'entity-legal-structures',
  admin: {
    useAsTitle: 'localName',
    defaultColumns: ['jurisdiction', 'entityType', 'localName', 'isActive'],
    group: 'Compliance Foundation',
    description: 'Reference data mapping entity types to legal forms',
  },
  access: {
    read: authenticated,
    create: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  timestamps: true,
  fields: [
    { name: 'jurisdiction', type: 'relationship', relationTo: 'taxing-jurisdictions', required: true, index: true, admin: { description: 'Jurisdiction' } },
    { name: 'entityType', type: 'relationship', relationTo: 'entity-types', required: true, admin: { description: 'Entity type' } },
    { name: 'localName', type: 'text', required: true, admin: { description: 'Local name of legal form' } },
    { name: 'abbreviation', type: 'text', admin: { description: 'Abbreviation' } },
    { name: 'description', type: 'textarea', admin: { description: 'Description' } },
    { name: 'regulatoryCharacteristics', type: 'json', admin: { description: 'Regulatory characteristics' } },
    { name: 'governanceStructure', type: 'select', options: [ { label: 'Single Founder/Owner', value: 'single' }, { label: 'Multiple Partners/Members', value: 'multiple' }, { label: 'Board of Directors', value: 'board' }, { label: 'Management Committee', value: 'management-committee' }, { label: 'Supervisory Board', value: 'supervisory-board' } ], admin: { description: 'Governance structure' } },
    { name: 'taxTreatment', type: 'select', options: [ { label: 'Corporate', value: 'corporate' }, { label: 'Pass-Through', value: 'pass-through' }, { label: 'Mixed/Elective', value: 'mixed' }, { label: 'Exempt', value: 'exempt' } ], admin: { description: 'Tax treatment' } },
    { name: 'auditRequirement', type: 'select', options: [ { label: 'Required', value: 'required' }, { label: 'Optional', value: 'optional' }, { label: 'Threshold-Based', value: 'threshold' }, { label: 'Not Required', value: 'not-required' } ], admin: { description: 'Audit requirements' } },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}
