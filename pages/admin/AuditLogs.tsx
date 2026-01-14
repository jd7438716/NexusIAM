import React, { useState } from 'react';
import { FileText, Search, X } from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../../services/mockData';
import { AuditLog } from '../../types';

export const AuditLogs = () => {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
          <p className="text-slate-500">Track all system activities and changes.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search by IP, Actor or Action..." 
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-3 font-semibold">Timestamp</th>
                        <th className="px-6 py-3 font-semibold">Actor</th>
                        <th className="px-6 py-3 font-semibold">Action</th>
                        <th className="px-6 py-3 font-semibold">IP Address</th>
                        <th className="px-6 py-3 font-semibold text-right">Details</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {MOCK_AUDIT_LOGS.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                            <td className="px-6 py-4 font-medium text-slate-900">{log.actor}</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium">
                                    {log.action}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 font-mono text-xs">{log.ip}</td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    onClick={() => setSelectedLog(log)}
                                    className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors"
                                >
                                    View Diff
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
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                    <div className="flex items-center gap-2">
                        <FileText size={18} className="text-slate-500" />
                        <h3 className="font-bold text-slate-900">Change Details: {selectedLog.action}</h3>
                    </div>
                    <button 
                        onClick={() => setSelectedLog(null)}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full p-1 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-0 grid grid-cols-2 divide-x divide-slate-200 h-80 overflow-y-auto font-mono text-xs">
                    <div className="p-4 bg-red-50/30">
                        <h4 className="text-red-600 font-bold mb-2 uppercase tracking-wider text-[10px]">Before</h4>
                        <pre className="whitespace-pre-wrap text-slate-700">{selectedLog.details.before}</pre>
                    </div>
                    <div className="p-4 bg-green-50/30">
                        <h4 className="text-green-600 font-bold mb-2 uppercase tracking-wider text-[10px]">After</h4>
                        <pre className="whitespace-pre-wrap text-slate-700">{selectedLog.details.after}</pre>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-200 bg-slate-50 text-right">
                    <button 
                        onClick={() => setSelectedLog(null)}
                        className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
