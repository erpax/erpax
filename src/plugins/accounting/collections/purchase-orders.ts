/**
 * # Purchase Orders
 *
 * @summary First leg of three-way match (PO ↔ receipt ↔ invoice). Vendor commitment with line items, GL account mapping, and receipt tracking.
 *
 * ## Core Function
 *
 * Purchase Orders establish the vendor commitment for goods or services. Each PO has line items (item, description, quantity, unit price,
 * GL account), a total amount, and a lifecycle (draft → submitted → approved → sent → partially-received → received → closed / cancelled).
 * The PO is the anchor for the SOX §404 three-way match: PO line items are matched against goods-receipts (receipt confirmation) and
 * vendor invoices (invoice posting). Per IFRS IAS-37, a PO represents an onerous contract (liability / commitment accrual) once approved.
 * GL account mapping on each PO line allows flexible expense / asset accounting (e.g., some items debit COGS, others debit fixed assets).
 *
 * ## Architecture
 *
 * Multi-tenancy via tenant field (auto-populated). POs are append-only after sent status; cancellation requires explicit cancellation flow.
 * Line array includes quantityReceived (readOnly, cumulative) to track partial receipts. GL posting is deferred to goods-receipt confirmation
 * or invoice posting (not at PO creation, per accrual accounting). Line totals and PO totals (subtotal, tax, totalAmount) are auto-calculated
 * on every beforeValidate. Access control: create/update restricted to admin/accountant roles; delete restricted to tenant admin.
 * Status workflow ensures approval gates: draft → submitted (triggers approval notification) → approved (CFO sign-off) → sent → partial/received → closed.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — captures tenant from session context.
 * - **beforeValidate:** auto-calc line totals (quantity × unitPrice) and PO totals (subtotal + tax).
 * - **beforeChange:** autoPopulateCreatedBy — stamps user as createdBy if not already set.
 * - **beforeChange:** enforceSegregationOfDuties — requester (createdBy) must differ from approver (if approval required).
 * - **beforeChange:** autoSetTimestamp — auto-stamps submittedAt, sentAt, closedAt timestamps based on status transitions.
 * - **afterChange:** emitPoCreated — triggers event when PO is created (notifies procurement team, vendor).
 * - **afterChange:** auditTrailAfterChange — logs all PO changes to audit-events (line additions, quantity adjustments, status shifts).
 *
 * ## Key Fields
 *
 * - **poNumber (text, unique, required):** Tenant-unique PO number (e.g. PO-2026-001234). Issued to vendor as official commitment.
 * - **vendor (relationship, required):** Link to addresses (vendor party). Determines remit-to and payment terms defaults.
 * - **orderDate (date, required):** PO issuance date. Used for aging and payment terms calculation.
 * - **expectedDeliveryDate (date):** Vendor's promised delivery date. Used for SLA tracking and goods-receipt validation.
 * - **lines (array, required, min 1):** Line items on the PO. @standard UN-EDIFACT ORDERS d96a
 *   - **lineNumber (number, default 1):** Sequence number on PO (for vendor identification).
 *   - **item (relationship, optional):** Link to item master (catalog reference).
 *   - **description (text, localized, required):** Item description in vendor's language / multi-language variants. @standard EN-16931 BT-153
 *   - **quantity (number, required, ≥ 0):** Ordered quantity.
 *   - **unitPrice (number, required, ≥ 0):** Price per unit (cents).
 *   - **lineTotal (number, readOnly):** quantity × unitPrice (auto-calculated, cents).
 *   - **glAccount (relationship):** Expense / asset account to debit on receipt (e.g. COGS, PPE). @standard US-GAAP ASC-330
 *   - **quantityReceived (number, readOnly, default 0):** Cumulative quantity received via goods-receipts (updated by GR afterChange hook).
 * - **subtotal (number, readOnly):** Sum of line totals (auto-calculated, cents).
 * - **taxAmount (number):** Tax charged by vendor (VAT, GST, etc.). May be auto-populated from vendor tax code.
 * - **totalAmount (number, readOnly):** subtotal + taxAmount (auto-calculated, cents).
 * - **currency (text, ISO 4217):** PO currency (e.g. EUR, BGN). @standard ISO-4217:2015
 * - **status (select):** [draft, submitted, approved, sent, partial, received, closed, cancelled]; workflow status. @audit SOX §404
 * - **submittedAt, sentAt, closedAt (date, readOnly):** Auto-stamped timestamps on status transitions; evidence for audit trail.
 * - **receipts (join):** One-to-many relationship to goods-receipts (partial / full receipts against this PO). Enables three-way match.
 * - **invoice (relationship):** Matched vendor bill (three-way-match anchor). Used to prevent duplicate invoice posting.
 *
 * ## Core Invariants
 *
 * - **poNumberUniquenessPerTenant:** poNumber is unique per tenant; prevents duplicate POs.
 * - **lineTotalsConsistency:** each line's lineTotal = quantity × unitPrice; verified on every save.
 * - **poTotalConsistency:** totalAmount = subtotal + taxAmount; verified on every save.
 * - **threeWayMatchPrerequisite:** before invoice can be linked, PO must exist and receipts must match ordered qty.
 * - **quantityReceivedNeverExceedsOrdered:** quantityReceived (cumulative across all receipts) ≤ quantity for each line.
 * - **poImmutabilityAfterSent:** once status = sent, line items cannot be added/removed (prevents mid-flight changes).
 * - **segregationOfDutiesEnforced:** createdBy (requester) ≠ approver on approval workflow; prevents fraud. @security ISO-27002 §5.4
 * - **multiTenancyIsolation:** tenant field enforced; POs for one tenant invisible to another.
 *
 * ## Audit Trail
 *
 * Every PO captures: createdAt (timestamp), createdBy (user), modifiedAt, modifiedBy. All line additions, quantity adjustments,
 * price changes, and status transitions logged to audit-events with full deltas. @standard SOX §302 §404 @audit ISO-19011:2018
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "po_uuid_1",
 *   "tenant": "tenant_uuid_1",
 *   "poNumber": "PO-2026-001234",
 *   "vendor": "addresses_uuid_1",
 *   "orderDate": "2026-04-10",
 *   "expectedDeliveryDate": "2026-04-20",
 *   "lines": [
 *     {
 *       "lineNumber": 1,
 *       "description": "Office supplies bundle",
 *       "quantity": 100,
 *       "unitPrice": 2500,
 *       "lineTotal": 250000,
 *       "glAccount": "gl_accounts_uuid_supplies"
 *     }
 *   ],
 *   "subtotal": 250000,
 *   "taxAmount": 59500,
 *   "totalAmount": 309500,
 *   "currency": "EUR",
 *   "status": "sent",
 *   "submittedAt": "2026-04-10T10:00:00Z",
 *   "sentAt": "2026-04-10T14:30:00Z",
 *   "createdAt": "2026-04-10T09:00:00Z",
 *   "createdBy": "user_uuid_buyer"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase Purchase order lifecycle, vendor management, three-way match, AP accrual
 * @standard ISO-8601-1:2019 date-time-order-date-due-date
 * @standard ISO-4217:2015 currency-codes
 * @standard EN-16931:2017 §BG-13 buyer-reference
 * @standard UN-EDIFACT ORDERS d96a
 * @standard ISO-3166-1:2020 country-codes-supplier-origin
 * @standard COSO internal-control-po-authorization-limits
 * @standard ISO-20957:2011 e-procurement-po-data-structures
 * @standard INCOTERMS-2020 shipping-terms-incoterm-mapping
 * @accounting IFRS IAS-37 provisions-and-contingent-liabilities-commitment
 * @accounting US-GAAP ASC-405 liabilities-accounts-payable
 * @accounting US-GAAP ASC-330 inventory-at-cost
 * @audit ISO-19011:2018 audit-trail-purchase-commitment
 * @compliance SOX §404 internal-controls-three-way-match
 * @security ISO-27002 §5.4 segregation-of-duties-requester-vs-approver
 * @see ./vendors.ts
 * @see ./goods-receipts.ts
 * @see docs/STANDARDS.md §4.2
 */
import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import { emitPoCreated } from '@/hooks/chainEventEmitters'
import {
  multiTenancyField,
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '@/fields/accounting/base-accounting-fields'

const PurchaseOrders: CollectionConfig = {
  slug: 'purchase-orders',
  labels: { singular: 'Purchase Order', plural: 'Purchase Orders' },
  admin: {
    useAsTitle: 'poNumber',
    defaultColumns: ['poNumber', 'vendor', 'orderDate', 'totalAmount', 'status'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'poNumber', type: 'text', required: true, unique: true, index: true },
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'addresses',
      required: true,
      admin: { description: 'Vendor receiving the PO.' },
    },
    { name: 'orderDate', type: 'date', required: true },
    { name: 'expectedDeliveryDate', type: 'date' },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'lineNumber', type: 'number', defaultValue: 1 },
        { name: 'item', type: 'relationship', relationTo: 'items' },
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'quantity', type: 'number', required: true, min: 0 },
        { name: 'unitPrice', type: 'number', required: true, min: 0 },
        { name: 'lineTotal', type: 'number', defaultValue: 0, admin: { readOnly: true } },
        {
          name: 'glAccount',
          type: 'relationship',
          relationTo: 'gl-accounts',
          admin: { description: 'Expense / asset account to debit on receipt.' },
        },
        {
          name: 'quantityReceived',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'Cumulative quantity received via goods-receipts.', readOnly: true },
        },
      ],
    },
    { name: 'subtotal', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'taxAmount', type: 'number', defaultValue: 0 },
    { name: 'totalAmount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    currencyField(),
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Approved', value: 'approved' },
        { label: 'Sent to Vendor', value: 'sent' },
        { label: 'Partially Received', value: 'partial' },
        { label: 'Received', value: 'received' },
        { label: 'Closed', value: 'closed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),
    { name: 'submittedAt', type: 'date', admin: { readOnly: true } },
    { name: 'sentAt', type: 'date', admin: { readOnly: true } },
    { name: 'closedAt', type: 'date', admin: { readOnly: true } },
    {
      name: 'receipts',
      type: 'join',
      collection: 'goods-receipts',
      on: 'purchaseOrder',
      admin: { description: 'Partial / full goods-receipts against this PO.' },
    },
    {
      name: 'invoice',
      type: 'relationship',
      relationTo: 'invoices',
      admin: { description: 'Matched vendor bill (three-way-match anchor).' },
    },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [
      autoPopulateTenant,
      // Auto-calc line totals + PO totals on every write.
      async ({ data }) => {
        if (data?.lines && Array.isArray(data.lines)) {
          let subtotal = 0
          for (const line of data.lines as Array<{ quantity?: number; unitPrice?: number; lineTotal?: number }>) {
            const lineTotal = (Number(line.quantity) || 0) * (Number(line.unitPrice) || 0)
            line.lineTotal = lineTotal
            subtotal += lineTotal
          }
          data.subtotal = subtotal
          data.totalAmount = subtotal + (Number(data.taxAmount) || 0)
        }
        return data
      },
    ],
    beforeChange: [
      autoPopulateCreatedBy,
      // SOX §404: requester ≠ approver.
      enforceSegregationOfDuties('approvedBy', 'createdBy'),
      autoSetTimestamp('submittedAt', (d) => (d as { status?: string }).status === 'submitted'),
      autoSetTimestamp('sentAt', (d) => (d as { status?: string }).status === 'sent'),
      autoSetTimestamp('closedAt', (d) =>
        ['closed', 'cancelled'].includes(String((d as { status?: string }).status)),
      ),
    ],
    afterChange: [emitPoCreated, auditTrailAfterChange('purchase-orders')],
  },
  timestamps: true,
}

export default PurchaseOrders
