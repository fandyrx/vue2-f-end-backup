<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
    <transition name = 'sort'>
    
        <div class="sort" v-show="show">
          <!-- 利用事件委派+编程时导航实现路由的跳转与传递参数 -->
          <div class="all-sort-list2" @click="goSearch">
            <div class="item bo" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{ cur: currentIndex == index }">
              <h3 @mouseenter="changeIndex(index)">
                <!-- a 添加 c1(一级标签)的name  -->
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
    </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash' //全部引入
import throttle from "lodash/throttle";

import { mapState } from "vuex";
//main.js入口文件  注册 成全局组件，因为多个地方都要用到
export default {
  name: "TypeNav",
  data() {
    return { currentIndex: -1, 
    show: true };
  },

  //挂载完毕，发送请求，存储在仓库
  mounted() {
    // this.$store.dispatch("categoryList");

    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，使用计算属性时，会立即执行一次
      //注入一个state参数，其实为大仓库的数据{home,search}
      categoryList: (state) => {
        // 大仓库中，home中储存的 categorylist 的值
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // changeIndex(index){
    //     this.currentIndex = index;
    // },
    // leaveIndex(){
    //   this.currentIndex = -1;
    // }  es6写法，无法加lodash 的节流函数
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }),

    leaveIndex: function () {
      this.currentIndex = -1;
     if(this.$route.path != "/home"){
        this.show = false;
      //鼠标离开 消失
     }
      
    },
      goSearch(event) {
      //子节点 当中a标签加自定义属性:data-categoryName  其他节点没有。解决了确定点击的是a标签

      //获取触发事件的节点  带有自定义属性的一定是a标签
      let element = event.target;

      // console.log(element.dataset);
      //节点的dataset属性，可以获取节点的自定义属性与属性值 是对象,解构赋值
      //自定义属性在浏览器会自动转换为全部小写
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      //如果标签含有categoryname一定是a标签
      if (categoryname) {
        let location = { name: "Search" };
        //跳转到search
        let query = { categoryName: categoryname };
        //query 参数， 等于当前的name
        if (category1id) {
          //第一级name 时，c1.id传入 query 新增属性category1Id
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        if(this.$route.params){
          //如果由params参数，一起传递
             location.params  = this.$route.params
             //整合两个对象
        location.query = query;
        
        this.$router.push(location); //跳转+传参
        }
       
      }
    },
    //鼠标移入，分类列表展示
    enterShow(){
      this.show = true;
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    .sort-enter{
      
        height: 0px;
    }
     .sort-enter-to{
        height: 461px;
      }
    .sort-enter-active{
      transition: all 0.5s linear;
    }
    }
  }

</style>
