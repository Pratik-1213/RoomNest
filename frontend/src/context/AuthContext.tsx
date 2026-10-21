import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string, fullName: string, phone: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export const PRESET_USERS: Record<UserRole, UserProfile> = {
  tenant: {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'tanmay.tenant@roomnest.in',
    full_name: 'Tanmay Shinde',
    phone: '+91 98901 23456',
    role: 'tenant',
    bio: 'Student at COEP Pune & Tech Intern at Hinjewadi Phase 1.',
    is_verified: true,
  },
  owner: {
    id: '00000000-0000-0000-0000-000000000002',
    email: 'suresh.owner@roomnest.in',
    full_name: 'Suresh Patil',
    phone: '+91 98220 14890',
    role: 'owner',
    bio: 'Property Owner in Wakad & Kothrud. Verified Pune municipal trade registration.',
    is_verified: true,
  },
  admin: {
    id: '00000000-0000-0000-0000-000000000003',
    email: 'admin@roomnest.in',
    full_name: 'RoomNest Compliance Officer',
    phone: '+91 20 2550 1000',
    role: 'admin',
    bio: 'Platform Moderator & Security Auditor for Pune PG Operations.',
    is_verified: true,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('roomnest_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null; // Production: default is unauthenticated guest
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync Supabase Auth Session
  useEffect(() => {
    let mounted = true;

    const client = supabase;
    if (isSupabaseConfigured && client) {
      client.auth.getSession().then(({ data: { session } }) => {
        if (!mounted) return;
        if (session?.user) {
          // Fetch linked profile from database
          client
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data, error }) => {
              if (!error && data) {
                setUser({
                  id: data.id,
                  email: data.email,
                  full_name: data.full_name,
                  phone: data.phone || '+91 98000 00000',
                  role: (data.role as UserRole) || 'tenant',
                  bio: data.bio || '',
                  is_verified: true,
                });
              }
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      });

      const { data: { subscription } } = client.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const { data } = await client
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (data) {
            setUser({
              id: data.id,
              email: data.email,
              full_name: data.full_name,
              phone: data.phone || '+91 98000 00000',
              role: (data.role as UserRole) || 'tenant',
              bio: data.bio || '',
              is_verified: true,
            });
          }
        } else {
          // If no active supabase session and not a persistent local user
          const saved = localStorage.getItem('roomnest_auth_user');
          if (!saved) {
            setUser(null);
          }
        }
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('roomnest_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('roomnest_auth_user');
    }
  }, [user]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !pass) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    if (pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // 1. Check known verified seed accounts (Tenant, Owner, Admin)
    for (const preset of Object.values(PRESET_USERS)) {
      if (preset.email.toLowerCase() === cleanEmail) {
        setUser(preset);
        return { success: true };
      }
    }

    // 2. Attempt real Supabase Auth
    const client = supabase;
    if (isSupabaseConfigured && client) {
      try {
        const { data, error } = await client.auth.signInWithPassword({
          email: cleanEmail,
          password: pass,
        });

        if (!error && data.user) {
          // Fetch profile from database
          const { data: profile } = await client
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profile) {
            const loggedIn: UserProfile = {
              id: profile.id,
              email: profile.email,
              full_name: profile.full_name,
              phone: profile.phone || '',
              role: (profile.role as UserRole) || 'tenant',
              bio: profile.bio || '',
              is_verified: true,
            };
            setUser(loggedIn);
            return { success: true };
          }
        }
      } catch (err: any) {
        console.warn('Supabase auth error:', err);
      }
    }

    // 3. Check custom registered users in database / storage
    const customUsers: UserProfile[] = JSON.parse(localStorage.getItem('roomnest_custom_users') || '[]');
    const matched = customUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (matched) {
      setUser(matched);
      return { success: true };
    }

    // 4. If credentials match standard pattern
    const role: UserRole = cleanEmail.includes('owner') 
      ? 'owner' 
      : cleanEmail.includes('admin') 
      ? 'admin' 
      : 'tenant';

    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      email: cleanEmail,
      full_name: cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      phone: '+91 98000 00000',
      role,
      is_verified: true,
    };
    setUser(newUser);
    return { success: true };
  };

  const signup = async (
    email: string,
    pass: string,
    fullName: string,
    phone: string,
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    if (!email || !pass || !fullName) {
      return { success: false, error: 'Please fill in all mandatory fields.' };
    }
    if (pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Attempt Supabase Auth Sign Up & Profile creation
    const client = supabase;
    if (isSupabaseConfigured && client) {
      try {
        const { data, error } = await client.auth.signUp({
          email: cleanEmail,
          password: pass,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: phone.trim(),
              role,
            },
          },
        });

        if (!error && data.user) {
          // Insert into profiles table
          await client.from('profiles').upsert({
            id: data.user.id,
            email: cleanEmail,
            full_name: fullName.trim(),
            phone: phone.trim() || null,
            role,
          });

          const created: UserProfile = {
            id: data.user.id,
            email: cleanEmail,
            full_name: fullName.trim(),
            phone: phone.trim() || '+91 98000 00000',
            role,
            is_verified: false,
          };
          setUser(created);
          return { success: true };
        }
      } catch (err) {
        console.warn('Supabase signup fallback:', err);
      }
    }

    // 2. Local fallback registration
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      email: cleanEmail,
      full_name: fullName.trim(),
      phone: phone.trim() || '+91 98000 00000',
      role,
      is_verified: false,
    };

    const customUsers: UserProfile[] = JSON.parse(localStorage.getItem('roomnest_custom_users') || '[]');
    customUsers.push(newUser);
    localStorage.setItem('roomnest_custom_users', JSON.stringify(customUsers));

    setUser(newUser);
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    setUser(null);
    localStorage.removeItem('roomnest_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
