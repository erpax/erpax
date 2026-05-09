import React from 'react';

interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: string;
  onNavigate: (page: any) => void;
  userRole: 'admin' | 'accountant' | 'auditor' | 'readonly';
  userName: string;
}

const Navigation: React.FC<NavigationProps> = ({
  isOpen,
  onToggle,
  currentPage,
  onNavigate,
  userRole,
  userName,
}) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      visible: true,
    },
    {
      id: 'invoices',
      label: 'Sales Invoices',
      icon: '📄',
      visible: userRole === 'admin' || userRole === 'accountant',
    },
    {
      id: 'bills',
      label: 'Vendor Bills',
      icon: '📋',
      visible: userRole === 'admin' || userRole === 'accountant',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📉',
      visible: true,
    },
    {
      id: 'reports',
      label: 'Financial Reports',
      icon: '📈',
      visible: true,
    },
    {
      id: 'reconciliation',
      label: 'Bank Reconciliation',
      icon: '🏦',
      visible: userRole === 'admin' || userRole === 'accountant',
    },
    {
      id: 'closing',
      label: 'Period Closing',
      icon: '🔒',
      visible: userRole === 'admin' || userRole === 'accountant',
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      icon: '📝',
      visible: userRole === 'admin' || userRole === 'auditor',
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <nav
        className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          {isOpen && <span className="font-bold">ERPAX</span>}
          <button
            onClick={onToggle}
            className="hover:bg-gray-800 rounded p-1 transition-colors"
          >
            {isOpen ? '←' : '→'}
          </button>
        </div>

        {/* User Info */}
        {isOpen && (
          <div className="p-4 border-b border-gray-800 bg-gray-800">
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="text-sm font-semibold truncate">{userName}</p>
            <p className="text-xs text-blue-300 mt-1">
              {userRole === 'admin' ? '👑 Administrator' :
               userRole === 'accountant' ? '💼 Accountant' :
               userRole === 'auditor' ? '🔍 Auditor' : '👁️ Read-Only'}
            </p>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {menuItems
            .filter((item) => item.visible)
            .map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-600 border-l-4 border-blue-400'
                    : 'hover:bg-gray-800'
                }`}
                title={item.label}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="text-sm">{item.label}</span>}
              </button>
            ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-4">
          {isOpen && (
            <button className="w-full text-left text-xs text-gray-400 hover:text-gray-300 transition-colors">
              Settings
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
