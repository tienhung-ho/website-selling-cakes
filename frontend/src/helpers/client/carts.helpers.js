

export function addToCart(item) {
  try {

    const existingCart = JSON.parse(localStorage.getItem("cart")) || []
    
    if (existingCart.length > 0) {
  
      const existItem = existingCart.filter(product => product.value.slug == item.slug )
      let content = []
  
      if (existItem.length > 0) {
        for (const product of existingCart) {
          if(product.value.slug === item.slug) {
            product.quantity += 1
          }
          
        }
        content = [...existingCart]
      }
      else {
        content = existingCart.concat({ value: item,
          quantity: 1
        })
      }
  
      localStorage.setItem("cart", JSON.stringify(content))
    } else {
      // Nếu giỏ hàng chưa tồn tại, tạo một giỏ hàng mới với mục đầu tiên
      localStorage.setItem("cart", JSON.stringify([{
        value: item,
        quantity: 1
      }]))
    }
  }
  catch(err) {
    console.log(err);
  }
}


// Mutation to remove an item from the cart
export function removeFromCart (itemId) {
 
}
