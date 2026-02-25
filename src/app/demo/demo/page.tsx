"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useCallback, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductCardProps } from "@/components/product/ProductCard";
import { useTranslations } from "next-intl";

const CSS_VAR_MAP: Record<string, string[]> = {
  bgPrimary: ["--bg-primary"],
  bgSecondary: ["--bg-secondary"],
  borderPrimary: ["--border-primary"],
  borderSecondary: ["--border-secondary"],
  textPrimary: ["--text-primary"],
  textSecondary: ["--text-secondary"],
  textPlaceholder: ["--text-placeholder"],
  textError: ["--text-error-primary", "--border-error"],
  textSuccess: ["--text-success-primary"],
  buttonPrimary: ["--button-primary-bg"],
  buttonPrimaryHover: ["--button-primary-bg-hover"],
  buttonTextPrimary: ["--button-primary-text", "--button-primary-fg-hover"],
  buttonSecondary: ["--button-secondary-bg"],
  buttonSecondaryHover: ["--button-secondary-bg-hover"],
  buttonTextSecondary: [
    "--button-secondary-text",
    "--button-secondary-text-hover",
  ],
  inputFocusBorder: ["--border-brand"],
};

const FONT_SIZES: Record<string, string> = {
  xs: "12px",
  sm: "13px",
  md: "14px",
  lg: "16px",
  xl: "18px",
  "2xl": "20px",
};

const FONT_WEIGHTS: Record<string, string> = {
  normal: "400",
  medium: "500",
  bold: "700",
  extraBold: "900",
};

function parseFontFamily(url: string): string | null {
  try {
    const family = new URL(url).searchParams.get("family");
    if (!family) return null;
    return `'${family.split(":")[0].replace(/\+/g, " ")}', sans-serif`;
  } catch {
    return null;
  }
}

function loadFont(id: string, url: string) {
  let link = document.getElementById(id) as HTMLLinkElement | null;
  if (link) {
    if (link.href !== url) link.href = url;
    return;
  }
  link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

const mockBusiness = {
  banner: "/demo-banner.png",
  logo: "/demo-logo.svg",
  name: "Demo Store",
};

const mockProducts: ProductCardProps[] = [
  {
    product_id: "prod_demo_001",
    name: "Digital Art Pack",
    price: 2999,
    currency: "USD",
    description:
      "A curated collection of 50+ high-resolution digital art assets for your creative projects.",
    image: "/demo-product.png",
  },
  {
    product_id: "prod_demo_002",
    name: "E-Book Bundle",
    price: 1499,
    currency: "USD",
    description:
      "Three bestselling e-books on productivity, design thinking, and personal growth.",
    image: "/demo-product.png",
  },
  {
    product_id: "prod_demo_003",
    name: "Premium Templates",
    price: 4999,
    currency: "USD",
    description:
      "Professional-grade templates for presentations, documents, and social media. Pay what you want!",
    image: "/demo-product.png",
    pay_what_you_want: true,
  },
  {
    product_id: "prod_demo_004",
    name: "Music Sample Kit",
    price: 999,
    currency: "USD",
    description:
      "200+ royalty-free music samples and loops across multiple genres for your next project.",
    image: "/demo-product.png",
  },
];

const mockSubscriptions: ProductCardProps[] = [
  {
    product_id: "prod_demo_005",
    name: "Pro Plan",
    price: 1999,
    currency: "USD",
    description:
      "Unlock all pro features including priority support, advanced analytics, and unlimited exports.",
    image: "/demo-product.png",
    payment_frequency_count: 1,
    payment_frequency_interval: "Month",
    trial_period_days: 7,
  },
  {
    product_id: "prod_demo_006",
    name: "Enterprise Plan",
    price: 9999,
    currency: "USD",
    description:
      "Full enterprise access with dedicated support, custom integrations, and team management tools.",
    image: "/demo-product.png",
    payment_frequency_count: 1,
    payment_frequency_interval: "Year",
  },
];

const DEMO_CHECKOUT_URL = "#";

export default function DemoPage() {
  const t = useTranslations("storefront");
  const [business, setBusiness] = useState(mockBusiness);

  const handleMessage = useCallback((event: MessageEvent) => {
    const data = event.data;
    if (!data || typeof data !== "object" || data.type !== "dodo-theme-update")
      return;

    const cfg = data.themeConfig as Record<string, string> | undefined;
    if (!cfg || typeof cfg !== "object") return;

    const theme = data.theme as "light" | "dark" | undefined;
    const root = document.documentElement;

    // Toggle dark / light
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    }

    const isDark = root.classList.contains("dark");

    // Apply color vars
    for (const [key, vars] of Object.entries(CSS_VAR_MAP)) {
      const value = isDark ? cfg[`dark_${key}`] : cfg[key];
      if (value) {
        for (const v of vars) root.style.setProperty(v, value);
      }
    }

    // Radius
    if (cfg.radius) root.style.setProperty("--radius", cfg.radius);

    // Font size
    const fs = FONT_SIZES[cfg.fontSize ?? ""];
    if (fs) root.style.setProperty("--base-font-size", fs);

    // Font weight
    const fw = FONT_WEIGHTS[cfg.fontWeight ?? ""];
    if (fw) root.style.setProperty("--font-weight-body", fw);

    // Fonts
    if (cfg.fontPrimaryUrl) {
      loadFont("demo-font-primary", cfg.fontPrimaryUrl);
      const family = parseFontFamily(cfg.fontPrimaryUrl);
      if (family) root.style.setProperty("--font-gabarito", family);
    }
    if (cfg.fontSecondaryUrl) {
      loadFont("demo-font-secondary", cfg.fontSecondaryUrl);
      const family = parseFontFamily(cfg.fontSecondaryUrl);
      if (family) root.style.setProperty("--font-inter", family);
    }

    // Update storefront business info (name, logo, banner)
    const sf = data.storefront as
      | { name?: string; logo?: string; banner?: string }
      | undefined;
    if (sf) {
      setBusiness((prev) => ({
        ...prev,
        ...(sf.name ? { name: sf.name } : {}),
        ...(sf.logo ? { logo: sf.logo } : {}),
        ...(sf.banner ? { banner: sf.banner } : {}),
      }));
    }

    // Notify parent
    if (window.parent !== window) {
      window.parent.postMessage({ type: "dodo-theme-applied" }, "*");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Inline header — mirrors <Header> server component */}
      <header className="relative w-full">
        <div className="relative h-[35dvh] md:h-[30dvh] w-full">
          <img
            src={business.banner}
            alt="Business banner"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <section className="relative flex flex-col items-center px-4">
          <div className="absolute -top-0 -translate-y-1/2 w-[72px] h-[72px] rounded-full overflow-hidden shadow-bg-primary/50 shadow-md">
            <img
              src={business.logo}
              alt="Business logo"
              width={72}
              height={72}
              className="object-cover object-center"
            />
          </div>
          <h1 className="mt-12 text-2xl font-semibold font-display text-text-primary">
            {business.name}
          </h1>
        </section>
      </header>

      <section className="flex flex-col pb-20 items-center max-w-[1145px] mx-auto justify-center mt-10 px-4">
        {mockProducts.length > 0 && (
          <ProductGrid
            title={t("products")}
            products={mockProducts}
            checkoutBaseUrl={DEMO_CHECKOUT_URL}
          />
        )}

        {mockSubscriptions.length > 0 && (
          <div className="mt-8 w-full">
            <ProductGrid
              title={t("subscriptions")}
              products={mockSubscriptions}
              checkoutBaseUrl={DEMO_CHECKOUT_URL}
            />
          </div>
        )}
      </section>
    </main>
  );
}
