
import createApiClient from "../api.services"

class userService {

  constructor(baseUrl = "/api/admin/users/") {
    this.api = createApiClient(baseUrl);
  }

  async getAllOrders(conditions) {
    return (await this.api.get('order', {
      
      params: conditions,

    })).data
  }

}

export default new userService();
