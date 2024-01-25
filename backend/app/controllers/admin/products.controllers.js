// const Product = require('../../models/product.model');
const { ObjectId } = require("mongodb");
const searchRegex = require('../../helpers/search.helpers')
const ProductServices = require('../../services/admin/product.services');

// [GET], /api/admin/products
module.exports.find = async (req, res, next) => {
  let conditions = {}

  try {
    if (!req?.query) {
      res.status(404).json({ error: "Data not found" });
    }
    else {
      const { status, name } = req.query

      if (name) {

        conditions.name = searchRegex(name).name
        // // console.log(this.conditions.name);
        // conditions.name = { $regex: new RegExp(name, 'i') };
      }

      if (status) {
        if (status === 'available') {
          conditions.available = true
        }
        else if (status === 'unavailable') {
          conditions.available = false
        }
      }

      conditions.deleted = false
      const productServices = new ProductServices()
      const products = await productServices.find(
        conditions,
      )
      // console.log(products);
      res.send(products)
    }

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports.findLike = async (req, res, next) => {

  try {
    const productServices = new ProductServices()
    const products = await productServices.findLike()
    res.send(products)

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// [PATCH], /api/admin/products/change-property
module.exports.changeStatus = async (req, res, next) => {
  try {
    const { filter, _ } = req.body.params;
    

    if (/^[0-9a-fA-F]{24}$/.test(filter)) {
      const updateFields = req.body.params;
      // updateFields.liked = !updateFields.liked; 
      // updateFields.available = !updateFields.available;
      _id = filter
      const productServices = new ProductServices()
      const updatedProduct = await productServices.changeStatus(updateFields, _id,
        { new: true } // Trả về document đã được cập nhật
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.json(updatedProduct);
    }
    else {
      res.status(400).json({ error: 'Product not true' })
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

// [PATCH], /api/admin/products/edit/:slug
module.exports.edit = async (req, res, next) => {
  try {
    const { _id, _ } = req.body.params;
    if (/^[0-9a-fA-F]{24}$/.test(_id)) {
      const updateFields = req.body.params;
      const productServices = new ProductServices()
      const updatedProduct = await productServices.changeStatus(updateFields, _id,
        { new: true } // Trả về document đã được cập nhật
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.json(updatedProduct);
    }
    else {
      res.status(400).json({ error: 'Product not true' })
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

// [POST], /api/admin/products/create
module.exports.create = async (req, res, next) => {
  try {
    const product = req.body.params
    const productServices = new ProductServices()
    const new_product = await productServices.create(product)
    if (!new_product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    return res.json(new_product)
    
  }
  catch (err) {
    console.log(err);
  }

}

// [GET], /api/admin/products/:slug
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
