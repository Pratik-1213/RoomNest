import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Heart, 
  Calendar, 
  Send, 
  MapPin, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Building2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { ListingCard } from '../../components/common/ListingCard';

export const TenantDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { listings, shortlists, bookings, inquiries } = useStore();

  const userBookings = bookings.filter((b) => b.tenant_id === user?.id || b.tenant_email === user?.email);
  const userInquiries = inquiries.filter((i) => i.tenant_id === user?.id || i.tenant_name === user?.full_name);
  const shortlistedListings = listings.filter((l) => shortlists.includes(l.id));

  // Top recommendations in Hinjewadi & Kothrud
  const recommendations = listings.filter((l) => l.status === 'active').slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-teal-900/80 text-teal-300 border border-teal-700 px-3 py-0.5 rounded-full text-xs font-semibold">
            <span>Tenant Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.full_name || 'Tanmay'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {user?.bio || 'COEP Student & Tech Intern. Hinjewadi Phase 1 preference.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/tenant/shortlists"
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-4 rounded-lg border border-white/20 transition flex items-center gap-1.5"
          >
            <Heart className="w-4 h-4 text-rose-400" />
            Shortlists ({shortlists.length})
          </Link>
          <Link
            to="/pgs"
            className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition flex items-center gap-1.5 shadow-sm"
          >
            Browse More PGs
          </Link>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Active Bookings</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{userBookings.length}</div>
            <Link to="/tenant/bookings" className="text-xs font-semibold text-teal-700 hover:underline mt-1 inline-block">
              View booking status &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Saved Shortlists</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{shortlists.length}</div>
            <Link to="/tenant/shortlists" className="text-xs font-semibold text-teal-700 hover:underline mt-1 inline-block">
              Manage saved PGs &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Inquiries Sent</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{userInquiries.length}</div>
            <span className="text-xs text-slate-500 mt-1 inline-block">Direct owner messaging</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Send className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Active Booking Tracker */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">Your Booking Ledger</h2>
          <Link to="/tenant/bookings" className="text-xs font-semibold text-teal-700 hover:underline">
            View All Details
          </Link>
        </div>

        {userBookings.length > 0 ? (
          <div className="space-y-3">
            {userBookings.map((b) => (
              <div key={b.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm">{b.listing_name}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-slate-500">
                    Locality: <span className="text-slate-700 font-medium">{b.locality}</span> • Room: <span className="text-slate-700 font-medium">{b.room_type}</span> • Move-in: <span className="text-slate-700 font-medium">{b.move_in_date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-slate-500 text-[11px]">Monthly Rent</div>
                    <div className="font-bold text-slate-900 text-sm">₹{b.quoted_monthly_rent_inr.toLocaleString('en-IN')}/mo</div>
                  </div>
                  <Link
                    to="/tenant/reviews/new"
                    className="bg-slate-900 hover:bg-teal-700 text-white font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    Leave Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">No active bookings yet. Browse PGs to reserve a bed.</p>
        )}
      </section>

      {/* Shortlisted PGs Preview */}
      {shortlistedListings.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Your Shortlisted PGs</h2>
            <Link to="/tenant/shortlists" className="text-xs font-semibold text-teal-700 hover:underline">
              View All ({shortlists.length})
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortlistedListings.slice(0, 3).map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>
      )}

      {/* Recommended Accommodations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recommended for Students & Interns</h2>
            <p className="text-xs text-slate-500">Matches your Hinjewadi / Kothrud preferences</p>
          </div>
          <Link to="/pgs" className="text-xs font-semibold text-teal-700 hover:underline">
            Explore All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>
    </div>
  );
};
