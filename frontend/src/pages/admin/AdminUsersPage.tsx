import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, UserCheck, Mail, Phone } from 'lucide-react';
import { PRESET_USERS } from '../../context/AuthContext';

export const AdminUsersPage: React.FC = () => {
  const usersList = Object.values(PRESET_USERS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
            <Link to="/admin" className="hover:text-purple-700">Admin</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Users</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-600" />
            User & Owner Identity Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Platform roles, KYC status, and authorization boundaries
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-500 uppercase text-[10px]">
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Verification</th>
              <th className="p-4">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {usersList.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50">
                <td className="p-4">
                  <div className="font-bold text-slate-900 text-sm">{u.full_name}</div>
                  <div className="text-slate-500 text-[11px]">{u.email}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                    u.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : u.role === 'owner'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-teal-100 text-teal-800'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-slate-600">
                  {u.phone}
                </td>
                <td className="p-4">
                  <span className="badge-verified px-2 py-0.5 rounded font-bold text-[10px] inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> KYC Verified
                  </span>
                </td>
                <td className="p-4 text-slate-500 max-w-xs text-[11px]">
                  {u.bio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
