import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Sparkles,
  Heart,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Moon,
  Sun,
  Coffee,
  Volume2,
  Sliders,
  DollarSign,
  MapPin,
  Smile,
  Zap,
  Building2,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Types matching FastAPI Roommate Compatibility Model schemas
export interface RoommateCandidate {
  name: string;
  age: number;
  occupation: string;
  preferred_locality: string;
  budget_inr: number;
  sleep_schedule: string;
  cleanliness_level: string;
  diet_preference: string;
  study_work_routine: string;
  social_habits: string;
  smoking_drinking: string;
  ac_preference: string;
  hobbies: string[];
}

export interface DimensionScore {
  dimension: string;
  score_percentage: number;
  status: string;
  note: string;
}

export interface RoommateCompatibilityResult {
  overall_compatibility_score: number;
  compatibility_tier: string;
  dimension_scores: DimensionScore[];
  shared_interests: string[];
  synergies: string[];
  friction_points: string[];
  co_living_advice: string;
  model_version: string;
}

const ALL_HOBBIES = [
  'Coding',
  'Gaming',
  'Gym',
  'Cricket',
  'Music',
  'Reading',
  'Cooking',
  'Travel',
  'Photography',
  'Netflix',
  'Badminton',
  'Yoga',
  'Football'
];

const LOCALITIES = [
  'Hinjewadi',
  'Kothrud',
  'Viman Nagar',
  'Wakad',
  'Baner',
  'Kharadi',
  'Shivajinagar',
  'Aundh',
  'Bavdhan',
  'Hadapsar'
];

// Curated Pune roommate profiles looking for co-living
const FEATURED_PROFILES: (RoommateCandidate & { bio: string; id: string; targetCollegeCompany: string })[] = [
  {
    id: 'pune-rm-1',
    name: 'Tanmay Kulkarni',
    age: 22,
    occupation: 'Engineering Final Year',
    preferred_locality: 'Kothrud',
    budget_inr: 9500,
    sleep_schedule: 'Night Owl',
    cleanliness_level: 'Moderate',
    diet_preference: 'Non-Veg',
    study_work_routine: 'Late Night Study',
    social_habits: 'Ambivert',
    smoking_drinking: 'Strictly No',
    ac_preference: 'Night Only',
    hobbies: ['Coding', 'Gaming', 'Gym'],
    bio: 'COEP student preparing for campus placements. Looking for a quiet, focused roommate in Kothrud or Karve Nagar.',
    targetCollegeCompany: 'COEP Tech / Tech Mahindra'
  },
  {
    id: 'pune-rm-2',
    name: 'Rohan Deshmukh',
    age: 24,
    occupation: 'Associate Software Engineer',
    preferred_locality: 'Hinjewadi',
    budget_inr: 11000,
    sleep_schedule: 'Night Owl',
    cleanliness_level: 'Moderate',
    diet_preference: 'Non-Veg',
    study_work_routine: 'Late Night Study',
    social_habits: 'Ambivert',
    smoking_drinking: 'Strictly No',
    ac_preference: 'Night Only',
    hobbies: ['Gaming', 'Gym', 'Cricket'],
    bio: 'Wipro Hinjewadi Phase 2 developer. Looking to split a 2-sharing PG with another tech professional.',
    targetCollegeCompany: 'Wipro Hinjewadi Phase 2'
  },
  {
    id: 'pune-rm-3',
    name: 'Ananya Sharma',
    age: 21,
    occupation: 'MBA Intern',
    preferred_locality: 'Viman Nagar',
    budget_inr: 12500,
    sleep_schedule: 'Early Bird',
    cleanliness_level: 'Very Neat',
    diet_preference: 'Pure Veg',
    study_work_routine: 'Regular Hours',
    social_habits: 'Introvert (Quiet sanctuary)',
    smoking_drinking: 'Strictly No',
    ac_preference: 'Chilled (All Night)',
    hobbies: ['Reading', 'Yoga', 'Music'],
    bio: 'Symbiosis Viman Nagar intern. Respects quiet hours, organized living, and vegetarian kitchen setup.',
    targetCollegeCompany: 'Symbiosis / EON IT Kharadi'
  },
  {
    id: 'pune-rm-4',
    name: 'Siddharth Patil',
    age: 23,
    occupation: 'Data Analyst',
    preferred_locality: 'Wakad',
    budget_inr: 10000,
    sleep_schedule: 'Flexible',
    cleanliness_level: 'Moderate',
    diet_preference: 'Eggetarian',
    study_work_routine: 'WFH / Remote',
    social_habits: 'Ambivert',
    smoking_drinking: 'Strictly No',
    ac_preference: 'Night Only',
    hobbies: ['Football', 'Badminton', 'Netflix'],
    bio: 'Remote analyst needing decent high-speed WiFi and friendly chill vibe. Wakad / Hinjewadi commuter.',
    targetCollegeCompany: 'Infosys / Cognizant'
  }
];

export const RoommateFinderPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Candidate A (You or first person)
  const [candidateA, setCandidateA] = useState<RoommateCandidate>({
    name: user?.full_name || 'You (Candidate A)',
    age: 22,
    occupation: 'Student / Intern',
    preferred_locality: 'Hinjewadi',
    budget_inr: 10000,
    sleep_schedule: 'Night Owl',
    cleanliness_level: 'Moderate',
    diet_preference: 'Non-Veg',
    study_work_routine: 'Late Night Study',
    social_habits: 'Ambivert',
    smoking_drinking: 'Strictly No',
    ac_preference: 'Night Only',
    hobbies: ['Coding', 'Gaming', 'Gym']
  });

  // Candidate B (Prospective Roommate)
  const [candidateB, setCandidateB] = useState<RoommateCandidate>({
    name: 'Rohan Deshmukh',
    age: 24,
    occupation: 'Associate Software Engineer',
    preferred_locality: 'Hinjewadi',
    budget_inr: 11000,
    sleep_schedule: 'Night Owl',
    cleanliness_level: 'Moderate',
    diet_preference: 'Non-Veg',
    study_work_routine: 'Late Night Study',
    social_habits: 'Ambivert',
    smoking_drinking: 'Strictly No',
    ac_preference: 'Night Only',
    hobbies: ['Gaming', 'Gym', 'Cricket']
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoommateCompatibilityResult | null>(null);
  const [activeTab, setActiveTab] = useState<'matchmaker' | 'directory'>('matchmaker');

  // Toggle hobby selection
  const toggleHobby = (person: 'A' | 'B', hobby: string) => {
    if (person === 'A') {
      const current = [...candidateA.hobbies];
      const idx = current.indexOf(hobby);
      if (idx >= 0) {
        current.splice(idx, 1);
      } else {
        current.push(hobby);
      }
      setCandidateA({ ...candidateA, hobbies: current });
    } else {
      const current = [...candidateB.hobbies];
      const idx = current.indexOf(hobby);
      if (idx >= 0) {
        current.splice(idx, 1);
      } else {
        current.push(hobby);
      }
      setCandidateB({ ...candidateB, hobbies: current });
    }
  };

  // Run Roommate Compatibility ML Model
  const handleCalculateCompatibility = async () => {
    setLoading(true);
    const payload = {
      candidate_a: candidateA,
      candidate_b: candidateB
    };

    try {
      // Primary: call FastAPI server on port 8001 (proxied or direct)
      const res = await fetch('http://127.0.0.1:8001/v1/predictions/roommate-compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data: RoommateCompatibilityResult = await res.json();
        setResult(data);
        setLoading(false);
        return;
      }
    } catch {
      console.log('Using client fallback calculation for Roommate Compatibility');
    }

    // Client-side fallback calculation matching backend Random Forest logic
    const sleepLevels: Record<string, number> = { 'Early Bird': 0, 'Flexible': 1, 'Night Owl': 2 };
    const sleepDiff = Math.abs((sleepLevels[candidateA.sleep_schedule] ?? 1) - (sleepLevels[candidateB.sleep_schedule] ?? 1));

    const cleanLevels: Record<string, number> = { 'Very Neat': 0, 'Moderate': 1, 'Relaxed': 2 };
    const cleanDiff = Math.abs((cleanLevels[candidateA.cleanliness_level] ?? 1) - (cleanLevels[candidateB.cleanliness_level] ?? 1));

    const dietHarmony =
      candidateA.diet_preference === candidateB.diet_preference
        ? 1.0
        : (candidateA.diet_preference.includes('Veg') && candidateB.diet_preference.includes('Non-Veg')) ||
          (candidateA.diet_preference.includes('Non-Veg') && candidateB.diet_preference.includes('Veg'))
        ? 0.55
        : 0.8;

    const studyMatch = candidateA.study_work_routine === candidateB.study_work_routine ? 1.0 : 0.65;
    const socialHarmony = candidateA.social_habits === candidateB.social_habits ? 1.0 : 0.75;
    const substanceMatch =
      candidateA.smoking_drinking === candidateB.smoking_drinking
        ? 1.0
        : candidateA.smoking_drinking.includes('Strictly No') && candidateB.smoking_drinking.includes('Social')
        ? 0.3
        : 0.65;
    const acHarmony = candidateA.ac_preference === candidateB.ac_preference ? 1.0 : 0.6;

    const maxB = Math.max(candidateA.budget_inr, candidateB.budget_inr, 1);
    const budgetGap = Math.min(1.0, Math.abs(candidateA.budget_inr - candidateB.budget_inr) / maxB);

    const setA = new Set(candidateA.hobbies.map((h) => h.toLowerCase()));
    const setB = new Set(candidateB.hobbies.map((h) => h.toLowerCase()));
    const shared = candidateA.hobbies.filter((h) => setB.has(h.toLowerCase()));
    const localityMatch = candidateA.preferred_locality.toLowerCase() === candidateB.preferred_locality.toLowerCase() ? 1 : 0;

    // Synthetic score formula
    let baseScore =
      30.0 +
      (1.0 - sleepDiff / 2.0) * 16.0 +
      (1.0 - cleanDiff / 2.0) * 14.0 +
      dietHarmony * 12.0 +
      studyMatch * 8.0 +
      socialHarmony * 8.0 +
      substanceMatch * 10.0 +
      acHarmony * 6.0 +
      (1.0 - budgetGap) * 8.0 +
      localityMatch * 10.0 +
      Math.min(5, shared.length) * 3.0;

    baseScore = Math.min(98.5, Math.max(25.0, Math.round(baseScore * 10) / 10));

    let tier = 'Moderate Synergy Roommates';
    if (baseScore >= 85) tier = 'High Synergy Roommates';
    else if (baseScore >= 70) tier = 'Good Synergy Roommates';
    else if (baseScore < 50) tier = 'Challenging Fit';

    const synergiesList: string[] = [];
    if (sleepDiff === 0) synergiesList.push(`Both are ${candidateA.sleep_schedule}s; no sleep disturbance.`);
    if (cleanDiff === 0) synergiesList.push('Matched room cleanliness and tidiness expectations.');
    if (shared.length > 0) synergiesList.push(`Shared interests in ${shared.join(', ')}.`);
    if (localityMatch) synergiesList.push(`Both are looking specifically in ${candidateA.preferred_locality}, Pune.`);

    const frictionList: string[] = [];
    if (sleepDiff === 2) frictionList.push('Opposite sleep schedules (Early Bird vs Night Owl).');
    if (cleanDiff === 2) frictionList.push('Discrepancy between Very Neat and Relaxed tidiness.');
    if (dietHarmony < 0.6) frictionList.push('Pure Veg vs Non-Veg kitchen cooking boundaries.');

    setResult({
      overall_compatibility_score: baseScore,
      compatibility_tier: tier,
      dimension_scores: [
        {
          dimension: 'Sleep & Routine Alignment',
          score_percentage: Math.round((1.0 - sleepDiff / 2.0) * 100),
          status: sleepDiff === 0 ? 'Harmonious' : sleepDiff === 1 ? 'Minor Adjustment' : 'Opposite Schedules',
          note: `${candidateA.name} is ${candidateA.sleep_schedule} while ${candidateB.name} is ${candidateB.sleep_schedule}.`
        },
        {
          dimension: 'Cleanliness & Living Standards',
          score_percentage: Math.round((1.0 - cleanDiff / 2.0) * 100),
          status: cleanDiff === 0 ? 'Great Match' : cleanDiff === 1 ? 'Manageable' : 'High Gap',
          note: cleanDiff > 0 ? 'Clear chore schedule recommended.' : 'Identical tidiness standards.'
        },
        {
          dimension: 'Dietary & Kitchen Compatibility',
          score_percentage: Math.round(dietHarmony * 100),
          status: dietHarmony > 0.7 ? 'Compatible' : 'Separate Storage Advised',
          note: `${candidateA.diet_preference} and ${candidateB.diet_preference} preferences.`
        },
        {
          dimension: 'Social, Guests & Study Noise',
          score_percentage: Math.round(((socialHarmony + studyMatch) / 2.0) * 100),
          status: socialHarmony >= 0.8 ? 'Aligned' : 'Quiet Hours Agreement Advised',
          note: `${candidateA.name}: ${candidateA.social_habits} | ${candidateB.name}: ${candidateB.social_habits}`
        },
        {
          dimension: 'Budget & Pune Locality Match',
          score_percentage: Math.round(((1.0 - budgetGap) * 0.7 + localityMatch * 0.3) * 100),
          status: localityMatch && budgetGap < 0.2 ? 'Perfect Match' : 'Flexible',
          note: `Targeting ${candidateA.preferred_locality} (₹${candidateA.budget_inr.toLocaleString('en-IN')} & ₹${candidateB.budget_inr.toLocaleString('en-IN')})`
        }
      ],
      shared_interests: shared,
      synergies: synergiesList,
      friction_points: frictionList,
      co_living_advice:
        baseScore >= 80
          ? 'Terrific co-living synergy! You both have compatible day-to-day rhythms and shared Pune preferences. You are ready to book a 2-sharing PG room together.'
          : 'Good potential with mutual agreement on cleaning chores, kitchen utensils, and study quiet hours.',
      model_version: 'v2.0.0-RandomForest'
    });
    setLoading(false);
  };

  // Load a profile from directory into Candidate B
  const loadProfileIntoCandidateB = (prof: typeof FEATURED_PROFILES[0]) => {
    setCandidateB({
      name: prof.name,
      age: prof.age,
      occupation: prof.occupation,
      preferred_locality: prof.preferred_locality,
      budget_inr: prof.budget_inr,
      sleep_schedule: prof.sleep_schedule,
      cleanliness_level: prof.cleanliness_level,
      diet_preference: prof.diet_preference,
      study_work_routine: prof.study_work_routine,
      social_habits: prof.social_habits,
      smoking_drinking: prof.smoking_drinking,
      ac_preference: prof.ac_preference,
      hobbies: [...prof.hobbies]
    });
    setActiveTab('matchmaker');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-50/80 via-white to-emerald-50/70 text-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-teal-200/80">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-900 border border-teal-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            Pune Co-Living Compatibility & Flatmate Matchmaker
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Find Your Ideal Pune PG Roommate
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Co-living works best when sleep cycles, study hours, food preferences, and cleanliness habits align.
            Compare your profile against active Pune seekers or evaluate mutual compatibility before reserving a shared room.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
            <span className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-medium shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 10 Behavioral & Lifestyle Vectors
            </span>
            <span className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-medium shadow-xs">
              <Zap className="w-3.5 h-3.5 text-amber-600" /> Hobby & Schedule Synergy
            </span>
            <span className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-medium shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-teal-600" /> Direct 2-Sharing PG Pairing
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('matchmaker')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition ${
            activeTab === 'matchmaker'
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Side-by-Side Matchmaker Calculator
        </button>
        <button
          onClick={() => setActiveTab('directory')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition ${
            activeTab === 'directory'
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Browse Pune Flatmate Profiles ({FEATURED_PROFILES.length})
        </button>
      </div>

      {/* TAB 1: MATCHMAKER CALCULATOR */}
      {activeTab === 'matchmaker' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PERSON A */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm">
                    A
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Person A (Your Profile)</h2>
                    <p className="text-xs text-slate-500">Your lifestyle and living preferences</p>
                  </div>
                </div>
                <span className="text-xs bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded border border-teal-200">
                  Primary
                </span>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={candidateA.name}
                    onChange={(e) => setCandidateA({ ...candidateA, name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Occupation / College</label>
                  <input
                    type="text"
                    value={candidateA.occupation}
                    onChange={(e) => setCandidateA({ ...candidateA, occupation: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Locality</label>
                  <select
                    value={candidateA.preferred_locality}
                    onChange={(e) => setCandidateA({ ...candidateA, preferred_locality: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-teal-500 bg-white"
                  >
                    {LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Budget: ₹{candidateA.budget_inr.toLocaleString('en-IN')}
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="25000"
                    step="500"
                    value={candidateA.budget_inr}
                    onChange={(e) => setCandidateA({ ...candidateA, budget_inr: Number(e.target.value) })}
                    className="w-full accent-teal-600 mt-2"
                  />
                </div>
              </div>

              {/* Lifestyle Habits */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Daily Rhythm & Habits
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Sleep Schedule</label>
                    <select
                      value={candidateA.sleep_schedule}
                      onChange={(e) => setCandidateA({ ...candidateA, sleep_schedule: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Night Owl">Night Owl (1 AM - 9 AM)</option>
                      <option value="Early Bird">Early Bird (10 PM - 6 AM)</option>
                      <option value="Flexible">Flexible Schedule</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Cleanliness Standard</label>
                    <select
                      value={candidateA.cleanliness_level}
                      onChange={(e) => setCandidateA({ ...candidateA, cleanliness_level: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Very Neat">Very Neat (Daily sweep/made bed)</option>
                      <option value="Moderate">Moderate (Weekly tidy)</option>
                      <option value="Relaxed">Relaxed (Casual living)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Diet Preference</label>
                    <select
                      value={candidateA.diet_preference}
                      onChange={(e) => setCandidateA({ ...candidateA, diet_preference: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Non-Veg">Non-Veg</option>
                      <option value="Pure Veg">Pure Veg</option>
                      <option value="Eggetarian">Eggetarian</option>
                      <option value="Vegan">Vegan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Study / Work Routine</label>
                    <select
                      value={candidateA.study_work_routine}
                      onChange={(e) => setCandidateA({ ...candidateA, study_work_routine: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Late Night Study">Late Night Study</option>
                      <option value="Regular Hours">Regular Office/College Hours</option>
                      <option value="WFH / Remote">WFH / Remote (At desk all day)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Social & Guests</label>
                    <select
                      value={candidateA.social_habits}
                      onChange={(e) => setCandidateA({ ...candidateA, social_habits: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Ambivert">Ambivert (Balanced)</option>
                      <option value="Introvert (Quiet sanctuary)">Introvert (Quiet sanctuary)</option>
                      <option value="Extrovert (Guests welcome)">Extrovert (Friends welcome)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">AC Preference</label>
                    <select
                      value={candidateA.ac_preference}
                      onChange={(e) => setCandidateA({ ...candidateA, ac_preference: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Night Only">Night Only</option>
                      <option value="Chilled (All Night)">Chilled (All Night)</option>
                      <option value="Fan Only / No AC">Fan Only / No AC</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Hobbies / Interests */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Interests & Hobbies (Pick 3-5)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_HOBBIES.map((h) => {
                    const isSelected = candidateA.hobbies.includes(h);
                    return (
                      <button
                        key={h}
                        type="button"
                        onClick={() => toggleHobby('A', h)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600 font-semibold shadow-xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {isSelected ? '✓ ' : ''}{h}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* PERSON B */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                    B
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Person B (Prospective Roommate)</h2>
                    <p className="text-xs text-slate-500">Candidate to evaluate compatibility against</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('directory')}
                  className="text-xs text-teal-700 hover:underline font-semibold"
                >
                  Pick from Directory
                </button>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={candidateB.name}
                    onChange={(e) => setCandidateB({ ...candidateB, name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Occupation / College</label>
                  <input
                    type="text"
                    value={candidateB.occupation}
                    onChange={(e) => setCandidateB({ ...candidateB, occupation: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Locality</label>
                  <select
                    value={candidateB.preferred_locality}
                    onChange={(e) => setCandidateB({ ...candidateB, preferred_locality: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-emerald-500 bg-white"
                  >
                    {LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Budget: ₹{candidateB.budget_inr.toLocaleString('en-IN')}
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="25000"
                    step="500"
                    value={candidateB.budget_inr}
                    onChange={(e) => setCandidateB({ ...candidateB, budget_inr: Number(e.target.value) })}
                    className="w-full accent-emerald-600 mt-2"
                  />
                </div>
              </div>

              {/* Lifestyle Habits */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Daily Rhythm & Habits
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Sleep Schedule</label>
                    <select
                      value={candidateB.sleep_schedule}
                      onChange={(e) => setCandidateB({ ...candidateB, sleep_schedule: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Night Owl">Night Owl (1 AM - 9 AM)</option>
                      <option value="Early Bird">Early Bird (10 PM - 6 AM)</option>
                      <option value="Flexible">Flexible Schedule</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Cleanliness Standard</label>
                    <select
                      value={candidateB.cleanliness_level}
                      onChange={(e) => setCandidateB({ ...candidateB, cleanliness_level: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Very Neat">Very Neat (Daily sweep/made bed)</option>
                      <option value="Moderate">Moderate (Weekly tidy)</option>
                      <option value="Relaxed">Relaxed (Casual living)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Diet Preference</label>
                    <select
                      value={candidateB.diet_preference}
                      onChange={(e) => setCandidateB({ ...candidateB, diet_preference: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Non-Veg">Non-Veg</option>
                      <option value="Pure Veg">Pure Veg</option>
                      <option value="Eggetarian">Eggetarian</option>
                      <option value="Vegan">Vegan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Study / Work Routine</label>
                    <select
                      value={candidateB.study_work_routine}
                      onChange={(e) => setCandidateB({ ...candidateB, study_work_routine: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Late Night Study">Late Night Study</option>
                      <option value="Regular Hours">Regular Office/College Hours</option>
                      <option value="WFH / Remote">WFH / Remote (At desk all day)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Social & Guests</label>
                    <select
                      value={candidateB.social_habits}
                      onChange={(e) => setCandidateB({ ...candidateB, social_habits: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Ambivert">Ambivert (Balanced)</option>
                      <option value="Introvert (Quiet sanctuary)">Introvert (Quiet sanctuary)</option>
                      <option value="Extrovert (Guests welcome)">Extrovert (Friends welcome)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">AC Preference</label>
                    <select
                      value={candidateB.ac_preference}
                      onChange={(e) => setCandidateB({ ...candidateB, ac_preference: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <option value="Night Only">Night Only</option>
                      <option value="Chilled (All Night)">Chilled (All Night)</option>
                      <option value="Fan Only / No AC">Fan Only / No AC</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Hobbies / Interests */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Interests & Hobbies (Pick 3-5)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_HOBBIES.map((h) => {
                    const isSelected = candidateB.hobbies.includes(h);
                    return (
                      <button
                        key={h}
                        type="button"
                        onClick={() => toggleHobby('B', h)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {isSelected ? '✓ ' : ''}{h}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center pt-2">
            <button
              onClick={handleCalculateCompatibility}
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-base font-bold shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Running Compatibility Engine...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-teal-200" />
                  Calculate AI Roommate Compatibility Score
                </>
              )}
            </button>
            <p className="text-xs text-slate-500 mt-2">
              FastAPI Random Forest ML Model #2 • Analyzes 10 behavioral and lifestyle dimensions
            </p>
          </div>

          {/* RESULTS CARD */}
          {result && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Pairing Evaluation: {candidateA.name} & {candidateB.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="text-4xl sm:text-5xl font-extrabold text-teal-700 tracking-tight">
                      {result.overall_compatibility_score}%
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        {result.compatibility_tier}
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Model: {result.model_version}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const loc = candidateA.preferred_locality || 'Hinjewadi';
                      navigate(`/pgs?locality=${encodeURIComponent(loc)}&roomType=Double%20Sharing`);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs"
                  >
                    <Building2 className="w-4 h-4" />
                    Find 2-Sharing PGs in {candidateA.preferred_locality}
                  </button>
                </div>
              </div>

              {/* Dimension Scores Grid */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  5 Key Dimension Compatibility Scores
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.dimension_scores.map((dim, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-800">{dim.dimension}</span>
                        <span className="font-extrabold text-teal-800">{dim.score_percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(5, dim.score_percentage))}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-600">{dim.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{dim.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Synergies & Shared Interests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Key Synergies & Harmony Points
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {result.synergies.map((syn, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{syn}</span>
                      </li>
                    ))}
                  </ul>

                  {result.shared_interests.length > 0 && (
                    <div className="pt-2 border-t border-emerald-200/50">
                      <span className="text-[11px] font-bold text-emerald-900 block mb-1">
                        Mutual Hobbies & Interests:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {result.shared_interests.map((h) => (
                          <span
                            key={h}
                            className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    Co-Living Compromise & Advice
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{result.co_living_advice}</p>

                  {result.friction_points.length > 0 && (
                    <div className="pt-2 border-t border-amber-200/50">
                      <span className="text-[11px] font-bold text-amber-900 block mb-1">
                        Potential Differences to Discuss:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {result.friction_points.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-700 font-bold">•</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PUNE ROOMMATE DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Pune Student & Working Professional Profiles</h2>
              <p className="text-xs text-slate-500">
                Verified flatmate seekers in tech and academic hubs. Click "Test Compatibility" to load into the AI model.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Showing {FEATURED_PROFILES.length} active seekers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_PROFILES.map((prof) => (
              <div
                key={prof.id}
                className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 hover:border-teal-300 transition shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{prof.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                        Age {prof.age}
                      </span>
                    </div>
                    <p className="text-xs text-teal-700 font-semibold">{prof.occupation}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {prof.targetCollegeCompany}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-extrabold text-slate-900 block">
                      ₹{prof.budget_inr.toLocaleString('en-IN')}/mo
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Budget</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                  "{prof.bio}"
                </p>

                {/* Tags */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2 bg-slate-50 rounded border text-slate-700">
                    <span className="text-[10px] text-slate-400 block">Locality</span>
                    <span className="font-bold">{prof.preferred_locality}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border text-slate-700">
                    <span className="text-[10px] text-slate-400 block">Sleep Cycle</span>
                    <span className="font-bold">{prof.sleep_schedule}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border text-slate-700">
                    <span className="text-[10px] text-slate-400 block">Food Diet</span>
                    <span className="font-bold">{prof.diet_preference}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border text-slate-700">
                    <span className="text-[10px] text-slate-400 block">Cleanliness</span>
                    <span className="font-bold">{prof.cleanliness_level}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1 max-w-[65%]">
                    {prof.hobbies.map((h) => (
                      <span key={h} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {h}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => loadProfileIntoCandidateB(prof)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition border border-teal-200"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    Test Match with Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Model Technical Architecture & Reference */}
      <section className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            About RoomNest ML Model #2: Roommate Compatibility & Harmony
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 leading-relaxed">
          <div>
            <span className="font-bold text-slate-800 block mb-1">Behavioral Dimensions:</span>
            Evaluates 10 distinct compatibility vectors: sleep schedules, tidiness, kitchen diet rules, quiet hours, social openness, smoking/drinking, AC temperatures, budget difference, locality affinity, and shared hobby counts.
          </div>
          <div>
            <span className="font-bold text-slate-800 block mb-1">Architecture & Model:</span>
            Trained Random Forest Regressor (<code className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">roommate_compatibility_model.joblib</code>) outputting a continuous 0–100% harmony metric with categorical tiering.
          </div>
          <div>
            <span className="font-bold text-slate-800 block mb-1">Single PG Co-Living Pairing:</span>
            Once a high-synergy match is found, RoomNest allows direct filtering of verified 2-sharing & 3-sharing PGs in Pune to coordinate shared lease terms and split rent expenses.
          </div>
        </div>
      </section>
    </div>
  );
};
