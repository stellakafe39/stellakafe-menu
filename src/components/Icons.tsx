// Minimalist custom SVG icons - gold stroke aesthetic.
type Props = { className?: string };

export const StarIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2.5l2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L12 17l-5.9 3.6 1.7-6.7L2.5 9.4l6.9-.5L12 2.5z" />
  </svg>
);

export const ChevronDownIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const ArrowRightIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeftIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

// Category symbols
export const CocktailIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4h16l-8 9-8-9z" />
    <path d="M12 13v7M8 20h8" />
    <circle cx="17" cy="6" r="0.8" fill="currentColor" />
  </svg>
);

export const ShishaIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3v6M9 9h6l-1 4h-4z" />
    <path d="M10 13v3a2 2 0 002 2h0a2 2 0 002-2v-3" />
    <path d="M14 17h4M9 4c0 1 1 1 1 2s-1 1-1 2" />
  </svg>
);

export const CupIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 8h12v6a4 4 0 01-4 4H9a4 4 0 01-4-4V8z" />
    <path d="M17 10h2a2 2 0 010 4h-2" />
    <path d="M9 3c0 1.2-1 1.2-1 2.4M12 3c0 1.2-1 1.2-1 2.4" />
  </svg>
);

export const GlassIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 3h10l-1 18H8L7 3z" />
    <path d="M7.5 9h9" />
  </svg>
);

export const DessertIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12c0-3 3-5 7-5s7 2 7 5" />
    <path d="M4 12h16l-1.5 7h-13L4 12z" />
    <path d="M12 7V4" />
  </svg>
);

export const PlateIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
  </svg>
);

export const OrnamentIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 80 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    className={className}
  >
    <path d="M2 8h22M56 8h22" />
    <path d="M28 8c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" />
    <circle cx="40" cy="8" r="1.2" fill="currentColor" />
  </svg>
);
