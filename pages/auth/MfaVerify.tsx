import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { simulateDelay } from '../../services/mockData';

interface MfaVerifyProps {
  onLoginSuccess: () => void;
}

export const MfaVerify: React.FC<MfaVerifyProps> = ({ onLoginSuccess }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await simulateDelay(1500);
    setLoading(false);
    onLoginSuccess();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-6">
          <ShieldCheck size={28} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Two-Step Verification</h1>
        <p className="text-slate-500 mt-2 text-sm">
          Enter the 6-digit code from your authenticator app.
        </p>

        <form onSubmit={handleVerify} className="mt-8">
          <div className="flex gap-2 justify-center mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputsRef.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="w-12 h-14 border border-slate-300 rounded-lg text-center text-2xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <input type="checkbox" id="trust" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="trust" className="text-sm text-slate-600">Trust this device for 30 days</label>
          </div>

          <button 
            type="submit" 
            disabled={loading || code.some(c => !c)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : (
                <>
                    Verify & Login <ArrowRight size={18} />
                </>
            )}
          </button>
        </form>

        <div className="mt-6 text-sm">
          <button className="text-slate-500 hover:text-slate-800">Use another method</button>
        </div>
      </div>
    </div>
  );
};
