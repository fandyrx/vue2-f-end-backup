<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1"  @click="$emit('getInfo',pageNo -1)">上一页</button>

    <button v-if="startNumAndEndNum.start > 1"  @click="$emit('getInfo',1)" > 1 </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>


<!-- 中 -->
    <button  v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="(page >=startNumAndEndNum.start)"  @click="$emit('getInfo',page)">{{page}}</button>
   
<!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage-1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage"  @click="$emit('getInfo',totalPage)">{{totalPage}}</button>
    <button  :disabled="pageNo == totalPage" @click="$emit('getInfo',pageNo +1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
    <h2>{{startNumAndEndNum}}</h2><h2>当前{{pageNo}}</h2>
  </div>

</template>

<script>
export default {
  name: "Test",
  props:[
    'pageNo', 'pageSize','total','continues'
  ],
  computed:{
    totalPage(){
      //总页数
      return  Math.ceil(this.total/this.pageSize);
    },
    startNumAndEndNum(){
      //结构赋值
      const {pageNo,totalPage,continues} = this;
      //计算中间组件，开始和结尾的数字
      let start = 0,end = 0;  
      // 特殊情况：1.当，总页数  <  持续页数 少 如： 共4页，中间持续页 5 
      if(totalPage < continues){
          start = 1;
          end = totalPage;
      }else{
        //正常情况，总页数> 持续页
          //当前页面数往左右+ - 持续页数/2，取整 parseint 取整数,parsefloat浮点数包括
         start = pageNo - parseInt(continues/2)
         end = pageNo + parseInt(continues/2)
      }
      //纠正bug
      //当前为1 到 continues/2 的数字时，start会为<1
      // pageNo      parseInt(continues/2)  当start<1 补位
      if(start < 1 ){
        start = 1;
        end = continues;
      }

      //末尾end > 最大页数totalpage  往前部位
      //continues    
      if(end > totalPage){
        //尾数比最大页数大
        end = totalPage;
        start = totalPage - continues +1
      }

      return {start,end}

      
      
    }

  }
};
</script>

// 样式
<style lang="less" scoped>
.pagination {
  text-align:center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
