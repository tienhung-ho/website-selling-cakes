
const User = require('../../models/user.model')

class UsersService {

  extractCartData(payload) {
    const cart = {
      _id: payload._id,
      slug: payload.slug,
      quantity: payload.quantity
     
    }

    Object.keys(cart).forEach(
      (key) => cart[key] === undefined && delete cart[key]
  )
    return cart;
  }

  async findAndUpdate(data, userId) {
    try {
      const user = await User.findOne({ _id: userId });
  
      if (!user) {
        // Handle the case where the user is not found
        console.log('User not found');
        return;
      }
  
      console.log(data);
      // Check if the item already exists in the cart
      const existingItemIndex = user.cart.findIndex(item => item._id.toString() === data._id.toString());
  
      if (existingItemIndex !== -1) {
        // If the item exists, update the quantity
        user.cart[existingItemIndex].quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart
        user.cart.push({
          _id: data._id,
          slug: data.slug,
          quantity: 1,
          // Add other properties from your data if needed
        });
      }
  
      // Save the updated user with the modified cart
      const updatedUser = await user.save();
  
      console.log('User updated:', updatedUser);
    } catch (err) {
      console.log('Error:', err);
    }
  }
  
  

  async delete(userId, cartId) {
    try {
      const user = await User.findOne({_id: userId});

      if (!user) {
        console.log('User not found');
        return;
      }

      // Find the index of the cart item with the given cartId
      const cartIndex = user.cart.findIndex(item => item._id.toString() === cartId);

      if (cartIndex !== -1) {
        // If the cart item is found, remove it from the array
        user.cart.splice(cartIndex, 1);
        // Save the updated user
        const updatedUser = await user.save();
        console.log('Cart deleted successfully. User updated:', updatedUser);
      } else {
        console.log('Cart not found');
      }

    } catch (err) {
      console.log('Error:', err);
    }
  }

  

  





}

module.exports = UsersService
