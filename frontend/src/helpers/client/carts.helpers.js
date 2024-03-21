

export function addToCart(item) {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || []
  
  if (existingCart.length > 0) {
    const content = existingCart.concat(item)

    localStorage.setItem("cart", JSON.stringify(content))
  } else {
    // Nếu giỏ hàng chưa tồn tại, tạo một giỏ hàng mới với mục đầu tiên
    localStorage.setItem("cart", JSON.stringify([item]))
  }
}


// Mutation to remove an item from the cart
export function removeFromCart (itemId) {
 
}
