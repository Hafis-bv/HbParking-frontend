"use client";

import { useState } from "react";
import { MAP_ZONES } from "../Dashbord";

export function MapTab() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* Map placeholder */}
      <div className="relative w-full h-52 rounded-2xl bg-emerald-50 border border-emerald-100 overflow-hidden flex items-center justify-center">
        {/* Grid texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#059669"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Zone blocks */}
        <div className="relative z-10 grid grid-cols-2 gap-3 p-4 w-full h-full">
          {MAP_ZONES.map((z) => (
            <button
              key={z.id}
              onClick={() =>
                setSelectedZone(z.id === selectedZone ? null : z.id)
              }
              className={`rounded-xl border-2 flex flex-col items-center justify-center transition-all active:scale-[0.97] ${
                selectedZone === z.id
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-emerald-100 bg-white/80 text-gray-700"
              }`}
            >
              <span className="text-lg font-bold">Zone {z.id}</span>
              <span
                className={`text-xs font-medium mt-0.5 ${selectedZone === z.id ? "text-emerald-100" : "text-gray-400"}`}
              >
                {z.available}/{z.total} free
              </span>
            </button>
          ))}
        </div>

        {/* Map attribution placeholder */}
        <p className="absolute bottom-2 right-3 text-[10px] text-gray-400 z-20">
          Connect map provider
        </p>
      </div>

      {/* Zone legend */}
      <div className="flex items-center gap-4 px-1">
        {[
          { color: "bg-emerald-500", label: "Available" },
          { color: "bg-amber-400", label: "Limited" },
          { color: "bg-red-400", label: "Full" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
            <span className="text-xs text-gray-500">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Zone detail */}
      {selectedZone &&
        (() => {
          const zone = MAP_ZONES.find((z) => z.id === selectedZone)!;
          const pct = Math.round((zone.available / zone.total) * 100);
          return (
            <div className="rounded-2xl border border-emerald-100 bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Zone {zone.id}</h3>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    zone.available === 0
                      ? "bg-red-50 text-red-500"
                      : zone.available <= 5
                        ? "bg-amber-50 text-amber-600"
                        : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {zone.available === 0
                    ? "Full"
                    : zone.available <= 5
                      ? "Limited"
                      : "Available"}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${zone.color}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">
                {zone.available} of {zone.total} spots free
              </p>
              <button className="mt-3 w-full py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all">
                Navigate to Zone {zone.id}
              </button>
            </div>
          );
        })()}

      {/* Search nearby */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-gray-400 fill-none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search parking zone or address…"
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/10 transition-all"
        />
      </div>
    </div>
  );
}
