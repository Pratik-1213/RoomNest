import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, XCircle, MapPin, User, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';

export const OwnerBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus } = useStore();
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
            <Link to="/owner/dashboard" className="hover:text-teal-700">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Bookings</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-600" />
            Booking Requests & Approvals ({bookings.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Accept or decline tenant reservations and manage verification states
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="font-bold text-slate-900 text-sm">Tenant: {b.tenant_name}</span>
                <span className="text-slate-500 ml-2">({b.tenant_phone} • {b.tenant_email})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                  b.status === 'confirmed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : b.status === 'pending'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  Status: {b.status}
                </span>
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded font-semibold text-[10px]">
                  Payment: {b.payment_status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Property</span>
                <div className="font-bold text-slate-900">{b.listing_name}</div>
                <div className="text-slate-500">{b.locality}, Pune • {b.room_type}</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Move-in Schedule</span>
                <div className="font-semibold text-slate-800">Move-in Date: {b.move_in_date}</div>
                <div className="text-slate-500">Duration: {b.stay_months} months commitment</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Financials</span>
                <div className="font-bold text-slate-900">₹{b.quoted_monthly_rent_inr.toLocaleString('en-IN')}/mo</div>
                <div className="text-slate-500">Deposit: ₹{b.quoted_deposit_inr.toLocaleString('en-IN')}</div>
              </div>
            </div>

            {/* Owner Actions */}
            {b.status === 'pending' && (
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => updateBookingStatus(b.id, 'rejected', 'Room unavailable for requested move-in date')}
                  className="px-3 py-1.5 border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold rounded-lg transition"
                >
                  Decline Request
                </button>
                <button
                  onClick={() => updateBookingStatus(b.id, 'confirmed')}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Accept & Confirm Bed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
