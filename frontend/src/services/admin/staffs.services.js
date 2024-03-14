
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

  async getStaffWithAccessToken() {
    const token = $cookies.get('PayloadAccessToken')
    return (await this.api.get(`/get-staff`, 
    {
      headers: {
        Authorization: `AccessToken.Header.Payload ${token}`
      },

    }
    )).data
  }

  async getAccessTokenWithRefreshToken(token) {
    return (await this.api.get(`/refreshtoken`, 
    {
      headers: {
        Authorization: `RefreshToken.Header.Paload ${token}`
      },

    }
    )).data
  }
  
}

export default new staffService();
