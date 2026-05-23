"use client";

import * as React from "react";
import type { Transition, Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

type MotionElement =
  | typeof motion.p
  | typeof motion.span
  | typeof motion.code
  | typeof motion.h1
  | typeof motion.h2
  | typeof motion.h3;

export type BlurShimmerTextProps = {
  /** Element to render as.
   * @defaultValue motion.p */
  as?: MotionElement;
  /** Additional class names. */
  className?: string;
  /** Seconds each text is visible before switching.
   * @defaultValue 2 */
  interval?: number;
  /** Blur radius in pixels at the peak of the shimmer effect.
   * @defaultValue 6 */
  blur?: number;
  /** Motion transition for the blur sweep. */
  transition?: Transition;
  /** Motion variants for each character. Overrides the blur prop. */
  variants?: Variants;
  /** List of phrases to loop through. */
  texts: string[];
};

export function BlurShimmerText({
  as = motion.p,
  className,
  interval = 2,
  blur = 6,
  transition = { duration: 0.5 },
  variants,
  texts,
}: BlurShimmerTextProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const Component = as as typeof motion.p;

  const resolvedVariants: Variants = variants ?? {
    initial: { filter: `blur(${blur}px)`, opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1 },
    exit: { filter: `blur(${blur}px)`, opacity: 0 },
  };

  React.useEffect(() => {
    if (!texts || texts.length === 0) return;

    const timeout = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval * 1000);

    return () => clearInterval(timeout);
  }, [texts, interval]);

  if (!texts || texts.length === 0) return null;

  const duration = (transition.duration as number) || 0.6;

  return (
    <div className={cn("inline-grid", className)}>
      {texts.map((text, index) => (
        <span
          key={index}
          className="invisible col-start-1 row-start-1 block whitespace-nowrap"
          aria-hidden="true"
        >
          {text.split("").map((char, i) => (
            <span key={i} className="inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </span>
      ))}
      <AnimatePresence>
        <Component
          key={currentIndex}
          className="col-start-1 row-start-1 block whitespace-nowrap"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {texts[currentIndex].split("").map((char, i) => {
            const staggerDelay = (i * duration) / texts[currentIndex].length;

            return (
              <motion.span
                key={i}
                variants={resolvedVariants}
                transition={{
                  ...transition,
                  delay: staggerDelay,
                }}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            );
          })}
        </Component>
      </AnimatePresence>
    </div>
  );
}
