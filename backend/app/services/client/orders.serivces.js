
const OrdersModel = require('../../models/order.model')
const ProductModel = require('../../models/products.model')

class UsersServices {

  constructor () {
    this.OrdersModel =  OrdersModel
  }

  async createOffer (data, user, order) {
    const payload = {
      userInfo: {
        user_id: user.user_id,
        fullName: user.fullName,
        address: {
          city: user.city,
          district: user.district,
          street: user.street,
          ward: user.ward
        },
        phone: user.phone
      },
      products: [
      ],
      description: order.description,
      totalPrice: order.totalPrice,
      createdAtDate: order.createdAtDate
    }

    data.forEach(async item => {
      const productInfor = {
        product_id: item.value._id,
        slug: item.value.slug,
        quantity: item.quantity,
        price: item.value.price,
        discountPercentage: item.value.discountPercentage
      }

      await ProductModel.findOneAndUpdate(
        { _id: item.value._id },
        { $inc: { quantity: -item.quantity } } // Trừ đi số lượng mới từ số lượng hiện tại
      );

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
      'userInfo.user_id': user,
      deleted: false
    })

    return result
  }

}

module.exports = UsersServices
