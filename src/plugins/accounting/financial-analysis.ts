/**
 * Financial Analysis Engine — ratios, trends, KPIs.
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time as-of-date
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2
 */


interface FinancialData {
  asOfDate: string;
  assets: number;
  currentAssets: number;
  inventory: number;
  receivables: number;
  liabilities: number;
  currentLiabilities: number;
  payables: number;
  equity: number;
  retainedEarnings: number;
  revenue: number;
  cogs: number;
  grossProfit: number;
  operatingExpenses: number;
  operatingIncome: number;
  netIncome: number;
  cash: number;
  depreciation: number;
  interestExpense: number;
}

interface BudgetData {
  budgetAmount: number;
  actualAmount: number;
  variance: number;
  variancePercent: number;
  status: 'under' | 'over' | 'on-target';
}

interface FinancialRatios {
  liquidity: {
    currentRatio: number;
    quickRatio: number;
    cashRatio: number;
  };
  profitability: {
    grossProfitMargin: number;
    operatingMargin: number;
    netProfitMargin: number;
    returnOnAssets: number;
    returnOnEquity: number;
  };
  efficiency: {
    assetTurnover: number;
    receivablesTurnover: number;
    inventoryTurnover: number;
    daysInventoryOutstanding: number;
    daysPayableOutstanding: number;
    daysRecievableOutstanding: number;
    cashConversionCycle: number;
  };
  solvency: {
    debtToEquity: number;
    debtToAssets: number;
    equityRatio: number;
    interestCoverage: number;
  };
}

interface KPI {
  name: string;
  value: number;
  unit: string;
  target?: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  previousValue?: number;
}

interface TrendAnalysis {
  metric: string;
  periods: string[];
  values: number[];
  trend: 'increasing' | 'decreasing' | 'stable';
  trendStrength: number; // 0-1
  forecast?: number[];
}

interface SegmentAnalysis {
  segment: string;
  revenue: number;
  revenuePercent: number;
  cogs: number;
  grossProfit: number;
  grossProfitMargin: number;
  operatingExpenses: number;
  operatingIncome: number;
  operatingMargin: number;
}

interface CostAnalysis {
  totalCost: number;
  fixedCosts: number;
  fixedCostPercent: number;
  variableCosts: number;
  variableCostPercent: number;
  costPerUnit?: number;
  breakEvenPoint?: number;
  marginOfSafety?: number;
}

interface CashFlowForecast {
  month: string;
  beginningBalance: number;
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  endingBalance: number;
  projectedCashOnHand: number;
}

export class FinancialAnalysisEngine {
  /**
   * Calculate financial ratios from period data
   */
  calculateFinancialRatios(data: FinancialData): FinancialRatios {
    return {
      liquidity: {
        // Current Ratio = Current Assets / Current Liabilities
        currentRatio: this.safeDiv(data.currentAssets, data.currentLiabilities),
        // Quick Ratio = (Current Assets - Inventory) / Current Liabilities
        quickRatio: this.safeDiv(
          data.currentAssets - data.inventory,
          data.currentLiabilities
        ),
        // Cash Ratio = Cash / Current Liabilities
        cashRatio: this.safeDiv(data.cash, data.currentLiabilities),
      },
      profitability: {
        // Gross Profit Margin = Gross Profit / Revenue
        grossProfitMargin: this.toPercent(
          this.safeDiv(data.grossProfit, data.revenue)
        ),
        // Operating Margin = Operating Income / Revenue
        operatingMargin: this.toPercent(
          this.safeDiv(data.operatingIncome, data.revenue)
        ),
        // Net Profit Margin = Net Income / Revenue
        netProfitMargin: this.toPercent(
          this.safeDiv(data.netIncome, data.revenue)
        ),
        // Return on Assets = Net Income / Average Total Assets
        returnOnAssets: this.toPercent(
          this.safeDiv(data.netIncome, data.assets)
        ),
        // Return on Equity = Net Income / Average Stockholders' Equity
        returnOnEquity: this.toPercent(
          this.safeDiv(data.netIncome, data.equity)
        ),
      },
      efficiency: {
        // Asset Turnover = Revenue / Average Total Assets
        assetTurnover: this.safeDiv(data.revenue, data.assets),
        // Receivables Turnover = Revenue / Average Accounts Receivable
        receivablesTurnover: this.safeDiv(data.revenue, data.receivables),
        // Inventory Turnover = COGS / Average Inventory
        inventoryTurnover: this.safeDiv(data.cogs, data.inventory),
        // Days Inventory Outstanding = 365 / Inventory Turnover
        daysInventoryOutstanding: this.safeDiv(365, this.safeDiv(data.cogs, data.inventory)),
        // Days Payable Outstanding = 365 / Payables Turnover
        daysPayableOutstanding: this.safeDiv(365, this.safeDiv(data.cogs, data.payables)),
        // Days Receivable Outstanding = 365 / Receivables Turnover
        daysRecievableOutstanding: this.safeDiv(365, this.safeDiv(data.revenue, data.receivables)),
        // Cash Conversion Cycle = DIO + DRO - DPO
        cashConversionCycle: 0, // Calculated below
      },
      solvency: {
        // Debt-to-Equity = Total Liabilities / Total Equity
        debtToEquity: this.safeDiv(data.liabilities, data.equity),
        // Debt-to-Assets = Total Liabilities / Total Assets
        debtToAssets: this.safeDiv(data.liabilities, data.assets),
        // Equity Ratio = Total Equity / Total Assets
        equityRatio: this.safeDiv(data.equity, data.assets),
        // Interest Coverage = Operating Income / Interest Expense
        interestCoverage: this.safeDiv(data.operatingIncome, data.interestExpense),
      },
    };
  }

  /**
   * Generate KPIs for dashboard display
   */
  generateKPIs(data: FinancialData, ratios: FinancialRatios): KPI[] {
    const kpis: KPI[] = [];

    // Revenue KPI
    kpis.push({
      name: 'Total Revenue',
      value: data.revenue / 100,
      unit: 'EUR',
      trend: 'up',
      status: data.revenue > 0 ? 'excellent' : 'critical',
    });

    // Net Income KPI
    kpis.push({
      name: 'Net Income',
      value: data.netIncome / 100,
      unit: 'EUR',
      trend: data.netIncome > 0 ? 'up' : 'down',
      status: data.netIncome > 0 ? 'excellent' : 'critical',
    });

    // Net Profit Margin KPI
    const npmStatus =
      ratios.profitability.netProfitMargin >= 20
        ? 'excellent'
        : ratios.profitability.netProfitMargin >= 10
          ? 'good'
          : ratios.profitability.netProfitMargin >= 0
            ? 'warning'
            : 'critical';
    kpis.push({
      name: 'Net Profit Margin',
      value: ratios.profitability.netProfitMargin,
      unit: '%',
      target: 15,
      trend: 'up',
      status: npmStatus,
    });

    // Current Ratio KPI (liquidity)
    const crStatus =
      ratios.liquidity.currentRatio >= 2
        ? 'excellent'
        : ratios.liquidity.currentRatio >= 1.5
          ? 'good'
          : ratios.liquidity.currentRatio >= 1
            ? 'warning'
            : 'critical';
    kpis.push({
      name: 'Current Ratio',
      value: ratios.liquidity.currentRatio,
      unit: 'x',
      target: 2,
      trend: 'stable',
      status: crStatus,
    });

    // Return on Equity KPI
    const roeStatus =
      ratios.profitability.returnOnEquity >= 15
        ? 'excellent'
        : ratios.profitability.returnOnEquity >= 10
          ? 'good'
          : ratios.profitability.returnOnEquity >= 0
            ? 'warning'
            : 'critical';
    kpis.push({
      name: 'Return on Equity',
      value: ratios.profitability.returnOnEquity,
      unit: '%',
      target: 15,
      trend: 'up',
      status: roeStatus,
    });

    // Debt-to-Equity KPI
    const dteStatus =
      ratios.solvency.debtToEquity <= 1
        ? 'excellent'
        : ratios.solvency.debtToEquity <= 2
          ? 'good'
          : ratios.solvency.debtToEquity <= 3
            ? 'warning'
            : 'critical';
    kpis.push({
      name: 'Debt-to-Equity',
      value: ratios.solvency.debtToEquity,
      unit: 'x',
      target: 1,
      trend: 'down',
      status: dteStatus,
    });

    // Gross Profit Margin KPI
    const gpmStatus =
      ratios.profitability.grossProfitMargin >= 40
        ? 'excellent'
        : ratios.profitability.grossProfitMargin >= 30
          ? 'good'
          : ratios.profitability.grossProfitMargin >= 20
            ? 'warning'
            : 'critical';
    kpis.push({
      name: 'Gross Profit Margin',
      value: ratios.profitability.grossProfitMargin,
      unit: '%',
      target: 40,
      trend: 'up',
      status: gpmStatus,
    });

    return kpis;
  }

  /**
   * Analyze budget vs actual for a category
   */
  analyzeBudgetVariance(
    budgetAmount: number,
    actualAmount: number,
    _analysis: 'favorable' | 'unfavorable' = 'favorable'
  ): BudgetData {
    const variance = actualAmount - budgetAmount;
    const variancePercent = this.safeDiv(variance, budgetAmount) * 100;

    let status: 'under' | 'over' | 'on-target';
    if (Math.abs(variancePercent) <= 5) {
      status = 'on-target';
    } else if (variance < 0) {
      status = 'under';
    } else {
      status = 'over';
    }

    return {
      budgetAmount,
      actualAmount,
      variance,
      variancePercent,
      status,
    };
  }

  /**
   * Calculate trend from historical data
   */
  calculateTrend(
    metric: string,
    periods: string[],
    values: number[]
  ): TrendAnalysis {
    if (values.length < 2) {
      return {
        metric,
        periods,
        values,
        trend: 'stable',
        trendStrength: 0,
      };
    }

    // Simple linear regression for trend
    const n = values.length;
    const sumX = (n * (n + 1)) / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce(
      (sum, y, i) => sum + (i + 1) * y,
      0
    );
    const sumX2 = (n * (n + 1) * (2 * n + 1)) / 6;

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const avgValue = sumY / n;
    const stdDev = Math.sqrt(
      values.reduce((sum, v) => sum + Math.pow(v - avgValue, 2), 0) / n
    );
    const trendStrength = Math.min(1, Math.abs(slope) / (stdDev || 1));

    const trend =
      slope > stdDev * 0.05
        ? 'increasing'
        : slope < -stdDev * 0.05
          ? 'decreasing'
          : 'stable';

    // Simple forecast using slope
    const forecast = [
      values[values.length - 1] + slope,
      values[values.length - 1] + slope * 2,
      values[values.length - 1] + slope * 3,
    ];

    return {
      metric,
      periods,
      values,
      trend,
      trendStrength,
      forecast,
    };
  }

  /**
   * Analyze profitability by segment
   */
  analyzeSegments(segments: SegmentAnalysis[]): SegmentAnalysis[] {
    const totalRevenue = segments.reduce((sum, s) => sum + s.revenue, 0);

    return segments.map((segment) => ({
      ...segment,
      revenuePercent: (segment.revenue / totalRevenue) * 100,
    }));
  }

  /**
   * Analyze cost structure
   */
  analyzeCosts(
    totalCost: number,
    fixedCosts: number,
    units: number = 0
  ): CostAnalysis {
    const variableCosts = totalCost - fixedCosts;
    const variableCostPercent = (variableCosts / totalCost) * 100;
    const fixedCostPercent = (fixedCosts / totalCost) * 100;

    let costPerUnit = 0;
    let breakEvenPoint = 0;
    const marginOfSafety = 0;

    if (units > 0) {
      costPerUnit = totalCost / units;

      // Simplified break-even (needs price per unit)
      if (variableCosts > 0) {
        const variableCostPerUnit = variableCosts / units;
        breakEvenPoint = fixedCosts / (1 - variableCostPerUnit); // Simplified
      }
    }

    return {
      totalCost,
      fixedCosts,
      fixedCostPercent,
      variableCosts,
      variableCostPercent,
      costPerUnit,
      breakEvenPoint,
      marginOfSafety,
    };
  }

  /**
   * Project cash flow for future periods
   */
  projectCashFlow(
    startingBalance: number,
    projections: Array<{
      month: string;
      operatingCF: number;
      investingCF: number;
      financingCF: number;
    }>
  ): CashFlowForecast[] {
    let currentBalance = startingBalance;
    const forecasts: CashFlowForecast[] = [];

    projections.forEach((proj) => {
      const totalCF = proj.operatingCF + proj.investingCF + proj.financingCF;
      const endingBalance = currentBalance + totalCF;

      forecasts.push({
        month: proj.month,
        beginningBalance: currentBalance,
        operatingCashFlow: proj.operatingCF,
        investingCashFlow: proj.investingCF,
        financingCashFlow: proj.financingCF,
        endingBalance,
        projectedCashOnHand: endingBalance,
      });

      currentBalance = endingBalance;
    });

    return forecasts;
  }

  /**
   * Calculate working capital
   */
  calculateWorkingCapital(
    currentAssets: number,
    currentLiabilities: number
  ): number {
    return currentAssets - currentLiabilities;
  }

  /**
   * Calculate cash conversion cycle
   */
  calculateCashConversionCycle(
    daysInventoryOutstanding: number,
    daysRecievableOutstanding: number,
    daysPayableOutstanding: number
  ): number {
    return (
      daysInventoryOutstanding +
      daysRecievableOutstanding -
      daysPayableOutstanding
    );
  }

  /**
   * Identify financial health status
   */
  getFinancialHealth(ratios: FinancialRatios): 'excellent' | 'good' | 'warning' | 'critical' {
    let score = 0;

    // Liquidity score
    if (ratios.liquidity.currentRatio >= 1.5) score += 25;
    else if (ratios.liquidity.currentRatio >= 1) score += 15;
    else score += 5;

    // Profitability score
    if (ratios.profitability.netProfitMargin >= 10) score += 25;
    else if (ratios.profitability.netProfitMargin >= 5) score += 15;
    else if (ratios.profitability.netProfitMargin >= 0) score += 5;

    // Solvency score
    if (ratios.solvency.debtToEquity <= 1) score += 25;
    else if (ratios.solvency.debtToEquity <= 2) score += 15;
    else score += 5;

    // Efficiency score
    if (ratios.efficiency.assetTurnover >= 2) score += 25;
    else if (ratios.efficiency.assetTurnover >= 1) score += 15;
    else score += 5;

    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'warning';
    return 'critical';
  }

  /**
   * Utility: Safe division to prevent division by zero
   */
  private safeDiv(numerator: number, denominator: number): number {
    return denominator === 0 ? 0 : numerator / denominator;
  }

  /**
   * Utility: Convert to percentage
   */
  private toPercent(value: number): number {
    return Math.round(value * 10000) / 100;
  }
}

export default FinancialAnalysisEngine;
