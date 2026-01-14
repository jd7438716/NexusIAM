import React, { useState } from 'react';
import { Ticket, Copy, RefreshCw, UserCheck, Clock, XCircle, Plus } from 'lucide-react';
import { MOCK_INVITES, simulateDelay } from '../../services/mockData';

export const Invitations: React.FC = () => {
  const [invites, setInvites] = useState(MOCK_INVITES);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    await simulateDelay(1000);
    const newCode = `NEXUS-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newInvite = {
        id: `inv-${Date.now()}`,
        code: newCode,
        status: 'ACTIVE',
        usedBy: null,
        date: new Date().toISOString().split('T')[0]
    };
    setInvites([newInvite, ...invites]);
    setGenerating(false);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Copied ${code} to clipboard!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invitations</h1>
          <p className="text-slate-500">Manage your invite codes and earn rewards.</p>
        </div>
        <button 
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium disabled:opacity-70"
        >
            {generating ? 'Generating...' : <><Plus size={18} /> Generate Code</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-lg">
                      <UserCheck size={20} />
                  </div>
                  <span className="font-medium opacity-90">Successful Invites</span>
              </div>
              <h3 className="text-3xl font-bold">12</h3>
              <p className="text-sm opacity-70 mt-1">+2 this week</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                      <Ticket size={20} />
                  </div>
                  <span className="font-medium text-slate-600">Active Codes</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900">{invites.filter(i => i.status === 'ACTIVE').length}</h3>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                      <Clock size={20} />
                  </div>
                  <span className="font-medium text-slate-600">Reward Pending</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900">$45.00</h3>
          </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-bold text-slate-900">Invitation History</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-3 font-semibold">Code</th>
                        <th className="px-6 py-3 font-semibold">Status</th>
                        <th className="px-6 py-3 font-semibold">Used By</th>
                        <th className="px-6 py-3 font-semibold">Created Date</th>
                        <th className="px-6 py-3 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {invites.map((invite) => (
                        <tr key={invite.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-mono font-medium text-slate-900">{invite.code}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    invite.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                    invite.status === 'USED' ? 'bg-blue-100 text-blue-800' :
                                    'bg-slate-100 text-slate-800'
                                }`}>
                                    {invite.status === 'ACTIVE' && <Ticket size={12} />}
                                    {invite.status === 'USED' && <UserCheck size={12} />}
                                    {invite.status === 'EXPIRED' && <XCircle size={12} />}
                                    {invite.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500">
                                {invite.usedBy ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                            {invite.usedBy[0].toUpperCase()}
                                        </div>
                                        {invite.usedBy}
                                    </div>
                                ) : '-'}
                            </td>
                            <td className="px-6 py-4 text-slate-500">{invite.date}</td>
                            <td className="px-6 py-4 text-right">
                                {invite.status === 'ACTIVE' && (
                                    <button 
                                        onClick={() => copyToClipboard(invite.code)}
                                        className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center gap-1 justify-end ml-auto"
                                    >
                                        <Copy size={14} /> Copy
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
