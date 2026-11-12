import type { Variants } from "framer-motion";

export const storyEase = [0.22, 1, 0.36, 1] as const;

/** Shared, short-distance motion; reduced-motion readers get immediate content. */
export function storyMotion(reduced: boolean | null) {
  const item: Variants = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.65, ease: storyEase },
    },
  };
  const group: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.11,
        delayChildren: reduced ? 0 : 0.04,
      },
    },
  };
  return { item, group };
}
