
import createApiAdmin from "../api.services"

class authService {

  constructor(baseUrl = "/api/admin/staff/") {
    this.api = createApiAdmin(baseUrl);
  }

  async login(data) {
    return (await this.api.post("login", {
      data
    })).data
  }

  async logout(){
    return (await this.api.post("logout")).data
  }


}

export default new authService();
