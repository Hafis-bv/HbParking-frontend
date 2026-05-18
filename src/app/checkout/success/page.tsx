import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-sm w-full">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment successful
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Your balance has been topped up.
        </p>

        {/* Back button */}
        <Link
          href="/"
          className="w-full py-3 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 active:scale-[0.98] transition-all text-center"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
