<template>
    <div>
        <h3>{{email}}欢迎你</h3>
    </div>
</template>

<script>
    import * as api from '../api'
    export default{
        data(){
            return {
                email:""
            }
        },
        created(){  //下面只是为了调用后端接口测试token是否存在或者是否过期  在业务中 用户每操作一个板块 如果需要权限 后端会自动验证
                    //比如发文章请求 后端路由为     router.get("/addArticle",$.checkToken, Admin.article.addArticle)
                    // 这里首先会进入$.checkToken 检查权限  如果可以再next 调用Admin.article.addArticle
            /*********************************************/
            const _this = this;
            api._get({
                url:"/",
                data:{}
            }).then((response)=>{
                console.log(response.data);
                var data = JSON.parse(response.data);
                if(!data.data.success){
                    _this.$router.push({path:"/login"});
                    _this.$message.error("登录过期");
                }else{
                    console.log(response);
                }
            });
            /*******************************************/
            let email = localStorage.getItem("email") || "";  //获得email
            this.email = email;
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
