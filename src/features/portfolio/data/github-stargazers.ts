import { unstable_cache } from "next/cache";

type GitHubRepoResponse = {
  stargazers_count?: number;
};

export async function getGitHubStargazerCountByRepo(repos: string[]) {
  const uniqueRepos = [...new Set(repos)];

  const entries = await Promise.all(
    uniqueRepos.map(async (repo) => {
      const count = await getGitHubStargazerCount(repo);
      return [repo, count] as const;
    })
  );

  return Object.fromEntries(entries) as Record<string, number>;
}

export function getGitHubStargazerCount(repo: string) {
  return unstable_cache(
    async function fetchGitHubStargazerCount() {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        if (!response.ok) {
          return 0;
        }

        const json = (await response.json()) as GitHubRepoResponse;
        return Number(json?.stargazers_count) || 0;
      } catch {
        return 0;
      }
    },
    ["github-stargazer-count", repo],
    { revalidate: 86400 }
  )();
}
