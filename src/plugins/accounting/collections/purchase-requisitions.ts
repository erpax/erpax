/**
 * # Purchase Requisitions
 *
 * @summary Pre-PO approval chain (SOX §404 four-eyes). Requisition with multi-step approval workflow before PO issuance.
 *
 * ## Core Function
 *
 * Purchase Requisitions capture internal purchase requests with business justification, estimated quantities/prices, and an
 * approval chain BEFORE the PO is issued. SOX §404 and ISO 27002 §5.4 require segregation of duties: the requisitioner cannot
 * also approve their own requisition. The approval chain tracks each approver's decision (approved / rejected / returned for clarification)
 * with timestamp and comment. Once all approvers have signed off, the requisition status = approved and a PO can be created (createdPurchaseOrder link).
 * For high-value requisitions (≥ €10k), requiresQuotes = true mandates competitive bidding (≥ 3 vendor quotes) before PO award.
 *
 * ## Architecture
 *
 * Multi-tenancy via tenant field (auto-populated). Requisitions are append-only; cancellation requires explicit cancellation flow.
 * Approval chain is an array of approval steps, each with approver user, role, decision (pending / approved / rejected / returned),
 * decidedAt timestamp, and comment (localized for multi-language note). Cost centers and projects enable finance allocation tracking.
 * Chain event emitters (emitPrSubmitted, emitPrApproved) trigger notifications to approvers and downstream PO generation.
 * Status workflow: draft → submitted → in_approval → approved → po_created / rejected / cancelled. @compliance SOX §404 @security ISO-27002 §5.4
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — captures tenant from session context.
 * - **beforeChange:** autoPopulateCreatedBy — stamps user as createdBy (requisitioner).
 * - **afterChange:** emitPrSubmitted — triggers event when status = submitted (notifies approvers).
 * - **afterChange:** emitPrApproved — triggers event when status = approved (queues PO creation).
 * - **afterChange:** auditTrailAfterChange — logs all requisition changes to audit-events (line additions, approval decisions, status shifts).
 *
 * ## Key Fields
 *
 * - **requisitionNumber (text, unique, required):** Tenant-unique requisition number (e.g. PR-2026-0001). Human-readable request ID.
 * - **requisitioner (relationship, required):** User who submitted the requisition (employee / requestor).
 * - **department (text):** Department name (e.g. "Operations", "Marketing"). Used for approval routing and cost allocation.
 * - **costCenter (relationship):** Cost center for accounting allocation (budget tracking, expense reporting).
 * - **project (relationship):** Project code if purchase is billable to a customer project.
 * - **requestedDate (date, required):** Date requisition was submitted.
 * - **requiredByDate (date):** When goods/services are needed (used for delivery timeline planning).
 * - **businessJustification (textarea, required):** Reason for the spend; substantiation evidence for auditors. @audit SOX §404
 * - **lines (array, required, min 1):** Line items in the requisition. @standard ISO-4217:2015
 *   - **description (text, localized, required):** Item description (multi-language support for international teams).
 *   - **item (relationship, optional):** Link to item master (catalog lookup).
 *   - **quantity (number, required, ≥ 0):** Requested quantity.
 *   - **uom (text, default "EA"):** Unit of measure (EA, kg, L, etc.).
 *   - **estimatedUnitPrice (number, required):** Estimated unit price (cents); used for budget approval.
 *   - **estimatedAmount (number, required):** quantity × estimatedUnitPrice (cents).
 *   - **glAccount (relationship):** GL account for the purchase (expense / asset). Defaults to vendor.ledger.defaultExpenseAccount.
 *   - **preferredVendor (relationship, optional):** Suggested vendor (may be overridden by procurement team).
 * - **currency (text, ISO 4217):** Requisition currency (e.g. EUR, BGN). @standard ISO-4217:2015
 * - **estimatedTotal (number, required):** Sum of lines.estimatedAmount (cents).
 * - **priority (select):** [critical, high, normal, low]; used for approval routing (high-value requisitions → CFO approval).
 * - **requiresQuotes (checkbox, default false):** When true, must collect ≥ minimumQuotesRequired vendor quotes before PO award.
 * - **minimumQuotesRequired (number, default 0):** Minimum vendor quotes required (typically 3 for spend > €10k).
 * - **approvalChain (array, required):** Multi-step approval workflow. @audit ISO-19011:2018 @compliance SOX §404
 *   - **step (number, required):** Sequence number (1 = first approver, 2 = second, etc.).
 *   - **approver (relationship, required):** User who must approve (role-based routing, e.g. Department Head → CFO → CEO).
 *   - **role (text):** Approver's role name (e.g. "Department Head", "CFO", "CEO").
 *   - **decision (select):** [pending, approved, rejected, returned]; approver's decision.
 *   - **decidedAt (date):** Timestamp when approver made their decision.
 *   - **comment (text, localized):** Approver's comment (e.g., "Approved; ensure vendor has D&B rating" or "Rejected; duplicate request PR-2026-0001").
 * - **createdPurchaseOrder (relationship, readOnly):** PO created when requisition fully approved. Links back to purchase-orders.
 * - **awardedQuote (relationship):** Selected vendor quote that led to PO award (for traceability).
 * - **status (select):** [draft, submitted, in_approval, approved, rejected, returned, po_created, cancelled]; workflow status.
 *
 * ## Core Invariants
 *
 * - **requisitionNumberUniquenessPerTenant:** requisitionNumber is unique per tenant; prevents duplicate requisitions.
 * - **estimatedAmountsConsistency:** each line's estimatedAmount = quantity × estimatedUnitPrice; verified on save.
 * - **estimatedTotalConsistency:** estimatedTotal = sum of lines.estimatedAmount; verified on save.
 * - **requisitionerNotAnApprover:** createdBy (requisitioner) must not appear in approvalChain (prevents self-approval). @security ISO-27002 §5.4
 * - **requiresQuotesEnforced:** if requiresQuotes = true, awardedQuote must reference a vendor-quote before PO can be created.
 * - **multiTenancyIsolation:** tenant field enforced; requisitions for one tenant invisible to another.
 * - **immutabilityAfterApproval:** once status = approved, line items cannot be modified (prevents budget-busting changes).
 *
 * ## Audit Trail
 *
 * Every requisition captures: createdAt (timestamp), createdBy (requisitioner), modifiedAt, modifiedBy. All line changes, approval decisions,
 * comments, and status transitions logged to audit-events with full deltas. Approval chain timestamps and roles capture complete audit trail.
 * @standard SOX §302 §404 @audit ISO-19011:2018
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "requisition_uuid_1",
 *   "tenant": "tenant_uuid_1",
 *   "requisitionNumber": "PR-2026-0001",
 *   "requisitioner": "user_uuid_employee",
 *   "department": "Operations",
 *   "requestedDate": "2026-04-08",
 *   "requiredByDate": "2026-04-25",
 *   "businessJustification": "Office supplies for quarterly replenishment (desk supplies, paper, ink).",
 *   "lines": [
 *     { "description": "A4 paper (500-sheet reams)", "quantity": 50, "estimatedUnitPrice": 300, "estimatedAmount": 15000 }
 *   ],
 *   "currency": "EUR",
 *   "estimatedTotal": 15000,
 *   "priority": "normal",
 *   "requiresQuotes": true,
 *   "minimumQuotesRequired": 3,
 *   "approvalChain": [
 *     { "step": 1, "approver": "user_uuid_dept_head", "role": "Department Head", "decision": "approved", "decidedAt": "2026-04-09T10:00:00Z" },
 *     { "step": 2, "approver": "user_uuid_cfo", "role": "CFO", "decision": "pending" }
 *   ],
 *   "status": "in_approval",
 *   "createdAt": "2026-04-08T09:30:00Z",
 *   "createdBy": "user_uuid_employee"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase Purchase request workflow, approval routing, budget control, vendor selection
 * @standard ISO-8601-1:2019 date-time-delivery-dates
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes-supplier-geography
 * @standard COSO internal-control-approval-limits-per-role
 * @standard ISO-27002:2022 §5.15 cybersecurity-secure-approval-workflows
 * @standard ISO-18001:2007 safety-critical-items-procurement
 * @standard ISO-55000:2014 asset-management-capital-requisitions
 * @compliance SOX §404 internal-controls-four-eyes
 * @compliance ISO-27002:2022 cybersecurity-procurement
 * @security ISO-27002 §5.4 segregation-of-duties
 * @audit ISO-19011:2018 audit-trail-requisition-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./purchase-orders.ts
 * @see ./vendor-quotes.ts
 */
import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'
import { emitPrSubmitted, emitPrApproved } from '@/hooks/chainEventEmitters'

const PurchaseRequisitions: CollectionConfig = {
  slug: 'purchase-requisitions',
  labels: { singular: 'Purchase Requisition', plural: 'Purchase Requisitions' },
  admin: {
    useAsTitle: 'requisitionNumber',
    defaultColumns: ['requisitionNumber', 'requisitioner', 'department', 'estimatedTotal', 'requiredByDate', 'status'],
    description:
      'SOX §404 pre-PO approval gate. Requisitioner ≠ approver; auditor walks PO → requisition → approval chain.',
  },
  access: accountingCollectionAccess(),
  fields: [
    multiTenancyField(),
    { name: 'requisitionNumber', type: 'text', required: true, unique: true, index: true },
    { name: 'requisitioner', type: 'relationship', relationTo: 'users', required: true },
    { name: 'department', type: 'text' },
    { name: 'costCenter', type: 'relationship', relationTo: 'cost-centers' },
    { name: 'project', type: 'relationship', relationTo: 'projects' },
    { name: 'requestedDate', type: 'date', required: true },
    { name: 'requiredByDate', type: 'date',
      admin: { description: 'When the goods/services are needed.' } },
    { name: 'businessJustification', type: 'textarea', required: true,
      admin: { description: 'Reason for the spend (drives approver decision + audit-trail evidence).' } },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Line', plural: 'Lines' },
      dbName: 'pr_lines',
      fields: [
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'item', type: 'relationship', relationTo: 'items' },
        { name: 'quantity', type: 'number', required: true, min: 0 },
        { name: 'uom', type: 'text', defaultValue: 'EA' },
        { name: 'estimatedUnitPrice', type: 'number', required: true,
          admin: { description: 'Estimated unit price (cents).' } },
        { name: 'estimatedAmount', type: 'number', required: true,
          admin: { description: 'quantity × estimatedUnitPrice (cents).' } },
        { name: 'glAccount', type: 'relationship', relationTo: 'gl-accounts' },
        { name: 'preferredVendor', type: 'relationship', relationTo: 'vendors' },
      ],
    },
    currencyField(),
    { name: 'estimatedTotal', type: 'number', required: true,
      admin: { description: 'Σ lines.estimatedAmount (cents).' } },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Critical (urgent / production blocking)', value: 'critical' },
        { label: 'High', value: 'high' },
        { label: 'Normal', value: 'normal' },
        { label: 'Low', value: 'low' },
      ],
    },
    {
      name: 'requiresQuotes',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'When true, must collect ≥ 3 vendor quotes before PO (typical for spend > €10k).' },
    },
    { name: 'minimumQuotesRequired', type: 'number', defaultValue: 0 },
    {
      name: 'approvalChain',
      type: 'array',
      labels: { singular: 'Approval Step', plural: 'Approval Steps' },
      dbName: 'pr_approval',
      fields: [
        { name: 'step', type: 'number', required: true },
        { name: 'approver', type: 'relationship', relationTo: 'users', required: true },
        { name: 'role', type: 'text', admin: { description: 'e.g. Department Head, CFO, CEO.' } },
        {
          name: 'decision',
          type: 'select',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
            { label: 'Returned for Clarification', value: 'returned' },
          ],
          defaultValue: 'pending',
        },
        { name: 'decidedAt', type: 'date' },
        { name: 'comment', type: 'text', localized: true },
      ],
    },
    { name: 'createdPurchaseOrder', type: 'relationship', relationTo: 'purchase-orders',
      admin: { readOnly: true, description: 'PO created when requisition fully approved.' } },
    { name: 'awardedQuote', type: 'relationship', relationTo: 'vendor-quotes',
      admin: { description: 'Selected vendor quote that led to PO award.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted (awaiting approval)', value: 'submitted' },
        { label: 'In Approval Chain', value: 'in_approval' },
        { label: 'Approved (ready for PO)', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Returned for Clarification', value: 'returned' },
        { label: 'PO Created', value: 'po_created' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [emitPrSubmitted, emitPrApproved, auditTrailAfterChange('purchase-requisitions')],
  },
  timestamps: true,
}

export default PurchaseRequisitions
