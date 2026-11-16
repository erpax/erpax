import { describe, expect, it } from 'vitest'

import { Ability, restrictSubjects } from '@/utilities/ability'
import { abilityForRoles } from '@/utilities/ability/roles'
import { documentError, governedDocument, mayWrite, pageRead, pageWrite } from '@/fields/group/governedDocument'

const STD = 'reporting-standard'
const superAdmin = { id: 's', roles: ['admin'], tenants: [] }
const finance = { id: 'f', roles: ['user', 'finance'], tenants: [{ tenant: 't1' }] }
const tenantAdmin = { id: 'a', roles: ['user', 'admin'], tenants: [{ tenant: 't1', roles: ['admin'] }] }
const plain = { id: 'p', roles: ['user'], tenants: [{ tenant: 't1' }] }
const none = async () => new Ability()
const reqOf = (user: unknown) => ({ user, context: {} })
const req = (user: unknown) => reqOf(user) as never

describe('governed documents on pages — never public, read and written by the roles their type names', () => {
  it('anonymous reads see published pages that are not governed; a super-admin reads all', async () => {
    const anon = JSON.stringify(await (pageRead(none) as unknown as (a: object) => Promise<unknown>)({ req: req(null) }))
    expect(anon).toContain('"documentType":{"exists":false}')
    expect(anon).toContain('published')
    expect(await (pageRead(none) as unknown as (a: object) => Promise<unknown>)({ req: req(superAdmin) })).toBe(true)
  })

  it('a role held on the user record reads its types', async () => {
    expect(JSON.stringify(await (pageRead(none) as unknown as (a: object) => Promise<unknown>)({ req: req(finance) }))).toContain(`"documentType":{"in":["${STD}","compliance-deadline"]}`)
    expect(await (pageRead(none) as unknown as (a: object) => Promise<unknown>)({ req: req(plain) })).toEqual({ documentType: { exists: false } })
  })

  it('the role rules: a type is a condition on pages; user-reads-all and admin-manages-all do not widen it', () => {
    expect(abilityForRoles({ roles: ['user'] }).permits('read', 'pages', { documentType: STD })).toBe(false)
    expect(abilityForRoles({ roles: ['user'] }).permits('read', 'pages', { title: 'About' })).toBe(true)
    expect(abilityForRoles({ roles: ['user', 'finance'] }).permits('read', 'pages', { documentType: STD })).toBe(true)
    expect(abilityForRoles({ roles: ['admin'] }).permits('read', 'pages', { documentType: STD })).toBe(true)
    expect(abilityForRoles({ roles: ['admin'] }).permits('update', 'pages', { documentType: STD })).toBe(false)
  })

  it('a role held through an app group reaches the type, inside that tenant only', () => {
    const group = restrictSubjects(abilityForRoles({ roles: ['finance'] }), ['pages', 'posts'], { tenant: 't1' })
    expect(group.permits('read', 'pages', { documentType: STD, tenant: 't1' })).toBe(true)
    expect(group.permits('read', 'pages', { documentType: STD, tenant: 't2' })).toBe(false)
  })

  it('a reporting standard is written by a super-admin only; a website page by the site rule, beside the types the role writes', async () => {
    expect(await mayWrite(req(tenantAdmin), STD, 't1', none)).toBe(false)
    expect(await mayWrite(req(superAdmin), STD, 't1', none)).toBe(true)
    const write = pageWrite(() => ({ tenant: { equals: 't1' } }), none)
    await expect(write({ req: req(tenantAdmin), data: { documentType: STD, tenant: 't1' } } as never)).resolves.toBe(false)
    await expect(write({ req: req(tenantAdmin), data: { title: 'About' } } as never)).resolves.toEqual({ or: [{ and: [{ documentType: { exists: false } }, { tenant: { equals: 't1' } }] }, { documentType: { in: ['management-certification', 'compliance-deadline'] } }] })
  })

  it('a type names what it requires', async () => {
    const run = (data: object, user: unknown, originalDoc?: object) => (governedDocument as unknown as (a: object) => Promise<unknown>)({ data, originalDoc, req: { ...reqOf(user), payload: { findByID: async () => { throw new Error('offline') }, find: async () => { throw new Error('offline') } } } })
    await expect(run({ documentType: STD, document: { code: 'IFRS 15' } }, superAdmin)).rejects.toThrow(/names its effectiveDate, classification/)
    expect(await run({ documentType: STD, document: { code: 'IFRS 15', effectiveDate: '2018-01-01', classification: 'ifrs' } }, superAdmin)).toBeDefined()
    await expect(run({ documentType: STD, tenant: 't1' }, tenantAdmin, { documentType: null, tenant: 't1' })).rejects.toThrow()
    expect(documentError(null, {})).toBe(true)
  })

  it('a management certification carries its own details block; a qualified or adverse assertion names its findings', () => {
    const MC = 'management-certification'
    const block = (assertions: object[], relatedFindings: string[] = []) => ({ blockType: MC, certificationType: 'sox-302', certifyingOfficer: 'CFO', entity: 'e1', assertions, relatedFindings })
    expect(documentError(MC, { effectiveDate: '2026-03-31' })).toMatch(/carries its details/)
    expect(documentError(MC, { effectiveDate: '2026-03-31', details: [{ blockType: 'other' }] })).toMatch(/its own details, not other/)
    expect(documentError(MC, { details: [block([])] })).toMatch(/names its effectiveDate/)
    expect(documentError(MC, { effectiveDate: '2026-03-31', details: [block([{ assertion: 'ICFR effective', certificationLevel: 'fully-certified' }])] })).toBe(true)
    expect(documentError(MC, { effectiveDate: '2026-03-31', details: [block([{ assertion: 'ICFR effective', certificationLevel: 'adverse' }])] })).toMatch(/names the findings/)
    expect(documentError(MC, { effectiveDate: '2026-03-31', details: [block([{ assertion: 'ICFR effective', certificationLevel: 'qualified' }], ['f1'])] })).toBe(true)
    expect(documentError(STD, { code: 'IFRS 15', effectiveDate: '2018-01-01', classification: 'ifrs', details: [block([])] })).toMatch(/its own details, not management-certification/)
  })

  it('a management certification is read by audit and compliance staff and written by admins', async () => {
    const MC = 'management-certification'
    expect(abilityForRoles({ roles: ['user', 'audit-staff'] }).permits('read', 'pages', { documentType: MC })).toBe(true)
    expect(abilityForRoles({ roles: ['user', 'finance'] }).permits('read', 'pages', { documentType: MC })).toBe(false)
    expect(abilityForRoles({ roles: ['admin'] }).permits('update', 'pages', { documentType: MC })).toBe(true)
    expect(await mayWrite(req(tenantAdmin), MC, 't1', none)).toBe(true)
    expect(await mayWrite(req(finance), MC, 't1', none)).toBe(false)
  })

  it('a statutory report template names its jurisdiction, carries its sections and mappings, and ends after it takes effect', () => {
    const SRT = 'statutory-report-template'
    const block = (effectiveTo?: string) => ({ blockType: SRT, reportType: 'annual-report', effectiveTo, sections: [{ sectionName: 'Balance sheet', sequence: 1, mandatory: true }], fieldMappings: [{ mappingName: 'Revenue', fieldName: 'revenue', sourceCollection: 'gl-accounts', sourceField: 'balance' }] })
    expect(documentError(SRT, { effectiveDate: '2026-01-01', details: [block()] })).toMatch(/names its jurisdiction/)
    expect(documentError(SRT, { effectiveDate: '2026-01-01', jurisdiction: 'bg' })).toMatch(/carries its details/)
    expect(documentError(SRT, { effectiveDate: '2026-01-01', jurisdiction: 'bg', details: [block()] })).toBe(true)
    expect(documentError(SRT, { effectiveDate: '2026-01-01', jurisdiction: 'bg', details: [block('2026-12-31')] })).toBe(true)
    expect(documentError(SRT, { effectiveDate: '2026-01-01', jurisdiction: 'bg', details: [block('2025-12-31')] })).toMatch(/ends after it takes effect/)
  })

  it('a statutory report template is read by audit and compliance staff and written by a super-admin only', async () => {
    const SRT = 'statutory-report-template'
    expect(abilityForRoles({ roles: ['user', 'compliance-officer'] }).permits('read', 'pages', { documentType: SRT })).toBe(true)
    expect(abilityForRoles({ roles: ['user', 'finance'] }).permits('read', 'pages', { documentType: SRT })).toBe(false)
    expect(abilityForRoles({ roles: ['admin'] }).permits('update', 'pages', { documentType: SRT })).toBe(false)
    expect(await mayWrite(req(tenantAdmin), SRT, 't1', none)).toBe(false)
    expect(await mayWrite(req(superAdmin), SRT, 't1', none)).toBe(true)
  })

  it('a compliance deadline carries its block; a submitted or completed one names its submission date', () => {
    const CD = 'compliance-deadline'
    const block = (status: string, submissionDate?: string) => ({ blockType: CD, deadlineType: 'filing-deadline', entity: 'e1', dueDate: '2026-03-31', status, submissionDate, notifications: [{ notificationTitle: 'Two weeks left', daysBeforeDue: 14, notificationType: ['email'] }] })
    expect(documentError(CD, {})).toMatch(/carries its details/)
    expect(documentError(CD, { details: [block('on-track')] })).toBe(true)
    expect(documentError(CD, { details: [block('submitted')] })).toMatch(/names its submission date/)
    expect(documentError(CD, { details: [block('completed', '2026-03-30')] })).toBe(true)
  })

  it('a compliance deadline is read by finance, audit and compliance staff and written by admins', async () => {
    const CD = 'compliance-deadline'
    expect(abilityForRoles({ roles: ['user', 'finance'] }).permits('read', 'pages', { documentType: CD })).toBe(true)
    expect(abilityForRoles({ roles: ['user'] }).permits('read', 'pages', { documentType: CD })).toBe(false)
    expect(abilityForRoles({ roles: ['admin'] }).permits('update', 'pages', { documentType: CD })).toBe(true)
    expect(await mayWrite(req(finance), CD, 't1', none)).toBe(false)
    expect(await mayWrite(req(tenantAdmin), CD, 't1', none)).toBe(true)
  })
})
