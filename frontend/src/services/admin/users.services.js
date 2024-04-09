
import createApiClient from "../api.services"

class userService {

  constructor(baseUrl = "/api/admin/users/") {
    this.api = createApiClient(baseUrl);
  }


}

export default new userService();
