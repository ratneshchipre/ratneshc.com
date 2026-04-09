"use client";

import { AppProgressProvider } from "@bprogress/next";

import ThemeProvider from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppProgressProvider
        color="var(--foreground)"
        height="2px"
        delay={500}
        options={{ showSpinner: false }}
      >
        <Toaster position="top-center" />
        <TooltipProvider>{children}</TooltipProvider>
        <KeyboardShortcuts />
      </AppProgressProvider>
    </ThemeProvider>
  );
}
