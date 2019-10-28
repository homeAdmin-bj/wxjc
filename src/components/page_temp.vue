<template>
  <div class="emgPage table_temp">
    <div class="total">Total:{{pageInfo.pageTotal}}</div>
    <el-pagination ref="pagination"
      class="pagination"
      background
      layout="prev,pager,next"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.pageTotal"
      :current-page="pageInfo.currentPage"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["pageInfo"],

  //   components: {},

  //   computed: {},

  mounted() {
    this.changeP();
  },
  updated() {
    this.changeP();
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.$emit("currentPage", val);
      this.changeP();
    },
    changeP() {
      this.$nextTick(() => {
        // const eleList = $(this.$refs.pagination.$children[1].$el).children(
        //   "li"
        // );
        // for (let index = 0; index < eleList.length; index++) {
        //   const element = eleList[index];
        //   if (element.className.split(" ").indexOf("number") != -1) {
        //     element.style["display"] = "inline-block";
        //   }
        // }
        // for (let index = 0; index < eleList.length; index++) {
        //   const element = eleList[index];
        //   if (element.className.split(" ").indexOf("btn-quicknext") != -1) {
        //     element.nextSibling.style["display"] = "none";
        //   }
        // }
      });
    }
  }
};
</script>
<style scoped>
.total {
  color: #000000;
  font-size: 16px;
}
</style>