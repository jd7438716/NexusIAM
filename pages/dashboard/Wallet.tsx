import React, { useState } from 'react';
import { CreditCard, Download, Plus, Search, MoreHorizontal, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { Transaction } from '../../types';
import { MOCK_TRANSACTIONS, simulateDelay } from '../../services/mockData';
import { Modal } from '../../components/Modal';

export const Wallet = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  // New Transaction Form State
  const [txType, setTxType] = useState<'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER'>('DEPOSIT');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    await simulateDelay(1500);

    const newTx: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        type: txType,
        amount: parseFloat(amount),
        status: 'COMPLETED',
        date: new Date().toISOString().split('T')[0],
        recipient: txType === 'TRANSFER' ? recipient : undefined
    };

    setTransactions([newTx, ...transactions]);
    setProcessing(false);
    setIsTxModalOpen(false);
    setAmount('');
    setRecipient('');
    setTxType('DEPOSIT');
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    await simulateDelay(1500);
    setProcessing(false);
    setIsCardModalOpen(false);
    alert("Card added successfully (Simulation)");
  };

  const totalBalance = transactions.reduce((acc, curr) => {
    if (curr.type === 'DEPOSIT') return acc + curr.amount;
    if (curr.status === 'COMPLETED') return acc - curr.amount;
    return acc;
  }, 12450); // Starting base

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Wallet</h1>
          <p className="text-slate-500">Manage funds and view transaction history.</p>
        </div>
        <button 
            onClick={() => setIsTxModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus size={18} /> New Transaction
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
             <DollarSign size={100} />
          </div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <CreditCard className="opacity-80" />
            <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium">Primary</span>
          </div>
          <p className="text-slate-400 text-sm mb-1 relative z-10">Total Balance</p>
          <h2 className="text-3xl font-bold tracking-tight mb-6 relative z-10">${totalBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
          <div className="flex gap-4 text-xs opacity-80 relative z-10">
            <span>**** 4589</span>
            <span>Exp 12/26</span>
          </div>
        </div>

        <div 
            onClick={() => setIsCardModalOpen(true)}
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center hover:border-blue-200 transition-colors cursor-pointer group"
        >
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Plus size={24} />
            </div>
            <h3 className="font-bold text-slate-900">Add New Card</h3>
            <p className="text-sm text-slate-500 mt-1">Link a bank account or card</p>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-slate-900">Transactions</h3>
            <div className="flex gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search transactions..."
                        className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64" 
                    />
                </div>
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg border border-slate-200">
                    <Download size={18} />
                </button>
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-3 font-semibold">Transaction ID</th>
                        <th className="px-6 py-3 font-semibold">Type</th>
                        <th className="px-6 py-3 font-semibold">Date</th>
                        <th className="px-6 py-3 font-semibold">Status</th>
                        <th className="px-6 py-3 font-semibold text-right">Amount</th>
                        <th className="px-6 py-3 font-semibold text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900">#{tx.id.toString().toUpperCase().substring(0, 8)}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-800' :
                                    tx.type === 'WITHDRAWAL' ? 'bg-orange-100 text-orange-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                    {tx.type === 'DEPOSIT' ? <ArrowDownRight size={12}/> : <ArrowUpRight size={12}/>}
                                    {tx.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                    tx.status === 'COMPLETED' ? 'bg-green-500' :
                                    tx.status === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></span>
                                <span className="text-slate-600">{tx.status}</span>
                            </td>
                            <td className={`px-6 py-4 text-right font-medium ${
                                tx.type === 'DEPOSIT' ? 'text-green-600' : 'text-slate-900'
                            }`}>
                                {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                                    <MoreHorizontal size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Transaction Modal */}
      <Modal isOpen={isTxModalOpen} onClose={() => setIsTxModalOpen(false)} title="Create New Transaction">
        <form onSubmit={handleCreateTransaction} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Transaction Type</label>
                <div className="grid grid-cols-3 gap-2">
                    {['DEPOSIT', 'WITHDRAWAL', 'TRANSFER'].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setTxType(type as any)}
                            className={`py-2 text-sm rounded-lg border ${
                                txType === type 
                                    ? 'bg-blue-600 text-white border-blue-600' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
                <input 
                    type="number" 
                    required
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0.00"
                />
            </div>

            {txType === 'TRANSFER' && (
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Recipient Email</label>
                    <input 
                        type="email" 
                        required
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="user@example.com"
                    />
                </div>
            )}

            <div className="pt-4">
                <button 
                    type="submit" 
                    disabled={processing}
                    className="w-full bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-70 font-medium"
                >
                    {processing ? 'Processing...' : `Confirm ${txType.toLowerCase()}`}
                </button>
            </div>
        </form>
      </Modal>

      {/* Add Card Modal */}
      <Modal isOpen={isCardModalOpen} onClose={() => setIsCardModalOpen(false)} title="Link New Card">
        <form onSubmit={handleAddCard} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                    <input type="text" placeholder="123" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
            </div>
            <div className="pt-2">
                 <button 
                    type="submit" 
                    disabled={processing}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 font-medium"
                >
                    {processing ? 'Verifying...' : 'Link Card'}
                </button>
            </div>
        </form>
      </Modal>
    </div>
  );
};
