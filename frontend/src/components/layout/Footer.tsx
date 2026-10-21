import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#667085] text-xs border-t border-[#E1E6EB] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="RoomNest Logo"
                className="w-7 h-7 rounded-md object-contain border border-[#E1E6EB]"
              />
              <span className="text-[#142B45] font-extrabold text-base tracking-tight">RoomNest</span>
            </div>
            <p className="text-[#667085] leading-relaxed text-xs">
              Student accommodation and PG discovery platform focused on COEP Technological University students and the wider Pune student community. Clear upfront costs, zero hidden brokerage, and verified rooms.
            </p>
            <div className="flex items-center gap-1.5 text-[#243244] font-medium pt-1 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#168C83] shrink-0" />
              <span>Shivajinagar, Pune, Maharashtra 411005</span>
            </div>
          </div>

          {/* Col 2: Top Pune Student Localities */}
          <div>
            <h4 className="text-[#142B45] font-bold text-xs uppercase tracking-wider mb-3">Student Hubs in Pune</h4>
            <ul className="space-y-2 text-[#667085]">
              <li>
                <Link to="/pgs?locality=Shivajinagar" className="hover:text-[#142B45] transition font-medium text-[#142B45]">
                  Shivajinagar (COEP & FC Road)
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Kothrud" className="hover:text-[#142B45] transition">
                  Kothrud (MIT & Karve Road)
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Viman%20Nagar" className="hover:text-[#142B45] transition">
                  Viman Nagar (Symbiosis Hub)
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Hinjewadi" className="hover:text-[#142B45] transition">
                  Hinjewadi (Phases 1-3 Tech Interns)
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Baner" className="hover:text-[#142B45] transition">
                  Baner & Balewadi
                </Link>
              </li>
              <li>
                <Link to="/pgs?locality=Wakad" className="hover:text-[#142B45] transition">
                  Wakad (Datta Mandir Corridor)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Navigation */}
          <div>
            <h4 className="text-[#142B45] font-bold text-xs uppercase tracking-wider mb-3">Student Discovery Tools</h4>
            <ul className="space-y-2 text-[#667085]">
              <li>
                <Link to="/pgs" className="hover:text-[#142B45] transition">
                  Browse All Accommodations
                </Link>
              </li>
              <li>
                <Link to="/roommate-finder" className="hover:text-[#142B45] transition font-medium text-[#168C83]">
                  Roommate Compatibility Match
                </Link>
              </li>
              <li>
                <Link to="/price-estimator" className="hover:text-[#142B45] transition">
                  Fair Rent Calculator
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-[#142B45] transition">
                  Compare Accommodations
                </Link>
              </li>
              <li>
                <Link to="/owner/onboarding" className="hover:text-[#142B45] transition">
                  List Your Property (Owners)
                </Link>
              </li>
              <li>
                <Link to="/help/contact" className="hover:text-[#142B45] transition">
                  Campus Housing Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Security */}
          <div>
            <h4 className="text-[#142B45] font-bold text-xs uppercase tracking-wider mb-3">Trust & Security</h4>
            <ul className="space-y-2 text-[#667085]">
              <li>
                <Link to="/legal/terms" className="hover:text-[#142B45] transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="hover:text-[#142B45] transition">
                  Privacy Policy & Data Security
                </Link>
              </li>
              <li>
                <Link to="/legal/cancellation" className="hover:text-[#142B45] transition">
                  Deposit & Cancellation Policy
                </Link>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-[#F7F5F0] rounded-lg border border-[#E1E6EB] text-[11px] leading-relaxed">
              <span className="text-[#142B45] font-semibold block mb-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#168C83]" /> Verified Standards:
              </span>
              All active properties undergo owner KYC, verified rent disclosure, and physical address confirmation.
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E1E6EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#667085]">
          <div>
            &copy; {new Date().getFullYear()} RoomNest. Built for COEP & Pune student community.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-[#243244]">
              <Shield className="w-3.5 h-3.5 text-[#168C83]" /> PostgreSQL Row-Level Security
            </span>
            <span>•</span>
            <Link to="/model-evaluation" className="text-[#667085] hover:text-[#142B45] transition font-medium">
              Housing Intelligence & Analytics
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
