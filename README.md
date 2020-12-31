# Just A Bite 餐廳網站 - Express

![Just A Bite 餐廳網站](https://imgur.com/sRe81CL.png)
專案發想自 MTR04-餐廳官網練習作業，使用 Express 工具，身為一般訪客可以抽獎、查看商品菜單、查看問題。身為管理員可以管理抽獎機制，新增、編輯、刪除商品與問題集。

# DEMO - 專案展示
[Just A Bite 餐廳網站](https://just-a-bite.herokuapp.com/)

歡迎使用管理員測試帳號登入使用，帳密如下：

帳號名稱：ann 密碼：ann

## Features - 功能
### 商品
1. 新增商品
2. 編輯商品
3. 刪除商品
### FAQ
1. 新增問題
2. 編輯問題
3. 刪除問題

### 抽獎
1. 新增抽獎商品
2. 編輯抽獎商品
3. 編輯抽獎權重
4. 刪除抽獎品項

# Technical Skills - 使用哪些技術實作專案

1. Node.js - 專案環境
2. Express - 輕量且方便的後端框架
3. mysql - 儲存菜單、抽獎、問題等資料
4. sequelize - 利用 ORM 以操作 JavaScript 物件的方式操作資料庫
5. sequelize-cli - 使用 CLI 快速建立 models
6. bcrypt - 密碼的 hash 與驗證
7. body-parser - 解析前端傳來的 body 資訊
8. Heroku - 快速部署上線
9. express-session 記錄狀態
10. connect-flash 一次性的訊息提示

# Declaration - 聲明

本作品內圖片、內容等，純粹為個人練習後端使用，不做任何商業用途。

# Installing - 專案安裝流程

1. clone this repository

```
git clone https://github.com/ivymuchacha/Just-A-Bite.git
```

2. 安裝套件

```
npm install
```

3. 在本地端開啟此專案

```
node index.js
```
