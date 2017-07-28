/**
 * Created by admin on 2017/7/27.
 */
import Vue from 'vue'
import Router from 'vue-router'

import Index from '../view/Index.vue'       //主页组件
import Login from '../view/Login.vue'       //登录组件
import Register from '../view/Register.vue' //注册组件

Vue.use(Router);

const routes = [
    {
        path: "/", component: Index
    },
    {
        path: "/login", component: Login
    }, {
        path: "/register", component: Register
    }, {

        path: "*", redirect: "/login"
    }
]

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: routes
});