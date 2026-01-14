import React, { useState } from 'react';
import { FileText, Search, X } from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../../services/mockData';
import { AuditLog } from '../../types';
import { usePreferences } from '../../contexts/PreferencesContext';

export const AuditLogs = () => {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const { t } = usePreferences();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('audit.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('audit.subtitle')}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder={t('audit.search')} 
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
                />
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th className="px-6 py-3 font-semibold">{t('audit.timestamp')}</th>
                        <th className="px-6 py-3 font-semibold">{t('audit.actor')}</th>
                        <th className="px-6 py-3 font-semibold">{t('audit.action')}</th>
                        <th className="px-6 py-3 font-semibold">{t('audit.ip')}</th>
                        <th className="px-6 py-3 font-semibold text-right">{t('audit.details')}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {MOCK_AUDIT_LOGS.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{log.actor}</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium">
                                    {log.action}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">{log.ip}</td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    onClick={() => setSelectedLog(log)}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs border border-blue-200 dark:border-blue-800 hover:border-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-3 py-1 rounded transition-colors"
                                >
                                    {t('audit.view_diff')}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Diff Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-2">
                        <FileText size={18} className="text-slate-500 dark:text-slate-400" />
                        <h3 className="font-bold text-slate-900 dark:text-white">{t('audit.change_details')}: {selectedLog.action}</h3>
                    </div>
                    <button 
                        onClick={() => setSelectedLog(null)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-1 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-0 grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700 h-80 overflow-y-auto font-mono text-xs">
                    <div className="p-4 bg-red-50/30 dark:bg-red-900/10">
                        <h4 className="text-red-600 dark:text-red-400 font-bold mb-2 uppercase tracking-wider text-[10px]">{t('audit.before')}</h4>
                        <pre className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{selectedLog.details.before}</pre>
                    </div>
                    <div className="p-4 bg-green-50/30 dark:bg-green-900/10">
                        <h4 className="text-green-600 dark:text-green-400 font-bold mb-2 uppercase tracking-wider text-[10px]">{t('audit.after')}</h4>
                        <pre className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{selectedLog.details.after}</pre>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-right">
                    <button 
                        onClick={() => setSelectedLog(null)}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors"
                    >
                        {t('common.close')}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
