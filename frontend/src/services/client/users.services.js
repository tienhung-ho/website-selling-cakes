
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
    console.log(user);
    return (await this.api.post("/order/tracking", {
      user
    })).data
  }

  async getStaffWithAccessToken() {
    return (await this.api.get(`/get-user`, )).data
  }
  

}

export default new UsersServices();
