// const Product = require('../../models/product.model');

const ProductServices = require('../../services/client/product.services')
const ProductCategory = require('../../services/client/product-category.services')


module.exports.find =  async (req, res, next) => {
  // let document = []
  try {
    const productServices = new ProductServices()
    const products = await productServices.find()
    return res.send(products)

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }

}


module.exports.findBySlug = async (req, res, next) => {
  const findObj = {};
  if (req.params.slug) {
    slug = req.params.slug;
    try {
      const productServices = new ProductServices()
      const product = await productServices.findBySlug(slug);
      if (!product) {
        // Nếu không tìm thấy sản phẩm, trả về một phản hồi lỗi hoặc xử lý theo nhu cầu của bạn.
        return res.status(404).json({ error: "Product not found" });
      }
      // Trả về sản phẩm nếu tìm thấy.
      res.json(product);
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


