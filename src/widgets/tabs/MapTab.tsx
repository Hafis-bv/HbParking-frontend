"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import API from "@/utils/api";
import { Zones } from "@/types/zones";
import MapView from "@/components/MapView";
import ZoneInfoModal from "@/widgets/modals/ZoneInfoModel";
import { Tab } from "@/types/tab";

interface MapTabProps {
  setTab: Dispatch<SetStateAction<Tab>>;
}

export function MapTab({ setTab }: MapTabProps) {
  const [selectedZone, setSelectedZone] = useState<Zones | null>(null);
  const [zones, setZones] = useState<Zones[]>([]);
  const [search, setSearch] = useState<string>("");
  const allZones = useRef<Zones[]>([]);
  const [open, setOpen] = useState<boolean>(true);

  async function fetchZones() {
    const res = await API.getZones();
    setZones(res);
    allZones.current = res;
  }

  useEffect(() => {
    fetchZones();
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!search) {
      return setZones(allZones.current);
    }

    const filtered = allZones.current.filter((zone) =>
      zone.name.toLowerCase().includes(search.toLowerCase()),
    );
    setZones(filtered);
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* Map placeholder */}
      <MapView />

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

      {/* Search nearby */}
      <form onSubmit={handleSearch} className="relative">
        <button>
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
        </button>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search parking zone or address…"
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/10 transition-all"
        />
      </form>
      <div className="flex flex-col gap-3">
        {zones.map((zone) => (
          <button
            onClick={() => {
              setOpen(true);
              setSelectedZone(zone);
            }}
            key={zone.id}
            className="bg-white border border-gray-100 rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
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
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-gray-900">
                  {zone.name}
                </p>
                <p className="text-[11px] text-gray-400">{zone.address}</p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-1">
              <span className="text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {zone.pricePerHour} ₼/h
              </span>
              <span className="text-[10px] text-gray-400">
                {zone.maxCapacity} spots
              </span>
            </div>
          </button>
        ))}
      </div>
      <ZoneInfoModal
        setTab={setTab}
        zone={selectedZone}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
