import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-xs text-slate-700 leading-relaxed">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-900">RoomNest Terms of Service</h1>
        <p className="text-slate-500 mt-1">Version 1.2 • Effective Date: October 21, 2026 • Pune Jurisdiction</p>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">1. Platform Nature and Scope</h2>
        <p>
          RoomNest provides an online discovery and verified marketplace connecting paying guest (PG) accommodation providers in Pune, Maharashtra with prospective student and professional tenants. RoomNest is not a real estate broker and does not own the listed residential properties.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">2. Data Provenance & Prototype Inventory Caveat</h2>
        <p>
          Properties flagged with a "Prototype Demo" badge originate from the 10,000-row research dataset utilized for engineering benchmarks and predictive modeling. Such listings do not constitute active verified inventory until an authenticated property owner submits verified trade/municipal licenses and in-person room verification is executed.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">3. Tenant Rights & Transparent Costs</h2>
        <p>
          All published listings on RoomNest must explicitly disclose base rent, refundable security deposits, sub-metered electricity calculations, and common maintenance charges. Owners are prohibited from charging undisclosed entry or exit surcharges.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">4. Dispute Resolution & Governing Law</h2>
        <p>
          These terms are governed by the laws of India. Any legal proceedings arising hereunder shall be subject to the exclusive jurisdiction of the civil courts in Pune, Maharashtra.
        </p>
      </section>
    </div>
  );
};
