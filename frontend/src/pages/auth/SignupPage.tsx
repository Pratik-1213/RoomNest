import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, User, Phone, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const SignupPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>('tenant');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signup(email, password, fullName, phone, role);
    setLoading(false);

    if (res.success) {
      if (role === 'owner') navigate('/owner/onboarding');
      else navigate('/tenant/onboarding');
    } else {
      setError(res.error || 'Failed to register account');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg mx-auto shadow-sm">
          <Building2 className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Create Your RoomNest Account
        </h2>
        <p className="text-xs text-slate-500">
          Join Pune's premier paying guest accommodation discovery platform
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-xl sm:px-10 space-y-6">
          {/* Account Role Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">I am registering as:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('tenant')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition text-center ${
                  role === 'tenant'
                    ? 'bg-teal-50 border-teal-500 text-teal-800 ring-1 ring-teal-500'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Tenant / Student / Job
              </button>
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition text-center ${
                  role === 'owner'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                PG Property Owner
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tanmay Shinde"
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

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
              <label className="block font-bold text-slate-700 mb-1">Contact Phone (WhatsApp)</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Create Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              By creating an account, you agree to RoomNest's Terms of Service and Privacy Policy. Role assignments are validated server-side.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition"
            >
              {loading ? 'Creating Account...' : `Register as ${role === 'owner' ? 'Property Owner' : 'Tenant'}`}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t">
            Already registered?{' '}
            <Link to="/login" className="text-teal-700 font-bold hover:underline">
              Log in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
