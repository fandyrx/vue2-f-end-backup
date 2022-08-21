import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import home from '@/store/home'
import search from '@/store/search'
import detail from "@/store/detail"
import shopcar from "@/store/shopcar/shopcar"
import user from "@/store/user"
import trade from "@/store/trade"
//引入需要暴露Vue.Store类的实例

export default new Vuex.Store({  
    modules:{
        home,
        search,
        detail,
        shopcar,
        user,
        trade
    }
})

