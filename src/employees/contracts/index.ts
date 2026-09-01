/**
 * EmployeeContracts — the employment contract: the labour anchor the shift ledger hangs from.
 *
 * A HOMONYM, deliberately distinct by path ([[path]]: the full path is the account code, homonyms never
 * merge). `customers/contracts` is the IFRS-15 §10 revenue contract *with a customer*; this is the labour-law
 * contract *with an employee* — same word, different domain, different account. Neither is the other's model.
 *
 * DATA-TRUTH (etrima `employee_contracts`, N=919 — 20 years of real Bulgarian garment employment):
 *  - **The labour anchor.** `work_shifts` (376 780 rows) reference the contract: a shift is worked UNDER a
 *    contract, so the contract is what makes labour attributable ([[machine]] runs the phase, the contract
 *    says who may work it and at what rate).
 *  - `legal_ground` (622 / 68%) is the **Bulgarian Labour Code article** — and it is FREE TEXT, not an enum:
 *    real values are `70` (312), `67` (254), `чл.70`, `чл.68ал.1,` — the same article written four ways in
 *    one column. Twenty years produced no closed vocabulary; a select here would reject real data.
 *  - **70% fixed-term** (432 with an `end_date`) vs 30% indefinite (180) — `endDate` absent IS the indefinite
 *    contract, not missing data.
 *  - `pay_rate` (611) with `pay_period` uniformly `month` (614) — the monthly rate is the pay anchor.
 *  - Lifecycle: `started` (591) → `stopped` (11). Contracts start; they rarely stop in the record.
 *
 * DEAD COLUMNS — defined, never used, **not ported**: `declared` (0) and `delivered` (0) — the НАП
 * registration lifecycle was never tracked here; `retired_since` (1); and `hours_per_day` · `days_per_week` ·
 * `notice_months` · `paid_annual_leave_days` (all 17/919 ≈ 2%) · `probationary_months` (16). Porting a column
 * the source never filled would invent a domain ([[port]]).
 *
 * The `employer` collapses to the TENANT (erpax is multi-tenant; etrima's `employer_id → accounts` is the
 * tenant scope here), so it is not a field.
 *
 * @standard Bulgarian Labour Code (Кодекс на труда) — чл.67 indefinite · чл.68 fixed-term · чл.70 probationary
 * @standard ISO-8601 — contract term dates
 * @audit ISO-19011:2018 — audit trail on contract changes
 *
 * Composes [[employees]] · [[port]] · [[path]] · [[law]].
 */
import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { referenceField, statusField, auditFields, notesField } from '@/base/accounting/field'

const EmployeeContracts: CollectionConfig = {
  slug: 'employee-contracts',
  labels: { singular: 'Employment Contract', plural: 'Employment Contracts' },
  admin: {
    useAsTitle: 'number',
    defaultColumns: ['number', 'employee', 'legalGround', 'startDate', 'endDate', 'status'],
    group: 'People',
    description:
      'The employment contract — the labour anchor a work shift is worked under. Distinct from the IFRS-15 customer contract (homonym, different path).',
  },
  access: accountingCollectionAccess({}),
  fields: [
    referenceField({ name: 'number', description: 'Contract number (the document identity).' }),
    { name: 'date', type: 'date', index: true, admin: { description: 'Date the contract was signed.' } },
    { name: 'place', type: 'text', admin: { description: 'Place of signing.' } },
    {
      name: 'employee',
      type: 'relationship',
      relationTo: 'employees',
      required: true,
      index: true,
      admin: { description: 'The employee party. The employer party is the tenant (multi-tenant scope).' },
    },
    {
      name: 'position',
      type: 'relationship',
      relationTo: 'job-positions',
      index: true,
      admin: { description: 'Position held under this contract (616/919 in etrima).' },
    },
    {
      name: 'legalGround',
      type: 'text',
      index: true,
      admin: {
        description:
          'Bulgarian Labour Code article (чл.67 indefinite · чл.68 fixed-term · чл.70 probationary). OPEN TEXT, never an enum — real data writes one article four ways (`70`, `чл.70`, `чл.68ал.1,`).',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      index: true,
      admin: { description: 'Term start (612/919).' },
    },
    {
      name: 'endDate',
      type: 'date',
      index: true,
      admin: {
        description:
          'Term end. ABSENT = an indefinite contract (30% of etrima), not missing data; present = fixed-term (70%).',
      },
    },
    {
      name: 'payRate',
      type: 'number',
      min: 0,
      admin: { description: 'The pay anchor per payPeriod (611/919).' },
    },
    {
      name: 'payPeriod',
      type: 'text',
      admin: { description: 'Period the rate applies to — uniformly `month` in etrima (614/919).' },
    },
    { name: 'terms', type: 'textarea', admin: { description: 'Free-text contractual terms (461/919).' } },
    {
      name: 'startedAt',
      type: 'date',
      admin: { description: 'Contract actually commenced (591/919) — the lifecycle, not the term.' },
    },
    {
      name: 'stoppedAt',
      type: 'date',
      admin: { description: 'Contract ceased (11/919 — contracts rarely stop in the record).' },
    },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Ended', value: 'ended' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('employee-contracts'),
  timestamps: true,
}

export default EmployeeContracts

/** @index-cross.foldback child=employees/contracts parent=employees — this cross folds back into its parent. */
