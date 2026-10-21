import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, X, AlertTriangle, Eye } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminListingsModerationPage: React.FC = () => {
  const { listings, updateListingStatus } = useStore();

  const handleApprove = (id: string) => {
    updateListingStatus(id, 'active');
  };

  const handleReject = (id: string) => {
    updateListingStatus(id, 'paused');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
            <Link to="/admin" className="hover:text-purple-700">Admin</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Moderation</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-600" />
            Listing Moderation & KYC Verification Queue
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review submitted PG accommodations for accurate pricing, legitimate photos, and Pune municipal rules
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {listings.map((l) => (
          <div key={l.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-4">
              <img
                src={l.photos[0]}
                alt={l.name}
                className="w-24 h-20 object-cover rounded-lg border shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{l.name}</span>
                  {l.is_demo ? (
                    <span className="badge-demo text-[10px] px-1.5 py-0.5 rounded font-bold">
                      Demo Dataset
                    </span>
                  ) : (
                    <span className="badge-verified text-[10px] px-1.5 py-0.5 rounded font-bold">
                      Owner Submission
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                    l.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {l.status}
                  </span>
                </div>

                <div className="text-slate-500">
                  Locality: <span className="font-semibold text-slate-700">{l.locality}</span> • Owner: <span className="font-semibold text-slate-700">{l.owner_name || 'Suresh Patil'}</span>
                </div>

                <div className="text-slate-600">
                  Rent: ₹{l.monthly_rent_inr.toLocaleString('en-IN')}/mo • Deposit: ₹{l.security_deposit_inr.toLocaleString('en-IN')} • Food: {l.food_plan}
                </div>
              </div>
            </div>

            {/* Admin Moderation Actions */}
            <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0">
              <Link
                to={`/pgs/${l.id}`}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg font-semibold transition"
              >
                Inspect
              </Link>
              {l.status !== 'active' ? (
                <button
                  onClick={() => handleApprove(l.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg font-bold transition flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Approve Listing
                </button>
              ) : (
                <button
                  onClick={() => handleReject(l.id)}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 px-3 py-2 rounded-lg font-bold transition flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Pause / Flag
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
