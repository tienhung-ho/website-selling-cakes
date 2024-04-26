

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

export function updateCart(data) {
  localStorage.setItem("cart", JSON.stringify(data))
}

export function clearCart() {
  localStorage.removeItem('cart');
}


// Mutation to remove an item from the cart
export function removeFromCart(itemId) {
  try {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Lọc ra tất cả các mục không có itemId
    const updatedCart = existingCart.filter(item => item.value._id !== itemId);

    // Lưu giỏ hàng mới sau khi đã xóa mục có ID tương ứng
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
  } catch (err) {
    console.log(err);
  }
}

