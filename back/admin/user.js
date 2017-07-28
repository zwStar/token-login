/**
 * Created by admin on 2017/7/27.
 */
const Base = require('./base')
const Models = require("../models")
const $ = require('../utils')

const UserModel = Models.admin.UserModel;

let UserAPI = new Base({
    model: UserModel
});


UserAPI.methods.login = function (req, res, next) {     //注册
    let LoginPromise = UserModel.find({"email": req.body.email, "password": $.md5(req.body.password)});    //返回一个promise对象

    LoginPromise.then((documents) => {
        if (!documents) {                        //如果为空 登录失败 返回login failed

            return $.result(res, 'login failed');
        }
        //登录成功
        let email = documents.email;
        return $.result(res, {success: true, "message": "登录成功", email: email, token: $.createToken(email)});           //返回
    })
};

UserAPI.methods.register = function (req, res, next) {      //登录
    const {error, value} = $.paramter.validate(req.body, $.paramter.object().keys({     //验证邮箱和密码 防止用户跳过前端验证
        email: $.paramter.string().regex(/^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@[0-9a-z]+\.com$/i),
        password: $.paramter.string().min(6)
    }));
    //验证不通过
    if (error)
        return $.result(res, 'login failed,params error!');
    //检测用户是否存在
    let isExitPromise = UserModel.find({
        email: req.body.email
    });
    isExitPromise.then((docs) => {
        if (!docs) {    //如果不存在 进行注册
            let registerPromise = UserModel.create({
                email: req.body.email,
                password: $.md5(req.body.password)  //MD5对密码加密
            });
            registerPromise.then((docs) => {
                if (docs) {
                    return $.result(res, {
                        success: true
                    })
                }
            })
        } else {
            return $.result(res, {
                success: false,
                msg: "该用户已经存在"
            })
        }
    })
};

module.exports = UserAPI.methods;
