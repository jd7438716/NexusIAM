import React from 'react';
import { Camera, Mail, Phone, MapPin, User as UserIcon, AlertTriangle, Download, Trash2, Save } from 'lucide-react';
import { User } from '../../types';

export const Profile: React.FC<{ user: User | null }> = ({ user }) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-500">Manage your personal information and account settings.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white" 
                    />
                    <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white" size={24} />
                    </div>
                </div>
                <div className="flex-1 pb-2 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-slate-900">{user?.username}</h2>
                    <p className="text-slate-500 flex items-center justify-center sm:justify-start gap-2 mt-1">
                        <Mail size={14} /> {user?.email}
                    </p>
                </div>
                <div className="pb-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm text-sm font-medium">
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </div>
            
            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">Basic Info</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" defaultValue={user?.username} className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                         <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="email" defaultValue={user?.email} disabled className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg cursor-not-allowed" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">Contact Details</h3>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="tel" defaultValue={user?.phone || ''} placeholder="+1 (555) 000-0000" className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" placeholder="New York, USA" className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                    </div>
                </div>

                 <div className="md:col-span-2 space-y-4">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">Bio</h3>
                    <textarea 
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24 resize-none"
                        placeholder="Tell us a little about yourself..."
                    ></textarea>
                </div>
            </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-red-50/50">
              <div className="flex items-center gap-2 text-red-700">
                  <AlertTriangle size={20} />
                  <h3 className="font-bold">Danger Zone</h3>
              </div>
          </div>
          <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                  <div>
                      <h4 className="font-medium text-slate-900">Export Personal Data (GDPR)</h4>
                      <p className="text-sm text-slate-500">Download a copy of all data associated with your account.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors text-sm font-medium">
                      <Download size={16} /> Export Data
                  </button>
              </div>
              <div className="h-px bg-slate-100"></div>
              <div className="flex items-center justify-between">
                  <div>
                      <h4 className="font-medium text-slate-900">Delete Account</h4>
                      <p className="text-sm text-slate-500">Permanently delete your account and all associated data.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors text-sm font-medium">
                      <Trash2 size={16} /> Delete Account
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
