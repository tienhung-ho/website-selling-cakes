
import createApiClient from "../api.services"

class UsersServices {

  constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
  }

  async setOrder (data, user) {
    return (await this.api.post("/order", {
      data,
      user
    })).data
  }

  

}

export default new UsersServices();
