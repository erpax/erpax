import type { CollectionConfig } from 'payload'
import { autoPopulateHost } from '@/hooks/autoPopulateHost'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import {
  multiTenancyField,
  glAccountField,
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '../fields/base-accounting-fields'
import { validateNotLocked } from '../utilities/period-lock'

/**
 * Budget Planning — period-budgets by department / cost-center.
 *
 * Slice WW (post-cleanup): switched from inlined access/fields to the
 * shared `@/plugins/auth/access` predicates and `@/plugins/accounting/fields`
 * factories. Adds period-lock enforcement (was missing — IFRS IAS-8 / SOX
 * §404 requires no back-dated edits inside a closed period), segregation
 * of duties on approval, audit-trail emission, and ISO-8601 timestamp
 * auto-set on `approvedAt` when `approvedBy` lands.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time fiscal-year period
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
 * @accounting US-GAAP ASC-270 interim-reporting
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls budget-approval-workflow
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.4 segregation-of-duties approval-vs-creation
 * @see docs/STANDARDS.md §4.2
 */
const BudgetPlanning: CollectionConfig = {
  slug: 'budget-planning',
  labels: { singular: 'Budget Plan', plural: 'Budget Plans' },
  admin: {
    useAsTitle: 'budgetId',
    defaultColumns: ['budgetId', 'fiscalYear', 'department', 'totalBudget', 'status'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'budgetId', type: 'text', required: true, unique: true },
    { name: 'fiscalYear', type: 'number', required: true, min: 2000, max: 2100 },
    { name: 'department', type: 'text', required: true, admin: { description: 'Department or cost center' } },
    {
      name: 'budgetPeriod',
      type: 'select',
      defaultValue: 'monthly',
      options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Annual', value: 'annual' },
      ],
    },
    {
      name: 'budgetLineItems',
      type: 'array',
      minRows: 1,
      fields: [
        ...glAccountField(true),
        { name: 'accountType', type: 'text', admin: { disabled: true } },
        { name: 'budgetAmount', type: 'number', required: true, min: 0 },
        { name: 'notes', type: 'textarea' },
      ],
    },
    { name: 'totalBudget', type: 'number', defaultValue: 0, admin: { disabled: true } },
    currencyField(),
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Approved', value: 'approved' },
        { label: 'Active', value: 'active' },
        { label: 'Archived', value: 'archived' },
      ],
      'draft',
    ),
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateHost],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      enforceSegregationOfDuties(),
      autoSetTimestamp('approvedAt', (data) => Boolean((data as { approvedBy?: unknown }).approvedBy)),
      async ({ data }) => {
        // Calculate total budget from line items.
        if (data.budgetLineItems) {
          data.totalBudget = (data.budgetLineItems as Array<{ budgetAmount?: number }>).reduce(
            (sum: number, item) => sum + (item.budgetAmount || 0),
            0,
          )
        }
        return data
      },
    ],
    afterChange: [auditTrailAfterChange('budget-planning')],
  },
  timestamps: true,
}

export default BudgetPlanning
