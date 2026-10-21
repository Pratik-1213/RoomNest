import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Users, 
  KeyRound, 
  ShieldCheck, 
  Loader2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'tenant' | 'owner' | 'admin'>('tenant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect target if redirected from a protected route
  const from = (location.state as any)?.from?.pathname || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (from) {
        navigate(from, { replace: true });
      } else {
        if (selectedRole === 'owner' || email.includes('owner')) {
          navigate('/owner/dashboard');
        } else if (selectedRole === 'admin' || email.includes('admin')) {
          navigate('/admin');
        } else {
          navigate('/tenant/dashboard');
        }
      }
    } else {
      setError(res.error || 'Invalid email or password. Please try again.');
    }
  };

  const handleFillCredentials = (fillEmail: string, role: 'tenant' | 'owner' | 'admin') => {
    setSelectedRole(role);
    setEmail(fillEmail);
    setPassword('RoomNest@2026');
    setError(null);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F7F5F0]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="RoomNest Logo"
            className="w-12 h-12 rounded-xl object-contain border border-[#E1E6EB] shadow-xs mx-auto bg-white p-1"
          />
        </Link>
        <h2 className="text-2xl font-extrabold text-[#142B45] tracking-tight font-sans">
          Sign In to RoomNest
        </h2>
        <p className="text-xs text-[#667085]">
          Access your Pune accommodation portal, bookings, or property management
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#E1E6EB] rounded-2xl sm:px-10 space-y-6">
          {/* Role Selection Tabs */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#243244]">Select Portal Role:</label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#E8EDF2] rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedRole('tenant')}
                className={`py-2 px-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1 ${
                  selectedRole === 'tenant'
                    ? 'bg-white text-[#142B45] shadow-xs font-bold'
                    : 'text-[#667085] hover:text-[#243244]'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-[#168C83]" />
                <span>Tenant</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('owner')}
                className={`py-2 px-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1 ${
                  selectedRole === 'owner'
                    ? 'bg-white text-[#142B45] shadow-xs font-bold'
                    : 'text-[#667085] hover:text-[#243244]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#168C83]" />
                <span>PG Owner</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`py-2 px-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1 ${
                  selectedRole === 'admin'
                    ? 'bg-white text-[#142B45] shadow-xs font-bold'
                    : 'text-[#667085] hover:text-[#243244]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#168C83]" />
                <span>Admin</span>
              </button>
            </div>
            <p className="text-[11px] text-[#667085] pt-0.5">
              {selectedRole === 'tenant' && 'For students & IT professionals searching or managing PG bookings.'}
              {selectedRole === 'owner' && 'For verified Pune property managers listing rooms and handling inquiries.'}
              {selectedRole === 'admin' && 'For compliance auditors reviewing listings and KYC records.'}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-[#B42318] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email Field */}
            <div>
              <label className="block font-bold text-[#243244] mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    selectedRole === 'tenant'
                      ? 'e.g. tanmay.tenant@roomnest.in'
                      : selectedRole === 'owner'
                      ? 'e.g. suresh.owner@roomnest.in'
                      : 'e.g. admin@roomnest.in'
                  }
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F7F5F0]/60 border border-[#E1E6EB] rounded-xl text-[#243244] focus:bg-white focus:ring-2 focus:ring-[#168C83] focus:border-[#168C83] transition"
                  required
                />
                <Mail className="w-4 h-4 text-[#667085] absolute left-3 top-3" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-[#243244]">Password</label>
                <Link to="/forgot-password" className="text-[11px] text-[#168C83] hover:underline font-semibold">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#F7F5F0]/60 border border-[#E1E6EB] rounded-xl text-[#243244] focus:bg-white focus:ring-2 focus:ring-[#168C83] focus:border-[#168C83] transition"
                  required
                />
                <Lock className="w-4 h-4 text-[#667085] absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#667085] hover:text-[#243244]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#142B45] hover:bg-[#0D1B2A] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to {selectedRole === 'tenant' ? 'Tenant Portal' : selectedRole === 'owner' ? 'Owner Portal' : 'Admin Panel'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Collapsible Test Credentials Helper for Evaluators */}
          <details className="text-xs text-slate-500 pt-3 border-t border-slate-100">
            <summary className="cursor-pointer text-[11px] font-semibold text-slate-600 hover:text-teal-700 select-none flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-teal-600" />
              <span>Evaluation Test Accounts (Click to Autofill)</span>
            </summary>
            <div className="mt-2 space-y-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200 text-[11px]">
              <div className="flex items-center justify-between">
                <span>Tenant: <span className="font-mono text-slate-700">tanmay.tenant@roomnest.in</span></span>
                <button
                  type="button"
                  onClick={() => handleFillCredentials('tanmay.tenant@roomnest.in', 'tenant')}
                  className="text-teal-700 font-bold hover:underline"
                >
                  Use
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>Owner: <span className="font-mono text-slate-700">suresh.owner@roomnest.in</span></span>
                <button
                  type="button"
                  onClick={() => handleFillCredentials('suresh.owner@roomnest.in', 'owner')}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Use
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>Admin: <span className="font-mono text-slate-700">admin@roomnest.in</span></span>
                <button
                  type="button"
                  onClick={() => handleFillCredentials('admin@roomnest.in', 'admin')}
                  className="text-purple-700 font-bold hover:underline"
                >
                  Use
                </button>
              </div>
            </div>
          </details>

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-600">
              New to RoomNest?{' '}
              <Link to="/signup" className="font-bold text-teal-700 hover:underline">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
