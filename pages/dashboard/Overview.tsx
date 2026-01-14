import React from 'react';
import { Wallet, FolderOpen, Bell, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { User, Transaction, NotificationItem } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePreferences } from '../../contexts/PreferencesContext';

interface OverviewProps {
  user: User | null;
  transactions: Transaction[];
  notifications: NotificationItem[];
}

export const Overview: React.FC<OverviewProps> = ({ user, transactions, notifications }) => {
  const { t } = usePreferences();
  
  const data = [
    { name: 'Mon', income: 4000, expense: 2400 },
    { name: 'Tue', income: 3000, expense: 1398 },
    { name: 'Wed', income: 2000, expense: 9800 },
    { name: 'Thu', income: 2780, expense: 3908 },
    { name: 'Fri', income: 1890, expense: 4800 },
    { name: 'Sat', income: 2390, expense: 3800 },
    { name: 'Sun', income: 3490, expense: 4300 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('nav.dashboard')}</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('overview.welcome', { name: user?.username || 'User' })}. {t('overview.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            {t('overview.download_report')}
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
            {t('overview.add_funds')}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
              <Wallet size={20} />
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full">
              <ArrowUpRight size={12} className="mr-1" /> +12.5%
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t('overview.total_balance')}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$12,450.00</h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
              <FolderOpen size={20} />
            </div>
            <span className="text-xs text-slate-400">12GB Used</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t('overview.cloud_storage')}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1,240 Files</h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center">
              <Bell size={20} />
            </div>
            <span className="text-xs text-slate-400">{t('overview.view_all')}</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t('overview.notifications')}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{notifications.filter(n => !n.read).length} {t('overview.unread')}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">{t('overview.cash_flow')}</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--grid-color, #f1f5f9)" className="stroke-slate-100 dark:stroke-slate-700" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="income" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="expense" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">{t('overview.recent_tx')}</h3>
          <div className="space-y-4">
            {transactions.slice(0, 4).map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === 'DEPOSIT' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {tx.type === 'DEPOSIT' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white capitalize">{tx.type.toLowerCase()}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{tx.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${
                    tx.type === 'DEPOSIT' ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-slate-200'
                }`}>
                  {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amount.toFixed(2)}
                </span>
              </div>
            ))}
            <button className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors mt-2">
              {t('overview.view_all')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
