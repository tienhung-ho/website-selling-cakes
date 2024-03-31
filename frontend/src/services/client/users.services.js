
import createApiClient from "../api.services"

class UsersServices {

  constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
  }

  async setOrder (data, user, order) {
    return (await this.api.post("/order", {
      data,
      user,
      order
    })).data
  }

  async getOrderTracking (user) {
    return (await this.api.get("/order/tracking", {
      user
    })).data
  }

  

}

export default new UsersServices();
