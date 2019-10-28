
<template>
  <div class="log">
    <div style="min-width:1100px;">
      <div class="main_title">
        <span>系统管理 > 日志管理</span>
      </div>
      <div class="main_body">
        <div style="padding:20px 10px;">
          <div class="condition" style="margin-bottom:10px;">
            <span class="span">操作人：</span>
            <!-- <input type="text" placeholder="请输入内容" class="input" v-model="name"/> -->
            <el-autocomplete
              class="inline-input"
              v-model="name"
              valueKey="name"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              :popper-class="logSelectListTag"
              @select="handleSelect"
            ></el-autocomplete>
            <span class="span">操作时间：</span>
            <el-date-picker
              v-model="actTime"
              value-format="yyyy-MM-dd HH:mm:ss" 
              type="datetimerange"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <button class="search" @click="logSearch(pageSize,pageNum,'search')">查询</button>
            <button class="reset" @click="reset">重置</button>
          </div>
        </div>
        <selfTable :table="tableList"></selfTable>
        <div class="condition_page page_xp" v-show="show_page">
          <el-pagination
            style="float:right;"
            background
            layout="prev, pager, next"
            @current-change="changeCurrent"
            :page-size="pageSize"
            :current-page="pageNum"
            :total="total">
          </el-pagination>
          <span style="float:left;">Total：{{total}} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import selfTable from "./../../components/self_table.vue"
import https from './../../unit/httpServer'
export default {
  name:'log',
  data() {
    return {
      //操作人下拉框列表类名字
      logSelectListTag:'logSelectList',
      // 操作人输入框内容
      name: '',
      // 选中的操作人对象
      userObj:null,
      actTime:[],
      pageSize:14,
      pageNum:1,
      total:0,
      show_page:true,
      tableList:{
        tableData: [],
        tablelist:[
          {
            typeName:'序号',
            typePro:'index',
            width:'60px'
          },
          {
            typeName:"操作人",
            typePro:'name',
            width:120
          },
          {
            typeName:"操作时间",
            typePro:'time',
            width:180
          },
          {
            typeName:"IP地址",
            typePro:'ip',
            width:150
          },
          {
            typeName:"操作内容",
            typePro:'content'
          }
        ],
      },
      // 查看字段
      operator:'',
      logName:'',
      operationDate:'',
      ipAdress:'',
      content:'',
    }
  },
  components: {
    selfTable
  },
  created(){
    this.logSearch(this.pageSize,this.pageNum,'search');
  },
  methods: {
    querySearch(queryString, cb) {
      https.fetchPost('sys/logMgr/findUserList',{uname:this.name}).then(res => {
        if(res.data.errCode==0){  
          if(res.data.userList.length>0){
            this.logSelectListTag = 'logSelectListTrue';
            cb(res.data.userList);
          }else{
            this.userObj = null;
            this.logSelectListTag = 'logSelectListFalse';
            cb([]);
          }
        }
      })
    },
    handleSelect(item) {
      this.userObj = item;
    },
    logSearch(pageSize,pageNum,type){
      // 点击查询将当前页值变为1
      if(type == 'search') {
        this.pageNum = 1;
      }else{
        this.pageNum = pageNum;
      }
      if(this.actTime&&this.actTime.length > 0){
        var startDate = this.actTime[0];
        var endDate = this.actTime[1];
      }else{
        var startDate = undefined;
        var endDate = undefined;
      }
      if(this.userObj){
        var userId = this.userObj.id;
      }else{
        var userId = null;
      }
      // 请求参数
      var params = {
        userId:userId,
        startTime:startDate,
        endTime:endDate,
        pageSize:pageSize,
        pageNo:this.pageNum
      }
      https.fetchPost('sys/logMgr/showPage',params).then(res => {   
        if(res.data.errCode == 0){
          if(res.data.list.length > 0){
            res.data.list.forEach((ele,index) => {
              ele['index'] = (res.data.page.pageNo - 1)*this.pageSize + index + 1;
            })
            this.tableList.tableData = res.data.list;
            this.total = res.data.page.total;
            this.show_page = true;
          }else{
            this.show_page = false;
            this.tableList.tableData = res.data.list;
          }
        }else{
          this.$message({
            type: 'error',
            message: res.data.errMsg
          });
        }
      })
    },
    changeCurrent(currentPage){
      this.pageNum = currentPage;
      this.logSearch(this.pageSize,this.pageNum,'');
    },
    reset(){
      this.name = '';
      this.actTime = [];
      this.userObj = null;
    }
  }
};
</script>
<style scoped>
  * {
    white-space: nowrap;
  }
  .log {
    background: #e4ebf0;
    min-width: 1100px;
    box-sizing: border-box;
    padding-bottom:10px;
  }
  .el-row {
    padding:30px 0 0;
  }
</style>