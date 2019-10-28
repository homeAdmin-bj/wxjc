<template>
    <div id="rcstManage" >
      <div class='title'>
        拨测用户管理 > 卫星终端
      </div>
       <div class="body_box">
         <el-form
            :model="form"
            
            label-width="100px"
            size="mini"
          >
            <el-form-item label="添加人员：">
              <el-tree
                :data="form.defaultValue"
                :props="defaultProps"
                node-key='id'
                ref="tree"
                show-checkbox
                @check='handleCheck'
                @node-click="handleNodeClick"
              ></el-tree>
            </el-form-item>
            
            <el-form-item>
              <el-button @click="submitForm()" round style="border:1px solid #0978bc;color:#0978bc;margin-left:130px">保存</el-button>
              <el-button @click="resetForm()" round style="border:1px solid #0978bc;color:#0978bc">取消</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>

</template>
<script>
import http from "./../../unit/httpServer";
export default {
  props:['groupId'],
  data() {
    return {
      idList:[],//用于存放所选节点id
      form: {
        defaultValue:[]
      },
      netType:2,
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  mounted() {
    var vm = this;
    http.fetchPost("/dialing/commonControl/getDeptTestUser",{
        netType:vm.netType
      }).then(res => {
        console.log(res);
        if (res.data.errCode == 0) {
          vm.form.defaultValue = res.data.list;
          vm.$refs.tree.setCheckedKeys([]);
        }
      });
  },  
  
  methods: {
    submitForm() {
      var vm = this;
      http.fetchPost("/dialing/testGroup/saveEcUserToGroup",{
            groupId:vm.groupId,
            uids:vm.idList.toString(),
          }).then(res => {
            console.log(res);
            if (res.data.errCode == 0) {
              vm.$emit('addIdsToGroup');
            }
          });
    },
    resetForm() {
      this.$refs.tree.setCheckedKeys([]);
      this.$emit('addIdsToGroup');
    },
    handleCheck(e,tree,t){
      var vm = this;
     
      vm.idList=tree.checkedKeys.filter(o=>{
        return o<Math.pow(2,32);
      });
     
    },
    handleNodeClick(data,node) {
      var vm = this;
    }
  }
};
</script>
<style scoped>
#rcstManage {
  position: relative;
  height: 100%;
  width: 100%;
  font-family: "Microsoft YaHei";
  font-size: 12px;
}
.title {
  position: absolute;
  top: 0;
  left: 0px;
  height: 30px;
  width: 100%;
  padding-left: 10px;
  z-index: 1000;
  line-height: 30px;
  color: #333;
  background: #e4ebf0;
  box-sizing: border-box;
}
.body_box{
  width: 500px;
  position: absolute;
  top: 50px;
  left: 50%;
  margin-left: -250px;
}
</style>

