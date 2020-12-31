const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");

const userController = {
  index: (req, res) => {
    res.render("lottery");
  },

  login: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash("errorMessage", "資料不齊全");
      return next();
    }

    User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        if (!user) {
          req.flash("errorMessage", "使用者不存在");
          return next();
        }

        bcrypt.compare(password, user.password, function (err, result) {
          if (err || !result) {
            console.log(err, result);
            req.flash("errorMessage", "輸入資料錯誤");
            return next();
          }
          req.session.username = user.username;
          return next();
        });
      })
      .catch((err) => {
        if (err) {
          req.flash("errorMessage", err.toString());
          return next();
        }
      });
  },

  logout: (req, res, next) => {
    req.session.username = null;
    return next();
  },
};

module.exports = userController;
