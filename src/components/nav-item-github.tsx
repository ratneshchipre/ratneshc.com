import { SOURCE_CODE_GITHUB_REPO } from "@/config/site";
import GitHubStars from "@/components/github-stars";
import { getGitHubStargazerCount } from "@/features/portfolio/data/github-stargazers";

export default async function NavItemGitHub() {
  const stargazersCount = await getGitHubStargazerCount(
    SOURCE_CODE_GITHUB_REPO
  );

  return (
    <GitHubStars
      repo={SOURCE_CODE_GITHUB_REPO}
      stargazersCount={stargazersCount}
    />
  );
}
