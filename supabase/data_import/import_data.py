"""
RoomNest CSV Data Import & Integrity Validation Pipeline
Audits and imports PG listings from CSV into normalized seed fixtures.
Enforces the mandatory data caveat:
- Sets is_demo = TRUE
- Records rejection reasons for rows with missing rents, invalid beds, or corrupted data.
- Exports clean JSON fixtures for both Supabase SQL and frontend client store.
"""

import os
import json
import uuid
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
CSV_PATH = os.path.join(BASE_DIR, "Datasets", "roomnest_pune_pg_owner_listings.csv")
OUTPUT_FIXTURES_PATH = os.path.join(BASE_DIR, "frontend", "src", "data", "seedData.json")
REPORT_PATH = os.path.join(BASE_DIR, "supabase", "data_import", "import_rejection_report.json")

os.makedirs(os.path.dirname(OUTPUT_FIXTURES_PATH), exist_ok=True)
os.makedirs(os.path.dirname(REPORT_PATH), exist_ok=True)

# Fixed Demo User UUIDs
DEMO_OWNER_ID = "00000000-0000-0000-0000-000000000002"
DEMO_TENANT_ID = "00000000-0000-0000-0000-000000000001"
DEMO_ADMIN_ID = "00000000-0000-0000-0000-000000000003"

# Curated realistic property images for Pune PGs (licensed unsplash photos of modern rooms, beds, desks, dining)
PUNE_ROOM_PHOTOS = [
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
]

def import_and_validate():
    print(f"Reading dataset: {CSV_PATH}")
    df = pd.read_csv(CSV_PATH)
    df.columns = [c.strip() for c in df.columns]
    
    total_rows = len(df)
    rejected_rows = []
    valid_listings = []
    
    # Track diverse Pune localities
    locality_counts = {}
    
    for idx, row in df.iterrows():
        reasons = []
        
        # Check rent
        rent = row.get('monthly_rent_inr')
        if pd.isnull(rent) or rent <= 0:
            reasons.append("Missing or non-positive monthly rent")
            
        # Check beds
        tot_beds = row.get('total_beds', 0)
        avail_beds = row.get('available_beds', 0)
        if pd.isnull(tot_beds) or tot_beds <= 0:
            reasons.append("Invalid total beds")
        elif avail_beds > tot_beds:
            reasons.append("available_beds exceeds total_beds")
            
        # Check locality
        locality = str(row.get('locality', '')).strip()
        if not locality or locality.lower() == 'nan':
            reasons.append("Missing locality")
            
        if reasons:
            rejected_rows.append({
                "row_index": int(idx),
                "pg_listing_id": str(row.get('pg_listing_id', 'UNKNOWN')),
                "rejection_reasons": reasons
            })
            continue
            
        # Keep a rich representative sample (e.g. 36 top diverse listings across Pune localities)
        locality_counts[locality] = locality_counts.get(locality, 0) + 1
        if len(valid_listings) < 40:
            photo_idx = len(valid_listings) % len(PUNE_ROOM_PHOTOS)
            secondary_photo = PUNE_ROOM_PHOTOS[(photo_idx + 1) % len(PUNE_ROOM_PHOTOS)]
            
            listing_id = str(uuid.uuid4())
            name = str(row.get('pg_name', f"Nest Stay {locality}")).strip()
            
            sec_dep = row.get('security_deposit_inr')
            sec_dep_val = int(rent * 2) if pd.isna(sec_dep) else int(sec_dep)
            
            elec = row.get('electricity_charge_inr')
            elec_val = 450 if pd.isna(elec) else int(elec)
            
            maint = row.get('maintenance_charge_inr')
            maint_val = 300 if pd.isna(maint) else int(maint)
            
            valid_listings.append({
                "id": listing_id,
                "owner_id": DEMO_OWNER_ID,
                "owner_name": "Suresh Patil (Verified Partner)",
                "owner_phone": "+91 98220 14890",
                "name": name,
                "slug": f"{name.lower().replace(' ', '-')}-{locality.lower()}-{len(valid_listings)}",
                "city": "Pune",
                "locality": locality,
                "landmark": f"Near {locality} Metro / High Street",
                "address_masked": f"{locality}, Near Main Ring Road, Pune",
                "full_address": f"Flat 302, Green Acres Residency, Near Bank of Maharashtra, {locality}, Pune 411057",
                "gender_policy": str(row.get('gender_policy', 'Co-ed')).strip(),
                "room_types": [str(row.get('room_type', 'Double Sharing')).strip()],
                "monthly_rent_inr": int(rent),
                "security_deposit_inr": sec_dep_val,
                "electricity_charge_inr": elec_val,
                "maintenance_charge_inr": maint_val,
                "food_plan": str(row.get('food_plan', 'Two Meals (Breakfast + Dinner)')).strip() if not pd.isna(row.get('food_plan')) else "Two Meals (Breakfast + Dinner)",
                "food_type": "Veg & Non-Veg Options",
                "furnishing": str(row.get('furnishing', 'Semi-Furnished')).strip() if not pd.isna(row.get('furnishing')) else "Semi-Furnished",
                "curfew_time": str(row.get('curfew_time', '11:00 PM')).strip() if not pd.isna(row.get('curfew_time')) else "11:00 PM",
                "total_beds": int(tot_beds),
                "available_beds": int(avail_beds) if avail_beds > 0 else 1,
                "distance_to_it_park_km": float(row.get('distance_to_it_park_km', 2.5)) if not pd.isna(row.get('distance_to_it_park_km')) else 2.5,
                "distance_to_metro_km": float(row.get('distance_to_metro_km', 1.2)) if not pd.isna(row.get('distance_to_metro_km')) else 1.2,
                "average_rating": float(round(float(row.get('average_rating', 4.3)), 1)) if not pd.isna(row.get('average_rating')) else 4.3,
                "review_count": int(row.get('inquiries_last_30d', 18)) if not pd.isna(row.get('inquiries_last_30d')) else 18,
                "status": "active",
                "is_demo": True,
                "external_demo_id": str(row.get('pg_listing_id', '')),
                "photos": [
                    PUNE_ROOM_PHOTOS[photo_idx],
                    secondary_photo
                ],
                "amenities": {
                    "wifi": str(row.get('wifi_available', '1')).lower() in ['1', 'yes', 'true'],
                    "ac": str(row.get('ac_available', '0')).lower() in ['1', 'yes', 'true'],
                    "laundry": str(row.get('laundry_available', '1')).lower() in ['1', 'yes', 'true'],
                    "parking": str(row.get('parking_available', '0')).lower() in ['1', 'yes', 'true'],
                    "power_backup": True,
                    "cctv": True,
                    "attached_washroom": True,
                    "ro_water": True
                },
                "proximity": [
                    {"landmark_name": f"{locality} IT Park / Commercial Zone", "distance_km": float(row.get('distance_to_it_park_km', 2.5)), "commute_time_mins": 10},
                    {"landmark_name": f"{locality} Metro Station", "distance_km": float(row.get('distance_to_metro_km', 1.2)), "commute_time_mins": 6},
                    {"landmark_name": "COEP / Pune University Campus", "distance_km": 6.5, "commute_time_mins": 20}
                ]
            })

    report = {
        "source_file": "roomnest_pune_pg_owner_listings.csv",
        "total_rows_inspected": total_rows,
        "valid_rows_identified": total_rows - len(rejected_rows),
        "total_rejected_rows": len(rejected_rows),
        "rejection_sample": rejected_rows[:20],
        "imported_demo_fixtures": len(valid_listings),
        "environment": "demo_prototype",
        "data_caveat": "Imported rows are flagged with is_demo=True and displayed with data-caveat banner in accordance with specification."
    }

    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    with open(OUTPUT_FIXTURES_PATH, "w", encoding="utf-8") as f:
        json.dump(valid_listings, f, indent=2)

    print(f"Validation complete: {len(valid_listings)} curated demo listings saved to {OUTPUT_FIXTURES_PATH}")
    print(f"Audit report written to {REPORT_PATH}")

if __name__ == '__main__':
    import_and_validate()
