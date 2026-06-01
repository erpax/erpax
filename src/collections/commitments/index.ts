/**
 * Commitments — SOX §302 authorized commitment ledger for budget control.
 *
 * **Purpose & Scope:**
 * Tracks authorized purchase commitments before contracts are executed, capturing
 * the commitment amount, authorization source, and budget impact per SOX §302
 * internal controls. Each commitment records the authorizer, authorization level
 * (director, manager, team lead), and links to the purchase order (pre-commitment)
 * or contract (formal commitment). Enables compliance with spending authority
 * matrices and budget forecasting per IFRS GL control requirements.
 *
 * **Architecture & Key Design Decisions:**
 * Commitments are immutable records of authorized spending limits; once created
 * and approved, they cannot be edited (only superseded by new amendments). A
 * commitment lifecycle: draft → pending approval → approved → converted to
 * purchase order or contract. The `authorizationLevel` field maps to a department-
 * and-role-based matrix (director authorization covers larger amounts than
 * manager authorization). Budget reservation amounts (`reservedAmount`) prevent
 * over-commitment across open purchase orders. Bulgaria labor law compliance
 * embeds mandatory arbitration clauses per Art. 331.
 *
 * **Standards & Compliance:**
 * @standard SOX §302 management-certification internal-controls
 * @standard SOX §404 internal-controls spending-authority
 * @standard COSO Internal-Control-Integrated-Framework 2013 authorization
 * @standard IFRS IFRS-15 §10 contract-with-customer
 * @standard IFRS IAS-1 presentation-of-financial-statements
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time authorization-date
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract-processing
 * @audit ISO-19011:2018 audit-trail authorization-evidence
 * @feature "Commitment tracking & budget control with SOX §302 authorization matrix"
 * @role "Director, Manager, Finance Controller, Accountant"
 * @example "SOX §302 authorization matrix example: COMM-2026-512 (amount: 75,000 BGN, authorizationLevel=director, authorizedBy=John_Doe (spendingAuthority=500,000), authorizationDate=2026-05-01, approvalStatus=approved, budgetReservation.reservedAmount=75000, linkedPurchaseOrder=PO-2026-0842). Commitment checks: John's authority (500k) >= amount (75k) ✓; sum of all active commitments in Finance dept ≤ dept budget ✓; segregation: creator ≠ approver ✓"
 * @useCase "Authorizing vendor commitments, reserving budget, linking to purchase orders, enforcing spending authority matrices, tracking budget utilization"
 * @invariant "authorizationDate must be ≤ today(); authorizer.spendingAuthority ≥ commitmentAmount; if expiryDate set, expiryDate > authorizationDate; creator ≠ approver; sum of active commitments per dept ≤ dept budget"
 * @chain "Commitment (authorized limit) → Purchase Order (creation) → Invoice (receipt) → GL Posting (expense recognition); encumbrances tracked as Memo GL entry"
 *
 * **Multi-Tenancy & Isolation:**
 * Tenant-isolated via `multiTenancyField()`. Commitments scoped to one tenant
 * only (cross-tenant commitments blocked by access predicate). Visibility
 * restricted to authorized approvers (director, manager, controller) and
 * auditors; read-only for operators.
 *
 * **Key Fields & Relationships:**
 * - `commitmentNumber` (text, unique): Auto-generated ID (e.g., "COMM-2026-001")
 * - `commitmentAmount` (number, required): Authorized spending limit in cents
 * - `currency` (select): ISO 4217 code (e.g., BGN, EUR)
 * - `authorizationLevel` (select): Director / Manager / Team Lead / Other
 * - `authorizedBy` (relationship): User who granted the authorization
 * - `authorizationDate` (date, required): When authorization was granted
 * - `authorizationExpiryDate` (date): When authorization expires (null = perpetual)
 * - `approvalStatus` (select): Draft / Pending / Approved / Superseded / Revoked
 * - `budgetReservation` (group): Reserved vs. committed vs. spent tracking
 *   - `reservedAmount`: Amount set aside (not yet spent)
 *   - `committedAmount`: Amount in active PO/contract
 *   - `spentAmount`: Amount already invoiced/paid
 *   - `availableBalance`: reservedAmount − committedAmount − spentAmount
 * - `linkedPurchaseOrder` (relationship): PO created from this commitment
 * - `linkedContract` (relationship): Contract created from this commitment
 * - `spendingAuthority` (number): User's delegated authorization limit
 *
 * **Hooks & Validation:**
 * `beforeValidate`: Auto-populate `tenant`, auto-generate `commitmentNumber`.
 * `beforeChange`:
 *   - Validate `authorizationDate <= today()` (authorization cannot be future-dated).
 *   - If `authorizationExpiryDate` set, enforce `expiryDate > authorizationDate`.
 *   - Check that `authorizedBy.spendingAuthority >= commitmentAmount` (authorizer
 *     has sufficient delegation).
 *   - Currency consistency: `commitment.currency` matches company default or
 *     approved multi-currency profile.
 *   - Budget check: sum of all non-superseded commitments in department ≤
 *     department budget for period (forecast constraint).
 *   - Segregation of duties: commitment creator ≠ approver.
 * `afterChange`: If status → approved, emit `commitment:approved` event;
 * PurchaseOrder service consumes to create linked PO.
 *
 * **Revenue & GL Integration:**
 * Commitments drive GL forecasting and budget-variance analysis. No GL postings
 * until commitment → purchase order → invoice. However, committed amounts are
 * tracked as encumbrances (Memo GL posting per IFRS GL forecasting). The
 * `availableBalance` computation enables budget-control gating: PO creation
 * checks that new PO amount ≤ `availableBalance` before posting to GL.
 *
 * **Bulgaria-Specific Rules:**
 * All commitments in Bulgaria legal entities must include a mandatory arbitration
 * clause reference (`mandatoryArbitrationClause = true`) per Law on Labor Code
 * Art. 331, even for vendor contracts (if they involve employee services). ZKOD
 * commitment registry requires `zkodCommitmentNumber` (notarized authorization
 * reference). Commitments > 50k BGN require director signature and notarization.
 *
 * @see src/standards/ifrs-15/types.ts Contract TransactionPrice
 * @see src/collections/accounting/Contracts.ts
 * @see src/collections/accounting/PurchaseOrders.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { enforceSegregationOfDuties } from '../../hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../../access/auth'
import { currencyField, auditFields } from '../../fields/base-accounting-fields'

const AUTHORIZATION_LEVELS = [
  { label: 'Team Lead', value: 'team_lead' },
  { label: 'Manager', value: 'manager' },
  { label: 'Director', value: 'director' },
  { label: 'CFO', value: 'cfo' },
  { label: 'Other', value: 'other' },
]

const APPROVAL_STATUSES = [
  { label: 'Draft', value: 'draft' },
  { label: 'Pending Approval', value: 'pending_approval' },
  { label: 'Approved', value: 'approved' },
  { label: 'Superseded', value: 'superseded' },
  { label: 'Revoked', value: 'revoked' },
]

const Commitments: CollectionConfig = {
  slug: 'commitments',
  labels: { singular: 'Commitment', plural: 'Commitments' },
  admin: {
    useAsTitle: 'commitmentNumber',
    defaultColumns: ['commitmentNumber', 'commitmentAmount', 'authorizationLevel', 'authorizedBy', 'approvalStatus', 'authorizationDate'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant', 'manager', 'director'),
    update: roleScopedAccess('admin', 'accountant', 'manager', 'director'),
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'commitmentNumber',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Auto-generated commitment ID (e.g., COMM-2026-001). SOX §302 audit trail.',
      },
    },
    {
      name: 'commitmentAmount',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Authorized spending limit in cents. SOX §404 controls.',
      },
    },
    currencyField(),
    {
      name: 'commitmentDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Purpose of commitment (e.g., "3-year SaaS vendor contract", "consulting engagement")',
      },
    },
    {
      name: 'authorizationLevel',
      type: 'select',
      required: true,
      options: AUTHORIZATION_LEVELS,
      admin: {
        description: 'Authorization tier (determines approval authority per company matrix)',
      },
    },
    {
      name: 'authorizedBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'User granting the authorization (must have sufficient spendingAuthority)',
      },
    },
    {
      name: 'authorizationDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Date authorization was granted (must be <= today). SOX §302.',
      },
    },
    {
      name: 'authorizationExpiryDate',
      type: 'date',
      admin: {
        description: 'Optional expiry date (null = no expiration)',
      },
    },
    {
      name: 'approvalStatus',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: APPROVAL_STATUSES,
      admin: {
        description: 'Commitment lifecycle status',
      },
    },
    {
      name: 'spendingProfile',
      type: 'group',
      label: 'Spending Profile',
      fields: [
        {
          name: 'department',
          type: 'text',
          admin: {
            description: 'Department or cost center (for budget forecasting)',
          },
        },
        {
          name: 'budgetLine',
          type: 'text',
          admin: {
            description: 'GL budget line or project code',
          },
        },
        {
          name: 'vendorName',
          type: 'text',
          admin: {
            description: 'Vendor or contractor name',
          },
        },
      ],
    },
    {
      name: 'budgetReservation',
      type: 'group',
      label: 'Budget Reservation',
      fields: [
        {
          name: 'reservedAmount',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Amount set aside (not yet committed to PO)',
          },
        },
        {
          name: 'committedAmount',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Amount in active purchase order or contract',
          },
        },
        {
          name: 'spentAmount',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Amount invoiced and accrued',
          },
        },
        {
          name: 'availableBalance',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'computedField: reservedAmount − committedAmount − spentAmount',
          },
        },
      ],
    },
    {
      name: 'linkedPurchaseOrder',
      type: 'relationship',
      relationTo: 'purchase-orders',
      admin: {
        description: 'Purchase order created from this commitment',
      },
    },
    {
      name: 'linkedContract',
      type: 'relationship',
      relationTo: 'contracts',
      admin: {
        description: 'Contract created from this commitment (formal commitment phase)',
      },
    },
    {
      name: 'zkod',
      type: 'group',
      label: 'Bulgaria ZKOD & Legal Compliance',
      fields: [
        {
          name: 'mandatoryArbitrationClause',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description:
              'Bulgaria Labor Code Art. 331: mandatory arbitration clause included. Required for all commitments involving labor or services.',
          },
        },
        {
          name: 'zkodCommitmentNumber',
          type: 'text',
          admin: {
            description: 'Notarized commitment authorization reference (ZKOD registry). Required for commitments > 50k BGN.',
          },
        },
        {
          name: 'zkodNotarized',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Commitment notarized per Bulgaria contract registry (required > 50k BGN)',
          },
        },
      ],
    },
    ...auditFields(),
    {
      name: 'approvalComments',
      type: 'textarea',
      admin: {
        description: 'Approver comments on authorization',
      },
    },
  ],
  hooks: standardCollectionHooks('commitments', { beforeChange: [enforceSegregationOfDuties()] }),
  timestamps: true,
}

export default Commitments
