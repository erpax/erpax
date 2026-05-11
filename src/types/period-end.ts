/**
 * Period-End Adjustment types — depreciation, accruals, deferrals, closing.
 *
 * @standard ISO-8601-1:2019 date-time period
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
 * @accounting IFRS IAS-16 property-plant-and-equipment depreciation
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
 * @accounting US-GAAP ASC-360 property-plant-and-equipment
 * @compliance SOX §404 internal-controls
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2
 */

export type AdjustmentType =
  | 'depreciation'
  | 'interest_accrual'
  | 'salary_accrual'
  | 'inventory_adjustment'
  | 'allowance_adjustment'
  | 'prepaid_adjustment';

export type DepreciationMethod = 'straight_line' | 'declining_balance' | 'units_of_production';
export type AccrualFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
export type AdjustmentStatus = 'draft' | 'posted' | 'reversed';

/**
 * Fixed Asset for depreciation
 */
export interface FixedAsset {
  id: string;
  tenantId: string;
  code: string;
  name: string;
  description?: string;
  glAccountId: string;
  accumulatedDepreciationAccountId: string;
  depreciationExpenseAccountId: string;

  // Asset details
  originalCost: number;
  purchaseDate: Date;
  salvageValue: number;
  usefulLifeYears: number;
  depreciationMethod: DepreciationMethod;
  unitsExpected?: number; // For units-of-production

  // Status
  status: 'active' | 'retired' | 'disposed';
  retirementDate?: Date;

  // Accumulated
  accumulatedDepreciation: number;
  depreciationToDate: Date;

  // Audit
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Depreciation Calculation
 */
export interface DepreciationCalculation {
  assetId: string;
  assetName: string;
  originalCost: number;
  usefulLifeYears: number;
  salvageValue: number;
  depreciationMethod: DepreciationMethod;

  annualDepreciation: number;
  monthlyDepreciation: number;
  currentMonthDepreciation: number;

  accumulatedToDate: number;
  netBookValue: number;
}

/**
 * Interest Accrual Setup
 */
export interface InterestAccrual {
  id: string;
  tenantId: string;
  liabilityAccountId: string;
  principalAmount: number;
  annualRate: number; // percentage
  startDate: Date;
  endDate?: Date;

  interestPayableAccountId: string;
  interestExpenseAccountId: string;

  status: 'active' | 'inactive';
  lastAccrualDate: Date;

  createdAt: Date;
}

/**
 * Interest Accrual Calculation
 */
export interface InterestAccrualCalculation {
  liabilityId: string;
  principalAmount: number;
  annualRate: number;
  daysInPeriod: number;
  daysInYear: number;

  dailyInterest: number;
  periodInterest: number;
  accumulatedInterest: number;
}

/**
 * Salary Accrual Setup
 */
export interface SalaryAccrual {
  id: string;
  tenantId: string;
  name: string;
  employeeCount: number;
  weeklyPayroll: number;

  salaryExpenseAccountId: string;
  salaryPayableAccountId: string;

  frequency: AccrualFrequency;
  accrueOn: 'month_end' | 'period_end';

  status: 'active' | 'inactive';
  lastAccrualDate: Date;

  createdAt: Date;
}

/**
 * Salary Accrual Calculation
 */
export interface SalaryAccrualCalculation {
  salaryId: string;
  weeklyPayroll: number;
  daysInPeriod: number;
  frequency: AccrualFrequency;

  dailyRate: number;
  periodAccrual: number;
}

/**
 * Inventory Adjustment
 */
export interface InventoryAdjustment {
  id: string;
  tenantId: string;
  itemId: string;
  itemName: string;
  systemQuantity: number;
  physicalCount: number;
  adjustmentQuantity: number;
  costPerUnit: number;
  adjustmentAmount: number;

  inventoryAccountId: string;
  cogsAccountId: string;
  varianceAccountId?: string;

  adjustmentDate: Date;
  adjustmentBy: string;
  notes?: string;

  status: 'pending' | 'posted' | 'approved';
}

/**
 * Period-End Adjustment Entry
 */
export interface PeriodEndAdjustment {
  id: string;
  tenantId: string;
  adjustmentType: AdjustmentType;
  referenceId: string; // assetId, liabilityId, etc.

  journalEntryId: string;

  amount: number;
  description: string;
  adjustmentDate: Date;

  status: AdjustmentStatus;
  postedAt?: Date;
  postedBy?: string;

  createdAt: Date;
  createdBy: string;
}

/**
 * Period-End Closing Checklist
 */
export interface PeriodClosingChecklist {
  tenantId: string;
  periodEndDate: Date;

  items: {
    depreciation: boolean;
    interestAccrual: boolean;
    salaryAccrual: boolean;
    inventoryAdjustment: boolean;
    allowanceAdjustment: boolean;
    prepaidAdjustment: boolean;
    bankReconciliation: boolean;
    glReconciliation: boolean;
  };

  allAdjustmentsApproved: boolean;
  completedAt?: Date;
  completedBy?: string;
}

/**
 * Period-End Configuration per Tenant
 */
export interface PeriodEndConfig {
  tenantId: string;
  autoDepreciation: boolean;
  autoInterestAccrual: boolean;
  autoSalaryAccrual: boolean;
  autoInventoryAdjustment: boolean;
  requireApprovalBeforePosting: boolean;
  closingDay: number; // 1-31, day of month
}
