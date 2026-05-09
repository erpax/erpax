/**
 * GL Posting Service — event-driven double-entry posting.
 *
 * Subscribes to domain events (invoice/payment/inventory/bank) and creates
 * balanced GL entries via `journalEntryService`. Decouples business write
 * paths from the ledger's debit/credit semantics.
 *
 * @standard ISO-8601-1:2019 date-time posted-date
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting OECD SAF-T §3 transactions
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2
 */

import { EventEmitterService, eventEmitter } from './event-emitter.service';
import { journalEntryService } from './journal-entry.service';
import {
  InvoiceActivatedEvent,
  InvoiceCompletedEvent,
  InvoiceReversedEvent,
  BillActivatedEvent,
  BillPaidEvent,
  BillReversedEvent,
  PaymentReceivedEvent,
  PaymentSentEvent,
  InventoryPurchasedEvent,
  InventorySoldEvent,
  BankStatementImportedEvent,
  SubscriptionActivatedEvent,
  SubscriptionInvoicedEvent,
  SubscriptionCancelledEvent,
  SubscriptionRefundedEvent,
  OrderActivatedEvent,
  OrderCancelledEvent,
  OrderRefundedEvent,
} from '@/types/events';
import { JournalEntryLine } from './journal-entry.service';

/**
 * GL Account Code Constants
 * These should be retrieved from GL Account Management based on host configuration
 * For now, using standard account codes
 */
const GL_ACCOUNTS = {
  CASH: 'cash',
  ACCOUNTS_RECEIVABLE: 'ar',
  ACCOUNTS_PAYABLE: 'ap',
  INVENTORY: 'inventory',
  REVENUE: 'revenue',
  COGS: 'cogs',
  EXPENSE: 'expense',
  SALES_TAX_PAYABLE: 'sales_tax_payable',
  INPUT_TAX_ASSET: 'input_tax_asset',
  // Subscription / IFRS 15 / ASC 606
  DEFERRED_REVENUE: 'deferred_revenue',
  SUBSCRIPTION_REVENUE: 'subscription_revenue',
  REFUNDS_PAYABLE: 'refunds_payable',
};

class GLPostingService {
  constructor(private eventEmitter: EventEmitterService) {
    this.subscribeToEvents();
  }

  /**
   * Subscribe to all domain events
   */
  private subscribeToEvents(): void {
    // Invoice events
    this.eventEmitter.subscribe('invoice:activated', (event) =>
      this.postInvoiceActivated(event as InvoiceActivatedEvent)
    );
    this.eventEmitter.subscribe('invoice:completed', (event) =>
      this.postInvoiceCompleted(event as InvoiceCompletedEvent)
    );
    this.eventEmitter.subscribe('invoice:reversed', (event) =>
      this.postInvoiceReversed(event as InvoiceReversedEvent)
    );

    // Bill events
    this.eventEmitter.subscribe('bill:activated', (event) =>
      this.postBillActivated(event as BillActivatedEvent)
    );
    this.eventEmitter.subscribe('bill:paid', (event) =>
      this.postBillPaid(event as BillPaidEvent)
    );
    this.eventEmitter.subscribe('bill:reversed', (event) =>
      this.postBillReversed(event as BillReversedEvent)
    );

    // Payment events
    this.eventEmitter.subscribe('payment:received', (event) =>
      this.postPaymentReceived(event as PaymentReceivedEvent)
    );
    this.eventEmitter.subscribe('payment:sent', (event) =>
      this.postPaymentSent(event as PaymentSentEvent)
    );

    // Inventory events
    this.eventEmitter.subscribe('inventory:purchased', (event) =>
      this.postInventoryPurchased(event as InventoryPurchasedEvent)
    );
    this.eventEmitter.subscribe('inventory:sold', (event) =>
      this.postInventorySold(event as InventorySoldEvent)
    );

    // Bank events
    this.eventEmitter.subscribe('bank:statement:imported', (event) =>
      this.postBankStatementImported(event as BankStatementImportedEvent)
    );

    // Subscription lifecycle events — IFRS 15 / ASC 606 revenue recognition.
    this.eventEmitter.subscribe('subscription:activated', (event) =>
      this.postSubscriptionActivated(event as SubscriptionActivatedEvent)
    );
    this.eventEmitter.subscribe('subscription:invoiced', (event) =>
      this.postSubscriptionInvoiced(event as SubscriptionInvoicedEvent)
    );
    this.eventEmitter.subscribe('subscription:cancelled', (event) =>
      this.postSubscriptionCancelled(event as SubscriptionCancelledEvent)
    );
    this.eventEmitter.subscribe('subscription:refunded', (event) =>
      this.postSubscriptionRefunded(event as SubscriptionRefundedEvent)
    );

    // Order lifecycle events — front-of-house quote-to-cash GL posting.
    this.eventEmitter.subscribe('order:activated', (event) =>
      this.postOrderActivated(event as OrderActivatedEvent)
    );
    this.eventEmitter.subscribe('order:cancelled', (event) =>
      this.postOrderCancelled(event as OrderCancelledEvent)
    );
    this.eventEmitter.subscribe('order:refunded', (event) =>
      this.postOrderRefunded(event as OrderRefundedEvent)
    );
  }

  /**
   * Invoice Activated: Create AR + Revenue + COGS entries
   */
  async postInvoiceActivated(event: InvoiceActivatedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { invoiceId, amount: _amount, taxAmount, lineItems } = payload;

    const lines: JournalEntryLine[] = [];

    // Process each line item
    for (const line of lineItems) {
      // Debit AR
      lines.push({
        accountId: GL_ACCOUNTS.ACCOUNTS_RECEIVABLE,
        debit: line.amount,
        description: `Invoice ${invoiceId} - ${line.description}`,
      });

      // Credit Revenue
      lines.push({
        accountId: GL_ACCOUNTS.REVENUE,
        credit: line.amount,
        description: `Invoice ${invoiceId} - ${line.description}`,
      });

      // COGS + Inventory (if item has cost)
      if (line.costAmount && line.costAmount > 0) {
        lines.push({
          accountId: GL_ACCOUNTS.COGS,
          debit: line.costAmount,
          description: `COGS for Invoice ${invoiceId}`,
        });

        lines.push({
          accountId: GL_ACCOUNTS.INVENTORY,
          credit: line.costAmount,
          description: `Inventory reduction for Invoice ${invoiceId}`,
        });
      }
    }

    // Sales Tax
    if (taxAmount && taxAmount > 0) {
      lines.push({
        accountId: GL_ACCOUNTS.ACCOUNTS_RECEIVABLE,
        debit: taxAmount,
        description: `Sales tax on Invoice ${invoiceId}`,
      });

      lines.push({
        accountId: GL_ACCOUNTS.SALES_TAX_PAYABLE,
        credit: taxAmount,
        description: `Sales tax on Invoice ${invoiceId}`,
      });
    }

    // Create and post entry
    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: new Date(),
      description: `Invoice ${invoiceId} Activated`,
      lines,
      sourceType: 'invoice',
      sourceId: invoiceId,
      sourceEvent: 'invoice:activated',
      userId,
    });

    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Invoice Completed: Cash receipt and AR reduction
   */
  async postInvoiceCompleted(event: InvoiceCompletedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { invoiceId, amountPaid } = payload;

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.CASH,
        debit: amountPaid,
        description: `Payment received for Invoice ${invoiceId}`,
      },
      {
        accountId: GL_ACCOUNTS.ACCOUNTS_RECEIVABLE,
        credit: amountPaid,
        description: `Invoice ${invoiceId} paid`,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: new Date(),
      description: `Invoice ${invoiceId} Paid`,
      lines,
      sourceType: 'invoice',
      sourceId: invoiceId,
      sourceEvent: 'invoice:completed',
      userId,
    });

    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Invoice Reversed: Create reversing entry
   */
  async postInvoiceReversed(event: InvoiceReversedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { invoiceId } = payload;

    // Find original invoice entry and reverse it
    const entries = await journalEntryService.listEntries(tenantId, {
      sourceType: 'invoice',
      sourceId: invoiceId,
    });

    for (const entry of entries) {
      if (entry.status === 'posted') {
        await journalEntryService.reverseEntry(tenantId, entry.id, 'Invoice reversed', userId);
      }
    }
  }

  /**
   * Bill Activated: Expense + AP + Input Tax
   */
  async postBillActivated(event: BillActivatedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { billId, amount, taxAmount, lineItems } = payload;

    const lines: JournalEntryLine[] = [];

    // Debit expenses by category
    for (const line of lineItems) {
      lines.push({
        accountId: GL_ACCOUNTS.EXPENSE,
        debit: line.amount,
        description: `Bill ${billId} - ${line.description}`,
      });
    }

    // Credit AP
    lines.push({
      accountId: GL_ACCOUNTS.ACCOUNTS_PAYABLE,
      credit: amount,
      description: `Bill ${billId} total`,
    });

    // Input Tax Asset (if applicable)
    if (taxAmount && taxAmount > 0) {
      lines.push({
        accountId: GL_ACCOUNTS.INPUT_TAX_ASSET,
        debit: taxAmount,
        description: `Input tax on Bill ${billId}`,
      });

      lines.push({
        accountId: GL_ACCOUNTS.ACCOUNTS_PAYABLE,
        credit: taxAmount,
        description: `Input tax on Bill ${billId}`,
      });
    }

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: new Date(),
      description: `Bill ${billId} Activated`,
      lines,
      sourceType: 'bill',
      sourceId: billId,
      sourceEvent: 'bill:activated',
      userId,
    });

    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Bill Paid: AP reduction and cash payment
   */
  async postBillPaid(event: BillPaidEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { billId, amountPaid } = payload;

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.ACCOUNTS_PAYABLE,
        debit: amountPaid,
        description: `Payment for Bill ${billId}`,
      },
      {
        accountId: GL_ACCOUNTS.CASH,
        credit: amountPaid,
        description: `Bill ${billId} paid`,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: new Date(),
      description: `Bill ${billId} Paid`,
      lines,
      sourceType: 'bill',
      sourceId: billId,
      sourceEvent: 'bill:paid',
      userId,
    });

    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Bill Reversed
   */
  async postBillReversed(event: BillReversedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { billId } = payload;

    const entries = await journalEntryService.listEntries(tenantId, {
      sourceType: 'bill',
      sourceId: billId,
    });

    for (const entry of entries) {
      if (entry.status === 'posted') {
        await journalEntryService.reverseEntry(tenantId, entry.id, 'Bill reversed', userId);
      }
    }
  }

  /**
   * Payment Received (not tied to invoice)
   */
  async postPaymentReceived(event: PaymentReceivedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { paymentId, amount } = payload;

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.CASH,
        debit: amount,
        description: `Payment received ${paymentId}`,
      },
      {
        accountId: GL_ACCOUNTS.ACCOUNTS_RECEIVABLE,
        credit: amount,
        description: `Payment received ${paymentId}`,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: new Date(),
      description: `Payment Received ${paymentId}`,
      lines,
      sourceType: 'payment',
      sourceId: paymentId,
      sourceEvent: 'payment:received',
      userId,
    });

    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Payment Sent (not tied to bill)
   */
  async postPaymentSent(event: PaymentSentEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { paymentId, amount } = payload;

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.ACCOUNTS_PAYABLE,
        debit: amount,
        description: `Payment sent ${paymentId}`,
      },
      {
        accountId: GL_ACCOUNTS.CASH,
        credit: amount,
        description: `Payment sent ${paymentId}`,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: new Date(),
      description: `Payment Sent ${paymentId}`,
      lines,
      sourceType: 'payment',
      sourceId: paymentId,
      sourceEvent: 'payment:sent',
      userId,
    });

    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Inventory Purchased (from Bill)
   */
  async postInventoryPurchased(event: InventoryPurchasedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { billId, totalCost } = payload;

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.INVENTORY,
        debit: totalCost,
        description: `Inventory purchase from Bill ${billId}`,
      },
      {
        accountId: GL_ACCOUNTS.ACCOUNTS_PAYABLE,
        credit: totalCost,
        description: `Inventory purchase from Bill ${billId}`,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: new Date(),
      description: `Inventory Purchased from Bill ${billId}`,
      lines,
      sourceType: 'inventory',
      sourceId: billId,
      sourceEvent: 'inventory:purchased',
      userId,
    });

    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Inventory Sold (from Invoice)
   */
  async postInventorySold(event: InventorySoldEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { invoiceId, totalCost } = payload;

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.COGS,
        debit: totalCost,
        description: `COGS from Invoice ${invoiceId}`,
      },
      {
        accountId: GL_ACCOUNTS.INVENTORY,
        credit: totalCost,
        description: `Inventory sold on Invoice ${invoiceId}`,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: new Date(),
      description: `Inventory Sold on Invoice ${invoiceId}`,
      lines,
      sourceType: 'inventory',
      sourceId: invoiceId,
      sourceEvent: 'inventory:sold',
      userId,
    });

    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Bank Statement Imported
   * Create GL entries for bank transactions
   */
  async postBankStatementImported(event: BankStatementImportedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { statementId, transactions } = payload;

    for (const tx of transactions) {
      const lines: JournalEntryLine[] = [];

      if (tx.type === 'debit') {
        lines.push({
          accountId: GL_ACCOUNTS.CASH,
          debit: tx.amount,
          description: `Bank withdrawal: ${tx.description}`,
        });
      } else {
        lines.push({
          accountId: GL_ACCOUNTS.CASH,
          credit: tx.amount,
          description: `Bank deposit: ${tx.description}`,
        });
      }

      // TODO: Match to existing GL entry and reconcile
      // For now, just create the bank transaction entry

      const entry = await journalEntryService.createEntry(tenantId, {
        entryDate: tx.date,
        description: `Bank transaction: ${tx.description}`,
        lines,
        sourceType: 'bank_statement',
        sourceId: statementId,
        sourceEvent: 'bank:statement:imported',
        userId,
      });

      await journalEntryService.postEntry(tenantId, entry.id, userId);
    }
  }

  // ─── Subscription lifecycle handlers — IFRS 15 / ASC 606 ──────────────────

  /**
   * Subscription activated — record the contract liability (deferred revenue).
   *
   * Per IFRS 15 §31 / ASC 606-10-25: cash collected up-front for a
   * performance obligation that has not yet been satisfied is recognised
   * as a contract liability (deferred revenue), then released to revenue
   * over the service period.
   *
   * Debit:  Cash / AR (depending on collection state — here we assume AR
   *         pending the customer's payment of the first invoice)
   * Credit: Deferred Revenue (contract liability)
   */
  async postSubscriptionActivated(event: SubscriptionActivatedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { subscriptionId, amount, periodStart, periodEnd } = payload;
    if (!amount || amount <= 0) return; // free / trial — no GL impact

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.ACCOUNTS_RECEIVABLE,
        debit: amount,
        description: `Subscription activated ${subscriptionId} — period ${periodStart.toISOString()}–${periodEnd.toISOString()}`,
      },
      {
        accountId: GL_ACCOUNTS.DEFERRED_REVENUE,
        credit: amount,
        description: `Deferred subscription revenue ${subscriptionId} (IFRS 15 §31 / ASC 606-10-25)`,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: periodStart,
      description: `Subscription ${subscriptionId} activated`,
      lines,
      sourceType: 'invoice', // subscription bookings flow through the invoice source-type union
      sourceId: subscriptionId,
      sourceEvent: 'subscription:activated',
      userId,
    });
    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Subscription invoiced — recognise revenue for the billed period.
   *
   * Per IFRS 15 §35 / ASC 606-10-25-30: as the entity transfers control of
   * the good or service over time, revenue is recognised. For a periodic
   * subscription, the period invoice marks the end of the deferral.
   *
   * Debit:  Deferred Revenue (contract liability ↓)
   * Credit: Subscription Revenue (income ↑)
   */
  async postSubscriptionInvoiced(event: SubscriptionInvoicedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { subscriptionId, invoiceId, amount, periodStart, periodEnd } = payload;
    if (!amount || amount <= 0) return;

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.DEFERRED_REVENUE,
        debit: amount,
        description: `Recognise revenue for subscription ${subscriptionId} period ${periodStart.toISOString()}–${periodEnd.toISOString()}`,
      },
      {
        accountId: GL_ACCOUNTS.SUBSCRIPTION_REVENUE,
        credit: amount,
        description: `Subscription revenue ${invoiceId} (IFRS 15 §35 / ASC 606-10-25-30)`,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: periodEnd,
      description: `Subscription ${subscriptionId} invoiced`,
      lines,
      sourceType: 'invoice',
      sourceId: invoiceId,
      sourceEvent: 'subscription:invoiced',
      userId,
    });
    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Subscription cancelled — reverse unrecognised deferred revenue and,
   * if a refund was issued, recognise the refund liability.
   *
   * Per IFRS 15 §B47 / ASC 606-10-25-13: customer cancellation extinguishes
   * the unsatisfied performance obligation. If consideration is refundable,
   * the entity recognises a refund liability rather than revenue.
   *
   * For each cents-amount in the payload (`unrecognisedAmount`,
   * `refundAmount`) we post the matching line; if both are zero the
   * cancellation is a no-op for the GL (revenue already recognised in full).
   */
  async postSubscriptionCancelled(event: SubscriptionCancelledEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { subscriptionId, cancelledAt, unrecognisedAmount, refundAmount } = payload;
    if (unrecognisedAmount <= 0 && refundAmount <= 0) return;

    const lines: JournalEntryLine[] = [];
    if (unrecognisedAmount > 0) {
      // Reverse the deferred-revenue contract liability.
      lines.push({
        accountId: GL_ACCOUNTS.DEFERRED_REVENUE,
        debit: unrecognisedAmount,
        description: `Cancel deferred revenue for subscription ${subscriptionId} (IFRS 15 §B47)`,
      });
      lines.push({
        accountId: GL_ACCOUNTS.ACCOUNTS_RECEIVABLE,
        credit: unrecognisedAmount,
        description: `Reduce AR for cancelled subscription ${subscriptionId}`,
      });
    }
    if (refundAmount > 0) {
      // Recognise the refund liability — to be settled by the refund payment hook.
      lines.push({
        accountId: GL_ACCOUNTS.SUBSCRIPTION_REVENUE,
        debit: refundAmount,
        description: `Reverse recognised revenue for refund on subscription ${subscriptionId}`,
      });
      lines.push({
        accountId: GL_ACCOUNTS.REFUNDS_PAYABLE,
        credit: refundAmount,
        description: `Refund liability for cancelled subscription ${subscriptionId} (IFRS 15 §B22)`,
      });
    }
    if (lines.length === 0) return;

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: cancelledAt,
      description: `Subscription ${subscriptionId} cancelled`,
      lines,
      sourceType: 'invoice',
      sourceId: subscriptionId,
      sourceEvent: 'subscription:cancelled',
      userId,
    });
    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Subscription refunded — settle the refund liability against cash.
   *
   * Pairs with `postSubscriptionCancelled` (which booked the
   * `Refunds Payable` liability). When the refund actually leaves the
   * account, this debits the liability away and credits cash.
   *
   * Debit:  Refunds Payable (liability ↓)
   * Credit: Cash (asset ↓)
   */
  async postSubscriptionRefunded(event: SubscriptionRefundedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { subscriptionId, amount, refundedAt } = payload;
    if (!amount || amount <= 0) return;

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.REFUNDS_PAYABLE,
        debit: amount,
        description: `Settle refund liability for subscription ${subscriptionId}`,
      },
      {
        accountId: GL_ACCOUNTS.CASH,
        credit: amount,
        description: `Refund paid to customer for subscription ${subscriptionId}`,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: refundedAt,
      description: `Subscription ${subscriptionId} refunded`,
      lines,
      sourceType: 'payment',
      sourceId: subscriptionId,
      sourceEvent: 'subscription:refunded',
      userId,
    });
    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  // ─── Order lifecycle handlers — IFRS 15 / ASC 606 + IAS 2 / ASC 330 ──────

  /**
   * Order activated — recognise revenue + book COGS at the same moment for
   * shipped-goods sales (point-in-time recognition under IFRS 15 §38b /
   * ASC 606-10-25-30c).
   *
   * Per line item:
   *   Dr Accounts Receivable (subtotal + tax)
   *   Cr Revenue              (subtotal)
   *   Cr Sales Tax Payable    (tax, if > 0)
   *   Dr COGS                 (costAmount, if > 0)
   *   Cr Inventory            (costAmount, if > 0)
   */
  async postOrderActivated(event: OrderActivatedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { orderId, subtotal, taxAmount, total, activatedAt, lineItems } = payload;
    if (!total || total <= 0) return;

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.ACCOUNTS_RECEIVABLE,
        debit: total,
        description: `AR for order ${orderId}`,
      },
      {
        accountId: GL_ACCOUNTS.REVENUE,
        credit: subtotal,
        description: `Revenue for order ${orderId} (IFRS 15 §38b / ASC 606-10-25-30c)`,
      },
    ];
    if (taxAmount && taxAmount > 0) {
      lines.push({
        accountId: GL_ACCOUNTS.SALES_TAX_PAYABLE,
        credit: taxAmount,
        description: `Sales tax on order ${orderId}`,
      });
    }
    // COGS / inventory consumption per line that has cost data
    for (const li of lineItems) {
      if (li.costAmount && li.costAmount > 0) {
        lines.push({
          accountId: GL_ACCOUNTS.COGS,
          debit: li.costAmount,
          description: `COGS for order ${orderId} line ${li.itemId}`,
        });
        lines.push({
          accountId: GL_ACCOUNTS.INVENTORY,
          credit: li.costAmount,
          description: `Inventory reduction for order ${orderId} line ${li.itemId}`,
        });
      }
    }

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: activatedAt,
      description: `Order ${orderId} activated`,
      lines,
      sourceType: 'invoice',
      sourceId: orderId,
      sourceEvent: 'order:activated',
      userId,
    });
    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Order cancelled — reverse the activation entry.
   *
   * Single combined reversal (Dr Revenue + Cr AR) rather than per-line
   * detail because the cancellation event carries only the aggregate
   * `reversalAmount`. For a per-line reversal, fire one
   * `order:refunded` event per line instead.
   */
  async postOrderCancelled(event: OrderCancelledEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { orderId, cancelledAt, reversalAmount } = payload;
    if (!reversalAmount || reversalAmount <= 0) return;

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.REVENUE,
        debit: reversalAmount,
        description: `Reverse recognised revenue for cancelled order ${orderId}`,
      },
      {
        accountId: GL_ACCOUNTS.ACCOUNTS_RECEIVABLE,
        credit: reversalAmount,
        description: `Reduce AR for cancelled order ${orderId}`,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: cancelledAt,
      description: `Order ${orderId} cancelled`,
      lines,
      sourceType: 'invoice',
      sourceId: orderId,
      sourceEvent: 'order:cancelled',
      userId,
    });
    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Order refunded — full or partial customer refund.
   *
   * Books a Refunds Payable liability (settled by the matching
   * `payment:sent` / cash-out event downstream).
   *
   *   Dr Revenue              (amount)
   *   Cr Refunds Payable       (amount)
   */
  async postOrderRefunded(event: OrderRefundedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const { orderId, amount, refundedAt } = payload;
    if (!amount || amount <= 0) return;

    const lines: JournalEntryLine[] = [
      {
        accountId: GL_ACCOUNTS.REVENUE,
        debit: amount,
        description: `Reverse recognised revenue for refunded order ${orderId}`,
      },
      {
        accountId: GL_ACCOUNTS.REFUNDS_PAYABLE,
        credit: amount,
        description: `Refund liability for order ${orderId} (IFRS 15 §B22)`,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: refundedAt,
      description: `Order ${orderId} refunded`,
      lines,
      sourceType: 'invoice',
      sourceId: orderId,
      sourceEvent: 'order:refunded',
      userId,
    });
    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }
}

// Initialize and export — factory for callers that want their own EventEmitter wiring.
export const initializeGLPosting = (emitter: EventEmitterService) => {
  return new GLPostingService(emitter);
};

/**
 * Default singleton bound to the global event emitter. Slice FFF: most
 * callers want this — direct import of `glPostingService` matches the
 * shape of the other singletons in this folder (`journalEntryService`,
 * `glAccountService`, etc.). Hooks that need a private EventEmitter
 * (rare) can still call `initializeGLPosting(myEmitter)`.
 */
export const glPostingService = new GLPostingService(eventEmitter);
