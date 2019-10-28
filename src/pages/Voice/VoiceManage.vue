<template>
  <div>
    <div v-show="showPage == 'Manage'"
      id="IncomingCallManage"
      class="contentBox">
      <div class="contentBox_page">
        <div class="page_title">
          <el-breadcrumb>
            <span>语音管理</span>
          </el-breadcrumb>
        </div>
        <div class="page_box">
          <div class="page_box_requirement">
            <div>
              <div class="requirement">
                <label for="">语音文件名称：</label>
                <el-input v-model="requirement.vocTaskName">
                </el-input>
              </div>
              <div class="requirement">
                <label for="">上传时间：</label>
                <el-date-picker v-model="requirement.vocTaskTime"
                  type="datetimerange"
                  :editable="false"
                  :clearable="false"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
              <div class="queryOrno">
                <span @click="makeSure">{{contentBox.query}}</span><span @click="reset">{{contentBox.reset}}</span>
              </div>
            </div>
          </div>
          <div class="page_box_result">
            <div class="download">
              <span @click="taskAdd()">{{contentBox.taskAdd}}</span>
            </div>
            <div class="table_temp">
              <el-table stripe border
                :data="tableBodyList"
                style="width: 100%">
                <el-table-column fixed
                  type="index"
                  label="选择"
                  width="100">
                  <template slot-scope="scope" >
                      <el-radio class="radioTemp" @change="clickRadio(scope)" v-model="radio" :label="scope.$index"></el-radio>
                  </template>
                </el-table-column>
                <table-body :tableList="tableHeadList"></table-body>
                <el-table-column fixed="right"
                  label="操作"
                  width="160">
                  <template slot-scope="scope">
                    <i class="el-icon-edit"
                      style="font-size:20px;line-height: 39px;"
                      title="编辑"
                      @click="taskUpdate(scope.row)"></i>
                    <!-- &nbsp;
                    <i class="el-icon-document"
                      style="font-size:20px;line-height: 39px;"
                      title="查看"
                      @click="taskAdd(null,'ManageView',null)"></i> -->
                    &nbsp;
                    <i class="el-icon-delete"
                      style="font-size:20px;line-height: 39px;"
                      title="删除"
                      @click="taskDel(scope.row)"></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <page-body @currentPage="pageChange" :pageInfo="pageInfo"></page-body>
          </div>
        </div>
      </div>
    </div>
    <ManageAdd v-if="showPage == 'ManageAdd'"  
      @taskSave='handleSave'
      @taskCancel='handleCancel'
      :taskOption="taskOption"></ManageAdd>
    <ManageView v-if="showPage == 'ManageView'"
     
      :taskOption="taskOption"></ManageView>
  </div>
</template>
<script>
import { contentBox } from "./../../unit/globalVar.js";
import tableBody from "./../../components/table_temp";
import pageBody from "./../../components/page_temp";
import ManageAdd from "./VoiceManageAdd";
import ManageView from "./VoiceManageView";
import http from './../../unit/httpServer'
export default {
  data() {
    //  inTask --> messageTask
    return {
      radio:999999,
      contentBox: contentBox,
      showPage: "Manage",
      pageInfo: {
        pageSize: 10,
        pageTotal: 0,
        currentPage: 1,
      },
      taskOption: null,
      requirement: {
        vocTaskName: null,
        vocTaskTime: []
      },
      tableBodyList: null,
      tableHeadList: null
    };
  },
  components: {
    tableBody,
    pageBody,
    ManageAdd,
    ManageView
  },
  mounted() {
    this.setTableHead();
    this.getTableBodyData();
  },
  methods: {
    //更新
    taskUpdate(info){
      console.log(info);
      this.showPage='ManageAdd';
      this.taskOption=info;

    },
    handleSave(dt){
      console.log(dt);
      this.showPage='Manage';
      this.getTableBodyData();
    },
    handleCancel(){
      console.log('handleCancel');
      this.showPage='Manage';
      this.getTableBodyData();
    },
    reset(){
      console.log("reset");
      this.requirement.vocTaskName=null;
      this.requirement.vocTaskTime=[];
    },
    clickRadio(e){
      console.log(e);
      http.fetchPost('/dialing/ecAudioCtrl/updateTaskDefault',{
        id:e.row.id
      }).then(res=>{
        console.log(res);
        if(res.data.errCode!=0){
          console.log(errMsg)
        }
      })
    },
    makeSure(){
      this.getTableBodyData();
    },
    setTableHead() {
      this.tableHeadList = [
        { prop: "name", label: "语音文件名称" },
        { prop: "time", label: "上传时间" }
      ];
    },
    getTableBodyData() {
      var vm =this;
      console.log(this.requirement.vocTaskTime)
      http.fetchPost('/dialing/ecAudioCtrl/showPage',{
        stime:this.requirement.vocTaskTime[0]?this.requirement.vocTaskTime[0]:null,
        etime:this.requirement.vocTaskTime[1]?this.requirement.vocTaskTime[1]:null,
        name:this.requirement.vocTaskName,
        pageNo:this.pageInfo.currentPage,
        pageSize:this.pageInfo.pageSize
      }).then(res=>{
        console.log(res);
        if(res.data.errCode==0){
          vm.tableBodyList=res.data.list.map((dt,index)=>{
            if(dt.taskDefault){
              vm.radio=index
            }
            return {
              id:dt.id,
              name:dt.name,
              time:dt.time
            }
          });
          //页码设置
          vm.pageInfo.pageTotal=res.data.page.total;
          vm.pageInfo.currentPage=res.data.page.pageNo;
        }
      })
    },
    //增加
    taskAdd() {
      console.log('add');
      this.showPage='ManageAdd';
      this.taskOption=null;
    },
    
    taskDel(q) {
      console.log(q);
      http.fetchPost('/dialing/ecAudioCtrl/deleteEcAudio',{
        id:q.id
      }).then(res=>{
        console.log(res);
        if(res.data.errCode==0){
          this.getTableBodyData();
        }
      })
    },
    //页码改变
    pageChange(p) {
      this.pageInfo.currentPage = p;
      //   this.getTableList();
      console.log(p);
      this.getTableBodyData();
    }
  }
};
</script>
<style scoped>
</style>

