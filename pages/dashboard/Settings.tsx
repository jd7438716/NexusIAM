import React, { useState } from 'react';
import { Moon, Sun, Globe, Bell, Smartphone, Mail, Shield } from 'lucide-react';
import { usePreferences } from '../../contexts/PreferencesContext';
import { simulateDelay } from '../../services/mockData';

export const Settings: React.FC = () => {
  const { theme, language, toggleTheme, setLanguage, t } = usePreferences();
  const [loading, setLoading] = useState(false);
  const [notifState, setNotifState] = useState({
      email: true,
      push: true,
      marketing: false
  });

  const handleToggleNotif = (key: keyof typeof notifState) => {
      setNotifState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
      setLoading(true);
      await simulateDelay(800);
      setLoading(false);
      // In a real app, this would save to backend
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('settings.title')}</h1>
        <p className="text-slate-500 dark:text-slate-400">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Appearance Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                        <Sun size={20} className="hidden dark:block" />
                        <Moon size={20} className="block dark:hidden" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('settings.appearance')}</h3>
                </div>
            </div>
            
            <div className="p-6 space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">{t('settings.theme')}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {theme === 'light' ? t('settings.theme.light') : t('settings.theme.dark')}
                        </p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-lg flex">
                        <button 
                            onClick={() => theme === 'dark' && toggleTheme()}
                            className={`p-2 rounded-md transition-all flex items-center gap-2 text-sm font-medium ${theme === 'light' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'}`}
                        >
                            <Sun size={16} /> Light
                        </button>
                        <button 
                             onClick={() => theme === 'light' && toggleTheme()}
                             className={`p-2 rounded-md transition-all flex items-center gap-2 text-sm font-medium ${theme === 'dark' ? 'bg-slate-700 shadow text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'}`}
                        >
                            <Moon size={16} /> Dark
                        </button>
                    </div>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-700"></div>

                {/* Language Select */}
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">{t('settings.language')}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.language.desc')}</p>
                    </div>
                    <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <select 
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as any)}
                            className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white appearance-none min-w-[150px]"
                        >
                            <option value="en">English (US)</option>
                            <option value="zh">简体中文</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                        <Bell size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('settings.notifications')}</h3>
                </div>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                            <Mail size={16} />
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">{t('settings.notif.email')}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifState.email} onChange={() => handleToggleNotif('email')} />
                        <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                            <Smartphone size={16} />
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">{t('settings.notif.push')}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifState.push} onChange={() => handleToggleNotif('push')} />
                        <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                            <Shield size={16} />
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">{t('settings.notif.marketing')}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifState.marketing} onChange={() => handleToggleNotif('marketing')} />
                        <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
