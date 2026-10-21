import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Building2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const OwnerListingEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { listings, updateListing } = useStore();

  const listing = listings.find((l) => l.id === id);

  const [name, setName] = useState(listing?.name || '');
  const [rent, setRent] = useState(listing?.monthly_rent_inr || 9000);
  const [deposit, setDeposit] = useState(listing?.security_deposit_inr || 18000);
  const [availableBeds, setAvailableBeds] = useState(listing?.available_beds || 2);
  const [curfew, setCurfew] = useState(listing?.curfew_time || '11:00 PM');
  const [foodPlan, setFoodPlan] = useState(listing?.food_plan || 'Two Meals (Breakfast + Dinner)');

  if (!listing) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <p className="text-xs text-slate-500">Listing not found.</p>
        <Link to="/owner/listings" className="text-xs font-bold text-teal-700">Back to Listings</Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateListing(listing.id, {
      name,
      monthly_rent_inr: Number(rent),
      security_deposit_inr: Number(deposit),
      available_beds: Number(availableBeds),
      curfew_time: curfew,
      food_plan: foodPlan,
    });
    navigate('/owner/listings');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <Link to="/owner/listings" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to My Listings
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Edit Listing: {listing.name}</h1>
          <p className="text-xs text-slate-500">{listing.locality}, Pune</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">PG Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Monthly Rent (INR)</label>
              <input
                type="number"
                value={rent}
                onChange={(e) => setRent(Number(e.target.value))}
                className="w-full p-2.5 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Security Deposit (INR)</label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="w-full p-2.5 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Vacant Beds</label>
              <input
                type="number"
                value={availableBeds}
                onChange={(e) => setAvailableBeds(Number(e.target.value))}
                className="w-full p-2.5 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Gate Curfew</label>
              <input
                type="text"
                value={curfew}
                onChange={(e) => setCurfew(e.target.value)}
                className="w-full p-2.5 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Food Plan</label>
            <select
              value={foodPlan}
              onChange={(e) => setFoodPlan(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border rounded-lg"
            >
              <option value="Two Meals (Breakfast + Dinner)">Two Meals (Breakfast + Dinner)</option>
              <option value="Three Meals">Three Meals Included</option>
              <option value="Breakfast Only">Breakfast Only</option>
              <option value="No Food">No Food (Mess Optional)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Link to="/owner/listings" className="px-4 py-2 border rounded-lg">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
