
import createAppAdmin from '../api.services'

class ProductsServices {
  
  constructor(baseUrl = '/api/admin') {
    this.api = createAppAdmin(baseUrl)
  }

  async getAllProducts (payload) {
    return (await this.api.get('products', {
      
      params: payload,

    })).data
  }

  async getAllLikeProducts () {
    return (await this.api.get('products/liked')).data 
  }

  async findAndUpdate (query) {
    
    return (await this.api.patch('products/change-property', {
      params: query,
    }))
  }

  async findAndEdit (param, slug) {
    return (await this.api.patch(`products/edit/${slug}`, {
      params: param,
    }))
  }

  async createProduct(data) {
    return (await this.api.post('products/create', {
      params: data,
    }))
  }
  
  async getBySlug(slug) {
    return (await this.api.get(`products/${slug}`)).data
  }


}


export default new ProductsServices()
