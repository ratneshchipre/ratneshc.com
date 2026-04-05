import * as React from "react";

export function useTOCObserver(itemUrls: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const ids = itemUrls.map((url) => url.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      // Trigger when the element crosses the middle/top of the screen
      { rootMargin: "-100px 0px -66% 0px" }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [itemUrls]);

  return activeId;
}
