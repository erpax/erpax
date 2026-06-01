import type { Payload } from 'payload'
import type { Sector } from '../../payload-types'

/**
 * Seed `sectors` with the REAL canonical parts of society — not placeholders.
 *
 * The fixed UN taxonomies are facts, so they are encoded here verbatim: the
 * SNA-2008 institutional sectors (the top partition of society), the COFOG
 * divisions (the functions of government), and the 17 SDG goals (society's
 * outcomes). Idempotent on `reference`. This is the standard reference data
 * that makes "a place for any part of society" real rather than an empty shell.
 */

const SNA_SECTORS = [
  { code: 'S.11', name: 'Non-financial corporations', institutionalSector: 's11_nonfinancial_corporations' },
  { code: 'S.12', name: 'Financial corporations', institutionalSector: 's12_financial_corporations' },
  { code: 'S.13', name: 'General government', institutionalSector: 's13_general_government' },
  { code: 'S.14', name: 'Households', institutionalSector: 's14_households' },
  { code: 'S.15', name: 'Non-profit institutions serving households', institutionalSector: 's15_npish' },
] as const

const COFOG = [
  { code: 'COFOG.01', name: 'General public services', division: 'cofog_01' },
  { code: 'COFOG.02', name: 'Defence', division: 'cofog_02' },
  { code: 'COFOG.03', name: 'Public order and safety', division: 'cofog_03' },
  { code: 'COFOG.04', name: 'Economic affairs', division: 'cofog_04' },
  { code: 'COFOG.05', name: 'Environmental protection', division: 'cofog_05' },
  { code: 'COFOG.06', name: 'Housing and community amenities', division: 'cofog_06' },
  { code: 'COFOG.07', name: 'Health', division: 'cofog_07' },
  { code: 'COFOG.08', name: 'Recreation, culture and religion', division: 'cofog_08' },
  { code: 'COFOG.09', name: 'Education', division: 'cofog_09' },
  { code: 'COFOG.10', name: 'Social protection', division: 'cofog_10' },
] as const

const SDG = [
  'No poverty', 'Zero hunger', 'Good health and well-being', 'Quality education',
  'Gender equality', 'Clean water and sanitation', 'Affordable and clean energy',
  'Decent work and economic growth', 'Industry, innovation and infrastructure',
  'Reduced inequalities', 'Sustainable cities and communities',
  'Responsible consumption and production', 'Climate action', 'Life below water',
  'Life on land', 'Peace, justice and strong institutions', 'Partnerships for the goals',
] as const

async function upsert(payload: Payload, reference: string, data: Partial<Sector>): Promise<void> {
  const existing = await payload.find({
    collection: 'sectors', where: { reference: { equals: reference } }, limit: 1, overrideAccess: true,
  })
  if (existing.docs.length > 0) {
    await payload.update({ collection: 'sectors', id: existing.docs[0].id, data, overrideAccess: true })
  } else {
    await payload.create({ collection: 'sectors', data: { reference, ...data } as Sector, overrideAccess: true })
  }
}

export async function seedSectors(payload: Payload): Promise<void> {
  for (const s of SNA_SECTORS) {
    await upsert(payload, s.code, { name: s.name, institutionalSector: s.institutionalSector, status: 'active' })
  }
  for (const c of COFOG) {
    await upsert(payload, c.code, { name: c.name, cofogDivision: c.division, institutionalSector: 's13_general_government', status: 'active' })
  }
  for (let i = 0; i < SDG.length; i++) {
    await upsert(payload, `SDG.${i + 1}`, { name: SDG[i], sdgGoal: i + 1, status: 'active' })
  }
}
