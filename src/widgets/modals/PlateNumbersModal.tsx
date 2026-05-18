"use client";

import { useAppSelector } from "@/hooks/redux";
import API from "@/utils/api";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PlateNumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlateNumbersModal({ isOpen, onClose }: PlateNumbersModalProps) {
  //   const [plates] = useState<Plate[]>(MOCK_PLATES);
  const [plate, setPlate] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  async function createPlateNumber() {
    try {
      const res = await API.createPlateNumber(plate);
    } catch (err) {
      console.log(err);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-900 flex items-end justify-center bg-black/40 px-0 sm:items-center sm:px-4">
      <div className="relative w-full max-w-sm rounded-t-3xl sm:rounded-2xl bg-white pt-5 pb-8 px-5">
        {/* Drag handle (mobile) */}
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-5 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="10" rx="2" />
                <path d="M6 7V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2" />
                <circle cx="8.5" cy="12" r="1" fill="#059669" />
                <circle cx="15.5" cy="12" r="1" fill="#059669" />
                <path d="M6 12h1M17 12h1" />
              </svg>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-gray-900 leading-tight">
                My plates
              </p>
              <p className="text-[11px] text-gray-400">
                {user?.plateNumbers.length} registered
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Plates list */}
        <div className="flex flex-col gap-2 mb-4">
          {user?.plateNumbers.map((plate) => (
            <div
              key={plate.id}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all`}
            >
              <div className="flex items-center gap-3">
                {/* Plate visual */}
                <div className="px-3 py-1 rounded-lg border-2 border-gray-300 bg-white min-w-[96px] text-center">
                  <span className="text-[13px] font-bold tracking-widest text-gray-800 font-mono">
                    {plate.plate}
                  </span>
                </div>
                {plate.createdAt && (
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {formatDate(plate.createdAt)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <button className="w-7 h-7 flex cursor-pointer items-center justify-center rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Add plate */}
        {isAdding ? (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="00-AA-000"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                maxLength={10}
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 bg-white text-sm font-mono font-semibold tracking-widest text-gray-800 placeholder:text-gray-300 placeholder:font-normal placeholder:tracking-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>
            <button
              onClick={createPlateNumber}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 active:scale-[0.97] transition-all disabled:opacity-40 disabled:pointer-events-none"
              disabled={plate.length < 3}
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setPlate("");
              }}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-2.5 rounded-xl cursor-pointer border border-dashed border-emerald-300 text-emerald-600 text-sm font-medium hover:bg-emerald-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add plate number
          </button>
        )}
      </div>
    </div>
  );
}
