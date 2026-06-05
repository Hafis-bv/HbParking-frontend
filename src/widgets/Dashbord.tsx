"use client";

import { useEffect, useState } from "react";
import { HbParkingLogo } from "@/assets/icons/HbParkingLogo";
import { ProfileIcon } from "@/assets/icons/ProfileIcon";
import { ClockIcon } from "@/assets/icons/ClockIcon";
import { TimeTab } from "./tabs/TimeTab";
import { MapTab } from "./tabs/MapTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { MapIcon } from "@/assets/icons/MapIcon";
import { useAppSelector } from "@/hooks/redux";
import { Tab } from "@/types/tab";

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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Dashbord() {
  const [tab, setTab] = useState<Tab>(() => {
    const savedTab = localStorage.getItem("tab") as Tab;
    return savedTab || "time";
  });
  const { user } = useAppSelector((state) => state.auth);

  const tabs: {
    id: Tab;
    label: string;
    Icon: React.ComponentType<{ active: boolean }>;
  }[] = [
    { id: "time", label: "Time", Icon: ClockIcon },
    { id: "map", label: "Map", Icon: MapIcon },
    { id: "profile", label: "Profile", Icon: ProfileIcon },
  ];

  useEffect(() => {
    localStorage.setItem("tab", tab);
  }, [tab]);

  return (
    <main className="min-h-screen bg-emerald-50 flex flex-col items-center px-4 pt-6 pb-24">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <HbParkingLogo width={140} showTagline={false} />
          <div>
            <div className="w-9 h-9 rounded-xl uppercase bg-emerald-600 flex items-center justify-center text-white text-md font-bold">
              {user?.email
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div>
          {tab === "time" && <TimeTab />}
          {tab === "map" && <MapTab setTab={setTab} />}
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
