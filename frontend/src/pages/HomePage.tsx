import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  FileText,
  BadgeIndianRupee,
  Users,
  Activity,
  Target,
  BarChart3
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ListingCard } from '../components/common/ListingCard';

const PUNE_HUBS = [
  { name: 'Hinjewadi', label: 'Phase 1, 2, 3 Tech Park', count: 14, avgRent: 9500 },
  { name: 'Kothrud', label: 'MIT / ARAI / Karve Rd', count: 8, avgRent: 8800 },
  { name: 'Viman Nagar', label: 'Symbiosis & Airport Rd', count: 6, avgRent: 11500 },
  { name: 'Wakad', label: 'Hinjewadi Tech Corridor', count: 9, avgRent: 9200 },
  { name: 'Baner', label: 'Balewadi High St & IT', count: 7, avgRent: 11000 },
  { name: 'Kharadi', label: 'EON IT Park & World Trade', count: 6, avgRent: 10500 },
];

export const HomePage: React.FC = () => {
  const { listings } = useStore();
  const navigate = useNavigate();

  // Tabbed Search State
  const [activeTab, setActiveTab] = useState<'pg' | 'roommate' | 'estimator'>('pg');

  // Search states
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [selectedRoomType, setSelectedRoomType] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [maxBudget, setMaxBudget] = useState(15000);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedLocality !== 'All') params.set('locality', selectedLocality);
    if (selectedRoomType !== 'All') params.set('room_type', selectedRoomType);
    if (selectedGender !== 'All') params.set('gender', selectedGender);
    if (maxBudget < 25000) params.set('max_budget', maxBudget.toString());
    navigate(`/pgs?${params.toString()}`);
  };

  // Featured listings: Active ones
  const featuredListings = listings.filter(l => l.status === 'active').slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. PREMIUM ARCHITECTURAL HERO SECTION */}
      <section className="relative bg-slate-950 text-white pt-10 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Editorial Headline & Search Console (7 cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Trust Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-200">Pune Student & Tech Corridor Housing</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-teal-400 font-semibold hidden sm:inline">Zero Brokerage</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                  Find your space in Pune.{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-emerald-300">
                    Without the brokerage or the surprises.
                  </span>
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                  Verified paying-guest accommodations across Hinjewadi, Kothrud, Viman Nagar, and Baner. Full upfront pricing covering food mess, electricity meter rates, and security deposits before you visit.
                </p>
              </div>

              {/* Interactive Tabbed Console */}
              <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-2 sm:p-3 shadow-2xl">
                {/* Segmented Control Tabs */}
                <div className="flex items-center gap-1.5 pb-2.5 mb-2.5 border-b border-slate-800/80 overflow-x-auto text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('pg')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition shrink-0 ${
                      activeTab === 'pg'
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Find Accommodations</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('roommate')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition shrink-0 ${
                      activeTab === 'roommate'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>AI Roommate Match</span>
                    <span className="bg-emerald-400/20 text-emerald-300 text-[10px] px-1 py-0.2 rounded font-mono font-bold uppercase">AI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('estimator')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition shrink-0 ${
                      activeTab === 'estimator'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Rent Calculator</span>
                    <span className="bg-purple-400/20 text-purple-300 text-[10px] px-1 py-0.2 rounded font-mono font-bold uppercase">DV</span>
                  </button>
                </div>

                {/* Tab 1: PG Search Console */}
                {activeTab === 'pg' && (
                  <form onSubmit={handleSearch} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                      {/* Locality */}
                      <div className="bg-slate-950/70 rounded-xl p-2.5 border border-slate-800 hover:border-slate-700 transition">
                        <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-teal-400" /> Locality
                        </label>
                        <select
                          value={selectedLocality}
                          onChange={(e) => setSelectedLocality(e.target.value)}
                          className="w-full bg-transparent text-white text-xs font-semibold focus:outline-hidden cursor-pointer"
                        >
                          <option value="All" className="bg-slate-900 text-white">All Pune Localities</option>
                          <option value="Hinjewadi" className="bg-slate-900 text-white">Hinjewadi (Phases 1-3)</option>
                          <option value="Kothrud" className="bg-slate-900 text-white">Kothrud (Karve Rd / MIT)</option>
                          <option value="Viman Nagar" className="bg-slate-900 text-white">Viman Nagar (Symbiosis)</option>
                          <option value="Wakad" className="bg-slate-900 text-white">Wakad (Tech Corridor)</option>
                          <option value="Baner" className="bg-slate-900 text-white">Baner & Balewadi</option>
                          <option value="Kharadi" className="bg-slate-900 text-white">Kharadi (EON Free Zone)</option>
                          <option value="Shivajinagar" className="bg-slate-900 text-white">Shivajinagar (COEP)</option>
                          <option value="Aundh" className="bg-slate-900 text-white">Aundh</option>
                          <option value="Bavdhan" className="bg-slate-900 text-white">Bavdhan</option>
                        </select>
                      </div>

                      {/* Sharing Type */}
                      <div className="bg-slate-950/70 rounded-xl p-2.5 border border-slate-800 hover:border-slate-700 transition">
                        <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                          <Users className="w-3 h-3 text-teal-400" /> Sharing
                        </label>
                        <select
                          value={selectedRoomType}
                          onChange={(e) => setSelectedRoomType(e.target.value)}
                          className="w-full bg-transparent text-white text-xs font-semibold focus:outline-hidden cursor-pointer"
                        >
                          <option value="All" className="bg-slate-900 text-white">Any Sharing Type</option>
                          <option value="Single Room" className="bg-slate-900 text-white">Single (Private)</option>
                          <option value="Double Sharing" className="bg-slate-900 text-white">Double Sharing (2 Beds)</option>
                          <option value="Triple Sharing" className="bg-slate-900 text-white">Triple Sharing (3 Beds)</option>
                          <option value="Four Sharing" className="bg-slate-900 text-white">Four Sharing</option>
                        </select>
                      </div>

                      {/* Gender Policy */}
                      <div className="bg-slate-950/70 rounded-xl p-2.5 border border-slate-800 hover:border-slate-700 transition">
                        <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-teal-400" /> Gender
                        </label>
                        <select
                          value={selectedGender}
                          onChange={(e) => setSelectedGender(e.target.value)}
                          className="w-full bg-transparent text-white text-xs font-semibold focus:outline-hidden cursor-pointer"
                        >
                          <option value="All" className="bg-slate-900 text-white">Any Policy (Co-ed/Boys/Girls)</option>
                          <option value="Boys" className="bg-slate-900 text-white">Boys Only</option>
                          <option value="Girls" className="bg-slate-900 text-white">Girls Only</option>
                          <option value="Co-ed" className="bg-slate-900 text-white">Co-ed</option>
                        </select>
                      </div>
                    </div>

                    {/* Search Action Row */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-[11px] text-slate-400 py-1">
                        <span className="font-medium text-slate-500 shrink-0">Popular:</span>
                        <button
                          type="button"
                          onClick={() => navigate('/pgs?locality=Hinjewadi')}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition shrink-0"
                        >
                          Hinjewadi IT
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/pgs?locality=Kothrud')}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition shrink-0"
                        >
                          Kothrud
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/pgs?ac=true')}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition shrink-0"
                        >
                          AC PGs
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-teal-900/30 transition shrink-0"
                      >
                        <Search className="w-4 h-4" />
                        <span>Search 40+ PGs</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    </div>
                  </form>
                )}

                {/* Tab 2: Roommate Matcher Quick Launch */}
                {activeTab === 'roommate' && (
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-emerald-400" />
                          <span>AI Roommate Harmony Engine</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          Match with compatible students & tech professionals based on sleep schedule, cleanliness, diet, and budget parity.
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-2xl font-black text-emerald-400">93.3%</span>
                        <div className="text-[10px] text-slate-500 font-mono">Accuracy R²</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-xs text-slate-400">10 Lifestyle Vectors Analyzed</span>
                      <Link
                        to="/roommate-finder"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg inline-flex items-center gap-1.5 transition"
                      >
                        <span>Launch Matchmaker</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Tab 3: Rent Estimator Quick Launch */}
                {activeTab === 'estimator' && (
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span>Pune PG Fair-Rent Estimator</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          Predict realistic monthly rent using our gradient boosted regressor trained on 25,000 Pune housing vectors.
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-2xl font-black text-purple-400">0.990</span>
                        <div className="text-[10px] text-slate-500 font-mono">Model R²</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-xs text-slate-400">MAE: ₹277 • 5-Fold Cross Validated</span>
                      <Link
                        to="/price-estimator"
                        className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-lg inline-flex items-center gap-1.5 transition"
                      >
                        <span>Estimate Fair Rent</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Metrics & Proof Points */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl font-extrabold text-white tracking-tight">40+</div>
                  <div className="text-xs text-slate-400">Verified PGs in Pune</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white tracking-tight">₹0</div>
                  <div className="text-xs text-slate-400">Brokerage Fees</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-teal-400 tracking-tight">100k</div>
                  <div className="text-xs text-slate-400">Augmented Data Points</div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Verified Residence Preview Card (5 cols) */}
            <div className="lg:col-span-5 relative hidden lg:block">
              {/* Main Card */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative group">
                {/* Photo & Badges */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
                    alt="Premium Pune PG Room"
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-emerald-500/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Stay
                    </span>
                    <span className="bg-slate-900/90 text-slate-200 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-slate-700">
                      Co-ed • 2-Sharing
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-teal-300 font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Aundh / Hinjewadi Link
                      </div>
                      <div className="text-lg font-bold text-white">NestHive Residence</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Total Monthly</div>
                      <div className="text-xl font-extrabold text-teal-400">₹5,700<span className="text-xs font-normal text-slate-400">/mo</span></div>
                    </div>
                  </div>
                </div>

                {/* Card Meta & Amenities */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2.5">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Deposit: ₹15,000 (Refundable)
                    </span>
                    <span className="text-slate-300 font-medium">1.9 km to Metro</span>
                  </div>

                  {/* Roommate Synergy Live Ticker */}
                  <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <span className="text-xs font-black text-emerald-400">88%</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <span>Recent Roommate Match</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        Tanmay (COEP) & Rohan (Infosys) matched in Hinjewadi
                      </p>
                    </div>
                    <Link
                      to="/roommate-finder"
                      className="text-xs text-teal-400 hover:text-teal-300 font-bold shrink-0"
                    >
                      Match →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR PUNE LOCALITIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Explore Popular Pune Neighbourhoods
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top accommodations near major IT hubs, colleges, and metro lines.
            </p>
          </div>
          <Link
            to="/pgs"
            className="text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 mt-2 sm:mt-0"
          >
            Browse all Pune locations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PUNE_HUBS.map((hub) => (
            <Link
              key={hub.name}
              to={`/pgs?locality=${encodeURIComponent(hub.name)}`}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-sm transition text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs mb-3 group-hover:bg-teal-600 group-hover:text-white transition">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition">
                {hub.name}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1 mb-2">{hub.label}</p>
              <div className="text-[11px] font-semibold text-slate-700">
                From ₹{hub.avgRent.toLocaleString('en-IN')}/mo
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-teal-600" /> Curated Pune Inventory
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Featured PG Accommodations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Transparent rent with security deposit, mess details, and metro proximity clearly stated.
            </p>
          </div>
          <Link
            to="/pgs"
            className="text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 mt-2 sm:mt-0"
          >
            View all {listings.length} listings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* 4. AI PRICE ESTIMATOR TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-teal-800/80 text-teal-200 border border-teal-700 px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Statistical Rent Estimation Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Curious what a PG in Pune should reasonably cost?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Don't overpay. Our regression engine evaluates Pune locality indices, sharing privacy premiums, meal plans, and commute proximity to estimate your realistic monthly rent with explainable cost drivers.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-2">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Locality-specific benchmarks
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Explainable cost breakdown
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> 80% Confidence bounds
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center w-full md:w-80 shrink-0">
            <div className="text-xs uppercase tracking-wider text-teal-300 font-semibold mb-1">
              Pune PG Price Engine
            </div>
            <div className="text-3xl font-extrabold text-white mb-2">
              ₹8,500 – ₹12,500
            </div>
            <div className="text-xs text-slate-300 mb-6">
              Typical Hinjewadi & Kothrud student/IT sharing band
            </div>
            <Link
              to="/price-estimator"
              className="w-full inline-block bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs py-3 px-4 rounded-lg shadow-md transition"
            >
              Open Rent Estimator
            </Link>
          </div>
        </div>
      </section>

      {/* 5. QUAD AI & MACHINE LEARNING SUITE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-800 text-white space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Data Science & Predictive Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                4 Specialized Machine Learning Models
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Trained on Pune student and IT housing benchmarks, our FastAPI ML microservice runs 4 distinct production models for rent estimation, roommate harmony, booking propensity, and property quality maintenance.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-slate-800 text-teal-300 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              FastAPI Port 8001 Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Model 1 */}
            <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-3 flex flex-col justify-between hover:border-teal-500/50 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    Model 1: Regressor
                  </span>
                  <Sparkles className="w-4 h-4 text-teal-400" />
                </div>
                <h3 className="font-bold text-base text-white">Monthly Rent Predictor</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  HistGradientBoosting model predicting Pune PG rents within ₹600 error across 12 localities and furnishing levels.
                </p>
              </div>
              <Link
                to="/price-estimator"
                className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold pt-2 border-t border-slate-700/60"
              >
                Estimate Rent <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Model 2 */}
            <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-3 flex flex-col justify-between hover:border-emerald-500/50 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Model 2: Matchmaker
                  </span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-bold text-base text-white">Roommate Compatibility</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Random Forest evaluating sleep schedules, cleanliness, food/diet, noise, and shared hobbies into a 0–100% harmony score.
                </p>
              </div>
              <Link
                to="/roommate-finder"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold pt-2 border-t border-slate-700/60"
              >
                Match Roommates <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Model 3 */}
            <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-3 flex flex-col justify-between hover:border-purple-500/50 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Model 3: Classifier
                  </span>
                  <Target className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="font-bold text-base text-white">Conversion Propensity</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  GradientBoosting model predicting lead-to-booking conversion probabilities to assist owners in tenant follow-up.
                </p>
              </div>
              <Link
                to="/owner/analytics"
                className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold pt-2 border-t border-slate-700/60"
              >
                Owner Analytics <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Model 4 */}
            <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-3 flex flex-col justify-between hover:border-amber-500/50 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Model 4: Risk Audit
                  </span>
                  <Activity className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="font-bold text-base text-white">Maintenance Risk Score</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Random Forest evaluating review dimensions and noise levels to predict property maintenance and complaint risk.
                </p>
              </div>
              <Link
                to="/admin/reports"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold pt-2 border-t border-slate-700/60"
              >
                Compliance Audit <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Academic DV Banner */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/40 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">
                  Data Visualization (DV 5th Sem) Evaluation Studio
                </div>
                <div className="text-xs text-slate-400">
                  Inspect interactive confusion matrix heatmaps, ROC curves, residual distributions, and R² scatter plots
                </div>
              </div>
            </div>
            <Link
              to="/model-evaluation"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition whitespace-nowrap shadow-xs"
            >
              Open DV Model Evaluation Studio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TRUST & ARCHITECTURAL PRINCIPLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Built for Practical Pune Housing Search
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Engineered with strict zero-trust permissions, verified data tagging, and side-by-side comparability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <BadgeIndianRupee className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Unbundled Total Monthly Cost
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every card shows base rent, refundable security deposit, estimated electricity surcharge, and monthly maintenance so you know your true monthly commitment before booking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Multi-Listing Side-by-Side Comparison
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select 2 to 4 properties in Wakad, Kothrud, or Viman Nagar to inspect side-by-side differences in WiFi reliability, meal schedules, room types, and commute times.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Role-Based Access & Data Integrity
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tenants manage only their bookings, owners manage their own listings, and demo dataset rows are transparently labelled until audited by municipal administrators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
