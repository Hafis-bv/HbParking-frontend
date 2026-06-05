"use client";

import { useEffect, useState } from "react";
import API from "@/utils/api";
import { Sessions } from "@/types/sessions";
import { ActiveSessionCard } from "@/components/ActiveSessionCard";
import { formatTime } from "@/utils/formatTime";

export function TimeTab() {
  const [sessions, setSessions] = useState<Sessions[]>([]);
  const [historySessions, setHistorySessions] = useState<Sessions[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  async function fetchSessions() {
    try {
      const [active, hist] = await Promise.all([
        API.getSessions(),
        API.getSessionHistory(),
      ]);
      setSessions(active ?? []);
      setHistorySessions(hist ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSessions();
  }, []);

  async function handleEnd(id: string) {
    if (!id) {
      setErrors((prev) => ({ ...prev, [id]: "Session ID not found" }));
      return;
    }
    setErrors((prev) => ({ ...prev, [id]: null }));
    try {
      const ended = sessions.find((s) => s.id === id);
      const res = await API.endSession(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
      if (ended) {
        setHistorySessions((prev) => [
          {
            ...ended,
            endTime: res?.data?.endTime ?? new Date(),
            totalCost: res?.totalCost ?? 0,
          },
          ...prev,
        ]);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to end session";
      setErrors((prev) => ({ ...prev, [id]: message }));
    }
  }

  const activeSessions = sessions.filter((s) => s.endTime === null);

  return (
    <div className="flex flex-col gap-5 pb-4">
      {loading ? (
        <div className="rounded-2xl bg-emerald-600 p-5 animate-pulse h-40" />
      ) : activeSessions.length === 0 ? (
        <div className="relative rounded-2xl bg-emerald-600 p-5 overflow-hidden">
          <div className="pointer-events-none absolute -top-8 -right-8 w-36 h-36 rounded-full bg-emerald-500 opacity-40" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-emerald-700 opacity-30" />
          <div className="relative z-10 text-center py-4">
            <span className="text-2xl font-bold text-emerald-100 uppercase tracking-widest block mb-3">
              No Active Session
            </span>
          </div>
        </div>
      ) : (
        activeSessions.map((session) => (
          <ActiveSessionCard
            key={session.id}
            session={session}
            onEnd={handleEnd}
            error={errors[session.id] ?? null}
          />
        ))
      )}

      {/* History */}
      {historySessions.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 px-1">
            Recent sessions
          </h2>
          <div className="flex flex-col gap-2.5">
            {historySessions.map((item) => (
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
                      {item.zone?.name ?? "—"} ·{" "}
                      {item.plateNumber?.plate ?? "—"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.startTime).toLocaleDateString("en-GB")} ·{" "}
                      {formatTime(item.startTime)}
                      {" — "}
                      {item.endTime ? formatTime(item.endTime) : "—"}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-emerald-600">
                  {item.totalCost ? `₼${item.totalCost}` : "Free"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
