<template>
  <div style="position:relative">
    <div class="addtitle">
      <i
        class='fa fa-caret-down'
        style="color:#ccc;margin-right:5px"
      />
      自定义分组</div>
    <div
      class="addBtn"
      @click="addMenu"
    >
      <i
        class="fa fa-plus"
        style="color:#0978bc"
      ></i>
      添加组
    </div>
    <ul class="ulList">
      <li v-for="(g,index) in group"  :key="index" :class="{'liactive':activeId==index}" ><span @click="searchGroup(g,index)" class='searchGroup'>{{g.name}}</span> <span @click="deleteGroup(g)" class='deleteGroup'>删除</span> </li>
    </ul>
    <el-dialog
      title="添加分组"
      :visible.sync="dialogFormVisible"
      width='400px'
      custom-class='addGroupBox'
    >
      <el-form 
      :model="form" 
      :rules ='rules' 
      
      ref="ruleForm"
      size="mini">
        <el-form-item
          label="分组名"
          label-width="80px"
          prop="name"
        >
          <el-input
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="选择人员"
          label-width="80px"
        >
          <el-tree
            :data="form.defaultValue"
            :props="defaultProps"
            node-key='id'
            show-checkbox
            @check='handleCheck'
            @node-click="handleNodeClick"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button size="mini"
          @click="saveGroup"
          round
          style="border:1px solid #0978bc;color:#0978bc;margin-left:130px"
        >保存</el-button>
        <el-button size="mini"
          @click="dialogFormVisible = false"
          round
          style="border:1px solid #0978bc;color:#0978bc"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from "./../../unit/httpServer";
// import _ from 'lodash'
export default {
  data() {
    return {
      activeId:0,//自定义分组加背景的id
      // 存放自定义分组数据
      group:[],
      idList:[],//用于存放所选节点id
      form: {
        name: null,
        defaultValue:[]
      },
      rules: {
        "name": [
          { required: true, message: "请输入分组名称", trigger: "blur" }
        ]
      },
      netType:1,
      dialogFormVisible: false,
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  mounted() {
    var vm = this;
    //获取单位-用户树
    http.fetchPost("/dialing/commonControl/getDeptTestUser",{
      netType:vm.netType
    }).then(res => {
      console.log(res);
      if (res.data.errCode == 0) {
        vm.form.defaultValue = res.data.list;
      }
    });
    //获取自定义分组
    vm.getGroup();
  },
  methods: {
    //获取自定义分组
    getGroup(){
      var vm = this;
      http.fetchPost("/dialing/testGroup/selectEcTestGroups",{
        netType:vm.netType
      }).then(res => {
        console.log(res);
        if (res.data.errCode == 0) {
          vm.group = res.data.list;
          console.log(vm.group[0]);
          this.$emit('getListByGroupId',vm.group[0].id);
        }
      });
    },
    //查看当前分组
    searchGroup(g,index){
      this.activeId=index;
      this.$emit('getListByGroupId',g.id);
    },
    //删除当前分组
    deleteGroup(g){
      var vm = this;
      console.log(g);
      vm.$confirm("是否要删除该分组！！！", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: '取消',
                  type: "warning",
                  callback: action => {
                    console.log("action", action);
                    if(action=='confirm'){
                      http.fetchPost("/dialing/testGroup/deleteById",{
                        id:g.id
                      }).then(res => {
                        console.log(res);
                        if (res.data.errCode == 0) {
                          vm.getGroup();
                        }
                      });
                    }else{
                       return;
                    }
                  }
                });
      
    },
    handleCheck(e,tree,t){
      var vm = this;
      console.log(e);
      console.log(tree);
      vm.idList=tree.checkedKeys.filter(o=>{
        return o<Math.pow(2,32);
      });
      console.log(vm.idList);
    },
    saveGroup(){
      var vm = this;
      vm.$refs['ruleForm'].validate((valid) => {
          if (valid) {
           http.fetchPost("/dialing/testGroup/saveEcTestGroup",{
              name:vm.form.name,
              netType:vm.netType,
              testUserIds:vm.idList.toString()
            }).then(res => {
              console.log(res);
              if (res.data.errCode == 0) {
                vm.$confirm("已成功分组！！！", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: '取消',
                  type: "warning",
                  callback: action => {
                    console.log("action", action);
                    vm.dialogFormVisible = false;
                    vm.getGroup();
                    return;
                  }
                });
                
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });  
    },
    addMenu(e) {
      this.dialogFormVisible=true;
      this.$emit("addMenu");
    },
    handleNodeClick(data,node) {
      var vm = this;
      console.log(data);
      console.log(node);
      //vm.idList=
    }
  },
  components: {}
};
</script>

<style scoped>

.addtitle {
  letter-spacing: 1px;
  font-size: 14px;
  height: 26px;
  line-height: 26px;
}
.addBtn {
  position: absolute;
  top: 0;
  right: 10px;
  width: 78px;
  height: 26px;
  border: 1px solid #0978bc;
  box-sizing: border-box;
  text-align: center;
  line-height: 24px;
  color: #0978bc;
  cursor: pointer;
}
ul,li{
  list-style: none
}
ul{
  padding-top:8px;
}
ul li{
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 20px;
}
ul li.liactive{
  background: #e4e4e4;
}
ul li span.searchGroup{
  cursor: pointer;
}
ul li span.deleteGroup{
  float: right;
  margin-right: 20px;
  font-size: 12px;
  color:#0978bc;
  cursor: pointer;
}
</style>
