import React, { useState } from 'react';
import { Search, UserPlus, MoreVertical, Shield, Ban, RotateCcw, Edit, CheckCircle, Mail, User as UserIcon, AlertTriangle } from 'lucide-react';
import { MOCK_USERS_LIST, simulateDelay } from '../../services/mockData';
import { User, UserRole } from '../../types';
import { Modal } from '../../components/Modal';

export const Users = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS_LIST);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirmAction, setConfirmAction] = useState<{type: 'SUSPEND' | 'RESET_MFA' | 'DELETE', user: User} | null>(null);
  const [processing, setProcessing] = useState(false);

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setProcessing(true);
    await simulateDelay(1000);
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setProcessing(false);
    setEditingUser(null);
  };

  const executeConfirmAction = async () => {
    if (!confirmAction) return;
    setProcessing(true);
    await simulateDelay(1000);

    if (confirmAction.type === 'SUSPEND') {
        // Toggle mock active status logic (using a property not in type for simple mock, or removing)
        // For visual, let's just alert or remove
        // In real app, update status property
        alert(`User ${confirmAction.user.username} has been suspended.`);
    } else if (confirmAction.type === 'RESET_MFA') {
        setUsers(users.map(u => u.id === confirmAction.user.id ? {...u, mfaEnabled: false} : u));
    }

    setProcessing(false);
    setConfirmAction(null);
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage user access, roles, and status.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
          <UserPlus size={18} /> Add User
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-200">
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search users by name or email..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-3 font-semibold">User</th>
                        <th className="px-6 py-3 font-semibold">Role</th>
                        <th className="px-6 py-3 font-semibold">MFA Status</th>
                        <th className="px-6 py-3 font-semibold">Status</th>
                        <th className="px-6 py-3 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img src={user.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <div className="font-medium text-slate-900">{user.username}</div>
                                        <div className="text-slate-500 text-xs">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.role === UserRole.ADMIN 
                                        ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                                }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                {user.mfaEnabled ? (
                                    <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium">
                                        <Shield size={12} /> Enabled
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-1 rounded text-xs font-medium">
                                        Disabled
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
                                    <CheckCircle size={12} /> Active
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button 
                                        onClick={() => setEditingUser(user)}
                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded" 
                                        title="Edit User"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button 
                                        onClick={() => setConfirmAction({type: 'RESET_MFA', user})}
                                        className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded" 
                                        title="Reset MFA"
                                    >
                                        <RotateCcw size={16} />
                                    </button>
                                    <button 
                                        onClick={() => setConfirmAction({type: 'SUSPEND', user})}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" 
                                        title="Suspend User"
                                    >
                                        <Ban size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Edit User Modal */}
      <Modal isOpen={!!editingUser} onClose={() => setEditingUser(null)} title="Edit User">
        {editingUser && (
            <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            value={editingUser.username}
                            onChange={e => setEditingUser({...editingUser, username: e.target.value})}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="email" 
                            value={editingUser.email}
                            onChange={e => setEditingUser({...editingUser, email: e.target.value})}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                    <select 
                        value={editingUser.role}
                        onChange={e => setEditingUser({...editingUser, role: e.target.value as UserRole})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value={UserRole.USER}>User</option>
                        <option value={UserRole.ADMIN}>Admin</option>
                    </select>
                </div>
                <div className="pt-4 flex justify-end gap-2">
                    <button 
                        type="button" 
                        onClick={() => setEditingUser(null)}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-70"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        )}
      </Modal>

      {/* Confirmation Modal */}
      <Modal 
        isOpen={!!confirmAction} 
        onClose={() => setConfirmAction(null)} 
        title={confirmAction?.type === 'SUSPEND' ? 'Suspend User' : 'Reset MFA'}
        size="sm"
      >
        <div className="text-center space-y-4">
            <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${confirmAction?.type === 'SUSPEND' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                <AlertTriangle size={24} />
            </div>
            <p className="text-slate-600">
                Are you sure you want to {confirmAction?.type === 'SUSPEND' ? 'suspend' : 'reset MFA for'} <strong>{confirmAction?.user.username}</strong>?
                {confirmAction?.type === 'SUSPEND' && <span className="block text-xs mt-2 text-slate-500">The user will lose access immediately.</span>}
                {confirmAction?.type === 'RESET_MFA' && <span className="block text-xs mt-2 text-slate-500">The user will be required to set up MFA again on next login.</span>}
            </p>
            <div className="flex gap-3 justify-center pt-2">
                 <button 
                    onClick={() => setConfirmAction(null)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                >
                    Cancel
                </button>
                <button 
                    onClick={executeConfirmAction}
                    disabled={processing}
                    className={`px-4 py-2 text-white rounded-lg font-medium disabled:opacity-70 ${confirmAction?.type === 'SUSPEND' ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
                >
                    {processing ? 'Processing...' : 'Confirm'}
                </button>
            </div>
        </div>
      </Modal>
    </div>
  );
};
