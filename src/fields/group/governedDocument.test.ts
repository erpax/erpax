import { describe, expect, it } from 'vitest'

import { Ability, restrictSubjects } from '@/utilities/ability'
import { abilityForRoles } from '@/utilities/ability/roles'
import { documentError, governedDocument, mayWrite, pageRead, pageWrite } from '@/fields/group/governedDocument'
import { EarningsPerShare } from '@/utilities/governed'

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
    expect(JSON.stringify(await (pageRead(none) as unknown as (a: object) => Promise<unknown>)({ req: req(finance) }))).toContain(`"documentType":{"in":["${STD}","compliance-deadline","processing-activity"]}`)
    expect(await (pageRead(none) as unknown as (a: object) => Promise<unknown>)({ req: req(plain) })).toEqual({ or: [{ documentType: { exists: false } }, { documentType: { in: ['processing-activity'] } }] })
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
    await expect(write({ req: req(tenantAdmin), data: { title: 'About' } } as never)).resolves.toEqual({ or: [{ and: [{ documentType: { exists: false } }, { tenant: { equals: 't1' } }] }, { documentType: { in: ['management-certification', 'compliance-deadline', 'processing-activity', 'internal-audit-function', 'debt-instrument'] } }] })
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

  it('a processing activity carries its block; every transfer to a third country names its safeguard', () => {
    const PA = 'processing-activity'
    const block = (transfers: object[]) => ({ blockType: PA, controllerOrProcessor: 'controller', lawfulBasis: 'contract', retentionPeriod: '10 years (Accountancy Act)', reviewDueAt: '2027-01-31', thirdCountryTransfers: transfers })
    expect(documentError(PA, {})).toMatch(/carries its details/)
    expect(documentError(PA, { details: [block([])] })).toBe(true)
    expect(documentError(PA, { details: [block([{ country: 'US', safeguard: 'sccs' }])] })).toBe(true)
    expect(documentError(PA, { details: [block([{ country: 'US', safeguard: 'sccs' }, { country: 'IN' }])] })).toMatch(/names its safeguard \(IN\)/)
  })

  it('a processing activity is read by every member and written by admins; its name is unique in its tenant', async () => {
    const PA = 'processing-activity'
    expect(abilityForRoles({ roles: ['user'] }).permits('read', 'pages', { documentType: PA })).toBe(true)
    expect(abilityForRoles({ roles: ['user'] }).permits('update', 'pages', { documentType: PA })).toBe(false)
    expect(await mayWrite(req(tenantAdmin), PA, 't1', none)).toBe(true)
    const details = [{ blockType: PA, controllerOrProcessor: 'controller', lawfulBasis: 'contract', retentionPeriod: '10 years', reviewDueAt: '2027-01-31' }]
    const finds: unknown[] = []
    const run = (twins: object[], data: object, originalDoc?: object) => (governedDocument as unknown as (a: object) => Promise<unknown>)({ data, originalDoc, req: { ...reqOf(superAdmin), payload: { find: async (args: unknown) => { finds.push(args); return { docs: twins } }, findByID: async () => ({}) } } })
    await expect(run([{ id: 'p2' }], { title: 'Payroll', tenant: 't1', documentType: PA, document: { details } })).rejects.toThrow(/named "Payroll" already exists/)
    expect(await run([], { title: 'Payroll', tenant: 't1', documentType: PA, document: { details } })).toBeDefined()
    expect(JSON.stringify(finds[0])).toContain('{"documentType":{"equals":"processing-activity"}},{"title":{"equals":"Payroll"}},{"tenant":{"equals":"t1"}}')
    await run([], { title: 'Payroll' }, { id: 'p1', tenant: { id: 't1' }, documentType: PA, document: { details } })
    expect(JSON.stringify(finds.at(-1))).toContain('{"id":{"not_equals":"p1"}}')
  })

  it('an internal audit function is approved on its effective date; its quality review recurs within five years; an engagement completes after it starts', () => {
    const IA = 'internal-audit-function'
    const block = (extra: object = {}) => ({ blockType: IA, entity: 'e1', reportingLine: 'audit-committee', auditFunctionStatus: 'established', chiefAuditExecutive: 'M. Petrova', ...extra })
    expect(documentError(IA, { details: [block()] })).toMatch(/names its effectiveDate/)
    expect(documentError(IA, { effectiveDate: '2026-01-15', details: [block()] })).toBe(true)
    expect(documentError(IA, { effectiveDate: '2026-01-15', details: [block({ lastQualityReview: '2022-06-01', nextQualityReview: '2027-06-01' })] })).toBe(true)
    expect(documentError(IA, { effectiveDate: '2026-01-15', details: [block({ lastQualityReview: '2022-06-01', nextQualityReview: '2027-06-02' })] })).toMatch(/within five years/)
    expect(documentError(IA, { effectiveDate: '2026-01-15', details: [block({ auditEngagements: [{ engagementName: 'Payroll', engagementType: 'compliance', startDate: '2026-03-01', completionDate: '2026-02-01' }] })] })).toMatch(/completes after it starts \(Payroll\)/)
  })

  it('an internal audit function is read by audit and compliance staff, written by admins, and its charter id is unique in its tenant', async () => {
    const IA = 'internal-audit-function'
    expect(abilityForRoles({ roles: ['user', 'audit-staff'] }).permits('read', 'pages', { documentType: IA })).toBe(true)
    expect(abilityForRoles({ roles: ['user', 'finance'] }).permits('read', 'pages', { documentType: IA })).toBe(false)
    expect(await mayWrite(req(tenantAdmin), IA, 't1', none)).toBe(true)
    const document = { code: 'IAC-2026-01', effectiveDate: '2026-01-15', details: [{ blockType: IA, entity: 'e1', reportingLine: 'audit-committee', auditFunctionStatus: 'established', chiefAuditExecutive: 'M. Petrova' }] }
    const finds: unknown[] = []
    const run = (twins: object[]) => (governedDocument as unknown as (a: object) => Promise<unknown>)({ data: { title: 'Internal Audit', tenant: 't1', documentType: IA, document }, req: { ...reqOf(superAdmin), payload: { find: async (args: unknown) => { finds.push(args); return { docs: twins } }, findByID: async () => ({}) } } })
    await expect(run([{ id: 'p9' }])).rejects.toThrow(/with code "IAC-2026-01" already exists/)
    expect(JSON.stringify(finds[0])).toContain('{"document.code":{"equals":"IAC-2026-01"}}')
    expect(await run([])).toBeDefined()
  })

  it("an EPS computation is read and written only where the tenant's plan includes earnings_per_share", async () => {
    const EPS = 'earnings-per-share'
    const member = { id: 'm', roles: ['user'], tenants: [{ tenant: 't1' }] }
    const planned = (user: unknown, limits: object | null) => ({ user, context: {}, payload: { find: async () => ({ docs: limits ? [{ tenant: 't1', status: 'active', plan: { limits } }] : [] }) } }) as never
    const read = (r: never) => (pageRead(none) as unknown as (a: object) => Promise<unknown>)({ req: r })
    expect(JSON.stringify(await read(planned(member, null)))).not.toContain(EPS)
    expect(JSON.stringify(await read(planned(member, { earnings_per_share: false })))).not.toContain(EPS)
    expect(JSON.stringify(await read(planned(member, { earnings_per_share: true })))).toContain(EPS)
    expect(await mayWrite(planned(tenantAdmin, null), EPS, 't1', none)).toBe(false)
    expect(await mayWrite(planned(tenantAdmin, { earnings_per_share: true }), EPS, 't1', none)).toBe(true)
    expect(await mayWrite(planned(superAdmin, null), EPS, 't1', none)).toBe(true)
  })

  it('an EPS computation computes its numerator and its basic and diluted figures; a loss is not diluted', () => {
    const flat = (fields: readonly unknown[]): Array<{ name?: string; hooks?: { beforeChange?: Array<(a: object) => unknown> } }> =>
      (fields as Array<{ name?: string; fields?: unknown[] }>).flatMap((f) => (f.name ? [f as never] : f.fields ? flat(f.fields) : []))
    const hookOf = (name: string) => flat(EarningsPerShare.fields).find((f) => f.name === name)!.hooks!.beforeChange![0]!
    const row = { netProfitAttributableToOrdinary: 1_250_000_00, preferredDividends: 50_000_00, weightedAverageOrdinaryShares: 1_000_000, dilutivePotentialShares: 200_000 }
    expect(hookOf('basicEpsNumerator')({ siblingData: row })).toBe(1_200_000_00)
    expect(hookOf('basicEps')({ siblingData: row })).toBe(1.2)
    expect(hookOf('dilutedEps')({ siblingData: row })).toBe(1)
    const loss = { ...row, netProfitAttributableToOrdinary: -300_000_00, preferredDividends: 0 }
    expect(hookOf('basicEps')({ siblingData: loss })).toBe(-0.3)
    expect(hookOf('dilutedEps')({ siblingData: loss })).toBe(-0.3)
    expect(documentError('earnings-per-share', { details: [{ blockType: 'earnings-per-share', weightedAverageOrdinaryShares: 0 }] })).toMatch(/positive weighted average/)
    expect(documentError('earnings-per-share', { details: [{ blockType: 'earnings-per-share', weightedAverageOrdinaryShares: 1_000_000 }] })).toBe(true)
  })

  it('an insurance contract group keeps IFRS 17: no negative CSM, an onerous group recognises its loss, coverage ends after inception', () => {
    const IC = 'insurance-contract'
    const block = (extra: object = {}) => ({ blockType: IC, measurementModel: 'gmm', lineOfBusiness: 'life_term', portfolioId: 'P1', cohortYear: 2026, profitabilityGroup: 'profitable', futureCashflowsEstimate: 1, discountRate: 3, csm: 500, ...extra })
    expect(documentError(IC, { details: [block()] })).toMatch(/names its effectiveDate/)
    expect(documentError(IC, { effectiveDate: '2026-01-01', details: [block()] })).toBe(true)
    expect(documentError(IC, { effectiveDate: '2026-01-01', details: [block({ csm: -1 })] })).toMatch(/never negative/)
    expect(documentError(IC, { effectiveDate: '2026-01-01', details: [block({ profitabilityGroup: 'onerous', csm: 0 })] })).toMatch(/onerous group recognises its loss/)
    expect(documentError(IC, { effectiveDate: '2026-01-01', details: [block({ profitabilityGroup: 'onerous', csm: 0, lossComponent: 1200 })] })).toBe(true)
    expect(documentError(IC, { effectiveDate: '2026-01-01', details: [block({ coverageEndDate: '2025-12-31' })] })).toMatch(/Coverage ends after/)
  })

  it('a debt instrument names its id and issuance date, matures after it is issued, and is in breach when a covenant is', () => {
    const DI = 'debt-instrument'
    const block = (extra: object = {}) => ({ blockType: DI, entity: 'e1', debtType: 'bank-term-loan', debtStatus: 'performing', lenderName: 'UniCredit', principalAmount: 1, outstandingBalance: 1, currency: 'EUR', maturityDate: '2031-06-30', ...extra })
    expect(documentError(DI, { details: [block()] })).toMatch(/names its code, effectiveDate/)
    expect(documentError(DI, { code: 'TL-2026-01', effectiveDate: '2026-06-30', details: [block()] })).toBe(true)
    expect(documentError(DI, { code: 'TL-2026-01', effectiveDate: '2026-06-30', details: [block({ maturityDate: '2026-06-30' })] })).toMatch(/matures after it is issued/)
    expect(documentError(DI, { code: 'TL-2026-01', effectiveDate: '2026-06-30', details: [block({ financialCovenants: [{ covenantName: 'Net debt / EBITDA', threshold: '≤ 3.0x', complianceStatus: 'breach' }] })] })).toMatch(/puts the instrument in breach \(Net debt \/ EBITDA/)
    expect(documentError(DI, { code: 'TL-2026-01', effectiveDate: '2026-06-30', details: [block({ debtStatus: 'breach-cure', financialCovenants: [{ covenantName: 'Net debt / EBITDA', threshold: '≤ 3.0x', complianceStatus: 'breach' }] })] })).toBe(true)
  })
})
