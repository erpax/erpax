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

import { EventEmitterService, eventEmitter } from '../event-emitter.service';
import { journalEntryService } from '../journal-entry.service';
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
  BankTransactionMatchedEvent,
  SubscriptionActivatedEvent,
  SubscriptionInvoicedEvent,
  SubscriptionCancelledEvent,
  SubscriptionRefundedEvent,
  OrderActivatedEvent,
  OrderCancelledEvent,
  OrderRefundedEvent,
  DepreciationPostedEvent,
  InventoryAdjustedEvent,
  ProductionCompletedEvent,
  CostVarianceComputedEvent,
  LeaseRemeasuredEvent,
  MilestoneAchievedEvent,
  WipSnapshotPostedEvent,
} from '@/types/events';
import { JournalEntryLine } from '../journal-entry.service';

/**
 * GL Account Code Constants
 * These should be retrieved from GL Account Management based on tenant configuration
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
  // Fixed assets / IAS 16 / ASC 360
  DEPRECIATION_EXPENSE: 'depreciation_expense',
  ACCUMULATED_DEPRECIATION: 'accumulated_depreciation',
  // Inventory variance / write-off / WIP — IAS 2 / ASC 330
  INVENTORY_VARIANCE_EXPENSE: 'inventory_variance_expense',
  INVENTORY_VARIANCE_INCOME: 'inventory_variance_income',
  INVENTORY_WRITEDOWN: 'inventory_writedown_expense',
  WIP: 'work_in_progress',
  // Slice NNNN — chain emits
  FINISHED_GOODS:           'finished_goods',
  ROU_ASSET:                'rou_asset',
  LEASE_LIABILITY:          'lease_liability',
  LEASE_GAIN_LOSS:          'lease_modification_pnl',
  CONTRACT_ASSET:           'contract_asset',
  CONTRACT_LIABILITY:       'contract_liability',
  PROJECT_REVENUE:          'project_revenue',
};

// Exported so consumers (hooks/tests) get a tight type — calling a phantom
// method like `glPostingService.postInvoice(...)` now fails at compile time
// instead of silently throwing TypeError at runtime (the bug Slice FFF
// rewrites of invoice/bill/payment/item hooks introduced).
export class GLPostingService {
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

    // Fixed-asset depreciation — IAS 16 / ASC 360.
    this.eventEmitter.subscribe('depreciation:posted', (event) =>
      this.postDepreciation(event as DepreciationPostedEvent)
    );

    // Inventory adjustments (transfer / adjustment / write_off / consumption)
    // — IAS 2 / ASC 330. Receipts + sales already covered by inventory:purchased
    // / inventory:sold from bill:activated / invoice:activated.
    this.eventEmitter.subscribe('inventory:adjusted', (event) =>
      this.postInventoryAdjusted(event as InventoryAdjustedEvent)
    );

    // Bank events
    this.eventEmitter.subscribe('bank:statement:imported', (event) =>
      this.postBankStatementImported(event as BankStatementImportedEvent)
    );

    // Slice SSS: bank:transaction:matched — finalises the reconciliation
    // by linking the matched JE to the bank transaction. The accounting
    // reality is that the source-side JE was already booked at the
    // upstream event time (invoice:completed / bill:paid / payment:*);
    // this handler doesn't book a new JE, it stamps the link so the
    // SOX §404 reconciliation control has audit-row evidence.
    this.eventEmitter.subscribe('bank:transaction:matched', (event) =>
      this.postBankTransactionMatched(event as BankTransactionMatchedEvent)
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

    // ─── Slice NNNN — chain emits that move money ─────────────────
    // prod:completed       — IAS-2 §10 absorbed-cost FG receipt
    // variance:computed    — IAS-2 §21 standard-vs-actual variance
    // lease:remeasured     — IFRS-16 §44-46 ROU + Liability remeasurement
    // milestone:achieved   — IFRS-15 §126 milestone billing
    // wip:snapshot:posted  — IFRS-15 §B14-B19 cost-to-cost period accrual
    this.eventEmitter.subscribe('prod:completed', (event) =>
      this.postProductionCompleted(event as ProductionCompletedEvent)
    );
    this.eventEmitter.subscribe('variance:computed', (event) =>
      this.postCostVarianceComputed(event as CostVarianceComputedEvent)
    );
    this.eventEmitter.subscribe('lease:remeasured', (event) =>
      this.postLeaseRemeasured(event as LeaseRemeasuredEvent)
    );
    this.eventEmitter.subscribe('milestone:achieved', (event) =>
      this.postMilestoneAchieved(event as MilestoneAchievedEvent)
    );
    this.eventEmitter.subscribe('wip:snapshot:posted', (event) =>
      this.postWipSnapshotPosted(event as WipSnapshotPostedEvent)
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
   * Fixed-Asset Depreciation Posted — period-end PP&E expense recognition.
   *
   * Dr Depreciation Expense        depreciationAmount
   *   Cr Accumulated Depreciation     depreciationAmount
   *
   * Per-asset GL account overrides on the FixedAssets row take precedence
   * over the chart-of-accounts defaults — this matches the asset-level
   * `expenseAccount` / `accumulatedDepreciationAccount` fields seeded on
   * the collection.
   *
   * @accounting IFRS IAS-16 §62 depreciation-methods
   * @accounting US-GAAP ASC-360-10-35 depreciation
   * @audit ISO-19011:2018 audit-trail period-expense
   */
  async postDepreciation(event: DepreciationPostedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const {
      fixedAssetId,
      scheduleId,
      depreciationAmount,
      method,
      expenseAccountCode,
      accumulatedAccountCode,
    } = payload;

    if (depreciationAmount <= 0) return;

    const expenseAccount = expenseAccountCode ?? GL_ACCOUNTS.DEPRECIATION_EXPENSE;
    const accumulatedAccount =
      accumulatedAccountCode ?? GL_ACCOUNTS.ACCUMULATED_DEPRECIATION;

    const description = `Depreciation (${method}) for asset ${fixedAssetId} schedule ${scheduleId}`;

    const lines: JournalEntryLine[] = [
      {
        accountId: expenseAccount,
        debit: depreciationAmount,
        description,
      },
      {
        accountId: accumulatedAccount,
        credit: depreciationAmount,
        description,
      },
    ];

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: new Date(),
      description,
      lines,
      sourceType: 'fixed_asset',
      sourceId: fixedAssetId,
      sourceEvent: 'depreciation:posted',
      userId,
    });

    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Inventory Adjusted — books the canonical IAS 2 / ASC 330 entry per
   * movement kind:
   *
   *   transfer       Dr Inventory (toLocation)        absExtended
   *                    Cr Inventory (fromLocation)        absExtended
   *                  (both legs hit the same INVENTORY account today —
   *                   per-location split is a future slice)
   *
   *   adjustment(+)  Dr Inventory                     absExtended
   *                    Cr Inventory Variance Income      absExtended
   *
   *   adjustment(−)  Dr Inventory Variance Expense    absExtended
   *                    Cr Inventory                       absExtended
   *
   *   write_off      Dr Inventory Writedown Expense   absExtended
   *                    Cr Inventory                       absExtended
   *
   *   consumption    Dr WIP (or callerOverride)       absExtended
   *                    Cr Inventory                       absExtended
   *
   * @accounting IFRS IAS-2 §10 §28 §36 inventories
   * @accounting US-GAAP ASC-330-10-30 inventory-valuation
   * @audit ISO-19011:2018 audit-trail stock-ledger
   */
  async postInventoryAdjusted(event: InventoryAdjustedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const {
      movementId,
      kind,
      quantity,
      extendedCost,
      inventoryAccountCode,
      consumptionAccountCode,
    } = payload;

    if (extendedCost <= 0) return;

    const inventoryAccount = inventoryAccountCode ?? GL_ACCOUNTS.INVENTORY;

    const description = `Inventory ${kind} — movement ${movementId}`;

    let lines: JournalEntryLine[] = [];
    switch (kind) {
      case 'transfer':
        lines = [
          { accountId: inventoryAccount, debit: extendedCost, description },
          { accountId: inventoryAccount, credit: extendedCost, description },
        ];
        break;
      case 'adjustment':
        if (quantity >= 0) {
          // Count up — found more than expected.
          lines = [
            { accountId: inventoryAccount, debit: extendedCost, description },
            {
              accountId: GL_ACCOUNTS.INVENTORY_VARIANCE_INCOME,
              credit: extendedCost,
              description,
            },
          ];
        } else {
          // Count down — shrinkage.
          lines = [
            {
              accountId: GL_ACCOUNTS.INVENTORY_VARIANCE_EXPENSE,
              debit: extendedCost,
              description,
            },
            { accountId: inventoryAccount, credit: extendedCost, description },
          ];
        }
        break;
      case 'write_off':
        lines = [
          {
            accountId: GL_ACCOUNTS.INVENTORY_WRITEDOWN,
            debit: extendedCost,
            description,
          },
          { accountId: inventoryAccount, credit: extendedCost, description },
        ];
        break;
      case 'consumption':
        lines = [
          {
            accountId: consumptionAccountCode ?? GL_ACCOUNTS.WIP,
            debit: extendedCost,
            description,
          },
          { accountId: inventoryAccount, credit: extendedCost, description },
        ];
        break;
    }

    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: new Date(),
      description,
      lines,
      sourceType: 'inventory_movement',
      sourceId: movementId,
      sourceEvent: 'inventory:adjusted',
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

  /**
   * Bank Transaction Matched (Slice SSS) — finalises a reconciliation
   * by stamping the link between a bank-side transaction row and its
   * matched journal entry. The accounting-side JE was already booked at
   * the upstream event time (`invoice:completed` / `bill:paid` /
   * `payment:received` / `payment:sent`); this handler just records
   * the match for the SOX §404 reconciliation control evidence trail.
   *
   * Why no new JE: per IAS-7 §6 the cash JE happens once at the source
   * event. Posting a SECOND JE here would double-count cash. The
   * reconciliation status moves from `unreconciled` → `matched_exact` /
   * `matched_fuzzy` on the BankStatement row (handled by the
   * `bank-reconciliation.service.ts` matcher); this handler logs the
   * audit trail.
   *
   * @standard ISO 20022 camt.053 reconciliation
   * @accounting IFRS IAS-7 §6 statement-of-cash-flows reconciliation
   * @audit ISO-19011:2018 audit-trail reconciliation-evidence
   * @compliance SOX §404 internal-controls bank-reconciliation
   */
  async postBankTransactionMatched(event: BankTransactionMatchedEvent): Promise<void> {
    const { payload } = event;
    const { bankTransactionId, journalEntryId, matchType } = payload;
    // No new JE — the upstream cash JE already exists. We log the
    // match-stamp event for the audit trail; downstream consumers
    // (audit-events collection, SOX reconciliation report) read this.
    // If the matcher detects a discrepancy worth booking
    // (rounding / FX / fee variance), it should fire a separate
    // `period:adjustments:posted` event instead.
    console.info(
      `[gl-posting] bank:transaction:matched recorded — bankTx=${bankTransactionId} → JE=${journalEntryId} (${matchType})`,
    );
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

  // ─── Slice NNNN — chain-emit handlers ────────────────────────────────

  /**
   * Production receipt — IAS-2 §10 absorbed-cost FG transfer from WIP.
   * Books `Dr Finished Goods / Cr Work-in-Progress` at the absorbed
   * unit cost. The standard-vs-actual variance fires separately as a
   * `variance:computed` event (booked by `postCostVarianceComputed`).
   */
  async postProductionCompleted(event: ProductionCompletedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    if (payload.totalAbsorbedCost <= 0) return;
    const fg  = payload.finishedGoodsAccountCode ?? GL_ACCOUNTS.FINISHED_GOODS;
    const wip = payload.wipAccountCode ?? GL_ACCOUNTS.WIP;
    const desc = `FG receipt — WO ${payload.workOrderId}`;
    const lines: JournalEntryLine[] = [
      { accountId: fg,  debit:  payload.totalAbsorbedCost, description: desc },
      { accountId: wip, credit: payload.totalAbsorbedCost, description: desc },
    ];
    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: event.timestamp,
      description: desc,
      lines,
      sourceType: 'inventory_transfer',
      sourceId: payload.productionReceiptId,
      sourceEvent: 'prod:completed',
      userId,
    });
    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Cost variance — IAS-2 §21 standard-vs-actual.
   * Unfavourable: Dr Variance / Cr WIP (excess actual cost expensed).
   * Favourable:   Dr WIP / Cr Variance (capitalisable savings).
   */
  async postCostVarianceComputed(event: CostVarianceComputedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const amount = Math.abs(payload.varianceAmount);
    if (amount === 0) return;
    const wip = GL_ACCOUNTS.WIP;
    const variance = payload.varianceAccountCode
      ?? (payload.isFavourable ? GL_ACCOUNTS.INVENTORY_VARIANCE_INCOME : GL_ACCOUNTS.INVENTORY_VARIANCE_EXPENSE);
    const desc = `${payload.varianceCategory} variance — WO ${payload.workOrderId}`;
    const lines: JournalEntryLine[] = payload.isFavourable
      ? [ { accountId: wip,      debit:  amount, description: desc },
          { accountId: variance, credit: amount, description: desc } ]
      : [ { accountId: variance, debit:  amount, description: desc },
          { accountId: wip,      credit: amount, description: desc } ];
    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: event.timestamp,
      description: desc,
      lines,
      sourceType: 'inventory_transfer',
      sourceId: payload.workOrderId,
      sourceEvent: 'variance:computed',
      userId,
    });
    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Lease modification — IFRS-16 §44-46.
   * Liability remeasurement + mirror ROU adjust + (only on termination)
   * P&L gain/loss plug per §46(a).
   */
  async postLeaseRemeasured(event: LeaseRemeasuredEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    const liab = payload.leaseLiabilityAccountCode ?? GL_ACCOUNTS.LEASE_LIABILITY;
    const rou  = payload.rouAccountCode            ?? GL_ACCOUNTS.ROU_ASSET;
    const pnl  = payload.pnlGainLossAccountCode    ?? GL_ACCOUNTS.LEASE_GAIN_LOSS;
    const desc = `Lease remeasurement — ${payload.classification} (mod ${payload.modificationId})`;
    const lines: JournalEntryLine[] = [];
    if (payload.liabilityRemeasurement > 0) {
      lines.push({ accountId: liab, credit: payload.liabilityRemeasurement, description: desc });
    } else if (payload.liabilityRemeasurement < 0) {
      lines.push({ accountId: liab, debit: -payload.liabilityRemeasurement, description: desc });
    }
    if (payload.rouAdjustment > 0) {
      lines.push({ accountId: rou, debit: payload.rouAdjustment, description: desc });
    } else if (payload.rouAdjustment < 0) {
      lines.push({ accountId: rou, credit: -payload.rouAdjustment, description: desc });
    }
    if (payload.gainLossOnModification > 0) {
      lines.push({ accountId: pnl, credit: payload.gainLossOnModification, description: desc });
    } else if (payload.gainLossOnModification < 0) {
      lines.push({ accountId: pnl, debit: -payload.gainLossOnModification, description: desc });
    }
    if (lines.length === 0) return;
    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: event.timestamp,
      description: desc,
      lines,
      sourceType: 'fixed_asset',
      sourceId: payload.modificationId,
      sourceEvent: 'lease:remeasured',
      userId,
    });
    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * Project milestone — IFRS-15 §126 milestone billing.
   * Books `Dr Contract Asset / Cr Project Revenue` at milestone amount.
   * Caller's invoice handler upgrades contract asset to AR when raised.
   */
  async postMilestoneAchieved(event: MilestoneAchievedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    if (payload.amount <= 0 || payload.milestoneType === 'internal') return;
    const asset = payload.contractAssetAccountCode ?? GL_ACCOUNTS.CONTRACT_ASSET;
    const rev   = payload.revenueAccountCode       ?? GL_ACCOUNTS.PROJECT_REVENUE;
    const desc  = `Milestone ${payload.milestoneType} — project ${payload.projectId}`;
    const lines: JournalEntryLine[] = [
      { accountId: asset, debit:  payload.amount, description: desc },
      { accountId: rev,   credit: payload.amount, description: desc },
    ];
    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: event.timestamp,
      description: desc,
      lines,
      sourceType: 'invoice',
      sourceId: payload.milestoneId,
      sourceEvent: 'milestone:achieved',
      userId,
    });
    await journalEntryService.postEntry(tenantId, entry.id, userId);
  }

  /**
   * WIP snapshot — IFRS-15 §B14-B19 cost-to-cost period accrual.
   * Recognises revenue delta vs prior period; reclassifies between
   * contract asset (positive unbilled) and contract liability (negative).
   */
  async postWipSnapshotPosted(event: WipSnapshotPostedEvent): Promise<void> {
    const { tenantId, userId, payload } = event;
    if (payload.recognisedRevenueDelta === 0 && payload.unbilledOrDeferred === 0) return;
    const asset = payload.contractAssetAccountCode      ?? GL_ACCOUNTS.CONTRACT_ASSET;
    const liab  = payload.contractLiabilityAccountCode  ?? GL_ACCOUNTS.CONTRACT_LIABILITY;
    const rev   = payload.revenueAccountCode            ?? GL_ACCOUNTS.PROJECT_REVENUE;
    const desc  = `WIP snapshot — project ${payload.projectId} period ${payload.period}`;
    const lines: JournalEntryLine[] = [];
    if (payload.recognisedRevenueDelta > 0) {
      lines.push({ accountId: asset, debit:  payload.recognisedRevenueDelta, description: desc });
      lines.push({ accountId: rev,   credit: payload.recognisedRevenueDelta, description: desc });
    } else if (payload.recognisedRevenueDelta < 0) {
      lines.push({ accountId: rev,   debit: -payload.recognisedRevenueDelta, description: desc });
      lines.push({ accountId: asset, credit: -payload.recognisedRevenueDelta, description: desc });
    }
    if (payload.unbilledOrDeferred < 0) {
      const amt = Math.abs(payload.unbilledOrDeferred);
      lines.push({ accountId: asset, credit: amt, description: `${desc} reclass to liability` });
      lines.push({ accountId: liab,  debit:  amt, description: `${desc} reclass to liability` });
    }
    if (lines.length === 0) return;
    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate: event.timestamp,
      description: desc,
      lines,
      sourceType: 'invoice',
      sourceId: payload.snapshotId,
      sourceEvent: 'wip:snapshot:posted',
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
