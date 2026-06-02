/**
 * Roles registry — Slice WWWW (2026-05-10).
 *
 * Closes the architectural gap "the roles define the standards". Every
 * role binds a persona to (a) the body of standards they must satisfy,
 * (b) the chain steps they may execute, (c) the segregation-of-duties
 * (SoD) constraints that forbid combining them with other roles.
 *
 * Mirrors the BUSINESS_CHAINS / SCHEDULED_TASKS / FEATURE_REGISTRY
 * pattern for the SUBJECT axis (who-does-what) — the missing layer
 * between the canonical access bundles in `@/access/auth` and
 * the per-collection / per-chain feature gates.
 *
 * Adding a new role:
 *   1. Append an entry below with id + standards + competencies + SoD.
 *   2. Add the id to `UserRole` in `@/types/auth/types.ts`.
 *   3. The architecture invariants check the registry stays consistent.
 *
 * @standard ISO 27002:2022 §5.4 segregation-of-duties
 * @standard COBIT 5 PO4.11 segregation-of-duties
 * @standard SOX §404 internal-controls + §302 officer-certifications
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-role-traceability
 */

import type { UserRole } from '../../types/auth'

/** A single role entry. */
export interface RoleEntry {
  /** Stable role id — matches `users.roles[]` and `UserRole` union. */
  readonly id: UserRole
  /** Human-readable label. */
  readonly name: string
  /** Single-paragraph description. */
  readonly description: string
  /** Body of standards the role-holder must satisfy. */
  readonly standards: ReadonlyArray<string>
  /** Domain competencies required (for HR / training). */
  readonly competencies: ReadonlyArray<string>
  /** Recognised certifications that satisfy the role (any one suffices). */
  readonly recognisedCertifications?: ReadonlyArray<string>
  /** Roles that MUST NOT be held simultaneously by the same user (SoD). */
  readonly mutuallyExclusiveWith: ReadonlyArray<UserRole>
  /** Subscription tiers this role is available in (null = all tiers). */
  readonly availableInTiers: ReadonlyArray<'free' | 'solo' | 'team' | 'business' | 'enterprise'> | null
  /** Default approval-chain step kind this role can decide on. */
  readonly canDecide?: ReadonlyArray<'approve' | 'reject' | 'delegate' | 'escalate'>
}

export type RolesRegistry = Readonly<Record<UserRole, RoleEntry>>

/** Single source of truth for every role in ERPax. */
export const ROLES_REGISTRY: RolesRegistry = {
  'super-admin': {
    id: 'super-admin',
    name: 'Super Administrator',
    description: 'Platform-level admin; can read every tenant. Reserved for ERPax operations + on-call. Per ISO 27002 §5.18, super-admin actions MUST be logged separately.',
    standards: ['ISO 27001 A.5.16 identity-management', 'ISO 27002 §5.18 access-rights', 'NIST SP-800-53 AC-5 separation-of-duties'],
    competencies: ['platform-operations', 'tenant-isolation', 'incident-response'],
    mutuallyExclusiveWith: [],
    availableInTiers: null,
    canDecide: ['approve', 'reject', 'delegate', 'escalate'],
  },
  'admin': {
    id: 'admin',
    name: 'Tenant Administrator',
    description: 'Full read/write across the tenant. Configures users, plans, integrations. Per SOX §404, tenant admins SHOULD NOT perform routine accounting writes (delegate to accountant role).',
    standards: ['ISO 27001 A.5.15 access-control', 'ISO 27001 A.5.16 identity-management', 'SOX §404 internal-controls'],
    competencies: ['tenant-administration', 'user-provisioning', 'subscription-management'],
    mutuallyExclusiveWith: ['auditor', 'customer', 'audit-staff'], // operational admin ≠ auditor/audit-staff (SoD); customer is external-only
    availableInTiers: null,
    canDecide: ['approve', 'reject', 'delegate', 'escalate'],
  },
  'accountant': {
    id: 'accountant',
    name: 'Accountant',
    description: 'Posts journal entries, performs reconciliations, prepares period close. Cannot approve own JE per SOX §404 four-eyes; cannot also serve as auditor per ISO 27002 §5.4.',
    standards: ['IFAC IES 1-8 international-education-standards', 'IFRS Conceptual Framework', 'IFAC Code of Ethics §100', 'SOX §404 four-eyes', 'ISO 27002 §5.4 segregation-of-duties'],
    competencies: ['journal-entry-prep', 'period-close', 'reconciliation', 'financial-statements', 'tax-compliance'],
    recognisedCertifications: ['CPA (US)', 'ACCA (UK/EU)', 'CIMA (UK)', 'CA (UK/IE/AU/CA)', 'ESV (BG)', 'national equivalent'],
    mutuallyExclusiveWith: ['auditor', 'customer', 'audit-staff', 'compliance-officer'], // SOX §404 — preparer ≠ auditor/audit-staff/compliance-officer; customer is external-only
    availableInTiers: ['solo', 'team', 'business', 'enterprise'],
    canDecide: ['approve', 'reject'],
  },
  'auditor': {
    id: 'auditor',
    name: 'Auditor (internal or external)',
    description: 'Read-only access to GL + audit trail + control tests. Verifies financial statements, attests SOX §404 controls, signs ISAE 3000 sustainability assurance. Mutually exclusive with admin + accountant per ISO 27002 §5.4 + COBIT 5 PO4.11.',
    standards: ['ISA 200-720 international-standards-on-auditing', 'ISA 600 group-audits', 'ISO 19011:2018 §7 auditor-competence', 'IIA International Professional Practices Framework (IPPF)', 'ISAE 3000 limited-assurance', 'ISAE 3410 ghg-statements'],
    competencies: ['evidence-gathering', 'control-testing', 'risk-assessment', 'reporting'],
    recognisedCertifications: ['CPA + audit specialty', 'CIA (Certified Internal Auditor)', 'CISA (info systems audit)', 'national audit-licence'],
    mutuallyExclusiveWith: ['admin', 'accountant', 'customer', 'finance', 'hr', 'payroll-officer', 'manager', 'director'],
    availableInTiers: ['business', 'enterprise'],
    canDecide: ['approve', 'reject'],
  },
  'user': {
    id: 'user',
    name: 'Standard User',
    description: 'Default tenant member — can read assigned data, submit timesheets, expense reports, leave requests. Cannot approve.',
    standards: ['ISO 27001 A.5.15 access-control'],
    competencies: ['document-creation', 'time-entry', 'expense-submission'],
    mutuallyExclusiveWith: [],
    availableInTiers: null,
  },
  'customer': {
    id: 'customer',
    name: 'Customer Portal User',
    description: 'External customer accessing their own invoices, payments, and quotes via the customer portal. Tenant-scoped and per-customer-scoped.',
    standards: ['ISO 27001 A.5.23 cloud-service-tenant-isolation', 'GDPR Art.5(1)(b) purpose-limitation'],
    competencies: ['self-service-portal'],
    mutuallyExclusiveWith: ['admin', 'accountant', 'auditor', 'audit-staff'], // never grant internal roles to a customer
    availableInTiers: null,
  },
  'viewer': {
    id: 'viewer',
    name: 'Read-only Viewer',
    description: 'Read-only access for stakeholders (board members, investors, regulators) who need visibility without write capability.',
    standards: ['ISO 27001 A.5.15 access-control', 'ISO 27001 A.5.18 access-rights'],
    competencies: ['report-consumption'],
    mutuallyExclusiveWith: [],
    availableInTiers: null,
  },
  'audit-staff': {
    id: 'audit-staff',
    name: 'Audit Staff',
    description: 'Junior audit personnel working under auditor supervision — gathers evidence, executes control tests, drafts findings. Read access to GL + audit trail. Per ISO 27002 §5.4 + SOX §404, cannot also prepare the records being audited.',
    standards: ['ISA 200-720 international-standards-on-auditing', 'ISO 19011:2018 §7 auditor-competence', 'IIA IPPF', 'ISO 27002 §5.4 segregation-of-duties'],
    competencies: ['evidence-gathering', 'control-testing', 'working-paper-prep'],
    recognisedCertifications: ['CIA candidate', 'CISA candidate', 'audit-trainee'],
    mutuallyExclusiveWith: ['admin', 'accountant', 'customer'],
    availableInTiers: ['business', 'enterprise'],
    canDecide: ['approve', 'reject'],
  },
  'compliance-officer': {
    id: 'compliance-officer',
    name: 'Compliance Officer',
    description: 'Owns regulatory compliance — policies, GDPR records, SOX/statutory filings, remediation plans. Read/write on compliance + governance collections. Per ISO 27002 §5.4, kept distinct from the accountant who prepares the underlying records.',
    standards: ['SOX §302 officer-certifications', 'SOX §404 internal-controls', 'GDPR Art.37-39 data-protection-officer', 'ISO 37301:2021 compliance-management', 'ISO 27002 §5.4 segregation-of-duties'],
    competencies: ['regulatory-compliance', 'policy-management', 'data-protection', 'remediation-tracking'],
    recognisedCertifications: ['CCEP', 'CIPP', 'national compliance-licence'],
    mutuallyExclusiveWith: ['accountant'],
    availableInTiers: ['business', 'enterprise'],
    canDecide: ['approve', 'reject', 'escalate'],
  },
  'finance': {
    id: 'finance',
    name: 'Finance (FP&A / Treasury)',
    description: 'Finance-team member beyond bookkeeping — budgeting, forecasting, treasury/cash management, financial analysis. Reads GL + financial statements; writes budgets, forecasts, cash positions. Per ISO 27002 §5.4, kept distinct from the independent auditor.',
    standards: ['IFRS Conceptual Framework', 'IFAC Code of Ethics §100', 'ISO 27002 §5.4 segregation-of-duties'],
    competencies: ['budgeting', 'forecasting', 'treasury-management', 'financial-analysis'],
    recognisedCertifications: ['CFA', 'CTP', 'FMVA'],
    mutuallyExclusiveWith: ['auditor'],
    availableInTiers: ['team', 'business', 'enterprise'],
    canDecide: ['approve', 'reject'],
  },
  'hr': {
    id: 'hr',
    name: 'Human Resources',
    description: 'Manages employee records, time-and-attendance, and leave. Read/write on HR + workforce collections. Per ISO 27002 §5.4, kept distinct from the independent auditor; per GDPR Art.5, processes employee data on a lawful, minimised basis.',
    standards: ['ISO 27001 A.5.15 access-control', 'GDPR Art.5 lawfulness-of-processing', 'ISO 27002 §5.4 segregation-of-duties'],
    competencies: ['employee-records', 'time-and-attendance', 'leave-management', 'onboarding'],
    mutuallyExclusiveWith: ['auditor'],
    availableInTiers: ['team', 'business', 'enterprise'],
    canDecide: ['approve', 'reject'],
  },
  'payroll-officer': {
    id: 'payroll-officer',
    name: 'Payroll Officer',
    description: 'Runs payroll cycles — wage calculation and statutory withholding. Per SOX §404 four-eyes, cannot approve own payroll run; per ISO 27002 §5.4, kept distinct from the independent auditor.',
    standards: ['ISO 27001 A.5.15 access-control', 'SOX §404 four-eyes', 'ISO 27002 §5.4 segregation-of-duties'],
    competencies: ['payroll-processing', 'wage-calculation', 'statutory-withholding'],
    mutuallyExclusiveWith: ['auditor'],
    availableInTiers: ['team', 'business', 'enterprise'],
    canDecide: ['approve', 'reject'],
  },
  'manager': {
    id: 'manager',
    name: 'Manager',
    description: 'Line / department manager who approves operational documents (commitments, expenses, leave) within their scope. Per ISO 27002 §5.4, kept distinct from the independent auditor.',
    standards: ['ISO 27001 A.5.15 access-control', 'SOX §404 internal-controls', 'ISO 27002 §5.4 segregation-of-duties'],
    competencies: ['operational-approval', 'budget-oversight', 'team-management'],
    mutuallyExclusiveWith: ['auditor'],
    availableInTiers: ['team', 'business', 'enterprise'],
    canDecide: ['approve', 'reject', 'delegate'],
  },
  'director': {
    id: 'director',
    name: 'Director',
    description: 'Senior approver / authorizer for high-value commitments and governance actions. Per SOX §302, may carry officer-certification duties; per ISO 27002 §5.4, kept distinct from the independent auditor.',
    standards: ['ISO 27001 A.5.15 access-control', 'SOX §302 officer-certifications', 'SOX §404 internal-controls', 'ISO 27002 §5.4 segregation-of-duties'],
    competencies: ['executive-authorization', 'governance-oversight', 'commitment-approval'],
    mutuallyExclusiveWith: ['auditor'],
    availableInTiers: ['business', 'enterprise'],
    canDecide: ['approve', 'reject', 'delegate', 'escalate'],
  },
} as const

/** All registered role ids. */
export const ROLE_IDS = Object.keys(ROLES_REGISTRY) as ReadonlyArray<UserRole>

/**
 * The accounting/finance WRITE roles — the SOX §404 preparer set: `admin`
 * (full tenant write) + `accountant` (the designated preparer). The single
 * source of truth for "who may write financial data", so the access bundles
 * (`accountingCollectionAccess`, `tenantAdminWriteAccess`), the `adminOrAccountant`
 * predicate, and every per-collection gate reference ONE definition instead of
 * re-listing the pair. If a richer per-role capability model is added to the
 * registry, derive this from it (`ROLE_IDS.filter(r => …writesAccounting)`).
 */
export const ACCOUNTING_WRITE_ROLES: ReadonlyArray<UserRole> = ['admin', 'accountant']

/** Roles that satisfy the segregation-of-duties matrix for a given role. */
export function rolesIncompatibleWith(role: UserRole): ReadonlyArray<UserRole> {
  return ROLES_REGISTRY[role]?.mutuallyExclusiveWith ?? []
}

/** Validate that an array of roles a user holds doesn't violate SoD. */
export function validateUserRoleSet(userRoles: ReadonlyArray<UserRole>): {
  ok: boolean
  violations: ReadonlyArray<{ role: UserRole; conflictsWith: UserRole }>
} {
  const violations: Array<{ role: UserRole; conflictsWith: UserRole }> = []
  for (const r of userRoles) {
    for (const conflict of rolesIncompatibleWith(r)) {
      if (userRoles.includes(conflict)) {
        // Avoid double-reporting symmetrical pairs.
        if (!violations.some((v) => v.role === conflict && v.conflictsWith === r)) {
          violations.push({ role: r, conflictsWith: conflict })
        }
      }
    }
  }
  return { ok: violations.length === 0, violations }
}
