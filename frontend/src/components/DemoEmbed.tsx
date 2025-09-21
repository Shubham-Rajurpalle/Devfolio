import { useEffect } from "react";
import type { DemoType } from "../lib/types";

export default function DemoEmbed({
  type,
  url,
}: {
  type: DemoType;
  url?: string;
}) {
  useEffect(() => {
    if (type === "appetize" && url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [type, url]);

  if (!url) return null;

  const common = "w-full border-0 rounded-2xl";

  if (type === "snack") {
    return (
      <iframe
        src={url}
        loading="lazy"
        style={{ width: "100%", height: 600 }}
        className={common}
      />
    );
  }

  if (type === "youtube") {
    const u = new URL(url);
    const id = u.searchParams.get("v") || url.split("/").pop();
    return (
      <iframe
        className={common}
        style={{ width: "100%", height: 420 }}
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return null;
}
