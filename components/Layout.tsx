import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Wallet, 
  FolderOpen, 
  FileText, 
  LogOut, 
  Menu, 
  Bell, 
  User as UserIcon,
  X,
  Search,
  Users,
  Megaphone,
  Ticket,
  MessageSquare,
  Settings,
  Sun,
  Moon,
  Languages,
  ChevronDown
} from 'lucide-react';
import { User, UserRole } from '../types';
import { usePreferences } from '../contexts/PreferencesContext';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-slate-400 dark:text-slate-400 hover:bg-slate-800 dark:hover:bg-slate-800 hover:text-white dark:hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { t, theme, toggleTheme, language, setLanguage } = usePreferences();

  const isActive = (path: string) => location.pathname === path;

  const cycleLanguage = () => {
      setLanguage(language === 'en' ? 'zh' : 'en');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
            setIsUserMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden font-sans text-slate-900 dark:text-white transition-colors duration-200">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 dark:bg-black text-white transform transition-transform duration-300 ease-in-out border-r border-slate-800
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Nexus IAM</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
            <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t('nav.general')}
            </div>
            <SidebarItem to="/" icon={LayoutDashboard} label={t('nav.dashboard')} active={isActive('/')} />
            <SidebarItem to="/profile" icon={UserIcon} label={t('nav.profile')} active={isActive('/profile')} />
            <SidebarItem to="/security" icon={ShieldCheck} label={t('nav.security')} active={isActive('/security')} />
            <SidebarItem to="/invitations" icon={Ticket} label={t('nav.invitations')} active={isActive('/invitations')} />
            <SidebarItem to="/chat" icon={MessageSquare} label={t('nav.messages')} active={isActive('/chat')} />
            
            <div className="px-4 mt-8 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t('nav.assets')}
            </div>
            <SidebarItem to="/wallet" icon={Wallet} label={t('nav.wallet')} active={isActive('/wallet')} />
            <SidebarItem to="/files" icon={FolderOpen} label={t('nav.files')} active={isActive('/files')} />

            {user?.role === UserRole.ADMIN && (
              <>
                <div className="px-4 mt-8 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {t('nav.admin')}
                </div>
                <SidebarItem to="/admin/users" icon={Users} label={t('nav.users')} active={isActive('/admin/users')} />
                <SidebarItem to="/admin/broadcast" icon={Megaphone} label={t('nav.broadcast')} active={isActive('/admin/broadcast')} />
                <SidebarItem to="/admin/logs" icon={FileText} label={t('nav.audit_logs')} active={isActive('/admin/logs')} />
              </>
            )}
            
            <div className="my-4 border-t border-slate-800"></div>
            <SidebarItem to="/settings" icon={Settings} label={t('nav.settings')} active={isActive('/settings')} />
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">{t('nav.sign_out')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 lg:px-8 transition-colors duration-200 z-10 relative">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 max-w-xl mx-4 hidden md:block group">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder={t('header.search')}
                className="w-full pl-10 pr-12 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                  <span className="text-xs text-slate-400 border border-slate-300 dark:border-slate-600 rounded px-1.5 py-0.5 bg-white dark:bg-slate-800">⌘K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                title="Toggle Theme"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Toggle */}
            <button 
                onClick={cycleLanguage}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors flex items-center gap-1"
                title="Switch Language"
            >
                <Languages size={20} />
                <span className="text-xs font-bold">{language.toUpperCase()}</span>
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

            <button 
                onClick={() => navigate('/notifications')}
                className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-800"></span>
            </button>

            {/* User Dropdown */}
            <div className="relative pl-4 border-l border-slate-200 dark:border-slate-700" ref={userMenuRef}>
               <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg p-1 transition-colors"
               >
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.username}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role.toLowerCase()}</p>
                  </div>
                  <img 
                    src={user?.avatarUrl} 
                    alt="Profile" 
                    className="w-9 h-9 rounded-full ring-2 ring-slate-100 dark:ring-slate-700 object-cover"
                  />
                  <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
               </button>

               {/* Dropdown Menu */}
               {isUserMenuOpen && (
                 <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 animate-in fade-in zoom-in-95 duration-200">
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                        <UserIcon size={16} /> {t('header.menu.profile')}
                    </Link>
                    <Link 
                      to="/settings" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                        <Settings size={16} /> {t('header.menu.settings')}
                    </Link>
                    <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                    <button 
                        onClick={() => {
                            setIsUserMenuOpen(false);
                            onLogout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
                    >
                        <LogOut size={16} /> {t('header.menu.logout')}
                    </button>
                 </div>
               )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50 dark:bg-slate-900 scroll-smooth transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
