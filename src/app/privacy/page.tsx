export default function PrivacyAndSecurity() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900">
          Privacy & Security
        </h1>
      </div>

      <div className="px-5 py-6 flex flex-col gap-5 max-w-lg mx-auto">
        {/* Brand block */}
        <div className="rounded-2xl bg-emerald-600 px-5 py-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-extrabold text-2xl shrink-0">
            P
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight">
              HbParking
            </p>
            <p className="text-emerald-100 text-xs mt-0.5">
              Your smart parking companion
            </p>
          </div>
        </div>

        {/* About */}
        <Section title="About HbParking">
          <p className="text-sm text-gray-500 leading-relaxed">
            HbParking is a smart parking management app that helps you find,
            book, and pay for parking spots in real time. We are committed to
            protecting your personal data and ensuring a safe experience every
            time you use our platform.
          </p>
        </Section>

        {/* Data we collect */}
        <Section title="Data We Collect">
          {[
            {
              icon: "👤",
              title: "Account information",
              desc: "Your email address and profile details used to identify you in the app.",
            },
            {
              icon: "🚗",
              title: "Vehicle plates",
              desc: "License plate numbers you register to enable parking sessions.",
            },
            {
              icon: "💳",
              title: "Payment data",
              desc: "Wallet top-up history and transaction records. Card details are never stored on our servers.",
            },
            {
              icon: "📍",
              title: "Location",
              desc: "Used only when you search for nearby parking zones. Never tracked in the background.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-3 py-3 border-b border-gray-50 last:border-0"
            >
              <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </Section>

        {/* How we use it */}
        <Section title="How We Use Your Data">
          {[
            "To provide and improve parking services",
            "To process payments and maintain your wallet balance",
            "To send important notifications about your parking sessions",
            "To ensure the security and integrity of your account",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 py-2">
              <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">{item}</p>
            </div>
          ))}
        </Section>

        {/* Security */}
        <Section title="Security Measures">
          {[
            {
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              ),
              title: "End-to-end encryption",
              desc: "All data transmitted between your device and our servers is encrypted.",
            },
            {
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
              title: "Secure payments",
              desc: "Payment processing meets PCI DSS standards. We never store card details.",
            },
            {
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              ),
              title: "Session protection",
              desc: "Your account sessions are monitored and automatically expire for safety.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-3 py-3 border-b border-gray-50 last:border-0"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </Section>

        {/* Your rights */}
        <Section title="Your Rights">
          <p className="text-sm text-gray-500 leading-relaxed">
            You have the right to access, correct, or delete your personal data
            at any time. You can manage your plate numbers and account
            information directly in the app. To request full data deletion,
            contact our support team.
          </p>
        </Section>

        {/* Contact */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-900">
              Have questions?
            </p>
            <p className="text-xs text-emerald-600 mt-0.5">
              Contact our support team
            </p>
          </div>
          <a
            href="https://wa.me/994552821812"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 active:scale-[0.97] transition-all"
          >
            Contact us
          </a>
        </div>

        <p className="text-center text-[11px] text-gray-300 pb-2">
          HbParking · Privacy Policy · v1.0
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-5 py-4">
      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}
