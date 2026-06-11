"use client";

import type { ComponentProps } from "react";
import {
  CancelCircleIcon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import type { HTMLMotionProps, Variants } from "motion/react";

import type { CopyState } from "@/hooks/use-copy-to-clipboard";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/components/ui/button";

export const motionIconVariants: Variants = {
  initial: (direction: number) => ({
    opacity: 0,
    scale: 0.8,
    y: direction > 0 ? 10 : -10,
    filter: "blur(2px)",
  }),
  animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 0.8,
    y: direction > 0 ? -10 : 10,
    filter: "blur(2px)",
  }),
};

export const motionIconProps: HTMLMotionProps<"span"> = {
  variants: motionIconVariants,
  initial: "initial",
  animate: "animate",
  exit: "exit",
  transition: { duration: 0.15, ease: "easeOut" },
};

export type CopyStateIconProps = {
  /** The current state of the copy operation. */
  state: CopyState;
  /** Custom icon for idle state. */
  idleIcon?: React.ReactNode;
  /** Custom icon for done state. */
  doneIcon?: React.ReactNode;
  /** Custom icon for error state. */
  errorIcon?: React.ReactNode;
};

export function CopyStateIcon({
  state,
  idleIcon,
  doneIcon,
  errorIcon,
}: CopyStateIconProps) {
  const direction = state === "idle" ? -1 : 1;

  return (
    <span className="relative flex items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        {state === "idle" ? (
          <motion.span key="idle" {...motionIconProps} custom={direction}>
            {idleIcon ?? <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />}
          </motion.span>
        ) : state === "done" ? (
          <motion.span key="done" {...motionIconProps} custom={direction}>
            {doneIcon ?? <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />}
          </motion.span>
        ) : state === "error" ? (
          <motion.span key="error" {...motionIconProps} custom={direction}>
            {errorIcon ?? (
              <HugeiconsIcon icon={CancelCircleIcon} strokeWidth={2} />
            )}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}

export type CopyButtonProps = ComponentProps<typeof Button> & {
  /** The text to copy, or a function that returns the text. */
  text: string | (() => string);
  /** Called when the text is successfully copied. */
  onCopySuccess?: (text: string) => void;
  /** Called when the copy operation fails. */
  onCopyError?: (error: Error) => void;
} & Pick<CopyStateIconProps, "idleIcon" | "doneIcon" | "errorIcon">;

export function CopyButton({
  size = "icon",
  children,
  text,
  idleIcon,
  doneIcon,
  errorIcon,
  onClick,
  onCopySuccess,
  onCopyError,
  ...props
}: CopyButtonProps) {
  const { state, copy } = useCopyToClipboard({
    onCopySuccess,
    onCopyError,
  });

  return (
    <Button
      size={size}
      onClick={(e) => {
        copy(text);
        onClick?.(e);
      }}
      aria-label="Copy"
      {...props}
    >
      <CopyStateIcon
        state={state}
        idleIcon={idleIcon}
        doneIcon={doneIcon}
        errorIcon={errorIcon}
      />
      {children}
    </Button>
  );
}
