"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

/** In the CMS live-preview pane, re-renders the page each time the editor autosaves. */
export function RefreshOnSave() {
  const router = useRouter();
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={process.env.NEXT_PUBLIC_SITE_URL || ""} />;
}
