import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { adminOnly } from '../../access/auth'
import { auditTrailAfterChange } from '../../hooks/auditTrailAfterChange'

export const ControlTests: CollectionConfig = {
  slug: 'control-tests',
  admin: { useAsTitle: 'title', defaultColumns: ['tenant', 'control', 'testStatus', 'result', 'isActive'], group: 'Compliance Foundation' },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: adminOnly },
  hooks: { afterChange: [auditTrailAfterChange('controlTests')] },
  timestamps: true,
  fields: [
    { name: 'title', type: 'text', required: true, index: true },
    { name: 'testDesign', type: 'textarea', required: true },
    { name: 'control', type: 'relationship', relationTo: 'internal-controls', required: true },
    { name: 'samplingMethodology', type: 'select', options: [{ label: 'Statistical Random', value: 'statistical-random' }, { label: 'Stratified', value: 'stratified' }, { label: 'Judgmental', value: 'judgmental' }, { label: 'Census', value: 'census' }, { label: 'Heuristic', value: 'heuristic' }] },
    { name: 'plannedSampleSize', type: 'number' },
    { name: 'actualSampleSize', type: 'number' },
    { name: 'toleranceLevel', type: 'number' },
    { name: 'assertion', type: 'select', options: [{ label: 'Existence', value: 'existence' }, { label: 'Completeness', value: 'completeness' }, { label: 'Accuracy', value: 'accuracy' }, { label: 'Authorization', value: 'authorization' }, { label: 'Segregation', value: 'segregation' }, { label: 'Cutoff', value: 'cutoff' }] },
    { name: 'testStatus', type: 'select', options: [{ label: 'Planned', value: 'planned' }, { label: 'In Progress', value: 'in-progress' }, { label: 'Completed', value: 'completed' }, { label: 'Suspended', value: 'suspended' }], required: true },
    { name: 'testedDate', type: 'date' },
    { name: 'result', type: 'select', options: [{ label: 'Effective', value: 'effective' }, { label: 'Deviations', value: 'deviations' }, { label: 'Not Operating', value: 'not-operating' }, { label: 'Unable to Determine', value: 'unable-determine' }] },
    { name: 'deviationCount', type: 'number' },
    { name: 'deviationRate', type: 'number' },
    { name: 'deviationsSummary', type: 'textarea' },
    { name: 'conclusionOnEffectiveness', type: 'textarea' },
    { name: 'reviewDate', type: 'date' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}