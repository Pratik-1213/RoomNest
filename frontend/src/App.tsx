import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DataCaveatBanner } from './components/layout/DataCaveatBanner';

// Public Pages
import { HomePage } from './pages/HomePage';
import { PGSearchPage } from './pages/PGSearchPage';
import { PGDetailPage } from './pages/PGDetailPage';
import { ComparePage } from './pages/ComparePage';
import { PriceEstimatorPage } from './pages/PriceEstimatorPage';
import { RoommateFinderPage } from './pages/RoommateFinderPage';
import { ModelEvaluationDashboardPage } from './pages/ModelEvaluationDashboardPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ContactPage } from './pages/help/ContactPage';
import { TermsPage } from './pages/legal/TermsPage';
import { PrivacyPage } from './pages/legal/PrivacyPage';
import { CancellationPage } from './pages/legal/CancellationPage';

// Tenant Pages
import { TenantDashboardPage } from './pages/tenant/TenantDashboardPage';
import { TenantOnboardingPage } from './pages/tenant/TenantOnboardingPage';
import { TenantShortlistsPage } from './pages/tenant/TenantShortlistsPage';
import { TenantBookingsPage } from './pages/tenant/TenantBookingsPage';
import { TenantReviewNewPage } from './pages/tenant/TenantReviewNewPage';

// Owner Pages
import { OwnerDashboardPage } from './pages/owner/OwnerDashboardPage';
import { OwnerOnboardingPage } from './pages/owner/OwnerOnboardingPage';
import { OwnerListingsPage } from './pages/owner/OwnerListingsPage';
import { OwnerListingNewPage } from './pages/owner/OwnerListingNewPage';
import { OwnerListingEditPage } from './pages/owner/OwnerListingEditPage';
import { OwnerInquiriesPage } from './pages/owner/OwnerInquiriesPage';
import { OwnerBookingsPage } from './pages/owner/OwnerBookingsPage';
import { OwnerAnalyticsPage } from './pages/owner/OwnerAnalyticsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminListingsModerationPage } from './pages/admin/AdminListingsModerationPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';

// Guard for role-based routes
const RequireRole: React.FC<{ allowedRoles: string[]; children: React.ReactNode }> = ({
  allowedRoles,
  children,
}) => {
  const { user, role } = useAuth();
  if (!user || !role || !allowedRoles.includes(role)) {
    // If not authenticated or wrong role, direct to login
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-[#243244] font-sans antialiased">
            <DataCaveatBanner />
            <Navbar />

            <main className="flex-1">
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/pgs" element={<PGSearchPage />} />
                <Route path="/pgs/:id" element={<PGDetailPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/price-estimator" element={<PriceEstimatorPage />} />
                <Route path="/roommate-finder" element={<RoommateFinderPage />} />
                <Route path="/model-evaluation" element={<ModelEvaluationDashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/help/contact" element={<ContactPage />} />
                <Route path="/legal/terms" element={<TermsPage />} />
                <Route path="/legal/privacy" element={<PrivacyPage />} />
                <Route path="/legal/cancellation" element={<CancellationPage />} />

                {/* Tenant Routes */}
                <Route
                  path="/tenant/dashboard"
                  element={
                    <RequireRole allowedRoles={['tenant', 'admin']}>
                      <TenantDashboardPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/tenant/onboarding"
                  element={
                    <RequireRole allowedRoles={['tenant', 'admin']}>
                      <TenantOnboardingPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/tenant/shortlists"
                  element={
                    <RequireRole allowedRoles={['tenant', 'admin']}>
                      <TenantShortlistsPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/tenant/bookings"
                  element={
                    <RequireRole allowedRoles={['tenant', 'admin']}>
                      <TenantBookingsPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/tenant/reviews/new"
                  element={
                    <RequireRole allowedRoles={['tenant', 'admin']}>
                      <TenantReviewNewPage />
                    </RequireRole>
                  }
                />

                {/* Owner Routes */}
                <Route
                  path="/owner/dashboard"
                  element={
                    <RequireRole allowedRoles={['owner', 'admin']}>
                      <OwnerDashboardPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/owner/onboarding"
                  element={
                    <RequireRole allowedRoles={['owner', 'admin']}>
                      <OwnerOnboardingPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/owner/listings"
                  element={
                    <RequireRole allowedRoles={['owner', 'admin']}>
                      <OwnerListingsPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/owner/listings/new"
                  element={
                    <RequireRole allowedRoles={['owner', 'admin']}>
                      <OwnerListingNewPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/owner/listings/:id/edit"
                  element={
                    <RequireRole allowedRoles={['owner', 'admin']}>
                      <OwnerListingEditPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/owner/inquiries"
                  element={
                    <RequireRole allowedRoles={['owner', 'admin']}>
                      <OwnerInquiriesPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/owner/bookings"
                  element={
                    <RequireRole allowedRoles={['owner', 'admin']}>
                      <OwnerBookingsPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/owner/analytics"
                  element={
                    <RequireRole allowedRoles={['owner', 'admin']}>
                      <OwnerAnalyticsPage />
                    </RequireRole>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <RequireRole allowedRoles={['admin']}>
                      <AdminDashboardPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/admin/listings"
                  element={
                    <RequireRole allowedRoles={['admin']}>
                      <AdminListingsModerationPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <RequireRole allowedRoles={['admin']}>
                      <AdminUsersPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/admin/reports"
                  element={
                    <RequireRole allowedRoles={['admin']}>
                      <AdminReportsPage />
                    </RequireRole>
                  }
                />

                {/* 404 Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
