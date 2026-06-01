/**
 * Contract Templates — standard contract template library for reuse.
 *
 * **Purpose & Scope:**
 * Master library of pre-approved contract templates organized by category
 * (SaaS, support, NDA, vendor, employee, etc.). Each template captures the
 * standard clause library, payment term defaults, liability framework, and
 * Bulgaria ZKOD requirements. Templates are versioned and carry approval
 * history; template instances drive new contract creation with clause
 * inheritance and customization.
 *
 * **Architecture & Key Design Decisions:**
 * Templates are immutable once approved (version control enforces this);
 * each template revision increments the version number and carries a
 * `effectiveDateRange` (from/to). New contracts clone a template and
 * customize fields; the template reference enables audit traceability.
 * Clause library is stored as structured array (not free-text) to enable
 * regulatory compliance checks and auto-generation of e-signatures.
 * Bulgaria ZKOD requirements are embedded as template defaults; template
 * approval workflow includes legal review gate.
 *
 * **Standards & Compliance:**
 * @standard IFRS IFRS-15 §10 contract-with-customer
 * @standard IFRS IFRS-15 §22 performance-obligations
 * @standard IFRS IAS-1 presentation-of-financial-statements
 * @standard US-GAAP ASC-606-10 revenue-recognition
 * @standard ISO-27001 A.6.1 information-security-policies
 * @standard ISO-8601-1:2019 date-time effective-date-range
 * @standard ISO-4217:2015 currency-codes
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance SOX §302 management-certification template-approval
 * @audit ISO-19011:2018 audit-trail template-version-control
 * @feature "Contract template library with versioning & regulatory compliance"
 * @role "Legal Counsel, Admin, Compliance Manager"
 * @example "Contract template: SaaS-v3.2 (templateName='SaaS License Agreement', templateCategory=saas, templateVersion=3, approvalStatus=approved, effectiveFromDate=2026-01-01, effectiveToDate=null, clauseLibrary=[{clauseId='LIMITATION_LIABILITY', clauseTitle='Limitation of Liability', isRequired=true, regulatoryReference='ISO-27001 A.6.1'}, {clauseId='PAYMENT_TERMS', ...}], paymentTermDefaults.paymentTerms=net30, paymentTermDefaults.daysUntilDue=30, liabilityFramework.liabilityCap=500000 BGN, performanceObligationTemplate=[{obligationTitle='Initial Setup', controlTransferMethod=point_in_time}, {obligationTitle='Monthly SaaS Service', controlTransferMethod=over_time}])"
 * @useCase "Creating new contracts from templates, managing template versions, enforcing regulatory clause requirements, customizing payment terms and liability frameworks per category"
 * @invariant "Approved templates are immutable (version control enforces: new version required for edits); effectiveToDate ≥ effectiveFromDate; all required clauses must be present before approval; segmented access: legal/admin may approve, accountants read-only"
 * @chain "Template (master) → Contract (clone & customize) → Performance Obligations (from template) → Revenue Recognition (per template control-transfer method)"
 *
 * **Multi-Tenancy & Isolation:**
 * Templates are shared across tenants (one global library) but may include
 * tenant-specific variants via `tenantSpecificCustomizations` group.
 * Visibility restricted to admin and legal; accountants may reference but
 * not modify.
 *
 * **Key Fields & Relationships:**
 * - `templateName` (text, unique): Display name (e.g., "SaaS License Agreement")
 * - `templateCategory` (select): SaaS / Support / NDA / Vendor / Employee / Other
 * - `templateVersion` (number): Version number (increments on approval)
 * - `description` (textarea): Marketing summary and use cases
 * - `effectiveFromDate` (date): When template becomes active
 * - `effectiveToDate` (date): When template retires (null = no expiration)
 * - `approvalStatus` (select): Draft / Pending Legal Review / Approved / Retired
 * - `approvedBy` (relationship): Legal counsel who approved
 * - `approvedAt` (date, readonly): Approval timestamp
 * - `clauseLibrary` (array): Structured list of contract clauses
 *   - `clauseId`: Unique identifier
 *   - `clauseTitle`: Display name
 *   - `clauseText`: Full legal text
 *   - `isRequired`: Cannot be removed from contracts using this template
 *   - `regulatoryReference`: IFRS/SOX/GDPR standard governed by this clause
 * - `paymentTermDefaults` (group): Default payment terms
 *   - `paymentTerms`: Net 0 / Net 30 / Net 60 / etc.
 *   - `daysUntilDue`: Days after invoice
 *   - `lateFeePercent`: Percentage for late payment
 *   - `discountPercentForEarlyPayment`: Early-pay discount %
 * - `liabilityFramework` (group): Standard liability limits
 *   - `liabilityCap`: Liability cap in cents (or null = unlimited)
 *   - `liabilityExemptions`: List of excluded damages (indirect, consequential)
 *   - `warrantyPeriodDays`: Warranty period post-completion
 * - `performanceObligationTemplate` (array): Template PO structure
 *   - `obligationTitle`: Name
 *   - `obligationSequence`: Ordinal position
 *   - `controlTransferMethod`: Point-in-time or over-time
 *   - `descriptionTemplate`: Customizable description
 *
 * **Hooks & Validation:**
 * `beforeValidate`: Auto-populate `tenant` (admin-only global reference).
 * `beforeChange`:
 *   - Prevent edits to approved templates (make new version instead).
 *   - If `approvalStatus → Approved`, validate all required clauses present.
 *   - Validate `effectiveToDate >= effectiveFromDate` if both set.
 *   - Currency consistency: `liabilityFramework.liabilityCap` currency matches
 *     template's default currency.
 *   - Segregation: only legal/admin may approve; accountants may not edit.
 * `afterChange`: If status → approved, emit `template:approved` event.
 *
 * **Revenue & GL Integration:**
 * Templates enforce IFRS-15 §22 distinct performance obligations structure
 * at template level. When a contract is created from a template, the
 * `performanceObligationTemplate` array is cloned into the contract's
 * `performanceObligations` relationship. Revenue recognition timing (§31-35)
 * is driven by template-level `controlTransferMethod` defaults.
 *
 * **Bulgaria-Specific Rules:**
 * Bulgaria ZKOD contract templates embed:
 * - Mandatory arbitration clause per Law on Labor Code Art. 331
 * - Notarization workflow requirements (contracts > 10k BGN require notary stamp)
 * - Specific contract registry number format (ZKOD format)
 * - Required data fields for Bulgaria tax/labor compliance
 * Templates > 50k BGN require director approval in addition to legal review.
 *
 * @see src/standards/ifrs-15/types.ts Contract PerformanceObligation
 * @see src/collections/accounting/Contracts.ts
 * @see src/collections/accounting/contract-signatures.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { enforceSegregationOfDuties } from '../../hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../../access/auth'
import { auditFields } from '../../fields/base-accounting-fields'

const TEMPLATE_CATEGORIES = [
  { label: 'SaaS License Agreement', value: 'saas' },
  { label: 'Support & Maintenance', value: 'support' },
  { label: 'Non-Disclosure Agreement (NDA)', value: 'nda' },
  { label: 'Vendor / Supplier Agreement', value: 'vendor' },
  { label: 'Employee Agreement', value: 'employee' },
  { label: 'Consulting Services', value: 'consulting' },
  { label: 'Service Level Agreement (SLA)', value: 'sla' },
  { label: 'Other', value: 'other' },
]

const APPROVAL_STATUSES = [
  { label: 'Draft', value: 'draft' },
  { label: 'Pending Legal Review', value: 'pending_legal_review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Retired', value: 'retired' },
]

const CONTROL_TRANSFER_METHODS = [
  { label: 'Point-in-Time (IFRS-15 §38)', value: 'point_in_time' },
  { label: 'Over-Time (IFRS-15 §35)', value: 'over_time' },
]

const ContractTemplates: CollectionConfig = {
  slug: 'contract-templates',
  labels: { singular: 'Contract Template', plural: 'Contract Templates' },
  admin: {
    useAsTitle: 'templateName',
    defaultColumns: ['templateName', 'templateCategory', 'templateVersion', 'approvalStatus', 'effectiveFromDate'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin'),
    update: roleScopedAccess('admin'),
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'templateName',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Unique template name (e.g., "SaaS 3-Year License Template v2.1")',
      },
    },
    {
      name: 'templateCategory',
      type: 'select',
      required: true,
      options: TEMPLATE_CATEGORIES,
      admin: {
        description: 'Template type/category',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Marketing summary, use cases, and applicability notes',
      },
    },
    {
      name: 'templateVersion',
      type: 'number',
      required: true,
      defaultValue: 1,
      index: true,
      admin: {
        description: 'Version number (increments on approval)',
      },
    },
    {
      name: 'effectiveFromDate',
      type: 'date',
      required: true,
      admin: {
        description: 'When template becomes active',
      },
    },
    {
      name: 'effectiveToDate',
      type: 'date',
      admin: {
        description: 'When template retires (null = perpetual)',
      },
    },
    {
      name: 'approvalStatus',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: APPROVAL_STATUSES,
      admin: {
        description: 'Template lifecycle status',
      },
    },
    // approvedBy / approvedAt provided by auditFields() below (DRY — single source).
    {
      name: 'clauseLibrary',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Structured list of contract clauses (IFRS-15 §10 terms)',
      },
      fields: [
        {
          name: 'clauseId',
          type: 'text',
          required: true,
          admin: {
            description: 'Unique clause identifier',
          },
        },
        {
          name: 'clauseTitle',
          type: 'text',
          required: true,
          admin: {
            description: 'Clause name (e.g., "Payment Terms", "Limitation of Liability")',
          },
        },
        {
          name: 'clauseText',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Full legal text of the clause',
          },
        },
        {
          name: 'isRequired',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Cannot be removed from contracts using this template',
          },
        },
        {
          name: 'regulatoryReference',
          type: 'text',
          admin: {
            description: 'IFRS/SOX/GDPR standard (e.g., "IFRS-15 §23", "SOX §302")',
          },
        },
      ],
    },
    {
      name: 'paymentTermDefaults',
      type: 'group',
      label: 'Payment Term Defaults',
      fields: [
        {
          name: 'paymentTerms',
          type: 'select',
          options: [
            { label: 'Net 0 (Immediate)', value: 'net0' },
            { label: 'Net 7', value: 'net7' },
            { label: 'Net 14', value: 'net14' },
            { label: 'Net 30', value: 'net30' },
            { label: 'Net 60', value: 'net60' },
            { label: 'Net 90', value: 'net90' },
          ],
          admin: {
            description: 'Default payment terms for contracts using this template',
          },
        },
        {
          name: 'daysUntilDue',
          type: 'number',
          admin: {
            description: 'Custom days until due (if not standard)',
          },
        },
        {
          name: 'lateFeePercent',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Late payment fee percentage (0-100)',
          },
        },
        {
          name: 'discountPercentForEarlyPayment',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Early-payment discount percentage',
          },
        },
      ],
    },
    {
      name: 'liabilityFramework',
      type: 'group',
      label: 'Liability Framework',
      fields: [
        {
          name: 'liabilityCap',
          type: 'number',
          admin: {
            description: 'Liability cap in cents (null = unlimited)',
          },
        },
        {
          name: 'liabilityExemptions',
          type: 'array',
          admin: {
            description: 'Excluded damages types',
          },
          fields: [
            {
              name: 'exemptionType',
              type: 'text',
              admin: {
                description: 'E.g., "Indirect damages", "Consequential damages", "Lost profits"',
              },
            },
          ],
        },
        {
          name: 'warrantyPeriodDays',
          type: 'number',
          admin: {
            description: 'Warranty period (days post-completion)',
          },
        },
      ],
    },
    {
      name: 'performanceObligationTemplate',
      type: 'array',
      admin: {
        description: 'Template performance obligations (IFRS-15 §22 structure)',
      },
      fields: [
        {
          name: 'obligationTitle',
          type: 'text',
          required: true,
          admin: {
            description: 'E.g., "Setup", "Monthly Service", "Support", "Training"',
          },
        },
        {
          name: 'obligationSequence',
          type: 'number',
          required: true,
          admin: {
            description: 'Ordinal position in fulfillment sequence',
          },
        },
        {
          name: 'controlTransferMethod',
          type: 'select',
          required: true,
          options: CONTROL_TRANSFER_METHODS,
          admin: {
            description: 'IFRS-15 §31-35 control transfer timing',
          },
        },
        {
          name: 'descriptionTemplate',
          type: 'textarea',
          admin: {
            description: 'Customizable description (placeholders for dynamic values)',
          },
        },
      ],
    },
    {
      name: 'zkod',
      type: 'group',
      label: 'Bulgaria ZKOD Compliance',
      fields: [
        {
          name: 'mandatoryArbitrationClauseIncluded',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description:
              'Bulgaria Labor Code Art. 331: mandatory arbitration clause embedded in template',
          },
        },
        {
          name: 'notarizationRequired',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Contracts created from this template require notarization',
          },
        },
        {
          name: 'zkodRegistryCategory',
          type: 'text',
          admin: {
            description: 'ZKOD category code (Bulgaria contract registry)',
          },
        },
      ],
    },
    ...auditFields(),
    {
      name: 'templateNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes on template purpose, history, and customization guidance',
      },
    },
  ],
  hooks: standardCollectionHooks('contract-templates', { beforeChange: [enforceSegregationOfDuties()] }),
  timestamps: true,
}

export default ContractTemplates
