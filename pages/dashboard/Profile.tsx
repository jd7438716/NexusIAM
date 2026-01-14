import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, User as UserIcon, AlertTriangle, Download, Trash2, Save, Check } from 'lucide-react';
import { User } from '../../types';
import { simulateDelay } from '../../services/mockData';
import { usePreferences } from '../../contexts/PreferencesContext';

export const Profile: React.FC<{ user: User | null }> = ({ user }) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { t } = usePreferences();

  const handleSave = async () => {
    setSaving(true);
    await simulateDelay(1000);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('profile.title')}</h1>
        <p className="text-slate-500 dark:text-slate-400">{t('profile.subtitle')}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <div className="px-8 pb-8">
            {/* Header / Avatar */}
            <div className="relative -mt-12 mb-8 flex flex-col sm:flex-row items-end sm:items-end gap-6">
                <div className="relative group cursor-pointer">
                    <img 
                        src={user?.avatarUrl} 
                        alt="Avatar" 
                        className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg object-cover bg-white" 
                    />
                    <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white" size={24} />
                    </div>
                </div>
                <div className="flex-1 pb-2 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.username}</h2>
                    <p className="text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-2 mt-1">
                        <Mail size={14} /> {user?.email}
                    </p>
                </div>
                <div className="pb-2">
                    <button 
                        onClick={handleSave}
                        disabled={saving || saved}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-sm text-sm font-medium ${
                            saved 
                                ? 'bg-green-600 text-white' 
                                : 'bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-slate-800 dark:hover:bg-slate-200'
                        }`}
                    >
                        {saved ? <><Check size={16} /> {t('common.saved')}</> : <><Save size={16} /> {saving ? t('common.saving') : t('common.save')}</>}
                    </button>
                </div>
            </div>
            
            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">{t('profile.basic')}</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('profile.display_name')}</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" defaultValue={user?.username} className="w-full pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white dark:bg-slate-900 dark:text-white" />
                        </div>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('profile.email')}</label>
                         <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="email" defaultValue={user?.email} disabled className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-lg cursor-not-allowed" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">{t('profile.contact')}</h3>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('profile.phone')}</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="tel" defaultValue={user?.phone || ''} placeholder="+1 (555) 000-0000" className="w-full pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white dark:bg-slate-900 dark:text-white" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('profile.location')}</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" placeholder="New York, USA" className="w-full pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white dark:bg-slate-900 dark:text-white" />
                        </div>
                    </div>
                </div>

                 <div className="md:col-span-2 space-y-4">
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">{t('profile.bio')}</h3>
                    <textarea 
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24 resize-none bg-white dark:bg-slate-900 dark:text-white"
                        placeholder={t('profile.bio_placeholder')}
                    ></textarea>
                </div>
            </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 overflow-hidden">
          <div className="p-6 border-b border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <AlertTriangle size={20} />
                  <h3 className="font-bold">{t('profile.danger')}</h3>
              </div>
          </div>
          <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                  <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">{t('profile.export')}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t('profile.export_desc')}</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors text-sm font-medium">
                      <Download size={16} /> {t('common.copy')}
                  </button>
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-700"></div>
              <div className="flex items-center justify-between">
                  <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">{t('profile.delete')}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t('profile.delete_desc')}</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 rounded-lg transition-colors text-sm font-medium">
                      <Trash2 size={16} /> {t('common.delete')}
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};