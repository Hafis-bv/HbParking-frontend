import Link from "next/link";

export default function CheckoutError() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-sm w-full">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment failed
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Something went wrong. Please try again.
        </p>

        {/* Actions */}
        <Link
          href="/"
          className="w-full py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:scale-[0.98] transition-all text-center mb-3"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
