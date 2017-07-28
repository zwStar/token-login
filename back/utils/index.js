/**
 * Created by admin on 2017/7/27.
 */
const joi = require('joi');               //后端检验规则
const md5 = require("blueimp-md5");     //MD5加密
const jwt = require("jsonwebtoken");    //jwt

module.exports.paramter = joi       //后台的注册信息验证

function result(res, data, msg, status) {
    let redata = {};
    if (typeof data === 'string' ||
        data === 'null' ||
        data === undefined ||
        data === null || msg) {
        status = status || 400;
        redata = {
            msg: data,
            data: {}
        };
    } else {
        status = status || 200;
        redata = {
            msg: '',
            data: data
        };
    }
    res.status(status).send(redata);
};




//用于返回到前端结果函数
module.exports.result = result;

module.exports.md5 = function (str) {
    return md5(str);
}

module.exports.createToken = function (email) { //创建Token
    const token = jwt.sign({
            email
        },
        'secret', {
            expiresIn: '10s' // 过期时间 这里只设置10s
        });
    console.log(token);
    return token;
};


module.exports.checkToken = function (req, res, next) { //从请求cookie中 检查token的状态信息
    let re = /Admin-Token=(.+)/;
    let token = req.headers.cookie.match(re)[1];    //从cookie中提取出token
    console.log(token);
    let decoded = jwt.verify(token, 'secret', function (err, decoded) { //token解析
        if (err) {
            console.log(err);
            if (err.message === "jwt expored") {
                return result(res, {success:false, msg:'token过期，请重新登录'});
            }
            return result(res, {error: "登录信息有误"});
        }

        return result(res, {success:true, msg:'token 正确'});
        //console.log(decoded)；     //获取信息 进行下一步操作
        //next();
    });
};