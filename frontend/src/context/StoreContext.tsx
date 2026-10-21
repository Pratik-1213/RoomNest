import React, { createContext, useContext, useState, useEffect } from 'react';
import { PGListing, Booking, Inquiry, Review, BookingStatus, ListingStatus } from '../types';
import seedDataRaw from '../data/seedData.json';
import { useAuth } from './AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface StoreContextType {
  listings: PGListing[];
  shortlists: string[];
  comparisons: string[];
  inquiries: Inquiry[];
  bookings: Booking[];
  reviews: Review[];
  toggleShortlist: (listingId: string) => void;
  addToCompare: (listingId: string) => boolean;
  removeFromCompare: (listingId: string) => void;
  clearCompare: () => void;
  addListing: (listing: Omit<PGListing, 'id' | 'owner_id' | 'created_at' | 'average_rating' | 'review_count'>) => string;
  updateListing: (id: string, updates: Partial<PGListing>) => void;
  updateListingStatus: (id: string, status: ListingStatus) => void;
  createInquiry: (listingId: string, message: string, phoneShared: boolean) => void;
  replyToInquiry: (inquiryId: string, replyText: string) => void;
  createBooking: (listingId: string, roomType: string, moveInDate: string, stayMonths: number) => { success: boolean; bookingId?: string; error?: string };
  updateBookingStatus: (bookingId: string, status: BookingStatus, reason?: string) => void;
  addReview: (review: Omit<Review, 'id' | 'created_at' | 'tenant_id' | 'tenant_name'>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // 1. Listings State (seeded with curated Pune PG dataset)
  const [listings, setListings] = useState<PGListing[]>(() => {
    const saved = localStorage.getItem('roomnest_listings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return seedDataRaw as unknown as PGListing[];
      }
    }
    return seedDataRaw as unknown as PGListing[];
  });

  // 2. Shortlists State
  const [shortlists, setShortlists] = useState<string[]>(() => {
    const saved = localStorage.getItem('roomnest_shortlists');
    return saved ? JSON.parse(saved) : [];
  });

  // 3. Comparison State (up to 4 listings)
  const [comparisons, setComparisons] = useState<string[]>(() => {
    const saved = localStorage.getItem('roomnest_comparisons');
    return saved ? JSON.parse(saved) : [];
  });

  // 4. Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('roomnest_inquiries');
    if (saved) return JSON.parse(saved);
    // Initial sample inquiry
    return [
      {
        id: 'inq_1',
        listing_id: listings[0]?.id || '1',
        listing_name: listings[0]?.name || 'NestStay Hinjewadi',
        locality: listings[0]?.locality || 'Hinjewadi',
        tenant_id: '00000000-0000-0000-0000-000000000001',
        tenant_name: 'Tanmay Shinde',
        tenant_phone: '+91 98901 23456',
        owner_id: '00000000-0000-0000-0000-000000000002',
        message: 'Hi, I am starting an internship in Hinjewadi Phase 1 next month. Is a single room available with food?',
        phone_shared: true,
        status: 'replied',
        owner_reply: 'Yes Tanmay, we have 1 single room opening up on the 1st. Food mess is included. You can book a visit.',
        created_at: '2026-10-18T10:30:00Z',
        replied_at: '2026-10-18T14:15:00Z',
      },
    ];
  });

  // 5. Bookings State
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('roomnest_bookings');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'bkg_1',
        listing_id: listings[0]?.id || '1',
        listing_name: listings[0]?.name || 'NestStay Hinjewadi Tech Enclave',
        locality: listings[0]?.locality || 'Hinjewadi',
        tenant_id: '00000000-0000-0000-0000-000000000001',
        tenant_name: 'Tanmay Shinde',
        tenant_email: 'tanmay.tenant@roomnest.in',
        tenant_phone: '+91 98901 23456',
        owner_id: '00000000-0000-0000-0000-000000000002',
        room_type: 'Double Sharing',
        move_in_date: '2026-11-01',
        stay_months: 6,
        quoted_monthly_rent_inr: 9500,
        quoted_deposit_inr: 19000,
        quoted_platform_fee_inr: 499,
        total_initial_payable_inr: 28999,
        status: 'confirmed',
        payment_status: 'paid',
        created_at: '2026-10-15T09:20:00Z',
      },
    ];
  });

  // 6. Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('roomnest_reviews');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'rev_1',
        listing_id: listings[0]?.id || '1',
        listing_name: listings[0]?.name,
        tenant_id: '00000000-0000-0000-0000-000000000001',
        tenant_name: 'Tanmay Shinde',
        overall_rating: 4.5,
        cleanliness_rating: 5.0,
        food_rating: 4.0,
        wifi_rating: 4.8,
        owner_behavior_rating: 5.0,
        comment: 'Very convenient location for Phase 1 employees. High-speed fiber WiFi was rock solid during remote work hours.',
        would_recommend: true,
        created_at: '2026-10-12T16:00:00Z',
      },
      {
        id: 'rev_2',
        listing_id: listings[1]?.id || '2',
        listing_name: listings[1]?.name,
        tenant_id: 'usr_rohit',
        tenant_name: 'Rohit Kulkarni (COEP Alum)',
        overall_rating: 4.2,
        cleanliness_rating: 4.0,
        food_rating: 4.5,
        wifi_rating: 4.0,
        owner_behavior_rating: 4.5,
        comment: 'Great study atmosphere in Kothrud, peaceful neighborhood and Maharashtrian mess food is tasty.',
        would_recommend: true,
        created_at: '2026-10-08T11:45:00Z',
      },
    ];
  });

  // Live Supabase Fetching on mount
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // 1. Fetch live listings
      supabase
        .from('pg_listings')
        .select('*')
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            // Merge with local photos & amenities if missing in DB
            const enriched: PGListing[] = data.map((item: any, idx: number) => {
              const fallbackFixture = seedDataRaw[idx % seedDataRaw.length];
              return {
                ...item,
                photos: item.photos && item.photos.length > 0 ? item.photos : fallbackFixture.photos,
                amenities: item.amenities || fallbackFixture.amenities,
                proximity: item.proximity || fallbackFixture.proximity,
              };
            });
            setListings(enriched);
          }
        });

      // 2. Fetch live bookings
      supabase
        .from('bookings')
        .select('*')
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            setBookings(data as Booking[]);
          }
        });

      // 3. Fetch live inquiries
      supabase
        .from('inquiries')
        .select('*')
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            setInquiries(data as Inquiry[]);
          }
        });

      // 4. Fetch live reviews
      supabase
        .from('reviews')
        .select('*')
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            setReviews(data as Review[]);
          }
        });
    }
  }, []);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('roomnest_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('roomnest_shortlists', JSON.stringify(shortlists));
  }, [shortlists]);

  useEffect(() => {
    localStorage.setItem('roomnest_comparisons', JSON.stringify(comparisons));
  }, [comparisons]);

  useEffect(() => {
    localStorage.setItem('roomnest_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('roomnest_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('roomnest_reviews', JSON.stringify(reviews));
  }, [reviews]);


  // Actions
  const toggleShortlist = (listingId: string) => {
    setShortlists((prev) =>
      prev.includes(listingId) ? prev.filter((id) => id !== listingId) : [...prev, listingId]
    );
  };

  const addToCompare = (listingId: string): boolean => {
    if (comparisons.includes(listingId)) return true;
    if (comparisons.length >= 4) {
      alert('You can compare a maximum of 4 listings at a time.');
      return false;
    }
    setComparisons((prev) => [...prev, listingId]);
    return true;
  };

  const removeFromCompare = (listingId: string) => {
    setComparisons((prev) => prev.filter((id) => id !== listingId));
  };

  const clearCompare = () => {
    setComparisons([]);
  };

  const addListing = (newListingData: Omit<PGListing, 'id' | 'owner_id' | 'created_at' | 'average_rating' | 'review_count'>): string => {
    const newId = 'pg_' + Date.now();
    const newListing: PGListing = {
      ...newListingData,
      id: newId,
      owner_id: user?.id || '00000000-0000-0000-0000-000000000002',
      owner_name: user?.full_name || 'Verified Owner',
      owner_phone: user?.phone || '+91 98220 14890',
      average_rating: 4.5,
      review_count: 0,
      status: user?.role === 'admin' ? 'active' : 'pending_moderation',
      is_demo: false, // New owner submitted listings are real entries
    };

    setListings((prev) => [newListing, ...prev]);

    // Live Supabase sync
    if (isSupabaseConfigured && supabase) {
      supabase.from('pg_listings').insert({
        id: newListing.id,
        owner_id: newListing.owner_id,
        name: newListing.name,
        slug: newListing.slug,
        locality: newListing.locality,
        address_masked: newListing.address_masked,
        gender_policy: newListing.gender_policy,
        room_types: newListing.room_types,
        monthly_rent_inr: newListing.monthly_rent_inr,
        security_deposit_inr: newListing.security_deposit_inr,
        total_beds: newListing.total_beds,
        available_beds: newListing.available_beds,
        food_plan: newListing.food_plan === 'Three Meals' ? 'Three Meals' : 'Two Meals (Breakfast + Dinner)',
        status: newListing.status,
        is_demo: false,
      }).then(({ error }) => {
        if (error) console.log('Supabase listing insert notice:', error.message);
      });
    }

    return newId;
  };

  const updateListing = (id: string, updates: Partial<PGListing>) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
    );
    if (isSupabaseConfigured && supabase) {
      supabase.from('pg_listings').update(updates).eq('id', id).then();
    }
  };

  const updateListingStatus = (id: string, status: ListingStatus) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    if (isSupabaseConfigured && supabase) {
      supabase.from('pg_listings').update({ status }).eq('id', id).then();
    }
  };

  const createInquiry = (listingId: string, message: string, phoneShared: boolean) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return;

    const newInquiry: Inquiry = {
      id: 'inq_' + Date.now(),
      listing_id: listingId,
      listing_name: listing.name,
      locality: listing.locality,
      tenant_id: user?.id || '00000000-0000-0000-0000-000000000001',
      tenant_name: user?.full_name || 'Tenant Inquirer',
      tenant_phone: phoneShared ? user?.phone || '+91 98901 00000' : 'Hidden by tenant',
      owner_id: listing.owner_id,
      message,
      phone_shared: phoneShared,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    setInquiries((prev) => [newInquiry, ...prev]);

    if (isSupabaseConfigured && supabase) {
      supabase.from('inquiries').insert({
        listing_id: listing.id,
        tenant_id: user?.id || '00000000-0000-0000-0000-000000000001',
        owner_id: listing.owner_id,
        message,
        phone_shared: phoneShared,
        status: 'new',
      }).then();
    }
  };

  const replyToInquiry = (inquiryId: string, replyText: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId
          ? {
              ...inq,
              status: 'replied',
              owner_reply: replyText,
              replied_at: new Date().toISOString(),
            }
          : inq
      )
    );
  };

  const createBooking = (
    listingId: string,
    roomType: string,
    moveInDate: string,
    stayMonths: number
  ) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return { success: false, error: 'Listing not found' };

    if (listing.available_beds <= 0) {
      return { success: false, error: 'No beds currently available in this PG.' };
    }

    const platformFee = 499;
    const initialPayable = listing.monthly_rent_inr + listing.security_deposit_inr + platformFee;

    const newBooking: Booking = {
      id: 'bkg_' + Date.now(),
      listing_id: listing.id,
      listing_name: listing.name,
      locality: listing.locality,
      tenant_id: user?.id || '00000000-0000-0000-0000-000000000001',
      tenant_name: user?.full_name || 'Tanmay Shinde',
      tenant_email: user?.email || 'tanmay.tenant@roomnest.in',
      tenant_phone: user?.phone || '+91 98901 23456',
      owner_id: listing.owner_id,
      room_type: roomType,
      move_in_date: moveInDate,
      stay_months: stayMonths,
      quoted_monthly_rent_inr: listing.monthly_rent_inr,
      quoted_deposit_inr: listing.security_deposit_inr,
      quoted_platform_fee_inr: platformFee,
      total_initial_payable_inr: initialPayable,
      status: 'pending',
      payment_status: 'paid', // Initial token payment confirmed in demo flow
      created_at: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    if (isSupabaseConfigured && supabase) {
      supabase.from('bookings').insert({
        listing_id: listing.id,
        tenant_id: user?.id || '00000000-0000-0000-0000-000000000001',
        owner_id: listing.owner_id,
        room_type: roomType,
        move_in_date: moveInDate,
        stay_months: stayMonths,
        quoted_monthly_rent_inr: listing.monthly_rent_inr,
        quoted_deposit_inr: listing.security_deposit_inr,
        quoted_platform_fee_inr: platformFee,
        total_initial_payable_inr: initialPayable,
        status: 'pending',
        payment_status: 'paid',
      }).then();
    }

    return { success: true, bookingId: newBooking.id };
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus, reason?: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status,
              cancellation_reason: reason || b.cancellation_reason,
            }
          : b
      )
    );
    if (isSupabaseConfigured && supabase) {
      supabase.from('bookings').update({ status, cancellation_reason: reason }).eq('id', bookingId).then();
    }
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'created_at' | 'tenant_id' | 'tenant_name'>) => {
    const newReview: Review = {
      ...reviewData,
      id: 'rev_' + Date.now(),
      tenant_id: user?.id || '00000000-0000-0000-0000-000000000001',
      tenant_name: user?.full_name || 'Tanmay Shinde',
      created_at: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);

    if (isSupabaseConfigured && supabase) {
      supabase.from('reviews').insert({
        listing_id: reviewData.listing_id,
        tenant_id: user?.id || '00000000-0000-0000-0000-000000000001',
        overall_rating: reviewData.overall_rating,
        cleanliness_rating: reviewData.cleanliness_rating,
        food_rating: reviewData.food_rating,
        wifi_rating: reviewData.wifi_rating,
        owner_behavior_rating: reviewData.owner_behavior_rating,
        comment: reviewData.comment,
        would_recommend: reviewData.would_recommend,
        is_moderated: true,
      }).then();
    }

    // Recalculate listing rating
    setListings((prev) =>
      prev.map((l) => {
        if (l.id === reviewData.listing_id) {
          const newCount = l.review_count + 1;
          const newAvg = Number(((l.average_rating * l.review_count + reviewData.overall_rating) / newCount).toFixed(1));
          return {
            ...l,
            average_rating: newAvg,
            review_count: newCount,
          };
        }
        return l;
      })
    );
  };

  return (
    <StoreContext.Provider
      value={{
        listings,
        shortlists,
        comparisons,
        inquiries,
        bookings,
        reviews,
        toggleShortlist,
        addToCompare,
        removeFromCompare,
        clearCompare,
        addListing,
        updateListing,
        updateListingStatus,
        createInquiry,
        replyToInquiry,
        createBooking,
        updateBookingStatus,
        addReview,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
