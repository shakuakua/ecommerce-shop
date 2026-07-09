 # 🛍️ Ecommerce Shop — 桌面端电商应用

 > **基于 Electron + Vue 3 + Koa 的桌面电商客户端**，提供完整的购物流程和后台管理功能。

 ## 项目概述

 一个跨平台桌面电商应用（Electron），后端使用 Koa + MySQL 提供 RESTful API，前端使用 Vue 3 + TypeScript 构建界面。支持商品浏览购买、购物车管理、订单追踪以及管理员后台管理。

 ## 技术栈

 | 层级 | 技术 |
 |------|------|
 | **前端框架** | Vue 3 + TypeScript |
 | **桌面框架** | Electron (electron-vite) |
 | **后端** | Koa 2 + @koa/router + koa-bodyparser + @koa/cors |
 | **数据库** | MySQL (mysql2/promise) |
 | **构建** | electron-vite / electron-builder |
 | **代码规范** | ESLint + Prettier |

 ## 功能特性

 ### 客户端
 - 商品浏览：查看商品列表与详情
 - 购物车：添加商品、修改数量、删除
 - 订单管理：下单、查看历史订单
 - 用户认证：登录 / 注册

 ### 管理后台
 - 商品管理：添加 / 编辑 / 删除商品
 - 订单管理：查看所有订单、更新订单状态

 ## 快速开始

 ### 后端服务
 ```bash
 cd server
 npm install
 cp .env.example .env  # 配置数据库连接信息
 npm run start
 ```

 后端默认运行在 `http://localhost:3000`

 ### 桌面客户端
 ```bash
 # 安装依赖
 npm install

 # 开发模式运行
 npm run dev

 # 构建安装包
 npm run build
 ```

 ## 项目结构

 ```
 ecommerce-shop/
 ├── src/
 │   ├── main/                # Electron 主进程
 │   │   └── index.ts
 │   ├── preload/             # Electron preload 脚本
 │   │   └── index.ts
 │   └── renderer/            # Vue 3 前端
 │       └── src/
 │           ├── App.vue
 │           ├── main.ts
 │           ├── router.ts
 │           ├── api.ts          # API 请求封装
 │           ├── components/
 │           │   ├── Home.vue    # 首页/商品列表
 │           │   ├── Cart.vue    # 购物车
 │           │   ├── Login.vue   # 登录
 │           │   ├── Order.vue   # 订单
 │           │   └── admin/      # 管理后台
 │           │       ├── Layout.vue
 │           │       ├── Product.vue
 │           │       └── Order.vue
 │           └── assets/
 ├── server/               # Koa 后端 API
 │   └── src/
 │       ├── index.js          # 入口（Koa 应用 + MySQL 连接池）
 │       ├── middleware/       # 中间件
 │       │   └── auth.js       # 认证中间件
 │       └── routes/           # 路由
 │           ├── user.js       # 用户接口
 │           ├── product.js    # 商品接口
 │           ├── cart.js       # 购物车接口
 │           └── order.js      # 订单接口
 ├── build/                # 应用图标
 ├── electron-builder.yml  # 打包配置
 └── package.json
 ```

 ## API 端点

 | 端点 | 方法 | 说明 |
 |------|------|------|
 | `/api/product` | GET/POST/PUT/DELETE | 商品 CRUD |
 | `/api/cart` | GET/POST | 购物车操作 |
 | `/api/order` | GET/POST | 订单操作 |
 | `/api/user` | POST | 登录/注册 |
