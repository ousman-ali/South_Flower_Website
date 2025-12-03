//facebook icon
export default function FacebookIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.5l.5-4H14V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

//instagram icon
export default function InstagramIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

//tiktok icon
export default function TikTokIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="currentColor"
      className={className}
    >
      <path d="M226.2 77.9a83.2 83.2 0 0 1-48-15.3v83.5a75.9 75.9 0 1 1-75.9-75.9h7.9v40.3h-7.9a35.6 35.6 0 1 0 35.6 35.6V0h40.3a42.9 42.9 0 0 0 2.8 15 43 43 0 0 0 19 22 43 43 0 0 0 26.2 6v39.9a82.6 82.6 0 0 1-0 0z" />
    </svg>
  );
}

//linkedln icon
export default function LinkedInIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5 2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3z" />
      <path d="M9 9h3.8v1.71h.05A4.15 4.15 0 0 1 17 8.83c3.07 0 5 2 5 5.7V21h-4v-5.6c0-1.34-.47-2.26-1.65-2.26A1.79 1.79 0 0 0 14 15.11V21h-4z" />
    </svg>
  );
}

//telegram icon
export default function SendIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
