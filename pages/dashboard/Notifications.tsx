import React, { useState } from 'react';
import { Bell, Check, Clock, AlertCircle, Info, Trash2 } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../../services/mockData';
import { NotificationItem } from '../../types';
import { usePreferences } from '../../contexts/PreferencesContext';

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    ...MOCK_NOTIFICATIONS,
    { id: 'n-3', title: 'System Maintenance', message: 'Scheduled maintenance tonight at 02:00 AM UTC.', read: false, time: '2h ago' },
    { id: 'n-4', title: 'Security Alert', message: 'New device detected: iPad Pro from London, UK.', read: false, time: '5h ago' },
    { id: 'n-5', title: 'Welcome to Nexus', message: 'Thanks for joining! Complete your profile to get started.', read: true, time: '1d ago' },
  ]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { t } = usePreferences();

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('notif.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('notif.subtitle')}</p>
        </div>
        <div className="flex gap-2">
           <button 
                onClick={handleMarkAllRead}
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
            >
                <Check size={16} /> {t('notif.mark_all')}
            </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 dark:border-slate-700 flex">
            <button 
                onClick={() => setFilter('all')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${filter === 'all' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
                {t('notif.filter.all')}
            </button>
            <button 
                onClick={() => setFilter('unread')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${filter === 'unread' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
                {t('notif.filter.unread')}
            </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {filteredNotifications.length === 0 ? (
                <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                    <Bell size={48} className="mx-auto mb-3 text-slate-200 dark:text-slate-600" />
                    <p>{t('notif.empty')}</p>
                </div>
            ) : (
                filteredNotifications.map(notification => (
                    <div 
                        key={notification.id} 
                        className={`p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex gap-4 ${!notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                    >
                        <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            notification.title.includes('Alert') || notification.title.includes('Security') 
                                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                                : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                            {notification.title.includes('Alert') ? <AlertCircle size={20} /> : <Info size={20} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className={`text-sm font-semibold ${!notification.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {notification.title}
                                    {!notification.read && <span className="ml-2 w-2 h-2 inline-block bg-blue-600 rounded-full"></span>}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                        <Clock size={12} /> {notification.time}
                                    </span>
                                    <div className="flex gap-1">
                                        {!notification.read && (
                                            <button 
                                                onClick={() => handleMarkAsRead(notification.id)}
                                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                                                title="Mark as read"
                                            >
                                                <Check size={16} />
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => deleteNotification(notification.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{notification.message}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};
