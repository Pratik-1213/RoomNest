import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  Heart, 
  Layers, 
  LogOut, 
  Menu, 
  X, 
  PlusCircle, 
  ChevronDown,
  Users,
  BarChart3,
  User,
  Shield,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

export const Navbar: React.FC = () => {
  const { user, role, logout } = useAuth();
  const { shortlists, comparisons } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Light Top Utility Bar */}
      <div className="bg-slate-50 text-slate-500 text-xs py-1.5 px-4 hidden sm:block border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-teal-600" /> Pune, Maharashtra
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500">Student & Working Professional Accommodations</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/help/contact" className="hover:text-teal-700 transition flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-slate-400" /> Support
            </Link>
            <span className="text-slate-400">|</span>
            <Link to="/model-evaluation" className="hover:text-teal-700 transition flex items-center gap-1 text-slate-500">
              <BarChart3 className="w-3 h-3 text-purple-600" /> Research & DV Studio
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 xl:gap-8 min-w-0 shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <img
                src="/logo.jpg"
                alt="RoomNest Logo"
                className="w-9 h-9 rounded-lg object-contain border border-slate-200 shadow-2xs group-hover:border-teal-400 transition"
              />
              <div className="flex items-center">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-teal-700 transition font-sans">
                  RoomNest
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                  Pune
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Visible on lg and above) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                to="/pgs"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  isActive('/pgs') ? 'text-teal-700 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Find PGs
              </Link>
              <Link
                to="/roommate-finder"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/roommate-finder') ? 'text-teal-700 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Roommate Match</span>
              </Link>
              <Link
                to="/price-estimator"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/price-estimator') ? 'text-teal-700 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Rent Estimator</span>
              </Link>
              <Link
                to="/compare"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/compare') ? 'text-teal-700 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Compare</span>
                {comparisons.length > 0 && (
                  <span className="bg-teal-100 text-teal-800 text-xs px-1.5 py-0.2 rounded-full font-bold">
                    {comparisons.length}
                  </span>
                )}
              </Link>
            </nav>
          </div>

          {/* Right Section Actions & User Menus */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Tenant Shortlists link */}
            {role === 'tenant' && (
              <Link
                to="/tenant/shortlists"
                className="relative p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-50 rounded-lg transition"
                title="Saved PGs"
              >
                <Heart className="w-4 h-4" />
                {shortlists.length > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {shortlists.length}
                  </span>
                )}
              </Link>
            )}

            {/* Owner "List a PG" CTA */}
            {role === 'owner' ? (
              <Link
                to="/owner/listings/new"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition shadow-xs shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                List Property
              </Link>
            ) : !user ? (
              <Link
                to="/signup?role=owner"
                className="text-xs font-medium text-slate-600 hover:text-teal-700 px-2 py-1.5 transition"
              >
                List Your Property
              </Link>
            ) : null}

            {/* User Profile / Dashboard Menu OR Log In / Sign Up */}
            {user ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition text-sm max-w-[190px]"
                >
                  <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    {user.full_name.charAt(0)}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-xs font-semibold text-slate-800 leading-tight truncate">
                      {user.full_name}
                    </div>
                    <div className="text-[10px] text-teal-700 font-medium capitalize">
                      {user.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-[11px] text-slate-500">Signed in as</p>
                      <p className="text-xs font-bold text-slate-900 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.2 rounded uppercase">
                        {user.role}
                      </span>
                    </div>

                    {/* Role Specific Shortcuts */}
                    {role === 'tenant' && (
                      <div className="py-1">
                        <Link
                          to="/tenant/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          My Dashboard
                        </Link>
                        <Link
                          to="/tenant/bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          My Bookings
                        </Link>
                        <Link
                          to="/tenant/shortlists"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Shortlisted PGs ({shortlists.length})
                        </Link>
                      </div>
                    )}

                    {role === 'owner' && (
                      <div className="py-1">
                        <Link
                          to="/owner/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          Owner Dashboard
                        </Link>
                        <Link
                          to="/owner/listings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          My Properties
                        </Link>
                        <Link
                          to="/owner/bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Booking Inquiries
                        </Link>
                        <Link
                          to="/owner/analytics"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Occupancy Analytics
                        </Link>
                      </div>
                    )}

                    {role === 'admin' && (
                      <div className="py-1">
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          Compliance Overview
                        </Link>
                        <Link
                          to="/admin/listings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Listing Approvals
                        </Link>
                        <Link
                          to="/admin/users"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Owner Verification
                        </Link>
                        <Link
                          to="/admin/reports"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Platform Audit
                        </Link>
                      </div>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 transition font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-slate-700 hover:text-teal-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 rounded-lg shadow-xs transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button (visible below lg) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (visible below lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-4 shadow-lg">
          {/* User Status / Login in Mobile */}
          {user ? (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                  {user.full_name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{user.full_name}</div>
                  <div className="text-[10px] text-teal-700 font-semibold capitalize">{user.role} Account</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-xs font-bold text-slate-800 bg-slate-100 rounded-lg"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-xs font-bold text-white bg-teal-600 rounded-lg"
              >
                Sign Up
              </Link>
            </div>
          )}

          <div className="flex flex-col space-y-2 pt-2 border-t border-slate-100">
            <Link
              to="/pgs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 py-1.5 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-teal-600" />
              Find PGs
            </Link>
            <Link
              to="/roommate-finder"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 py-1.5 flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-emerald-600" />
              Roommate Match
            </Link>
            <Link
              to="/price-estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 py-1.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              Rent Estimator
            </Link>
            <Link
              to="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 py-1.5 flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              Compare PGs {comparisons.length > 0 && `(${comparisons.length})`}
            </Link>
            <Link
              to="/model-evaluation"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 py-1.5 flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-purple-600" />
              Research & DV Studio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
