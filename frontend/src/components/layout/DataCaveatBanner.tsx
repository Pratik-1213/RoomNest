import React, { useState } from 'react';
import { AlertCircle, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DataCaveatBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#E8EDF2] border-b border-[#E1E6EB] text-[#243244] text-xs px-4 py-2 transition-all">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2 flex-1">
          <AlertCircle className="w-4 h-4 text-[#168C83] shrink-0 mt-0.5 sm:mt-0" />
          <div className="leading-snug text-[#243244]">
            <span className="font-bold text-[#142B45]">COEP & Pune Student Housing:</span>{' '}
            Verified student rooms and PG accommodations with transparent deposits, direct owner contact, and zero brokerage across Shivajinagar, Kothrud, Hinjewadi, and Viman Nagar.
            <Link to="/legal/terms" className="underline ml-1.5 font-semibold text-[#168C83] hover:text-[#142B45] inline-flex items-center gap-0.5">
              Housing Standards <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#667085] hover:text-[#142B45] p-1.5 rounded-md hover:bg-[#E1E6EB] transition shrink-0"
          title="Dismiss notice"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
