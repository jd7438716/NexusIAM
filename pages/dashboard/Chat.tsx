import React, { useState, useRef, useEffect } from 'react';
import { Send, MoreVertical, Phone, Video, Search, Circle } from 'lucide-react';
import { MOCK_CONTACTS, MOCK_MESSAGES } from '../../services/mockData';

export const Chat: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState(MOCK_CONTACTS[0]);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = {
        id: `m-${Date.now()}`,
        senderId: 'me',
        text: inputValue,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInputValue('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex">
      {/* Sidebar - Contacts */}
      <div className="w-80 border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-slate-100">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search contacts..." 
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
            {MOCK_CONTACTS.map(contact => (
                <div 
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${selectedContact.id === contact.id ? 'bg-blue-50 border-r-2 border-blue-600' : 'hover:bg-slate-50'}`}
                >
                    <div className="relative">
                        <img src={contact.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                        {contact.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 text-sm truncate">{contact.name}</h4>
                        <p className={`text-xs truncate ${selectedContact.id === contact.id ? 'text-blue-600' : 'text-slate-500'}`}>
                            {contact.lastMsg}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
                 <div className="relative md:hidden">
                    <img src={selectedContact.avatar} alt="" className="w-8 h-8 rounded-full" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">{selectedContact.name}</h3>
                    <div className="flex items-center gap-1.5">
                        <Circle size={8} className={selectedContact.online ? "fill-green-500 text-green-500" : "fill-slate-300 text-slate-300"} />
                        <span className="text-xs text-slate-500">{selectedContact.online ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Phone size={20} /></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Video size={20} /></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><MoreVertical size={20} /></button>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map(msg => {
                const isMe = msg.senderId === 'me';
                return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'} px-4 py-2.5 rounded-2xl shadow-sm`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-100' : 'text-slate-400'}`}>{msg.time}</p>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-200">
            <form onSubmit={handleSendMessage} className="flex gap-2">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
                <button 
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-600/20"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};
