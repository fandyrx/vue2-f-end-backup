<template>
  <div>
    <TypeNav/>
    <ListContain/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
   
    <Brand/>
  
  </div>
</template>



<script>
import ListContain from "./ListContain";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from '@/pages/Home/Like';
import Floor from "@/pages/Home/Floor";
import Brand from '@/pages/Home/Brand'


import {mapState} from 'vuex';

export default {
  name:'Home',
  components:{
    ListContain,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch("getFloorList")
    this.$store.dispatch("getUserInfo")
   
  },
  computed:{
      ...mapState({
        floorList:state=>state.home.floorList
      })
  }
  
}
</script>

<style>

</style>