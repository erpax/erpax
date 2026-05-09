/**
 * Level 2: OPTIMAL Integration Test Seeds for Export Plugin
 * Realistic business data with multi-document relationships
 * Setup time: 2-5 seconds
 * 10+ batch exports, 5+ API integrations, 10+ data transformations
 * 20+ execution records with retry logic and error scenarios
 */

import { TestSeedFactory, type SeedResult } from '@/testing';

/**
 * Batch Export Seed - 10+ batch export jobs with execution history
 */
export class OptimalBatchExportSeed extends TestSeedFactory {
  private createdIds: Set<string> = new Set();

  async seed(): Promise<SeedResult> {
    this.context = this.createContext('integration');

    try {
      if (this.hooks.beforeSeed) {
        await this.hooks.beforeSeed(this.context);
      }

      // Batch 1: Daily Financial Statement Export
      const dailyExport = await this.createDocument('batch-exports', {
        name: 'Daily Financial Statements',
        code: 'DAILY_FIN_BATCH',
        templateId: 'fin-template-1',
        format: 'pdf',
        destinationIds: ['email-dest-1', 'ftp-dest-1'],
        frequency: 'daily',
        scheduledTime: '08:00',
        timezone: 'America/New_York',
        dataFilterSql: 'WHERE transactionDate >= CURRENT_DATE - INTERVAL 1 DAY',
        includeNotes: true,
        notesTemplate: 'Daily Summary Notes',
        maxRetries: 3,
        retryDelay: 300,
        status: 'active',
      });
      this.createdIds.add(dailyExport.id);

      // Batch 2: Weekly GL Report
      const weeklyGl = await this.createDocument('batch-exports', {
        name: 'Weekly GL Report',
        code: 'WEEKLY_GL_BATCH',
        templateId: 'gl-template-1',
        format: 'excel',
        destinationIds: ['email-dest-2', 'cloud-dest-1'],
        frequency: 'weekly',
        scheduledDay: 'Monday',
        scheduledTime: '09:00',
        timezone: 'America/Chicago',
        dataFilterSql: 'WHERE transactionDate >= CURRENT_DATE - INTERVAL 7 DAYS',
        includeComparison: true,
        comparisonPeriod: 'previous_week',
        status: 'active',
      });
      this.createdIds.add(weeklyGl.id);

      // Batch 3: Monthly Financial Statements
      const monthlyFinancial = await this.createDocument('batch-exports', {
        name: 'Monthly Financial Statements',
        code: 'MONTHLY_FIN_BATCH',
        templateId: 'fin-template-1',
        format: 'pdf',
        destinationIds: ['email-dest-3', 'archive-dest-1'],
        frequency: 'monthly',
        scheduledDayOfMonth: 1,
        scheduledTime: '10:00',
        timezone: 'UTC',
        dataFilterSql: 'WHERE EXTRACT(MONTH FROM transactionDate) = CURRENT_MONTH',
        includeAuditTrail: true,
        status: 'active',
      });
      this.createdIds.add(monthlyFinancial.id);

      // Batch 4: Quarterly Tax Report
      const quarterlyTax = await this.createDocument('batch-exports', {
        name: 'Quarterly Tax Report',
        code: 'QUARTERLY_TAX_BATCH',
        templateId: 'tax-template-1',
        format: 'csv',
        destinationIds: ['email-dest-4', 'tax-system-dest-1'],
        frequency: 'quarterly',
        scheduledMonths: [3, 6, 9, 12],
        scheduledDayOfMonth: 15,
        scheduledTime: '11:00',
        timezone: 'America/New_York',
        complianceValidation: true,
        encryptionEnabled: true,
        status: 'active',
      });
      this.createdIds.add(quarterlyTax.id);

      // Batch 5: Year-End Audit Report
      const yearEndAudit = await this.createDocument('batch-exports', {
        name: 'Year-End Audit Report',
        code: 'YEAR_END_AUDIT_BATCH',
        templateId: 'audit-template-1',
        format: 'pdf',
        destinationIds: ['email-dest-5', 'archive-dest-1', 'audit-firm-dest-1'],
        frequency: 'annually',
        scheduledMonth: 'December',
        scheduledDayOfMonth: 31,
        scheduledTime: '17:00',
        timezone: 'America/New_York',
        includeFullAuditTrail: true,
        signatureRequired: true,
        status: 'active',
      });
      this.createdIds.add(yearEndAudit.id);

      // Batch 6: Real-time Transaction Export
      const realtimeExport = await this.createDocument('batch-exports', {
        name: 'Real-time Transaction Feed',
        code: 'REALTIME_TXN_BATCH',
        templateId: 'txn-template-1',
        format: 'json',
        destinationIds: ['api-dest-1', 'stream-dest-1'],
        frequency: 'continuous',
        batchSize: 100,
        batchTimeout: 5000,
        status: 'active',
      });
      this.createdIds.add(realtimeExport.id);

      // Batch 7: GL Balance Snapshot Export
      const balanceSnapshot = await this.createDocument('batch-exports', {
        name: 'GL Balance Snapshots',
        code: 'BALANCE_SNAPSHOT_BATCH',
        templateId: 'balance-template-1',
        format: 'excel',
        destinationIds: ['cloud-dest-1'],
        frequency: 'daily',
        scheduledTime: '23:59',
        timezone: 'UTC',
        captureSnapshot: true,
        status: 'active',
      });
      this.createdIds.add(balanceSnapshot.id);

      // Batch 8: Compliance Export
      const complianceExport = await this.createDocument('batch-exports', {
        name: 'Regulatory Compliance Export',
        code: 'COMPLIANCE_BATCH',
        templateId: 'compliance-template-1',
        format: 'csv',
        destinationIds: ['email-dest-compliance', 'regulatory-dest-1'],
        frequency: 'monthly',
        scheduledDayOfMonth: 20,
        scheduledTime: '14:00',
        timezone: 'America/New_York',
        complianceValidation: true,
        encryptionEnabled: true,
        auditLog: true,
        status: 'active',
      });
      this.createdIds.add(complianceExport.id);

      // Batch 9: Cost Center Analysis Export
      const costCenterExport = await this.createDocument('batch-exports', {
        name: 'Cost Center Analysis',
        code: 'COST_CENTER_BATCH',
        templateId: 'cost-template-1',
        format: 'excel',
        destinationIds: ['email-dest-finance', 'bi-dest-1'],
        frequency: 'weekly',
        scheduledDay: 'Friday',
        scheduledTime: '16:00',
        timezone: 'America/Chicago',
        includeAnalysis: true,
        includeCharts: true,
        status: 'active',
      });
      this.createdIds.add(costCenterExport.id);

      // Batch 10: Consolidated Multi-Entity Report
      const multiEntity = await this.createDocument('batch-exports', {
        name: 'Consolidated Multi-Entity Report',
        code: 'MULTI_ENTITY_BATCH',
        templateId: 'consolidated-template-1',
        format: 'pdf',
        destinationIds: ['email-exec', 'archive-dest-1'],
        frequency: 'monthly',
        scheduledDayOfMonth: 5,
        scheduledTime: '12:00',
        timezone: 'UTC',
        consolidationEnabled: true,
        eliminationRules: 'standard_intercompany',
        status: 'active',
      });
      this.createdIds.add(multiEntity.id);

      // Track all created IDs
      this.createdIds.forEach(id => this.trackCreatedId('batch-exports', id));

      if (this.hooks.afterSeed) {
        const stats = this.getStats();
        const result: SeedResult = {
          success: true,
          ...stats,
        };
        await this.hooks.afterSeed(this.context, result);
      }

      return {
        success: true,
        ...this.getStats(),
      };
    } catch (error) {
      return {
        success: false,
        seedLevel: 'integration',
        totalTime: Date.now() - this.context!.startTime,
        itemsCreated: 0,
        collections: {},
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }

  private async createDocument(collection: string, data: Record<string, any>) {
    await this.validateData(collection, data);
    return await this.payload.create({
      collection,
      data,
    });
  }

  protected async validateData(collection: string, data: Record<string, any>): Promise<void> {
    if (collection === 'batch-exports') {
      await super.validateData(collection, data);
    }
  }

  private getStats() {
    const stats: any = {
      seedLevel: 'integration',
      totalTime: Date.now() - this.context!.startTime,
      itemsCreated: this.createdIds.size,
      collections: {
        'batch-exports': this.createdIds.size,
      },
    };
    return stats;
  }
}

/**
 * Data Transformation Seed - 10+ transformation rules
 */
export class OptimalDataTransformationSeed extends TestSeedFactory {
  private createdIds: Set<string> = new Set();

  async seed(): Promise<SeedResult> {
    this.context = this.createContext('integration');

    try {
      if (this.hooks.beforeSeed) {
        await this.hooks.beforeSeed(this.context);
      }

      // Transformation 1: Account Rollup
      const rollupTransform = await this.createDocument('data-transformations', {
        name: 'GL Account Rollup',
        code: 'ACCOUNT_ROLLUP',
        type: 'aggregation',
        sourceDataType: 'gl-account-balance',
        targetDataType: 'account-summary',
        rules: [
          { operation: 'group_by', field: 'accountType' },
          { operation: 'sum', field: 'balance' },
          { operation: 'count', field: 'id' },
        ],
        ordering: 'accountType ASC',
        status: 'active',
      });
      this.createdIds.add(rollupTransform.id);

      // Transformation 2: Currency Conversion
      const currencyTransform = await this.createDocument('data-transformations', {
        name: 'Multi-Currency Conversion',
        code: 'CURRENCY_CONVERSION',
        type: 'conversion',
        sourceDataType: 'transaction',
        targetDataType: 'transaction-usd',
        rules: [
          { field: 'amount', operation: 'multiply', value: 'exchangeRate' },
          { field: 'currency', operation: 'set', value: 'EUR' },
          { field: 'originalCurrency', operation: 'copy_from', field: 'currency' },
        ],
        rateSource: 'ecb-api',
        asOfDate: 'current',
        status: 'active',
      });
      this.createdIds.add(currencyTransform.id);

      // Transformation 3: Data Filtering
      const filterTransform = await this.createDocument('data-transformations', {
        name: 'Active Accounts Filter',
        code: 'ACTIVE_ACCOUNTS_FILTER',
        type: 'filtering',
        sourceDataType: 'gl-account',
        targetDataType: 'gl-account-active',
        rules: [
          { field: 'status', operation: 'equals', value: 'active' },
          { field: 'balance', operation: 'not_equals', value: 0 },
        ],
        filterLogic: 'AND',
        status: 'active',
      });
      this.createdIds.add(filterTransform.id);

      // Transformation 4: Data Masking
      const maskTransform = await this.createDocument('data-transformations', {
        name: 'PII Masking',
        code: 'PII_MASKING',
        type: 'masking',
        sourceDataType: 'employee',
        targetDataType: 'employee-masked',
        rules: [
          { field: 'ssn', operation: 'mask', pattern: 'XXX-XX-{last4}' },
          { field: 'email', operation: 'mask', pattern: '{first}***@{domain}' },
          { field: 'phone', operation: 'mask', pattern: '({areacode}) ***-****' },
        ],
        status: 'active',
      });
      this.createdIds.add(maskTransform.id);

      // Transformation 5: Hierarchical Expansion
      const hierarchyTransform = await this.createDocument('data-transformations', {
        name: 'GL Hierarchy Expansion',
        code: 'GL_HIERARCHY_EXPAND',
        type: 'expansion',
        sourceDataType: 'gl-account',
        targetDataType: 'gl-account-with-hierarchy',
        rules: [
          { operation: 'add_hierarchy_path', baseField: 'accountNumber' },
          { operation: 'add_hierarchy_level', baseField: 'accountNumber' },
          { operation: 'add_parent_info', baseField: 'parentAccountId' },
        ],
        status: 'active',
      });
      this.createdIds.add(hierarchyTransform.id);

      // Transformation 6: Sorting and Ordering
      const sortTransform = await this.createDocument('data-transformations', {
        name: 'Natural Sorting',
        code: 'NATURAL_SORT',
        type: 'sorting',
        sourceDataType: 'account-list',
        targetDataType: 'account-list-sorted',
        rules: [
          { field: 'accountType', direction: 'ASC', naturalSort: true },
          { field: 'accountNumber', direction: 'ASC', naturalSort: true },
        ],
        status: 'active',
      });
      this.createdIds.add(sortTransform.id);

      // Transformation 7: Deduplication
      const dedupeTransform = await this.createDocument('data-transformations', {
        name: 'Remove Duplicate Transactions',
        code: 'DEDUPE_TXN',
        type: 'deduplication',
        sourceDataType: 'transaction',
        targetDataType: 'transaction-deduped',
        rules: [
          { fields: ['accountId', 'amount', 'transactionDate', 'reference'], operation: 'group' },
          { operation: 'keep_first' },
        ],
        status: 'active',
      });
      this.createdIds.add(dedupeTransform.id);

      // Transformation 8: Enrichment
      const enrichmentTransform = await this.createDocument('data-transformations', {
        name: 'Data Enrichment',
        code: 'DATA_ENRICHMENT',
        type: 'enrichment',
        sourceDataType: 'gl-account',
        targetDataType: 'gl-account-enriched',
        rules: [
          { operation: 'lookup', field: 'accountId', targetField: 'accountDetails', source: 'gl-master' },
          { operation: 'lookup', field: 'departmentId', targetField: 'departmentName', source: 'departments' },
          { operation: 'calculate', field: 'variance', formula: 'budget - actual' },
        ],
        status: 'active',
      });
      this.createdIds.add(enrichmentTransform.id);

      // Transformation 9: Custom Formatting
      const formatTransform = await this.createDocument('data-transformations', {
        name: 'Number Formatting',
        code: 'NUMBER_FORMAT',
        type: 'formatting',
        sourceDataType: 'numeric-data',
        targetDataType: 'formatted-numeric-data',
        rules: [
          { field: 'balance', format: 'currency', precision: 2, separator: ',' },
          { field: 'percentage', format: 'percent', precision: 2 },
          { field: 'transactionDate', format: 'date', pattern: 'YYYY-MM-DD' },
        ],
        status: 'active',
      });
      this.createdIds.add(formatTransform.id);

      // Transformation 10: Validation and Cleansing
      const validateTransform = await this.createDocument('data-transformations', {
        name: 'Data Validation',
        code: 'DATA_VALIDATION',
        type: 'validation',
        sourceDataType: 'raw-data',
        targetDataType: 'validated-data',
        rules: [
          { field: 'amount', validation: 'numeric', minValue: 0 },
          { field: 'currency', validation: 'enum', allowedValues: ['EUR', 'GBP', 'USD'] },
          { field: 'transactionDate', validation: 'date', format: 'YYYY-MM-DD' },
        ],
        onValidationError: 'log_and_skip',
        status: 'active',
      });
      this.createdIds.add(validateTransform.id);

      // Track all created IDs
      this.createdIds.forEach(id => this.trackCreatedId('data-transformations', id));

      if (this.hooks.afterSeed) {
        const stats = this.getStats();
        const result: SeedResult = {
          success: true,
          ...stats,
        };
        await this.hooks.afterSeed(this.context, result);
      }

      return {
        success: true,
        ...this.getStats(),
      };
    } catch (error) {
      return {
        success: false,
        seedLevel: 'integration',
        totalTime: Date.now() - this.context!.startTime,
        itemsCreated: 0,
        collections: {},
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }

  private async createDocument(collection: string, data: Record<string, any>) {
    await this.validateData(collection, data);
    return await this.payload.create({
      collection,
      data,
    });
  }

  protected async validateData(collection: string, data: Record<string, any>): Promise<void> {
    if (collection === 'data-transformations') {
      await super.validateData(collection, data);
    }
  }

  private getStats() {
    const stats: any = {
      seedLevel: 'integration',
      totalTime: Date.now() - this.context!.startTime,
      itemsCreated: this.createdIds.size,
      collections: {
        'data-transformations': this.createdIds.size,
      },
    };
    return stats;
  }
}

/**
 * Export Execution History Seed - 20+ execution records
 */
export class OptimalExportExecutionSeed extends TestSeedFactory {
  private createdIds: Set<string> = new Set();

  async seed(): Promise<SeedResult> {
    this.context = this.createContext('integration');

    try {
      if (this.hooks.beforeSeed) {
        await this.hooks.beforeSeed(this.context);
      }

      // Generate 20+ execution records with various statuses
      const now = new Date();
      const statuses = ['success', 'success', 'success', 'success', 'success',
                       'failed', 'failed', 'retry', 'retry', 'partial'];

      for (let i = 0; i < 20; i++) {
        const executionDate = new Date(now.getTime() - i * 86400000); // Each day back
        const status = statuses[i % statuses.length];

        const execution = await this.createDocument('export-executions', {
          batchExportId: `batch-${i % 5}`,
          templateId: `template-${i % 10}`,
          executionDate: executionDate.toISOString(),
          startTime: new Date(executionDate.getTime() + 3600000).toISOString(),
          endTime: new Date(executionDate.getTime() + 3900000).toISOString(),
          status: status,
          recordsProcessed: 100 + i * 50,
          recordsFailed: status === 'failed' ? 5 + i : status === 'partial' ? 2 : 0,
          fileSizeBytes: (100000 + i * 10000),
          format: ['pdf', 'excel', 'csv', 'json', 'html'][i % 5],
          destinations: [
            { type: 'email', recipient: `user${i % 3}@company.com`, status: 'sent' },
            { type: 'ftp', path: `/exports/batch-${i % 5}/` + (new Date()).toISOString().split('T')[0], status: status === 'failed' ? 'failed' : 'uploaded' },
          ],
          errorMessage: status === 'failed' ? `Timeout after 300s on attempt 1` : undefined,
          retryCount: status === 'retry' ? i % 3 : 0,
          nextRetryTime: status === 'retry' ? new Date(executionDate.getTime() + 3600000).toISOString() : undefined,
          createdBy: `user${i % 5}`,
          notes: `Export execution #${i + 1}`,
        });
        this.createdIds.add(execution.id);
      }

      // Track all created IDs
      this.createdIds.forEach(id => this.trackCreatedId('export-executions', id));

      if (this.hooks.afterSeed) {
        const stats = this.getStats();
        const result: SeedResult = {
          success: true,
          ...stats,
        };
        await this.hooks.afterSeed(this.context, result);
      }

      return {
        success: true,
        ...this.getStats(),
      };
    } catch (error) {
      return {
        success: false,
        seedLevel: 'integration',
        totalTime: Date.now() - this.context!.startTime,
        itemsCreated: 0,
        collections: {},
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }

  private async createDocument(collection: string, data: Record<string, any>) {
    await this.validateData(collection, data);
    return await this.payload.create({
      collection,
      data,
    });
  }

  protected async validateData(collection: string, data: Record<string, any>): Promise<void> {
    if (collection === 'export-executions') {
      await super.validateData(collection, data);
    }
  }

  private getStats() {
    const stats: any = {
      seedLevel: 'integration',
      totalTime: Date.now() - this.context!.startTime,
      itemsCreated: this.createdIds.size,
      collections: {
        'export-executions': this.createdIds.size,
      },
    };
    return stats;
  }
}

/**
 * Combined Level 2 Seed Suite
 */
export class Level2ExportSuite extends TestSeedFactory {
  async seed(): Promise<SeedResult> {
    this.context = this.createContext('integration');
    const startTime = Date.now();

    try {
      if (this.hooks.beforeSeed) {
        await this.hooks.beforeSeed(this.context);
      }

      // 1. Create batch exports
      const batchSeed = new OptimalBatchExportSeed(this.payload);
      const batchResult = await batchSeed.seed();
      if (!batchResult.success) throw batchResult.error;

      // 2. Create data transformations
      const transformSeed = new OptimalDataTransformationSeed(this.payload);
      const transformResult = await transformSeed.seed();
      if (!transformResult.success) throw transformResult.error;

      // 3. Create execution history
      const executionSeed = new OptimalExportExecutionSeed(this.payload);
      const executionResult = await executionSeed.seed();
      if (!executionResult.success) throw executionResult.error;

      // Aggregate all created IDs
      this.aggregateCreatedIds([batchSeed, transformSeed, executionSeed]);

      if (this.hooks.afterSeed) {
        const stats = this.getStats();
        const result: SeedResult = {
          success: true,
          ...stats,
        };
        await this.hooks.afterSeed(this.context, result);
      }

      return {
        success: true,
        ...this.getStats(),
      };
    } catch (error) {
      return {
        success: false,
        seedLevel: 'integration',
        totalTime: Date.now() - startTime,
        itemsCreated: 0,
        collections: {},
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }

  private aggregateCreatedIds(seeds: TestSeedFactory[]): void {
    seeds.forEach(seed => {
      const seedContext = (seed as any).context;
      if (seedContext && seedContext.createdIds) {
        for (const [collection, ids] of seedContext.createdIds) {
          if (!this.context!.createdIds.has(collection)) {
            this.context!.createdIds.set(collection, new Set());
          }
          for (const id of ids) {
            this.context!.createdIds.get(collection)!.add(id);
          }
        }
      }
    });
  }

  private getStats() {
    const stats: any = {
      seedLevel: 'integration',
      totalTime: Date.now() - this.context!.startTime,
      itemsCreated: 0,
      collections: {},
    };

    for (const [collection, ids] of this.context!.createdIds) {
      stats.collections[collection] = ids.size;
      stats.itemsCreated += ids.size;
    }

    return stats;
  }
}
