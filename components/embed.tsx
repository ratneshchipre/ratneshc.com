import { ImageZoom } from "./kibo-ui/image-zoom";

export function FramedImage({
  canZoom = true,
  ...props
}: React.ComponentProps<"img"> & {
  canZoom?: boolean;
}) {
  // eslint-disable-next-line jsx-a11y/alt-text
  const image = <img {...props} />;

  return (
    <figure className="relative [&_img]:rounded-xl">
      {canZoom ? <ImageZoom>{image}</ImageZoom> : image}

      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
    </figure>
  );
}
