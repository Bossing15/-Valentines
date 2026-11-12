"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Trail {
  id: number;
  x: number;
  y: number;
}

export function CursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const media = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let lastTime = 0;
    const move = (event: MouseEvent) => {
      if (!media.matches || performance.now() - lastTime < 90) return;
      lastTime = performance.now();
      setTrails((previous) => [
        ...previous.slice(-7),
        { id: nextId.current++, x: event.clientX, y: event.clientY },
      ]);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="cursor-trail" aria-hidden="true">
      {trails.map((trail) => (
        <motion.span
          key={trail.id}
          style={{ left: trail.x, top: trail.y }}
          initial={{ opacity: 0.45, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.7 }}
        />
      ))}
    </div>
  );
}
