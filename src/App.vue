<template>
  <div>
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 路由组件的出口 -->
    <router-view></router-view>
    <!-- 底部组件 -->
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
     this.$store.dispatch("categoryList");
     //派发ation,请求三级列表数据 放原位会多次触发
  },
};
</script>

<style>

</style>
