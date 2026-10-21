import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 text-slate-600 text-xs border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.jpg"
                alt="RoomNest Logo"
                className="w-7 h-7 rounded-md object-contain border border-slate-200"
              />
              <span className="text-slate-900 font-extrabold text-base tracking-tight">RoomNest</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Pune-focused verified PG discovery and housing marketplace. Transparent monthly rent, zero brokerage, and habit-based roommate compatibility for students and tech professionals.
            </p>
            <div className="flex items-center gap-1.5 text-slate-700 font-medium pt-1 text-xs">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Pune Municipal Corporation, Maharashtra</span>
            </div>
          </div>

          {/* Col 2: Top Pune Localities */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">Popular Pune Hubs</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link to="/pgs?locality=Hinjewadi" className="hover:text-teal-700 transition">
                  Hinjewadi Phase 1, 2 & 3
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Kothrud" className="hover:text-teal-700 transition">
                  Kothrud (Near MIT / Karve Rd)
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Viman%20Nagar" className="hover:text-teal-700 transition">
                  Viman Nagar (Symbiosis)
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Wakad" className="hover:text-teal-700 transition">
                  Wakad & Datta Mandir
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Baner" className="hover:text-teal-700 transition">
                  Baner & Balewadi High Street
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Kharadi" className="hover:text-teal-700 transition">
                  Kharadi EON Free Zone
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Navigation */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">Explore & Tools</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link to="/pgs" className="hover:text-teal-700 transition">
                  Browse All Pune PGs
                </Link>
              </li>
              <li>
                <Link to="/roommate-finder" className="hover:text-teal-700 transition font-medium text-teal-700">
                  Find a Roommate
                </Link>
              </li>
              <li>
                <Link to="/price-estimator" className="hover:text-teal-700 transition">
                  Fair Rent Estimator
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-teal-700 transition">
                  Compare Accommodations
                </Link>
              </li>
              <li>
                <Link to="/owner/onboarding" className="hover:text-teal-700 transition">
                  List Your Property (Owners)
                </Link>
              </li>
              <li>
                <Link to="/help/contact" className="hover:text-teal-700 transition">
                  Pune Support & Campus Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Security */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">Trust & Security</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link to="/legal/terms" className="hover:text-teal-700 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="hover:text-teal-700 transition">
                  Privacy Policy & Data Security
                </Link>
              </li>
              <li>
                <Link to="/legal/cancellation" className="hover:text-teal-700 transition">
                  Cancellation & Refund Policy
                </Link>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200 text-[11px] leading-relaxed shadow-2xs">
              <span className="text-teal-700 font-semibold block mb-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-teal-600" /> Inspected Housing:
              </span>
              All active properties undergo owner KYC and physical address confirmation before bookings open.
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} RoomNest Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-slate-600">
              <Shield className="w-3.5 h-3.5 text-teal-600" /> PostgreSQL Row-Level Security
            </span>
            <span>•</span>
            <Link to="/model-evaluation" className="text-slate-500 hover:text-teal-700 transition font-medium">
              Housing Intelligence & Analytics Studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
