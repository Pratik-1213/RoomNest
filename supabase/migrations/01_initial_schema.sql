-- RoomNest Database Schema Migration 01
-- PostgreSQL / Supabase Canonical Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Linked with Supabase Auth)
CREATE TYPE user_role AS ENUM ('tenant', 'owner', 'admin');

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'tenant',
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Owner Profiles (Verification & KYC)
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected', 'demo_data');

CREATE TABLE IF NOT EXISTS owner_profiles (
    owner_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    business_name TEXT,
    id_proof_type TEXT,
    id_proof_reference TEXT,
    emergency_contact TEXT,
    verification_status verification_status NOT NULL DEFAULT 'pending',
    verified_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PG Listings Table
CREATE TYPE gender_policy_enum AS ENUM ('Boys', 'Girls', 'Co-ed');
CREATE TYPE food_plan_enum AS ENUM ('No Food', 'Breakfast Only', 'Two Meals (Breakfast + Dinner)', 'Three Meals');
CREATE TYPE listing_status_enum AS ENUM ('draft', 'pending_moderation', 'active', 'paused', 'occupied');

CREATE TABLE IF NOT EXISTS pg_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE,
    tagline TEXT,
    description TEXT,
    city TEXT NOT NULL DEFAULT 'Pune',
    locality TEXT NOT NULL,
    landmark TEXT,
    address_masked TEXT NOT NULL,
    full_address TEXT, -- Privileged, visible only to confirmed bookers
    latitude NUMERIC(10, 6),
    longitude NUMERIC(10, 6),
    gender_policy gender_policy_enum NOT NULL DEFAULT 'Co-ed',
    room_types TEXT[] NOT NULL DEFAULT ARRAY['Double Sharing'],
    monthly_rent_inr NUMERIC(10, 2) NOT NULL CHECK (monthly_rent_inr > 0),
    security_deposit_inr NUMERIC(10, 2) NOT NULL DEFAULT 0,
    electricity_charge_inr NUMERIC(10, 2) NOT NULL DEFAULT 0,
    maintenance_charge_inr NUMERIC(10, 2) NOT NULL DEFAULT 0,
    food_plan food_plan_enum NOT NULL DEFAULT 'No Food',
    food_type TEXT DEFAULT 'Both (Veg & Non-Veg)',
    furnishing TEXT NOT NULL DEFAULT 'Semi-Furnished',
    curfew_time TEXT DEFAULT 'No Curfew',
    notice_period_days INT DEFAULT 30,
    min_lock_in_months INT DEFAULT 1,
    total_beds INT NOT NULL DEFAULT 10,
    available_beds INT NOT NULL DEFAULT 2,
    distance_to_it_park_km NUMERIC(5, 2) DEFAULT 2.0,
    distance_to_metro_km NUMERIC(5, 2) DEFAULT 1.5,
    average_rating NUMERIC(3, 2) DEFAULT 4.2,
    review_count INT DEFAULT 0,
    status listing_status_enum NOT NULL DEFAULT 'pending_moderation',
    is_demo BOOLEAN NOT NULL DEFAULT FALSE,
    external_demo_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pg_listings_locality ON pg_listings(locality);
CREATE INDEX IF NOT EXISTS idx_pg_listings_status ON pg_listings(status);
CREATE INDEX IF NOT EXISTS idx_pg_listings_rent ON pg_listings(monthly_rent_inr);
CREATE INDEX IF NOT EXISTS idx_pg_listings_owner ON pg_listings(owner_id);

-- 4. Amenities Table
CREATE TABLE IF NOT EXISTS listing_amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL UNIQUE REFERENCES pg_listings(id) ON DELETE CASCADE,
    wifi BOOLEAN DEFAULT TRUE,
    ac BOOLEAN DEFAULT FALSE,
    laundry BOOLEAN DEFAULT TRUE,
    parking BOOLEAN DEFAULT FALSE,
    power_backup BOOLEAN DEFAULT TRUE,
    cctv BOOLEAN DEFAULT TRUE,
    attached_washroom BOOLEAN DEFAULT TRUE,
    ro_water BOOLEAN DEFAULT TRUE,
    geyser BOOLEAN DEFAULT TRUE,
    tv BOOLEAN DEFAULT FALSE,
    cleaning_service BOOLEAN DEFAULT TRUE,
    refrigerator BOOLEAN DEFAULT TRUE
);

-- 5. Photos Table
CREATE TABLE IF NOT EXISTS listing_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES pg_listings(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    caption TEXT,
    display_order INT DEFAULT 0,
    is_cover BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Proximity / Commute Landmarks Table
CREATE TABLE IF NOT EXISTS listing_proximity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES pg_listings(id) ON DELETE CASCADE,
    landmark_name TEXT NOT NULL,
    landmark_type TEXT NOT NULL, -- 'IT Park', 'College', 'Metro Station', 'Hospital'
    distance_km NUMERIC(4, 1) NOT NULL,
    commute_time_mins INT NOT NULL
);

-- 7. Tenant Preferences
CREATE TABLE IF NOT EXISTS tenant_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    preferred_localities TEXT[] DEFAULT ARRAY['Hinjewadi', 'Wakad'],
    preferred_room_types TEXT[] DEFAULT ARRAY['Double Sharing'],
    max_budget_inr NUMERIC(10, 2) DEFAULT 12000,
    food_required BOOLEAN DEFAULT TRUE,
    gender_policy TEXT DEFAULT 'Any',
    work_or_college_area TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Shortlists
CREATE TABLE IF NOT EXISTS shortlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES pg_listings(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_tenant_shortlist UNIQUE (tenant_id, listing_id)
);

-- 9. Inquiries
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES pg_listings(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    phone_shared BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'new', -- 'new', 'replied', 'closed'
    owner_reply TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    replied_at TIMESTAMPTZ
);

-- 10. Bookings Table (Finite State Machine)
CREATE TYPE booking_status_enum AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'rejected');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'paid', 'refunded', 'failed');

CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES pg_listings(id) ON DELETE RESTRICT,
    tenant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    room_type TEXT NOT NULL,
    move_in_date DATE NOT NULL,
    stay_months INT NOT NULL DEFAULT 6,
    quoted_monthly_rent_inr NUMERIC(10, 2) NOT NULL,
    quoted_deposit_inr NUMERIC(10, 2) NOT NULL,
    quoted_platform_fee_inr NUMERIC(10, 2) NOT NULL DEFAULT 499,
    total_initial_payable_inr NUMERIC(10, 2) NOT NULL,
    status booking_status_enum NOT NULL DEFAULT 'pending',
    payment_status payment_status_enum NOT NULL DEFAULT 'pending',
    cancellation_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Payment Records
CREATE TABLE IF NOT EXISTS payment_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    amount_inr NUMERIC(10, 2) NOT NULL,
    payment_method TEXT NOT NULL, -- 'UPI', 'NetBanking', 'CreditCard'
    transaction_reference TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Reviews & Complaints
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES pg_listings(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    overall_rating NUMERIC(2, 1) NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    cleanliness_rating NUMERIC(2, 1) CHECK (cleanliness_rating BETWEEN 1 AND 5),
    food_rating NUMERIC(2, 1) CHECK (food_rating BETWEEN 1 AND 5),
    wifi_rating NUMERIC(2, 1) CHECK (wifi_rating BETWEEN 1 AND 5),
    owner_behavior_rating NUMERIC(2, 1) CHECK (owner_behavior_rating BETWEEN 1 AND 5),
    comment TEXT,
    complaint_type TEXT, -- 'WiFi outage', 'Food quality', 'Water issue', 'None'
    complaint_resolved BOOLEAN DEFAULT FALSE,
    would_recommend BOOLEAN NOT NULL DEFAULT TRUE,
    is_moderated BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Maintenance Requests
CREATE TABLE IF NOT EXISTS maintenance_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES pg_listings(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL, -- 'Plumbing', 'Electrical', 'WiFi', 'Cleaning', 'Appliance'
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'Normal', -- 'Urgent', 'Normal', 'Low'
    status TEXT NOT NULL DEFAULT 'Open', -- 'Open', 'In Progress', 'Resolved', 'Closed'
    resolution_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- 14. Saved Searches
CREATE TABLE IF NOT EXISTS saved_searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    search_params JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Model Prediction Logs
CREATE TABLE IF NOT EXISTS model_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    input_features JSONB NOT NULL,
    predicted_rent_inr NUMERIC(10, 2) NOT NULL,
    lower_bound_inr NUMERIC(10, 2) NOT NULL,
    upper_bound_inr NUMERIC(10, 2) NOT NULL,
    model_version TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_table TEXT NOT NULL,
    target_id TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
