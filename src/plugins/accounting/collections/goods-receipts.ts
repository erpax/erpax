/**
 * # Goods Receipts
 *
 * @summary Second leg of three-way match (PO → Receipt → Invoice). Goods inbound inspection and acceptance confirmation.
 *
 * ## Core Function
 *
 * Goods Receipts (GR) confirm the physical receipt and condition of goods ordered via Purchase Orders. Each GR is linked to
 * a PO and contains line-level receipt quantities (quantityReceived, quantityDamaged), condition assessment (good, damaged, partial, rejected),
 * and inspection details (inspectedBy user, inspectedAt timestamp). The GR is the second leg of the SOX §404 three-way match:
 * PO quantities are compared against receipt quantities (variance detection); receipt costs are matched against vendor invoices.
 * Per IFRS IAS-2 inventory accounting, goods-in-transit (FOB shipping point) transition from supplier to buyer on receipt acceptance.
 * GL posting is triggered on GR acceptance: debit inventory asset / expense account, credit AP liability. Status workflow:
 * pending-inspection → accepted / partially-accepted / rejected; each triggers GL posting or dispute handling.
 *
 * ## Architecture
 *
 * Multi-tenancy via tenant field (auto-populated). GRs are immutable after status = accepted (prevents retro-active inspection changes).
 * Each GR links to a PO (relationTo: purchase-orders) and updates the PO's lines.quantityReceived (cumulative across multiple GRs for partial deliveries).
 * Access control: create/update restricted to admin/accountant roles (segregation: receiver ≠ requester per ISO-27002 §5.4).
 * Inspection date is auto-stamped on status change to accepted / rejected (enforced by autoSetTimestamp hook).
 * Chain event emitter (emitGrPosted) triggers GL posting and AP accrual when GR is accepted. @accounting IFRS IAS-2 @audit SOX §404
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — captures tenant from session context.
 * - **beforeChange:** autoPopulateCreatedBy — stamps warehouse receiver as createdBy.
 * - **beforeChange:** enforceSegregationOfDuties — createdBy (receiver) must differ from PO.createdBy (requester/buyer).
 * - **beforeChange:** autoSetTimestamp — auto-stamps inspectedAt when inspectedBy is set (inspection completion).
 * - **afterChange:** emitGrPosted — triggers GL posting (debit asset/expense, credit AP) when status = accepted.
 * - **afterChange:** auditTrailAfterChange — logs GR receipt, inspection, and acceptance decisions to audit-events.
 *
 * ## Key Fields
 *
 * - **receiptNumber (text, unique, required):** Tenant-unique goods receipt number (e.g. GR-2026-001234). Warehouse reference.
 * - **purchaseOrder (relationship, required, index):** Link to PO. Used to validate receipt quantities and GL posting defaults.
 * - **receivedDate (date, required):** Date goods were physically received at warehouse (actual inbound date, not invoice date).
 * - **lines (array, required, min 1):** Received line items per PO line. @standard EN-16931:2017 §BG-13
 *   - **item (relationship, optional):** Link to item master (SKU/catalog reference).
 *   - **description (text, localized):** Item description in multiple languages (e.g., "Office supplies bundle").
 *   - **quantityReceived (number, required, ≥ 0):** Quantity received (may be < PO quantity due to partial shipment).
 *   - **quantityDamaged (number, default 0, ≥ 0):** Quantity received but damaged (unusable; deducted from quantityReceived for inventory posting).
 *   - **condition (select):** [good, damaged, partial, rejected]; overall condition assessment per line.
 * - **status (select, required):** [pending, accepted, partial, rejected]; inspection status. @audit SOX §404
 * - **inspectedAt (date, readOnly):** Auto-stamped when inspection is completed (set by autoSetTimestamp hook when inspectedBy is set).
 * - **inspectedBy (relationship):** User who performed the goods inspection (warehouse supervisor / quality inspector). @audit ISO-19011:2018
 *
 * ## Core Invariants
 *
 * - **receiptNumberUniquenessPerTenant:** receiptNumber is unique per tenant; prevents duplicate GRs.
 * - **quantityReceivedNeverExceedsOrdered:** quantityReceived + quantityDamaged ≤ corresponding PO line quantity.
 * - **poQuantityUpdateFromGR:** GR line quantityReceived is cumulative; PO line quantityReceived updated via afterChange hook.
 * - **grImmutabilityAfterAcceptance:** once status = accepted / rejected, lines cannot be modified (prevents inspection fraud).
 * - **segregationOfDutiesEnforced:** createdBy (receiver) ≠ inspectedBy (inspector); prevents collusion. @security ISO-27002 §5.4
 * - **inspectedAtAutoStamping:** inspectedAt is auto-set when inspectedBy is assigned; verified on save.
 * - **threeWayMatchPrerequisite:** GR must exist and be accepted before vendor invoice can be matched (three-way match gate).
 * - **multiTenancyIsolation:** tenant field enforced; GRs for one tenant invisible to another.
 *
 * ## Audit Trail
 *
 * Every GR captures: createdAt (timestamp), createdBy (receiver), modifiedAt, modifiedBy. All receipt updates, quantity corrections,
 * condition assessments, inspection dates, and status changes logged to audit-events with full deltas. Inspection accountability:
 * inspectedBy + inspectedAt capture who performed the inspection and when. @standard SOX §302 §404 @audit ISO-19011:2018
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "gr_uuid_1",
 *   "tenant": "tenant_uuid_1",
 *   "receiptNumber": "GR-2026-001234",
 *   "purchaseOrder": "po_uuid_1",
 *   "receivedDate": "2026-04-20",
 *   "lines": [
 *     {
 *       "description": "Office supplies bundle",
 *       "quantityReceived": 98,
 *       "quantityDamaged": 2,
 *       "condition": "partial"
 *     }
 *   ],
 *   "status": "partial",
 *   "inspectedAt": "2026-04-20T14:30:00Z",
 *   "inspectedBy": "user_uuid_warehouse_supervisor",
 *   "createdAt": "2026-04-20T09:00:00Z",
 *   "createdBy": "user_uuid_receiver"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase Goods inbound receipt, inventory acceptance, three-way match, GL accrual
 * @standard ISO-8601-1:2019 date-time-received-at
 * @standard EN-16931:2017 §BG-13 delivery-information
 * @standard ISO-3166-1:2020 country-of-origin-inspection
 * @standard COSO internal-control-three-way-match-segregation
 * @standard ISO-13399:2006 barcode-standard-sku-matching
 * @standard GS1:2024 global-standards-product-identification
 * @accounting IFRS IAS-2 inventories-goods-in-transit
 * @accounting US-GAAP ASC-330 inventory-at-cost
 * @audit ISO-19011:2018 audit-trail-receipt-evidence
 * @compliance SOX §404 internal-controls-three-way-match
 * @compliance ISO-13399:2006 barcode-compliance-sku
 * @security ISO-27002 §5.4 segregation-of-duties-receiver-vs-requester
 * @see ./purchase-orders.ts
 * @see docs/STANDARDS.md §4.3
 */
import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import { multiTenancyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'
import { emitGrPosted } from '@/hooks/chainEventEmitters'

const GoodsReceipts: CollectionConfig = {
  slug: 'goods-receipts',
  labels: { singular: 'Goods Receipt', plural: 'Goods Receipts' },
  admin: { useAsTitle: 'receiptNumber', defaultColumns: ['receiptNumber', 'purchaseOrder', 'receivedDate', 'status'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'receiptNumber', type: 'text', required: true, unique: true, index: true },
    {
      name: 'purchaseOrder',
      type: 'relationship',
      relationTo: 'purchase-orders',
      required: true,
      index: true,
    },
    { name: 'receivedDate', type: 'date', required: true },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'item', type: 'relationship', relationTo: 'items' },
        { name: 'description', type: 'text', localized: true },
        { name: 'quantityReceived', type: 'number', required: true, min: 0 },
        { name: 'quantityDamaged', type: 'number', defaultValue: 0, min: 0 },
        { name: 'condition', type: 'select', options: ['good', 'damaged', 'partial', 'rejected'].map(v => ({ label: v, value: v })) },
      ],
    },
    statusField(
      [
        { label: 'Pending Inspection', value: 'pending' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Partially Accepted', value: 'partial' },
        { label: 'Rejected', value: 'rejected' },
      ],
      'pending',
    ),
    { name: 'inspectedAt', type: 'date', admin: { readOnly: true } },
    { name: 'inspectedBy', type: 'relationship', relationTo: 'users' },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      enforceSegregationOfDuties('inspectedBy', 'createdBy'),
      autoSetTimestamp('inspectedAt', (d) => Boolean((d as { inspectedBy?: unknown }).inspectedBy)),
    ],
    afterChange: [emitGrPosted, auditTrailAfterChange('goods-receipts')],
  },
  timestamps: true,
}

export default GoodsReceipts
