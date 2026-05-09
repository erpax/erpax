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
    | 'order';
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

export interface InvoiceLineItem {
  id: string;
  itemId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  costAmount?: number;
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

export interface BillLineItem {
  id: string;
  itemId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
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
