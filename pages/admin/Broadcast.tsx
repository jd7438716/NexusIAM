import React, { useState } from 'react';
import { Megaphone, Send, AlertTriangle, Info, CheckCircle2, History } from 'lucide-react';
import { simulateDelay } from '../../services/mockData';

interface BroadcastMsg {
    id: string;
    title: string;
    message: string;
    level: 'INFO' | 'WARNING' | 'CRITICAL';
    date: string;
    sentBy: string;
}

export const Broadcast: React.FC = () => {
  const [history, setHistory] = useState<BroadcastMsg[]>([
    { id: 'b-1', title: 'System Maintenance', message: 'The system will be down for upgrades on Sunday.', level: 'WARNING', date: '2023-10-20 10:00', sentBy: 'admin' },
    { id: 'b-2', title: 'New Feature: Wallet', message: 'You can now manage your assets in the Wallet tab.', level: 'INFO', date: '2023-10-15 09:30', sentBy: 'alex_admin' }
  ]);
  
  const [formData, setFormData] = useState({ title: '', message: '', level: 'INFO' });
  const [sending, setSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await simulateDelay(1200);
    const newMsg: BroadcastMsg = {
        id: `b-${Date.now()}`,
        title: formData.title,
        message: formData.message,
        level: formData.level as any,
        date: new Date().toLocaleString(),
        sentBy: 'you'
    };
    setHistory([newMsg, ...history]);
    setFormData({ title: '', message: '', level: 'INFO' });
    setSending(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Broadcast</h1>
        <p className="text-slate-500">Publish global announcements to all tenants and users.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Compose Form */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Megaphone size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900">Compose Announcement</h3>
                </div>
                
                <form onSubmit={handleSend} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                        <input 
                            type="text" 
                            required
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g., Scheduled Maintenance"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Priority Level</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="level" 
                                    value="INFO" 
                                    checked={formData.level === 'INFO'}
                                    onChange={e => setFormData({...formData, level: e.target.value})}
                                    className="text-blue-600 focus:ring-blue-500" 
                                />
                                <span className="text-sm text-slate-700 bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">Info</span>
                            </label>
                             <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="level" 
                                    value="WARNING" 
                                    checked={formData.level === 'WARNING'}
                                    onChange={e => setFormData({...formData, level: e.target.value})}
                                    className="text-orange-600 focus:ring-orange-500" 
                                />
                                <span className="text-sm text-slate-700 bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-100">Warning</span>
                            </label>
                             <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="level" 
                                    value="CRITICAL" 
                                    checked={formData.level === 'CRITICAL'}
                                    onChange={e => setFormData({...formData, level: e.target.value})}
                                    className="text-red-600 focus:ring-red-500" 
                                />
                                <span className="text-sm text-slate-700 bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-100">Critical</span>
                            </label>
                        </div>
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Message Content</label>
                         <textarea 
                            required
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
                            placeholder="Type your announcement here..."
                         ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            type="submit" 
                            disabled={sending}
                            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium disabled:opacity-70"
                        >
                            {sending ? 'Publishing...' : <><Send size={18} /> Publish Broadcast</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        {/* History Sidebar */}
        <div className="lg:col-span-1">
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full max-h-[600px] flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                    <History size={18} className="text-slate-500" />
                    <h3 className="font-bold text-slate-800 text-sm">Recent Broadcasts</h3>
                </div>
                <div className="overflow-y-auto p-4 space-y-4 flex-1">
                    {history.map(item => (
                        <div key={item.id} className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold uppercase ${
                                    item.level === 'INFO' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                    item.level === 'WARNING' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                    'bg-red-50 text-red-700 border-red-100'
                                }`}>
                                    {item.level}
                                </span>
                                <span className="text-xs text-slate-400">{item.date}</span>
                            </div>
                            <h4 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-slate-600 line-clamp-2">{item.message}</p>
                            <div className="mt-2 text-[10px] text-slate-400 text-right">Sent by {item.sentBy}</div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};
