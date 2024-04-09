
import createApiClient from "../api.services"

class ordersService {

  constructor(baseUrl = "/api/admin/orders/") {
    this.api = createApiClient(baseUrl);
  }

  async getAllOrders(conditions) {
    return (await this.api.get('', {
      
      params: conditions,

    })).data
  }

  async changeStatusOrder (query) {
    return (await this.api.patch('change-status', {
      params: query
    }))
  }

}

export default new ordersService();
