# Accounting Plugin - DRY Architecture

Consolidates all accounting functionality following DRY (Don't Repeat Yourself) principles and Payload plugin patterns.

## Architecture

```
accounting/
├── hooks/                 # Hook factories and utilities
│   └── base-accounting-hook.ts
├── fields/               # Reusable field definitions
│   └── base-accounting-fields.ts
├── factories/            # Collection and configuration factories
│   └── collection-factory.ts
├── utilities/            # Shared calculations
│   └── calculations.ts
├── plugin.ts            # Main plugin entry point
├── index.ts             # Public API exports
└── README.md            # This file
```

## Key Patterns

### 1. Shared Fields (DRY Field Definitions)

Instead of repeating field definitions, use factory functions:

```typescript
import { multiTenancyField, glAccountField, currencyField } from '@/plugins/accounting/fields';

const fields = [
  multiTenancyField(),
  ...glAccountField(true), // GL account with denormalized fields
  currencyField('EUR'),
];
```

### 2. Direct Hook Pattern

Slice FFF/PPP/HHH retired the `createAccountingHook` factory — the
8 sibling hooks (`invoice`, `bill`, `payment`, `item`,
`depreciation`, `period-end-adjustment`, `inventory-movement`,
`payroll-run`/`payroll-disbursement`/`lease-period-posting`) were
written directly without it and the factory ended up with zero
callers. Write hooks directly and import the relevant service
singleton from `@/services/*`:

```typescript
import type { CollectionAfterChangeHook } from 'payload';
import { glPostingService } from '@/services/gl-posting.service';

export const myHook: CollectionAfterChangeHook = async ({ doc, operation }) => {
  if (operation !== 'create') return doc;
  await glPostingService.postSomething(doc.tenant, doc);
  return doc;
};
```

For tenant auto-population, the `multiTenancyField()` factory wires
`autoPopulateTenant` (from `@/hooks/autoPopulateTenant`) into the
`beforeValidate` chain automatically — no explicit hook needed.

### 3. Collection Factory Pattern

Create accounting collections with standard access control:

```typescript
import { createAccountingCollection } from '@/plugins/accounting/factories';

const myCollection = {
  ...createAccountingCollection({
    slug: 'tax-codes',
    labels: { singular: 'Tax Code', plural: 'Tax Codes' },
    useAsTitle: 'itemId',
    defaultColumns: ['itemId', 'status'],
  }, () => [
    // Your fields
  ]),
};
```

### 4. Shared Calculations

Use utility functions instead of duplicating calculation logic:

```typescript
import {
  calculateArrayTotal,
  calculateVariancePercent,
  calculateWeightedAverageCost,
} from '@/plugins/accounting/utilities';

// In beforeChange hook:
data.totalBudget = calculateArrayTotal(data.budgetItems, 'amount');
data.variancePercent = calculateVariancePercent(data.actual, data.budget);
```

## Benefits

✅ **No Code Duplication** - Fields, hooks, and calculations defined once  
✅ **Consistent Patterns** - All collections follow the same structure  
✅ **Easy Updates** - Fix bugs or add features in one place  
✅ **Maintainability** - Clear separation of concerns  
✅ **Scalability** - Add new collections quickly using factories  

## Usage Example

### Creating a New Accounting Collection

```typescript
import { createAccountingCollection, createLineItemArray } from '@/plugins/accounting/factories';
import { multiTenancyField, currencyField, notesField } from '@/plugins/accounting/fields';
import { calculateArrayTotal } from '@/plugins/accounting/utilities';

const MyCollection = {
  ...createAccountingCollection({
    slug: 'tax-codes',
    labels: { singular: 'My Item', plural: 'My Items' },
    useAsTitle: 'itemId',
    defaultColumns: ['itemId', 'totalAmount', 'status'],
    beforeChangeHooks: [
      async ({ data }) => {
        // Custom logic
        data.totalAmount = calculateArrayTotal(data.items, 'amount');
        return data;
      },
    ],
  }, () => [
    multiTenancyField(),
    { name: 'itemId', type: 'text', required: true, unique: true },
    createLineItemArray([
      { name: 'description', type: 'text', required: true },
      { name: 'amount', type: 'number', required: true },
    ]),
    { name: 'totalAmount', type: 'number', admin: { disabled: true } },
    currencyField(),
    notesField(),
  ]),
};
```

## Collections Using This Plugin

- GLAccounts
- JournalEntries
- GLPostings
- BankStatements
- FinancialStatements
- PeriodEndAdjustments
- TaxCalculations
- CurrencyRates
- TrialBalance
- ARAgingReport
- APAgingReport
- AllowanceForDoubtfulAccounts
- FixedAssets
- InventoryCostFlow
- COGSCalculation
- BudgetPlanning
- BudgetVariance
- FinancialRatios
- CashFlowForecast
- TrendAnalysis

## Extending the Plugin

### Adding a New Field Template

Edit `fields/base-accounting-fields.ts`:

```typescript
export const myNewField = (): Field => ({
  name: 'myField',
  type: 'text',
  // ...
});
```

### Adding a New Calculation

Edit `utilities/calculations.ts`:

```typescript
export const calculateMyValue = (input: number): number => {
  return input * 2;
};
```

### Adding a New Hook Pattern

Edit `hooks/base-accounting-hook.ts` or create a new hook factory.

## Testing

Each factory and utility should be thoroughly tested. All calculations must be validated against expected accounting standards.
