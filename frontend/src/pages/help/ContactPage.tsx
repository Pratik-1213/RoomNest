import React, { useState } from 'react';
import { Mail, Phone, MapPin, Building2, CheckCircle2, Send, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 border border-teal-200 px-3 py-0.5 rounded-full text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-teal-600" />
          <span>Pune Operations & Support Hub</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact RoomNest Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Reach our student housing coordinators, owner verification team, or technical support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Contact Info (1 Col) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3">Pune Regional Office</h3>
            <div className="space-y-3 text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  Office 402, Prime IT Plaza, Off Karve Road, Near Deccan Gymkhana / COEP Corridor, Pune 411004
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-semibold text-slate-800">+91 20 2550 1000 / +91 98220 14890</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                <span>support@roomnest.in</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <h4 className="font-bold text-slate-900">Support Hours</h4>
            <div className="text-slate-500 space-y-1 text-[11px]">
              <div>Monday – Saturday: 9:00 AM – 7:30 PM IST</div>
              <div>Sunday: 10:00 AM – 2:00 PM (Emergency check-in helpline)</div>
            </div>
          </div>
        </div>

        {/* Message Form (2 Cols) */}
        <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Thank you for reaching out. A Pune representative will respond to your email at <span className="font-semibold text-slate-800">{email}</span> within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Send us a Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. Tanmay Shinde"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Message / Inquiry Details</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Inquire about property verification, student group discounts, or owner onboarding..."
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" /> Send Support Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
