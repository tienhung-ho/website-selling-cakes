
import createApiClient from "../api.services"

class CakesService {

  constructor(baseUrl = "/api/") {
    this.api = createApiClient(baseUrl);
  }

  async getAllCakes () {
    return (await this.api.get("products")).data
  }

  async getAllFlavor() {
    return (await this.api.get("flavor")).data
  }

  async getBySlug(slug) {
    return (await this.api.get(`products/${slug}`)).data
  }

  async getByFlavor(slug) {
    return (await this.api.get(`flavor/${slug}`)).data
  }

}

export default new CakesService();
