<template>
  <div>
    <el-table-column :prop="item.prop"
      :label="item.label"
      v-for="(item, index) in tableList"
      :key="index"
      show-overflow-tooltip
      :row-key="index"
      :width="item.width">
      <template slot-scope="scope">
        <span v-if="item.prop == 'taskState1'"
          v-bind:class="[changeColor(item.prop,scope.row[item.prop]),'tableItemTitle','tableItemState']">{{changeText(item.prop,scope.row[item.prop])}}</span>
        <div v-bind:style="[item.style?item.style:'']"
          v-if="!(item.prop == 'taskState1')"
          class="tableItemTitle"
          >{{scope.row[item.prop]}}</div>
      </template>
    </el-table-column>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["tableList"],
  methods: {
    changeColor(p, c) {
      if (p == "taskState1") {
        switch (c) {
          case "taskState3":
            return "tableItemState3";
            break;
          case "taskState2":
            return "tableItemState2";
            break;
          case "taskState1":
            return "tableItemState1";
            break;
          case "taskState0":
            return "tableItemState0";
            break;
        }
      }
    },
    changeText(p, c) {
      if (p == "taskState1") {
        switch (c) {
          case "taskState3":
            return "暂停";
            break;
          case "taskState1":
            return "执行中";
            break;
          case "taskState2":
            return "已完成";
            break;
          case "taskState0":
            return "未执行";
            break;
        }
      }
    }
  }
};
</script>
<style scoped>
.tableItemTitle {
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  /* white-space: nowrap; */
}
.tableItemState {
  display: inline-block;
  border-radius: 15px;
  height: 30px;
  width: 76px;
  line-height: 30px;
  color: #fff;
  vertical-align: middle;
}
.tableItemState2 {
  background-color: #42a986;
}
.tableItemState0 {
  background-color: #ef5a76;
}
.tableItemState1 {
  background-color: #e9875c;
}
.tableItemState3 {
  background-color: #0978bc;
}
</style>