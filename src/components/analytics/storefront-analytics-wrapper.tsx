"use client";

import { useEffect } from "react";
import { AnalyticsProvider, analytics, AnalyticsItem } from "@/components/analytics";
import { TrackingDetails } from "@/lib/server/storefront-client";

interface StorefrontAnalyticsWrapperProps {
  children: React.ReactNode;
  tracking?: TrackingDetails | null;
  products: AnalyticsItem[];
}

export function StorefrontAnalyticsWrapper({
  children,
  tracking,
  products,
}: StorefrontAnalyticsWrapperProps) {
  const hasTracking =
    tracking?.google_tag_manager_id ||
    tracking?.google_analytics_id ||
    tracking?.meta_pixel_id;

  // Fire view_item_list event when storefront loads
  useEffect(() => {
    if (!hasTracking || products.length === 0) return;

    analytics.viewItemList(products);
  }, [hasTracking, products]);

  // If no tracking configured, just render children
  if (!hasTracking || !tracking) {
    return <>{children}</>;
  }

  return (
    <AnalyticsProvider
      config={{
        googleTagManagerId: tracking.google_tag_manager_id,
        googleAnalyticsId: tracking.google_analytics_id,
        metaPixelId: tracking.meta_pixel_id,
      }}
    >
      {children}
    </AnalyticsProvider>
  );
}
