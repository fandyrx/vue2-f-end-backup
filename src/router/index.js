import store from '@/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
//引入VueRouter插件  需要 Vue.use使用插件，所以先引入vue


import routes from "./routes"
Vue.use(VueRouter);
//插件使用Vue路由器


//vuerouter原型对象的push备份
let originPush = VueRouter.prototype.push;
let originReplace =VueRouter.prototype.replace;

//重写push|replace方法
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
};

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
};

//配置路由
// export default new VueRouter({})

let router =  new VueRouter({
    // routes:[{a},{b},{c}]
    routes,
    scrollBehavior(to,from,savedPosition){
        return{y:0};
    }
})

export default router;

router.beforeEach(async (to,from,next)=>{
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;

    if(token){
        //已登录去 login
        if(to.path=='/login'){
            next('/home')
        }else{
            //登录但不去login页面.用户名已有
            if(name){
                next();
            }else{
                //没用户信息
                try {
                    await  store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效
                  await  store.dispatch('userLogout')
                  next('/login')
                }
            }
    }
   }
   else{
    //未登录情况，晚些处理
    let toPath = to.path;
    if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 ||toPath.indexOf('/center') != -1){
    //  未登录,想去往的地址加入跳转路由
        next("/login?redirect="+toPath)
    }else{
        next()
    }
   }
})

