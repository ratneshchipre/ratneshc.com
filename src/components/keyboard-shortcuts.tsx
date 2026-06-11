"use client";

import { useRouter } from "@bprogress/next/app";
import { useHotkeys } from "react-hotkeys-hook";

export function KeyboardShortcuts() {
  const router = useRouter();

  useHotkeys("g>h", () => router.push("/"));
  useHotkeys("g>c", () => router.push("/components"));
  useHotkeys("g>b", () => router.push("/blog"));
  useHotkeys("g>l", () => router.push("/collection"));

  return null;
}
