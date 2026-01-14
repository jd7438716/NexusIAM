import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, QrCode, Smartphone, ArrowRight } from 'lucide-react';
import { simulateDelay } from '../../services/mockData';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [method, setMethod] = useState<'password' | 'phone' | 'qr'>('password');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await simulateDelay(1500); 
    setLoading(false);
    
    // Simulate check: if user has MFA, go to verify page.
    // In a real app, backend returns this status.
    const hasMfa = true; 
    
    if (hasMfa) {
        navigate('/mfa-verify');
    } else {
        onLoginSuccess();
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]"></div>
        </div>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10">
        <div className="p-8 text-center bg-slate-50 border-b border-slate-100">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-4">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2 text-sm">Sign in to access your Nexus dashboard</p>
        </div>

        {/* Method Tabs */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setMethod('password')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${method === 'password' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Password
          </button>
          <button 
            onClick={() => setMethod('phone')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${method === 'phone' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Phone
          </button>
          <button 
            onClick={() => setMethod('qr')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${method === 'qr' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            QR Code
          </button>
        </div>

        <div className="p-8">
          {method === 'password' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Email or Username</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Password</label>
                  <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="remember" className="text-sm text-slate-600">Remember me for 30 days</label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating...' : (
                    <>
                        Next Step <ArrowRight size={18} />
                    </>
                )}
              </button>
            </form>
          )}

          {method === 'phone' && (
             <div className="text-center space-y-6">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 inline-block">
                    <Smartphone size={48} className="text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Phone authentication mock interface</p>
                </div>
                <button className="w-full bg-slate-900 text-white font-medium py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
                    Send Verification Code
                </button>
             </div>
          )}

          {method === 'qr' && (
            <div className="text-center py-4">
              <div className="relative inline-block p-2 bg-white rounded-xl shadow-inner border border-slate-200">
                <QrCode size={160} className="text-slate-800" />
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 opacity-0 hover:opacity-100 transition-opacity backdrop-blur-sm rounded-xl cursor-pointer">
                  <p className="text-sm font-semibold text-slate-900">Refresh Code</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">Scan with Nexus Authenticator App</p>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-slate-500">
            Don't have an account? <Link to="/register" className="text-blue-600 font-medium hover:underline">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
