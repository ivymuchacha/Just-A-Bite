const db = require("../models");
const Product = db.Product;
const Faq = db.Faq;

const webController = {
  index: (req, res) => {
    res.render("homepage");
  },

  faq: (req, res) => {
    Faq.findAll({
      where: {
        is_deleted: null,
      },
      order: [["order", "ASC"]],
    })
      .then((faqs) => {
        return res.render("faq", { faqs });
      })
      .catch((err) => {
        console.log(err.toString());
        return next();
      });
  },

  menu: (req, res) => {
    Product.findAll({
      where: {
        is_deleted: null,
      },
    })
      .then((products) => {
        return res.render("menu", { products });
      })
      .catch((err) => {
        return console.log(err);
      });
  },

  admin: (req, res) => {
    res.render("admin");
  },
};

module.exports = webController;
