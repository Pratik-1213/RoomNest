-- RoomNest Seed Data Migration 03
-- Demo accounts and initial Pune PG dataset with strict is_demo=TRUE tagging

-- 1. Demo User Profiles
INSERT INTO profiles (id, email, full_name, phone, role) VALUES
('00000000-0000-0000-0000-000000000001', 'tanmay.tenant@roomnest.in', 'Tanmay Shinde', '+91 98901 23456', 'tenant'),
('00000000-0000-0000-0000-000000000002', 'suresh.owner@roomnest.in', 'Suresh Patil', '+91 98220 14890', 'owner'),
('00000000-0000-0000-0000-000000000003', 'admin@roomnest.in', 'RoomNest Compliance Officer', '+91 20 2550 1000', 'admin')
ON CONFLICT (id) DO NOTHING;

-- 2. Owner Profile for Suresh Patil
INSERT INTO owner_profiles (owner_id, business_name, id_proof_type, id_proof_reference, verification_status, verified_at) VALUES
('00000000-0000-0000-0000-000000000002', 'Patil Executive Stays Pune', 'Aadhaar / Pune Municipal Trade Reg', 'MH-PUN-2024-8910', 'verified', NOW())
ON CONFLICT (owner_id) DO NOTHING;

-- 3. Tenant Preferences for Tanmay Shinde
INSERT INTO tenant_preferences (tenant_id, preferred_localities, preferred_room_types, max_budget_inr, food_required, work_or_college_area) VALUES
('00000000-0000-0000-0000-000000000001', ARRAY['Hinjewadi', 'Wakad', 'Baner'], ARRAY['Double Sharing', 'Single Room'], 12500, TRUE, 'Hinjewadi Phase 1 / COEP Tech Park')
ON CONFLICT (tenant_id) DO NOTHING;

-- 4. Sample Curated Demo PG Listings
INSERT INTO pg_listings (
    id, owner_id, name, slug, description, city, locality, landmark, address_masked, full_address,
    gender_policy, room_types, monthly_rent_inr, security_deposit_inr, electricity_charge_inr, maintenance_charge_inr,
    food_plan, food_type, furnishing, curfew_time, total_beds, available_beds, distance_to_it_park_km, distance_to_metro_km,
    average_rating, review_count, status, is_demo, external_demo_id
) VALUES
(
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    'NestStay Hinjewadi Tech Enclave',
    'neststay-hinjewadi-tech-enclave',
    'Premium PG for IT professionals and college students located within 1.2km of Hinjewadi Phase 1. Features high-speed dual-band fiber WiFi, hygienic North & South Indian mess meals, daily housekeeping, biometric access, and 24/7 power backup.',
    'Pune',
    'Hinjewadi',
    'Behind Persistent Systems, Phase 1',
    'Phase 1, Hinjewadi Rajiv Gandhi Infotech Park, Pune',
    'Building 4A, Blue Ridge Township, Near Persistent Systems, Hinjewadi Phase 1, Pune 411057',
    'Co-ed',
    ARRAY['Single Room', 'Double Sharing'],
    9500.00,
    19000.00,
    450.00,
    300.00,
    'Two Meals (Breakfast + Dinner)',
    'Veg & Non-Veg (Separate Kitchens)',
    'Fully Furnished',
    '11:30 PM',
    24,
    4,
    1.2,
    0.8,
    4.5,
    38,
    'active',
    TRUE,
    'CSV_DEMO_001'
),
(
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    'Kothrud Scholar Co-Living',
    'kothrud-scholar-co-living',
    'Quiet, academic-focused accommodation popular with COEP, MIT, and Cummins students. Walkable distance to Karve Road and Vanaz Metro Station. Fast Wi-Fi, study desks, purified RO drinking water, and quiet hours after 10:30 PM.',
    'Pune',
    'Kothrud',
    'Near Vanaz Metro Station & Karve Statue',
    'Karve Road, Kothrud, Pune',
    'Plot 18, Mayur Colony, Off Karve Road, Kothrud, Pune 411038',
    'Boys',
    ARRAY['Double Sharing', 'Triple Sharing'],
    8800.00,
    15000.00,
    350.00,
    250.00,
    'Two Meals (Breakfast + Dinner)',
    'Pure Veg Maharashtrian & North Indian',
    'Fully Furnished',
    '10:30 PM',
    18,
    2,
    8.5,
    0.4,
    4.3,
    24,
    'active',
    TRUE,
    'CSV_DEMO_002'
),
(
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000002',
    'Viman Nagar Boulevard PG',
    'viman-nagar-boulevard-pg',
    'Modern executive paying guest accommodation next to Phoenix Marketcity and Symbiosis Campus. AC rooms, attached western bathrooms, modern kitchen, lift access, and refrigerator.',
    'Pune',
    'Viman Nagar',
    'Opposite Datta Mandir Chowk',
    'Viman Nagar, Pune Airport Corridor',
    'Row House 5, Clover Park, Viman Nagar, Pune 411014',
    'Girls',
    ARRAY['Single Room', 'Double Sharing'],
    12000.00,
    24000.00,
    600.00,
    400.00,
    'Three Meals',
    'Both (Veg & Non-Veg)',
    'Fully Furnished',
    '11:00 PM',
    15,
    3,
    4.0,
    1.5,
    4.6,
    52,
    'active',
    TRUE,
    'CSV_DEMO_003'
)
ON CONFLICT (id) DO NOTHING;
