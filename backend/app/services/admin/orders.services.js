const OrdersModel = require('../../models/order.model')

class OrdersServices {
  extractOrdersData(payload) {
    const staff = {
      
    }

    Object.keys(staff).forEach(
      (key) => staff[key] === undefined && delete staff[key]
    )
    return staff;
  }

  constructor() {
    this.OrdersModel = OrdersModel

  }

  async getAllOrders () {
   
    const result = await this.OrdersModel.find({}).sort({position: 'desc'})
    return result
  }




}

module.exports = OrdersServices
