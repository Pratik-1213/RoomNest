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
  BadgeIndianRupee,
  Users,
  ChevronDown,
  HelpCircle,
  FileCheck2,
  CalendarCheck2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ListingCard } from '../components/common/ListingCard';

const PUNE_HUBS = [
  { name: 'Shivajinagar', label: 'COEP & FC Road Corridor', count: 8, avgRent: 8500 },
  { name: 'Kothrud', label: 'MIT & Karve Road Corridor', count: 8, avgRent: 8800 },
  { name: 'Hinjewadi', label: 'Phase 1, 2 & 3 Tech Corridor', count: 14, avgRent: 9500 },
  { name: 'Viman Nagar', label: 'Symbiosis & Airport Corridor', count: 6, avgRent: 11500 },
  { name: 'Wakad', label: 'Datta Mandir & Transit Hub', count: 9, avgRent: 9200 },
  { name: 'Baner', label: 'Balewadi High Street Area', count: 7, avgRent: 11000 },
];

const FAQS = [
  {
    q: 'How does RoomNest verify accommodation listings?',
    a: 'Every property listed on RoomNest undergoes physical address inspection, verified ownership KYC, and full upfront disclosure of rent, electricity meters, and refundable security deposits.'
  },
  {
    q: 'Are there any hidden brokerage fees?',
    a: 'No. RoomNest connects students and young professionals directly with accommodation providers. You pay zero brokerage fees.'
  },
  {
    q: 'Can I find accommodation close to COEP Technological University?',
    a: 'Yes. We feature curated student rooms, flats, and PG accommodations across Shivajinagar, FC Road, Sancheti corridor, and Wakdewadi within walking distance or a short metro ride to COEP.'
  },
  {
    q: 'How does the Roommate Compatibility matching work?',
    a: 'Our student matchmaker compares 10 behavioral dimensions including study hours, sleep schedules, cleanliness standards, food preferences, and rent budget to suggest compatible roommates.'
  },
  {
    q: 'What is included in the monthly rent?',
    a: 'Each listing clearly itemizes what is included: meals (breakfast, lunch, dinner), high-speed fiber Wi-Fi, daily housekeeping, RO drinking water, and backup power.'
  }
];

export const HomePage: React.FC = () => {
  const { listings } = useStore();
  const navigate = useNavigate();

  // Tabbed Search State
  const [activeTab, setActiveTab] = useState<'pg' | 'roommate' | 'estimator'>('pg');

  // Search states
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [selectedRoomType, setSelectedRoomType] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedLocality !== 'All') params.set('locality', selectedLocality);
    if (selectedRoomType !== 'All') params.set('room_type', selectedRoomType);
    if (selectedBudget !== 'All') params.set('max_budget', selectedBudget);
    navigate(`/pgs?${params.toString()}`);
  };

  // Featured listings: Active verified accommodations
  const featuredListings = listings.filter(l => l.status === 'active').slice(0, 6);

  return (
    <div className="space-y-16 pb-20 bg-[#F7F5F0]">
      {/* 1. HERO & SEARCH CONSOLE */}
      <section className="bg-white border-b border-[#E1E6EB] pt-10 sm:pt-14 pb-14 sm:pb-18 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline & Search (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Campus Context Badge */}
              <div className="inline-flex items-center gap-2 bg-[#F7F5F0] border border-[#E1E6EB] px-3 py-1 rounded-md text-xs font-semibold text-[#142B45]">
                <MapPin className="w-3.5 h-3.5 text-[#168C83]" />
                <span>COEP & Pune Student Accommodation</span>
                <span className="text-[#E1E6EB]">•</span>
                <span className="text-[#168C83] font-bold">Zero Brokerage</span>
              </div>

              {/* Main Headline & Supporting Copy */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#142B45] leading-[1.18]">
                  Find a place that feels like home.
                </h1>
                <p className="text-[#667085] text-base sm:text-lg max-w-xl leading-relaxed">
                  Explore rooms, flats and PG accommodation near your campus and across Pune. Verified properties, unbundled pricing, and direct owner contact.
                </p>
              </div>

              {/* Restrained Search Console */}
              <div className="bg-[#FFFFFF] rounded-xl border border-[#E1E6EB] p-4 shadow-sm">
                {/* Segmented Control Tabs */}
                <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-[#E1E6EB] text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('pg')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition ${
                      activeTab === 'pg'
                        ? 'bg-[#142B45] text-white shadow-2xs'
                        : 'text-[#243244] hover:bg-[#F7F5F0]'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Find Accommodation</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('roommate')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition ${
                      activeTab === 'roommate'
                        ? 'bg-[#142B45] text-white shadow-2xs'
                        : 'text-[#243244] hover:bg-[#F7F5F0]'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 text-[#168C83]" />
                    <span>Roommate Match</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('estimator')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition ${
                      activeTab === 'estimator'
                        ? 'bg-[#142B45] text-white shadow-2xs'
                        : 'text-[#243244] hover:bg-[#F7F5F0]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#168C83]" />
                    <span>Fair Rent Calculator</span>
                  </button>
                </div>

                {/* Tab 1: Accommodation Search */}
                {activeTab === 'pg' && (
                  <form onSubmit={handleSearch} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {/* Locality */}
                      <div className="bg-[#F7F5F0] rounded-lg p-2.5 border border-[#E1E6EB] hover:border-[#142B45]/40 transition">
                        <label className="block text-[11px] font-bold text-[#142B45] mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#168C83]" /> Area / Campus
                        </label>
                        <select
                          value={selectedLocality}
                          onChange={(e) => setSelectedLocality(e.target.value)}
                          className="w-full bg-transparent text-[#243244] text-xs font-semibold focus:outline-hidden cursor-pointer"
                        >
                          <option value="All">All Pune Areas</option>
                          <option value="Shivajinagar">Shivajinagar (Near COEP)</option>
                          <option value="Kothrud">Kothrud (MIT / Karve Rd)</option>
                          <option value="Hinjewadi">Hinjewadi (Phases 1-3)</option>
                          <option value="Viman Nagar">Viman Nagar (Symbiosis)</option>
                          <option value="Wakad">Wakad</option>
                          <option value="Baner">Baner & Balewadi</option>
                          <option value="Kharadi">Kharadi</option>
                          <option value="Aundh">Aundh</option>
                          <option value="Bavdhan">Bavdhan</option>
                        </select>
                      </div>

                      {/* Sharing Type */}
                      <div className="bg-[#F7F5F0] rounded-lg p-2.5 border border-[#E1E6EB] hover:border-[#142B45]/40 transition">
                        <label className="block text-[11px] font-bold text-[#142B45] mb-1 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-[#168C83]" /> Room Sharing
                        </label>
                        <select
                          value={selectedRoomType}
                          onChange={(e) => setSelectedRoomType(e.target.value)}
                          className="w-full bg-transparent text-[#243244] text-xs font-semibold focus:outline-hidden cursor-pointer"
                        >
                          <option value="All">Any Sharing Arrangement</option>
                          <option value="Single Room">Single Room (Private)</option>
                          <option value="Double Sharing">Double Sharing (2 Beds)</option>
                          <option value="Triple Sharing">Triple Sharing (3 Beds)</option>
                          <option value="Four Sharing">Four Sharing</option>
                        </select>
                      </div>

                      {/* Budget */}
                      <div className="bg-[#F7F5F0] rounded-lg p-2.5 border border-[#E1E6EB] hover:border-[#142B45]/40 transition">
                        <label className="block text-[11px] font-bold text-[#142B45] mb-1 flex items-center gap-1">
                          <BadgeIndianRupee className="w-3 h-3 text-[#168C83]" /> Max Monthly Budget
                        </label>
                        <select
                          value={selectedBudget}
                          onChange={(e) => setSelectedBudget(e.target.value)}
                          className="w-full bg-transparent text-[#243244] text-xs font-semibold focus:outline-hidden cursor-pointer"
                        >
                          <option value="All">Any Budget</option>
                          <option value="7000">Up to ₹7,000 / mo</option>
                          <option value="10000">Up to ₹10,000 / mo</option>
                          <option value="14000">Up to ₹14,000 / mo</option>
                          <option value="20000">Up to ₹20,000 / mo</option>
                        </select>
                      </div>
                    </div>

                    {/* Search Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-[11px] text-[#667085]">
                        <span className="font-semibold text-[#142B45] shrink-0">Near Campus:</span>
                        <button
                          type="button"
                          onClick={() => navigate('/pgs?locality=Shivajinagar')}
                          className="px-2.5 py-1 rounded bg-[#F7F5F0] hover:bg-[#E8EDF2] text-[#243244] font-medium transition shrink-0 border border-[#E1E6EB]"
                        >
                          COEP / Shivajinagar
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/pgs?locality=Kothrud')}
                          className="px-2.5 py-1 rounded bg-[#F7F5F0] hover:bg-[#E8EDF2] text-[#243244] font-medium transition shrink-0 border border-[#E1E6EB]"
                        >
                          Kothrud
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/pgs?locality=Hinjewadi')}
                          className="px-2.5 py-1 rounded bg-[#F7F5F0] hover:bg-[#E8EDF2] text-[#243244] font-medium transition shrink-0 border border-[#E1E6EB]"
                        >
                          Hinjewadi
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-[#142B45] hover:bg-[#0D1B2A] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-md flex items-center justify-center gap-2 shadow-2xs transition shrink-0"
                      >
                        <Search className="w-4 h-4" />
                        <span>Search Properties</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    </div>
                  </form>
                )}

                {/* Tab 2: Roommate Matcher */}
                {activeTab === 'roommate' && (
                  <div className="p-4 bg-[#F7F5F0] rounded-lg border border-[#E1E6EB] space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-[#142B45] flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-[#168C83]" />
                          <span>COEP & Pune Roommate Compatibility</span>
                        </div>
                        <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                          Pair with verified students who share your study hours, sleep cycle, meal habits, and rent budget.
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-2xl font-black text-[#142B45]">10</span>
                        <div className="text-[10px] text-[#667085] font-medium">Lifestyle Factors</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#E1E6EB]">
                      <span className="text-xs text-[#667085]">Verified student profiles</span>
                      <Link
                        to="/roommate-finder"
                        className="bg-[#142B45] hover:bg-[#0D1B2A] text-white text-xs font-semibold px-4 py-2 rounded-md inline-flex items-center gap-1.5 transition shadow-2xs"
                      >
                        <span>Find Roommates</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Tab 3: Rent Estimator */}
                {activeTab === 'estimator' && (
                  <div className="p-4 bg-[#F7F5F0] rounded-lg border border-[#E1E6EB] space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-[#142B45] flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-[#168C83]" />
                          <span>Fair Rent Calculator</span>
                        </div>
                        <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                          Check realistic rent benchmarks across Pune student hubs based on room sharing, AC, and daily mess food.
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-2xl font-black text-[#142B45]">12</span>
                        <div className="text-[10px] text-[#667085] font-medium">Pune Localities</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#E1E6EB]">
                      <span className="text-xs text-[#667085]">Objective cost estimation</span>
                      <Link
                        to="/price-estimator"
                        className="bg-[#142B45] hover:bg-[#0D1B2A] text-white text-xs font-semibold px-4 py-2 rounded-md inline-flex items-center gap-1.5 transition shadow-2xs"
                      >
                        <span>Calculate Rent</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Genuine Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#E1E6EB]">
                <div>
                  <div className="text-2xl font-extrabold text-[#142B45] tracking-tight">40+</div>
                  <div className="text-xs text-[#667085]">Verified Accommodations</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#142B45] tracking-tight">₹0</div>
                  <div className="text-xs text-[#667085]">Brokerage Fees</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#168C83] tracking-tight">100%</div>
                  <div className="text-xs text-[#667085]">Price Transparency</div>
                </div>
              </div>
            </div>

            {/* Right Column: Verified Pune Residence Showcase (5 cols) */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white rounded-xl border border-[#E1E6EB] overflow-hidden shadow-sm">
                <div className="relative aspect-16/10 overflow-hidden bg-[#E8EDF2]">
                  <img
                    src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
                    alt="Verified Student Accommodation Room"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-[#EBF8F4] text-[#237A57] border border-[#A3E0CC] text-[11px] font-bold px-2.5 py-0.5 rounded shadow-2xs flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#237A57]" /> Verified Property
                    </span>
                    <span className="bg-white/95 text-[#142B45] text-[11px] font-semibold px-2 py-0.5 rounded border border-[#E1E6EB] shadow-2xs">
                      Double Sharing
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between bg-[#142B45]/90 p-2.5 rounded-lg text-white">
                    <div>
                      <div className="text-xs text-[#168C83] font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#168C83]" /> Shivajinagar / COEP Area
                      </div>
                      <div className="text-base font-bold text-white">Prabhat Student Residence</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-300">Monthly Rent</div>
                      <div className="text-lg font-extrabold text-white">₹8,500<span className="text-xs font-normal text-slate-300">/mo</span></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 bg-white">
                  <div className="flex items-center justify-between text-xs text-[#667085] border-b border-[#E1E6EB] pb-2.5">
                    <span className="flex items-center gap-1 text-[#243244] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#168C83]" /> Deposit: ₹17,000 (Refundable)
                    </span>
                    <span className="text-[#667085]">500m from COEP Campus</span>
                  </div>

                  <div className="bg-[#F7F5F0] rounded-lg p-3 border border-[#E1E6EB] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#EBF8F4] border border-[#A3E0CC] flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-[#237A57]">92%</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#142B45]">
                        COEP Student Roommate Match
                      </div>
                      <p className="text-[11px] text-[#667085] truncate">
                        Matched with 2nd-year B.Tech Computer Science student
                      </p>
                    </div>
                    <Link
                      to="/roommate-finder"
                      className="text-xs text-[#168C83] hover:text-[#142B45] font-bold shrink-0"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY LOCATION (Real Pune student corridors) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#142B45] tracking-tight">
              Explore Popular Student Corridors
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-1">
              Accommodations near COEP Technological University, Pune university campuses, and tech centers.
            </p>
          </div>
          <Link
            to="/pgs"
            className="text-xs sm:text-sm font-semibold text-[#168C83] hover:text-[#142B45] inline-flex items-center gap-1 mt-2 sm:mt-0"
          >
            Browse all Pune locations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {PUNE_HUBS.map((hub) => (
            <Link
              key={hub.name}
              to={`/pgs?locality=${encodeURIComponent(hub.name)}`}
              className="bg-white p-4 rounded-xl border border-[#E1E6EB] hover:border-[#142B45] hover:shadow-sm transition text-left group"
            >
              <div className="w-8 h-8 rounded-md bg-[#F7F5F0] text-[#168C83] flex items-center justify-center font-bold text-xs mb-3 group-hover:bg-[#142B45] group-hover:text-white transition">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#142B45] text-sm group-hover:text-[#168C83] transition">
                {hub.name}
              </h3>
              <p className="text-[11px] text-[#667085] line-clamp-1 mb-2">{hub.label}</p>
              <div className="text-[11px] font-semibold text-[#243244]">
                From ₹{hub.avgRent.toLocaleString('en-IN')}/mo
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#168C83] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#168C83]" /> Verified Inventory
            </div>
            <h2 className="text-2xl font-bold text-[#142B45] tracking-tight">
              Featured Accommodations in Pune
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-1">
              Genuine listings with verified rents, security deposit rules, and mess food inclusions.
            </p>
          </div>
          <Link
            to="/pgs"
            className="text-xs sm:text-sm font-semibold text-[#168C83] hover:text-[#142B45] inline-flex items-center gap-1 mt-2 sm:mt-0"
          >
            View all {listings.length} accommodations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-[#E1E6EB] p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl font-bold text-[#142B45] tracking-tight">
              How RoomNest Works for Students
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-1">
              A straightforward, transparent process designed to take the stress out of finding accommodation in Pune.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-[#F7F5F0] border border-[#E1E6EB] text-[#142B45] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-[#142B45] text-base">Search Near Your Campus</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Filter verified student accommodations by locality, room sharing preference, and monthly budget around COEP, Kothrud, and Hinjewadi.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-[#F7F5F0] border border-[#E1E6EB] text-[#142B45] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-[#142B45] text-base">Review Total Costs & Amenities</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Inspect upfront pricing breakdown including monthly rent, refundable security deposits, food plans, and electricity meter policies before visiting.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-[#F7F5F0] border border-[#E1E6EB] text-[#142B45] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-[#142B45] text-base">Connect Directly & Reserve</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Message verified property owners directly, schedule in-person room inspections, and reserve your bed with zero brokerage fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STUDENT HOUSING FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-[#E1E6EB] p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#168C83] uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4 text-[#168C83]" /> Student Questions
            </div>
            <h2 className="text-2xl font-bold text-[#142B45] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-1">
              Everything you need to know about renting rooms and PG accommodation in Pune.
            </p>
          </div>

          <div className="divide-y divide-[#E1E6EB]">
            {FAQS.map((faq, index) => {
              const isOpen = faqOpenIndex === index;
              return (
                <div key={index} className="py-4">
                  <button
                    type="button"
                    onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                    className="w-full text-left flex items-center justify-between gap-4 font-semibold text-[#142B45] text-sm sm:text-base focus:outline-hidden"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#667085] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#168C83]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed max-w-3xl">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
