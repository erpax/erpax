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
  aggregateType: 'invoice' | 'bill' | 'payment' | 'inventory_transfer' | 'bank_statement';
  timestamp: Date;
  userId: string;
  payload: any;
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
  | PeriodEndClosingEvent;

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
