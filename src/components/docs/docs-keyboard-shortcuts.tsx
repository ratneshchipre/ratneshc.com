"use client";

import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

export default function DocsKeyboardShortcuts({
  previous,
  next,
}: {
  previous: string | null;
  next: string | null;
}) {
  const router = useRouter();

  const navigate = (href: string | null) => href && router.push(href);

  useHotkeys("ArrowRight", () => navigate(next));
  useHotkeys("ArrowLeft", () => navigate(previous));

  return null;
}
