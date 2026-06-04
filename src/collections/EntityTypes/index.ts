import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { superAdminOnly } from '@/access/auth'

/**
 * Entity Types — classification of legal entity types.
 *
 * Defines entity type categories: Corporation, LLC, Partnership, Nonprofit, Trust, Government, Individual.
 * Used to determine applicable compliance frameworks and audit scope.
 *
 * @standard COSO-2013 entity-classification
 * @compliance SOX §302 entity-type-determination
 * @see docs/STANDARDS.md §3.1
 */
export const EntityTypes: CollectionConfig = {
  slug: 'entity-types',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['code', 'label', 'category', 'isActive'],
    group: 'Compliance Foundation',
    description: 'Read-only reference data for entity type classifications',
  },
  access: {
    read: authenticated,
    create: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  timestamps: true,
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Entity type code (e.g., "CORP", "LLC", "PART")',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Entity type label (e.g., "Corporation")',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'For-Profit Corporation', value: 'for-profit-corp' },
        { label: 'Limited Liability Company', value: 'llc' },
        { label: 'Partnership', value: 'partnership' },
        { label: 'Nonprofit', value: 'nonprofit' },
        { label: 'Trust', value: 'trust' },
        { label: 'Government Entity', value: 'government' },
        { label: 'Individual/Sole Proprietor', value: 'individual' },
      ],
      required: true,
      admin: {
        description: 'Category of entity type',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Detailed description',
      },
    },
    {
      name: 'characteristics',
      type: 'json',
      admin: {
        description: 'Key characteristics (ownership, governance, taxation)',
      },
    },
    {
      name: 'jurisdictionApplicability',
      type: 'array',
      fields: [
        {
          name: 'jurisdiction',
          type: 'text',
          required: true,
        },
        {
          name: 'applicableInJurisdiction',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
      admin: {
        description: 'Which jurisdictions recognize this entity type',
      },
    },
    {
      name: 'defaultComplianceFrameworks',
      type: 'relationship',
      relationTo: 'compliance-frameworks',
      hasMany: true,
      admin: {
        description: 'Default compliance frameworks for this entity type',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
