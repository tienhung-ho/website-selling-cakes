
import createApiAdmin from "../api.services"

class staffService {

  constructor(baseUrl = "/api/admin/roles") {
    this.api = createApiAdmin(baseUrl);
  }

  async getAllRoles() {
    return (await this.api.get("/")).data
  }

  async getRolebySlug(slug) {
    return (await this.api.get(`/slug/${slug}`)).data
  }

  async getRolesPermissionById(id) {
    return (await this.api.get(`/${id}`)).data
  } 

  async getPermission() {
    return (await this.api.get(`/permission/data`)).data
  }

  async createRole(data) {
    return (await this.api.post("/create", {
      params: data
    })).data
  }



  async editRole(data) {
    console.log(data.slug);
    return (await this.api.patch(`/edit/${data.slug}`, {
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
