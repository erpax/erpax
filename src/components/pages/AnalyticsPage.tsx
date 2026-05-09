import React, { useState, useEffect, useCallback } from 'react';
import { AccountingClient } from '../../sdk/accounting-client';
import KPIDashboard from '../analytics/KPIDashboard';
import FinancialRatiosCard from '../analytics/FinancialRatiosCard';
import BudgetVsActualCard from '../analytics/BudgetVsActualCard';
import TrendAnalysisCard from '../analytics/TrendAnalysisCard';
import CostAnalysisCard from '../analytics/CostAnalysisCard';

interface AnalyticsPageProps {
  client: AccountingClient;
  userRole: string;
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ client, userRole: _userRole }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const loadAnalyticsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all necessary data for analysis
      const [bs, is] = await Promise.all([
        client.getBalanceSheet(selectedDate),
        client.getIncomeStatement(dateRange.start, dateRange.end),
      ]);

      if (bs.success && is.success) {
        setData({
          balanceSheet: bs.data,
          incomeStatement: is.data,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, [client, selectedDate, dateRange]);

  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Financial Analytics & Insights
        </h1>

        {/* Date Controls */}
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              As Of Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period Start
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period End
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={loadAnalyticsData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      ) : data ? (
        <>
          {/* KPI Dashboard */}
          <KPIDashboard data={data} />

          {/* Two-column layout for detailed analysis */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {/* Financial Ratios */}
            <FinancialRatiosCard data={data} />

            {/* Trend Analysis */}
            <TrendAnalysisCard client={client} dateRange={dateRange} />

            {/* Budget vs Actual */}
            <BudgetVsActualCard data={data} />

            {/* Cost Analysis */}
            <CostAnalysisCard data={data} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AnalyticsPage;
