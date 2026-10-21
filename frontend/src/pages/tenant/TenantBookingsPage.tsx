import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle, 
  CreditCard,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { Booking } from '../../types';

export const TenantBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const { bookings, updateBookingStatus } = useStore();
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of university/job location');

  const userBookings = bookings.filter((b) => b.tenant_id === user?.id || b.tenant_email === user?.email);

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    if (cancelModalBooking) {
      updateBookingStatus(cancelModalBooking.id, 'cancelled', cancelReason);
      setCancelModalBooking(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
            <Link to="/tenant/dashboard" className="hover:text-teal-700">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Bookings</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-teal-600" />
            My Bookings & Invoices
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track reservation confirmations, verified deposit invoices, and cancellation terms
          </p>
        </div>

        <Link
          to="/legal/cancellation"
          className="text-xs text-slate-500 hover:text-teal-700 flex items-center gap-1"
        >
          <HelpCircle className="w-4 h-4" /> Pune PG Cancellation Policy
        </Link>
      </div>

      {userBookings.length > 0 ? (
        <div className="space-y-6">
          {userBookings.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">Booking ID:</span>
                  <span className="font-mono text-slate-600 bg-white px-2 py-0.5 rounded border">{b.id}</span>
                  <span className="text-slate-400">• Placed on {new Date(b.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                    b.status === 'confirmed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : b.status === 'pending'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {b.status}
                  </span>
                  <span className="bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                    Payment: {b.payment_status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                {/* Accommodation specs */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Reserved Property</span>
                  <Link to={`/pgs/${b.listing_id}`} className="font-bold text-base text-slate-900 hover:text-teal-700 block">
                    {b.listing_name}
                  </Link>
                  <div className="text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    {b.locality}, Pune
                  </div>
                  <div className="text-slate-500 pt-1">
                    Sharing Type: <span className="font-semibold text-slate-800">{b.room_type}</span>
                  </div>
                  <div className="text-slate-500">
                    Move-in Date: <span className="font-semibold text-slate-800">{b.move_in_date}</span> ({b.stay_months} mos stay)
                  </div>
                </div>

                {/* Pricing Breakdown Snapshot */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Cost Snapshot</span>
                  <div className="flex justify-between text-slate-600">
                    <span>Monthly Quoted Rent:</span>
                    <span className="font-bold text-slate-800">₹{b.quoted_monthly_rent_inr.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Security Deposit (Refundable):</span>
                    <span className="font-bold text-slate-800">₹{b.quoted_deposit_inr.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Platform Verification:</span>
                    <span className="font-bold text-slate-800">₹{b.quoted_platform_fee_inr}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-1.5 flex justify-between font-extrabold text-teal-900 text-sm">
                    <span>Total Initial Paid:</span>
                    <span>₹{b.total_initial_payable_inr.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Next Steps & Actions */}
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Check-in Instructions</span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Present your government ID (Aadhaar/PAN) and this confirmation receipt at the property manager desk on your move-in date.
                    </p>
                    {b.cancellation_reason && (
                      <div className="mt-2 p-2 bg-rose-50 text-rose-800 rounded text-[11px]">
                        Cancellation note: {b.cancellation_reason}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    {b.status !== 'cancelled' && (
                      <button
                        onClick={() => setCancelModalBooking(b)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                      >
                        Request Cancellation
                      </button>
                    )}
                    <Link
                      to="/tenant/reviews/new"
                      className="ml-auto bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-xs hover:shadow transition"
                    >
                      Write Review
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">No Bookings Yet</h3>
          <p className="text-xs text-slate-500">
            You don't have any pending or confirmed bookings in Pune yet.
          </p>
          <div className="pt-2">
            <Link
              to="/pgs"
              className="bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg inline-block"
            >
              Explore Available PGs
            </Link>
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl text-xs">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-slate-900 text-base">Cancel Booking Request</h3>
              <button onClick={() => setCancelModalBooking(null)} className="text-slate-400 font-bold">✕</button>
            </div>
            <p className="text-slate-600">
              Are you sure you wish to cancel your booking for <span className="font-bold text-slate-800">{cancelModalBooking.listing_name}</span>?
            </p>
            <form onSubmit={handleCancel} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason for Cancellation</label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Change of university/job location">Change of university/job location</option>
                  <option value="Found alternate accommodation closer to campus">Found alternate accommodation closer to campus</option>
                  <option value="Personal / Medical reasons">Personal / Medical reasons</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setCancelModalBooking(null)}
                  className="px-3 py-1.5 border rounded-lg"
                >
                  Keep Booking
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700"
                >
                  Confirm Cancellation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
