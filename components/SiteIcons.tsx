import type { SVGProps } from "react";

export type IconName =
  | "heart"
  | "star"
  | "arrow-down"
  | "arrow-up"
  | "arrow-right"
  | "infinity"
  | "play"
  | "pause"
  | "skip-back"
  | "skip-forward"
  | "close"
  | "sun"
  | "linked"
  | "leaf"
  | "home"
  | "smile"
  | "listen"
  | "check"
  | "music"
  | "book";

const paths: Record<IconName, React.ReactNode> = {
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  star: (
    <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
  ),
  "arrow-down": <path d="M12 4v16m-6-6 6 6 6-6" />,
  "arrow-up": <path d="M12 20V4m-6 6 6-6 6 6" />,
  "arrow-right": <path d="M4 12h16m-6-6 6 6-6 6" />,
  infinity: <path d="M12 12C9 6 3 6 3 12s6 6 9 0 9-6 9 0-6 6-9 0Z" />,
  play: <path d="m8 5 11 7-11 7V5Z" />,
  pause: (
    <>
      <path d="M8 5v14M16 5v14" />
    </>
  ),
  "skip-back": <path d="M5 5v14m14-14L8 12l11 7V5Z" />,
  "skip-forward": <path d="M19 5v14M5 5l11 7-11 7V5Z" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
    </>
  ),
  linked: (
    <>
      <path d="m9 15 6-6M7 14l-2 2a3.5 3.5 0 0 0 5 5l4-4a3.5 3.5 0 0 0 0-5M17 10l2-2a3.5 3.5 0 0 0-5-5l-4 4a3.5 3.5 0 0 0 0 5" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 3C9 3 3 8 5 15s15 7 15-12ZM5 20l9-10" />
    </>
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7v10H3V10Z" />
      <path d="M9 20v-7h6v7" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1 3 4 3 4-3 4-3M8 9h.01M16 9h.01" />
    </>
  ),
  listen: (
    <path d="M8 8a5 5 0 0 1 10 0c0 4-4 4-4 7s-1 6-4 6-4-2-4-4M11 9a2 2 0 0 1 4 0c0 2-2 2-2 4" />
  ),
  check: <path d="m5 12 4 4L19 6" />,
  music: (
    <>
      <path d="M9 18V5l11-2v13M9 9l11-2" />
      <ellipse cx="6" cy="18" rx="3" ry="2" />
      <ellipse cx="17" cy="16" rx="3" ry="2" />
    </>
  ),
  book: (
    <>
      <path d="M12 6v15M3 3c5 0 9 3 9 3s4-3 9-3v15c-5 0-9 3-9 3s-4-3-9-3V3Z" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
