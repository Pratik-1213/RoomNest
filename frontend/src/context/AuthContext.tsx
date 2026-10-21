import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string, fullName: string, phone: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRole: (role: UserRole | 'guest') => void;
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
        return PRESET_USERS.tenant;
      }
    }
    return PRESET_USERS.tenant; // Default to tenant for immediate exploration
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('roomnest_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('roomnest_auth_user');
    }
  }, [user]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check preset test users
    for (const preset of Object.values(PRESET_USERS)) {
      if (preset.email.toLowerCase() === cleanEmail) {
        setUser(preset);
        return { success: true };
      }
    }

    // Check custom registered users from localStorage
    const customUsers: UserProfile[] = JSON.parse(localStorage.getItem('roomnest_custom_users') || '[]');
    const matched = customUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (matched) {
      setUser(matched);
      return { success: true };
    }

    // Fallback error or simulate auth
    if (pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    // Allow user to login with any valid-looking credentials
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      email: cleanEmail,
      full_name: cleanEmail.split('@')[0],
      phone: '+91 98000 00000',
      role: cleanEmail.includes('owner') ? 'owner' : cleanEmail.includes('admin') ? 'admin' : 'tenant',
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

    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      email: email.trim().toLowerCase(),
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

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole | 'guest') => {
    if (role === 'guest') {
      setUser(null);
    } else {
      setUser(PRESET_USERS[role]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: Boolean(user),
        login,
        signup,
        logout,
        switchRole,
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
