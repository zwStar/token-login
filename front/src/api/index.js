/**
 * Created by 郭泽伟 on 2017/7/27.
 */
/**
 * Created by admin on 2017/7/27.
 */

const base_url = 'http://127.0.0.1:3000/api/admin'

const axios = require('axios').create({
    baseURL: base_url,
    timeout: 1000,
    withCredentials: true,      //允许跨域cookie
    headers: {"X-Requested-With": "XMLHttpRequest"},
    transformResponse: [function (data) {

        return data;
    }]
});

//get请求
export const _get = (req) =>{
    return axios.get(req.url,{params:req.data});
};

//post请求
export const _post = (req) => {
    console.log(req);
    return axios({method:'post',url:`/${req.url}`,data:req.data});
};
