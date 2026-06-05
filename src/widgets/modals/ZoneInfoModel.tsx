"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { X, MapPin, CircleParking, CreditCard, Car } from "lucide-react";
import { Zones } from "@/types/zones";
import { PlateNumbers } from "@/types/plateNumbers";
import { useAppSelector } from "@/hooks/redux";
import API from "@/utils/api";
import { Tab } from "@/types/tab";

interface ZoneInfoModalProps {
  zone: Zones | null;
  isOpen: boolean;
  onClose: () => void;
  setTab: Dispatch<SetStateAction<Tab>>;
}

interface ZoneErrorState {
  general: string | null;
}

export default function ZoneInfoModal({
  zone,
  isOpen,
  onClose,
  setTab,
}: ZoneInfoModalProps) {
  const { user } = useAppSelector((state) => state.auth);
  const plates: PlateNumbers[] = user?.plateNumbers ?? [];
  const latestPlateId =
    plates.length > 0
      ? [...plates].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0].id
      : "";

  const [selectedPlateId, setSelectedPlateId] = useState(latestPlateId);
  const [error, setError] = useState<ZoneErrorState>({
    general: null,
  });

  if (!isOpen || !zone) return null;

  const occupied = zone.sessions?.length ?? 0;
  const availableSpots = zone.maxCapacity - occupied;
  const isFull = availableSpots <= 0;

  async function handleStart() {
    setError({ general: null });

    if (!zone?.id) {
      setError({ general: "Zone not found" });
      return;
    }
    if (!selectedPlateId) {
      setError({ general: "Please select a plate number" });
      return;
    }

    try {
      const res = await API.startSession(zone?.id, selectedPlateId);
      localStorage.setItem("tab", "time");
      setTab("time");

      setError({ general: null });
    } catch (err: any) {
      console.log(err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to start parking";
      setError({ general: message });
    }
  }

  return (
    <div
      className="fixed inset-0 z-[900] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => {
        onClose();
        setError({ general: null });
      }}
    >
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 px-6 pt-6 pb-8">
          <button
            onClick={() => {
              onClose();
              setError({ general: null });
            }}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-1.5 text-white transition hover:bg-white/30"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold text-white">{zone.name}</h2>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-white/90">
            <MapPin size={15} />
            <span>{zone.address}</span>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Availability */}
          <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isFull ? "bg-red-100" : "bg-emerald-100"
                }`}
              >
                <CircleParking
                  size={20}
                  className={isFull ? "text-red-600" : "text-emerald-600"}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500">Свободные места</p>
                <p
                  className={`text-lg font-bold ${
                    isFull ? "text-red-600" : "text-emerald-600"
                  }`}
                >
                  {availableSpots} / {zone.maxCapacity}
                </p>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="rounded-2xl bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-gray-500">
              <CreditCard size={16} />
              <span className="text-sm">Тариф</span>
            </div>
            <p className="mt-1 text-lg font-bold text-gray-900">
              {zone.pricePerHour} AZN
              <span className="text-sm font-normal text-gray-500">/час</span>
            </p>
          </div>

          {/* Выбор машины */}
          <div className="rounded-2xl bg-gray-50 p-4">
            <label
              htmlFor="plate-select"
              className="flex items-center gap-2 text-gray-500"
            >
              <Car size={16} />
              <span className="text-sm">Номер машины</span>
            </label>
            <select
              id="plate-select"
              value={selectedPlateId}
              onChange={(e) => setSelectedPlateId(e.target.value)}
              disabled={plates.length === 0}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-base font-semibold text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              {plates.length === 0 ? (
                <option value="">Нет добавленных машин</option>
              ) : (
                plates.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.plate}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Footer — кнопка */}

        <div className="px-6 pb-6 pt-1 flex flex-col justify-center items-center">
          {error.general && (
            <span className="text-[15px] text-red-500 mb-3 block">
              {error.general}
            </span>
          )}
          <button
            onClick={handleStart}
            disabled={isFull || plates.length === 0}
            className="w-full rounded-2xl bg-emerald-500 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
          >
            {isFull ? "Нет свободных мест" : "Начать сессию"}
          </button>
        </div>
      </div>
    </div>
  );
}
