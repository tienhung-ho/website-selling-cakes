
export function calPrice (price, discountPercentage) {

  return parseFloat(price) - (parseFloat(price) * parseFloat(discountPercentage)) / 100
}
