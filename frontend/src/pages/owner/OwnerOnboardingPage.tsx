import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const OwnerOnboardingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState('Patil Executive Stays Pune');
  const [proofType, setProofType] = useState('Pune Municipal Corporation Trade Reg');
  const [proofNumber, setProofNumber] = useState('MH-PUN-2024-8910');
  const [emergencyContact, setEmergencyContact] = useState('+91 98220 14890');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/owner/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Owner Verification & KYC</h1>
          <p className="text-xs text-slate-500">
            Submit your property verification documents to receive the verified partner badge in Pune.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">PG Business / Enterprise Name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">ID / Verification Proof Type</label>
              <select
                value={proofType}
                onChange={(e) => setProofType(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border rounded-lg"
              >
                <option value="Pune Municipal Corporation Trade Reg">PMC Trade License</option>
                <option value="Aadhaar Card (Owner)">Owner Aadhaar Card</option>
                <option value="Electricity Bill / Property Tax">Pune Property Tax Receipt</option>
                <option value="GST Certificate">GST Certificate</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Document / Certificate Reference</label>
              <input
                type="text"
                value={proofNumber}
                onChange={(e) => setProofNumber(e.target.value)}
                className="w-full p-2.5 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">24/7 Emergency Warden / Owner Phone</label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="w-full p-2.5 border rounded-lg"
              required
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-slate-600 leading-relaxed border">
            Verification status: <span className="font-bold text-emerald-700">Pre-Verified Demonstration Partner</span>. Once submitted, your listings are immediately eligible for tenant inquiries.
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-sm transition"
          >
            Confirm Details & Enter Owner Portal
          </button>
        </form>
      </div>
    </div>
  );
};
