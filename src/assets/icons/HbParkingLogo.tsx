import { SVGProps } from "react";

interface HbParkingLogoProps extends SVGProps<SVGSVGElement> {
  /** Controls the overall size. Height scales proportionally. */
  width?: number;
  /** Show the tagline beneath the wordmark */
  showTagline?: boolean;
}

export default function HbParkingLogo({
  width = 280,
  showTagline = true,
  ...props
}: HbParkingLogoProps) {
  return (
    <svg
      width={width}
      viewBox="0 0 400 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="HbParking logo"
      {...props}
    >
      <title>HbParking</title>

      {/* ── Icon badge ── */}
      <rect width="90" height="90" rx="20" fill="#059669" />

      {/* P — vertical stem */}
      <rect x="24" y="22" width="9" height="46" rx="4" fill="#ffffff" />
      {/* P — top horizontal */}
      <rect x="24" y="22" width="28" height="9" rx="4" fill="#ffffff" />
      {/* P — right stem (top half) */}
      <rect x="44" y="22" width="9" height="28" rx="4" fill="#ffffff" />
      {/* P — middle horizontal */}
      <rect x="24" y="41" width="28" height="9" rx="4" fill="#ffffff" />

      {/* ── Wordmark ── */}
      <text
        x="108"
        y="54"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="52"
        fontWeight="700"
        fill="#059669"
        letterSpacing="-2"
      >
        Hb
      </text>

      <text
        x="110"
        y="80"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="24"
        fontWeight="400"
        fill="#047857"
        letterSpacing="5"
      >
        PARKING
      </text>

      {/* ── Tagline ── */}
      {showTagline && (
        <text
          x="110"
          y="100"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="11"
          fontWeight="400"
          fill="#6b7280"
          letterSpacing="1"
        >
          Smart. Simple. Secure.
        </text>
      )}
    </svg>
  );
}
