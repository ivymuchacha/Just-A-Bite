const db = require("../models");
const Lottery = db.Lottery;

const lotteryController = {
  index: (req, res, next) => {
    Lottery.findAll({
      where: {
        is_deleted: null,
      },
    })
      .then((lottery) => {
        if (!lottery) {
          req.flash("errorMessage", "無任何資料");
          return next();
        }
        res.render("lottery", { lottery });
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  drawLottery: (req, res, next) => {
    let prizeList = [];
    let allPrize = [];
    let num = 0;
    Lottery.findAll({
      where: {
        is_deleted: null,
      },
    })
      .then((lottery) => {
        lottery.map((prize) => {
          prizeList.push(JSON.parse(JSON.stringify(prize, null, 4)));
        });
        prizeList.map((prize) => {
          for (let i = 0; i < prize.prize_weights; i++) {
            allPrize.push(prize);
          }
          num = num + prize.prize_weights;
        });
        const random = Math.ceil(Math.random() * num);
        const result = allPrize[random - 1];
        return res.send(result);
      })
      .catch((err) => {
        console.log(err.toString());
        return next();
      });
  },

  admin: (req, res, next) => {
    Lottery.findAll({
      where: {
        is_deleted: null,
      },
    })
      .then((lottery) => {
        if (!lottery) {
          req.flash("errorMessage", "無任何資料");
          return next();
        }
        res.render("admin_lottery", { lottery });
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  addPrize: (req, res) => {
    res.render("add_prize");
  },

  handleAddPrize: (req, res, next) => {
    const { prize, prize_name, prize_img, prize_weights } = req.body;
    if (!prize || !prize_name || !prize_img || !prize_weights) {
      req.flash("errorMessage", "請填寫完整資料");
      return next();
    }

    Lottery.create({
      prize,
      prize_name,
      prize_img,
      prize_weights,
    })
      .then(() => {
        res.redirect("/admin_lottery");
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  deletePrize: (req, res, next) => {
    const id = req.params.id;
    Lottery.findOne({
      where: {
        id,
      },
    })
      .then((lottery) => {
        lottery.update({
          is_deleted: 1,
        });
        console.log("lottery", lottery);
      })
      .then(() => {
        return next();
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  editPrize: (req, res, next) => {
    const id = req.params.id;
    Lottery.findOne({
      where: {
        id,
      },
    })
      .then((prize) => {
        res.render("edit_prize", { prize });
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  handleEditPrize: (req, res, next) => {
    const id = req.params.id;
    const { prize, prize_name, prize_img, prize_weights } = req.body;
    if (!prize || !prize_name || !prize_img || !prize_weights) {
      req.flash("errorMessage", "請填寫完整資料");
      return next();
    }

    Lottery.findOne({
      where: {
        id,
      },
    })
      .then((lottery) => {
        lottery.update({
          prize,
          prize_name,
          prize_img,
          prize_weights,
        });
      })
      .then(() => {
        return res.redirect("/admin_lottery");
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },
};

module.exports = lotteryController;
