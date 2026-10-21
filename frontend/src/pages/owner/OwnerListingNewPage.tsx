import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, Building2, MapPin, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';

export const OwnerListingNewPage: React.FC = () => {
  const { addListing } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Form states
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('Wakad');
  const [landmark, setLandmark] = useState('Near Datta Mandir Chowk & Mumbai-Pune Highway');
  const [addressMasked, setAddressMasked] = useState('Wakad, Near Datta Mandir, Pune');
  const [fullAddress, setFullAddress] = useState('Flat 401, Pristine Palms, Datta Mandir Road, Wakad, Pune 411057');
  const [genderPolicy, setGenderPolicy] = useState<'Boys' | 'Girls' | 'Co-ed'>('Boys');
  const [roomTypes, setRoomTypes] = useState<string[]>(['Double Sharing']);
  const [monthlyRent, setMonthlyRent] = useState(9000);
  const [securityDeposit, setSecurityDeposit] = useState(18000);
  const [electricityCharge, setElectricityCharge] = useState(450);
  const [maintenanceCharge, setMaintenanceCharge] = useState(300);
  const [foodPlan, setFoodPlan] = useState('Two Meals (Breakfast + Dinner)');
  const [furnishing, setFurnishing] = useState('Fully Furnished');
  const [curfewTime, setCurfewTime] = useState('11:00 PM');
  const [totalBeds, setTotalBeds] = useState(12);
  const [availableBeds, setAvailableBeds] = useState(3);
  const [distanceToMetro, setDistanceToMetro] = useState(1.4);
  const [distanceToITPark, setDistanceToITPark] = useState(2.8);
  const [description, setDescription] = useState('');

  // Amenities
  const [wifi, setWifi] = useState(true);
  const [ac, setAc] = useState(false);
  const [laundry, setLaundry] = useState(true);
  const [parking, setParking] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = addListing({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-') + '-' + locality.toLowerCase(),
      city: 'Pune',
      locality,
      landmark,
      address_masked: addressMasked,
      full_address: fullAddress,
      gender_policy: genderPolicy,
      room_types: roomTypes,
      monthly_rent_inr: Number(monthlyRent),
      security_deposit_inr: Number(securityDeposit),
      electricity_charge_inr: Number(electricityCharge),
      maintenance_charge_inr: Number(maintenanceCharge),
      food_plan: foodPlan,
      food_type: 'Veg & Non-Veg (Separate)',
      furnishing,
      curfew_time: curfewTime,
      total_beds: Number(totalBeds),
      available_beds: Number(availableBeds),
      distance_to_it_park_km: Number(distanceToITPark),
      distance_to_metro_km: Number(distanceToMetro),
      status: 'active',
      is_demo: false, // Owner-submitted listing is genuine
      photos: [
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      ],
      amenities: {
        wifi,
        ac,
        laundry,
        parking,
        power_backup: true,
        cctv: true,
        attached_washroom: true,
        ro_water: true,
      },
      proximity: [
        { landmark_name: `${locality} Commercial Hub`, distance_km: distanceToITPark, commute_time_mins: 12 },
        { landmark_name: `${locality} Metro Station`, distance_km: distanceToMetro, commute_time_mins: 6 },
      ],
    });

    navigate(`/pgs/${newId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      {/* Header */}
      <div>
        <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
          <Link to="/owner/dashboard" className="hover:text-teal-700">Owner Portal</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">New Listing</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-emerald-600" />
          List a New Pune PG Accommodation
        </h1>
        <p className="text-xs text-slate-500">
          All listings are verified before publishing to students and professionals.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 text-xs font-semibold">
        <span className={`px-3 py-1 rounded-md ${step === 1 ? 'bg-teal-600 text-white' : 'text-slate-500'}`}>
          1. Location & Property
        </span>
        <span className={`px-3 py-1 rounded-md ${step === 2 ? 'bg-teal-600 text-white' : 'text-slate-500'}`}>
          2. Rent & Charges
        </span>
        <span className={`px-3 py-1 rounded-md ${step === 3 ? 'bg-teal-600 text-white' : 'text-slate-500'}`}>
          3. Mess, Rules & Amenities
        </span>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6 text-xs">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-900 text-sm border-b pb-2">Step 1: Property Identification & Location</h2>

            <div>
              <label className="block font-bold text-slate-700 mb-1">PG Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Patil Executive Boys PG"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pune Locality</label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
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
                <label className="block font-bold text-slate-700 mb-1">Gender Policy</label>
                <select
                  value={genderPolicy}
                  onChange={(e) => setGenderPolicy(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border rounded-lg"
                >
                  <option value="Boys">Boys Only</option>
                  <option value="Girls">Girls Only</option>
                  <option value="Co-ed">Co-ed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Landmark / Proximity Hint</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. Near Datta Mandir & Hinjewadi Flyover"
                className="w-full p-2.5 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Masked Public Address</label>
              <input
                type="text"
                value={addressMasked}
                onChange={(e) => setAddressMasked(e.target.value)}
                className="w-full p-2.5 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Confidential Address (Shown only after booking)</label>
              <input
                type="text"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                className="w-full p-2.5 border rounded-lg"
                required
              />
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!name}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-1.5 transition disabled:opacity-50"
              >
                Next: Pricing & Beds <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-900 text-sm border-b pb-2">Step 2: Transparent Pricing & Bed Capacity</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Monthly Rent per Bed (INR)</label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Refundable Security Deposit (INR)</label>
                <input
                  type="number"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Estimated Electricity Charge (INR/mo)</label>
                <input
                  type="number"
                  value={electricityCharge}
                  onChange={(e) => setElectricityCharge(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Maintenance & Housekeeping (INR/mo)</label>
                <input
                  type="number"
                  value={maintenanceCharge}
                  onChange={(e) => setMaintenanceCharge(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Total Bed Capacity</label>
                <input
                  type="number"
                  value={totalBeds}
                  onChange={(e) => setTotalBeds(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Currently Vacant Beds</label>
                <input
                  type="number"
                  value={availableBeds}
                  onChange={(e) => setAvailableBeds(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="border border-slate-300 py-2 px-4 rounded-lg flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-1.5 transition"
              >
                Next: Amenities & Rules <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-900 text-sm border-b pb-2">Step 3: Food Mess, Rules & Amenities</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div>
                <label className="block font-bold text-slate-700 mb-1">Gate Curfew Time</label>
                <input
                  type="text"
                  value={curfewTime}
                  onChange={(e) => setCurfewTime(e.target.value)}
                  placeholder="e.g. 11:00 PM or No Curfew"
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Distance to Nearest Metro (km)</label>
                <input
                  type="number"
                  step="0.1"
                  value={distanceToMetro}
                  onChange={(e) => setDistanceToMetro(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Distance to IT Park / College (km)</label>
                <input
                  type="number"
                  step="0.1"
                  value={distanceToITPark}
                  onChange={(e) => setDistanceToITPark(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-2">Amenities Checklist</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <label className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer">
                  <input type="checkbox" checked={wifi} onChange={(e) => setWifi(e.target.checked)} className="accent-teal-600" />
                  <span>Fiber Wi-Fi</span>
                </label>
                <label className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer">
                  <input type="checkbox" checked={ac} onChange={(e) => setAc(e.target.checked)} className="accent-teal-600" />
                  <span>Air Conditioner</span>
                </label>
                <label className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer">
                  <input type="checkbox" checked={laundry} onChange={(e) => setLaundry(e.target.checked)} className="accent-teal-600" />
                  <span>Washing Machine</span>
                </label>
                <label className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer">
                  <input type="checkbox" checked={parking} onChange={(e) => setParking(e.target.checked)} className="accent-teal-600" />
                  <span>Parking</span>
                </label>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="border border-slate-300 py-2 px-4 rounded-lg flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Publish Verified Listing
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
