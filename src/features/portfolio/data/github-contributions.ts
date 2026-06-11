import { unstable_cache } from "next/cache";

import { GITHUB_USERNAME } from "@/config/site";
import type { Activity } from "@/components/kibo-ui/contribution-graph";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export function getGitHubContributions() {
  const apiUrl = process.env.GITHUB_CONTRIBUTIONS_API_URL;

  if (!apiUrl) {
    console.error("GITHUB_CONTRIBUTIONS_API_URL is not set");
    return Promise.resolve([] as Activity[]);
  }

  return unstable_cache(
    async () => {
      const res = await fetch(`${apiUrl}/v4/${GITHUB_USERNAME}?y=2026`, {
        next: { revalidate: 86400 },
      });

      if (!res.ok) {
        console.error(`API error: ${res.status} ${res.statusText}`);
        return [] as Activity[];
      }

      const data = (await res.json()) as GitHubContributionsResponse;
      return data.contributions ?? ([] as Activity[]);
    },
    ["github-contributions", apiUrl, GITHUB_USERNAME, "2026"],
    { revalidate: 86400 }
  )();
}
