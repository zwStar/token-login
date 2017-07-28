<template>
    <div class="register-container">
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
            <h3 class="title">注册</h3>
            <el-form-item prop="email">
                <el-input name="email" type="text" v-model="registerForm.email" autoComplete="on"
                          placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input name="password" type="password" v-model="registerForm.password"
                          placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input name="password" type="password" @keyup.enter="handleRegister"
                          v-model="registerForm.checkPassword"
                          placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="margin-right:50px;" @click.prevent="handleRegister">
                    注册
                </el-button>
                <router-link to="/register">
                    <el-button type="">登录</el-button>
                </router-link>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import * as api from "../api"

    import {isEmail} from '../utils/validate.js'

    export default{
        name: "register",
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
            let checkPasswordAgain = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('再次输入密码不能为空!'))
                } else if (value !== this.registerForm.password) {
                    return callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerForm: {
                    email: "",
                    password: "",
                    checkPassword: ""
                },
                registerRules: {
                    email: [
                        {required: true, trigger: 'blur', validator: validateEmail},
                    ],
                    password: [
                        {required: true, trigger: 'blur', validator: validatePass}
                    ],
                    checkPassword: [
                        {validator: checkPasswordAgain, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleRegister(){
                const _this = this;
                let user = this.registerForm;
                let formData = {
                    email: user.email,
                    password: user.password
                };
                // 表单验证
                this.$refs['registerForm'].validate((valid) => {
                    if (valid) {
                        api._post({
                            url: 'user/register',    //后端请求注册接口
                            data: formData           //邮箱和密码
                        }).then(res => {
                            console.log(res)
                            _this.$router.push('/login');    //路由跳转到首页
                        })
                            .catch(err => {
                                console.log(err);
                                this.$message.error(`${err.message}`)
                            })
                    } else {
                        this.$message.error('表单验证失败!')
                        return false;
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style> 