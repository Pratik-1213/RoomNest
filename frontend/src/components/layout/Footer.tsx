import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Heart, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-white font-bold text-base tracking-tight">RoomNest</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Pune-focused PG discovery and verified housing marketplace. Transparent monthly rent, zero hidden charges, and explainable rent estimation for students and IT professionals.
            </p>
            <div className="flex items-center gap-1.5 text-slate-300 font-medium pt-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Pune Municipal Corporation, Maharashtra</span>
            </div>
          </div>

          {/* Col 2: Top Pune Localities */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Popular Pune Hubs</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/pgs?locality=Hinjewadi" className="hover:text-teal-400 transition">
                  Hinjewadi Phase 1, 2 & 3
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Kothrud" className="hover:text-teal-400 transition">
                  Kothrud (Near MIT / Karve Rd)
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Viman%20Nagar" className="hover:text-teal-400 transition">
                  Viman Nagar (Near Symbiosis)
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Wakad" className="hover:text-teal-400 transition">
                  Wakad & Datta Mandir
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Baner" className="hover:text-teal-400 transition">
                  Baner & Balewadi High Street
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Kharadi" className="hover:text-teal-400 transition">
                  Kharadi EON Free Zone
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Platform & AI Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/price-estimator" className="hover:text-teal-400 transition">
                  AI Rent Estimator (Pune Model)
                </Link>
              </li>
              <li>
                <Link to="/roommate-finder" className="hover:text-teal-400 transition">
                  AI Roommate Compatibility Matcher
                </Link>
              </li>
              <li>
                <Link to="/model-evaluation" className="hover:text-teal-400 transition font-medium text-purple-300">
                  AI & DV Evaluation Studio (DV 5th Sem)
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-teal-400 transition">
                  Compare PG Listings
                </Link>
              </li>
              <li>
                <Link to="/help/contact" className="hover:text-teal-400 transition">
                  Pune Support & Campus Outreach
                </Link>
              </li>
              <li>
                <Link to="/owner/onboarding" className="hover:text-teal-400 transition">
                  List Your Property (PG Owners)
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-teal-400 transition">
                  Admin & Verification Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Caveat */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Legal & Security</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/legal/terms" className="hover:text-teal-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="hover:text-teal-400 transition">
                  Privacy Policy & Data Security
                </Link>
              </li>
              <li>
                <Link to="/legal/cancellation" className="hover:text-teal-400 transition">
                  Cancellation & Refund Policy
                </Link>
              </li>
            </ul>
            <div className="mt-4 p-2.5 bg-slate-800/80 rounded border border-slate-700/80 text-[11px] leading-relaxed">
              <span className="text-amber-400 font-semibold block mb-0.5">Prototype Caveat:</span>
              Demo listings are generated from the exploratory 10,000-row research dataset. Owners must complete in-person KYC verification before accepting bookings.
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} RoomNest Pune PG Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-teal-500" /> Zero-Trust Supabase RLS
            </span>
            <span>•</span>
            <span>FastAPI ML v1.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
