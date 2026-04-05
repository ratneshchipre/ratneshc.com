import Connect from "@/components/portfolio/connect";
import CTA from "@/components/portfolio/cta";
import Experience from "@/components/portfolio/experience";
import GitHubContributions from "@/components/portfolio/github-contributions";
import Overview from "@/components/portfolio/overview";
import ProfileHeader from "@/components/portfolio/profile-header";
import Projects from "@/components/portfolio/projects";
import TechStack from "@/components/portfolio/tech-stack";

export default function Page() {
  return (
    <div>
      <ProfileHeader />
      <Overview />
      <Projects />
      <Experience />
      <TechStack />
      <GitHubContributions />
      <Connect />
      <CTA />
    </div>
  );
}
