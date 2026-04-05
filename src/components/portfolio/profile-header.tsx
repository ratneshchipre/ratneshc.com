import Image from "next/image";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col py-8">
      <div className="flex items-center gap-3">
        <div className="select-none">
          <Image
            src="/images/avatar.png"
            alt="Avatar"
            width={45}
            height={45}
            quality={90}
            priority
            className="rounded-full object-cover"
          />
        </div>
        <div className="leading-tight">
          <h2 className="font-geist-sans text-lg font-medium">
            Ratnesh Chipre
          </h2>
          <p className="font-geist-pixel-square text-muted-foreground">
            Full-Stack Web Developer
          </p>
        </div>
      </div>
    </div>
  );
}
