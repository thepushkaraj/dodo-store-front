"use client";

import { createContext, useContext, ReactNode } from "react";
import { GTMScript } from "./gtm-script";
import { GA4Script } from "./ga4-script";
import { MetaPixelScript } from "./meta-pixel-script";

export interface TrackingConfig {
  googleTagManagerId?: string | null;
  googleAnalyticsId?: string | null;
  metaPixelId?: string | null;
}

const AnalyticsContext = createContext<TrackingConfig>({});

export function useAnalyticsConfig() {
  return useContext(AnalyticsContext);
}

interface AnalyticsProviderProps {
  children: ReactNode;
  config: TrackingConfig;
}

export function AnalyticsProvider({ children, config }: AnalyticsProviderProps) {
  return (
    <AnalyticsContext.Provider value={config}>
      {config.googleTagManagerId && (
        <GTMScript gtmId={config.googleTagManagerId} />
      )}
      {config.googleAnalyticsId && (
        <GA4Script measurementId={config.googleAnalyticsId} />
      )}
      {config.metaPixelId && <MetaPixelScript pixelId={config.metaPixelId} />}
      {children}
    </AnalyticsContext.Provider>
  );
}
