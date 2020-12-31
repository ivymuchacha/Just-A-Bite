const db = require("../models");
const Faq = db.Faq;

const faqController = {
  admin: (req, res, next) => {
    Faq.findAll({
      where: {
        is_deleted: null,
      },
      order: [["order", "ASC"]],
    })
      .then((faqs) => {
        return res.render("admin_faq", { faqs });
      })
      .catch((err) => {
        req.flash("errorMessage", "請填寫完整資料");
        return next();
      });
  },

  addFaq: (req, res) => {
    res.render("add_faq");
  },

  handleAddFaq: (req, res, next) => {
    const { order, question, answer } = req.body;
    if (!order || !question || !answer) {
      req.flash("errorMessage", "請填寫完整資料");
      return next();
    }
    Faq.create({
      order,
      question,
      answer,
    })
      .then(() => {
        return res.redirect("/admin_faq");
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  editFaq: (req, res, next) => {
    const id = req.params.id;
    Faq.findOne({
      where: {
        id,
      },
    })
      .then((faq) => {
        return res.render("edit_faq", { faq });
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  handleEditFaq: (req, res, next) => {
    const id = req.params.id;
    const { order, question, answer } = req.body;
    if (!order || !question || !answer) {
      req.flash("errorMessage", "請填寫完整資料");
      return next();
    }
    Faq.findOne({
      where: {
        id,
      },
    })
      .then((faq) => {
        faq.update({
          order,
          question,
          answer,
        });
      })
      .then(() => {
        return res.redirect("/admin_faq");
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  deleteFaq: (req, res, next) => {
    const id = req.params.id;
    Faq.findOne({
      where: {
        id,
      },
    })
      .then((faq) => {
        faq.update({
          is_deleted: 1,
        });
      })
      .then(() => {
        return res.redirect("/admin_faq");
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },
};

module.exports = faqController;
