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

  // async getAllOrders (conditions) {
  
  //   const result = await this.OrdersModel.find(
  //     conditions
  //   ).sort({position: 'desc'})
  //   return result
  // }

  async getAllOrders(conditions) {
    let query = {}; // Khởi tạo truy vấn rỗng
  
    if (conditions && conditions.createdAtDate) {
      const startOfDay = new Date(conditions.createdAtDate)
      startOfDay.setUTCHours(0, 0, 0, 0)
      const endOfDay = new Date(conditions.createdAtDate)
      endOfDay.setUTCHours(23, 59, 59, 999)
  
      // Tạo điều kiện để tìm kiếm các bản ghi có createdAtDate nằm trong khoảng thời gian từ đầu đến cuối của ngày
      query.createdAt = {
        $gte: startOfDay, // Lớn hơn hoặc bằng ngày bắt đầu của ngày nhận được
        $lte: endOfDay // Nhỏ hơn hoặc bằng ngày kết thúc của ngày nhận được
      };
    }
  
    // Tìm kiếm các bản ghi theo query đã tạo và sắp xếp theo position giảm dần
    const result = await this.OrdersModel.find(query).sort({ position: 'desc' });
  
    return result;
  }
  



}

module.exports = OrdersServices
