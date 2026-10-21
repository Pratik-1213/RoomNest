import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  Search, 
  MapPin, 
  X, 
  RotateCcw, 
  Filter, 
  Sparkles,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ListingCard } from '../components/common/ListingCard';
import { PGListing } from '../types';

export const PGSearchPage: React.FC = () => {
  const { listings, comparisons } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters from query params or local state
  const [locality, setLocality] = useState(searchParams.get('locality') || 'All');
  const [roomType, setRoomType] = useState(searchParams.get('room_type') || 'All');
  const [genderPolicy, setGenderPolicy] = useState(searchParams.get('gender') || 'All');
  const [foodPlan, setFoodPlan] = useState(searchParams.get('food') || 'All');
  const [maxBudget, setMaxBudget] = useState(Number(searchParams.get('max_budget')) || 25000);
  const [sortBy, setSortBy] = useState('rent_asc'); // rent_asc, rent_desc, rating, proximity

  // Amenity filters
  const [filterWifi, setFilterWifi] = useState(false);
  const [filterAc, setFilterAc] = useState(searchParams.get('ac') === 'true');
  const [filterLaundry, setFilterLaundry] = useState(false);
  const [filterParking, setFilterParking] = useState(false);
  const [nearMetroOnly, setNearMetroOnly] = useState(false);

  // Mobile drawer toggle
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Apply filters
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Status must be active for public browse
      if (item.status !== 'active') return false;

      // Locality
      if (locality !== 'All' && item.locality.toLowerCase() !== locality.toLowerCase()) {
        return false;
      }

      // Room Type
      if (roomType !== 'All' && !item.room_types.some((r) => r.toLowerCase().includes(roomType.toLowerCase()))) {
        return false;
      }

      // Gender Policy
      if (genderPolicy !== 'All' && item.gender_policy.toLowerCase() !== genderPolicy.toLowerCase()) {
        return false;
      }

      // Food Plan
      if (foodPlan !== 'All' && !item.food_plan.toLowerCase().includes(foodPlan.toLowerCase())) {
        return false;
      }

      // Budget
      if (item.monthly_rent_inr > maxBudget) {
        return false;
      }

      // Amenities
      if (filterWifi && !item.amenities?.wifi) return false;
      if (filterAc && !item.amenities?.ac) return false;
      if (filterLaundry && !item.amenities?.laundry) return false;
      if (filterParking && !item.amenities?.parking) return false;

      // Metro Proximity (< 2.0 km)
      if (nearMetroOnly && item.distance_to_metro_km > 2.0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rent_asc') return a.monthly_rent_inr - b.monthly_rent_inr;
      if (sortBy === 'rent_desc') return b.monthly_rent_inr - a.monthly_rent_inr;
      if (sortBy === 'rating') return b.average_rating - a.average_rating;
      if (sortBy === 'proximity') return a.distance_to_metro_km - b.distance_to_metro_km;
      return 0;
    });
  }, [
    listings,
    locality,
    roomType,
    genderPolicy,
    foodPlan,
    maxBudget,
    filterWifi,
    filterAc,
    filterLaundry,
    filterParking,
    nearMetroOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setLocality('All');
    setRoomType('All');
    setGenderPolicy('All');
    setFoodPlan('All');
    setMaxBudget(25000);
    setFilterWifi(false);
    setFilterAc(false);
    setFilterLaundry(false);
    setFilterParking(false);
    setNearMetroOnly(false);
    setSortBy('rent_asc');
    setSearchParams({});
  };

  const hasActiveFilters =
    locality !== 'All' ||
    roomType !== 'All' ||
    genderPolicy !== 'All' ||
    foodPlan !== 'All' ||
    maxBudget < 25000 ||
    filterWifi ||
    filterAc ||
    filterLaundry ||
    filterParking ||
    nearMetroOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E6EB]">
        <div>
          <div className="text-xs text-[#667085] flex items-center gap-1.5 mb-1">
            <Link to="/" className="hover:text-[#142B45]">Home</Link>
            <span>/</span>
            <span className="text-[#142B45] font-medium">Pune Accommodations</span>
          </div>
          <h1 className="text-2xl font-bold text-[#142B45] tracking-tight">
            Student & PG Accommodations in Pune
          </h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Showing <span className="font-semibold text-[#142B45]">{filteredListings.length}</span> verified accommodations matching your criteria
          </p>
        </div>

        {/* Sort & Compare bar */}
        <div className="flex items-center gap-3">
          {comparisons.length > 0 && (
            <Link
              to="/compare"
              className="bg-[#EBF8F4] border border-[#A3E0CC] text-[#168C83] text-xs font-semibold px-3 py-2 rounded-md flex items-center gap-1.5 hover:bg-[#E0F3EC] transition"
            >
              <Layers className="w-3.5 h-3.5" />
              Compare ({comparisons.length})
            </Link>
          )}

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#667085] hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E1E6EB] text-[#243244] text-xs rounded-md px-2.5 py-1.5 focus:ring-2 focus:ring-[#168C83] focus:outline-hidden"
            >
              <option value="rent_asc">Rent: Low to High</option>
              <option value="rent_desc">Rent: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="proximity">Nearest to Metro</option>
            </select>
          </div>

          {/* Mobile Filter toggle button */}
          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className="md:hidden flex items-center gap-1.5 bg-white border border-[#E1E6EB] text-[#142B45] text-xs font-medium px-3 py-1.5 rounded-md"
          >
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
        </div>
      </div>

      {/* Main Content Layout: Sidebar Filters + Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* 1. FILTER SIDEBAR (Desktop) */}
        <aside className={`md:block ${filterDrawerOpen ? 'block' : 'hidden'} bg-white p-5 rounded-xl border border-[#E1E6EB] space-y-6 shadow-2xs`}>
          <div className="flex items-center justify-between border-b border-[#E1E6EB] pb-3">
            <div className="flex items-center gap-1.5 text-sm font-bold text-[#142B45]">
              <SlidersHorizontal className="w-4 h-4 text-[#168C83]" />
              <span>Filter Properties</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#168C83] hover:text-[#142B45] font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset All
              </button>
            )}
          </div>

          {/* Locality */}
          <div>
            <label className="block text-xs font-bold text-[#142B45] mb-2">Locality / Campus Corridor</label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full text-xs bg-[#F7F5F0] border border-[#E1E6EB] rounded-md p-2 focus:ring-2 focus:ring-[#168C83]"
            >
              <option value="All">All Pune Localities</option>
              <option value="Hinjewadi">Hinjewadi (Phases 1-3)</option>
              <option value="Kothrud">Kothrud (Karve Rd / MIT)</option>
              <option value="Viman Nagar">Viman Nagar (Symbiosis)</option>
              <option value="Wakad">Wakad</option>
              <option value="Baner">Baner & Balewadi</option>
              <option value="Kharadi">Kharadi (EON Free Zone)</option>
              <option value="Shivajinagar">Shivajinagar / COEP</option>
              <option value="Aundh">Aundh</option>
              <option value="Bavdhan">Bavdhan</option>
              <option value="Hadapsar">Hadapsar</option>
              <option value="Katraj">Katraj</option>
            </select>
          </div>

          {/* Maximum Budget Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-800">Max Monthly Rent</span>
              <span className="font-bold text-teal-700">₹{maxBudget.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={25000}
              step={500}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹5,000</span>
              <span>₹15,000</span>
              <span>₹25,000</span>
            </div>
          </div>

          {/* Sharing Type */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">Room Sharing</label>
            <div className="space-y-1.5 text-xs text-slate-700">
              {['All', 'Single Room', 'Double Sharing', 'Triple Sharing', 'Four Sharing'].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="roomType"
                    checked={roomType === type}
                    onChange={() => setRoomType(type)}
                    className="accent-teal-600"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender Policy */}
          <div>
            <label className="block text-xs font-bold text-[#142B45] mb-2">Gender Arrangement</label>
            <div className="grid grid-cols-4 gap-1.5">
              {['All', 'Boys', 'Girls', 'Co-ed'].map((gen) => (
                <button
                  key={gen}
                  type="button"
                  onClick={() => setGenderPolicy(gen)}
                  className={`text-xs py-1.5 px-1.5 rounded-md font-semibold border text-center transition ${
                    genderPolicy === gen
                      ? 'bg-[#142B45] text-white border-[#142B45]'
                      : 'bg-[#F7F5F0] text-[#243244] border-[#E1E6EB] hover:bg-[#E8EDF2]'
                  }`}
                >
                  {gen}
                </button>
              ))}
            </div>
          </div>

          {/* Food Plan */}
          <div>
            <label className="block text-xs font-bold text-[#142B45] mb-2">Food & Mess Option</label>
            <select
              value={foodPlan}
              onChange={(e) => setFoodPlan(e.target.value)}
              className="w-full text-xs bg-[#F7F5F0] border border-[#E1E6EB] rounded-md p-2 focus:ring-2 focus:ring-[#168C83]"
            >
              <option value="All">Any Food Plan</option>
              <option value="Two Meals">Two Meals (Breakfast + Dinner)</option>
              <option value="Three Meals">Three Meals Included</option>
              <option value="Breakfast Only">Breakfast Only</option>
              <option value="No Food">No Food (Mess Optional)</option>
            </select>
          </div>

          {/* Key Amenities Checkboxes */}
          <div>
            <label className="block text-xs font-bold text-[#142B45] mb-2">Must-have Amenities</label>
            <div className="space-y-2 text-xs text-[#243244]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterAc}
                  onChange={(e) => setFilterAc(e.target.checked)}
                  className="accent-[#168C83] rounded"
                />
                <span>Air Conditioning (AC)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterWifi}
                  onChange={(e) => setFilterWifi(e.target.checked)}
                  className="accent-[#168C83] rounded"
                />
                <span>High-Speed Fiber Wi-Fi</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterLaundry}
                  onChange={(e) => setFilterLaundry(e.target.checked)}
                  className="accent-[#168C83] rounded"
                />
                <span>Washing Machine / Laundry</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterParking}
                  onChange={(e) => setFilterParking(e.target.checked)}
                  className="accent-[#168C83] rounded"
                />
                <span>Two-Wheeler / Car Parking</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={nearMetroOnly}
                  onChange={(e) => setNearMetroOnly(e.target.checked)}
                  className="accent-[#168C83] rounded"
                />
                <span>Within 2.0 km of Metro Station</span>
              </label>
            </div>
          </div>
        </aside>

        {/* 2. RESULTS GRID */}
        <main className="md:col-span-3 space-y-4">
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#667085] font-medium">Active Filters:</span>
              {locality !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-[#E8EDF2] text-[#142B45] px-2.5 py-1 rounded-md border border-[#E1E6EB] font-medium">
                  Locality: {locality}
                  <button onClick={() => setLocality('All')}><X className="w-3 h-3 text-[#667085] hover:text-[#142B45]" /></button>
                </span>
              )}
              {roomType !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-[#E8EDF2] text-[#142B45] px-2.5 py-1 rounded-md border border-[#E1E6EB] font-medium">
                  {roomType}
                  <button onClick={() => setRoomType('All')}><X className="w-3 h-3 text-[#667085] hover:text-[#142B45]" /></button>
                </span>
              )}
              {genderPolicy !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-[#E8EDF2] text-[#142B45] px-2.5 py-1 rounded-md border border-[#E1E6EB] font-medium">
                  {genderPolicy}
                  <button onClick={() => setGenderPolicy('All')}><X className="w-3 h-3 text-[#667085] hover:text-[#142B45]" /></button>
                </span>
              )}
              {filterAc && (
                <span className="inline-flex items-center gap-1 bg-[#EBF8F4] text-[#168C83] px-2.5 py-1 rounded-md border border-[#A3E0CC] font-medium">
                  AC Included
                  <button onClick={() => setFilterAc(false)}><X className="w-3 h-3 text-[#168C83]" /></button>
                </span>
              )}
              {maxBudget < 25000 && (
                <span className="inline-flex items-center gap-1 bg-[#E8EDF2] text-[#142B45] px-2.5 py-1 rounded-md border border-[#E1E6EB] font-medium">
                  Max ₹{maxBudget.toLocaleString('en-IN')}
                  <button onClick={() => setMaxBudget(25000)}><X className="w-3 h-3 text-[#667085]" /></button>
                </span>
              )}
            </div>
          )}

          {/* Grid of Listings */}
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-xl border border-[#E1E6EB] p-12 text-center max-w-lg mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F7F5F0] text-[#667085] flex items-center justify-center mx-auto border border-[#E1E6EB]">
                <Search className="w-6 h-6 text-[#142B45]" />
              </div>
              <h3 className="text-base font-bold text-[#142B45]">
                No Accommodations Match Your Active Criteria
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Try widening your budget, selecting "All Pune Localities", or clearing specific amenities.
              </p>
              <div className="pt-2">
                <button
                  onClick={resetFilters}
                  className="bg-[#142B45] hover:bg-[#0D1B2A] text-white text-xs font-semibold px-4 py-2 rounded-md transition"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
