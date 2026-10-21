import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  SlidersHorizontal, 
  Sparkles, 
  Heart, 
  Layers, 
  User, 
  LogOut, 
  Menu, 
  X, 
  PlusCircle, 
  ShieldCheck, 
  CheckCircle2,
  ChevronDown,
  Users,
  BarChart3
} from 'lucide-react';
import { useAuth, PRESET_USERS } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

export const Navbar: React.FC = () => {
  const { user, role, switchRole, logout } = useAuth();
  const { shortlists, comparisons } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Demo Bar / Quick Switcher */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden lg:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-slate-400 font-medium shrink-0">Demo Role:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => switchRole('tenant')}
                className={`px-2.5 py-0.5 rounded text-xs transition font-medium ${
                  role === 'tenant'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                Tenant
              </button>
              <button
                onClick={() => switchRole('owner')}
                className={`px-2.5 py-0.5 rounded text-xs transition font-medium ${
                  role === 'owner'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                Owner
              </button>
              <button
                onClick={() => switchRole('admin')}
                className={`px-2.5 py-0.5 rounded text-xs transition font-medium ${
                  role === 'admin'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => switchRole('guest')}
                className={`px-2.5 py-0.5 rounded text-xs transition font-medium ${
                  !user
                    ? 'bg-slate-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                }`}
              >
                Guest
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-400 shrink-0 text-[11px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400" /> Pune, MH
            </span>
            <span>ML Engine: <span className="text-emerald-400 font-mono font-medium">Port 8001 (Active)</span></span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 xl:gap-8 min-w-0 shrink-0">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-teal-700 transition">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition">
                  RoomNest
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                  Pune PGs
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Visible on lg and above) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                to="/pgs"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  isActive('/pgs') ? 'text-teal-700 bg-teal-50/80 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Find PGs
              </Link>
              <Link
                to="/roommate-finder"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/roommate-finder') ? 'text-teal-700 bg-teal-50/80 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Roommate Match</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">
                  AI
                </span>
              </Link>
              <Link
                to="/price-estimator"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/price-estimator') ? 'text-teal-700 bg-teal-50/80 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Rent Estimator</span>
              </Link>
              <Link
                to="/model-evaluation"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/model-evaluation') ? 'text-teal-700 bg-teal-50/80 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>AI & DV Studio</span>
                <span className="bg-purple-100 text-purple-800 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">
                  DV
                </span>
              </Link>
              <Link
                to="/compare"
                className={`hidden xl:flex px-3 py-1.5 rounded-md text-sm font-medium transition items-center gap-1.5 ${
                  isActive('/compare') ? 'text-teal-700 bg-teal-50/80 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Compare shortcut on lg screens when hidden from primary nav */}
            <Link
              to="/compare"
              className="xl:hidden relative p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-50 rounded-lg transition"
              title="Compare listings"
            >
              <Layers className="w-4 h-4" />
              {comparisons.length > 0 && (
                <span className="absolute top-1 right-1 bg-teal-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {comparisons.length}
                </span>
              )}
            </Link>

            {/* Tenant Shortlists link */}
            {role === 'tenant' && (
              <Link
                to="/tenant/shortlists"
                className="relative p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-50 rounded-lg transition"
                title="Shortlisted PGs"
              >
                <Heart className="w-4 h-4" />
                {shortlists.length > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {shortlists.length}
                  </span>
                )}
              </Link>
            )}

            {/* Owner "Post a PG" CTA */}
            {role === 'owner' && (
              <Link
                to="/owner/listings/new"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition shadow-xs shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                Add PG Listing
              </Link>
            )}

            {/* User Profile / Dashboard Menu */}
            {user ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition text-sm max-w-[190px]"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {user.full_name.charAt(0)}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-xs font-semibold text-slate-800 leading-tight truncate">
                      {user.full_name}
                    </div>
                    <div className="text-[10px] text-slate-500 capitalize">
                      {user.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{user.email}</p>
                    </div>

                    {/* Role Specific Shortcuts */}
                    {role === 'tenant' && (
                      <>
                        <Link
                          to="/tenant/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Tenant Dashboard
                        </Link>
                        <Link
                          to="/tenant/bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          My Bookings & Invoices
                        </Link>
                        <Link
                          to="/tenant/shortlists"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Saved Shortlists ({shortlists.length})
                        </Link>
                      </>
                    )}

                    {role === 'owner' && (
                      <>
                        <Link
                          to="/owner/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Owner Dashboard
                        </Link>
                        <Link
                          to="/owner/listings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Manage PG Listings
                        </Link>
                        <Link
                          to="/owner/inquiries"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Tenant Inquiries
                        </Link>
                        <Link
                          to="/owner/bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Booking Requests
                        </Link>
                        <Link
                          to="/owner/analytics"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Occupancy & Analytics
                        </Link>
                      </>
                    )}

                    {role === 'admin' && (
                      <>
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Compliance Overview
                        </Link>
                        <Link
                          to="/admin/listings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Listing Moderation Queue
                        </Link>
                        <Link
                          to="/admin/users"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          User & Owner Verification
                        </Link>
                        <Link
                          to="/admin/reports"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          Audit & Import Logs
                        </Link>
                      </>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-1.5"
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
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md hover:bg-slate-100 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 rounded-md shadow-xs transition"
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
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          {/* Quick switcher inside mobile menu */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs font-semibold text-slate-700 mb-2">Switch Demo Account:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { switchRole('tenant'); setMobileMenuOpen(false); }}
                className="text-left text-xs p-2 rounded bg-white border border-slate-200 hover:border-teal-500"
              >
                <div className="font-semibold text-slate-800">Tenant</div>
                <div className="text-[10px] text-slate-500">Tanmay (COEP)</div>
              </button>
              <button
                onClick={() => { switchRole('owner'); setMobileMenuOpen(false); }}
                className="text-left text-xs p-2 rounded bg-white border border-slate-200 hover:border-teal-500"
              >
                <div className="font-semibold text-slate-800">Owner</div>
                <div className="text-[10px] text-slate-500">Suresh Patil</div>
              </button>
              <button
                onClick={() => { switchRole('admin'); setMobileMenuOpen(false); }}
                className="text-left text-xs p-2 rounded bg-white border border-slate-200 hover:border-teal-500"
              >
                <div className="font-semibold text-slate-800">Admin</div>
                <div className="text-[10px] text-slate-500">Moderator</div>
              </button>
              <button
                onClick={() => { switchRole('guest'); setMobileMenuOpen(false); }}
                className="text-left text-xs p-2 rounded bg-white border border-slate-200 hover:border-teal-500"
              >
                <div className="font-semibold text-slate-800">Guest</div>
                <div className="text-[10px] text-slate-500">Public User</div>
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2 pt-2 border-t border-slate-100">
            <Link
              to="/pgs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 py-1.5"
            >
              Find PGs
            </Link>
            <Link
              to="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 py-1.5 flex items-center justify-between"
            >
              <span>Compare Listings</span>
              {comparisons.length > 0 && (
                <span className="bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded-full font-bold">
                  {comparisons.length}
                </span>
              )}
            </Link>
            <Link
              to="/price-estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 py-1.5 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              Rent Estimator
            </Link>
            <Link
              to="/roommate-finder"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 py-1.5 flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-emerald-600" />
              Roommate Match
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">
                AI
              </span>
            </Link>
            <Link
              to="/model-evaluation"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 py-1.5 flex items-center gap-1.5"
            >
              <BarChart3 className="w-4 h-4 text-purple-600" />
              AI & DV Studio
              <span className="bg-purple-100 text-purple-800 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">
                DV
              </span>
            </Link>
            <Link
              to="/help/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 py-1.5"
            >
              Contact & Support
            </Link>
          </div>

          {/* User Links on Mobile */}
          {user ? (
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {user.role} Dashboard
              </div>
              {role === 'tenant' && (
                <>
                  <Link to="/tenant/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-700">
                    Dashboard
                  </Link>
                  <Link to="/tenant/bookings" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-700">
                    My Bookings
                  </Link>
                  <Link to="/tenant/shortlists" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-700">
                    Shortlisted PGs ({shortlists.length})
                  </Link>
                </>
              )}
              {role === 'owner' && (
                <>
                  <Link to="/owner/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-700">
                    Dashboard
                  </Link>
                  <Link to="/owner/listings" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-700">
                    Manage Listings
                  </Link>
                  <Link to="/owner/listings/new" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-teal-700">
                    + Add New PG
                  </Link>
                  <Link to="/owner/inquiries" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-700">
                    Tenant Inquiries
                  </Link>
                </>
              )}
              {role === 'admin' && (
                <>
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-700">
                    Admin Portal
                  </Link>
                  <Link to="/admin/listings" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-700">
                    Moderation Queue
                  </Link>
                </>
              )}
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full mt-2 text-left text-sm text-rose-600 font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-200 flex gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-sm font-semibold border border-slate-300 rounded-md"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-sm font-semibold bg-teal-600 text-white rounded-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
