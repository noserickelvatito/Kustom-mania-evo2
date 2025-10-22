interface PricingDisplayProps {
  priceARS: number | null
  priceUSD: number | null
  offerPercentage: number | null
  size?: "small" | "medium" | "large"
}

export function PricingDisplay({ priceARS, priceUSD, offerPercentage, size = "medium" }: PricingDisplayProps) {
  // Don't show anything if no prices are set
  if (!priceARS && !priceUSD) {
    return null
  }

  const hasOffer = offerPercentage && offerPercentage > 0

  // Calculate discounted prices
  const discountedARS = hasOffer && priceARS ? priceARS * (1 - offerPercentage / 100) : priceARS
  const discountedUSD = hasOffer && priceUSD ? priceUSD * (1 - offerPercentage / 100) : priceUSD

  // Size classes
  const sizeClasses = {
    small: {
      container: "text-sm",
      badge: "text-xs px-2 py-1",
      price: "text-lg",
      oldPrice: "text-sm",
    },
    medium: {
      container: "text-base",
      badge: "text-sm px-3 py-1",
      price: "text-2xl",
      oldPrice: "text-base",
    },
    large: {
      container: "text-lg",
      badge: "text-base px-4 py-2",
      price: "text-4xl",
      oldPrice: "text-xl",
    },
  }

  const classes = sizeClasses[size]

  return (
    <div className={`space-y-2 ${classes.container}`}>
      {/* Offer Badge */}
      {hasOffer && (
        <div className="inline-block">
          <span
            className={`${classes.badge} font-bold rounded-full`}
            style={{
              background: "linear-gradient(135deg, #ff6b6b, #ee5a6f)",
              color: "white",
              boxShadow: "0 4px 15px rgba(255, 107, 107, 0.4)",
            }}
          >
            {offerPercentage}% OFF
          </span>
        </div>
      )}

      {/* Prices */}
      <div className="space-y-1">
        {/* Original prices (crossed out if there's an offer) */}
        {hasOffer && (priceARS || priceUSD) && (
          <div className={`${classes.oldPrice} text-gray-500 line-through`}>
            {priceARS && `ARS ${priceARS.toLocaleString("es-AR")}`}
            {priceARS && priceUSD && " • "}
            {priceUSD && `${priceUSD.toLocaleString("en-US")} USD`}
          </div>
        )}

        {/* Current/Discounted prices */}
        <div
          className={`${classes.price} font-bold`}
          style={{
            color: "#b87333",
            textShadow: "0 0 20px rgba(184, 115, 51, 0.4)",
          }}
        >
          {discountedARS && `ARS ${Math.round(discountedARS).toLocaleString("es-AR")}`}
          {discountedARS && discountedUSD && <span className="text-gray-400 mx-2">o</span>}
          {discountedUSD && `${Math.round(discountedUSD).toLocaleString("en-US")} USD`}
        </div>
      </div>
    </div>
  )
}
