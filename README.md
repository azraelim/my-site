## 简单说明

个人网站源码

使用Vue2框架进行开发，使用了bootstrap框架的一些样式和组件，使用了jQuery2.1.4

在ie9+ chrome Firefox浏览器下测试通过

通过bootstrap栅格系统配合媒体查询完成响应式布局，主要页面能适应页面宽度360px+的浏览器

后台使用node.js,通过express框架构建，目前完成了注册、登录、发言、评论等功能， 添加笔记页面使用了editor以支持markdown， 通过marked.js转换为html输出到前端

数据库使用mysql,前后端使用ajax进行交互

## 功能
目前实现了首页、导航条里的静态资源的展示

实现了注册、登录功能

实现了保存markdown笔记，并展示为html页面的功能

实现了匿名留言功能

笔记列表和留言页面实现了分页功能

匿名登录功能还有一定问题，无法正确识别用户ip

## 使用方法
安装必要依赖

`npm install`

在3222端口启动开发环境

`npm run dev`

在3123端口启动后端服务

`npm start`

打包前端文件，打包后会生成一个dist文件夹用于存放静态资源，入口文件index.ejs生成于views文件夹下

`npm run build`


数据库请自行建立，并在server\models\ConnPools.js中修改相应信息，使用的table可以参考mysql.txt