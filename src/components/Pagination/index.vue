<template>
  <div class="pagination">
   
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <!-- 根据中间部分，计算出来start数字决定是否显示 -->
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)"  :class="{active:pageNo == 1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">...</button>

    <!-- 中间continues -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{active:pageNo == page}"
    >
      {{ page }}
    </button>

    <!-- 下方 根据中间的end -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <!-- end 比总页数少1 例如，总页数31，end 要 30-2 才需要显示出来  -->
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)" :class="{active:pageNo == totalPage}">
      {{ totalPage }}
    </button>
    <!-- 总页数比end  要少才需要显示，跟上的1 同理 -->
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      //总页数
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      let start = 0,
        end = 0;
      //总页数比连续页数少
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        //正常，总页数totalPage > 连续页码 continues
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }
      //纠正
      //start为0 或者负数时 开始为1，结束为continues
      if (start < 1) {
        start = 1;
        end = continues;
      }
      //end 大于总页数，纠正
      if (end > totalPage) {
        start = totalPage - continues + 1;
        end = totalPage;
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
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
.active {
  background-color: skyblue;
}
</style>
