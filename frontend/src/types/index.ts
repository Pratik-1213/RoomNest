export type UserRole = 'tenant' | 'owner' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: UserRole;
  avatar_url?: string;
  bio?: string;
  is_verified?: boolean;
}

export interface ListingAmenities {
  wifi: boolean;
  ac: boolean;
  laundry: boolean;
  parking: boolean;
  power_backup: boolean;
  cctv: boolean;
  attached_washroom: boolean;
  ro_water: boolean;
}

export interface ProximityLandmark {
  landmark_name: string;
  distance_km: number;
  commute_time_mins: number;
}

export type ListingStatus = 'draft' | 'pending_moderation' | 'active' | 'paused' | 'occupied';

export interface PGListing {
  id: string;
  owner_id: string;
  owner_name?: string;
  owner_phone?: string;
  name: string;
  slug: string;
  description?: string;
  city: string;
  locality: string;
  landmark: string;
  address_masked: string;
  full_address?: string;
  gender_policy: 'Boys' | 'Girls' | 'Co-ed';
  room_types: string[];
  monthly_rent_inr: number;
  security_deposit_inr: number;
  electricity_charge_inr: number;
  maintenance_charge_inr: number;
  food_plan: string;
  food_type: string;
  furnishing: string;
  curfew_time: string;
  total_beds: number;
  available_beds: number;
  distance_to_it_park_km: number;
  distance_to_metro_km: number;
  average_rating: number;
  review_count: number;
  status: ListingStatus;
  is_demo: boolean;
  external_demo_id?: string;
  photos: string[];
  amenities: ListingAmenities;
  proximity: ProximityLandmark[];
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export interface Booking {
  id: string;
  listing_id: string;
  listing_name: string;
  locality: string;
  tenant_id: string;
  tenant_name: string;
  tenant_email: string;
  tenant_phone: string;
  owner_id: string;
  room_type: string;
  move_in_date: string;
  stay_months: number;
  quoted_monthly_rent_inr: number;
  quoted_deposit_inr: number;
  quoted_platform_fee_inr: number;
  total_initial_payable_inr: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  cancellation_reason?: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  listing_id: string;
  listing_name: string;
  locality: string;
  tenant_id: string;
  tenant_name: string;
  tenant_phone: string;
  owner_id: string;
  message: string;
  phone_shared: boolean;
  status: 'new' | 'replied' | 'closed';
  owner_reply?: string;
  created_at: string;
  replied_at?: string;
}

export interface Review {
  id: string;
  listing_id: string;
  listing_name?: string;
  tenant_id: string;
  tenant_name: string;
  overall_rating: number;
  cleanliness_rating: number;
  food_rating: number;
  wifi_rating: number;
  owner_behavior_rating: number;
  comment: string;
  complaint_type?: string;
  complaint_resolved?: boolean;
  would_recommend: boolean;
  created_at: string;
}

export interface TenantPreferences {
  preferred_localities: string[];
  preferred_room_types: string[];
  max_budget_inr: number;
  food_required: boolean;
  gender_policy: string;
  work_or_college_area: string;
}

export interface RentFactor {
  factor: string;
  impact: string;
  detail: string;
}

export interface RentPredictionResponse {
  predicted_monthly_rent_inr: number;
  lower_bound_inr: number;
  upper_bound_inr: number;
  model_version: string;
  confidence_label: string;
  explanation_factors: RentFactor[];
  locality_average_inr: number;
  disclaimer: string;
}
