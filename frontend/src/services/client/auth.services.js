
import createApiClient from "../api.services"

class UsersAuthServices {

  constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
  }

  async login (user) {
    console.log(user);
    return (await this.api.post("/login", {
      user
    })).data
  }

  async register (user) {
    return (await this.api.post("/register", {
      user
    })).data
  }
  

}

export default new UsersAuthServices();
