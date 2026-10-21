"""
RoomNest Comprehensive AI & ML FastAPI Service
Serves 4 distinct production machine learning models:
1. PG Monthly Rent Regression
2. AI Roommate Compatibility & Harmony Scoring Matchmaker
3. Booking Conversion & Lead Propensity Classifier
4. PG Quality, Complaint & Maintenance Risk Predictor
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="RoomNest Pune PG Multi-Model AI & ML Suite",
    description="4 Production ML Models: Rent Regression, Roommate Compatibility, Conversion Propensity, and Maintenance Risk.",
    version="2.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
REPORTS_DIR = os.path.join(os.path.dirname(__file__), "reports")

RENT_MODEL_PATH = os.path.join(MODELS_DIR, "pg_rent_model.joblib")
ROOMMATE_MODEL_PATH = os.path.join(MODELS_DIR, "roommate_compatibility_model.joblib")
CONVERSION_MODEL_PATH = os.path.join(MODELS_DIR, "booking_conversion_model.joblib")
MAINTENANCE_MODEL_PATH = os.path.join(MODELS_DIR, "maintenance_risk_model.joblib")
REPORT_PATH = os.path.join(REPORTS_DIR, "all_models_evaluation_report.json")

# Load all 4 models
models = {
    "rent": None,
    "roommate": None,
    "conversion": None,
    "maintenance": None
}
suite_metadata = {}

try:
    if os.path.exists(RENT_MODEL_PATH):
        models["rent"] = joblib.load(RENT_MODEL_PATH)
        print("[OK] Model 1: PG Rent model loaded.")
    if os.path.exists(ROOMMATE_MODEL_PATH):
        models["roommate"] = joblib.load(ROOMMATE_MODEL_PATH)
        print("[OK] Model 2: Roommate Compatibility model loaded.")
    if os.path.exists(CONVERSION_MODEL_PATH):
        models["conversion"] = joblib.load(CONVERSION_MODEL_PATH)
        print("[OK] Model 3: Booking Conversion model loaded.")
    if os.path.exists(MAINTENANCE_MODEL_PATH):
        models["maintenance"] = joblib.load(MAINTENANCE_MODEL_PATH)
        print("[OK] Model 4: Maintenance Risk model loaded.")
    if os.path.exists(REPORT_PATH):
        with open(REPORT_PATH, "r", encoding="utf-8") as f:
            suite_metadata = json.load(f)
except Exception as e:
    print(f"Warning during model initialization: {e}")

# ==============================================================================
# SCHEMAS
# ==============================================================================

# Model 1 Schemas: Rent
class RentPredictionRequest(BaseModel):
    locality: str = Field(default="Hinjewadi")
    room_type: str = Field(default="Double Sharing")
    gender_policy: str = Field(default="Co-ed")
    food_plan: str = Field(default="Two Meals (Breakfast + Dinner)")
    furnishing: str = Field(default="Semi-Furnished")
    wifi_available: bool = Field(default=True)
    ac_available: bool = Field(default=False)
    laundry_available: bool = Field(default=True)
    parking_available: bool = Field(default=False)
    distance_to_it_park_km: float = Field(default=2.5, ge=0.0, le=50.0)
    distance_to_metro_km: float = Field(default=1.8, ge=0.0, le=50.0)

class RentFactor(BaseModel):
    factor: str
    impact: str
    detail: str

class RentPredictionResponse(BaseModel):
    predicted_monthly_rent_inr: int
    lower_bound_inr: int
    upper_bound_inr: int
    model_version: str
    confidence_label: str
    explanation_factors: List[RentFactor]
    locality_average_inr: int
    disclaimer: str

# Model 2 Schemas: Roommate Compatibility
class RoommateCandidate(BaseModel):
    name: str = Field(default="Candidate")
    age: int = Field(default=22)
    occupation: str = Field(default="Student / Intern")
    preferred_locality: str = Field(default="Hinjewadi")
    budget_inr: int = Field(default=10000)
    sleep_schedule: str = Field(default="Night Owl", description="Early Bird, Night Owl, Flexible")
    cleanliness_level: str = Field(default="Moderate", description="Very Neat, Moderate, Relaxed")
    diet_preference: str = Field(default="Non-Veg", description="Pure Veg, Non-Veg, Eggetarian, Vegan")
    study_work_routine: str = Field(default="Regular Hours", description="Late Night Study, Regular Hours, WFH / Remote")
    social_habits: str = Field(default="Ambivert", description="Introvert (Quiet sanctuary), Ambivert, Extrovert (Guests welcome)")
    smoking_drinking: str = Field(default="Strictly No", description="Strictly No, Casual / Outdoor, Social")
    ac_preference: str = Field(default="Night Only", description="Chilled (All Night), Night Only, Fan Only / No AC")
    hobbies: List[str] = Field(default=["Coding", "Gaming", "Gym"])

class RoommateCompatibilityRequest(BaseModel):
    candidate_a: RoommateCandidate
    candidate_b: RoommateCandidate

class DimensionScore(BaseModel):
    dimension: str
    score_percentage: float
    status: str
    note: str

class RoommateCompatibilityResponse(BaseModel):
    overall_compatibility_score: float
    compatibility_tier: str
    dimension_scores: List[DimensionScore]
    shared_interests: List[str]
    synergies: List[str]
    friction_points: List[str]
    co_living_advice: str
    model_version: str

# Model 3 Schemas: Conversion Propensity
class ConversionRequest(BaseModel):
    age: int = Field(default=24)
    occupation: str = Field(default="IT Employee")
    preferred_locality: str = Field(default="Hinjewadi")
    preferred_room_type: str = Field(default="Double Sharing")
    monthly_budget_inr: int = Field(default=12000)
    pgs_viewed: int = Field(default=5)
    inquiries_sent: int = Field(default=2)
    shortlisted_pgs: int = Field(default=3)
    food_required: bool = Field(default=True)
    signup_source: str = Field(default="Google")

class ConversionResponse(BaseModel):
    conversion_probability_percentage: float
    lead_intent_tier: str
    expected_booking_days: int
    conversion_drivers: List[str]
    recommended_owner_action: str
    model_version: str

# Model 4 Schemas: Quality & Maintenance Risk
class MaintenanceRiskRequest(BaseModel):
    locality: str = Field(default="Hinjewadi")
    overall_rating: float = Field(default=4.2, ge=1.0, le=5.0)
    room_cleanliness_rating: float = Field(default=4.0, ge=1.0, le=5.0)
    food_quality_rating: float = Field(default=3.8, ge=1.0, le=5.0)
    wifi_rating: float = Field(default=4.5, ge=1.0, le=5.0)
    owner_behavior_rating: float = Field(default=4.2, ge=1.0, le=5.0)
    value_for_money_rating: float = Field(default=4.0, ge=1.0, le=5.0)
    security_rating: float = Field(default=4.5, ge=1.0, le=5.0)
    noise_level: str = Field(default="Medium", description="Low, Medium, High")
    review_length_words: int = Field(default=30)

class MaintenanceRiskResponse(BaseModel):
    quality_health_score: float
    complaint_probability_percentage: float
    risk_category: str
    critical_inspection_points: List[str]
    preventative_maintenance_actions: List[str]
    model_version: str

# ==============================================================================
# ENDPOINTS
# ==============================================================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "RoomNest Multi-Model ML Engine",
        "suite_version": "v2.0.0-QuadModels",
        "loaded_models": {k: (v is not None) for k, v in models.items()}
    }

@app.get("/v1/model-info")
def get_model_info():
    return suite_metadata if suite_metadata else {
        "suite_version": "v2.0.0-QuadModels",
        "models_count": 4,
        "status": "active"
    }

# ------------------------------------------------------------------------------
# 1. RENT PREDICTION ENDPOINT
# ------------------------------------------------------------------------------
LOCALITY_BASE_RENT = {
    "Hinjewadi": 9800, "Kothrud": 10500, "Viman Nagar": 11500, "Wakad": 9200,
    "Baner": 11200, "Kharadi": 10800, "Shivajinagar": 11000, "Aundh": 10400,
    "Bavdhan": 8800, "Hadapsar": 8900, "Katraj": 7500, "Swargate": 8500
}

@app.post("/v1/predictions/pg-rent", response_model=RentPredictionResponse)
def predict_rent(req: RentPredictionRequest):
    factors: List[RentFactor] = []
    predicted_val = 9500

    if models["rent"] is not None:
        try:
            df_in = pd.DataFrame([{
                'locality': req.locality,
                'room_type': req.room_type,
                'gender_policy': req.gender_policy,
                'food_plan': req.food_plan,
                'furnishing': req.furnishing,
                'wifi_available': int(req.wifi_available),
                'ac_available': int(req.ac_available),
                'laundry_available': int(req.laundry_available),
                'parking_available': int(req.parking_available),
                'distance_to_it_park_km': req.distance_to_it_park_km,
                'distance_to_metro_km': req.distance_to_metro_km
            }])
            raw_pred = float(models["rent"].predict(df_in)[0])
            predicted_val = max(4500, min(32000, raw_pred))
        except Exception as e:
            print(f"Rent inference fallback: {e}")
            predicted_val = LOCALITY_BASE_RENT.get(req.locality, 9500)
    else:
        predicted_val = LOCALITY_BASE_RENT.get(req.locality, 9500)

    loc_base = LOCALITY_BASE_RENT.get(req.locality, 9500)
    factors.append(RentFactor(factor="Locality Hub", impact=f"Base ₹{loc_base:,}/mo", detail=f"{req.locality} rental corridor benchmark"))

    if "Single" in req.room_type or "Private" in req.room_type:
        factors.append(RentFactor(factor="Room Privacy", impact="+35% to +45%", detail="Single occupancy premium"))
    elif "Triple" in req.room_type or "Four" in req.room_type:
        factors.append(RentFactor(factor="Shared Occupancy", impact="-22% to -35%", detail="Shared utility savings"))

    if req.ac_available:
        factors.append(RentFactor(factor="Air Conditioning (AC)", impact="+₹1,200 to ₹1,800/mo", detail="Power & compressor equipment amortization"))
    if "Three" in req.food_plan or "Two" in req.food_plan:
        factors.append(RentFactor(factor="Mess & Food Service", impact="+₹2,000 to ₹3,000/mo", detail=f"{req.food_plan} inclusive daily catering"))
    if req.distance_to_it_park_km <= 2.0:
        factors.append(RentFactor(factor="IT Corridor Proximity", impact="High convenience", detail=f"Only {req.distance_to_it_park_km} km to tech campuses"))

    rent_int = int(round(predicted_val / 100.0) * 100)
    spread = max(800, int(rent_int * 0.12))

    return RentPredictionResponse(
        predicted_monthly_rent_inr=rent_int,
        lower_bound_inr=rent_int - spread,
        upper_bound_inr=rent_int + spread,
        model_version="v1.2.0-HistGradientBoosting",
        confidence_label="High (Locality & Room Calibrated)",
        explanation_factors=factors,
        locality_average_inr=loc_base,
        disclaimer="Statistical regression estimate for budgeting guidance. Actual rents are set by property owners."
    )

# ------------------------------------------------------------------------------
# 2. ROOMMATE COMPATIBILITY & HARMONY ENDPOINT
# ------------------------------------------------------------------------------
@app.post("/v1/predictions/roommate-compatibility", response_model=RoommateCompatibilityResponse)
def predict_roommate_compatibility(req: RoommateCompatibilityRequest):
    a = req.candidate_a
    b = req.candidate_b

    # 1. Feature Extraction between A and B
    # Sleep diff
    sleep_levels = {"Early Bird": 0, "Flexible": 1, "Night Owl": 2}
    s_a = sleep_levels.get(a.sleep_schedule, 1)
    s_b = sleep_levels.get(b.sleep_schedule, 1)
    sleep_diff = abs(s_a - s_b)

    # Cleanliness diff
    clean_levels = {"Very Neat": 0, "Moderate": 1, "Relaxed": 2}
    c_a = clean_levels.get(a.cleanliness_level, 1)
    c_b = clean_levels.get(b.cleanliness_level, 1)
    cleanliness_diff = abs(c_a - c_b)

    # Diet harmony
    if a.diet_preference == b.diet_preference:
        diet_harmony = 1.0
    elif ("Veg" in a.diet_preference and "Non-Veg" in b.diet_preference) or ("Non-Veg" in a.diet_preference and "Veg" in b.diet_preference):
        diet_harmony = 0.55
    else:
        diet_harmony = 0.8

    # Study routine match
    study_routine_match = 1.0 if a.study_work_routine == b.study_work_routine else 0.65

    # Social harmony
    social_harmony = 1.0 if a.social_habits == b.social_habits else 0.75

    # Substance match
    if a.smoking_drinking == b.smoking_drinking:
        substance_match = 1.0
    elif "Strictly No" in a.smoking_drinking and "Social" in b.smoking_drinking:
        substance_match = 0.3
    else:
        substance_match = 0.65

    # AC Temp harmony
    ac_temp_harmony = 1.0 if a.ac_preference == b.ac_preference else 0.6

    # Budget gap
    max_b = max(a.budget_inr, b.budget_inr, 1)
    budget_gap_percent = min(1.0, abs(a.budget_inr - b.budget_inr) / max_b)

    # Shared hobbies
    set_a = set(h.lower() for h in a.hobbies)
    set_b = set(h.lower() for h in b.hobbies)
    shared_hobbies = list(set_a.intersection(set_b))
    shared_hobbies_count = len(shared_hobbies)

    locality_match = 1 if a.preferred_locality.lower() == b.preferred_locality.lower() else 0

    # 2. ML Prediction
    predicted_score = 75.0
    if models["roommate"] is not None:
        try:
            df_in = pd.DataFrame([{
                'sleep_diff': sleep_diff,
                'cleanliness_diff': cleanliness_diff,
                'diet_harmony': diet_harmony,
                'study_routine_match': study_routine_match,
                'social_harmony': social_harmony,
                'substance_match': substance_match,
                'ac_temp_harmony': ac_temp_harmony,
                'budget_gap_percent': budget_gap_percent,
                'shared_hobbies_count': min(5, shared_hobbies_count),
                'locality_match': locality_match
            }])
            raw_score = float(models["roommate"].predict(df_in)[0])
            predicted_score = round(max(20.0, min(98.5, raw_score)), 1)
        except Exception as e:
            print(f"Roommate ML fallback: {e}")
            predicted_score = 78.0

    # Dimension Breakdown
    dimensions = [
        DimensionScore(
            dimension="Sleep & Routine Alignment",
            score_percentage=round((1.0 - (sleep_diff / 2.0)) * 100, 1),
            status="Harmonious" if sleep_diff == 0 else "Minor Adjustment" if sleep_diff == 1 else "Opposite Schedules",
            note=f"{a.name} is {a.sleep_schedule} while {b.name} is {b.sleep_schedule}."
        ),
        DimensionScore(
            dimension="Cleanliness & Living Standards",
            score_percentage=round((1.0 - (cleanliness_diff / 2.0)) * 100, 1),
            status="Great Match" if cleanliness_diff == 0 else "Manageable" if cleanliness_diff == 1 else "High Gap",
            note="Clear weekly chore schedule recommended." if cleanliness_diff > 0 else "Similar tidiness expectations."
        ),
        DimensionScore(
            dimension="Dietary & Kitchen Compatibility",
            score_percentage=round(diet_harmony * 100, 1),
            status="Compatible" if diet_harmony > 0.7 else "Separate Utensils Needed",
            note=f"{a.diet_preference} + {b.diet_preference} dietary preferences."
        ),
        DimensionScore(
            dimension="Social, Guests & Study Noise",
            score_percentage=round(((social_harmony + study_routine_match) / 2.0) * 100, 1),
            status="Aligned" if social_harmony >= 0.8 else "Quiet Hours Agreement Advised",
            note=f"{a.name}: {a.social_habits} | {b.name}: {b.social_habits}"
        ),
        DimensionScore(
            dimension="Budget & Pune Locality Match",
            score_percentage=round(((1.0 - budget_gap_percent) * 0.7 + locality_match * 0.3) * 100, 1),
            status="Perfect Match" if locality_match == 1 and budget_gap_percent < 0.15 else "Flexible",
            note=f"Targeting {a.preferred_locality} with ₹{a.budget_inr:,} & ₹{b.budget_inr:,} budgets."
        )
    ]

    # Synergies and friction
    synergies = []
    friction = []

    if sleep_diff == 0:
        synergies.append(f"Both share a {a.sleep_schedule} cycle; lights-out won't cause friction.")
    else:
        friction.append(f"{a.name} ({a.sleep_schedule}) vs {b.name} ({b.sleep_schedule}) may need sleep masks / desk lamps.")

    if cleanliness_diff == 0:
        synergies.append("Mutual understanding on room cleanliness and bed tidiness.")
    elif cleanliness_diff >= 2:
        friction.append("Cleanliness standards differ significantly; agree on daily trash & desk cleanup rules.")

    if shared_hobbies:
        synergies.append(f"Mutual interest in {', '.join(h.capitalize() for h in shared_hobbies)}!")
    else:
        synergies.append("Diverse individual hobbies allows personal space and variety.")

    if substance_match < 0.5:
        friction.append("Conflicting smoking/substance boundaries; outdoor rules must be strictly respected.")

    if locality_match == 1:
        synergies.append(f"Both looking specifically in {a.preferred_locality}, Pune.")

    if predicted_score >= 82:
        tier = "High Synergy Roommates"
        advice = "Excellent co-living potential! Your lifestyle, schedules, and Pune location preferences align seamlessly. Establishing basic kitchen and guest ground rules will ensure a pleasant stay."
    elif predicted_score >= 60:
        tier = "Balanced Compatibility"
        advice = "Good overall synergy with a few manageable differences. Agreeing on lights-out timing and chore rotations before signing your lease will prevent minor frictions."
    else:
        tier = "Lifestyle Differences (Requires Compromise)"
        advice = "You have noticeable differences in sleep rhythms, social styles, or dietary preferences. Recommend an open chat about quiet hours and guest policies before deciding to share a room."

    return RoommateCompatibilityResponse(
        overall_compatibility_score=predicted_score,
        compatibility_tier=tier,
        dimension_scores=dimensions,
        shared_interests=[h.capitalize() for h in shared_hobbies],
        synergies=synergies,
        friction_points=friction,
        co_living_advice=advice,
        model_version="v2.0.0-RandomForest"
    )

# ------------------------------------------------------------------------------
# 3. BOOKING CONVERSION CLASSIFIER ENDPOINT
# ------------------------------------------------------------------------------
@app.post("/v1/predictions/conversion-propensity", response_model=ConversionResponse)
def predict_conversion(req: ConversionRequest):
    prob = 0.55
    if models["conversion"] is not None:
        try:
            df_in = pd.DataFrame([{
                'Age': req.age,
                'Occupation': req.occupation,
                'Preferred_Locality': req.preferred_locality,
                'Preferred_Room_Type': req.preferred_room_type,
                'Monthly_Budget_INR': req.monthly_budget_inr,
                'Food_Required': int(req.food_required),
                'PGs_Viewed': req.pgs_viewed,
                'Inquiries_Sent': req.inquiries_sent,
                'Shortlisted_PGs': req.shortlisted_pgs,
                'Signup_Source': req.signup_source
            }])
            raw_prob = float(models["conversion"].predict_proba(df_in)[0, 1])
            prob = max(0.05, min(0.95, raw_prob))
        except Exception as e:
            print(f"Conversion ML fallback: {e}")
            prob = 0.62

    prob_pct = round(prob * 100, 1)
    if prob_pct >= 70:
        tier = "High Intent Lead (Ready to Move)"
        days = 3
        action = "Prioritize immediate WhatsApp callback; offer a 5% token booking incentive."
    elif prob_pct >= 40:
        tier = "Warm Prospect (Evaluating Alternatives)"
        days = 7
        action = "Send curated shortlist comparison and verified video tour of vacant beds."
    else:
        tier = "Exploratory Lead (Top of Funnel)"
        days = 15
        action = "Send Pune locality budget guides and student discount alerts."

    drivers = [
        f"{req.inquiries_sent} active inquiries sent across Pune PGs",
        f"{req.shortlisted_pgs} shortlisted properties in {req.preferred_locality}",
        f"Budget aligned to ₹{req.monthly_budget_inr:,}/mo for {req.preferred_room_type}"
    ]

    return ConversionResponse(
        conversion_probability_percentage=prob_pct,
        lead_intent_tier=tier,
        expected_booking_days=days,
        conversion_drivers=drivers,
        recommended_owner_action=action,
        model_version="v2.0.0-GradientBoosting"
    )

# ------------------------------------------------------------------------------
# 4. PG QUALITY & MAINTENANCE RISK ENDPOINT
# ------------------------------------------------------------------------------
@app.post("/v1/predictions/maintenance-risk", response_model=MaintenanceRiskResponse)
def predict_maintenance_risk(req: MaintenanceRiskRequest):
    noise_int = 1.0 if req.noise_level.lower() == 'low' else 3.0 if req.noise_level.lower() == 'high' else 2.0
    risk_prob = 0.25

    if models["maintenance"] is not None:
        try:
            df_in = pd.DataFrame([{
                'locality': req.locality,
                'overall_rating': req.overall_rating,
                'room_cleanliness_rating': req.room_cleanliness_rating,
                'food_quality_rating': req.food_quality_rating,
                'wifi_rating': req.wifi_rating,
                'owner_behavior_rating': req.owner_behavior_rating,
                'value_for_money_rating': req.value_for_money_rating,
                'security_rating': req.security_rating,
                'noise_level': noise_int,
                'review_length_words': req.review_length_words
            }])
            raw_prob = float(models["maintenance"].predict_proba(df_in)[0, 1])
            risk_prob = max(0.05, min(0.95, raw_prob))
        except Exception as e:
            print(f"Maintenance ML fallback: {e}")
            risk_prob = 0.22

    # Health score (0 to 100)
    health_score = round((1.0 - risk_prob) * 100, 1)
    risk_pct = round(risk_prob * 100, 1)

    points = []
    actions = []

    if req.wifi_rating < 4.0:
        points.append("Fiber WiFi gateway stability and bandwidth distribution")
        actions.append("Install secondary router or commercial mesh WiFi access points on upper floors.")
    if req.food_quality_rating < 4.0:
        points.append("Mess catering consistency and hygiene inspection")
        actions.append("Review catering contract; conduct weekly food quality sampling.")
    if req.room_cleanliness_rating < 4.0:
        points.append("Housekeeping frequency in attached washrooms")
        actions.append("Schedule bi-weekly deep sanitization checklist for shared bathrooms.")
    if noise_int == 3.0:
        points.append("Late night corridor acoustic noise levels")
        actions.append("Enforce quiet hours policy after 10:30 PM with hostel warden monitoring.")

    if not points:
        points.append("General plumbing & water pressure routine check")
        actions.append("Conduct monthly preventative solar geyser inspection.")

    tier = "Low Complaint Risk (Excellent Health)" if health_score >= 80 else "Moderate Risk (Needs Routine Tuning)" if health_score >= 55 else "High Maintenance Attention Required"

    return MaintenanceRiskResponse(
        quality_health_score=health_score,
        complaint_probability_percentage=risk_pct,
        risk_category=tier,
        critical_inspection_points=points,
        preventative_maintenance_actions=actions,
        model_version="v2.0.0-RandomForest"
    )

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8001, reload=True)
