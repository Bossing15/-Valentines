"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/SiteIcons";

interface Heart {
  id: number;
  x: number;
  y: number;
}

export function ClickHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const handleClick = (event: MouseEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const heart = {
        id: nextId.current++,
        x: event.clientX,
        y: event.clientY,
      };
      setHearts((previous) => [...previous.slice(-7), heart]);
      const timer = setTimeout(() => {
        setHearts((previous) =>
          previous.filter((item) => item.id !== heart.id),
        );
        timers.delete(timer);
      }, 1000);
      timers.add(timer);
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
      for (const timer of timers) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="click-hearts" aria-hidden="true">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            style={{ left: heart.x - 10, top: heart.y - 10 }}
            initial={{ opacity: 0.8, scale: 0.6, y: 0 }}
            animate={{ opacity: 0, scale: 1.1, y: -50 }}
            transition={{ duration: 1 }}
          >
            <Icon name="heart" size={22} />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
