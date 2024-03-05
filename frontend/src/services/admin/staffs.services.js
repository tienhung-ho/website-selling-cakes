
import createApiAdmin from "../api.services"

class staffService {

  constructor(baseUrl = "/api/admin/staff") {
    this.api = createApiAdmin(baseUrl);
  }

  async getAllStaff() {
    return (await this.api.get("/")).data
  }

  async getStaffbySlug (slug) {
    return (await this.api.get(`/get/${slug}`)).data
  }

  async createStaff(staff) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return (await this.api.post("/create", staff, config))
  }

  async editStaff(staff, slug) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    return (await this.api.patch(`/edit/${slug}`, staff, config))
  }

  async changeStatus(data) {
    return (await this.api.patch("/change-status", {
      params: data
    })).data
  }

  async delete(data) {
    
    return (await this.api.delete(`/delete/${data}`))
  }

  async getStaffWithAccessToken(token) {
    return (await this.api.get(`/get-staff`, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      },

    }
    )).data
  }
  
}

export default new staffService();
