"use client";

import { Sessions } from "@/types/sessions";
import { formatTime } from "@/utils/formatTime";
import { getElapsedAndCost } from "@/utils/getElapsedAndCost";
import { useEffect, useState } from "react";

interface ActiveSessionCardProps {
  session: Sessions;
  onEnd: (id: string) => void;
  error: string | null;
}

export function ActiveSessionCard({
  session,
  onEnd,
  error,
}: ActiveSessionCardProps) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const pricePerHour = session.zone?.pricePerHour ?? 0;
  const { elapsed, cost, isFree, freeMinLeft } = getElapsedAndCost(
    session.startTime,
    pricePerHour,
  );

  return (
    <div className="relative rounded-2xl bg-emerald-600 p-5 overflow-hidden">
      <div className="pointer-events-none absolute -top-8 -right-8 w-36 h-36 rounded-full bg-emerald-500 opacity-40" />
      <div className="pointer-events-none absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-emerald-700 opacity-30" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-medium text-emerald-100 uppercase tracking-widest block">
              Active Session
            </span>
            <span className="text-white font-bold text-lg">
              {session.zone?.name ?? "—"}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Live
          </span>
        </div>

        {/* Plate */}
        <div className="mb-4 inline-flex items-center gap-2 bg-white/10 rounded-xl px-3 py-1.5">
          <svg
            className="w-3.5 h-3.5 fill-none stroke-emerald-200"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <rect x="2" y="7" width="20" height="10" rx="2" />
            <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
          </svg>
          <span className="text-white font-semibold text-sm tracking-widest">
            {session.plateNumber?.plate ?? "—"}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
            <p className="text-emerald-200 text-[10px] uppercase tracking-wide mb-1">
              Started
            </p>
            <p className="text-white font-semibold text-sm">
              {formatTime(session.startTime)}
            </p>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
            <p className="text-emerald-200 text-[10px] uppercase tracking-wide mb-1">
              Elapsed
            </p>
            <p className="text-white font-semibold text-sm">{elapsed}</p>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
            <p className="text-emerald-200 text-[10px] uppercase tracking-wide mb-1">
              Cost
            </p>
            <p className="text-white font-semibold text-sm">
              {isFree ? "Free" : `₼${cost}`}
            </p>
          </div>
        </div>

        {/* Hint */}
        {isFree ? (
          <p className="text-emerald-200 text-xs text-center mt-2">
            Free period · ₼{pricePerHour}/hr starts in {freeMinLeft}m
          </p>
        ) : (
          <p className="text-emerald-200 text-xs text-center mt-2">
            ₼{pricePerHour} / hr · billed per started hour
          </p>
        )}

        <div className="flex flex-col justify-center items-center mt-5">
          {error && (
            <span className="text-sm font-semibold text-red-300 mb-2">
              {error}
            </span>
          )}
        </div>

        <button
          onClick={() => onEnd(session.id)}
          className="mt-2 w-full py-2.5 rounded-xl bg-white text-emerald-700 text-sm font-semibold transition-all hover:bg-emerald-50 active:scale-[0.98]"
        >
          End Session
        </button>
      </div>
    </div>
  );
}
