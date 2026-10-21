"""
Sync Curated Pune PG Listings to Live Supabase Database
"""

import os
import json
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
FIXTURES_PATH = os.path.join(BASE_DIR, "frontend", "src", "data", "seedData.json")

SUPABASE_URL = "https://wlahkjhxxlfpgmaflygy.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsYWhramh4eGxmcGdtYWZseWd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MjU3NDk1OCwiZXhwIjoyMTA4MTUwOTU4fQ.mJC60v_LDPDoJNVlNrKXXdpzrKPcn6FmiEsiMA45lxM"

def sync_data():
    with open(FIXTURES_PATH, "r", encoding="utf-8") as f:
        fixtures = json.load(f)

    print(f"Loaded {len(fixtures)} listings from {FIXTURES_PATH}")

    headers = {
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }

    # Prepare rows for pg_listings
    db_rows = []
    for item in fixtures:
        # Map food plan to exact PostgreSQL food_plan_enum
        raw_food = str(item.get("food_plan", "")).lower()
        if "three" in raw_food or "all" in raw_food:
            food_val = "Three Meals"
        elif "breakfast only" in raw_food:
            food_val = "Breakfast Only"
        elif "dinner" in raw_food or "two" in raw_food or "lunch" in raw_food:
            food_val = "Two Meals (Breakfast + Dinner)"
        else:
            food_val = "No Food"

        row = {
            "id": item["id"],
            "owner_id": item["owner_id"],
            "name": item["name"],
            "slug": item["slug"],
            "description": f"Curated paying guest accommodation in {item['locality']}, Pune. Verified facilities, WiFi, and mess inclusions.",
            "city": item.get("city", "Pune"),
            "locality": item["locality"],
            "landmark": item.get("landmark", f"Near {item['locality']} Metro / High Street"),
            "address_masked": item["address_masked"],
            "full_address": item.get("full_address", f"Near Main Road, {item['locality']}, Pune 411057"),
            "gender_policy": item["gender_policy"] if item["gender_policy"] in ["Boys", "Girls", "Co-ed"] else "Co-ed",
            "room_types": item["room_types"],
            "monthly_rent_inr": float(item["monthly_rent_inr"]),
            "security_deposit_inr": float(item["security_deposit_inr"]),
            "electricity_charge_inr": float(item.get("electricity_charge_inr", 450)),
            "maintenance_charge_inr": float(item.get("maintenance_charge_inr", 300)),
            "food_plan": food_val,
            "food_type": item.get("food_type", "Both (Veg & Non-Veg)"),
            "furnishing": item.get("furnishing", "Semi-Furnished"),
            "curfew_time": item.get("curfew_time", "11:00 PM"),
            "total_beds": int(item.get("total_beds", 10)),
            "available_beds": int(item.get("available_beds", 2)),
            "distance_to_it_park_km": float(item.get("distance_to_it_park_km", 2.5)),
            "distance_to_metro_km": float(item.get("distance_to_metro_km", 1.2)),
            "average_rating": float(item.get("average_rating", 4.3)),
            "review_count": int(item.get("review_count", 15)),
            "status": "active",
            "is_demo": True,
            "external_demo_id": item.get("external_demo_id", "CSV_ROW")
        }
        db_rows.append(row)

    # Upsert in batches of 20
    endpoint = f"{SUPABASE_URL}/rest/v1/pg_listings"
    for i in range(0, len(db_rows), 20):
        batch = db_rows[i:i+20]
        req = urllib.request.Request(endpoint, data=json.dumps(batch).encode("utf-8"), headers=headers, method="POST")
        try:
            res = urllib.request.urlopen(req)
            print(f"Batch {i//20 + 1}: Synced {len(batch)} rows (Status {res.status})")
        except urllib.error.HTTPError as e:
            print(f"Batch {i//20 + 1} HTTP Error: {e.code} - {e.read().decode('utf-8')}")

if __name__ == "__main__":
    sync_data()
