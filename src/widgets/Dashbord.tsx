"use client";

import { useState } from "react";
import { HbParkingLogo } from "@/assets/icons/HbParkingLogo";
import { ProfileIcon } from "@/assets/icons/ProfileIcon";
import { ClockIcon } from "@/assets/icons/ClockIcon";
import { TimeTab } from "./tabs/TimeTab";
import { MapTab } from "./tabs/MapTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { MapIcon } from "@/assets/icons/MapIcon";

// ─── Tab types ───────────────────────────────────────────────────────────────
type Tab = "time" | "map" | "profile";

// ─── Placeholder data (replace with real backend calls) ──────────────────────
export const SESSION_DATA = {
  isActive: true,
  zone: "A-12",
  spot: "14",
  startTime: "09:30",
  elapsed: "1h 24m",
  rate: "0.80",
  total: "1.12",
};

export const HISTORY = [
  {
    id: 1,
    date: "Today",
    zone: "A-12",
    spot: "14",
    duration: "1h 24m",
    cost: "1.12",
  },
  {
    id: 2,
    date: "Yesterday",
    zone: "B-03",
    spot: "07",
    duration: "3h 10m",
    cost: "2.53",
  },
  {
    id: 3,
    date: "May 1",
    zone: "C-07",
    spot: "22",
    duration: "0h 45m",
    cost: "0.60",
  },
];

export const MAP_ZONES = [
  { id: "A", available: 8, total: 20, color: "bg-emerald-500" },
  { id: "B", available: 3, total: 20, color: "bg-amber-400" },
  { id: "C", available: 0, total: 20, color: "bg-red-400" },
  { id: "D", available: 15, total: 20, color: "bg-emerald-500" },
];

export const USER = {
  name: "Amir Hasanov",
  email: "amir@example.com",
  plate: "10 AA 777",
  plan: "Standard",
  balance: "12.40",
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Dashbord() {
  const [tab, setTab] = useState<Tab>("time");

  const tabs: {
    id: Tab;
    label: string;
    Icon: React.ComponentType<{ active: boolean }>;
  }[] = [
    { id: "time", label: "Time", Icon: ClockIcon },
    { id: "map", label: "Map", Icon: MapIcon },
    { id: "profile", label: "Profile", Icon: ProfileIcon },
  ];

  return (
    <main className="min-h-screen bg-emerald-50 flex flex-col items-center px-4 pt-6 pb-24">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <HbParkingLogo width={140} showTagline={false} />
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
            {USER.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>

        {/* Tab content */}
        <div>
          {tab === "time" && <TimeTab />}
          {tab === "map" && <MapTab />}
          {tab === "profile" && <ProfileTab />}
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around px-6 py-3 z-50">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="flex flex-col items-center gap-1 min-w-[56px] transition-all active:scale-95"
          >
            <Icon active={tab === id} />
            <span
              className={`text-[11px] font-medium ${tab === id ? "text-emerald-600" : "text-gray-400"}`}
            >
              {label}
            </span>
          </button>
        ))}
      </nav>
    </main>
  );
}
