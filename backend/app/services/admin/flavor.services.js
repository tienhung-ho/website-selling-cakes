
const Flavor = require('../../models/flavor.model')
const ProductCategoryServices = require('../../services/admin/product-category.services')

class FlavorServices {

  constructor () {
    this.Flavor = Flavor
  }

  async findBySlug (flavor) {
    const cursor = await this.Flavor.findOne({ flavor }).select('_id flavor')
    // console.log(cursor);
    return cursor
  }

  async findByProductSlug (slug) {
    const productCategoryServices = new ProductCategoryServices()
    const flavors = await productCategoryServices.findByProduct(slug)

    return flavors
  }

}

module.exports = FlavorServices
