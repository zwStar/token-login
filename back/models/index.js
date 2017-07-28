/**
 * Created by admin on 2017/7/27.
 */
const  mongoose =  require('mongoose')
const  $ = require('../utils/config')
const admin = require("./admin/index")
let dbname = $.db;

module.exports = {
    connect: () => {
        mongoose.Promise = global.Promise;
        let options = {
            db: {native_parser: true},
            server: {poolSize: 5}
        }
        mongoose.connect(dbname, options).then(() => {
            console.log(`数据库连接成功`);
        }, (err) => {
            console.log(err);
            process.exit(1);        //终止当前进程并返回给定的 code。如果省略了 code，退出是会默认返回成功的状态码('success' code) 也就是 0：
                                    //参数1表示未捕获的致命异常
        });
    },
    admin
}