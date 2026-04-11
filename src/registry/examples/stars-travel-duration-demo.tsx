import { StarsTravel } from "@/registry/components/stars-travel";

export default function StarsTravelDurationDemo() {
  return (
    <div className="relative flex min-h-72 w-full flex-col items-center justify-center overflow-hidden">
      <StarsTravel
        className="pointer-events-none absolute inset-0"
        svgOptions={{ duration: 1 }}
      />
      <h1 className="relative z-10 max-w-70 text-center text-3xl max-sm:text-2xl">
        Space travel looks better in code
      </h1>
    </div>
  );
}
