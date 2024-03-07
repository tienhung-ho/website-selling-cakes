
import createApiAdmin from "../api.services"

class staffService {

  constructor(baseUrl = "/api/admin/roles") {
    this.api = createApiAdmin(baseUrl);
  }

  async getAllRoles() {
    return (await this.api.get("/")).data
  }

  async getRolesPermissionById(id) {
    console.log(id);
    return (await this.api.get(`/${id}`)).data
  } 


  async createRole(data) {
    return (await this.api.post("/create", {
      params: data
    })).data
  }

  async permisson(data) {
    return (await this.api.patch("/permission", {
      params: data
    })).data
  }

  
}

export default new staffService();
