import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';             //引入element-ui
import 'element-ui/lib/theme-default/index.css';


Vue.use(ElementUI);
import router from './routers'
import store from './stores'


router.beforeEach((to, from, next) => {
    if (store.getters.token) {          //根据token判断是否登录
        next();
    }else{                              //如果未登录 跳转到登录页面
       if(to.path === '/login' || to.path === '/register'){        //如果是登录界面 不用再跳转 直接next();
           next();
       }else{
           next({path:"/login"});
       }
    }
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
