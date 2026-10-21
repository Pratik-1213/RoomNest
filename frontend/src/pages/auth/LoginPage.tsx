import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, ShieldCheck, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (email.includes('owner')) navigate('/owner/dashboard');
      else if (email.includes('admin')) navigate('/admin');
      else navigate('/tenant/dashboard');
    } else {
      setError(res.error || 'Failed to authenticate');
    }
  };

  const handleQuickLogin = (role: 'tenant' | 'owner' | 'admin') => {
    switchRole(role);
    if (role === 'owner') navigate('/owner/dashboard');
    else if (role === 'admin') navigate('/admin');
    else navigate('/tenant/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg mx-auto shadow-sm">
          <Building2 className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign In to RoomNest
        </h2>
        <p className="text-xs text-slate-500">
          Access your Pune PG shortlists, booking requests, and owner dashboard
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-xl sm:px-10 space-y-6">
          {/* Quick 1-Click Demo Logins Banner */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
            <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
              1-Click Instant Evaluation Logins:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('tenant')}
                className="py-1.5 px-2 bg-white border border-slate-300 rounded font-semibold text-slate-800 hover:border-teal-500 hover:text-teal-700 transition"
              >
                Tenant
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('owner')}
                className="py-1.5 px-2 bg-white border border-slate-300 rounded font-semibold text-slate-800 hover:border-emerald-500 hover:text-emerald-700 transition"
              >
                Owner
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-1.5 px-2 bg-white border border-slate-300 rounded font-semibold text-slate-800 hover:border-purple-500 hover:text-purple-700 transition"
              >
                Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-teal-700 hover:underline text-[11px]">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-teal-700 font-bold hover:underline">
              Sign up as Tenant or Owner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
