const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const lotteryController = require("./controllers/lottery");
const userController = require("./controllers/user");
const webController = require("./controllers/web");
const productController = require("./controllers/product");
const faqController = require("./controllers/faq");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(flash());
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.username = req.session.username;
  next();
});

function redirectBack(req, res) {
  res.redirect("back");
}
app.set("view engine", "ejs");

// 首頁
app.get("/", webController.index);

// 常見問題
app.get("/faq", webController.faq);

// menu
app.get("/menu", webController.menu);

// 抽獎
app.get("/lottery", lotteryController.index, redirectBack);
app.get("/draw_lottery", lotteryController.drawLottery);

// 後台
app.get("/admin", webController.admin);
app.post("/admin", userController.login, redirectBack);
app.get("/logout", userController.logout, redirectBack);

// 管理抽獎
app.get("/admin_lottery", lotteryController.admin);
app.get("/add_prize", lotteryController.addPrize, redirectBack);
app.post("/add_prize", lotteryController.handleAddPrize, redirectBack);
app.get("/delete_prize/:id", lotteryController.deletePrize, redirectBack);
app.get("/edit_prize/:id", lotteryController.editPrize, redirectBack);
app.post("/edit_prize/:id", lotteryController.handleEditPrize, redirectBack);

// 管理商品
app.get("/admin_product", productController.admin);
app.get("/add_product", productController.addProduct, redirectBack);
app.post("/add_product", productController.handleAddProduct, redirectBack);
app.get("/delete_product/:id", productController.deleteProduct, redirectBack);
app.get("/edit_product/:id", productController.editProduct, redirectBack);
app.post(
  "/edit_product/:id",
  productController.handleEditProduct,
  redirectBack
);

// 管理問題
app.get("/admin_faq", faqController.admin, redirectBack);
app.get("/add_faq", faqController.addFaq);
app.post("/add_faq", faqController.handleAddFaq, redirectBack);
app.get("/edit_faq/:id", faqController.editFaq, redirectBack);
app.post("/edit_faq/:id", faqController.handleEditFaq, redirectBack);
app.get("/delete_faq/:id", faqController.deleteFaq, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
