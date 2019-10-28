<template>
  <div id="IncomingCallManage"
    class="contentBox">
    <div class="contentBox_page contentBox_pageSee">
      <div class="page_title">
        <el-breadcrumb>
          <span>呼出任务管理</span>
          <span>{{contentBox.breadcrumb}}</span>
          <span>任务查看</span>
        </el-breadcrumb>
      </div>
      <div class="page_box">
        <!-- <div class="page_box_center"> -->
        <el-form class="page_box_center"
          :model="ruleForm"
          :rules="rules"
          :inline-message="true"
          ref="ruleForm">
          <div class="text">
            <div>
              <div class="text_label"><label for="">呼出任务名称 :</label></div>
              <el-form-item prop="taskDescribe.taskName">
                <el-input :readonly="true"
                  v-model="ruleForm.taskDescribe.taskName"></el-input>
              </el-form-item>
            </div>
            <div>
              <div class="text_label"><label for="">任务类型 :</label></div>
              <el-form-item prop="taskDescribe.taskTypeId">
                <el-input :readonly="true"
                  v-model="ruleForm.taskDescribe.taskTypeId"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="line">
            <span>时间设置</span><span></span>
          </div>
          <div class="text">
            <div>
              <div class="text_label">
                <label for="">起止 :</label>
              </div>
              <el-date-picker v-model="taskTimeSet.BEtime.time"
                type="datetimerange"
                :editable="false"
                :readonly="true"
                :clearable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div>
              <div class="text_label">
                <label for="">{{taskTimeSet.monthTime.timeTpye}} :</label>
              </div>
              <div class="label_select">
                <span>1</span>
                <span style="display: inline-block;padding: 0 70px;">至</span>
                <span>1</span>
              </div>
            </div>
            <div>
              <div class="text_label">
                <label for="">每天 :</label>
              </div>
              <el-form-item prop="taskTimeSet.dayTime">
                <el-time-picker :readonly="true"
                  v-model="ruleForm.taskTimeSet.dayTime"
                  is-range
                  :editable="false"
                  :clearable="false"
                  value-format="HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间">
                </el-time-picker>
              </el-form-item>
            </div>
          </div>
          <div class="line">
            <span>呼出策略设置</span><span></span>
          </div>
          <div class="text outCallTactics">
            <div>
              <div class="text_label"><label for="">重拨间隔时间 :</label></div>
              <el-form-item prop="outCallTactics.intervaltime">
                <el-input :readonly="true" v-model="ruleForm.outCallTactics.intervaltime">
                  <template slot="append">分钟</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <div class="text_label"><label for="">最多拨打次数 :</label></div>
              <el-form-item prop="outCallTactics.outCallTimes">
                <el-input :readonly="true" v-model="ruleForm.outCallTactics.outCallTimes">
                  <template slot="append">次</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <div class="text_label"><label for="">拨通后最长通话时间 :</label></div>
              <el-form-item prop="outCallTactics.outCallDuration">
                <el-input :readonly="true" v-model="ruleForm.outCallTactics.outCallDuration">
                  <template slot="append">分钟</template>
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div class="line">
            <span>拨测人员选择</span><span></span>
          </div>
          <div class="text">
            <div>
              <div class="text_label"></div>
              <span class="selectPeo">
                <span>
                  <!-- <i @click="peoAddDialog">+点击添加</i> -->
                </span>
                <span>
                  <ul>
                    <li v-for="(item,i) in taskPeo.peoSureL"
                      :key="i">
                      <span>{{item.label}}</span>
                      <!-- <span style="cursor: pointer;"
                        @click="peoDel(item)">删除</span> -->
                    </li>
                  </ul>
                </span>
              </span>
            </div>
          </div>
          <div class="line">
            <span>外呼语音设置</span><span></span>
          </div>
          <div class="text">
            <div style="padding-right: 20px;">
              <div class="table_temp">
                <el-table stripe border
                  :data="tableBodyList"
                  style="width: 100%">
                  <el-table-column fixed
                    label=""
                    width="10"></el-table-column>
                  <table-body :tableList="tableHeadList"></table-body>
                </el-table>
              </div>
            </div>
          </div>

          <div class="text"
            style="padding-top: 20px;">
            <div>
              <div class="back">
                <span @click="taskPreClick(true)">{{contentBox.back}}</span>
              </div>
            </div>
          </div>
        </el-form>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { contentBox } from "./../../unit/globalVar.js";
import tableBody from "./../../components/table_temp";
export default {
  data() {
    // inTask --> outTask
    return {
      contentBox: contentBox,
      ruleForm: {
        taskDescribe: {
          taskName: null,
          taskTypeL: null,
          taskTypeId: null
        },
        taskTimeSet: {
          dayTime: null
        },
        outCallTactics: {
          intervaltime: 111,
          outCallTimes: 222,
          outCallDuration: 333
        }
      },
      rules: {},
      taskTimeSet: {
        BEtime: {
          checked: null,
          time: null
        },
        monthTime: {
          checked: false,
          timeTpye: null,
          timeB: null,
          timeE: null
        }
      },
      taskPeo: {
        peoSureL: null,
        peoIdSureL: null,
        selectedPeoL: null,
        selectedPeoIdL: null,
        defaultPeoL: null
      },
      tableBodyList: null,
      tableHeadList: null
    };
  },
  components: {
    tableBody
  },
  mounted() {
    this.setTableHead();
    this.getTableBodyData();
    this.editTask(true);
  },
  methods: {
    // 设置表头部
    setTableHead() {
      this.tableHeadList = [
        {
          prop: "playFileName",
          label: "语音文件名称",
          width: "",
          style: { "text-align": "center" }
        },
        {
          prop: "pushTime",
          label: "上传时间",
          width: "",
          style: { "text-align": "center" }
        },
        {
          prop: "playSet",
          label: "播放设置",
          width: "",
          style: { "text-align": "center" }
        }
      ];
    },
    // 设置内容
    getTableBodyData() {
      this.tableBodyList = [
        {
          playFileName: "一个好的音乐",
          pushTime: "1111-11-11",
          playSet: "使用中"
        }
      ];
    },
    // 返回
    taskPreClick(q) {
      this.$emit("taskAdd", null, "Manage", false);
    },
    // 编辑
    editTask(q) {
      if (q) {
        var idTaskData = {
          id: 1,
          taskName: "task2",
          taskTypeId: 11,
          BEtime: ["2019-05-15 00:00:00", "2019-05-17 00:00:00"],
          dayTime: ["00:00:00", "00:00:00"],
          monthTime: {
            timeTpye: 1,
            timeB: "2日",
            timeE: "4日"
          },
          taskPeo: {
            peoSureL: [{ id: 112, label: "三级 1-1-1" }],
            peoIdSureL: [112]
          }
        };
        this.editDataShow(idTaskData);
      }
    },
    // 编辑数据展示
    editDataShow(idTaskData) {
      this.ruleForm.taskDescribe.taskName = idTaskData.taskName;
      this.ruleForm.taskDescribe.taskTypeId = idTaskData.taskTypeId;
      this.ruleForm.taskTimeSet.dayTime = idTaskData.dayTime;
      this.taskTimeSet.BEtime.checked =
        idTaskData.BEtime == null ? false : true;
      this.taskTimeSet.BEtime.time =
        idTaskData.BEtime == null ? null : idTaskData.BEtime;
      this.taskTimeSet.monthTime.checked =
        idTaskData.monthTime.timeTpye == null ? false : true;
      this.taskTimeSet.monthTime.timeTpye =
        idTaskData.monthTime.timeTpye == null
          ? null
          : idTaskData.monthTime.timeTpye;
      setTimeout(() => {
        this.taskTimeSet.monthTime.timeB =
          idTaskData.monthTime.timeB == null
            ? null
            : idTaskData.monthTime.timeB;
        this.taskTimeSet.monthTime.timeE =
          idTaskData.monthTime.timeE == null
            ? null
            : idTaskData.monthTime.timeE;
      });
      this.taskPeo.peoSureL = idTaskData.taskPeo.peoSureL;
      this.taskPeo.peoIdSureL = idTaskData.taskPeo.peoIdSureL;
    }
  }
};
</script>
<style scoped>
.selectPeo {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  width: 400px;
  height: 178px;
  background: #f8f6f6;
  border: 1px solid #d9d9d9;
}
.selectPeo > span:nth-child(1) {
  display: block;
  box-sizing: border-box;
  /* height: 30px; */
  width: 398px;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #d9d9d9; */
}
.selectPeo > span:nth-child(1) i {
  font-size: 14px;
  font-style: normal;
  cursor: pointer;
  color: #0978bd;
}
.selectPeo > span:nth-child(2) {
  display: block;
  box-sizing: border-box;
  max-height: 146px;
  width: 398px;
  overflow-y: auto;
}
.selectPeo > span:nth-child(2) ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.selectPeo > span:nth-child(2) li {
  padding: 0;
  margin: 0;
  height: 24px;
  line-height: 24px;
  padding-left: 10px;
  padding-right: 60px;
  list-style: none;
}
.selectPeo > span:nth-child(2) li:hover {
  background: rgba(213, 232, 246, 0.5);
}
.selectPeo > span:nth-child(2) li span:nth-child(1) {
  font-size: 14px;
  color: black;
  font-family: "Microsoft YaHei";
  float: left;
}
.selectPeo > span:nth-child(2) li span:nth-child(2) {
  font-size: 14px;
  color: #0978bd;
  font-family: "Microsoft YaHei";
  float: right;
}

.label_select {
  display: inline-block;
  width: 346px;
  text-align: center;
  font-size: 14px;
}
</style>

