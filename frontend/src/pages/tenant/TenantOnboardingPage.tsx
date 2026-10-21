import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TenantOnboardingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [preferredLocality, setPreferredLocality] = useState('Hinjewadi');
  const [roomType, setRoomType] = useState('Double Sharing');
  const [maxBudget, setMaxBudget] = useState(12000);
  const [foodRequired, setFoodRequired] = useState(true);
  const [collegeOrOffice, setCollegeOrOffice] = useState('COEP Tech Park / Hinjewadi Phase 1');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Preferences stored
    navigate('/tenant/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
            <UserCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Tenant Housing Preferences</h1>
          <p className="text-xs text-slate-500">
            Tell us about your campus, workplace, and budget to calibrate your Pune recommendations.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Workplace or College Campus in Pune</label>
            <input
              type="text"
              value={collegeOrOffice}
              onChange={(e) => setCollegeOrOffice(e.target.value)}
              placeholder="e.g. COEP Shivajinagar, Symbiosis Viman Nagar, Infosys Hinjewadi"
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Preferred Locality</label>
              <select
                value={preferredLocality}
                onChange={(e) => setPreferredLocality(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border rounded-lg"
              >
                <option value="Hinjewadi">Hinjewadi</option>
                <option value="Kothrud">Kothrud</option>
                <option value="Viman Nagar">Viman Nagar</option>
                <option value="Wakad">Wakad</option>
                <option value="Baner">Baner</option>
                <option value="Kharadi">Kharadi</option>
                <option value="Shivajinagar">Shivajinagar</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Room Sharing Preference</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border rounded-lg"
              >
                <option value="Single Room">Single Room (Private)</option>
                <option value="Double Sharing">Double Sharing (2 Beds)</option>
                <option value="Triple Sharing">Triple Sharing (3 Beds)</option>
                <option value="Four Sharing">Four Sharing</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1">
              <span>Maximum Monthly Budget (INR)</span>
              <span className="text-teal-700">₹{maxBudget.toLocaleString('en-IN')}/mo</span>
            </div>
            <input
              type="range"
              min={6000}
              max={25000}
              step={500}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={foodRequired}
              onChange={(e) => setFoodRequired(e.target.checked)}
              className="accent-teal-600 rounded"
            />
            <span>I require daily food mess (Breakfast & Dinner) included in my PG</span>
          </label>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg shadow-sm transition"
          >
            Save Preferences & Go to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
