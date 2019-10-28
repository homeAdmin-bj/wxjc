<template>
  <div>
    <el-table-column
      v-for="(item, index) in tableHeadData"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :row-key="index"
      :width="item.width" show-overflow-tooltip>
    </el-table-column>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ["tableHeadData"],
  mounted () {
    console.log(this.tableHeadData);
  },
  methods: {

  }
}
</script>
<style scoped>

</style>

