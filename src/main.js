//这是入口文件，引入Vue，APP总组件，路由，并创建实例，render函数将App总组件挂载渲染到public的index.html页面。
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
//三级联动组件--全局组件
import TypeNav from '@/components/Type-nav';
import Pagination from '@/components/Pagination'

import test from "@/components/test"

import {MessageBox} from 'element-ui'
//第一个参数，全局组件名字，第二个参数，哪个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Pagination.name,Pagination);
Vue.component(test.name,test);
// Vue.component(Button.name,button);


import photo from '@/assets/1.jpg'

Vue.use(VueLazyload,{
  loading: photo

})

//elementUI 按需引入  挂载原型上 调用$使用对应方法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from '@/router';
//引入仓库
import store from '@/store'

import { reqCategoryList } from './api/index';

Vue.config.productionTip = false

import '@/mock/mockServe';
//因为数处需要，所以在入口文件引入样式
import 'swiper/css/swiper.css'

import * as API from "@/api"

new Vue({

  render: h => h(App),

  beforeCreate(){
    //全局事件总线  
    Vue.prototype.$bus= this;
    Vue.prototype.$API= API;
  },
//注册路由：键值kv一致，省略V,router小写的
  router,
//注册
  store
}).$mount('#app')
