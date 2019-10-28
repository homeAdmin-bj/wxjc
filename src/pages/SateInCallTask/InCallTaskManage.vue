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
            <span>呼入任务管理</span>
          </el-breadcrumb>
        </div>
        <div class="page_box">
          <div class="page_box_requirement">
            <div style="padding-bottom:20px;">
              <div class="requirement">
                <label for="">任务名称：</label>
                <el-input style="boder-right:none;"
                  v-model="requirement.inTaskName">
                </el-input>
              </div>
              <div class="requirement">
                <label>任务状态：</label>
                <el-select v-model="requirement.inTaskState"
                  placeholder="请选择">
                  <el-option v-for="item in requirement.inTaskStateList"
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
                <label>任务类型：</label>
                <el-select v-model="requirement.inTaskType"
                  placeholder="请选择">
                  <el-option v-for="item in requirement.inTaskTypeList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="requirement">
                <label for="">任务执行时间：</label>
                <el-date-picker v-model="requirement.inTaskTime"
                  type="daterange"
                  :editable="false"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="page_box_result">
            <div class="download">
              <span @click="taskAdd({addType:1},'ManageAdd',null)">{{contentBox.taskAdd}}</span>
              <span @click="taskAdd({addType:2},'ManageAdd',null)">周期{{contentBox.taskAdd}}</span>
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
                  width="180">
                  <template slot-scope="scope">
                    <!-- <i class="el-icon-setting"
                      style="font-size:20px;line-height: 39px;"
                      @click="taskSetOpen(scope.row)"
                      title="设置"></i> -->
                    <span @click="taskSetOpen(scope.row)"
                      v-if="scope.row.taskState1 != 'taskState2'"
                      style="font-size:14px;line-height: 39px;color: #0978bc;cursor: pointer;">{{scope.row.enable == false? "启用":"停用"}}</span>
                    <span v-if="scope.row.taskState1 == 'taskState2'"
                      style="font-size:14px;line-height: 39px;color: #0978bc;cursor: pointer;">&emsp;&emsp;</span>
                    &nbsp;
                    <i class="el-icon-edit"
                      style="font-size:20px;line-height: 39px;"
                      title="编辑"
                      @click="taskAdd({addType:1,opt:scope.row},'ManageAdd',null)"
                      v-if="scope.row.taskState1 == 'taskState0' || scope.row.taskState1 == 'taskState3'"></i>
                    <i class="el-icon-edit"
                      v-if="!(scope.row.taskState1 == 'taskState0' || scope.row.taskState1 == 'taskState3')"
                      style="font-size:20px;line-height: 39px;cursor:not-allowed;color: #82898e"></i>
                    &nbsp;
                    <i class="el-icon-document"
                      style="font-size:20px;line-height: 39px;"
                      title="查看"
                      @click="taskAdd({addType:1,opt:scope.row},'ManageView',null)"
                      v-if="!(scope.row.taskState1 == 'taskState0' || scope.row.taskState1 == 'taskState3')"></i>
                    <!-- <i class="el-icon-document"
                      @click="taskAdd({addType:1,opt:scope.row},'ManageView',null)"
                      style="font-size:20px;line-height: 39px;"
                      title="查看"></i> -->
                    <i class="el-icon-document"
                      v-if="(scope.row.taskState1 == 'taskState0' || scope.row.taskState1 == 'taskState3')"
                      style="font-size:20px;line-height: 39px;cursor:not-allowed;color: #82898e"></i>
                    &nbsp;
                    <i class="el-icon-delete"
                      style="font-size:20px;line-height: 39px;"
                      title="删除"
                      v-if="scope.row.taskState1 == 'taskState0' || scope.row.taskState1 == 'taskState3'"
                      @click="taskDel(scope.row)"></i>
                    <i class="el-icon-delete"
                      v-if="!(scope.row.taskState1 == 'taskState0' || scope.row.taskState1 == 'taskState3')"
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
      @taskAdd="taskAdd"
      :taskOption="taskOption"></ManageAdd>
    <div class="infor_Page"
      v-if="showPage == 'ManageView'">
      <ManageView @taskAdd="taskAdd"
        :taskParams="taskOption"></ManageView>
      <div style="text-align:center;margin:20px;">
        <button class="sure_btn"
          @click="showPage = 'Manage'">返回</button>
      </div>
    </div>
  </div>
</template>
<script>
import { contentBox } from "./../../unit/globalVar.js";
import tableBody from "./../../components/table_temp";
import pageBody from "./../../components/page_temp";
import ManageAdd from "./InCallTaskManageAdd";
import ManageView from "./../PerInCallRecord/InCallRecordManageView";
// api
import { INCALLAPI } from "./../../api/InCallTaskApi";
export default {
  data() {
    // inTask --> inTask
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
        inTaskName: null,
        inTaskState: null,
        inTaskType: null,
        inTaskStateList: null,
        inTaskTypeList: null,
        inTaskTime: null
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
    //半年前的时间（毫秒单位）
    const curDate = new Date().getTime();
    const halfYear = (365 / 2) * 24 * 3600 * 1000;
    const pastResult = curDate - halfYear; // 半年前的时间（毫秒单位）
    this.requirement.inTaskTime = [
      this.getFormatDate(new Date(pastResult)),
      this.getFormatDate(new Date())
    ];
    this.setTableHead();
    this.setTaskState();
    this.getTableBodyData();
  },
  methods: {
    //表头名称
    setTableHead() {
      this.tableHeadList = [
        { prop: "taskName", label: "任务名称" },
        { prop: "taskBTime", label: "任务开始时间" },
        { prop: "taskETime", label: "任务结束时间" },
        { prop: "taskState1", label: "任务状态" },
        { prop: "taskType", label: "任务类型" },
        { prop: "taskUserNum", label: "任务用户总数" },
        { prop: "taskCallE", label: "呼叫成功" }
      ];
    },
    //日期处理
    getFormatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    //表头序号
    tableIndex(index) {
      return (
        index + this.pageInfo.pageSize * (this.pageInfo.currentPage - 1) + 1
      );
    },
    // 任务状态
    setTaskState() {
      this.requirement.inTaskStateList = [
        {
          label: "全部",
          id: null
        },
        {
          label: "未执行",
          id: 0
        },
        {
          label: "已完成",
          id: 2
        },
        {
          label: "执行中",
          id: 1
        },
        {
          label: "暂停",
          id: 3
        }
      ];
      this.requirement.inTaskTypeList = [
        {
          label: "全部",
          id: null
        },
        {
          label: "日常",
          id: 1
        },
        {
          label: "临时",
          id: 2
        }
      ];
    },
    // 获取列表数据
    getTableBodyData() {
      const options = {
        netType: 2,
        startTime:
          this.requirement.inTaskTime != null
            ? this.requirement.inTaskTime[0]
            : null,
        endTime:
          this.requirement.inTaskTime != null
            ? this.requirement.inTaskTime[1]
            : null,
        name: this.requirement.inTaskName,
        status: this.requirement.inTaskState,
        type: this.requirement.inTaskType,
        pageNo: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      INCALLAPI.ecTaskIn_showPage(options).then(res => {
        console.log(res);
        const taskList = [];
        if (res.status == 200 && res.data.errCode == 0) {
          if (res.data.list != undefined && res.data.list.length != 0) {
            for (let index = 0; index < res.data.list.length; index++) {
              const element = res.data.list[index];
              const taskItem = {
                taskId: element.id,
                taskName: element.name,
                taskBTime: element.startTime,
                taskETime: element.endTime,
                enable: element.enable,
                taskState1: "taskState" + element.status,
                taskType: element.type == 1 ? "日常" : "临时",
                taskUserNum: element.total,
                taskCallE: element.inNum
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
      this.requirement.inTaskType = null;
      this.requirement.inTaskName = null;
      this.requirement.inTaskState = null;
      //半年前的时间（毫秒单位）
      const curDate = new Date().getTime();
      const halfYear = (365 / 2) * 24 * 3600 * 1000;
      const pastResult = curDate - halfYear; // 半年前的时间（毫秒单位）
      this.requirement.inTaskTime = [
        this.getFormatDate(new Date(pastResult)),
        this.getFormatDate(new Date())
      ];
    },
    //页码改变
    pageChange(p) {
      this.pageInfo.currentPage = p;
      this.getTableBodyData();
    },
    // 状态停启
    taskSetOpen(opt) {
      console.log(opt);
      if (true) {
        this.$confirm(
          "确认" +
            (opt.taskState1 == "taskState3" ? "启用" : "停用") +
            "当前任务?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }
        )
          .then(() => {
            const taskId = opt.taskId;
            const enable = !opt.enable;
            const options = {
              id: taskId,
              enable: enable
            };
            INCALLAPI.ecTaskIn_cutEcTaskInEnable(options).then(res => {
              if (res.status == 200 && res.data.errCode == 0) {
              }
              console.log(res);
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.getTableBodyData();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "操作删除"
            });
          });
      }
    },
    // 任务新增
    taskAdd(opt, page, getD) {
      if (opt != null) {
        if (page == "ManageView") {
          var option = {
            id: opt.opt.taskId,
            netType: 2
          };
        } else {
          var option = {
            addType: opt.addType,
            taskD: opt.opt
          };
        }
      }

      this.taskOption = option;
      this.showPage = page;
      if (getD) {
        this.getTableBodyData();
      }
    },
    // 删除任务
    taskDel(opt) {
      var options = {
        id: opt.taskId
      };
      if (true) {
        this.$confirm("删除后不可恢复,确认删除当前任务?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            INCALLAPI.ecTaskIn_deleteById(options).then(res => {
              if (res.status == 200 && res.data.errCode == 0) {
                if (res.status == 200 && res.data.errCode == 0) {
                  this.$message({
                    type: "success",
                    message: "操作成功!"
                  });
                }
                this.getTableBodyData();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "操作删除"
            });
          });
      }
    }
  }
};
</script>
<style scoped>
</style>

