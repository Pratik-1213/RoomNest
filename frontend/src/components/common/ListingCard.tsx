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
    <div className="bg-white rounded-xl border border-[#E1E6EB] overflow-hidden shadow-2xs hover:shadow-md hover:border-[#142B45]/30 transition duration-200 flex flex-col group">
      {/* Top Image & Badges */}
      <div className="relative aspect-16/10 bg-[#E8EDF2] overflow-hidden">
        <img
          src={coverPhoto}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
          loading="lazy"
        />

        {/* Gender Policy & Trust Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 max-w-[70%] flex-wrap">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide shrink-0 bg-[#FFFFFF]/90 text-[#142B45] border border-[#E1E6EB] shadow-2xs backdrop-blur-xs">
            {listing.gender_policy} PG
          </span>

          <span className="bg-[#EBF8F4] text-[#237A57] border border-[#A3E0CC] px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 shrink-0 shadow-2xs">
            <ShieldCheck className="w-3 h-3 text-[#237A57]" /> Inspected
          </span>
        </div>

        {/* Heart Shortlist Action */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleShortlist(listing.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition shadow-2xs z-10 ${
            isShortlisted
              ? 'bg-[#FEF3F2] text-[#B42318] hover:bg-rose-100'
              : 'bg-white/90 backdrop-blur-xs text-[#667085] hover:text-[#B42318] hover:bg-white border border-[#E1E6EB]'
          }`}
          title={isShortlisted ? 'Remove from saved' : 'Save accommodation'}
          aria-label="Toggle shortlist"
        >
          <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-[#B42318]' : ''}`} />
        </button>

        {/* Clean bottom image overlays with strict sizing */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-2">
          <div className="bg-white/95 text-[#243244] text-[11px] font-semibold px-2 py-0.5 rounded shadow-2xs truncate max-w-[65%] border border-[#E1E6EB]">
            {listing.room_types[0] || 'Room'}
          </div>
          <div className="bg-[#142B45] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs shrink-0">
            {listing.available_beds} {listing.available_beds === 1 ? 'bed' : 'beds'}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Locality */}
          <div className="flex items-center justify-between text-xs text-[#667085] mb-1 gap-2">
            <span className="flex items-center gap-1 font-medium text-[#243244] truncate">
              <MapPin className="w-3.5 h-3.5 text-[#168C83] shrink-0" />
              <span className="truncate">{listing.locality}, Pune</span>
            </span>
            <div className="flex items-center gap-1 bg-[#F7F5F0] text-[#142B45] px-1.5 py-0.5 rounded border border-[#E1E6EB] font-semibold text-[11px] shrink-0">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{listing.average_rating}</span>
              <span className="text-[#667085] font-normal">({listing.review_count})</span>
            </div>
          </div>

          {/* PG Title */}
          <Link to={`/pgs/${listing.id}`}>
            <h3 className="font-bold text-[#142B45] text-base group-hover:text-[#168C83] transition line-clamp-1 mb-0.5">
              {listing.name}
            </h3>
          </Link>

          <p className="text-xs text-[#667085] line-clamp-1 mb-2.5">
            {listing.landmark}
          </p>

          {/* Amenity highlights */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#667085] mb-3 py-1.5 border-y border-[#E1E6EB]">
            {listing.amenities?.wifi && (
              <span className="flex items-center gap-1 bg-[#F7F5F0] px-2 py-0.5 rounded text-[11px] text-[#243244] border border-[#E1E6EB]/60">
                <Wifi className="w-3 h-3 text-[#667085]" /> Wi-Fi
              </span>
            )}
            {listing.amenities?.ac && (
              <span className="flex items-center gap-1 bg-[#EBF8F4] px-2 py-0.5 rounded text-[11px] text-[#168C83] border border-[#A3E0CC]/60 font-medium">
                <Wind className="w-3 h-3 text-[#168C83]" /> AC
              </span>
            )}
            <span className="flex items-center gap-1 bg-[#F7F5F0] px-2 py-0.5 rounded text-[11px] text-[#243244] truncate border border-[#E1E6EB]/60">
              <Utensils className="w-3 h-3 text-[#168C83] shrink-0" /> {listing.food_plan}
            </span>
          </div>
        </div>

        {/* Pricing Section (Clean & Non-overlapping) */}
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <div>
              <span className="text-xl font-extrabold text-[#142B45] tracking-tight">
                ₹{listing.monthly_rent_inr.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#667085] font-normal"> / mo</span>
            </div>
            <div className="text-right text-[11px] text-[#667085] shrink-0">
              Deposit: <span className="font-semibold text-[#243244]">₹{listing.security_deposit_inr.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#667085] mb-3 gap-2">
            <span className="truncate">Bills: ~₹{listing.electricity_charge_inr + listing.maintenance_charge_inr}/mo</span>
            <span className="shrink-0 font-medium text-[#243244]">{listing.distance_to_metro_km} km to Metro</span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#E1E6EB]">
            <button
              onClick={handleCompareClick}
              className={`flex-1 flex items-center justify-center gap-1 text-xs py-2 px-2.5 rounded-md border font-medium transition ${
                isCompared
                  ? 'bg-[#EBF8F4] text-[#168C83] border-[#A3E0CC]'
                  : 'bg-white text-[#243244] border-[#E1E6EB] hover:bg-[#F7F5F0]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>{isCompared ? 'Added' : 'Compare'}</span>
            </button>

            <Link
              to={`/pgs/${listing.id}`}
              className="flex-1 text-center bg-[#142B45] hover:bg-[#0D1B2A] text-white text-xs font-semibold py-2 px-3 rounded-md shadow-2xs hover:shadow-xs transition"
            >
              View Room
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
