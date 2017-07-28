/**
 * Created by admin on 2017/7/27.
 */
const express = require('express');
const Admin = require( '../admin')
const router      = express.Router();
const $ = require("../utils");

router.post("/user/register",Admin.User.register);  //注册请求
router.post("/user/login",Admin.User.login); //登录请求
router.get('/',$.checkToken);    //暂无其它业务 这里只为测试 token

module.exports = router;

