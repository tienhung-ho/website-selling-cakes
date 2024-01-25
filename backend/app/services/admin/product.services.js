const Product = require('../../models/products.model');
const searchRegex = require('../../helpers/search.helpers')
const ProductCategory = require('../../models/product-category.model')
const ProductCategoryServices = require('../../services/admin/product-category.services')


class ProductServices {
  extractProductData(payload) {
    const product = {
      name: payload.name,
      flavor: payload.flavor,
      description: payload.description,
      ingredients: payload.ingredients,
      price: payload.price,
      productionDate: payload.productionDate,
      expiryDate: payload.expiryDate,
      quantity: payload.quantity,
      thumbnail: payload.thumbnail,
      liked: payload.liked,
      deleted: payload.deleted,
      available: payload.available,
      // views: payload.available,
    }

    Object.keys(product).forEach(
      (key) => product[key] === undefined && delete product[key]
    )
    return product;
  }


  async find(payload) {
    const result = this.extractProductData(payload)
    let pagination = {
      currentPage: 1,
      limitItem: 4,

    }

    // console.log(result);

    const products = await Product.find(
        result
      ).sort({
        quantity: 'desc'
      }).limit().skip()
    // console.log(products);
    return products
  }


  async findLike() {
    const products = await Product.find({
      liked: true,
      deleted: false,
    });
    return products;
  }

  async create(payload) {
    payload.quantity = await Product.count() + 1

    const result = this.extractProductData(payload)
    const product = new Product(result)
    const productCategoryServices = new ProductCategoryServices()
    await productCategoryServices.createProductCategory(product.flavor, product._id)
    product.save()
    return product
  }


  async changeStatus(payload, id) {
    try {
      const result = this.extractProductData(payload)

      if (result.available !== undefined) {
        result.available = !result.available
      }

      if (result.liked !== undefined) {
        result.liked = !result.liked
      }

      if (result.deleted !== undefined) {
        result.deleted = true
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id },
        result,
        { new: true } // Trả về document đã được cập nhật
      );

      if (!updatedProduct) {
        throw new Error('Product not found');
      }

      return updatedProduct;
    } catch (err) {
      console.error(err);
      throw new Error('Error updating product status');
    }
  }

  async findBySlug(slug) {
    if (slug) {
      try {
        const product = await Product.findOne({ slug });
        if (!product) {
          // Nếu không tìm thấy sản phẩm, trả về một phản hồi lỗi hoặc xử lý theo nhu cầu của bạn.
          return res.status(404).json({ error: "Product not found" });
        }
        // Trả về sản phẩm nếu tìm thấy.
        return product;
      } catch (err) {
        // Xử lý lỗi nếu có.
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      // Nếu không có slug được cung cấp, trả về một phản hồi lỗi.
      res.status(400).json({ error: "Invalid request" });
    }
  };

}

module.exports = ProductServices


