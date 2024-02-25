
// import Flavor from '../../models/flavor.model'
const Flavor = require('../../models/flavor.model')
const Product = require('../../models/products.model')
const productCategory = require('../../models/product-category.model')

const FlavorServices = require('../../services/admin/flavor.services')
const ProductServices = require('../../services/admin/product.services')

class FlavorProductServices {

  constructor() {
    this.Flavor = Flavor
    this.Product = Product
    this.productCategory = productCategory
  }

  async findProductIdsWithCategoryId(id) {
    const productCategory = await this.productCategory.find({ flavor_id: id })
    const productId = await productCategory.map(item => item.product_id)

    return productId
  }

  async findCategoryIdsWithProductId(id) {
    const productCategory = await this.productCategory.find({ product_id: id })
    const categoryId = await productCategory.map(item => item.flavor_id)
    return categoryId
  }

  async editProductCategory(arrCategory, productId) {
    let productCategory = {
      product_id: '',
      flavor_id: ''
    }

    const flavors = await this.Flavor.find({
      flavor: { $in: arrCategory }
    }).select('_id')

    const flavorIds = flavors.map(item => item._id)

    const test = await this.productCategory.deleteMany({
      product_id: productId,
      flavor_id: { $nin: flavorIds }
    })

    for (const item of flavorIds) {

      const existProductCategory = await this.productCategory.findOne({
        product_id: productId,
        flavor_id: item,
      })


      if (!existProductCategory) {
        productCategory.flavor_id = item
        productCategory.product_id = productId

        if (productCategory.flavor_id != '' && productCategory.product_id != '') {

          await this.productCategory.create(productCategory)
        }
      }
    }

  }

  async createProductCategory(arrCategory, productId) {
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

  async findByProduct(slug) {
    const product = await this.Product.findOne({
      slug: slug
    }).select('_id')
    const categoryId = await this.findCategoryIdsWithProductId(product._id)
    const categories = await this.Flavor.find({
      _id: { $in: categoryId },
    })

    return categories
  }

  async findByCategory(categorySlug) {
    const flavorInstaint = new FlavorServices()
    const flavor = await flavorInstaint.findBySlug(categorySlug)
    const productId = await this.findProductIdsWithCategoryId(flavor.id)
    const products = await this.Product.find({
      _id: { $in: productId },
      deleted: false
    })

    return products
  }


}

module.exports = FlavorProductServices
