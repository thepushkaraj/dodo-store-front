import Link from "next/link";
import React from "react";
import type { Mode } from "@/types/storefront";
import { getTranslations } from "next-intl/server";

const Banner = async ({ mode }: { mode: Mode }) => {
  if (mode === "live") return null;

  const t = await getTranslations("banner");

  return (
    <div className="w-[100vw] absolute z-20 top-0 flex flex-col items-center">
      <div className="h-1 w-[100vw] shadow-md bg-[#22272F] dark:bg-bg-secondary "></div>
      <div className="rounded-b-md shadow-md font-medium text-sm font-body h-fit w-fit bg-[#22272F] dark:bg-bg-secondary  text-white px-3 py-2 pt-1">
        {t("testMode")}
        <Link
          href="https://docs.dodopayments.com/miscellaneous/test-mode-vs-live-mode"
          target="_blank"
          className=" ml-2 underline"
        >
          {t("learnMore")}
        </Link>
      </div>
    </div>
  );
};

export default Banner;
