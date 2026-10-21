import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  X, 
  Plus, 
  Check, 
  MapPin, 
  Star, 
  Wifi, 
  Wind, 
  Utensils, 
  Clock, 
  ShieldCheck, 
  BadgeIndianRupee 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ComparePage: React.FC = () => {
  const { comparisons, listings, removeFromCompare, clearCompare } = useStore();

  const comparedListings = listings.filter((l) => comparisons.includes(l.id));

  if (comparedListings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <Layers className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">No PGs Added to Comparison</h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
          You can select up to 4 PG accommodations from search results to compare monthly rent, food plans, and commute proximity side by side.
        </p>
        <Link
          to="/pgs"
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition"
        >
          Browse Pune PGs to Compare
        </Link>
      </div>
    );
  }

  // Find lowest rent listing among compared
  const lowestRent = Math.min(...comparedListings.map(l => l.monthly_rent_inr));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E6EB]">
        <div>
          <h1 className="text-2xl font-bold text-[#142B45] tracking-tight flex items-center gap-2 font-sans">
            <Layers className="w-6 h-6 text-[#168C83]" />
            Compare Pune PG Accommodations
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Comparing <span className="font-semibold text-[#142B45]">{comparedListings.length}</span> properties (up to 4 allowed)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clearCompare}
            className="text-xs font-semibold text-[#B42318] hover:text-rose-700 border border-rose-200 bg-rose-50 px-3 py-1.5 rounded-xl transition"
          >
            Clear Comparison
          </button>
          {comparedListings.length < 4 && (
            <Link
              to="/pgs"
              className="text-xs font-semibold text-[#168C83] hover:text-[#142B45] border border-[#168C83] bg-teal-50 px-3 py-1.5 rounded-xl flex items-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Another PG
            </Link>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-[#E1E6EB] shadow-xs">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E1E6EB] bg-[#F7F5F0]">
              <th className="p-4 w-48 text-[#667085] font-semibold uppercase text-[11px] sticky left-0 bg-[#F7F5F0] z-10">
                Property Details
              </th>
              {comparedListings.map((item) => (
                <th key={item.id} className="p-4 min-w-[240px] align-top">
                  <div className="relative space-y-2">
                    <button
                      onClick={() => removeFromCompare(item.id)}
                      className="absolute -top-1 -right-1 text-[#667085] hover:text-[#B42318] p-1"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={item.photos[0]}
                      alt={item.name}
                      className="w-full h-28 object-cover rounded-xl border border-[#E1E6EB]"
                    />
                    <div>
                      <div className="text-[10px] text-[#168C83] font-bold uppercase tracking-wider">{item.locality}</div>
                      <Link to={`/pgs/${item.id}`} className="font-bold text-[#142B45] hover:text-[#168C83] text-sm line-clamp-1">
                        {item.name}
                      </Link>
                      <div className="text-[11px] text-[#667085] mt-0.5">
                        {item.gender_policy} PG • {item.available_beds} beds left
                      </div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E1E6EB]">
            {/* 1. Monthly Rent */}
            <tr className="bg-[#F7F5F0]/30">
              <td className="p-4 font-bold text-[#142B45] sticky left-0 bg-[#F7F5F0]">
                Monthly Rent (INR)
              </td>
              {comparedListings.map((item) => (
                <td key={item.id} className="p-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-extrabold text-[#142B45]">
                      ₹{item.monthly_rent_inr.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#667085]">/ mo</span>
                  </div>
                  {item.monthly_rent_inr === lowestRent && (
                    <span className="inline-block mt-1 bg-[#EBF8F4] text-[#237A57] border border-[#A7E2CE] text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Lowest Rent
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* 2. Security Deposit */}
            <tr>
              <td className="p-4 font-medium text-[#243244] sticky left-0 bg-white">
                Security Deposit
              </td>
              {comparedListings.map((item) => (
                <td key={item.id} className="p-4 text-[#243244] font-semibold">
                  ₹{item.security_deposit_inr.toLocaleString('en-IN')}
                  <span className="text-[10px] text-[#667085] block font-normal">(Refundable)</span>
                </td>
              ))}
            </tr>

            {/* 3. Monthly Surcharges */}
            <tr>
              <td className="p-4 font-medium text-[#243244] sticky left-0 bg-white">
                Electricity & Maintenance
              </td>
              {comparedListings.map((item) => (
                <td key={item.id} className="p-4 text-[#667085]">
                  ~₹{item.electricity_charge_inr + item.maintenance_charge_inr} / month
                </td>
              ))}
            </tr>

            {/* 4. Initial Commitment */}
            <tr className="bg-[#EBF8F4]/50">
              <td className="p-4 font-bold text-[#142B45] sticky left-0 bg-[#EBF8F4]">
                Initial Move-in Cost
              </td>
              {comparedListings.map((item) => (
                <td key={item.id} className="p-4 font-bold text-[#142B45]">
                  ₹{(item.monthly_rent_inr + item.security_deposit_inr + 499).toLocaleString('en-IN')}
                  <span className="text-[10px] text-[#168C83] block font-normal">Rent + Deposit + Platform fee</span>
                </td>
              ))}
            </tr>

            {/* 5. Food & Mess */}
            <tr>
              <td className="p-4 font-medium text-[#243244] sticky left-0 bg-white">
                Food Plan
              </td>
              {comparedListings.map((item) => (
                <td key={item.id} className="p-4">
                  <span className="font-semibold text-[#142B45] block">{item.food_plan}</span>
                  <span className="text-[11px] text-[#667085]">{item.food_type}</span>
                </td>
              ))}
            </tr>

            {/* 6. Curfew & Gate Timing */}
            <tr>
              <td className="p-4 font-medium text-[#243244] sticky left-0 bg-white">
                Curfew Timing
              </td>
              {comparedListings.map((item) => (
                <td key={item.id} className="p-4 text-[#243244]">
                  {item.curfew_time || 'No Curfew'}
                </td>
              ))}
            </tr>

            {/* 7. Commute & Metro */}
            <tr>
              <td className="p-4 font-medium text-[#243244] sticky left-0 bg-white">
                Commute Distances
              </td>
              {comparedListings.map((item) => (
                <td key={item.id} className="p-4 space-y-1 text-[#667085]">
                  <div>Metro: <span className="font-semibold text-[#142B45]">{item.distance_to_metro_km} km</span></div>
                  <div>IT Park: <span className="font-semibold text-[#142B45]">{item.distance_to_it_park_km} km</span></div>
                </td>
              ))}
            </tr>

            {/* 8. Amenities */}
            <tr>
              <td className="p-4 font-medium text-[#243244] sticky left-0 bg-white">
                Air Conditioning
              </td>
              {comparedListings.map((item) => (
                <td key={item.id} className="p-4">
                  {item.amenities?.ac ? (
                    <span className="text-[#237A57] font-bold flex items-center gap-1"><Check className="w-4 h-4" /> Available</span>
                  ) : (
                    <span className="text-[#667085]">Not Available</span>
                  )}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-medium text-[#243244] sticky left-0 bg-white">
                Washing Machine / Laundry
              </td>
              {comparedListings.map((item) => (
                <td key={item.id} className="p-4">
                  {item.amenities?.laundry ? (
                    <span className="text-[#237A57] font-bold flex items-center gap-1"><Check className="w-4 h-4" /> Available</span>
                  ) : (
                    <span className="text-[#667085]">Self wash only</span>
                  )}
                </td>
              ))}
            </tr>

            {/* 9. Overall Rating */}
            <tr>
              <td className="p-4 font-medium text-[#243244] sticky left-0 bg-white">
                User Rating
              </td>
              {comparedListings.map((item) => (
                <td key={item.id} className="p-4">
                  <div className="flex items-center gap-1 font-bold text-[#142B45]">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{item.average_rating}</span>
                    <span className="text-[#667085] font-normal">({item.review_count} reviews)</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* 10. Action Link */}
            <tr className="bg-[#F7F5F0]/50">
              <td className="p-4 sticky left-0 bg-[#F7F5F0]"></td>
              {comparedListings.map((item) => (
                <td key={item.id} className="p-4">
                  <Link
                    to={`/pgs/${item.id}`}
                    className="block text-center bg-[#142B45] hover:bg-[#0D1B2A] text-white font-bold text-xs py-2 px-3 rounded-xl shadow-xs transition"
                  >
                    View Details
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
