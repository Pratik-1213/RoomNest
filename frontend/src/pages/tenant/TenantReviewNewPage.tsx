import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';

export const TenantReviewNewPage: React.FC = () => {
  const { listings, addReview } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listingId, setListingId] = useState(listings[0]?.id || '');
  const [overallRating, setOverallRating] = useState(5.0);
  const [cleanlinessRating, setCleanlinessRating] = useState(5.0);
  const [foodRating, setFoodRating] = useState(4.0);
  const [wifiRating, setWifiRating] = useState(5.0);
  const [ownerBehaviorRating, setOwnerBehaviorRating] = useState(5.0);
  const [comment, setComment] = useState('');
  const [complaintType, setComplaintType] = useState('None');
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sel = listings.find((l) => l.id === listingId);
    addReview({
      listing_id: listingId,
      listing_name: sel?.name,
      overall_rating: overallRating,
      cleanliness_rating: cleanlinessRating,
      food_rating: foodRating,
      wifi_rating: wifiRating,
      owner_behavior_rating: ownerBehaviorRating,
      comment,
      complaint_type: complaintType !== 'None' ? complaintType : undefined,
      would_recommend: wouldRecommend,
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate('/tenant/dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1 text-xs text-teal-700 font-semibold mb-1">
            <ShieldCheck className="w-4 h-4" /> Verified Stay Feedback
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Submit Tenant Experience Review</h1>
          <p className="text-xs text-slate-500">
            Reviews help students and incoming tech interns make informed housing decisions in Pune.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
            <h2 className="text-lg font-bold text-slate-900">Thank You for Your Feedback!</h2>
            <p className="text-xs text-slate-500">
              Your verified review and ratings have been recorded and published on RoomNest.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Select Property</label>
              <select
                value={listingId}
                onChange={(e) => setListingId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border rounded-lg"
              >
                {listings.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.locality}, Pune)
                  </option>
                ))}
              </select>
            </div>

            {/* Overall Rating Slider */}
            <div className="p-4 bg-slate-50 rounded-lg border space-y-3">
              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Overall Rating</span>
                  <span className="text-amber-600 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    {overallRating.toFixed(1)} / 5.0
                  </span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={5.0}
                  step={0.5}
                  value={overallRating}
                  onChange={(e) => setOverallRating(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Sub dimension ratings */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px]">
                <div>
                  <label className="block text-slate-600 mb-1">Cleanliness: {cleanlinessRating}</label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={cleanlinessRating}
                    onChange={(e) => setCleanlinessRating(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Food / Mess Quality: {foodRating}</label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={foodRating}
                    onChange={(e) => setFoodRating(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">WiFi Reliability: {wifiRating}</label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={wifiRating}
                    onChange={(e) => setWifiRating(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Owner Responsiveness: {ownerBehaviorRating}</label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={ownerBehaviorRating}
                    onChange={(e) => setOwnerBehaviorRating(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Detailed Stay Experience</label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience regarding room ventilation, water supply, mess food taste, curfew flexibility, and owner behavior..."
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Report Any Major Complaint</label>
                <select
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-lg"
                >
                  <option value="None">No major issues experienced</option>
                  <option value="WiFi Downtime">WiFi outage / slow speeds</option>
                  <option value="Water Issue">Water pressure / hot water geyser</option>
                  <option value="Food Quality">Mess food hygiene / repetitive menu</option>
                  <option value="Noise Issue">Late night noise disturbance</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Would you recommend this PG?</label>
                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="rec"
                      checked={wouldRecommend}
                      onChange={() => setWouldRecommend(true)}
                      className="accent-teal-600"
                    />
                    <span>Yes, Highly Recommend</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="rec"
                      checked={!wouldRecommend}
                      onChange={() => setWouldRecommend(false)}
                      className="accent-rose-600"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end gap-3">
              <Link to="/tenant/dashboard" className="px-4 py-2 border rounded-lg text-slate-600">
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg shadow-sm"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
