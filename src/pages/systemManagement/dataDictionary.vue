<template>
  <div class="dataDictionary">
    <div class="main_title">
      <span>系统管理 > 数据字典</span>
    </div>
    <div style="margin:0 10px;background:#fff;">
      <div class="left_tree_style" style="height:calc(100vh - 90px)">
        <el-tree
          :data="roleList"
          :props="props"
          node-key="id"
          accordion
          :current-node-key="1"
          ref="role_tree"
          default-expand-all
          @node-click="getInfo"
          highlight-current>
        </el-tree>
      </div>
      <div class="right_tree_style" style="height:calc(100vh - 90px)">
        <div class="block">
          <el-tree
            :data="menuList"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span>
                <!-- <el-button
                  type="text"
                  size="mini"> -->
                  <span v-show="data.id>=0" style="color: #409EFF;" @click="addDept(node,data)">新增</span>
                <!-- </el-button> -->
                <!-- <el-button
                  type="text"
                  size="mini"> -->
                  <span v-show="data.id>=0" style="color: #409EFF;" @click="editDept(node,data)">编辑</span>
                <!-- </el-button> -->
                <!-- <el-button
                  type="text"
                  size="mini">   -->
                  <span v-show="data.id>=0" style="color: #409EFF;" @click="deleteDept(node,data)">删除</span>
                <!-- </el-button> -->
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
    <el-dialog
      title="机构"
      :visible.sync="dialogDept"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="450px">
      <div class="condition">
        <span class="span">机构名称：</span><input type="text" class="input" v-model="deptName"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="action_btn" style="margin:10px;">
          <input class="sure" value="保存" type="button" @click="deptEditSure"/>
          <input class="cancel" value="取消" type="button" @click="dialogDept = false"/>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import https from './../../unit/httpServer'
export default {
  data() {
    return {
      props: {
        children: 'children',
        label: 'name'
      },
      roleList:[{
        name:'数据字典维护',
        children:[
          {
            id:1,
            type:'dept',
            name:'组织机构'
          }
        ]
      }],
      menuList:[],
      dialogDept:false,
      // 组织机构标识符
      isAddNotEdit:true,
      deptName:'',
      deptId:'',
      deptPId:''
    }
  },
  created(){
    this.getOrganizationTree();
  },
  components: {    
  },
  methods: {
    // 获取组织机构树列表
    getOrganizationTree(){
      https.fetchPost('sys/deptMgr/showTree').then(res => {
        if(res.data.errCode == 0){
          this.menuList = [{
            id:0,
            name:'组织机构树',
            children:res.data.list
          }]
        }else{
          this.$message({
            type: 'error',
            message: res.data.errMsg
          });
        }
      })
    },
    // 新增组织机构单位
    addDept(node,data){
      this.dialogDept = true;
      this.deptName = '';
      this.isAddNotEdit = true;
      this.deptId = data.id;
    },
    // 编辑组织机构单位
    editDept(node,data){
      this.dialogDept = true;
      this.deptName = data.name;
      this.isAddNotEdit = false;
      this.deptId = data.id;
      this.deptPId = data.pid;
    },
    // 删除组织机构单位
    deleteDept(node,data){
      this.$confirm('此操作将删除该组织机构，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center:true,
        type: 'warning'
      }).then(() => {
        https.fetchPost('sys/deptMgr/delete',{id:data.id}).then(res => {
          if(res.data.errCode == 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.getOrganizationTree();
          }else{
            this.$message({
              type: 'error',
              message: res.data.errMsg
            });
          }
        })
      }).catch(()=>{
          
      })
    },
    // 确认新增编辑组织机构单位
    deptEditSure(){
      if(this.deptName == ''||this.deptName == undefined){
        this.$message({
          type: 'info',
          message: '请输入机构名称'
        });
        return;
      }
      this.dialogDept = false;
      if(this.isAddNotEdit == true){
        // 新增
        https.fetchPost('sys/deptMgr/add',{pid:this.deptId,name:this.deptName}).then(res => {
          if(res.data.errCode == 0) {
            this.$message({
              type: 'success',
              message: '保存成功'
            });
            this.getOrganizationTree();
          }else{
            this.$message({
              type: 'error',
              message: res.data.errMsg
            });
          }
        })
      }else{
        // 编辑
        https.fetchPost('sys/deptMgr/update',{id:this.deptId,name:this.deptName,pid:this.deptPId}).then(res => {
          if(res.data.errCode == 0) {
            this.$message({
              type: 'success',
              message: '保存成功'
            });
            this.getOrganizationTree();
          }else{
            this.$message({
              type: 'error',
              message: res.data.errMsg
            });
          }
        })
      }
    },
    // 点击数据字典维护，展示对应的界面
    getInfo(data){
      // if(data.type){
      //   this.type = data.type;
      // }
      this.getOrganizationTree();
    }
  }
}
</script>
<style scoped>
  * {
    white-space: nowrap;
  }
  .dataDictionary { 
    background: #e4ebf0;
    height: calc(100vh - 50px);
    box-sizing: border-box;
    padding-bottom:10px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 18px;
  }
  .plan_input {
    width:314px;
    height:30px;
    line-height: 30px;
    font-size: 14px;
    font-family: MicrosoftYaHel;
    background: #f4f4f4;
    border:1px solid #d9d9d9;
    color: #222222;
    outline: none;
    padding:0 10px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 1000px) {
    .plan_input {
      width: 220px;
    }
  }
</style>