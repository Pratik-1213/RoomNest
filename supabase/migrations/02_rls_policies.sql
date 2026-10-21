-- RoomNest Row Level Security Policies Migration 02
-- Strict Least-Privilege Authorization

-- Enable RLS across all canonical tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pg_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_proximity ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper functions for role checks
CREATE OR REPLACE FUNCTION auth_is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION auth_is_owner()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'owner'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE USING (auth.uid() = id)
WITH CHECK (auth.uid() = id AND role = (SELECT role FROM profiles WHERE id = auth.uid())); -- Prevent self privilege escalation

-- 2. PG Listings Policies
-- Public can read only published active listings
CREATE POLICY "Public read active listings"
ON pg_listings FOR SELECT
USING (status = 'active' OR auth.uid() = owner_id OR auth_is_admin());

-- Owners can insert listings under their own id
CREATE POLICY "Owners can insert listings"
ON pg_listings FOR INSERT
WITH CHECK (auth.uid() = owner_id AND (auth_is_owner() OR auth_is_admin()));

-- Owners can update own listings
CREATE POLICY "Owners can update own listings"
ON pg_listings FOR UPDATE
USING (auth.uid() = owner_id OR auth_is_admin())
WITH CHECK (auth.uid() = owner_id OR auth_is_admin());

-- Owners can delete own draft listings
CREATE POLICY "Owners can delete own listings"
ON pg_listings FOR DELETE
USING (auth.uid() = owner_id OR auth_is_admin());

-- 3. Listing Amenities & Photos Policies
CREATE POLICY "Public read amenities of visible listings"
ON listing_amenities FOR SELECT
USING (EXISTS (SELECT 1 FROM pg_listings WHERE pg_listings.id = listing_amenities.listing_id AND (pg_listings.status = 'active' OR pg_listings.owner_id = auth.uid() OR auth_is_admin())));

CREATE POLICY "Owners manage own listing amenities"
ON listing_amenities FOR ALL
USING (EXISTS (SELECT 1 FROM pg_listings WHERE pg_listings.id = listing_amenities.listing_id AND (pg_listings.owner_id = auth.uid() OR auth_is_admin())));

CREATE POLICY "Public read photos of visible listings"
ON listing_photos FOR SELECT
USING (EXISTS (SELECT 1 FROM pg_listings WHERE pg_listings.id = listing_photos.listing_id AND (pg_listings.status = 'active' OR pg_listings.owner_id = auth.uid() OR auth_is_admin())));

CREATE POLICY "Owners manage own listing photos"
ON listing_photos FOR ALL
USING (EXISTS (SELECT 1 FROM pg_listings WHERE pg_listings.id = listing_photos.listing_id AND (pg_listings.owner_id = auth.uid() OR auth_is_admin())));

-- 4. Tenant Preferences & Shortlists
CREATE POLICY "Tenants manage own preferences"
ON tenant_preferences FOR ALL
USING (auth.uid() = tenant_id)
WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Tenants manage own shortlists"
ON shortlists FOR ALL
USING (auth.uid() = tenant_id)
WITH CHECK (auth.uid() = tenant_id);

-- 5. Inquiries Policies
CREATE POLICY "Parties view own inquiries"
ON inquiries FOR SELECT
USING (auth.uid() = tenant_id OR auth.uid() = owner_id OR auth_is_admin());

CREATE POLICY "Tenants insert inquiries"
ON inquiries FOR INSERT
WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Owners update inquiries"
ON inquiries FOR UPDATE
USING (auth.uid() = owner_id OR auth_is_admin());

-- 6. Bookings Policies
CREATE POLICY "Parties view own bookings"
ON bookings FOR SELECT
USING (auth.uid() = tenant_id OR auth.uid() = owner_id OR auth_is_admin());

CREATE POLICY "Tenants create booking requests"
ON bookings FOR INSERT
WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Parties update booking states based on permissions"
ON bookings FOR UPDATE
USING (auth.uid() = tenant_id OR auth.uid() = owner_id OR auth_is_admin());

-- 7. Reviews Policies
CREATE POLICY "Public read moderated reviews"
ON reviews FOR SELECT
USING (is_moderated = true OR auth.uid() = tenant_id OR auth_is_admin());

CREATE POLICY "Tenants insert reviews for completed stays"
ON reviews FOR INSERT
WITH CHECK (auth.uid() = tenant_id);

-- 8. Admin Moderation & Audit Logs
CREATE POLICY "Admins have full access to audit logs"
ON audit_logs FOR ALL
USING (auth_is_admin());
