import React, { useState } from 'react';
import { CreditCard, Download, Plus, Search, MoreHorizontal, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { Transaction } from '../../types';
import { MOCK_TRANSACTIONS, simulateDelay } from '../../services/mockData';
import { Modal } from '../../components/Modal';
import { usePreferences } from '../../contexts/PreferencesContext';

export const Wallet = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { t } = usePreferences();

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('wallet.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('wallet.subtitle')}</p>
        </div>
        <button 
            onClick={() => setIsTxModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus size={18} /> {t('wallet.new_tx')}
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
             <DollarSign size={100} />
          </div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <CreditCard className="opacity-80" />
            <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium">{t('wallet.primary')}</span>
          </div>
          <p className="text-slate-400 text-sm mb-1 relative z-10">{t('overview.total_balance')}</p>
          <h2 className="text-3xl font-bold tracking-tight mb-6 relative z-10">${totalBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
          <div className="flex gap-4 text-xs opacity-80 relative z-10">
            <span>**** 4589</span>
            <span>Exp 12/26</span>
          </div>
        </div>

        <div 
            onClick={() => setIsCardModalOpen(true)}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-center items-center text-center hover:border-blue-200 dark:hover:border-blue-500 transition-colors cursor-pointer group"
        >
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Plus size={24} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">{t('wallet.add_card')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('wallet.link_bank')}</p>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-slate-900 dark:text-white">{t('wallet.tx_history')}</h3>
            <div className="flex gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder={t('common.search')}
                        className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64 text-slate-900 dark:text-white" 
                    />
                </div>
                <button className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700">
                    <Download size={18} />
                </button>
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th className="px-6 py-3 font-semibold">ID</th>
                        <th className="px-6 py-3 font-semibold">{t('wallet.type')}</th>
                        <th className="px-6 py-3 font-semibold">{t('common.date')}</th>
                        <th className="px-6 py-3 font-semibold">{t('common.status')}</th>
                        <th className="px-6 py-3 font-semibold text-right">{t('wallet.amount')}</th>
                        <th className="px-6 py-3 font-semibold text-center">{t('common.actions')}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">#{tx.id.toString().toUpperCase().substring(0, 8)}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                    tx.type === 'WITHDRAWAL' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                }`}>
                                    {tx.type === 'DEPOSIT' ? <ArrowDownRight size={12}/> : <ArrowUpRight size={12}/>}
                                    {tx.type === 'DEPOSIT' ? t('wallet.deposit') : tx.type === 'WITHDRAWAL' ? t('wallet.withdrawal') : t('wallet.transfer')}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{tx.date}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                    tx.status === 'COMPLETED' ? 'bg-green-500' :
                                    tx.status === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></span>
                                <span className="text-slate-600 dark:text-slate-300">{tx.status}</span>
                            </td>
                            <td className={`px-6 py-4 text-right font-medium ${
                                tx.type === 'DEPOSIT' ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'
                            }`}>
                                {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded">
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
      <Modal isOpen={isTxModalOpen} onClose={() => setIsTxModalOpen(false)} title={t('wallet.new_tx')}>
        <form onSubmit={handleCreateTransaction} className="space-y-4 text-slate-900">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('wallet.type')}</label>
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
                            {type === 'DEPOSIT' ? t('wallet.deposit') : type === 'WITHDRAWAL' ? t('wallet.withdrawal') : t('wallet.transfer')}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('wallet.amount')} ($)</label>
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
                    {processing ? t('common.processing') : t('common.save')}
                </button>
            </div>
        </form>
      </Modal>

      {/* Add Card Modal */}
      <Modal isOpen={isCardModalOpen} onClose={() => setIsCardModalOpen(false)} title={t('wallet.add_card')}>
        <form onSubmit={handleAddCard} className="space-y-4 text-slate-900">
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
                    {processing ? t('common.processing') : t('common.save')}
                </button>
            </div>
        </form>
      </Modal>
    </div>
  );
};