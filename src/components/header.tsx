/* eslint-disable @next/next/no-img-element */

import { BusinessResponse } from "@/lib/server/storefront-client";
import { getTranslations } from "next-intl/server";

const Header = async ({ business }: { business: BusinessResponse }) => {
  const t = await getTranslations("header");

  return (
    <header className="relative w-full">
      <div className="relative h-[35dvh] md:h-[30dvh] w-full">
        <img
          src={business.banner || "/banner.png"}
          alt={t("businessBanner")}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <section className="relative flex flex-col items-center px-4">
        <div className="absolute -top-0 -translate-y-1/2 w-[72px] h-[72px] rounded-full overflow-hidden shadow-bg-primary/50 shadow-md">
          <img
            src={business.logo}
            alt={t("businessLogo")}
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
  );
};

export default Header;
