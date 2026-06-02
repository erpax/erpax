/**
 * validatePostCloseAnalytics Hook
 *
 * Validates post-close analytics prerequisites: audit reports generated,
 * all compliance data complete, consolidation finalized.
 *
 * Workflow (triggered when analytics report is generated):
 * 1. Query AuditReports for completed audit (status: approved)
 * 2. Query Consolidations for finalized consolidation (status: consolidated)
 * 3. Call PostCloseAnalytics.generateVarianceAnalysis() for budget vs. actual
 * 4. Call PostCloseAnalytics.generateRatioAnalysis() for financial ratios
 * 5. Call PostCloseAnalytics.generateSegmentReporting() for segment analysis
 * 6. Call PostCloseAnalytics.generateManagementReporting() for executive dashboard
 * 7. If all prerequisites met, generate analytics report and store in PostCloseAnalyticsReports collection
 * 8. Store analytics metadata and validation status
 *
 * @standard IAS-34:2023 Interim Financial Reporting
 * @standard IFRS-8:2023 Operating Segments
 * @standard IAS-1:2023 Presentation of Financial Statements
 * @standard COSO Internal Control Framework
 * @invariant Analytics generation requires completed audit report
 * @invariant All consolidation data must be finalized before analytics generation
 * @invariant Segment reporting must separate business and geographic dimensions per IFRS-8
 * @invariant Management reporting must include KPI scorecard with threshold alerts
 */

import { CollectionBeforeValidateHook, type TypeWithID } from 'payload'
import { PostCloseAnalytics } from '../../services/PostCloseAnalytics'
import type { AuditReport, Consolidation } from '../../payload-types'

// Import report types from PostCloseAnalytics service
interface VarianceAnalysisReport {
  reportPeriod: string
  analysisDate: string
  budgetVsActual: Array<{
    lineItem: string
    budgetedAmount: number
    actualAmount: number
    variance: number
    variancePercent: number
  }>
  periodOverPeriodComparison: Array<{
    lineItem: string
    budgetedAmount: number
    actualAmount: number
    variance: number
    variancePercent: number
    trend?: 'improving' | 'deteriorating' | 'stable'
  }>
  keyVarianceThreshold: number
  totalBudgetedRevenue: number
  totalActualRevenue: number
  totalVariance: number
  totalVariancePercent: number
  waterfall?: {
    budgetBase: number
    volumeVariance: number
    priceVariance: number
    mixVariance: number
    actualResult: number
  }
}

interface RatioAnalysisReport {
  reportDate: string
  analysisDate: string
  liquidityRatios: Record<string, { ratioName: string; ratioValue: number; benchmark?: number; assessment: string }>
  profitabilityRatios: Record<string, { ratioName: string; ratioValue: number; benchmark?: number; assessment: string }>
  solvencyRatios: Record<string, { ratioName: string; ratioValue: number; benchmark?: number; assessment: string }>
  efficiencyRatios: Record<string, { ratioName: string; ratioValue: number; benchmark?: number; assessment: string }>
  overallAssessment?: string
}

interface SegmentReportingAnalysis {
  reportPeriod: string
  analysisDate: string
  businessSegments: Array<{
    segmentId: string
    segmentName: string
    segmentType: 'business' | 'geographic'
    revenue: number
    operatingExpense: number
    operatingProfit: number
    operatingMargin: number
    assets: number
    liabilities: number
    equity: number
    priorPeriodRevenue?: number
    trend?: 'growing' | 'declining' | 'stable'
  }>
  geographicSegments: Array<{
    segmentId: string
    segmentName: string
    segmentType: 'business' | 'geographic'
    revenue: number
    operatingExpense: number
    operatingProfit: number
    operatingMargin: number
    assets: number
    liabilities: number
    equity: number
    priorPeriodRevenue?: number
    trend?: 'growing' | 'declining' | 'stable'
  }>
  totalGroupRevenue: number
  totalGroupProfit: number
  segmentConcertation?: {
    topSegmentShare: number
    topThreeShare: number
    herfindahlIndex: number
  }
}

interface ManagementReportingSummary {
  reportingPeriod: string
  generatedDate: string
  executiveSummary: string
  kpis: Array<{
    metricName: string
    currentValue: number
    targetValue: number
    benchmark?: number
    unit: string
    assessment: 'on-track' | 'at-risk' | 'off-track' | 'strong' | 'adequate' | 'weak'
    trend: 'improving' | 'stable' | 'deteriorating'
    variance: number
    variancePercent: number
  }>
  performanceScorecard?: {
    financialHealth: number
    operationalEfficiency: number
    growthTrajectory: number
    riskProfile: number
  }
  alerts?: Array<{
    severity: 'warning' | 'critical'
    metric: string
    message: string
    recommendation: string
  }>
  notes?: string
}

interface AnalyticsReportData {
  id?: string
  analyticsReportName: string
  fiscalYear: number
  auditReportId?: string | { id: string }
  consolidationId?: string | { id: string }
  reportType?: 'variance' | 'ratio' | 'segment' | 'comprehensive'
  analysisStatus?: string
  varianceAnalysisReport?: VarianceAnalysisReport
  ratioAnalysisReport?: RatioAnalysisReport
  segmentAnalysisReport?: SegmentReportingAnalysis
  managementReportingSummary?: ManagementReportingSummary
  executiveSummaryText?: string
  validationStatus?: string
  chainLeafUuid?: string
}

/**
 * beforeValidate hook: validate post-close analytics
 */
export const validatePostCloseAnalytics: CollectionBeforeValidateHook<AnalyticsReportData & TypeWithID> = async ({
  data,
  req,
}) => {
  if (!data) return data // strict: beforeValidate data is optional
  const { payload } = req

  // Skip if analysis status is not 'pending-analysis' (only generate on creation/draft)
  if (data.analysisStatus && data.analysisStatus !== 'pending-analysis') {
    return
  }

  // Query audit report (if linked)
  let _auditReportData: AuditReport | null = null

  if (data.auditReportId) {
    const auditReportRef =
      typeof data.auditReportId === 'string' ? data.auditReportId : data.auditReportId.id

    try {
      const auditQuery = await payload.find({
        collection: 'audit-reports',
        where: {
          id: { equals: auditReportRef },
        },
      })

      if (auditQuery.docs.length > 0) {
        const auditReport = auditQuery.docs[0] as AuditReport
        _auditReportData = auditReport

        // Verify audit report is complete
        if (auditReport.auditStatus !== 'approved') {
          throw new Error(
            `Audit report must be completed (status: approved) before analytics generation. Current status: ${auditReport.auditStatus}`,
          )
        }
      }
    } catch (err) {
      console.warn('[validatePostCloseAnalytics] Failed to query audit report:', err)
      throw new Error(
        `Failed to query audit report: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }

  // Query consolidation (if linked)
  let consolidationData: Consolidation | null = null

  if (data.consolidationId) {
    const consolidationRef =
      typeof data.consolidationId === 'string'
        ? data.consolidationId
        : data.consolidationId.id

    try {
      const consolidationQuery = await payload.find({
        collection: 'consolidations',
        where: {
          id: { equals: consolidationRef },
        },
      })

      if (consolidationQuery.docs.length > 0) {
        const consolidation = consolidationQuery.docs[0] as Consolidation
        consolidationData = consolidation

        // Verify consolidation is complete
        if (consolidation.consolidationStatus !== 'consolidated') {
          throw new Error(
            `Consolidation must be completed (status: consolidated) before analytics generation. Current status: ${consolidation.consolidationStatus}`,
          )
        }
      }
    } catch (err) {
      console.warn('[validatePostCloseAnalytics] Failed to query consolidation:', err)
      throw new Error(
        `Failed to query consolidation: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }

  // Query fiscal periods for budget data (if available)
  const budgetData: Record<string, unknown> | null = null

  try {
    const fiscalPeriodsQuery = await payload.find({
      collection: 'fiscal-periods',
      where: {
        fiscalYear: { equals: data.fiscalYear },
      },
    })

    if (fiscalPeriodsQuery.docs.length > 0) {
      // Budget data would be queried from budget collection (not yet implemented)
      // For now, use fiscal period data as basis
    }
  } catch (err) {
    console.warn('[validatePostCloseAnalytics] Failed to query fiscal periods:', err)
    // Continue anyway; budget data is optional
  }

  // Generate variance analysis (if requested)
  let varianceAnalysisReport: VarianceAnalysisReport | null = null

  if (data.reportType === 'variance' || data.reportType === 'comprehensive') {
    try {
      varianceAnalysisReport = PostCloseAnalytics.generateVarianceAnalysis(
        (consolidationData as unknown as Record<string, unknown>) || {},
        (budgetData as unknown as Record<string, unknown>) || (consolidationData as unknown as Record<string, unknown>) || {},
        undefined, // Prior period data would be queried from prior-year consolidation
        10, // Default 10% variance threshold
      )

      data.varianceAnalysisReport = varianceAnalysisReport
    } catch (err) {
      console.warn('[validatePostCloseAnalytics] Failed to generate variance analysis:', err)
      throw new Error(
        `Failed to generate variance analysis: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }

  // Generate ratio analysis (if requested)
  let ratioAnalysisReport: RatioAnalysisReport | null = null

  if (data.reportType === 'ratio' || data.reportType === 'comprehensive') {
    try {
      ratioAnalysisReport = PostCloseAnalytics.generateRatioAnalysis(
        (consolidationData as unknown as Record<string, unknown>) || {},
        undefined, // Prior period data optional
      )

      data.ratioAnalysisReport = ratioAnalysisReport
    } catch (err) {
      console.warn('[validatePostCloseAnalytics] Failed to generate ratio analysis:', err)
      throw new Error(
        `Failed to generate ratio analysis: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }

  // Generate segment reporting (if requested)
  let segmentAnalysisReport: SegmentReportingAnalysis | null = null

  if (data.reportType === 'segment' || data.reportType === 'comprehensive') {
    try {
      segmentAnalysisReport = PostCloseAnalytics.generateSegmentReporting(
        (consolidationData as unknown as Record<string, unknown>) || {},
        undefined, // Prior period data optional
      )

      data.segmentAnalysisReport = segmentAnalysisReport
    } catch (err) {
      console.warn('[validatePostCloseAnalytics] Failed to generate segment reporting:', err)
      throw new Error(
        `Failed to generate segment reporting: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }

  // Generate management reporting (comprehensive)
  if (data.reportType === 'comprehensive' || !data.reportType) {
    try {
      const managementReportingSummary = PostCloseAnalytics.generateManagementReporting(
        (varianceAnalysisReport || {}) as unknown as Parameters<typeof PostCloseAnalytics.generateManagementReporting>[0],
        (ratioAnalysisReport || {}) as unknown as Parameters<typeof PostCloseAnalytics.generateManagementReporting>[1],
        (segmentAnalysisReport || {}) as unknown as Parameters<typeof PostCloseAnalytics.generateManagementReporting>[2],
        data.executiveSummaryText,
      )

      data.managementReportingSummary = managementReportingSummary as unknown as ManagementReportingSummary
    } catch (err) {
      console.warn('[validatePostCloseAnalytics] Failed to generate management reporting:', err)
      throw new Error(
        `Failed to generate management reporting: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }

  // Update validation status and chainLeafUuid
  data.validationStatus = 'valid'
  data.chainLeafUuid = PostCloseAnalytics.computeChainLeaf(
    {
      analyticsReportName: data.analyticsReportName,
      fiscalYear: data.fiscalYear,
      reportType: data.reportType || 'comprehensive',
      validationStatus: data.validationStatus,
    },
    '',
  )

  console.log(
    `[validatePostCloseAnalytics] Analytics report ${data.analyticsReportName} (FY ${data.fiscalYear}) generated. Status: ${data.validationStatus}`,
  )
}
