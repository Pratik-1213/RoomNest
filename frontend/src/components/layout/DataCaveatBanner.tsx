import React, { useState } from 'react';
import { AlertCircle, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DataCaveatBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-emerald-50/90 border-b border-emerald-200/80 text-emerald-950 text-xs px-4 py-2 transition-all">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2 flex-1">
          <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5 sm:mt-0" />
          <div className="leading-snug text-slate-800">
            <span className="font-bold text-slate-900">Pune Tenant Guarantee:</span>{' '}
            100% physically verified properties, zero hidden brokerage, direct owner agreements, and fair rent benchmarks across Hinjewadi, Kothrud, Baner, and Viman Nagar.
            <Link to="/legal/terms" className="underline ml-1.5 font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-0.5">
              Verification Standards <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-700 hover:text-amber-950 p-1.5 rounded-md hover:bg-amber-100 transition shrink-0"
          title="Dismiss notice"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
