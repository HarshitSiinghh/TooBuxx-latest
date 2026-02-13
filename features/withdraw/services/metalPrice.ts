
 
export type MetalType = "gold" | "silver" | "platinum";

/**
 * Supported gold karats
 */
export type GoldKarat = 24 | 22 | 18;

/**
 * Get live price per gram for selected metal
 * @param metal - gold | silver | platinum
 * @param karat - only required for gold
 * @returns price per gram in INR
 */
export const getMetalPricePerGram = (
  metal: MetalType,
  karat?: GoldKarat
): number => {
  // GOLD PRICES (per gram)
  if (metal === "gold") {
    if (!karat) return 0;

    switch (karat) {
      case 24:
        return 6150; // ₹ per gram
      case 22:
        return 5650;
      case 18:
        return 4600;
      default:
        return 0;
    }
  }

  // SILVER PRICE (per gram)
  if (metal === "silver") {
    return 75;
  }

  // PLATINUM PRICE (per gram)
  if (metal === "platinum") {
    return 3100;
  }

  return 0;
};
