
import createApiClient from "../api.services"

class userService {

  constructor(baseUrl = "/api/") {
    this.api = createApiClient(baseUrl);
  }

  async login (user) {

    return (await this.api.post("user/login" ,{
      params: user
    })).data
  }

  async register (user) {
    console.log(user);
    return (await this.api.post("user/register" ,{
      params: user
    })).data
  }

  async user () {
    return (await this.api.get("user/information")).data
  }

  async logout () {
    return (await this.api.post("user/logout"))
  }

  async findAndUpdate(data) {
    console.log(data);
    return (await this.api.post("user/cart", {
      params: data

    })).data
  }

  async deleteCart (data) {
    
   (await this.api.post('user/delete-cart', {
      params: data
    }))
    return (await this.api.get("user/information")).data
  }

}

export default new userService();
