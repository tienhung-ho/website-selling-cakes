
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


  async findProductIdsWithCategoryId (id) {
    const productCategory = await this.productCategory.find({ flavor_id: id })

    const productId = await productCategory.map(item => item.product_id)
    return productId
  }

  async findByCategory (categorySlug) {
    const flavorInstaint = new FlavorServices()
    const flavor = await flavorInstaint.findBySlug(categorySlug)
    const productId = await this.findProductIdsWithCategoryId(flavor.id)
    // const productCategory = await this.productCategory.find({ flavor_id: flavor.id })

    // const productId = productCategory.map(item => item.product_id)
    const products = await this.Product.find({
      _id: { $in: productId },
      deleted: false,
      available: true
    })


    return products
  }

  // async findByProduct (productSlug) {
  //   const product = await this.Product.findOne({ slug: productSlug }).select('_id flavor')
  //   const productCategory = await this.productCategory.find({ flavor: product.id})
    
  //   const flavorId = productCategory.map (item => item.flavor_id)
  //   const flavors = await this.Flavor.find({
  //     _id: { $in: flavorId }
  //   })
    
  //   return flavors
  // }

}

module.exports = FlavorProductServices
