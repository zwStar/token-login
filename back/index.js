/**
 * Created by admin on 2017/7/27.
 */
const express = require('express')
const bodyParser = require('body-parser');          //解析请求参数
const models= require('./models')               //models各种数据和数据处理方法
const routers = require("./routers");              //路由
const $  = require("./utils/config")
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//设置跨域
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin',      $.allowOrigin);
    res.header('Access-Control-Allow-Methods',     'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers',     'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/api/admin',routers.admin);    //请求路由

//连接mongo数据库
models.connect();

console.log('===================================');
console.log('Token-backend SERVICES START AT');
console.log('====================================');

app.listen(3000);   //监听3000端口