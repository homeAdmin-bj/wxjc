<template>
  <el-tree
    :data="defaultValue"
    :props="defaultProps"
    @node-click="handleNodeClick"
  ></el-tree>
</template>

<script>
import http from './../../unit/httpServer';
export default {
  //props:["defaultValue"],
  data() {
    return {
      defaultValue:[],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  mounted() {
    var vm = this;
    //获取单位树
    http.fetchPost('/web/control/getDeptTree').then(res=>{
        console.log(res);
        if(res.data.errCode==0){
          vm.defaultValue=res.data.list;
          vm.$emit('selectOne',vm.defaultValue[0])
        }
      })
  },
  methods: {
    handleNodeClick(data) {
      var vm = this;
      console.log(data);
      vm.$emit('selectOne',data)
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
