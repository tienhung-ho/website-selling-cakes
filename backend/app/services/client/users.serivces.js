
const UserModel = require('../../models/order.model')

class UsersServices {

  constructor () {
    this.UserModel =  UserModel
  }

  async createOffer (data, user) {
    const payload = {
      userInfo: {
        fullName: user.fullName,
        address: {
          city: user.city,
          district: user.district,
          street: user.street,
        },
        phone: user.phone
      },
      products: [
      ]
    }

    data.forEach(item => {
      const productInfor = {
        product_id: item.value._id,
        slug: item.value.slug,
        quantity: item.quantity,
        price: item.value.price,
        discountPercentage: item.value.discountPercentage
      }

      payload.products.push(productInfor)
      
    })

    const result = new this.UserModel(payload)
    result.save()

    return result
  }

  async orderTracking (user) {
    const result = await this.UserModel.find({
      deleted: false
    })

    return result
  }

}

module.exports = UsersServices
