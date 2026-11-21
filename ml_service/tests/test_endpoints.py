import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "RoomNest" in data["service"]
    assert "loaded_models" in data

def test_model_info_endpoint():
    response = client.get("/v1/model-info")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, dict)
    assert "suite_version" in data or "models" in data

def test_rent_prediction_endpoint():
    payload = {
        "locality": "Hinjewadi",
        "room_type": "Double Sharing",
        "gender_policy": "Co-ed",
        "food_plan": "Two Meals (Breakfast + Dinner)",
        "furnishing": "Semi-Furnished",
        "wifi_available": True,
        "ac_available": False,
        "laundry_available": True,
        "parking_available": False,
        "distance_to_it_park_km": 2.5,
        "distance_to_metro_km": 1.8
    }
    response = client.post("/v1/predictions/pg-rent", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "predicted_monthly_rent_inr" in data
    assert data["predicted_monthly_rent_inr"] > 0
    assert data["lower_bound_inr"] <= data["upper_bound_inr"]
    assert len(data["explanation_factors"]) > 0

def test_rent_prediction_invalid_payload():
    # distance_to_it_park_km greater than 50.0 should trigger Pydantic validation error
    payload = {
        "locality": "Hinjewadi",
        "distance_to_it_park_km": 999.0
    }
    response = client.post("/v1/predictions/pg-rent", json=payload)
    assert response.status_code == 422

def test_roommate_compatibility_endpoint():
    payload = {
        "candidate_a": {
            "name": "User A",
            "age": 23,
            "occupation": "Software Engineer",
            "preferred_locality": "Hinjewadi",
            "budget_inr": 12000,
            "sleep_schedule": "Night Owl",
            "cleanliness_level": "Very Neat",
            "diet_preference": "Non-Veg",
            "study_work_routine": "WFH / Remote",
            "social_habits": "Ambivert",
            "smoking_drinking": "Strictly No",
            "ac_preference": "Night Only",
            "hobbies": ["Coding", "Gym"]
        },
        "candidate_b": {
            "name": "User B",
            "age": 24,
            "occupation": "Data Analyst",
            "preferred_locality": "Hinjewadi",
            "budget_inr": 11000,
            "sleep_schedule": "Night Owl",
            "cleanliness_level": "Moderate",
            "diet_preference": "Non-Veg",
            "study_work_routine": "Regular Hours",
            "social_habits": "Ambivert",
            "smoking_drinking": "Strictly No",
            "ac_preference": "Night Only",
            "hobbies": ["Gaming", "Gym"]
        }
    }
    response = client.post("/v1/predictions/roommate-compatibility", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "overall_compatibility_score" in data
    assert 0.0 <= data["overall_compatibility_score"] <= 100.0
    assert "compatibility_tier" in data
    assert len(data["dimension_scores"]) > 0
