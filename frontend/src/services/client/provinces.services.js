
import createApiClient from "../api.services"

class Provinces {

  constructor(baseUrl = "https://vapi.vnappmob.com/api/") {
    this.api = createApiClient(baseUrl);
  }

  async getCity () {
    return (await this.api.get("province", {
    })).data
  }

  async getDistrict (code) {
    return (await this.api.get(`province/district/${code}`, {
    })).data
  }

  async getWard (code) {
    return (await this.api.get(`province/ward/${code}`, {
    })).data
  }

  

}

export default new Provinces();
