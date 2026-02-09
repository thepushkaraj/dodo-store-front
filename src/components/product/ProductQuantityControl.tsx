"use client";

import { useTranslations } from "next-intl";

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function ProductQuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControlProps) {
  const t = useTranslations("product");

  return (
    <div className="p-[6px] py-[7px] rounded-lg border border-border-tertiary gap-4 flex justify-center w-fit items-center">
      <button
        onClick={onDecrement}
        className="bg-button-secondary-bg hover:bg-button-secondary-bg-hover rounded-md aspect-square h-[24px] flex items-center justify-center"
        aria-label={t("decreaseQuantity")}
      >
        -
      </button>
      <p className="text-sm min-w-[20px] text-center" aria-label={t("quantity")}>
        {quantity}
      </p>
      <button
        onClick={onIncrement}
        className="bg-button-secondary-bg hover:bg-button-secondary-bg-hover rounded-md aspect-square h-[24px] flex items-center justify-center"
        aria-label={t("increaseQuantity")}
      >
        +
      </button>
    </div>
  );
}