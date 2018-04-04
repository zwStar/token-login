# token-login
  一个基于vue+node+mongodb实现的Jsonwebtoken简单登录功能<br>
  该项目只有简单的实现登录功能，可以在此基础上继续开发新的业务<br>


##什么是 JWT?<br>
    JWT本质上它是一段签名的 JSON 格式的数据。由于它是带有签名的，因此接收者便可以验证它的真实性。同时由于它是 JSON 格式的因此它的体积也很小。<br>

##为什么不用session而用JWT的原因？<br>
  使用独立登录系统的时候，一般说来，大型应用会把授权的逻辑与用户信息的相关逻辑独立成一个应用，称为用户中心。用户中心不处理业务逻辑，只是处理用户信息的管理以及授权给第三方应用。第三方应用需要登录的时候，则把用户的登录请求转发给用户中心进行处理，用户处理完毕返回凭证，第三方应用验证凭证，通过后就登录用户。<br>
例如这种情况下，用户信息和业务逻辑是分开在2台服务器之上，假设服务器A存放用户信息，服务器B存放业务逻辑，如果采用session存储登录状态，用户登录时在服务器A上验证成功，A服务器保存了session，可是用户接下来的操作是在服务器B上进行，服务器B怎么此时没有session怎么进行判断是哪个用户呢，这种情况下利用session就不是那么方便了。<br>
##基于token的鉴权机制<br>
  基于token的鉴权机制类似于http协议也是无状态的，它不需要在服务端去保留用户的认证信息或者会话信息。这就意味着基于token认证机制的应用不需要去考虑用户在哪一台服务器登录了<br>
##用jwt的流程是这样的<br>
  1.用户向服务器A请求登录验证<br>
  2.服务器进行验证用户的信息<br>
```
let {email,password} = req.body;
let LoginPromise = UserModel.find({"email": email, "password": $.md5(password)});  //返回一个promise对象
 //如果验证成功 利用jsonwebtoken生成token
    module.exports.createToken = function (email) { //创建Token
          const token = jwt.sign({
                  email
              },
              'secret', {
                  expiresIn: '10s' // 过期时间 这里只设置10s
              });
          return token;
    };
```
3.客户端接受token 把token存放到cookie里面
```
 Cookies.set('Admin-Token', data.data.token);
```
 
4.用户向服务器B进行业务操作 就会携带该token
5.服务器B通过请求头获取token
```
module.exports.checkToken = function (req, res, next) { //从请求cookie中 检查token的状态信息<br>
    let re = /Admin-Token=(.+)/;
    let token = req.headers.cookie.match(re)[1];    //从cookie中提取出token
    let decoded = jwt.verify(token, 'secret', function (err, decoded) { //jwt解析
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
```
接下来就可以继续操作业务

#项目运用到的板块
Vue.js 2+ (Vue-router vuex axios)<br>
Element UI<br>
Node.js <br>
Mongoose<br>
Jsonwebtoken<br>
joi		//后端表单验证
blueimp-md5	//密码md5加密






#运行该项目<br>
## clone project<br>
git clone<br>
#运行mongod 该项目利用mongod数据库 要运行后端得先启动mongod<br>

cd back<br>
npm install<br>
node index.js 启动后端<br>

cd front<br>
npm install <br>
npm run dev 启动前端项目<br>




##LICENSE<br>
MIT<br>































