<template>
    <div class="login-container">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="email">
                <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input name="password" type="password" @keyup.enter="handleLogin" v-model="loginForm.password"
                          placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="margin-right:50px;" @click.prevent="handleLogin">
                    登录
                </el-button>
                <router-link to="/register">
                    <el-button type="">注册</el-button>
                </router-link>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import * as api from "../api"

    import {isEmail} from '../utils/validate.js'        //验证是否为邮箱

    export default{
        name: 'login',
        data(){
            let validateEmail = (rule, value, callback) => {
                if (!isEmail(value)) {
                    callback(new Error('请输入正确的合法邮箱'));
                } else {
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else {
                    callback();
                }
            };
            return {
                loginForm:{
                    email:"",
                    password:""
                },
                loginRules: {
                    email: [
                        { required: true, trigger: 'blur', validator: validateEmail }
                    ],
                    password: [
                        { required: true, trigger: 'blur', validator: validatePass }
                    ]
                },
            }
        },
        methods:{
            handleLogin(){
                const _this = this;
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        api._post({
                            url:"user/login",           //请求登录接口
                            data:_this.loginForm
                        }).then((results)=>{
                            this.$store.dispatch('UserLogin', results.data);    //用vuex store存放token
                            alert( _this.loginForm.email)
                            localStorage.setItem('email', _this.loginForm.email);   //把邮箱号保存到localStorage
                            _this.$router.push('/');    //路由跳转到首页
                        }).catch((err)=>{
                            console.log(err);
                            _this.$message.error("账号有误");
                        })
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login-container{
        width: 500px;
        margin:100px auto;
    }
h3{
    text-align: center;
}
</style> 