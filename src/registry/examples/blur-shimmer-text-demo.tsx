import { BlurShimmerText } from "@/registry/components/blur-shimmer-text";

export default function BlurShimmerTextDemo() {
  return (
    <BlurShimmerText
      texts={["Full-Stack Developer", "Design Engineer", "Open to Work"]}
      className="text-center text-2xl font-medium"
    />
  );
}
