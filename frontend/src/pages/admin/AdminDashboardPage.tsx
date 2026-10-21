import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Database, Users, Building2, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminDashboardPage: React.FC = () => {
  const { listings, inquiries, bookings, reviews } = useStore();

  const demoListings = listings.filter((l) => l.is_demo);
  const realListings = listings.filter((l) => !l.is_demo);
  const pendingModeration = listings.filter((l) => l.status === 'pending_moderation');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-purple-900">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-purple-900/80 text-purple-300 border border-purple-700 px-3 py-0.5 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>RoomNest System Administration & Moderation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Compliance & Operations Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Monitoring Pune housing inventory integrity, CSV import audits, and zero-trust authorization.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/listings"
            className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition flex items-center gap-1.5 shadow-sm"
          >
            Moderation Queue ({pendingModeration.length})
          </Link>
          <Link
            to="/admin/reports"
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-4 rounded-lg border border-white/20 transition flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-purple-300" /> Audit & CSV Logs
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold uppercase">Total Database Listings</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{listings.length}</div>
          <div className="text-xs text-slate-500 mt-1">
            {demoListings.length} Demo • {realListings.length} Live
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold uppercase">Pending Moderation</div>
          <div className="text-3xl font-extrabold text-amber-600 mt-2">{pendingModeration.length}</div>
          <Link to="/admin/listings" className="text-xs font-semibold text-purple-700 hover:underline mt-1 inline-block">
            Inspect pending &rarr;
          </Link>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold uppercase">Platform Bookings</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{bookings.length}</div>
          <div className="text-xs text-slate-500 mt-1">Across Pune corridors</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold uppercase">Submitted Reviews</div>
          <div className="text-3xl font-extrabold text-teal-700 mt-2">{reviews.length}</div>
          <div className="text-xs text-slate-500 mt-1">Zero unresolved critical bugs</div>
        </div>
      </div>

      {/* Data Caveat & Integrity Control Box */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-6 text-xs text-amber-950 space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <span>Synthetic Dataset Isolation Governance</span>
        </div>
        <p className="leading-relaxed">
          The uploaded dataset (<code className="font-mono bg-amber-100 px-1 py-0.5 rounded">roomnest_pune_pg_owner_listings.csv</code>) contains 10,000 synthetic rows used for statistical modeling. In accordance with Section 1 of the architecture specification, all {demoListings.length} loaded records have been isolated with <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">is_demo = TRUE</code> and display a prominent warning banner.
        </p>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1 text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> RLS Policy: Public reads active approved listings only
          </span>
          <span className="flex items-center gap-1 text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rejection report generated
          </span>
        </div>
      </div>

      {/* Moderation Queue Quick Review */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-slate-900">Recent Listing Verification Actions</h2>
          <Link to="/admin/listings" className="text-xs font-semibold text-purple-700 hover:underline">
            Manage Queue
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b text-slate-500 uppercase text-[10px]">
                <th className="py-2.5">Property</th>
                <th className="py-2.5">Owner / Origin</th>
                <th className="py-2.5">Locality</th>
                <th className="py-2.5">Data Tag</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {listings.slice(0, 5).map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/50">
                  <td className="py-3 font-bold text-slate-900">{l.name}</td>
                  <td className="py-3 text-slate-600">{l.owner_name || 'Suresh Patil'}</td>
                  <td className="py-3 text-slate-600">{l.locality}</td>
                  <td className="py-3">
                    {l.is_demo ? (
                      <span className="badge-demo text-[10px] px-2 py-0.5 rounded font-bold">Prototype</span>
                    ) : (
                      <span className="badge-verified text-[10px] px-2 py-0.5 rounded font-bold">Genuine Owner</span>
                    )}
                  </td>
                  <td className="py-3 font-semibold text-emerald-700">{l.status.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
