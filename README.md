```
##components文件夹
放置  非路由组件
```
```
##·pages|views 文件夹 
放置  route components路由组件
```
```
##router 文件夹
放置配置的路由   route  键值对存在 key:value =>  

{  path:'/home',  component:Home }, 一个路由配置对象，路径，指向哪个路由组件。需要先引入组件。
//例子：创建 路由器 并向外 暴露 ，其中路由规则为数组，每个配置是个对象。
export default new VueRouter({
    routes:[{a},{b},{c}]
}

```
 
```
非路由组件，一般以标签展示<Header></Header>
路由组件， 以路由出口展示  <router-view> </router-view>

路由使用方法：
1.创建router路由器文件夹，路由组件pages|views 
1.pages|views中 创建路由组件。（展示区域）
2.router中 创建路由器，向外暴露。并且配置路由配置对象。（设定规则）
4.注册 （让别人能使用）
    入口文件main.js   Vue 创建实例时，添加router属性注册
    所有组件会有$route $router属性
    
    $route：一般获取路由信息，【路径，query,params等】
     $router：一般进行编程时导航进行路由跳转 【push|replace】
5.路由展示
<router-view></router-view>

6.路由跳转？
两种：Ⅰ.声明式导航router-link  
        <router-link to ='./Login'> 登录 </router-link>
        实质是 a 标签，需要有to属性 去往哪个路由组件
    Ⅱ.编程式导航 push|replace 

编程式导航：比声明式导航，可以做其他业务逻辑
    例子，搜索按钮，标签里绑定事件 @click=“goSearch” 
        然后在下方，添加methods回调,去往search组件
            goSearch(){
                this.$router.push("/search")
        }
```
``` 
##路由元信息
    --在路由   中设置meta:{xxxxx}
    --和path,component平级
    --路由需要配置对象，key不能随意写。

    ---根据$route，获取当前路由的信息，做一些判断，是否显示隐藏等
```
```
###路由传参
