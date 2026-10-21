import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Layers, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ListingCard } from '../../components/common/ListingCard';

export const TenantShortlistsPage: React.FC = () => {
  const { listings, shortlists } = useStore();
  const shortlistedListings = listings.filter((l) => shortlists.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
            <Link to="/tenant/dashboard" className="hover:text-teal-700">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Shortlists</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            Saved Shortlists ({shortlistedListings.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Properties you've bookmarked for further review and side-by-side comparison
          </p>
        </div>

        {shortlistedListings.length > 1 && (
          <Link
            to="/compare"
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition"
          >
            <Layers className="w-4 h-4" /> Compare Shortlisted PGs
          </Link>
        )}
      </div>

      {shortlistedListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlistedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Your Shortlist is Empty</h3>
          <p className="text-xs text-slate-500">
            Click the heart icon on any PG card across Hinjewadi, Kothrud, or Viman Nagar to save it here.
          </p>
          <div className="pt-2">
            <Link
              to="/pgs"
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-lg inline-block"
            >
              Browse Available PGs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
