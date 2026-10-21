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
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-teal-950/80 text-teal-300 border border-teal-800/80 px-3.5 py-1 rounded-full text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>Dedicated to Students & Tech Professionals in Pune</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Transparent PG Discovery in Pune.<br />
            <span className="text-teal-400">Zero Hidden Charges. Clear Rent Breakdowns.</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Search verified paying guest accommodations near Hinjewadi, Kothrud, Viman Nagar, Wakad, and Baner. Compare total monthly cost, food mess options, and commute distances.
          </p>

          {/* Search Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200 text-slate-800 max-w-4xl mx-auto text-left">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Locality dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pune Locality</label>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                >
                  <option value="All">All Pune Localities</option>
                  <option value="Hinjewadi">Hinjewadi (Phases 1-3)</option>
                  <option value="Kothrud">Kothrud (Karve Rd / MIT)</option>
                  <option value="Viman Nagar">Viman Nagar (Symbiosis)</option>
                  <option value="Wakad">Wakad (Hinjewadi Corridor)</option>
                  <option value="Baner">Baner & Balewadi</option>
                  <option value="Kharadi">Kharadi (EON IT Park)</option>
                  <option value="Shivajinagar">Shivajinagar / COEP Area</option>
                  <option value="Aundh">Aundh</option>
                  <option value="Bavdhan">Bavdhan</option>
                  <option value="Hadapsar">Hadapsar / Magarpatta</option>
                </select>
              </div>

              {/* Room sharing type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Room Sharing</label>
                <select
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                >
                  <option value="All">Any Sharing Type</option>
                  <option value="Single Room">Single Room (Private)</option>
                  <option value="Double Sharing">Double Sharing (2 Beds)</option>
                  <option value="Triple Sharing">Triple Sharing (3 Beds)</option>
                  <option value="Four Sharing">Four Sharing</option>
                </select>
              </div>

              {/* Gender Policy */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender Policy</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                >
                  <option value="All">Any (Boys / Girls / Co-ed)</option>
                  <option value="Boys">Boys Only</option>
                  <option value="Girls">Girls Only</option>
                  <option value="Co-ed">Co-ed</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Search className="w-4 h-4" />
                  Find PGs
                </button>
              </div>
            </form>

            {/* Quick Filter Tags below form */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Quick Filters:</span>
              <button
                type="button"
                onClick={() => navigate('/pgs?locality=Hinjewadi')}
                className="bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-700 transition"
              >
                Hinjewadi IT PGs
              </button>
              <button
                type="button"
                onClick={() => navigate('/pgs?gender=Girls')}
                className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-2 py-1 rounded transition"
              >
                Girls PGs
              </button>
              <button
                type="button"
                onClick={() => navigate('/pgs?food=Two+Meals')}
                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2 py-1 rounded transition"
              >
                Food Included
              </button>
              <button
                type="button"
                onClick={() => navigate('/pgs?ac=true')}
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1 rounded transition"
              >
                AC Rooms
              </button>
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
