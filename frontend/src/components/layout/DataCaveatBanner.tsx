import React, { useState } from 'react';
import { AlertCircle, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DataCaveatBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50/95 border-b border-amber-200 text-amber-950 text-xs px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2 flex-1">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
          <div className="leading-snug">
            <span className="font-bold text-amber-950">Research Data Caveat:</span>{' '}
            Exploratory inventory tagged for academic prototyping and ML training. Genuine bookings require owner KYC verification.
            <Link to="/price-estimator" className="underline ml-1.5 font-semibold text-amber-900 hover:text-amber-950 inline-flex items-center gap-0.5">
              AI Rent Policy <ExternalLink className="w-3 h-3" />
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
