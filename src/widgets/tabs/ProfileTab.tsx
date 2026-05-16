"use client";
import { useAppSelector } from "@/hooks/redux";
import { USER } from "../Dashbord";
import { useAuth } from "@/hooks/useAuth";

export function ProfileTab() {
  const { user } = useAppSelector((state) => state.auth);
  const { handleLogout } = useAuth();
  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Avatar + name */}
      <div className="flex items-center gap-4 px-1 py-2">
        {user?.photoURL ? (
          <div>
            <img
              className="rounded-2xl w-16 h-16"
              src={user.photoURL}
              alt={user.name}
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {user?.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        )}
        <div>
          <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Balance card */}
      <div className="rounded-2xl bg-emerald-600 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-emerald-100 text-xs uppercase tracking-widest mb-1">
            Wallet balance
          </p>
          <p className="text-white text-2xl font-bold">${USER.balance}</p>
        </div>
        <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-xl transition-all active:scale-[0.97]">
          Top up
        </button>
      </div>

      {/* Info rows */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden divide-y divide-gray-50">
        {[
          {
            icon: (
              <svg
                className="w-4 h-4 stroke-emerald-600 fill-none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
              </svg>
            ),
            label: "License plate",
            value: USER.plate,
          },
          {
            icon: (
              <svg
                className="w-4 h-4 stroke-emerald-600 fill-none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.08 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            ),
            label: "Support",
            value: "Contact us",
          },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-4 py-3.5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                {row.icon}
              </div>
              <span className="text-sm text-gray-600">{row.label}</span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Settings rows */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden divide-y divide-gray-50">
        {["Notifications", "Payment methods", "Privacy & Security"].map(
          (item) => (
            <button
              key={item}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-600">{item}</span>
              <svg
                className="w-4 h-4 stroke-gray-300 fill-none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ),
        )}
      </div>

      {/* Sign out */}
      <button
        onClick={handleLogout}
        className="w-full py-3 rounded-xl border cursor-pointer border-red-100 bg-red-50 text-red-500 text-sm font-semibold hover:bg-red-100 active:scale-[0.98] transition-all"
      >
        Sign out
      </button>
    </div>
  );
}
