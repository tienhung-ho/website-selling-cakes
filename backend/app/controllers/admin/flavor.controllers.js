const Flavor = require('../../models/flavor.model')
const ProductCategory = require('../../services/admin/product-category.services')

// [GET] admin/flavor/
module.exports.find =  async (req, res, next) => {
  // let document = []
  
  const flavors = await Flavor.find({})

  res.send(flavors)
}

// [GET] admin/flavor/:slug
module.exports.filterByCategory = async (req, res, next) => {
  const findObj = {};
  if (req.params.slug) {
    slug = req.params.slug;
    try {
      const productCategoryServices = new ProductCategory()
      const products = await productCategoryServices.findByCategory(slug);

      if (!products) {
        // Nếu không tìm thấy sản phẩm, trả về một phản hồi lỗi hoặc xử lý theo nhu cầu của bạn.
        return res.status(404).json({ error: "Product not found" });
      }
      // Trả về sản phẩm nếu tìm thấy.

      res.json(products);
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

// [GET] admin/flavor/products/:slug
module.exports.findByProuduct =  async (req, res, next) => {
  try {
    const slug = req.params.slug
    const productCategoryServices = new ProductCategory()
    const flavors = await productCategoryServices.findByProduct(slug)
    res.send(flavors)

  }
  catch(err) {
    console.log(err);
  }
}

