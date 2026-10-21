import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Wifi, 
  Wind, 
  Utensils, 
  Heart, 
  Layers, 
  Star, 
  ShieldCheck, 
  Check, 
  Users, 
  Zap,
  Clock
} from 'lucide-react';
import { PGListing } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ListingCardProps {
  listing: PGListing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { shortlists, toggleShortlist, comparisons, addToCompare, removeFromCompare } = useStore();
  const isShortlisted = shortlists.includes(listing.id);
  const isCompared = comparisons.includes(listing.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCompared) {
      removeFromCompare(listing.id);
    } else {
      addToCompare(listing.id);
    }
  };

  const coverPhoto = listing.photos && listing.photos.length > 0 
    ? listing.photos[0] 
    : 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col group">
      {/* Top Image & Badges */}
      <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
        <img
          src={coverPhoto}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
          loading="lazy"
        />

        {/* Gender Policy & Trust Badge (Max width prevents collision with shortlist heart) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 max-w-[70%] flex-wrap">
          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide shrink-0 ${
            listing.gender_policy === 'Girls'
              ? 'bg-purple-100 text-purple-900 border border-purple-200'
              : listing.gender_policy === 'Boys'
              ? 'bg-blue-100 text-blue-900 border border-blue-200'
              : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
          }`}>
            {listing.gender_policy} PG
          </span>

          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 shrink-0">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Inspected
          </span>
        </div>

        {/* Heart Shortlist Action */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleShortlist(listing.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition shadow-xs z-10 ${
            isShortlisted
              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
              : 'bg-white/90 backdrop-blur-xs text-slate-500 hover:text-rose-600 hover:bg-white'
          }`}
          title={isShortlisted ? 'Remove from shortlists' : 'Save to shortlists'}
          aria-label="Toggle shortlist"
        >
          <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Clean bottom image overlays with strict sizing */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-2">
          <div className="bg-white/95 text-slate-800 text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs truncate max-w-[65%] border border-slate-200">
            {listing.room_types[0] || 'Room'}
          </div>
          <div className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded shadow-xs shrink-0 border border-emerald-200">
            {listing.available_beds} {listing.available_beds === 1 ? 'bed' : 'beds'}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Locality */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 gap-2">
            <span className="flex items-center gap-1 font-medium text-slate-700 truncate">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="truncate">{listing.locality}, Pune</span>
            </span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-1.5 py-0.5 rounded border border-amber-200/60 font-semibold text-[11px] shrink-0">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{listing.average_rating}</span>
              <span className="text-slate-400 font-normal">({listing.review_count})</span>
            </div>
          </div>

          {/* PG Title */}
          <Link to={`/pgs/${listing.id}`}>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition line-clamp-1 mb-0.5">
              {listing.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-1 mb-2.5">
            {listing.landmark}
          </p>

          {/* Amenity highlights */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 mb-3 py-1.5 border-y border-slate-100">
            {listing.amenities?.wifi && (
              <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded text-[11px]">
                <Wifi className="w-3 h-3 text-slate-500" /> Wi-Fi
              </span>
            )}
            {listing.amenities?.ac && (
              <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded text-[11px]">
                <Wind className="w-3 h-3 text-teal-600" /> AC
              </span>
            )}
            <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded text-[11px] truncate">
              <Utensils className="w-3 h-3 text-amber-600 shrink-0" /> {listing.food_plan}
            </span>
          </div>
        </div>

        {/* Pricing Section (Clean & Non-overlapping) */}
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                ₹{listing.monthly_rent_inr.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-medium"> / mo</span>
            </div>
            <div className="text-right text-[11px] text-slate-500 shrink-0">
              Deposit: <span className="font-semibold text-slate-700">₹{listing.security_deposit_inr.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3 gap-2">
            <span className="truncate">Bills: ~₹{listing.electricity_charge_inr + listing.maintenance_charge_inr}/mo</span>
            <span className="shrink-0 font-medium text-slate-600">{listing.distance_to_metro_km} km to Metro</span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleCompareClick}
              className={`flex-1 flex items-center justify-center gap-1 text-xs py-2 px-2.5 rounded-lg border font-medium transition ${
                isCompared
                  ? 'bg-teal-50 text-teal-800 border-teal-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>{isCompared ? 'Added' : 'Compare'}</span>
            </button>

            <Link
              to={`/pgs/${listing.id}`}
              className="flex-1 text-center bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-xs hover:shadow transition"
            >
              View Room
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
