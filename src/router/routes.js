//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detial from '@/pages/Detail'
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import pay from "@/pages/Pay"
import paySuccess from "@/pages/PaySuccess"

export default[
    {   
        name:'Pay',
        path:"/pay",
        component:pay,
        meta:{ isShow:true },
        beforeEnter:(to,from,next)=>{
            if(from.path == "/trade"){
                next()
            }else{
                next(false)
            }
        }
    },
    {   
        name:'Trade',
        path:"/trade",
        component:Trade,
        meta:{ isShow:true },
        beforeEnter:(to,from,next)=>{
            if(from.path == "/shopcart"){
                next();
            }else{
                next(false);
            }
        }
    },
    {   
        name:'ShopCart',
        path:"/ShopCart",
        component:ShopCart,
        meta:{ isShow:true }
    },
    {   
        name:'addcartsuccess',
        path:"/addcartsuccess",
        component:AddCartSuccess,
        meta:{ isShow:true }
    },
    {
        path:'/detail/:skuid',
        component:Detial,
        meta:{ isShow:true }

    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/search/:keyword?',
        component:Search,
        name:"Search",
        //name方法传参记得起名字
        // props:(route)=>{
        //     return {keyword:$route.params.keyword}
        // }
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/Register',
        component:Register
    },

    // 重定向，项目跑起来，指向
    {
        path:'*',
        redirect:'/home'
    }
]