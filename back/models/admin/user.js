/**
 * Created by admin on 2017/7/27.
 */
const  Base = require( '../base');

const User = new Base('User', {
    email: String,
    password: String,           //密码
});


module.exports =  User.methods;