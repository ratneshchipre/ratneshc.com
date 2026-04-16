"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

type PerspectiveTiltContextType = {
  /** Whether the dialog is currently open. */
  open: boolean;
  /** Function to update the open state. */
  setOpen: (open: boolean) => void;
};

const PerspectiveTiltContext =
  React.createContext<PerspectiveTiltContextType | null>(null);

function usePerspectiveTilt() {
  const context = React.useContext(PerspectiveTiltContext);
  if (!context) {
    throw new Error(
      "PerspectiveTilt components must be wrapped in <PerspectiveTilt />"
    );
  }
  return context;
}

/** Hook to detect and respect the user's reduced motion system preference. */
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

export interface PerspectiveTiltProps {
  /** Controlled open state of the dialog. */
  open?: boolean;
  /** Callback fired when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Children nodes to render within the root. */
  children: React.ReactNode;
}

export function PerspectiveTilt({
  open: controlledOpen,
  onOpenChange,
  children,
}: PerspectiveTiltProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = React.useCallback(
    (value: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [controlledOpen, onOpenChange]
  );

  return (
    <PerspectiveTiltContext.Provider value={{ open, setOpen }}>
      {children}
    </PerspectiveTiltContext.Provider>
  );
}

export interface PerspectiveTiltTriggerProps {
  /** Custom styling for the trigger element. */
  className?: string;
  /** Whether to merge props onto the child component. */
  asChild?: boolean;
  /** The element that triggers the dialog. */
  children: React.ReactNode;
}

export function PerspectiveTiltTrigger({
  className,
  asChild,
  children,
}: PerspectiveTiltTriggerProps) {
  const { setOpen } = usePerspectiveTilt();

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: cn(child.props.className, className),
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        setOpen(true);
      },
    });
  }

  return (
    <button className={className} onClick={() => setOpen(true)}>
      {children}
    </button>
  );
}

export interface PerspectiveTiltOverlayProps {
  /** Custom styling for the background backdrop. */
  className?: string;
  /** Callback fired when the overlay is clicked. */
  onClick?: () => void;
  /** The content to be rendered within the overlay. */
  children: React.ReactNode;
}

export function PerspectiveTiltOverlay({
  className,
  onClick,
  children,
}: PerspectiveTiltOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      className={cn(
        "fixed inset-0 isolate z-50 flex items-center justify-center bg-black/10 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      style={{ perspective: "1200px" }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export interface PerspectiveTiltContentProps {
  /** Custom styling for the modal content card. */
  className?: string;
  /** The content to be rendered within the card. */
  children: React.ReactNode;
}

export function PerspectiveTiltContent({
  className,
  children,
}: PerspectiveTiltContentProps) {
  const { open, setOpen } = usePerspectiveTilt();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {open && (
        <PerspectiveTiltOverlay onClick={() => setOpen(false)}>
          <motion.div
            initial={{
              filter: "blur(8px)",
              scale: 0.96,
              rotateX: 6,
              rotateY: 25,
              opacity: 0.8,
            }}
            animate={{
              filter: "blur(0px)",
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              opacity: 1,
            }}
            exit={{
              filter: "blur(8px)",
              scale: 0.96,
              rotateX: 6,
              rotateY: 25,
              opacity: 0.8,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 0.7,
                    ease: [0.215, 0.61, 0.355, 1],
                  }
            }
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative w-full max-w-[calc(100%-3rem)] rounded-xl bg-background p-6 shadow-lg ring-1 ring-foreground/10 outline-none sm:max-w-sm",
              className
            )}
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left left",
            }}
          >
            {children}
          </motion.div>
        </PerspectiveTiltOverlay>
      )}
    </AnimatePresence>
  );
}
