"use client";

import * as React from "react";
import { TOCItemType } from "fumadocs-core/toc";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import type { HTMLMotionProps, Variants } from "motion/react";

import { cn } from "@/lib/utils";
import { useTOCObserver } from "@/hooks/use-toc-observer";
import { Progress } from "@/components/ui/progress";

const motionTocVariants: Variants = {
  initial: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 8 : -8,
    filter: "blur(2px)",
  }),
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -8 : 8,
    filter: "blur(2px)",
  }),
};

const motionTocProps: HTMLMotionProps<"span"> = {
  variants: motionTocVariants,
  initial: "initial",
  animate: "animate",
  exit: "exit",
  transition: { duration: 0.2, ease: "easeInOut" },
};

export default function BottomNavToc({
  items,
  className,
}: {
  items: TOCItemType[];
  className?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const contentRef = React.useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = React.useState(0);

  React.useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMeasuredHeight(entry.contentRect.height);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const itemUrls = items.map((item) => item.url);
  const activeId = useTOCObserver(itemUrls);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scaleX, "change", (latest) => {
    setProgress(latest * 100);
  });

  if (!items.length) {
    return null;
  }

  const activeIndex = items.findIndex(
    (item) => item.url.replace("#", "") === activeId
  );

  const activeItem = activeIndex !== -1 ? items[activeIndex] : items[0];
  const minDepth = Math.min(...items.map((i) => i.depth));

  const prevIndexRef = React.useRef(activeIndex);
  const directionRef = React.useRef(1);

  if (activeIndex !== prevIndexRef.current) {
    directionRef.current = activeIndex > prevIndexRef.current ? 1 : -1;
    prevIndexRef.current = activeIndex;
  }

  const direction = directionRef.current;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/10 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.div
        className={cn(
          "fixed bottom-[calc(var(--spacing)*4+env(safe-area-inset-bottom,0))] left-1/2 z-60 w-[90vw] -translate-x-1/2 overscroll-contain bg-background text-sm ring transition-[box-shadow,--tw-ring-color] duration-300",
          className,
          isOpen
            ? "shadow-lg ring-foreground/15"
            : "shadow-sm ring-foreground/10"
        )}
        initial={false}
        animate={{
          maxWidth: isOpen ? 384 : 288,
          borderRadius: isOpen ? 16 : 9999,
        }}
        transition={{
          maxWidth: {
            duration: 0.3,
            ease: [0.32, 0.72, 0, 1],
          },
          borderRadius: {
            duration: isOpen ? 0 : 0.35,
            ease: [0.32, 0.72, 0, 1],
            delay: isOpen ? 0 : 0.15,
          },
        }}
      >
        <motion.div
          initial={false}
          animate={{ height: isOpen ? measuredHeight : 0 }}
          transition={{
            height: {
              duration: 0.3,
              ease: [0.32, 0.72, 0, 1],
            },
          }}
          className="overflow-hidden"
        >
          <div ref={contentRef} className="px-2">
            <p className="px-3 py-2 pb-1! text-[10px] font-semibold tracking-wider text-muted-foreground">
              TABLE OF CONTENTS
            </p>
            <div
              className={cn(
                "no-scrollbar flex max-h-[35vh] flex-col gap-0.5 overflow-y-auto overscroll-contain pb-5.5",
                measuredHeight >
                  (typeof window !== "undefined"
                    ? window.innerHeight * 0.35
                    : 0)
                  ? "supports-timeline-scroll:scroll-fade-effect-y"
                  : ""
              )}
            >
              {items.map((item) => {
                const isActive = activeId === item.url.replace("#", "");
                const depthOffset = Math.max(0, item.depth - minDepth);

                return (
                  <a
                    key={item.url}
                    href={item.url}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-lg px-3 py-1.5 text-sm text-muted-foreground! no-underline! transition-colors",
                      isActive
                        ? "bg-secondary text-foreground!"
                        : "hover:bg-muted/50 hover:text-foreground!"
                    )}
                    style={{
                      paddingLeft: `${0.75 + depthOffset * 0.75}rem`,
                    }}
                  >
                    <span className="line-clamp-2">{item.title}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/90" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex h-12 w-full cursor-pointer items-center justify-between gap-3 bg-transparent px-5",
            isOpen ? "rounded-b-xl border-t" : "rounded-full"
          )}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/90" />
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <motion.span
                key={activeItem?.url}
                {...motionTocProps}
                custom={direction}
                className="truncate font-medium text-foreground"
              >
                {activeItem?.title}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex items-center">
            <Progress
              value={progress}
              className="relative flex h-5 w-5 items-center justify-center **:data-[slot=progress-track]:hidden"
            >
              <svg
                className="block h-full w-full -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="fill-none stroke-border"
                  strokeWidth={15}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="fill-none stroke-foreground/85"
                  strokeWidth={15}
                  style={{
                    strokeDasharray: "251.2",
                    strokeDashoffset: 251.2 - (251.2 * progress) / 100,
                  }}
                />
              </svg>
            </Progress>
          </div>
        </button>
      </motion.div>
    </>
  );
}
