import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Phone, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';

export const OwnerInquiriesPage: React.FC = () => {
  const { inquiries, replyToInquiry } = useStore();
  const { user } = useAuth();

  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  const handleReply = (inquiryId: string) => {
    const text = replyTextMap[inquiryId];
    if (text) {
      replyToInquiry(inquiryId, text);
      setReplyTextMap((prev) => ({ ...prev, [inquiryId]: '' }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
            <Link to="/owner/dashboard" className="hover:text-teal-700">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Inquiries</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Send className="w-6 h-6 text-teal-600" />
            Tenant Inquiries ({inquiries.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Incoming queries from students & IT professionals looking for Pune accommodations
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div key={inq.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="font-bold text-slate-900 text-sm">{inq.tenant_name}</span>
                <span className="text-slate-400 ml-2">• Inquiring for <span className="font-semibold text-slate-700">{inq.listing_name}</span> ({inq.locality})</span>
              </div>
              <div className="flex items-center gap-3">
                {inq.phone_shared && inq.tenant_phone && (
                  <span className="flex items-center gap-1 text-slate-600 bg-slate-50 px-2 py-1 rounded border">
                    <Phone className="w-3.5 h-3.5 text-teal-600" /> {inq.tenant_phone}
                  </span>
                )}
                <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                  inq.status === 'replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {inq.status}
                </span>
              </div>
            </div>

            {/* Tenant Message */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block text-[11px] mb-1">Tenant Query:</span>
              "{inq.message}"
            </div>

            {/* Existing Reply or Reply Box */}
            {inq.owner_reply ? (
              <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-200 text-teal-900 space-y-1">
                <span className="font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Your Response (Sent):
                </span>
                <p className="text-slate-800">{inq.owner_reply}</p>
              </div>
            ) : (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block font-bold text-slate-700">Write Direct Reply to Tenant</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyTextMap[inq.id] || ''}
                    onChange={(e) => setReplyTextMap({ ...replyTextMap, [inq.id]: e.target.value })}
                    placeholder="e.g. Yes, bed is available. You can visit this Saturday at 4 PM."
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={() => handleReply(inq.id)}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-lg transition"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
