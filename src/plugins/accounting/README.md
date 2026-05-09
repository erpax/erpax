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

### 2. Hook Factory Pattern

Create consistent hooks with error handling and logging:

```typescript
import { createAccountingHook } from '@/plugins/accounting/hooks';

const myHook = createAccountingHook('myService', async (hostId, data) => {
  // Your service logic here
}, (doc, operation) => doc && operation === 'create');
```

### 3. Collection Factory Pattern

Create accounting collections with standard access control:

```typescript
import { createAccountingCollection } from '@/plugins/accounting/factories';

const myCollection = {
  ...createAccountingCollection({
    slug: 'my-collection',
    labels: { singular: 'Item', plural: 'Items' },
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
    slug: 'my-items',
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
