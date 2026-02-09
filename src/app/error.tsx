"use client";
import IconColors from "@/components/custom/icon-colors";
import { SmileySad } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

const Error = () => {
  const t = useTranslations("error");

  return (
    <div className="w-full h-screen flex flex-col bg-bg-primary items-center justify-center">
      <IconColors icon={<SmileySad className="w-6 h-6" />} />
      <h1 className="text-xl mt-4 font-display font-semibold">
        {t("somethingWentWrong")}
      </h1>
      <p className="text-sm mt-2 max-w-sm text-text-secondary text-center">
        {t("networkError")}
      </p>
    </div>
  );
};

export default Error;
