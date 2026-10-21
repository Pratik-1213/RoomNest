import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  PlusCircle, 
  Send, 
  Calendar, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Bed, 
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

export const OwnerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { listings, inquiries, bookings, updateListing } = useStore();

  // Filter listings owned by Suresh Patil / current user
  const ownerListings = listings.filter((l) => l.owner_id === user?.id || l.owner_name?.includes('Suresh') || !l.is_demo);
  const ownerInquiries = inquiries.filter((i) => i.owner_id === user?.id || ownerListings.some((l) => l.id === i.listing_id));
  const ownerBookings = bookings.filter((b) => b.owner_id === user?.id || ownerListings.some((l) => l.id === b.listing_id));

  // Compute metrics
  const totalBeds = ownerListings.reduce((sum, l) => sum + (l.total_beds || 0), 0);
  const vacantBeds = ownerListings.reduce((sum, l) => sum + (l.available_beds || 0), 0);
  const occupiedBeds = totalBeds - vacantBeds;
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
  const monthlyEstCollection = occupiedBeds * 9500;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-emerald-900">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-900/80 text-emerald-300 border border-emerald-700 px-3 py-0.5 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Property Partner • Pune Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {user?.full_name || 'Suresh Patil'} Stays Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Managing executive PG inventory in Wakad, Kothrud & Baner corridors.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/owner/listings/new"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" /> Add New PG Listing
          </Link>
          <Link
            to="/owner/inquiries"
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-4 rounded-lg border border-white/20 transition flex items-center gap-1.5"
          >
            <Send className="w-4 h-4 text-emerald-400" /> Inquiries ({ownerInquiries.length})
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold uppercase">
            <span>Occupancy Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{occupancyRate}%</div>
          <div className="text-xs text-slate-500 mt-1">
            {occupiedBeds} occupied / {totalBeds} total beds
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold uppercase">
            <span>Vacant Beds</span>
            <Bed className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-extrabold text-teal-700 mt-2">{vacantBeds}</div>
          <div className="text-xs text-slate-500 mt-1">
            Across {ownerListings.length} managed properties
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold uppercase">
            <span>Booking Requests</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{ownerBookings.length}</div>
          <Link to="/owner/bookings" className="text-xs font-semibold text-purple-700 hover:underline mt-1 inline-block">
            Review tenant bookings &rarr;
          </Link>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold uppercase">
            <span>Projected Monthly</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            ₹{monthlyEstCollection.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500 mt-1">Based on active tenants</div>
        </div>
      </div>

      {/* Managed Listings Quick Table */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Your Pune PG Properties</h2>
            <p className="text-xs text-slate-500">Live availability and bed vacancy manager</p>
          </div>
          <Link to="/owner/listings" className="text-xs font-semibold text-teal-700 hover:underline">
            Manage All Listings
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                <th className="py-2.5">Property Name</th>
                <th className="py-2.5">Locality</th>
                <th className="py-2.5">Monthly Rent</th>
                <th className="py-2.5">Available Beds</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ownerListings.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/50">
                  <td className="py-3 font-bold text-slate-900">
                    <Link to={`/pgs/${l.id}`} className="hover:text-teal-700">
                      {l.name}
                    </Link>
                    {l.is_demo && (
                      <span className="badge-demo text-[10px] ml-1.5 px-1.5 py-0.2 rounded font-semibold">
                        Demo
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-slate-600">{l.locality}</td>
                  <td className="py-3 font-semibold text-slate-800">₹{l.monthly_rent_inr.toLocaleString('en-IN')}/mo</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{l.available_beds} beds</span>
                      <button
                        onClick={() => updateListing(l.id, { available_beds: Math.max(0, l.available_beds - 1) })}
                        className="w-5 h-5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-bold flex items-center justify-center text-xs"
                        title="Decrement available bed"
                      >
                        -
                      </button>
                      <button
                        onClick={() => updateListing(l.id, { available_beds: l.available_beds + 1 })}
                        className="w-5 h-5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-bold flex items-center justify-center text-xs"
                        title="Increment available bed"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      l.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : l.status === 'paused'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {l.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      to={`/owner/listings/${l.id}/edit`}
                      className="text-teal-700 hover:underline font-semibold"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Inquiries preview */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Tenant Inquiries</h2>
            <p className="text-xs text-slate-500">Incoming inquiries from students and interns looking for beds</p>
          </div>
          <Link to="/owner/inquiries" className="text-xs font-semibold text-teal-700 hover:underline">
            View All Inquiries
          </Link>
        </div>

        {ownerInquiries.length > 0 ? (
          <div className="space-y-3">
            {ownerInquiries.slice(0, 3).map((inq) => (
              <div key={inq.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-800">{inq.tenant_name}</span>
                    <span className="text-slate-400">• For {inq.listing_name}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${inq.status === 'replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                      {inq.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-600 italic">"{inq.message}"</p>
                </div>
                <Link
                  to="/owner/inquiries"
                  className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold px-3 py-1.5 rounded-lg text-center transition"
                >
                  Reply
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">No active inquiries at this moment.</p>
        )}
      </section>
    </div>
  );
};
