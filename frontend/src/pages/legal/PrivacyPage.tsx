import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-xs text-slate-700 leading-relaxed">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-900">RoomNest Privacy & Data Governance Policy</h1>
        <p className="text-slate-500 mt-1">Version 1.2 • Published October 21, 2026</p>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">1. Data Minimization & Address Masking</h2>
        <p>
          RoomNest strictly minimizes personal data exposure. Full residential addresses and owner private telephone numbers are never visible on public search cards. Exact addresses are revealed only to confirmed booking parties.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">2. Row Level Security & Zero-Trust Architecture</h2>
        <p>
          User preferences, shortlists, inquiries, and booking transactions are secured in PostgreSQL with strict Row Level Security (RLS) policies. Tenants cannot read or manipulate another tenant's preferences, and owners can only manage listings under their authenticated UID.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">3. AI Training Data Privacy</h2>
        <p>
          Our machine learning models are trained exclusively on de-identified, aggregated historical pricing features (locality, sharing type, amenities). No private student identities, Aadhaar references, or chat histories are fed into machine learning pipelines.
        </p>
      </section>
    </div>
  );
};
