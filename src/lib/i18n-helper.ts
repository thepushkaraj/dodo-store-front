"use server";

import { Locale, locales, defaultLocale } from "@/i18n/config";
import { cookies } from "next/headers";

// Cookie name for storing user locale preference
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(COOKIE_NAME)?.value;

  // Validate that the cookie value is a valid locale
  if (cookieValue && locales.includes(cookieValue as Locale)) {
    return cookieValue as Locale;
  }

  return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}

export async function hasUserLocaleCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has(COOKIE_NAME);
}
