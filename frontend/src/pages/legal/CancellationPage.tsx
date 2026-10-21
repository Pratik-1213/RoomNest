import React from 'react';

export const CancellationPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-xs text-slate-700 leading-relaxed">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-900">RoomNest Pune PG Cancellation & Refund Policy</h1>
        <p className="text-slate-500 mt-1">Version 1.2 • Standardized for Pune Student & IT Accommodations</p>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">1. Cancellation Prior to Move-in Date</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>More than 7 days prior to move-in:</strong> 100% refund of initial quoted rent and security deposit. One-time platform verification fee (₹499) is non-refundable.</li>
          <li><strong>Between 3 to 7 days prior:</strong> 50% refund of first month's token rent; 100% refund of security deposit.</li>
          <li><strong>Less than 72 hours prior:</strong> First month's rent is retained by owner as vacancy damages; security deposit is 100% refunded.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">2. Security Deposit Refund Protocol</h2>
        <p>
          Security deposits must be refunded directly to the tenant's bank account or UPI ID within 7 business days following key handover and room inspection, subject to 30 days prior written move-out notice.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">3. Physical Discrepancy Guarantee</h2>
        <p>
          If upon physical arrival, the accommodation materially differs from the verified photos or stated amenities (e.g., absent AC, defective washroom), the tenant is entitled to immediate cancellation with full 100% refund.
        </p>
      </section>
    </div>
  );
};
