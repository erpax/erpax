import React, { useState } from 'react';
import { AccountingClient } from '@/sdk/accounting-client';
import Dashboard from '@/components/Dashboard';
import Navigation from '@/components/Navigation';
import AnalyticsPage from '@/page/AnalyticsPage';

interface AppProps {
  tenantId: string;
  token: string;
  tenantName: string;
  userName: string;
  userRole: 'admin' | 'accountant' | 'auditor' | 'readonly';
  apiBaseUrl?: string;
}

type PageType = 'dashboard' | 'invoices' | 'bills' | 'analytics' | 'reports' | 'reconciliation' | 'closing' | 'audit';

const App: React.FC<AppProps> = ({
  tenantId,
  token,
  tenantName,
  userName,
  userRole,
  apiBaseUrl = 'http://localhost:3000',
}) => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const client = new AccountingClient({
    tenantId,
    token,
    baseUrl: apiBaseUrl,
  });

  const getPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            client={client}
            userRole={userRole}
            tenantName={tenantName}
          />
        );
      case 'invoices':
        return <InvoicesPage client={client} userRole={userRole} />;
      case 'bills':
        return <BillsPage client={client} userRole={userRole} />;
      case 'analytics':
        return <AnalyticsPage client={client} userRole={userRole} />;
      case 'reports':
        return <ReportsPage client={client} />;
      case 'reconciliation':
        return <ReconciliationPage client={client} />;
      case 'closing':
        return <ClosingPage client={client} />;
      case 'audit':
        return <AuditPage client={client} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Navigation
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page as PageType)}
        userRole={userRole}
        userName={userName}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              ERPAX Accounting System
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{userName}</span>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                {userRole.toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{getPageContent()}</main>
      </div>
    </div>
  );
};

// Placeholder page components
const InvoicesPage: React.FC<{ client: AccountingClient; userRole: string }> = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Sales Invoices</h2>
    <p className="text-gray-600">Sales invoices page coming soon...</p>
  </div>
);

const BillsPage: React.FC<{ client: AccountingClient; userRole: string }> = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Vendor Bills</h2>
    <p className="text-gray-600">Vendor bills page coming soon...</p>
  </div>
);

const ReportsPage: React.FC<{ client: AccountingClient }> = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Financial Reports</h2>
    <p className="text-gray-600">Financial reports page coming soon...</p>
  </div>
);

const ReconciliationPage: React.FC<{ client: AccountingClient }> = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Bank Reconciliation</h2>
    <p className="text-gray-600">Bank reconciliation page coming soon...</p>
  </div>
);

const ClosingPage: React.FC<{ client: AccountingClient }> = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Period Closing</h2>
    <p className="text-gray-600">Period closing page coming soon...</p>
  </div>
);

const AuditPage: React.FC<{ client: AccountingClient }> = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Audit Trail</h2>
    <p className="text-gray-600">Audit trail page coming soon...</p>
  </div>
);

export default App;
