<template>
  <div id="IncomingCallManage"
    class="contentBox">
    <div class="contentBox_page contentBox_pageSee">
      <div class="page_title">
        <el-breadcrumb>
          <span>语音管理</span>
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
              <div class="text_label"><label for="">呼入任务名称 :</label></div>
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
            <span>接收人员</span><span></span>
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
            <span>短信内容</span><span></span>
          </div>
          <div class="text">
            <div>
              <div class="text_label"><label for="">&nbsp;</label></div>
              <el-form-item prop="taskDescribe.taskName">
                <el-input :readonly="true" type="textarea"
                  :rows="7"
                  placeholder="请输入内容"
                  v-model="ruleForm.taskDescribe.taskName">
                </el-input>
              </el-form-item>
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
    return {
      contentBox: contentBox,
      ruleForm: {
        taskDescribe: {
          taskName: null,
          taskTypeL: null,
          taskTypeId: null
        },
      },
      rules: {},
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

