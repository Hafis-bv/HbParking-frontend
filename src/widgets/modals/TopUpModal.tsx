"use client";

import { firebaseAuth } from "@/lib/firebase";
import API from "@/utils/api";
import { useState } from "react";

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TopUpModal({ isOpen, onClose }: TopUpModalProps) {
  const [amount, setAmount] = useState<string>("");

  async function handlePay(amount: number) {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) return;

    try {
      const res = await API.createCheckoutSession(amount);
      window.location.href = res.url;
    } catch (err) {
      return console.log(err);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-900 flex items-center justify-center bg-black/45 px-4">
      <div className="relative w-full max-w-sm rounded-2xl border border-emerald-100 bg-white p-7">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#059669"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-4 0v2" />
              <line x1="12" y1="12" x2="12" y2="16" />
              <line x1="10" y1="14" x2="14" y2="14" />
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-medium text-gray-900">
              Top up balance
            </p>
            <p className="text-xs text-gray-400">
              Enter the amount you'd like to load
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-emerald-600">
            $
          </span>
          <input
            type="number"
            min="1"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-emerald-200 bg-white py-3 pl-9 pr-4 text-xl font-medium text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        {/* Pay button */}
        <button
          onClick={() => handlePay(Number(amount))}
          disabled={!amount}
          className={`w-full rounded-xl py-3 text-[15px] font-medium text-white transition-all ${
            amount
              ? "bg-emerald-600 cursor-pointer hover:bg-emerald-700 active:scale-[0.98]"
              : "cursor-not-allowed bg-emerald-300"
          }`}
        >
          Top up
        </button>
      </div>
    </div>
  );
}
