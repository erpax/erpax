/**
 * H2R hire-to-retire — canonical seed (Slice NNNN cut-2).
 *
 * JobPosition open → RecruitingPipeline applied → hired → Employee created
 *  → TimeEntry posted → ExpenseReport approved → LeaveRequest approved
 *  → PerformanceReview finalised → PayrollRun.
 *
 * @standard IAS-19 §11 §13 §16 short-term-employee-benefits
 * @standard GDPR Art.6(1)(b) recruitment + Art.5(1)(e) PII retention
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)

const openPosition: ChainStepImpl = async (payload, ctx, state) => {
  const pos = await payload.create({
    collection: 'job-positions',
    data: {
      tenant: ctx.tenantId,
      positionCode: `POS-${ts()}`,
      positionTitle: 'Senior Engineer',
      department: 'Engineering',
      level: 'senior',
      employmentType: 'full_time',
      fte: 1,
      currency: 'EUR',
      salaryRange: { min: 60_000_00, mid: 80_000_00, max: 100_000_00 },
      budgetedAnnualCost: 110_000_00,
      effectiveStartDate: new Date().toISOString(),
      isApprovedHeadcount: true,
      status: 'open',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.positionId = pos.id
  return 'position:opened'
}

const apply: ChainStepImpl = async (payload, ctx, state) => {
  const app = await payload.create({
    collection: 'recruiting-pipeline',
    data: {
      tenant: ctx.tenantId,
      candidateName: `Chain Candidate ${ts()}`,
      email: `cand-${ts()}@chain.test`,
      position: state.positionId,
      applicationDate: new Date().toISOString(),
      source: 'job_board',
      stage: 'applied',
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.applicationId = app.id
  return 'pipeline:applied'
}

const hire: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'recruiting-pipeline',
    id: state.applicationId as string,
    data: { stage: 'hired', status: 'hired' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'pipeline:hired'
}

const createEmployee: ChainStepImpl = async (payload, ctx, state) => {
  const emp = await payload.create({
    collection: 'employees',
    data: {
      tenant: ctx.tenantId,
      employeeNumber: `EMP-${ts()}`,
      displayName: 'Chain Test',
      identity: {
        givenName: 'Chain',
        familyName: 'Test',
      },
      contact: {
        workEmail: `emp-${ts()}@chain.test`,
      },
      jobTitle: 'Senior Engineer',
      employmentType: 'full_time_indefinite',
      hireDate: new Date().toISOString(),
      currency: 'EUR',
      compensation: {
        baseSalaryAnnual: 80_000_00,
        fteRatio: 1,
        paySchedule: 'monthly',
      },
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.employeeId = emp.id
  return 'employee:created'
}

const postTime: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'time-entries',
    data: {
      tenant: ctx.tenantId,
      entryId: `TE-${ts()}`,
      employee: state.employeeId,
      workDate: new Date().toISOString(),
      kind: 'regular',
      minutes: 8 * 60,
      billable: true,
      description: 'Chain test work',
      status: 'approved',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'time:posted'
}

const approveExpense: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'expense-reports',
    data: {
      tenant: ctx.tenantId,
      reportNumber: `ER-${ts()}`,
      employee: state.employeeId,
      submissionDate: new Date().toISOString(),
      businessPurpose: 'Chain test trip',
      lines: [{
        expenseDate: new Date().toISOString(),
        category: 'meals',
        description: 'Test lunch',
        currency: 'EUR',
        amount: 25_00,
      }],
      reimbursementCurrency: 'EUR',
      totalAmount: 25_00,
      status: 'approved',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'expense:approved'
}

const approveLeave: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'leave-requests',
    data: {
      tenant: ctx.tenantId,
      reference: `LR-${ts()}`,
      employee: state.employeeId,
      leaveType: 'annual',
      isPaid: true,
      submittedDate: new Date().toISOString(),
      startDate: new Date(Date.now() + 30 * 86_400_000).toISOString(),
      endDate: new Date(Date.now() + 35 * 86_400_000).toISOString(),
      workingDays: 5,
      status: 'approved',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'leave:approved'
}

const finaliseReview: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'performance-reviews',
    data: {
      tenant: ctx.tenantId,
      reference: `PR-${ts()}`,
      employee: state.employeeId,
      reviewer: ctx.userId,
      reviewType: 'annual',
      reviewPeriod: '2026-FY',
      reviewDate: new Date().toISOString(),
      overallRating: 'meets',
      numericScore: 3,
      status: 'acknowledged',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'review:finalised'
}

const runPayroll: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'payroll-runs',
    data: {
      tenant: ctx.tenantId,
      runId: `PAY-${ts()}`,
      employee: state.employeeId,
      employeeCount: 1,
      periodStart: new Date(Date.now() - 30 * 86_400_000).toISOString(),
      periodEnd: new Date().toISOString(),
      paymentDate: new Date().toISOString(),
      paySchedule: 'monthly',
      currency: 'EUR',
      baseGross: 6_666_67,                          // monthly portion of €80k
      totalGross: 6_666_67,
      payrollTaxesEmployer: 1_500_00,
      socialSecurityEmployer: 800_00,
      pensionEmployer: 200_00,
      socialSecurityEmployee: 500_00,
      pensionEmployee: 100_00,
      incomeTaxWithheld: 1_066_67,
      totalDeductions: 1_666_67,
      netPay: 5_000_00,
      status: 'completed',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'payroll:run'
}

export const h2rHireToRetireImpls: ChainImpls = [
  openPosition, apply, hire, createEmployee,
  postTime, approveExpense, approveLeave, finaliseReview, runPayroll,
]
