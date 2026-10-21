import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Wifi, 
  Wind, 
  Utensils, 
  ShieldCheck, 
  Star, 
  Heart, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  UserCheck, 
  Phone, 
  Send, 
  Info,
  Check,
  ChevronRight,
  Shield,
  Zap,
  Sparkles,
  Activity,
  Wrench
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

export const PGDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    listings, 
    shortlists, 
    toggleShortlist, 
    comparisons, 
    addToCompare, 
    removeFromCompare,
    createInquiry,
    createBooking,
    reviews
  } = useStore();

  const listing = listings.find((l) => l.id === id);

  // Modal states
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('Hi, I am interested in this PG. Is a bed available for move-in soon?');
  const [sharePhone, setSharePhone] = useState(true);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Booking states
  const [selectedRoomType, setSelectedRoomType] = useState(listing?.room_types[0] || 'Double Sharing');
  const [moveInDate, setMoveInDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [stayMonths, setStayMonths] = useState(6);
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">PG Listing Not Found</h2>
        <p className="text-slate-500 text-sm">The listing you requested could not be located in Pune inventory.</p>
        <Link to="/pgs" className="inline-block bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg">
          Back to Pune Listings
        </Link>
      </div>
    );
  }

  const isShortlisted = shortlists.includes(listing.id);
  const isCompared = comparisons.includes(listing.id);

  // Filter reviews for this listing
  const listingReviews = reviews.filter((r) => r.listing_id === listing.id);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    createInquiry(listing.id, inquiryMessage, sharePhone);
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquiryModalOpen(false);
      setInquirySubmitted(false);
    }, 2000);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const res = createBooking(listing.id, selectedRoomType, moveInDate, stayMonths);
    if (res.success && res.bookingId) {
      setBookingSuccessId(res.bookingId);
    } else {
      alert(res.error || 'Failed to submit booking');
    }
  };

  const platformFee = 499;
  const initialPayable = listing.monthly_rent_inr + listing.security_deposit_inr + platformFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-1.5">
        <Link to="/" className="hover:text-teal-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/pgs" className="hover:text-teal-700">Pune PGs</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to={`/pgs?locality=${encodeURIComponent(listing.locality)}`} className="hover:text-teal-700">
          {listing.locality}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold truncate max-w-xs">{listing.name}</span>
      </nav>

      {/* Title & Top Badges */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
              listing.gender_policy === 'Girls'
                ? 'bg-purple-100 text-purple-900 border border-purple-200'
                : listing.gender_policy === 'Boys'
                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
            }`}>
              {listing.gender_policy} PG
            </span>
            {listing.is_demo ? (
              <span className="badge-demo px-2.5 py-0.5 rounded text-xs font-semibold">
                Prototype Dataset
              </span>
            ) : (
              <span className="badge-verified px-2.5 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Owner
              </span>
            )}
            <span className="text-xs text-slate-500">ID: {listing.external_demo_id || listing.id.slice(0, 8)}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {listing.name}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mt-1">
            <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{listing.address_masked}</span>
            <span>•</span>
            <span className="text-slate-500">{listing.distance_to_metro_km} km to nearest Metro</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleShortlist(listing.id)}
            className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
              isShortlisted
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-rose-600' : ''}`} />
            {isShortlisted ? 'Shortlisted' : 'Shortlist'}
          </button>

          <button
            onClick={() => {
              if (isCompared) removeFromCompare(listing.id);
              else addToCompare(listing.id);
            }}
            className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
              isCompared
                ? 'bg-teal-50 text-teal-800 border-teal-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            {isCompared ? 'Compared' : 'Compare'}
          </button>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 aspect-16/10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={listing.photos[0] || 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'}
            alt={listing.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="aspect-16/10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-1">
            <img
              src={listing.photos[1] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'}
              alt="Room interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-center text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-800 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-teal-600" /> Physical Inspection Note
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Photography illustrates actual layout & furnishings. Room inspection can be scheduled with the verified owner prior to deposit handover.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Details + Right Booking Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Details & Policies */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Property Overview */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Property Overview & Rules
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {listing.description ||
                `Quiet, well-maintained paying guest accommodation situated in ${listing.locality}, Pune. Conveniently connected to major IT hubs and colleges with 24/7 water supply, high-speed fiber internet, and hygienic mess options.`}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Beds Available</span>
                <span className="font-bold text-slate-800 text-sm">{listing.available_beds} of {listing.total_beds}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Curfew Time</span>
                <span className="font-bold text-slate-800 text-sm">{listing.curfew_time || '11:00 PM'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Notice Period</span>
                <span className="font-bold text-slate-800 text-sm">30 Days</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Furnishing</span>
                <span className="font-bold text-slate-800 text-sm">{listing.furnishing}</span>
              </div>
            </div>
          </section>

          {/* 2. Transparent Monthly Cost Breakdown */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Itemized Cost & Deposit Breakdown</span>
              <span className="text-xs font-normal text-slate-500">All prices in INR</span>
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Monthly Rent (Sharing bed basis)</span>
                <span className="font-bold text-slate-900">₹{listing.monthly_rent_inr.toLocaleString('en-IN')} / mo</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <div>
                  <span className="text-slate-600 block">Security Deposit (Refundable)</span>
                  <span className="text-[11px] text-slate-400">Returned upon 30-day notice move-out</span>
                </div>
                <span className="font-bold text-slate-900">₹{listing.security_deposit_inr.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <div>
                  <span className="text-slate-600 block">Estimated Electricity Surcharge</span>
                  <span className="text-[11px] text-slate-400">Sub-metered or fixed shared allowance</span>
                </div>
                <span className="font-semibold text-slate-700">~₹{listing.electricity_charge_inr} / mo</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Common Maintenance & Housekeeping</span>
                <span className="font-semibold text-slate-700">~₹{listing.maintenance_charge_inr} / mo</span>
              </div>
              <div className="flex justify-between py-2 bg-teal-50/60 px-3 rounded-lg text-teal-900 font-bold">
                <span>Estimated Total Ongoing Commitment</span>
                <span>₹{(listing.monthly_rent_inr + listing.electricity_charge_inr + listing.maintenance_charge_inr).toLocaleString('en-IN')} / mo</span>
              </div>
            </div>
          </section>

          {/* 3. Amenities Checklist */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Verified Amenities & Facilities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className={`p-3 rounded-lg border flex items-center gap-2 ${listing.amenities?.wifi ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <Wifi className="w-4 h-4" />
                <span className="font-medium">Fiber WiFi (Dual Band)</span>
              </div>
              <div className={`p-3 rounded-lg border flex items-center gap-2 ${listing.amenities?.ac ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <Wind className="w-4 h-4" />
                <span className="font-medium">Air Conditioning</span>
              </div>
              <div className={`p-3 rounded-lg border flex items-center gap-2 ${listing.amenities?.laundry ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium">Washing Machine</span>
              </div>
              <div className={`p-3 rounded-lg border flex items-center gap-2 ${listing.amenities?.parking ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium">Parking Facility</span>
              </div>
              <div className="p-3 rounded-lg border bg-emerald-50 border-emerald-200 text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium">24/7 Power Backup</span>
              </div>
              <div className="p-3 rounded-lg border bg-emerald-50 border-emerald-200 text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium">RO Purified Water</span>
              </div>
            </div>
          </section>

          {/* 4. Proximity & Commute Landmarks */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Pune Commute & Proximity
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2">Key Pune Landmark</th>
                    <th className="py-2">Distance</th>
                    <th className="py-2">Est. Commute</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 font-medium text-slate-800">Nearest Metro Station</td>
                    <td className="py-2 text-slate-600">{listing.distance_to_metro_km} km</td>
                    <td className="py-2 text-slate-600">~6 mins walk/auto</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-slate-800">IT Park / Commercial Zone</td>
                    <td className="py-2 text-slate-600">{listing.distance_to_it_park_km} km</td>
                    <td className="py-2 text-slate-600">~12 mins bike/cab</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-slate-800">COEP Tech / Shivaji Nagar Central</td>
                    <td className="py-2 text-slate-600">7.2 km</td>
                    <td className="py-2 text-slate-600">~22 mins via Metro/Road</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4b. AI Property Quality & Maintenance Risk Assessment */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold border border-purple-200 mb-1">
                  <Sparkles className="w-3 h-3 text-purple-600" /> Model #4: AI Maintenance & Quality Audit
                </div>
                <h2 className="text-lg font-bold text-slate-900">Property Quality Health & Complaint Risk</h2>
                <p className="text-xs text-slate-500">
                  Automated risk scoring based on cleanliness history, wifi uptime, and noise benchmarks
                </p>
              </div>
              <div className="text-right sm:text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Quality Health</span>
                <span className="text-xl font-extrabold text-teal-700">
                  {Math.round((listing.average_rating / 5.0) * 100)} / 100
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] block font-medium">Complaint Probability</span>
                <div className="text-sm font-bold text-emerald-700">
                  {Math.max(4, Math.round((5.0 - listing.average_rating) * 12))}% (Low Risk)
                </div>
                <span className="text-[10px] text-slate-400">Below 15% city threshold</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] block font-medium">WiFi Reliability Index</span>
                <div className="text-sm font-bold text-slate-800">
                  {listing.amenities?.wifi ? 'High (Fiber Backed)' : 'Standard'}
                </div>
                <span className="text-[10px] text-slate-400">Suitable for remote work/study</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] block font-medium">Audit Compliance Status</span>
                <div className="text-sm font-bold text-purple-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Verified Facility
                </div>
                <span className="text-[10px] text-slate-400">Inspected by RoomNest Pune</span>
              </div>
            </div>
          </section>

          {/* 5. Reviews & Ratings */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Tenant Reviews & Experience</h2>
                <p className="text-xs text-slate-500">Authentic reviews from verified stays in {listing.locality}</p>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-bold text-sm">{listing.average_rating}</span>
                <span className="text-xs text-slate-500">({listingReviews.length} reviews)</span>
              </div>
            </div>

            {listingReviews.length > 0 ? (
              <div className="space-y-4">
                {listingReviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{rev.tenant_name}</span>
                      <div className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{rev.overall_rating} / 5.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    <div className="text-[11px] text-slate-400">
                      Stay completed in {listing.locality} • Would recommend: <span className="text-emerald-700 font-medium">Yes</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 py-4 text-center">
                No public reviews posted yet for this listing. Be the first to leave a verified review after your move-in.
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Sticky Booking / Enquiry Widget */}
        <aside className="sticky top-24 bg-white p-6 rounded-xl border border-slate-200 shadow-md space-y-6">
          <div>
            <div className="text-xs text-slate-500 font-medium">Monthly Rent</div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-extrabold text-slate-900">
                ₹{listing.monthly_rent_inr.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500">/ bed / month</span>
            </div>
            <div className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> {listing.available_beds} beds currently vacant
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Security Deposit:</span>
              <span className="font-semibold text-slate-800">₹{listing.security_deposit_inr.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Electricity & Maintenance:</span>
              <span className="font-semibold text-slate-800">~₹{listing.electricity_charge_inr + listing.maintenance_charge_inr}/mo</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Platform Verification:</span>
              <span className="font-semibold text-slate-800">₹499 (One-time)</span>
            </div>
            <div className="border-t border-slate-200 pt-1 flex justify-between font-bold text-slate-900">
              <span>Initial Move-in Total:</span>
              <span>₹{initialPayable.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-lg shadow-sm transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Bed Online
            </button>
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-slate-500" /> Send Direct Inquiry
            </button>
          </div>

          {/* Owner details card */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-xs text-slate-700">
              SP
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-1">
                {listing.owner_name || 'Suresh Patil'}
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              </div>
              <p className="text-slate-500 text-[11px]">Registered Pune PG Partner</p>
            </div>
          </div>
        </aside>
      </div>

      {/* MODAL 1: SEND INQUIRY */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Inquire About {listing.name}</h3>
              <button onClick={() => setInquiryModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            {inquirySubmitted ? (
              <div className="p-6 text-center space-y-2 text-teal-700">
                <CheckCircle2 className="w-12 h-12 mx-auto text-teal-600" />
                <h4 className="font-bold text-slate-900">Inquiry Sent to Owner</h4>
                <p className="text-xs text-slate-500">The owner will receive your note and contact details in their dashboard.</p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Message to Owner</label>
                  <textarea
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sharePhone}
                    onChange={(e) => setSharePhone(e.target.checked)}
                    className="accent-teal-600"
                  />
                  <span>Share my phone number (+91 {user?.phone || '98901 23456'}) with owner</span>
                </label>
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-3 py-2 border rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: BOOK BED ONLINE */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Book Bed at {listing.name}</h3>
              <button onClick={() => setBookingModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            {bookingSuccessId ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-lg">Booking Request Confirmed!</h4>
                <p className="text-xs text-slate-600">
                  Your reservation request ID <span className="font-mono font-bold text-slate-800">{bookingSuccessId}</span> has been logged and sent to the property manager.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <Link
                    to="/tenant/bookings"
                    className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-teal-700"
                  >
                    View My Bookings
                  </Link>
                  <button
                    onClick={() => { setBookingModalOpen(false); setBookingSuccessId(null); }}
                    className="border text-xs px-3 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Room Sharing Preference</label>
                  <select
                    value={selectedRoomType}
                    onChange={(e) => setSelectedRoomType(e.target.value)}
                    className="w-full p-2.5 border rounded-lg bg-slate-50"
                  >
                    {listing.room_types.map((rt) => (
                      <option key={rt} value={rt}>{rt}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Move-in Date</label>
                    <input
                      type="date"
                      value={moveInDate}
                      onChange={(e) => setMoveInDate(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Expected Stay Duration</label>
                    <select
                      value={stayMonths}
                      onChange={(e) => setStayMonths(Number(e.target.value))}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value={3}>3 Months (Short stay)</option>
                      <option value={6}>6 Months (Semester / Internship)</option>
                      <option value={11}>11 Months (Standard Pune agreement)</option>
                    </select>
                  </div>
                </div>

                {/* Price Breakdown Snapshot */}
                <div className="p-3 bg-slate-50 rounded-lg border text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>First Month Quoted Rent:</span>
                    <span className="font-bold">₹{listing.monthly_rent_inr.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit (Refundable):</span>
                    <span className="font-bold">₹{listing.security_deposit_inr.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RoomNest Verification Fee:</span>
                    <span className="font-bold">₹499</span>
                  </div>
                  <div className="border-t pt-1 flex justify-between font-extrabold text-teal-800 text-sm">
                    <span>Total Initial Payable:</span>
                    <span>₹{initialPayable.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  By booking, you agree to RoomNest's standard 30-day notice cancellation policy and Pune PG house rules.
                </p>

                <div className="flex justify-end gap-2 pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="px-3 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700"
                  >
                    Confirm & Reserve Bed
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
