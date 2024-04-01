
const OrdersModel = require('../../models/order.model')

class UsersServices {

  constructor () {
    this.OrdersModel =  OrdersModel
  }

  async createOffer (data, user, order) {
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
      ],
      description: order.description,
      totalPrice: order.totalPrice,
      createdAtDate: order.createdAtDate
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
    const numberOfOrders = await this.OrdersModel.countDocuments()
    payload.position = numberOfOrders
    const result = new this.OrdersModel(payload)
    result.save()

    return result
  }

  async orderTracking (user) {
    const result = await this.OrdersModel.find({
      deleted: false
    })

    return result
  }

}

module.exports = UsersServices
