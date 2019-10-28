<template>
  <div>
    <div v-show="showPage == 'Manage'"
      id="IncomingCallManage"
      class="contentBox">
      <div class="contentBox_page">
        <div class="page_title">
          <el-breadcrumb>
            <span>呼入管理</span>
            <span>{{contentBox.breadcrumb}}</span>
            <span>短信发送管理</span>
          </el-breadcrumb>
        </div>
        <div class="page_box">
          <div class="page_box_requirement">
            <div style="padding-bottom:20px;">
              <div class="requirement">
                <label for="">短信标题：</label>
                <el-input v-model="requirement.mesTaskName">
                </el-input>
              </div>
              <div class="requirement">
                <label>发送状态：</label>
                <el-select v-model="requirement.mesTaskState"
                  placeholder="请选择">
                  <el-option v-for="item in requirement.mesTaskStateList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="queryOrno">
                <span @click="taskQuery">{{contentBox.query}}</span><span @click="taskQueryReset">{{contentBox.reset}}</span>
              </div>
            </div>
            <div>
              <div class="requirement">
                <label for="">发送时间：</label>
                <el-date-picker v-model="requirement.mesTaskTime"
                  type="datetimerange"
                  :editable="false"
                  :clearable="false"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="page_box_result">
            <div class="download">
              <span @click="taskAdd(null,'ManageAdd',null)">{{contentBox.taskAdd}}</span>
            </div>
            <div class="table_temp">
              <el-table stripe border
                :data="tableBodyList"
                style="width: 100%">
                <el-table-column fixed
                  type="index"
                  label="序号"
                  :index="tableIndex"
                  width="50"></el-table-column>
                <table-body :tableList="tableHeadList"></table-body>
                <el-table-column fixed="right"
                  label="操作"
                  width="160">
                  <template slot-scope="scope">
                    <!-- <i class="el-icon-setting"
                      v-if="scope.row.taskState1 !== 'mesgSend0'"
                      style="font-size:20px;line-height: 39px;"
                      @click="taskSetOpen(scope.row)"
                      title="设置"></i>
                    <i class="el-icon-setting"
                      v-if="scope.row.taskState1 == 'mesgSend0'"
                      style="font-size:20px;line-height: 39px;cursor:not-allowed;color: #82898e"></i> -->
                    <span v-if="scope.row.taskSta != 0"
                      @click="taskSetOpen(scope.row)"
                      style="font-size:14px;line-height: 39px;color: #0978bc;cursor: pointer;">发送</span>
                    <span v-if="scope.row.taskSta == 0"
                      style="font-size:14px;line-height: 39px;cursor:not-allowed;color: #82898e">发送</span>
                    &nbsp;
                    <i class="el-icon-document"
                      style="font-size:20px;line-height: 39px;"
                      title="查看"
                      @click="taskAdd({opt:scope.row},'ManageView',null)"></i>
                    &nbsp;
                    <i class="el-icon-delete"
                      style="font-size:20px;line-height: 39px;"
                      title="删除"
                      v-if="scope.row.taskState1 != 'mesgSend0'"
                      @click="taskDel(scope.row)"></i>
                    <i class="el-icon-delete"
                      v-if="scope.row.taskState1 == 'mesgSend0'"
                      style="font-size:20px;line-height: 39px;cursor:not-allowed;color: #82898e"></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <page-body @currentPage="pageChange"
              :pageInfo="pageInfo"></page-body>
          </div>
        </div>
      </div>
    </div>
    <ManageAdd v-if="showPage == 'ManageAdd'"
      @taskAdd="taskAdd"></ManageAdd>
    <ManageView v-if="showPage == 'ManageView'"
      @taskAdd="taskAdd"
      :taskOption="taskOption"></ManageView>
  </div>
</template>
<script>
import { contentBox } from "./../../unit/globalVar.js";
import tableBody from "./../../components/table_temp";
import pageBody from "./../../components/page_temp";
import ManageAdd from "./MessageSendManageAdd";
import ManageView from "./MessageSendManageView";
// api
import { INCALLAPI } from "./../../api/InCallTaskApi";
export default {
  data() {
    //  mesTask --> messageTask
    return {
      contentBox: contentBox,
      showPage: "Manage",
      pageInfo: {
        pageSize: 13,
        pageTotal: null,
        currentPage: 1
      },
      taskOption: null,
      requirement: {
        mesTaskName: null,
        mesTaskState: null,
        mesTaskStateList: null,
        mesTaskTime: null
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
    this.setTaskState();
    this.getTableBodyData();
  },
  methods: {
    setTableHead() {
      this.tableHeadList = [
        { prop: "taskName", label: "短信标题" },
        { prop: "taskReceivePeo", label: "接收人" },
        { prop: "taskSendTime", label: "创建时间" },
        { prop: "taskSta", label: "发送状态" }
      ];
    },
    //表头序号
    tableIndex(index) {
      return (
        index + this.pageInfo.pageSize * (this.pageInfo.currentPage - 1) + 1
      );
    },
    // 任务状态
    setTaskState() {
      this.requirement.mesTaskStateList = [
        {
          label: "全部",
          id: null
        },
        {
          label: "发送失败",
          id: 0
        },
        {
          label: "发送成功",
          id: 1
        }
      ];
    },
    // 获取列表数据
    getTableBodyData() {
      const options = {
        netType: 2,
        stime:
          this.requirement.mesTaskTime != null
            ? this.requirement.mesTaskTime[0]
            : null,
        etime:
          this.requirement.mesTaskTime != null
            ? this.requirement.mesTaskTime[1]
            : null,
        title: this.requirement.mesTaskName,
        status: this.requirement.mesTaskState,
        pageNo: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      INCALLAPI.ecSms_showPage(options).then(res => {
        console.log(res);
        const taskList = [];
        if (res.status == 200 && res.data.errCode == 0) {
          if (res.data.list != undefined && res.data.list.length != 0) {
            for (let index = 0; index < res.data.list.length; index++) {
              const element = res.data.list[index];
              const taskItem = {
                taskId: element.id,
                taskName: element.title,
                taskSendTime: element.time,
                taskReceivePeo: element.userName,
                taskSta: element.status == 0 ? "发送失败" : "发送成功"
              };
              taskList.push(taskItem);
            }
          }
        }
        this.tableBodyList = taskList;
        this.pageInfo.pageTotal = res.data.page.total;
      });
    },
    // 查询
    taskQuery() {
      this.getTableBodyData();
    },
    // 查询重置
    taskQueryReset() {
      this.requirement.mesTaskTime = null;
      this.requirement.mesTaskName = null;
      this.requirement.mesTaskState = null;
    },
    taskAdd(opt, page, getD) {
      if (opt != null) {
        if (page == "ManageView") {
          var option = {
            task: opt.opt
          };
        } 
      } else {
        var option = null;
      }
      this.taskOption = option;
      this.showPage = page;
      if (getD) {
        this.getTableBodyData();
      }
    },
    taskDel(q) {
      console.log(q);
      INCALLAPI.ecSms_deleteById({ id: q.taskId }).then(res => {
        console.log(res);
        if (res.status == 200 && res.data.errCode == 0) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getTableBodyData();
        }
      });
    },
    taskSetOpen(q) {
      console.log(q);
      alert("模拟发送中。。。。后台要求等设备调试时在测试接口")
    },
    //页码改变
    pageChange(p) {
      this.pageInfo.currentPage = p;
      this.getTableBodyData();
    }
  }
};
</script>
<style scoped>
</style>

