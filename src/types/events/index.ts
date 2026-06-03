/**
 * Domain Event types — emitted by business operations for GL posting + audit.
 *
 * Every event carries an RFC 9562 UUID `eventId` and ISO 8601 timestamp.
 *
 * @rfc 9562 uuid event-id
 * @standard ISO-8601-1:2019 date-time event-timestamp
 * @audit ISO-19011:2018 audit-trail event-log
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2
 */

/**
 * Base Domain Event
 */
export interface DomainEvent {
  eventId: string;
  eventType: string;
  tenantId: string;
  aggregateId: string;
  aggregateType:
    | 'invoice'
    | 'bill'
    | 'payment'
    | 'inventory_transfer'
    | 'bank_statement'
    | 'subscription'
    | 'order'
    | 'fixed_asset'
    | 'sale'
    | 'receipt'
    | 'gl_posting';
  timestamp: Date;
  userId: string;
  payload: Record<string, unknown>;
}

/**
 * Invoice Events
 */
export interface InvoiceActivatedEvent extends DomainEvent {
  eventType: 'invoice:activated';
  aggregateType: 'invoice';
  payload: {
    invoiceId: string;
    customerId: string;
    amount: number;
    taxAmount: number;
    lineItems: InvoiceLineItem[];
    currencyCode: string;
    invoiceDate: Date;
  };
}

/**
 * Project-internal invoice line shape — a thin projection of the
 * canonical {@link import('@/standards/en-16931').InvoiceLine} (BG-25).
 *
 * Consumers (events, reports, hooks) MUST treat this as a derived view
 * of EN 16931, not a parallel type system. When EN 16931 fields drift,
 * this shape drifts with them.
 *
 * @standard EN-16931:2017 BG-25 invoice-line
 */
export interface InvoiceLineItem {
  /** BT-126 — Invoice line identifier. */
  id: string;
  /** BT-128 — Item id / SKU / GTIN. */
  itemId?: string;
  /** BG-31 BT-153 — Item name / description. */
  description: string;
  /** BT-129 — Invoiced quantity. */
  quantity: number;
  /** BT-146 — Item net price (per unit). */
  unitPrice: number;
  /** BT-131 — Invoice line net amount. */
  amount: number;
  /**
   * Item cost — used by COGS posting. Not part of the EN 16931 wire
   * format; carried alongside for the GL handler.
   */
  costAmount?: number;
  /**
   * Internal item category — distinct from EN 16931 BG-32 item attributes.
   * Used by the GL handler to resolve the revenue / inventory account.
   */
  category: string;
}

export interface InvoiceCompletedEvent extends DomainEvent {
  eventType: 'invoice:completed';
  aggregateType: 'invoice';
  payload: {
    invoiceId: string;
    amountPaid: number;
    paymentDate: Date;
    paymentMethod: string;
    currencyCode: string;
  };
}

export interface InvoiceReversedEvent extends DomainEvent {
  eventType: 'invoice:reversed';
  aggregateType: 'invoice';
  payload: {
    invoiceId: string;
    reversalDate: Date;
    reason: string;
  };
}

/**
 * Bill Events
 */
export interface BillActivatedEvent extends DomainEvent {
  eventType: 'bill:activated';
  aggregateType: 'bill';
  payload: {
    billId: string;
    vendorId: string;
    amount: number;
    taxAmount: number;
    lineItems: BillLineItem[];
    currencyCode: string;
    billDate: Date;
  };
}

/**
 * Project-internal bill line shape — analogue of {@link InvoiceLineItem}
 * for AP. Same EN 16931 BG-25 line model with an `expenseCategory`
 * discriminator for the AP-side GL account resolver.
 *
 * @standard EN-16931:2017 BG-25 invoice-line
 */
export interface BillLineItem {
  /** BT-126 — Invoice line identifier. */
  id: string;
  itemId?: string;
  /** BG-31 BT-153 — Item name / description. */
  description: string;
  /** BT-129 — Invoiced quantity. */
  quantity: number;
  /** BT-146 — Item net price. */
  unitPrice: number;
  /** BT-131 — Invoice line net amount. */
  amount: number;
  /** Internal: AP expense / inventory account discriminator. */
  expenseCategory: string;
}

export interface BillPaidEvent extends DomainEvent {
  eventType: 'bill:paid';
  aggregateType: 'bill';
  payload: {
    billId: string;
    amountPaid: number;
    paymentDate: Date;
    paymentMethod: string;
    currencyCode: string;
  };
}

export interface BillReversedEvent extends DomainEvent {
  eventType: 'bill:reversed';
  aggregateType: 'bill';
  payload: {
    billId: string;
    reversalDate: Date;
    reason: string;
  };
}

/**
 * Payment Events
 */
export interface PaymentReceivedEvent extends DomainEvent {
  eventType: 'payment:received';
  aggregateType: 'payment';
  payload: {
    paymentId: string;
    customerId?: string;
    amount: number;
    paymentMethod: string;
    paymentDate: Date;
    currencyCode: string;
    referenceNumber?: string;
    invoiceId?: string;
  };
}

export interface PaymentSentEvent extends DomainEvent {
  eventType: 'payment:sent';
  aggregateType: 'payment';
  payload: {
    paymentId: string;
    vendorId?: string;
    amount: number;
    paymentMethod: string;
    paymentDate: Date;
    currencyCode: string;
    referenceNumber?: string;
    billId?: string;
  };
}

/**
 * Inventory Events
 */
export interface InventoryTransferredEvent extends DomainEvent {
  eventType: 'inventory:transferred';
  aggregateType: 'inventory_transfer';
  payload: {
    transferId: string;
    itemId: string;
    quantity: number;
    fromLocation: string;
    toLocation: string;
    costPerUnit: number;
    totalCost: number;
    transferDate: Date;
  };
}

export interface InventoryPurchasedEvent extends DomainEvent {
  eventType: 'inventory:purchased';
  aggregateType: 'inventory_transfer';
  payload: {
    billId: string;
    itemId: string;
    quantity: number;
    costPerUnit: number;
    totalCost: number;
    purchaseDate: Date;
  };
}

export interface InventorySoldEvent extends DomainEvent {
  eventType: 'inventory:sold';
  aggregateType: 'inventory_transfer';
  payload: {
    invoiceId: string;
    itemId: string;
    quantity: number;
    costPerUnit: number;
    totalCost: number;
    saleDate: Date;
  };
}

/**
 * Inventory Adjustment Events
 *
 * Emitted by `InventoryMovements.afterChange` on status → 'posted'
 * for movement kinds that DON'T have an upstream source document
 * already posting GL (those go through bill:activated / invoice:activated
 * / order:* event paths instead). Covers:
 *
 *   transfer       — between two warehouse locations (zero net P&L)
 *   adjustment     — cycle-count variance (signed: + count up / − count down)
 *   write_off      — IAS 2 §28 NRV write-down or IAS 36 impairment
 *   consumption    — production / WIP issue (Dr WIP / Cr Inventory)
 *
 * @accounting IFRS IAS-2 §10 §36 inventories cost-formulas
 * @accounting IFRS IAS-2 §28 net-realisable-value
 * @accounting US-GAAP ASC-330 inventory
 * @accounting US-GAAP ASC-330-10-30 inventory-valuation
 * @audit ISO-19011:2018 audit-trail stock-ledger-evidence
 * @compliance SOX §404 internal-controls cycle-count
 */
export interface InventoryAdjustedEvent extends DomainEvent {
  eventType: 'inventory:adjusted'
  aggregateType: 'inventory_transfer'
  payload: {
    movementId: string
    kind: 'transfer' | 'adjustment' | 'write_off' | 'consumption'
    itemId: string
    /** Signed quantity — positive = inbound to toLocation, negative = outbound. */
    quantity: number
    /** Per-unit cost in cents. */
    unitCost: number
    /** Σ |quantity| × unitCost — the absolute notional that hits the JE. */
    extendedCost: number
    fromLocationId?: string
    toLocationId?: string
    movementAt: Date
    currencyCode: string
    /** Optional GL-account overrides resolved on the item / movement. */
    inventoryAccountCode?: string
    /** For consumption — the WIP / COGS account. */
    consumptionAccountCode?: string
    /**
     * Cost-formula election per IAS-2 §25 / ASC 330-10-30.
     * Slice QQQ — drives unitCost selection when the source-doc cost basis
     * differs from the on-hand running average.
     *
     * @accounting IFRS IAS-2 §25 cost-formulas
     * @accounting US-GAAP ASC-330-10-30 inventory-valuation
     */
    valuationMethod?: 'fifo' | 'weighted_average' | 'specific_identification'
  }
}

/**
 * Fixed-Asset Depreciation Events
 *
 * Emitted by `depreciationService` when a period's depreciation expense has
 * been computed and a `depreciation-schedules` row has been created. The
 * GL posting subscriber turns this into:
 *   Dr Depreciation Expense        depreciationAmount
 *     Cr Accumulated Depreciation     depreciationAmount
 *
 * @accounting IFRS IAS-16 §62 depreciation-methods
 * @accounting US-GAAP ASC-360-10-35 depreciation
 * @audit ISO-19011:2018 audit-trail period-expense
 */
export interface DepreciationPostedEvent extends DomainEvent {
  eventType: 'depreciation:posted';
  aggregateType: 'fixed_asset';
  payload: {
    fixedAssetId: string;
    scheduleId: string;
    periodStart: Date;
    periodEnd: Date;
    depreciationAmount: number;
    method:
      | 'straight_line'
      | 'declining_balance'
      | 'double_declining_balance'
      | 'units_of_activity'
      | 'sum_of_years_digits';
    /** GL account overrides resolved on the asset, if any. */
    expenseAccountCode?: string;
    accumulatedAccountCode?: string;
    currencyCode: string;
  };
}

/**
 * Bank Statement Events
 */
export interface BankStatementImportedEvent extends DomainEvent {
  eventType: 'bank:statement:imported';
  aggregateType: 'bank_statement';
  payload: {
    statementId: string;
    accountNumber: string;
    statementDate: Date;
    transactions: BankStatementTransaction[];
    openingBalance: number;
    closingBalance: number;
    currencyCode: string;
  };
}

export interface BankStatementTransaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  balance: number;
  type: 'debit' | 'credit';
  referenceNumber?: string;
}

export interface BankTransactionMatchedEvent extends DomainEvent {
  eventType: 'bank:transaction:matched';
  aggregateType: 'bank_statement';
  payload: {
    bankTransactionId: string;
    journalEntryId: string;
    matchType: 'exact' | 'fuzzy';
    matchDate: Date;
  };
}

export interface BankTransactionUnmatchedEvent extends DomainEvent {
  eventType: 'bank:transaction:unmatched';
  aggregateType: 'bank_statement';
  payload: {
    bankTransactionId: string;
    reason: string;
    flaggedDate: Date;
  };
}

/**
 * Period-End Events
 */
export interface PeriodEndClosingEvent extends DomainEvent {
  eventType: 'period:closing';
  aggregateType: 'invoice';
  payload: {
    periodEndDate: Date;
    adjustmentsNeeded: string[];
  };
}

/**
 * Subscription Lifecycle Events — IFRS 15 / ASC 606 revenue-recognition.
 *
 * Each event carries the contract amount in integer cents (the project's
 * IEEE-754-avoidance policy) plus the period boundary so the GL handler
 * can split deferred-revenue into the correct fiscal periods.
 *
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-340-40 deferred-contract-costs
 * @audit ISO-19011:2018 audit-trail subscription-lifecycle
 * @compliance SOX §404 internal-controls
 */
export interface SubscriptionActivatedEvent extends DomainEvent {
  eventType: 'subscription:activated';
  aggregateType: 'subscription';
  payload: {
    subscriptionId: string;
    customerId: string;
    planId: string;
    /** Recurring contract amount (cents). */
    amount: number;
    currencyCode: string;
    /** Billing cadence — drives recognition cadence. */
    billingCycle: 'monthly' | 'quarterly' | 'annual';
    /** Inclusive period start (ISO-8601). */
    periodStart: Date;
    /** Inclusive period end (ISO-8601). */
    periodEnd: Date;
    /** Stripe subscription ID for cross-system traceability. */
    stripeSubscriptionId?: string;
  };
}

export interface SubscriptionInvoicedEvent extends DomainEvent {
  eventType: 'subscription:invoiced';
  aggregateType: 'subscription';
  payload: {
    subscriptionId: string;
    invoiceId: string;
    /** Amount invoiced this period (cents) — this is the recognised revenue. */
    amount: number;
    currencyCode: string;
    periodStart: Date;
    periodEnd: Date;
  };
}

export interface SubscriptionCancelledEvent extends DomainEvent {
  eventType: 'subscription:cancelled';
  aggregateType: 'subscription';
  payload: {
    subscriptionId: string;
    /** Effective cancellation date — drives proration / refund split. */
    cancelledAt: Date;
    /** Unrecognised deferred revenue at cancellation (cents). */
    unrecognisedAmount: number;
    /** Refund amount issued to customer (cents). 0 = no refund. */
    refundAmount: number;
    currencyCode: string;
    reason?: string;
  };
}

export interface SubscriptionRefundedEvent extends DomainEvent {
  eventType: 'subscription:refunded';
  aggregateType: 'subscription';
  payload: {
    subscriptionId: string;
    /** Amount refunded (cents). */
    amount: number;
    currencyCode: string;
    refundedAt: Date;
    /** Stripe refund ID for cross-system traceability. */
    stripeRefundId?: string;
    reason?: string;
  };
}

/**
 * Order Lifecycle Events — front-of-house quote-to-cash.
 *
 * The accounting back-end has SOX-grade controls (period locks, audit
 * trails, segregation of duties); the business front-end is finally
 * catching up. Each order state change emits a domain event so the
 * canonical `glPostingService` can post:
 *   - `order:activated`  → Dr AR / Cr Revenue + Dr COGS / Cr Inventory
 *   - `order:shipped`    → no GL movement (revenue recognised at activation
 *                          for shipped goods sales; for ship-to-recognise
 *                          policies, swap recognition here)
 *   - `order:completed`  → no GL movement (closes the order audit trail)
 *   - `order:cancelled`  → reverse activation entries
 *   - `order:refunded`   → Dr Revenue / Cr Cash (or Refunds Payable)
 *
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting IFRS IAS-2 inventories cogs-recognition
 * @accounting US-GAAP ASC-330 inventory cogs-recognition
 * @audit ISO-19011:2018 audit-trail order-lifecycle
 * @compliance SOX §404 internal-controls quote-to-cash
 */
export interface OrderActivatedEvent extends DomainEvent {
  eventType: 'order:activated';
  aggregateType: 'order';
  payload: {
    orderId: string;
    customerId: string;
    /** Net of discounts, before tax, in cents. */
    subtotal: number;
    /** Tax amount in cents. */
    taxAmount: number;
    /** Total payable in cents (subtotal + tax + shipping). */
    total: number;
    currencyCode: string;
    activatedAt: Date;
    lineItems: Array<{
      itemId: string;
      sku?: string;
      quantity: number;
      unitPrice: number;
      lineTotal: number;
      costAmount?: number;
      taxAmount?: number;
    }>;
  };
}

export interface OrderShippedEvent extends DomainEvent {
  eventType: 'order:shipped';
  aggregateType: 'order';
  payload: {
    orderId: string;
    shippedAt: Date;
    carrier?: string;
    trackingNumber?: string;
  };
}

export interface OrderCompletedEvent extends DomainEvent {
  eventType: 'order:completed';
  aggregateType: 'order';
  payload: {
    orderId: string;
    completedAt: Date;
  };
}

export interface OrderCancelledEvent extends DomainEvent {
  eventType: 'order:cancelled';
  aggregateType: 'order';
  payload: {
    orderId: string;
    cancelledAt: Date;
    /** Total to reverse from the activation entry, in cents. */
    reversalAmount: number;
    currencyCode: string;
    reason?: string;
  };
}

export interface OrderRefundedEvent extends DomainEvent {
  eventType: 'order:refunded';
  aggregateType: 'order';
  payload: {
    orderId: string;
    refundedAt: Date;
    /** Refund amount in cents (full or partial). */
    amount: number;
    currencyCode: string;
    /** Stripe refund ID for cross-system traceability. */
    stripeRefundId?: string;
    reason?: string;
  };
}

/**
 * Union type of all domain events
 */
export type AllDomainEvents =
  | InvoiceActivatedEvent
  | InvoiceCompletedEvent
  | InvoiceReversedEvent
  | BillActivatedEvent
  | BillPaidEvent
  | BillReversedEvent
  | PaymentReceivedEvent
  | PaymentSentEvent
  | InventoryTransferredEvent
  | InventoryPurchasedEvent
  | InventorySoldEvent
  | InventoryAdjustedEvent
  | DepreciationPostedEvent
  | BankStatementImportedEvent
  | BankTransactionMatchedEvent
  | BankTransactionUnmatchedEvent
  | PeriodEndClosingEvent
  | SubscriptionActivatedEvent
  | SubscriptionInvoicedEvent
  | SubscriptionCancelledEvent
  | SubscriptionRefundedEvent
  | OrderActivatedEvent
  | OrderShippedEvent
  | OrderCompletedEvent
  | OrderCancelledEvent
  | OrderRefundedEvent;

/**
 * Event handler type
 */
export type EventHandler<T extends DomainEvent = DomainEvent> = (
  event: T
) => Promise<void>;

/**
 * Event metadata for auditing and replay
 */
export interface EventMetadata {
  eventId: string;
  eventType: string;
  occurredAt: Date;
  recordedAt: Date;
  tenantId: string;
  userId: string;
  version: number;
  retryCount: number;
}

/* ─── Slice NNNN — chain emits that move money ──────────────────────── */

/**
 * Production receipt — finished good completed at absorbed cost.
 *
 * @standard IAS-2 §10 absorbed-cost
 * @standard ISA-95 §B.5 production-order-completion
 */
export interface ProductionCompletedEvent extends DomainEvent {
  eventType: 'prod:completed';
  aggregateType: 'inventory_transfer';
  payload: {
    workOrderId: string;
    productionReceiptId: string;
    finishedGoodSku: string;
    receivedQuantity: number;
    absorbedUnitCost: number;
    totalAbsorbedCost: number;
    standardTotalCost?: number;
    currencyCode: string;
    finishedGoodsAccountCode?: string;
    wipAccountCode?: string;
  };
}

/**
 * Cost variance computed — IAS-2 §21 standard-vs-actual.
 *
 * @standard IAS-2 §21 cost-formulas-variances
 */
export interface CostVarianceComputedEvent extends DomainEvent {
  eventType: 'variance:computed';
  aggregateType: 'inventory_transfer';
  payload: {
    workOrderId: string;
    varianceCategory:
      | 'material_price' | 'material_quantity'
      | 'labour_rate'    | 'labour_efficiency'
      | 'overhead_spending' | 'overhead_volume';
    standardCost: number;
    actualCost: number;
    /** Positive = unfavourable (DR variance / CR WIP); negative = favourable. */
    varianceAmount: number;
    isFavourable: boolean;
    currencyCode: string;
    varianceAccountCode?: string;
  };
}

/**
 * Lease modification — IFRS-16 §44-46 remeasurement.
 *
 * @standard IFRS-16 §44 §45(c) §46(a) lease-modification
 */
export interface LeaseRemeasuredEvent extends DomainEvent {
  eventType: 'lease:remeasured';
  aggregateType: 'fixed_asset';
  payload: {
    leaseId: string;
    modificationId: string;
    classification: 'separate_lease' | 'not_separate_scope_increase' | 'not_separate_other' | 'termination_full' | 'termination_partial';
    /** Change in lease liability (post − pre). Positive = increase. */
    liabilityRemeasurement: number;
    /** Mirror ROU adjustment per IFRS-16 §39(b). */
    rouAdjustment: number;
    /** Positive = gain (CR P&L); negative = loss. Typically zero except partial / full termination. */
    gainLossOnModification: number;
    currencyCode: string;
    rouAccountCode?: string;
    leaseLiabilityAccountCode?: string;
    pnlGainLossAccountCode?: string;
  };
}

/**
 * Project milestone achieved — IFRS-15 §126 milestone billing.
 *
 * @standard IFRS-15 §126 milestone-billing
 */
export interface MilestoneAchievedEvent extends DomainEvent {
  eventType: 'milestone:achieved';
  aggregateType: 'invoice';
  payload: {
    projectId: string;
    milestoneId: string;
    milestoneType: 'billing' | 'acceptance' | 'payment' | 'internal';
    amount: number;
    currencyCode: string;
    invoiceId?: string;
    contractAssetAccountCode?: string;
    revenueAccountCode?: string;
  };
}

/**
 * WIP snapshot posted — IFRS-15 §B14-B19 cost-to-cost period accrual.
 *
 * @standard IFRS-15 §B14 §B18 cost-to-cost
 * @standard IFRS-15 §107 §108 contract-asset-contract-liability
 */
export interface WipSnapshotPostedEvent extends DomainEvent {
  eventType: 'wip:snapshot:posted';
  aggregateType: 'invoice';
  payload: {
    projectId: string;
    snapshotId: string;
    period: string;
    /** Positive = unbilled WIP (DR contract asset / CR revenue);
        negative = deferred revenue (DR revenue / CR contract liability). */
    unbilledOrDeferred: number;
    recognisedRevenueDelta: number;
    currencyCode: string;
    contractAssetAccountCode?: string;
    contractLiabilityAccountCode?: string;
    revenueAccountCode?: string;
  };
}
