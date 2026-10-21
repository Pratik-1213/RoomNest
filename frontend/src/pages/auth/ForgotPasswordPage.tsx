import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg mx-auto shadow-sm">
          <Building2 className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Reset Your Password
        </h2>
        <p className="text-xs text-slate-500">
          Enter your registered email address to receive password reset instructions
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-xl sm:px-10 space-y-6">
          {submitted ? (
            <div className="text-center space-y-3 py-4">
              <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
              <h3 className="font-bold text-slate-900 text-base">Check Your Inbox</h3>
              <p className="text-xs text-slate-500">
                If an account exists for <span className="font-semibold text-slate-800">{email}</span>, a secure password recovery link has been dispatched.
              </p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-block bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          ) : (
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

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition"
              >
                Send Reset Link
              </button>
            </form>
          )}

          <div className="text-center text-xs text-slate-500 pt-2 border-t">
            <Link to="/login" className="inline-flex items-center gap-1 text-teal-700 font-bold hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
