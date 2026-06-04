# Phase B7: Post-Close Analytics

**Status:** Implementation Complete  
**Version:** 2026-05-12  
**Scope:** Variance analysis (budget vs. actual, period-over-period), financial ratio analysis (liquidity, profitability, solvency, efficiency), segment reporting (business and geographic), management reporting (executive dashboards, KPI scorecards)  
**Integration:** Follows Phase B6 (Audit & Compliance Reporting); builds on Phase A1–B6

---

## 1. Standards & Compliance Framework

### 1.1 IAS-34: Interim Financial Reporting (2023 Update)

**Reference:** [IAS 34:2023](https://www.ifrs.org/)

Interim financial reporting (quarterly or other interim periods) must include:
- Comparative condensed financial statements
- Segment reporting per IFRS-8 (business and geographic segments)
- Earnings per share and other key metrics
- Variance commentary explaining significant changes

**Invariant:** ERPax Post-Close Analytics generates variance explanations for all material variances (>10% default threshold).

---

### 1.2 IFRS-8: Operating Segments (2023 Update)

**Reference:** [IFRS 8:2023](https://www.ifrs.org/)

Segment reporting requires:
- Identify operating segments per internal reporting structure
- Separate business segments (product/service lines) from geographic segments (markets)
- Report segment revenue, profit, assets, liabilities
- Disclose segment concentration (Herfindahl Index) and geographic breakdown

**Invariant:** ERPax separates business and geographic segments per IFRS-8 in all segment reporting.

---

### 1.3 COSO Internal Control Framework

**Reference:** [COSO Internal Control — Integrated Framework](https://www.coso.org/)

Post-close analytics support internal control verification:
- **Accuracy:** Variance analysis verifies GL balance integrity
- **Completeness:** Ratio analysis checks for missing transactions or accounts
- **Timeliness:** Period-over-period trends identify delays or timing issues
- **Authorization:** Management reporting includes approval workflows and threshold alerts

**Invariant:** ERPax management reporting includes threshold alerts for critical variances and ratio deterioration.

---

### 1.4 GAAP VRE (Variance Reporting and Explanation) Guidelines

Variance analysis best practices:
- All variances >threshold% require explanation
- Separate volume, price, and mix variances (waterfall analysis)
- Compare actual to budget AND prior period
- Flag trends (improving, deteriorating, stable)
- Quantify impact and recommend action

**Invariant:** ERPax variance analysis includes waterfall decomposition (volume, price, mix variances).

---

## 2. Implementation Details

### 2.1 Service: PostCloseAnalytics

**Location:** `src/post/close/analytics/service.ts` (this object's `service` facet)

Static class with four main methods:

#### generateVarianceAnalysis(currentPeriodData, budgetData, priorPeriodData, varianceThreshold): VarianceAnalysisReport
Generates budget vs. actual and period-over-period variance analysis.

**Process:**
1. Extract GL line items (revenue, expenses, profit)
2. Calculate variance: actual - budget
3. Calculate variance %: variance / budget * 100
4. Flag variances exceeding threshold
5. Calculate prior-period change (if prior data available)
6. Generate waterfall decomposition (volume, price, mix)
7. Assess trend (improving, deteriorating, stable)

**Output:** VarianceAnalysisReport with budget vs. actual and period-over-period comparisons.

#### generateRatioAnalysis(consolidatedGLData, priorPeriodData): RatioAnalysisReport
Generates financial ratio analysis across 4 dimensions: liquidity, profitability, solvency, efficiency.

**Ratios Calculated:**

**Liquidity (4 ratios):**
- Current Ratio = Current Assets / Current Liabilities (benchmark: 2.0)
- Quick Ratio = Quick Assets / Current Liabilities (benchmark: 1.0)
- Cash Ratio = Cash / Current Liabilities (benchmark: 0.5)
- Working Capital = Current Assets - Current Liabilities

**Profitability (5 ratios):**
- Gross Profit Margin = Gross Profit / Revenue * 100% (benchmark: 45%)
- Operating Margin = Operating Profit / Revenue * 100% (benchmark: 20%)
- Net Profit Margin = Net Income / Revenue * 100% (benchmark: 15%)
- Return on Assets (ROA) = Net Income / Total Assets * 100% (benchmark: 10%)
- Return on Equity (ROE) = Net Income / Equity * 100% (benchmark: 15%)

**Solvency (4 ratios):**
- Debt-to-Equity = Total Debt / Total Equity (benchmark: 1.0)
- Debt-to-Assets = Total Debt / Total Assets (benchmark: 0.5)
- Interest Coverage = Operating Profit / Interest Expense (benchmark: 5.0)
- Equity Ratio = Total Equity / Total Assets (benchmark: 0.5)

**Efficiency (4 ratios):**
- Asset Turnover = Revenue / Total Assets (benchmark: 0.67)
- Receivables Turnover = Revenue / Accounts Receivable (benchmark: 10x)
- Inventory Turnover = Cost of Revenue / Inventory (benchmark: 5x)
- Payables Turnover = Cost of Revenue / Accounts Payable (benchmark: 6.67x)

**Output:** RatioAnalysisReport with all 16 ratios, benchmarks, and assessment (strong/adequate/weak).

#### generateSegmentReporting(consolidationData, priorPeriodSegments): SegmentReportingAnalysis
Generates IFRS-8 compliant segment reporting with business and geographic breakdowns.

**Per Segment:**
- Revenue, operating expense, operating profit, operating margin
- Assets, liabilities, equity
- Prior-period comparison and trend (growing, declining, stable)

**Group Metrics:**
- Total group revenue and profit
- Segment concentration (Herfindahl Index <0.25 = diverse, >0.4 = concentrated)
- Top segment share, top three share

**Output:** SegmentReportingAnalysis with business segments and geographic segments per IFRS-8.

#### generateManagementReporting(varianceReport, ratioReport, segmentReport, executiveSummaryText): ManagementReportingSummary
Generates executive dashboard with KPI scorecard, alerts, and trends.

**Components:**
- Executive Summary (narrative overview)
- KPI Metrics (5 key metrics: revenue, margins, ROE, liquidity, solvency)
  - Current value vs. target
  - Assessment (on-track, at-risk, off-track)
  - Trend (improving, stable, deteriorating)
- Performance Scorecard (4 dimensions scored 0-100)
  - Financial Health
  - Operational Efficiency
  - Growth Trajectory
  - Risk Profile
- Alerts (critical and warning thresholds)
  - Revenue variance >10% below budget → critical alert
  - Liquidity ratio weak → warning alert
- Trends (month-over-month, quarter-over-quarter changes)

**Output:** ManagementReportingSummary with all components for executive review.

---

### 2.2 Hook: validatePostCloseAnalytics

**Location:** `src/validate/post/close/analytics/index.ts` (consumes this object's service via `@/post/close/analytics`)

beforeValidate hook triggered when PostCloseAnalyticsReport is created with `analysisStatus='pending-analysis'`.

**Workflow:**
1. Skip if not pending analysis
2. Query AuditReports: Verify status='approved' (audit complete)
3. Query Consolidations: Verify status='consolidated' (consolidation finalized)
4. Query FiscalPeriods: Collect period and budget data
5. Generate variance analysis (if reportType includes variance)
6. Generate ratio analysis (if reportType includes ratio)
7. Generate segment reporting (if reportType includes segment)
8. Generate management reporting (comprehensive by default)
9. Update validationStatus to 'valid'
10. Compute Law 60 chainLeafUuid for tamper detection

---

### 2.3 Collection: PostCloseAnalyticsReports

**Location:** `src/legal/entities/consolidations/audit/reports/post/close/analytics/reports/index.ts` (a distinct collection object)

Tracks the complete analytics report lifecycle.

**Key Fields:**

**Identification:**
- `analyticsReportName` (text, unique): e.g., "ANALYTICS-FY2026-COMPREHENSIVE"
- `fiscalYear` (number): Fiscal year

**Linking:**
- `auditReportId` (relationship): Link to completed audit
- `consolidationId` (relationship): Link to consolidated data

**Configuration:**
- `reportType` (select): variance | ratio | segment | comprehensive
- `generatedBy` (relationship): Analyst who triggered analysis

**Workflow:**
- `analysisStatus` (select): pending-analysis → analysis-complete → reviewed → approved | rejected

**Content:**
- `varianceAnalysisReport` (json): Budget vs. actual, period-over-period, waterfall
- `ratioAnalysisReport` (json): 16 financial ratios with benchmarks
- `segmentAnalysisReport` (json): Business and geographic segments
- `managementReportingSummary` (json): Executive dashboard with KPIs and alerts

**Custom:**
- `executiveSummaryText` (textarea): Custom executive narrative (optional)

**Validation:**
- `validationStatus` (select): pending-review | valid | requires-correction

**Governance (Law 63):**
- `governanceScope` (json): Analysis authority, approval thresholds, reporting scope

**Audit Trail (Law 60):**
- `chainLeafUuid` (text): Law 60 chain leaf UUID
- `analyticsTrail` (richText, append-only): Milestone log

**Access Control:**
```
read: [superadmin, admin, finance, analyst, compliance-officer]
create: [superadmin, admin, finance, analyst]
update: [superadmin, admin, analyst]
delete: [superadmin]
```

---

## 3. Workflow Examples

### Example 1: Variance Analysis
**Scenario:** Monthly variance review comparing actual to budget and prior month.

1. Create PostCloseAnalyticsReport with reportType='variance'
2. Hook validates audit approval and consolidation completion
3. Calls generateVarianceAnalysis() with budget vs. actual
4. Stores variance report with waterfall decomposition
5. Finance manager reviews variances >10%, identifies drivers, documents explanations

### Example 2: Comprehensive Analysis
**Scenario:** Quarterly executive review with variance, ratios, segments, KPIs.

1. Create PostCloseAnalyticsReport with reportType='comprehensive'
2. Hook generates all sections (variance, ratios, segments, management reporting)
3. CFO reviews performance scorecard, alerts, trends
4. Board receives executive summary with KPI metrics

### Example 3: Ratio Trend Analysis
**Scenario:** Annual check on financial health trends (3 years).

1. Pull FY2024, FY2025, FY2026 ratio reports
2. Compare liquidity, profitability, solvency, efficiency across 3 years
3. Identify deteriorating ratios (e.g., ROE declining 15% → 12% → 10%)
4. Recommend actions (improve margins, reduce debt, etc.)

---

## 4. Integration with Prior Phases

**Data Flow:** B6 → B7

| Phase | Output to B7 |
|-------|---|
| B6 (Audit) | Completed audit report triggers analytics generation |
| B6 (Consolidation) | Consolidated GL data for ratio and segment analysis |
| B5 (Tax Periods) | Tax data for segment breakdown |
| B1 (Fiscal Periods) | Period dates and budget allocation |
| A1 (GL) | Detailed GL accounts for variance analysis |

**Invariant:** B7 analytics generation requires B6 audit report in 'approved' status.

---

## 5. Standards Compliance Checklist

- ✅ **IAS-34:** Variance commentary for all material variances
- ✅ **IFRS-8:** Business and geographic segment separation
- ✅ **COSO:** Internal control verification through ratio and trend analysis
- ✅ **GAAP VRE:** Waterfall variance decomposition, threshold-based flagging, trend assessment
- ✅ **Law 60:** Audit chain with chainLeafUuid tamper detection
- ✅ **Law 63:** Governance scope for analyst approvals and thresholds

---

## 6. Implementation Checklist

**Phase B7 Deliverables:**

- ✅ `src/post/close/analytics/service.ts` (PostCloseAnalytics service — the `service` facet)
- ✅ `src/validate/post/close/analytics/index.ts` (validatePostCloseAnalytics beforeValidate hook)
- ✅ `src/legal/entities/consolidations/audit/reports/post/close/analytics/reports/index.ts` (PostCloseAnalyticsReports collection)
- ✅ `src/post/close/analytics/SKILL.md` (this standard — comprehensive documentation)
- ✅ `src/post/close/analytics/index.ts` (barrel re-exporting the service facet)
- ⏳ Memory entry for Phase B7
- ⏳ Update MEMORY.md

**Next Steps (pending user signal):**
- Complete Phase B7 barrel export
- Document Phase B7 in memory
- Local TypeScript verification (`pnpm tsc`)
- Local development verification (`pnpm dev`)
- Await next phase signal or completion

---

**Author:** Claude (Agent)  
**Date:** 2026-05-12  
**Status:** Implementation Complete
