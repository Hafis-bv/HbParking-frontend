"use client";

import { useEffect, useState } from "react";
import { HISTORY, SESSION_DATA } from "../Dashbord";
import API from "@/utils/api";
import { Sessions } from "@/types/sessions";

export function TimeTab() {
  const [active, setActive] = useState<Sessions | null>(null);

  async function fetchSession() {
    const res = await API.getSession();
    setActive(res);
    console.log(res);
  }

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* Active session card */}
      <div className="relative rounded-2xl bg-emerald-600 p-5 overflow-hidden">
        <div className="pointer-events-none absolute -top-8 -right-8 w-36 h-36 rounded-full bg-emerald-500 opacity-40" />
        <div className="pointer-events-none absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-emerald-700 opacity-30" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-emerald-100 uppercase tracking-widest">
              {active ? "Active Session" : "No Active Session"}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${active ? "bg-white/20 text-white" : "bg-white/10 text-emerald-200"}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-300 animate-pulse" : "bg-gray-300"}`}
              />
              {active ? "Live" : "Idle"}
            </span>
          </div>

          {active ? (
            <>
              <div className="flex items-end gap-3 mb-4">
                <div>
                  <p className="text-emerald-100 text-xs mb-0.5">Zone / Spot</p>
                  <p className="text-white text-3xl font-bold tracking-tight">
                    {SESSION_DATA.zone} ·{" "}
                    <span className="text-emerald-200">
                      #{SESSION_DATA.spot}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Started", value: SESSION_DATA.startTime },
                  { label: "Elapsed", value: SESSION_DATA.elapsed },
                  { label: "Cost", value: `$${SESSION_DATA.total}` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/10 rounded-xl px-3 py-2.5 text-center"
                  >
                    <p className="text-emerald-200 text-[10px] uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-semibold text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full py-2.5 rounded-xl bg-white text-emerald-700 text-sm font-semibold transition-all hover:bg-emerald-50 active:scale-[0.98]">
                End Session
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-emerald-100 text-sm mb-3">
                You have no active parking session.
              </p>
              <button className="px-6 py-2.5 rounded-xl bg-white text-emerald-700 text-sm font-semibold hover:bg-emerald-50 active:scale-[0.98] transition-all">
                Start Parking
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Rate info */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
        <span className="text-sm text-gray-600">Current rate</span>
        <span className="text-sm font-semibold text-emerald-700">
          ${SESSION_DATA.rate} / hour
        </span>
      </div>

      {/* History */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 px-1">
          Recent sessions
        </h2>
        <div className="flex flex-col gap-2.5">
          {HISTORY.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-white border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
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
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Zone {item.zone} · Spot #{item.spot}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.date} · {item.duration}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-emerald-600">
                ${item.cost}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
