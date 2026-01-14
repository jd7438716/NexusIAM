import React, { useState } from 'react';
import { Shield, Key, Smartphone, Monitor, Globe, LogOut, CheckCircle2, AlertTriangle, Copy } from 'lucide-react';
import { User, Session } from '../../types';
import { MOCK_SESSIONS, simulateDelay } from '../../services/mockData';
import { Modal } from '../../components/Modal';
import { usePreferences } from '../../contexts/PreferencesContext';

export const Security: React.FC<{ user: User | null }> = ({ user }) => {
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
  const [mfaEnabled, setMfaEnabled] = useState(user?.mfaEnabled || false);
  const [loadingMfa, setLoadingMfa] = useState(false);
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);
  const { t } = usePreferences();

  const toggleMfa = async () => {
    setLoadingMfa(true);
    await simulateDelay();
    setMfaEnabled(!mfaEnabled);
    setLoadingMfa(false);
  };

  const terminateSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  // Mock Recovery Codes
  const recoveryCodes = [
    'XJ92-KLD1', 'MN23-PPO9', 'QW12-SSA1', 'LK99-JJ22',
    'PO00-11KK', 'ZA22-MMN1', 'BB11-99LL', 'CC33-OO22'
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('security.title')}</h1>
        <p className="text-slate-500 dark:text-slate-400">{t('security.subtitle')}</p>
      </div>

      {/* MFA Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className={`p-3 rounded-lg ${mfaEnabled ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('security.mfa')}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-md">
                  {t('security.mfa_desc')}
                </p>
                <div className="flex items-center gap-2 mt-3">
                    {mfaEnabled ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                            <CheckCircle2 size={12} /> {t('security.enabled')}
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
                            <AlertTriangle size={12} /> {t('security.disabled')}
                        </span>
                    )}
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={mfaEnabled} 
                onChange={toggleMfa} 
                disabled={loadingMfa}
              />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        {mfaEnabled && (
           <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
               <span className="text-sm text-slate-600 dark:text-slate-400">Recovery codes are available.</span>
               <button 
                  onClick={() => setShowRecoveryCodes(true)}
                  className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
               >
                 {t('security.view_codes')}
               </button>
           </div>
        )}
      </div>

      {/* Password Change */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <Key size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('security.change_pw')}</h3>
        </div>
        <form className="space-y-4 max-w-md">
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('security.current_pw')}</label>
                    <input type="password" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-900 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('security.new_pw')}</label>
                    <input type="password" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-900 dark:text-white" />
                </div>
            </div>
            <div className="flex justify-end">
                <button type="button" className="px-4 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
                    {t('security.update_pw')}
                </button>
            </div>
        </form>
      </div>

      {/* Active Sessions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                    <Monitor size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('security.sessions')}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('security.subtitle')}</p>
                </div>
            </div>
            <button className="text-sm text-red-600 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors">
                {t('security.logout_all')}
            </button>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {sessions.map(session => (
                <div key={session.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                            {session.device.toLowerCase().includes('phone') ? <Smartphone size={20} /> : <Monitor size={20} />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-medium text-slate-900 dark:text-white">{session.device}</p>
                                {session.current && (
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full tracking-wide">Current</span>
                                )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                                <span className="flex items-center gap-1"><Globe size={12} /> {session.location}</span>
                                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
                                <span>{session.ip}</span>
                                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
                                <span>Active: {session.lastActive}</span>
                            </div>
                        </div>
                    </div>
                    {!session.current && (
                        <button 
                            onClick={() => terminateSession(session.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            title={t('security.revoke')}
                        >
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* Recovery Codes Modal */}
      <Modal isOpen={showRecoveryCodes} onClose={() => setShowRecoveryCodes(false)} title="Recovery Codes">
        <div className="space-y-4">
           <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-900/50 flex gap-3 text-yellow-800 dark:text-yellow-400 text-sm">
               <AlertTriangle className="shrink-0" size={20} />
               <p>{t('security.recovery_warn')}</p>
           </div>
           <div className="grid grid-cols-2 gap-3">
               {recoveryCodes.map((code, idx) => (
                   <div key={idx} className="bg-slate-100 dark:bg-slate-700 p-3 rounded text-center font-mono text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-600 tracking-wider">
                       {code}
                   </div>
               ))}
           </div>
           <div className="pt-4 flex justify-end gap-2">
               <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
                   <Copy size={16} /> {t('common.copy')}
               </button>
               <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium" onClick={() => setShowRecoveryCodes(false)}>
                   {t('common.close')}
               </button>
           </div>
        </div>
      </Modal>
    </div>
  );
};