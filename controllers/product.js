const db = require("../models");
const Product = db.Product;

const productController = {
  admin: (req, res) => {
    Product.findAll({
      where: {
        is_deleted: null,
      },
    })
      .then((products) => {
        if (!products) {
          req.flash("errorMessage", "無任何資料");
          return next();
        }
        console.log(products);
        return res.render("admin_product", { products });
      })
      .catch((err) => {
        return req.flash("errorMessage", err.toString());
      });
  },

  addProduct: (req, res) => {
    res.render("add_product");
  },

  handleAddProduct: (req, res, next) => {
    const { product, product_img, product_price } = req.body;
    if (!product || !product_img || !product_price) {
      req.flash("errorMessage", "資料填寫不完整");
      return next();
    }
    Product.create({
      product,
      product_img,
      product_price,
    })
      .then(() => {
        return res.redirect("/admin_product");
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  deleteProduct: (req, res, next) => {
    const id = req.params.id;

    Product.findOne({
      where: {
        id,
      },
    })
      .then((item) => {
        item.update({
          is_deleted: 1,
        });
      })
      .then(() => {
        return next();
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  editProduct: (req, res, next) => {
    const id = req.params.id;
    Product.findOne({
      where: {
        id,
      },
    })
      .then((product) => {
        return res.render("edit_product", { product });
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  handleEditProduct: (req, res, nect) => {
    const id = req.params.id;
    const { product, product_img, product_price } = req.body;
    if (!product || !product_img || !product_price) {
      req.flash("errorMessage", "資料填寫不完整");
      return next();
    }

    Product.findOne({
      where: {
        id,
      },
    })
      .then((item) => {
        item.update({
          product,
          product_img,
          product_price,
        });
      })
      .then(() => {
        return res.redirect("/admin_product");
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },
};

module.exports = productController;
