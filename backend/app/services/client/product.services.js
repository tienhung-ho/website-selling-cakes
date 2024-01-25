
const Product = require('../../models/products.model')

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
    }

    Object.keys(product).forEach(
      (key) => product[key] === undefined && delete product[key]
  )
    return product;
  }

  async find() {
  
    const products = await Product.find({
      available: true,
      deleted: false
    }).sort({ liked: -1 })
    return products
  }



async findBySlug (slug) {
  if (slug) {
    try {
      const product = await Product.findOne(
        {
          slug,
          deleted: false
        }
      );
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
