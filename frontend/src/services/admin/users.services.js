
import createApiClient from "../api.services"

class userService {

  constructor(baseUrl = "/api/admin/users/") {
    this.api = createApiClient(baseUrl);
  }

  async getAllOrders() {
    return (await this.api.get("order")).data
  }


}

export default new userService();
