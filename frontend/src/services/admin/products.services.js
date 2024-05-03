
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

  async changeMultiple (query) {
    return (await this.api.patch('products/change-multiple', {
      params: query,
    }))
  }

  async findAndUpdate (query) {
    return (await this.api.patch(`products/${query.filter}`, {
      params: query,
    }))
  }

  async delete (query) {
    return (await this.api.delete(`products/${query.filter}`, {
    }))
  }

  async getFlavorByProductSlug (slug) {
    return (await this.api.get(`flavor/product/${slug}`)).data
  }

  async findAndEdit (data, slug) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return (await this.api.patch(`products/edit/${slug}`, data, config))
  }

  async createProduct(data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return (await this.api.post('products/create',data, config))
  }
  
  async getBySlug(slug) {
    return (await this.api.get(`products/${slug}`)).data
  }

  async getAllFlavor (slug) {
    return (await this.api.get(`flavor`)).data
  }


  async getAll() {
    return (await this.api.get('products/all', {
      

    })).data
  }

}


export default new ProductsServices()
