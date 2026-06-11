import { Metadata } from "next";

import { generateWebsiteMetadata } from "@/config/metadata";
import NotFound from "@/components/not-found";

export const metadata: Metadata = generateWebsiteMetadata({
  title: "404 \u2013 Page Not Found",
  description: "The page you are looking for does not exist.",
});

export default function NotFoundPage() {
  return <NotFound className="h-[calc(100svh-17.5rem)]" />;
}
