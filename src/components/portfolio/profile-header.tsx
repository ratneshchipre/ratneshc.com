import Image from "next/image";

import { BlurShimmerText } from "@/components/blur-shimmer-text";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col py-8">
      <div className="flex items-center gap-4">
        <Image
          src="/images/avatar.png"
          alt="Ratnesh Chipre"
          width={55}
          height={55}
          quality={90}
          priority
          className="rounded-full object-cover ring-1 ring-accent select-none dark:ring-0"
        />
        <div>
          <h2 className="font-geist-sans text-lg font-medium">
            Ratnesh Chipre
          </h2>
          <BlurShimmerText
            texts={["Design Engineer", "Open Source", "Design sense matters"]}
            blur={4}
            interval={2}
            className="font-geist-pixel-square text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
}
