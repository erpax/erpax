import React, { useState, useEffect, useCallback } from 'react';
import { AccountingClient } from '@/sdk/accounting-client';
import { FinancialAnalysisEngine } from '@/services/accounting/financial-analysis';

/**
 * Trend / forecast card — historical line + 3-month projection.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard ISO-8601-1:2019 date-time period
 * @audit ISO-19011:2018 audit-trail trend-analysis
 * @quality ISO-25010 functional-suitability historical-projection
 * @see docs/STANDARDS.md §4.2
 */


interface TrendAnalysisCardProps {
  client: AccountingClient;
  dateRange: {
    start: string;
    end: string;
  };
}

function getTrendIcon(trendType: string) {
  switch (trendType) {
    case 'increasing':
      return '📈';
    case 'decreasing':
      return '📉';
    case 'stable':
      return '➡️';
    default:
      return '—';
  }
}

interface TrendData {
  trend: string;
  trendStrength: number;
  forecast?: number[];
}

function TrendRow({ label, data }: { label: string; data: TrendData }) {
  return (
    <div className="border-b border-gray-100 last:border-b-0 py-3">
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold text-gray-900">{label}</span>
        <span className="text-lg">{getTrendIcon(data.trend)}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 capitalize">{data.trend} trend</span>
        <span className="text-gray-700 font-semibold">
          Strength: {(data.trendStrength * 100).toFixed(0)}%
        </span>
      </div>
      {data.forecast && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
          <p className="text-gray-600">3-Month Forecast: </p>
          <p className="font-semibold text-gray-900">
            {data.forecast.map((f: number) => f.toFixed(0)).join(' → ')}
          </p>
        </div>
      )}
    </div>
  );
}

const TrendAnalysisCard: React.FC<TrendAnalysisCardProps> = ({ client: _client, dateRange }) => {
  const [trend, setTrend] = useState<{
    revenue: TrendData;
    netIncome: TrendData;
    margin: TrendData;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTrendData = useCallback(async () => {
    try {
      setLoading(true);

      // For demo purposes, use mock historical data
      // In production, this would fetch actual historical data
      const mockData = {
        revenue: [50000, 52000, 55000, 53000, 56000, 58000],
        netIncome: [8000, 8500, 9200, 8800, 9500, 10000],
        netMargin: [16, 16.3, 16.7, 16.6, 17, 17.2],
      };

      const engine = new FinancialAnalysisEngine();
      const revenueTrend = engine.calculateTrend(
        'Revenue',
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        mockData.revenue
      );

      setTrend({
        revenue: revenueTrend,
        netIncome: engine.calculateTrend(
          'Net Income',
          ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          mockData.netIncome
        ),
        margin: engine.calculateTrend(
          'Net Margin %',
          ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          mockData.netMargin
        ),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrendData();
  }, [dateRange, loadTrendData]);

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6 border border-gray-200">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Analysis</h3>

      {trend && (
        <div className="space-y-2">
          <TrendRow label="Revenue" data={trend.revenue} />
          <TrendRow label="Net Income" data={trend.netIncome} />
          <TrendRow label="Net Margin %" data={trend.margin} />
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-2">Key Observations</p>
        <ul className="space-y-1 text-sm">
          {trend?.revenue.trend === 'increasing' && (
            <li className="text-green-700">✓ Revenue showing upward trend</li>
          )}
          {trend?.margin.trend === 'increasing' && (
            <li className="text-green-700">✓ Profit margins improving</li>
          )}
          {trend?.netIncome.trend === 'stable' && (
            <li className="text-blue-700">→ Earnings stable</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TrendAnalysisCard;
