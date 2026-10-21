import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, PlusCircle, MapPin, CheckCircle2, PauseCircle, Trash2, Edit3, Bed } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { ListingStatus } from '../../types';

export const OwnerListingsPage: React.FC = () => {
  const { listings, updateListingStatus, updateListing } = useStore();
  const { user } = useAuth();

  const ownerListings = listings.filter((l) => l.owner_id === user?.id || l.owner_name?.includes('Suresh') || !l.is_demo);

  const handleStatusChange = (id: string, newStatus: ListingStatus) => {
    updateListingStatus(id, newStatus);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
            <Link to="/owner/dashboard" className="hover:text-teal-700">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Listings</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-teal-600" />
            Manage PG Accommodations ({ownerListings.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Toggle status (Active, Paused, Occupied) and adjust vacant beds in real-time.
          </p>
        </div>

        <Link
          to="/owner/listings/new"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4" /> Add New PG Listing
        </Link>
      </div>

      <div className="space-y-4">
        {ownerListings.map((l) => (
          <div key={l.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <img
                src={l.photos[0]}
                alt={l.name}
                className="w-24 h-20 object-cover rounded-lg border shrink-0"
              />
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <Link to={`/pgs/${l.id}`} className="font-bold text-base text-slate-900 hover:text-teal-700">
                    {l.name}
                  </Link>
                  {l.is_demo ? (
                    <span className="badge-demo text-[10px] px-1.5 py-0.5 rounded font-semibold">
                      Demo Dataset
                    </span>
                  ) : (
                    <span className="badge-verified text-[10px] px-1.5 py-0.5 rounded font-semibold">
                      Owner Verified
                    </span>
                  )}
                </div>

                <div className="text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  {l.locality}, Pune • {l.gender_policy} PG
                </div>

                <div className="text-slate-700 font-medium pt-1">
                  Rent: <span className="font-bold text-slate-900">₹{l.monthly_rent_inr.toLocaleString('en-IN')}/mo</span> • Deposit: ₹{l.security_deposit_inr.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Bed Vacancy Controller & Status Selector */}
            <div className="flex flex-wrap items-center gap-4 text-xs border-t md:border-t-0 pt-3 md:pt-0">
              {/* Available Beds */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Vacant Beds</span>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => updateListing(l.id, { available_beds: Math.max(0, l.available_beds - 1) })}
                    className="w-6 h-6 bg-white hover:bg-slate-200 rounded font-bold border"
                  >
                    -
                  </button>
                  <span className="font-bold text-slate-800 text-sm px-1">{l.available_beds}</span>
                  <button
                    onClick={() => updateListing(l.id, { available_beds: l.available_beds + 1 })}
                    className="w-6 h-6 bg-white hover:bg-slate-200 rounded font-bold border"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Status</span>
                <select
                  value={l.status}
                  onChange={(e) => handleStatusChange(l.id, e.target.value as ListingStatus)}
                  className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-hidden ${
                    l.status === 'active'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : l.status === 'paused'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  <option value="active">Active (Visible)</option>
                  <option value="paused">Paused (Hidden)</option>
                  <option value="occupied">Fully Occupied</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* View / Edit CTAs */}
              <div className="flex items-center gap-2">
                <Link
                  to={`/pgs/${l.id}`}
                  className="bg-slate-900 hover:bg-teal-700 text-white font-semibold px-3 py-2 rounded-lg transition"
                >
                  Preview
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
