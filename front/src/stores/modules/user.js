/**
 * Created by 郭泽伟 on 2017/7/27.
 */
import Cookies from 'js-cookie';
import * as api from '../../api'
const user = {
    state: {
        token: Cookies.get('Admin-Token'),
        email: ""
    },
    mutations: {
        SET_TOKEN(state, token){
            state.token = token;
        }
    },
    actions: {
        // 邮箱登录
        UserLogin({commit}, response) {
            let data = JSON.parse(response);
            const email = data.data.email.trim();
            Cookies.set('Admin-Token', data.data.token);
            commit('SET_TOKEN', data.data.token);
        },
        GetInfo({commit}, state){
            api._get({
                url: "/userInfo",
                data: {
                    token: state.token
                }
            }).then((response) => {

            })
        }

    }
};
export default user