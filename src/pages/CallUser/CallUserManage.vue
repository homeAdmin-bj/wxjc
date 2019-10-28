<template>
  <div style="width:100%;height:100%;position:relative">
    <div id="CallUserManage" v-show="showString=='Manage'">
      <div class='title'>
        拨测用户管理 > 应急联系人管理
      </div>
      <div class='leftbar'>
        <tab
          style="margin-left:10px;margin-top:10px"
        ></tab>
        <tree
          v-if="!isCommon"
          @selectOne="selectOne"
          style="margin-top:10px"
        ></tree>
        <common-box
          v-if="isCommon"
          @addMenu='addCommonGroup'
          @getListByGroupId='getListByGroupId'
          style="margin-left:10px;margin-top:15px"
        ></common-box>
      </div>
      <div class="rightMainbox">
        <div class="rightMainboxTop">
          <div style="margin-top:15px;overflow:hidden;margin-bottom:20px">
            <div style="width:380px;height:30px;line-height:30px;float:left;margin-left:20px">
              <span style="display:inline-block;width:96px;text-align:right">姓名：</span>
              <el-input
                size="mini"
                v-model="name"
                class='inputBox'
                type="text"
              ></el-input>
            </div>
            <div
              v-if="isCommon"
              style="width:380px;height:30px;line-height:30px;float:left;margin-left:20px"
            >
              <span style="display:inline-block;width:96px;text-align:right">所属单位：</span>
              <el-input
                size="mini"
                v-model="dept"
                class='inputBox'
                type="text"
              ></el-input>
            </div>
            <el-button
              round
              size="mini"
              type="primary"
              style="margin-left:40px;background:#0978bc"
              @click="search"
            >
              查询
            </el-button>
            <el-button
              round
              size="mini"
              style="margin-left:15px;border:1px solid #0978bc;color:#0978bc"
              @click="reset"
            >
              重置
            </el-button>
          </div>

        </div>
        <div class="rightMainboxBottom tableStyle">
          <div style="margin-top:10px;overflow:hidden;margin-bottom:10px">
            <el-button
              v-if="!isCommon"
              round
              size="mini"
              style="margin-left:20px;float:right;border:1px solid #0978bc;color:#0978bc"
            >
              导入
            </el-button>
            <el-button
              v-if="!isCommon"
              round
              size="mini"
              style="margin-left:20px;float:right;border:1px solid #0978bc;color:#0978bc"
            >
              导出
            </el-button>
            <el-button
              round
              size="mini"
              style="float:right;border:1px solid #0978bc;color:#0978bc"
              @click="manageAdd"
            >
              新增
            </el-button>
          </div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              prop="index"
              label="序号"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
            >
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
            >
            </el-table-column>
            <el-table-column
              prop="duty"
              label="职责"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号码"
            >
            </el-table-column>
            <el-table-column
              prop="addr"
              label="所属单位"
            >
            </el-table-column>
            <el-table-column
              prop="remove"
              label="操作"
              width="230"
            >
              <template slot-scope="scope">
                <i v-if="!isCommon"
                  class="el-icon-edit"
                  style="font-size:20px;line-height: 39px;"
                  title="编辑"
                  @click="taskUpdate(scope.row,isCommon)"
                ></i>
                &nbsp;
                <i v-if="!isCommon"
                  class="el-icon-document"
                  style="font-size:20px;line-height: 39px;"
                  title="查看"
                  @click="taskView(scope.row,isCommon)"
                ></i>
                &nbsp;
                <i
                  class="el-icon-delete"
                  style="font-size:20px;line-height: 39px;"
                  title="删除"
                  @click="taskDel(scope.row,isCommon)"
                ></i>
              </template>
            </el-table-column>
          </el-table>
          <page-body
            @currentPage="pageChange"
            :pageInfo="pageInfo"
          ></page-body>
        </div>
      </div>
      
    </div>
    <group-add @addIdsToGroup='handleManageAdd' :groupId='groupId' v-show="showString=='GroupAdd'"></group-add>
    <call-user-add @closeManageAdd='handleManageAdd' :info='curInfo' v-show="showString=='ManageAdd'"></call-user-add>
    <call-user-view @closeManageView='handleManageAdd' :info='curInfo' v-show="showString=='ManageView'"></call-user-view>
  </div>
  
</template>
<script>
import tab from "./tab";
import tree from "./tree";
import commonBox from "./commonbox";
import pageBody from "./../../components/page_temp";
import http from "./../../unit/httpServer";
import callUserAdd from './CallUserManageAdd'
import callUserView from './CallUserManageView'
import groupAdd from './CallUserManageAddCommon'
export default {
  data() {
    return {
      groupId:null,
      curInfo:null,//编辑时 传入到子模块的值
      showString:'Manage',//显示哪个模块  Manage主模块  ManageAdd新增  ManageView查看
      // 分页
      pageInfo: {
        pageSize: 10,
        pageTotal: 0,
        currentPage: 1
      },
      netType: 1,
      name: null, //存放姓名
      dept: null, //存放 所属单位名称
      deptId: 1, //存放 所属单位id
      //isCommon: false, //是否是按 自定义
      //表格
      tableData: []
    };
  },
  computed: {
    isCommon(){
      return this.$store.getters.getIsCommon
    }
  },
  mounted() {
    // var vm = this;
    // if(vm.groupId){
    //   vm.getListByGroupId(vm.groupId);
    // }else{
    //   console.log(1111111111);
    //   vm.getPhoneList(vm.name, vm.netType, vm.deptId);
    // }
    
  },
  methods: {
    //根据分组id获取list
    getListByGroupId(id){
      var vm = this;
      vm.groupId=id;
      http.fetchPost("/dialing/ecTestUser/showPageByGroupId",{
          pageNo: vm.pageInfo.currentPage,
          pageSize: vm.pageInfo.pageSize,
          groupId: vm.groupId,
          netType: vm.netType,
          name: vm.name,
          deptName:vm.dept
      }).then(res => {
        console.log(res);
        if (res.data.errCode == 0) {
          vm.tableData = res.data.list.map((obj, index) => {
              return {
                groupId:id,
                id:obj.id,
                index: index + 1,
                name: obj.name,
                sex: obj.sex ? "女" : "男",
                duty: obj.jobDetail,
                phone: obj.testPhone,
                addr: obj.deptName
              };
            });
            //页码设置
            vm.pageInfo.pageTotal = res.data.list.length;
        }
      });
    },
    //添加分组
    addCommonGroup(){
      console.log('addGroup');
    },
    handleManageAdd(dt){
      this.showString='Manage';
      if(this.isCommon){
        this.getListByGroupId(this.groupId);
      }else{
        this.getPhoneList(this.name, this.netType, this.deptId);
      } 
    },
    // 点击新增
    manageAdd(){
      console.log('add');
      console.log(this.isCommon+"this.isCommon")
      if(this.isCommon){
        this.showString='GroupAdd';
      }else{
        this.showString='ManageAdd';
        this.curInfo={
          deptId:this.deptId
        };
      }
      
    },
    //点击查询
    search(){
      console.log('search');
      if(this.isCommon){
        this.getListByGroupId(this.groupId);
      }else{
        this.getPhoneList(this.name, this.netType, this.deptId);
      }
    },
    //点击重置
    reset(){
      console.log('reset');
      this.name=null;
    },
    // 获取表格数据
    getPhoneList(name, netType, deptId) {
      var vm = this;
      http
        .fetchPost("/dialing/ecTestUser/showPageByDeptId", {
          pageNo: vm.pageInfo.currentPage,
          pageSize: vm.pageInfo.pageSize,
          deptId: deptId,
          netType: netType,
          name: name
        })
        .then(res => {
          console.log(res);
          if (res.data.errCode == 0) {
            vm.tableData = res.data.list.map((dt, index) => {
              return {
                deptId:dt.deptId,
                id:dt.id,
                index: index + 1,
                name: dt.name,
                sex: dt.sex ? "女" : "男",
                duty: dt.jobDetail,
                phone: dt.testPhone,
                addr: dt.deptName,
                officePhone:dt.officePhone
              };
            });
            //页码设置
            vm.pageInfo.pageTotal = res.data.list.length;
            // vm.pageInfo.currentPage=res.data.page.pageNo;
          }
        });
    },
    // 按单位  点击单位名称 获取人员
    selectOne(dt) {
      this.deptId = dt.id;
      this.getPhoneList(this.name, this.netType, this.deptId);
    },
    
    pageChange(p) {
      console.log(p);
    },
    taskUpdate(dt) {
      console.log(dt);
      this.curInfo=dt;
      this.showString='ManageAdd';
    },
    taskView(dt) {
      this.curInfo=dt;
      this.showString='ManageView';
    },
    taskDel(dt,isCommon) {
      console.log(isCommon);
      console.log(dt);
      if(isCommon){
        http.fetchPost("/dialing/testGroup/deleteEcUserToGroup", {
            groupId:dt.groupId,
            uid:dt.id
        }).then(res=>{
          console.log(res);
          if(res.data.errCode==0){
            this.getListByGroupId(dt.groupId)
          }
        })
      }else{
        http.fetchPost("/dialing/ecTestUser/deleteById", {
            id:dt.id
        }).then(res=>{
          if(res.data.errCode==0){
            this.getPhoneList(this.name, this.netType, this.deptId);
          }
        })
      }
      
    }
  },
  components: {
    tab,
    tree,
    commonBox,
    pageBody,
    callUserAdd,
    callUserView,
    groupAdd
  }
};
</script>
<style scoped>
#CallUserManage {
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
.leftbar {
  border: 10px solid #e4ebf0;
  border-top: 30px solid #e4ebf0;
  height: 100%;
  width: 270px;
  float: left;
  box-sizing: border-box;
}
.rightMainbox {
  height: 100%;
  float: left;
  width: calc(100% - 270px);
  border: 10px solid #e4ebf0;
  border-top: 30px solid;
  border-left: 0px;
  padding: 5px;
  box-sizing: border-box;
}
.rightMainboxTop {
  border-bottom: 1px dashed #e4e4e4;
}
</style>

