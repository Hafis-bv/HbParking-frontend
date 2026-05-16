export const CustomLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-8">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-extrabold text-2xl tracking-tight select-none">
          P
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-gray-900">
          Hb<span className="text-emerald-600">Parking</span>
        </span>
      </div>

      {/* Slot indicators */}
      <div className="flex gap-3">
        {["A1", "A2", "A3"].map((label, i) => (
          <div
            key={label}
            className="w-16 h-12 border border-emerald-200 rounded-lg bg-emerald-50 flex flex-col items-center justify-center gap-1"
          >
            <span className="text-[9px] font-medium text-emerald-600 tracking-wide">
              {label}
            </span>
            <span
              className="w-4 h-4 rounded-full"
              style={{
                background: i === 0 ? "#059669" : "transparent",
                border: i !== 0 ? "2px solid #6ee7b7" : "none",
                animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Car + Road */}
      <div className="relative w-64 h-36">
        {/* Car */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: 22,
            animation: "carBounce 0.6s ease-in-out infinite alternate",
          }}
        >
          <svg width="72" height="32" viewBox="0 0 72 32" fill="none">
            <rect x="6" y="12" width="60" height="16" rx="6" fill="#059669" />
            <rect x="14" y="5" width="36" height="14" rx="5" fill="#10b981" />
            <rect
              x="17"
              y="7"
              width="14"
              height="9"
              rx="3"
              fill="#d1fae5"
              opacity="0.85"
            />
            <rect
              x="35"
              y="7"
              width="12"
              height="9"
              rx="3"
              fill="#d1fae5"
              opacity="0.85"
            />
            <circle cx="18" cy="28" r="5" fill="#065f46" />
            <circle cx="18" cy="28" r="2.5" fill="#6ee7b7" />
            <circle cx="54" cy="28" r="5" fill="#065f46" />
            <circle cx="54" cy="28" r="2.5" fill="#6ee7b7" />
            <rect x="2" y="17" width="7" height="4" rx="2" fill="#fde68a" />
            <rect
              x="63"
              y="17"
              width="7"
              height="4"
              rx="2"
              fill="#f87171"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Road */}
        <div className="absolute bottom-0 left-0 right-0 h-7 bg-emerald-100 rounded-lg border border-emerald-200 overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute top-1/2 -translate-y-1/2 h-0.5 w-10 bg-emerald-600 rounded"
              style={{
                left: i === 0 ? -40 : i === 1 ? 50 : i === 2 ? 140 : 230,
                animation: `roadScroll 1.2s linear ${[-0, -0.4, -0.8, -0.3][i]}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-gray-400 font-mono tracking-wide flex items-center gap-1">
          scanning available spots
          <span className="flex gap-0.5 ml-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"
                style={{
                  animation: `dotBounce 1s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </span>
        </p>

        {/* Progress bar */}
        <div className="w-56 h-1 bg-emerald-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full"
            style={{ animation: "barSweep 1.6s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes carBounce {
          from { bottom: 22px; }
          to   { bottom: 26px; }
        }
        @keyframes roadScroll {
          0%   { transform: translateY(-50%) translateX(0); }
          100% { transform: translateY(-50%) translateX(300px); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%           { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes barSweep {
          0%   { width: 10%; margin-left: 0%; }
          50%  { width: 55%; margin-left: 20%; }
          100% { width: 10%; margin-left: 85%; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%       { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
