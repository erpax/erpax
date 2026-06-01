/**
 * Competencies — the ONE actor-capability taxonomy.
 *
 * The merge realised: a competency is simultaneously (a) a skill an **agent**
 * loads, (b) a competency an **employee** holds, (c) a requirement a
 * **job-position** demands, and (d) a node of the `SKILL.md` corpus
 * (`skillRoute` / content-uuid). User = Employee = Agent are projections of
 * one party; THIS is the shared vocabulary that joins them — held by the
 * actor (`users.competencies`), required by the job
 * (`job-positions.requiredCompetencies`), and identical to the skill the
 * router loads (same content ⇒ same id; see the `merge` / `identity` skills).
 *
 * Grounded in the canonical competency standards (deep-research verified):
 * @standard ESCO v1.2 skills-pillar mono-hierarchy four-sub-classifications reusability-tiers
 * @standard SFIA 8 responsibility-levels-1-7 shared-scale held-and-required (gap = required − held)
 * @standard ISCO-08 occupation-backbone (ESCO occupations roll up 1:1 to a unit group)
 * @standard ISO 30405:2016 recruitment essential-vs-optional-requirement
 * @standard O*NET-SOC crosswalk-anchor (onetCode)
 * @compliance GDPR Art 9 special-category-data competency-records
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ../Users/index.ts · ../CostCenters/JobPositions/index.ts · ../Employees/index.ts
 */
import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../access/auth'
import { statusField, notesField, auditFields, referenceField } from '../../fields/base-accounting-fields'

const Competencies: CollectionConfig = {
  slug: 'competencies',
  labels: { singular: 'Competency', plural: 'Competencies' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['reference', 'name', 'subClassification', 'reusabilityLevel', 'escoUri'],
    description:
      'The shared actor-capability taxonomy: an agent loads it, an employee holds it, a job requires it, the skill-router resolves it. ESCO/O*NET/SFIA grounded.',
    group: 'People',
  },
  access: accountingCollectionAccess(),
  fields: [
    referenceField({ description: 'Competency code (e.g. SFIA `PROG`, O*NET element id, internal code).' }),
    { name: 'name', type: 'text', required: true, index: true },
    { name: 'description', type: 'textarea' },
    // ESCO Skills-pillar mono-hierarchy: every concept sits in exactly ONE of
    // the four sub-classifications (each rolls up to a single parent group).
    { name: 'subClassification', type: 'select', defaultValue: 'skill',
      options: [
        { label: 'Knowledge', value: 'knowledge' },
        { label: 'Language skills and knowledge', value: 'language' },
        { label: 'Skill', value: 'skill' },
        { label: 'Transversal skill', value: 'transversal' },
      ],
      admin: { description: 'ESCO Skills-pillar sub-classification (mono-hierarchy: one group per concept).' } },
    { name: 'parent', type: 'relationship', relationTo: 'competencies',
      admin: { description: 'Single parent group in the ESCO mono-hierarchy (self-referential).' } },
    // ESCO reusability — how widely the concept applies (broadest → narrowest).
    { name: 'reusabilityLevel', type: 'select',
      options: [
        { label: 'Transversal (broadest)', value: 'transversal' },
        { label: 'Cross-sectoral', value: 'cross_sectoral' },
        { label: 'Sector-specific', value: 'sector_specific' },
        { label: 'Occupation-specific (narrowest)', value: 'occupation_specific' },
      ],
      admin: { description: 'ESCO reusability tier — distinguishes core/soft (transversal) from role-specific (occupation-specific).' } },
    { name: 'maxProficiency', type: 'number', defaultValue: 7, min: 1,
      admin: { description: 'Top of the SFIA responsibility scale (1-7), reused for both held and required levels; gap = required − held.' } },
    // ── External taxonomy anchors (the merge keys across standards) ──
    { name: 'escoUri', type: 'text', index: true,
      admin: { description: 'ESCO concept URI — the European cross-language anchor.' } },
    { name: 'onetCode', type: 'text',
      admin: { description: 'O*NET element / SOC code.' } },
    { name: 'sfiaCode', type: 'text',
      admin: { description: 'SFIA skill code (e.g. `PROG`, `ARCH`).' } },
    { name: 'iscoOccupation', type: 'text',
      admin: { description: 'ISCO-08 occupation code this competency is typical for.' } },
    // ── The agent↔HR merge: a competency IS a skill-corpus node ──
    { name: 'skillRoute', type: 'text', index: true,
      admin: { description: 'Skill-router route of the matching `SKILL.md` node (e.g. `/fields/measure/SKILL`). Same content ⇒ same id — the agent capability is this competency.' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Deprecated', value: 'deprecated' },
        { label: 'Emerging', value: 'emerging' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('competencies'),
  timestamps: true,
}

export default Competencies
