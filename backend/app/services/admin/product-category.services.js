
// import Flavor from '../../models/flavor.model'
const Flavor = require('../../models/flavor.model')
const Product = require('../../models/products.model')
const productCategory = require('../../models/product-category.model')

const FlavorServices = require('../../services/client/flavor.services')

class FlavorProductServices {

  constructor () {
    this.Flavor = Flavor
    this.Product= Product
    this.productCategory = productCategory
  }


  async createProductCategory (arrCategory, productId) {
    let productCategory = {
      product_id: '',
      flavor_id: ''
    }
    for (const item of arrCategory) {
      const flavorId = await this.Flavor.findOne({
        flavor: item,
      }).select('_id')

      productCategory.flavor_id = flavorId.id
      productCategory.product_id = productId

      if (productCategory.flavor_id != '' && productCategory.product_id != '') {
        // console.log(productCategory);
        await this.productCategory.create(productCategory)
      }
    }
  }

}

module.exports = FlavorProductServices
