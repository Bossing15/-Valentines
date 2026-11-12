"use client";

interface ValentineBackgroundProps {
  isSpaceMode?: boolean;
}

export function ValentineBackground({
  isSpaceMode = false,
}: ValentineBackgroundProps) {
  return (
    <div
      className={`valentine-backdrop ${isSpaceMode ? "is-night" : ""}`}
      aria-hidden="true"
    >
      <div className="paper-grain" />
    </div>
  );
}
