<template>
  <div id="IncomingCallManage"
    class="contentBox">
    <div class="contentBox_page">
      <div class="page_title">
        <el-breadcrumb>
          <span>呼出任务管理</span>
          <span>{{contentBox.breadcrumb}}</span>
          <span>{{breadcrumb}}</span>
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
                <el-input v-model="ruleForm.taskDescribe.taskName"></el-input>
              </el-form-item>
            </div>
            <div>
              <div class="text_label"><label for="">任务类型 :</label></div>
              <el-form-item prop="taskDescribe.taskTypeId">
                <el-select v-model="ruleForm.taskDescribe.taskTypeId"
                  placeholder="请选择">
                  <el-option v-for="item in ruleForm.taskDescribe.taskTypeL"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-select v-model="taskDescribe.taskTypeId"
                placeholder="请选择">
                <el-option v-for="item in taskDescribe.taskTypeL"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select> -->
            </div>
          </div>
          <div class="line">
            <span>时间设置</span><span></span>
          </div>
          <div class="text">
            <div>
              <div class="text_label">
                <el-checkbox v-model="taskTimeSet.BEtime.checked"></el-checkbox><label for="">起止 :</label>
              </div>
              <el-date-picker v-model="taskTimeSet.BEtime.time"
                type="datetimerange"
                :editable="false"
                :disabled="!timeCheck"
                :clearable="false"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div>
              <div class="text_label">
                <el-checkbox v-model="taskTimeSet.monthTime.checked"></el-checkbox><label for="">&emsp;&emsp;&ensp;</label>
              </div>
              <div class="label_select">
                <el-select :disabled="!timeCheck2"
                  v-model="taskTimeSet.monthTime.timeTpye"
                  placeholder="请选择">
                  <el-option v-for="item in taskTimeDef.timeTpye"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="label_select label_select2"
                style="padding-left: 38px;">
                <el-select :disabled="!timeCheck2"
                  v-model="taskTimeSet.monthTime.timeB"
                  placeholder="请选择">
                  <el-option v-for="item in taskTimeDef.timeTpyeL"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              &emsp;至&emsp;
              <div class="label_select label_select2">
                <el-select :disabled="!timeCheck2"
                  v-model="taskTimeSet.monthTime.timeE"
                  placeholder="请选择">
                  <el-option v-for="item in taskTimeDef.timeTpyeL"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <div class="text_label">
                <label for="">每天 :</label>
              </div>
              <el-form-item prop="taskTimeSet.dayTime">
                <el-time-picker v-model="ruleForm.taskTimeSet.dayTime"
                  is-range
                  :editable="false"
                  :clearable="false"
                  value-format="timestamp"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间">
                </el-time-picker>
              </el-form-item>
              <!-- <el-date-picker v-model="taskTimeSet.dayTime.time"
                type="datetimerange"
                :editable="false"
                :clearable="false"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker> -->
            </div>
          </div>
          <div class="line">
            <span>呼出策略设置</span><span></span>
          </div>
          <div class="text">
            <div>
              <div class="text_label"><label for="">重拨间隔时间 :</label></div>
              <el-form-item prop="outCallTactics.intervaltime">
                <el-input v-model="ruleForm.outCallTactics.intervaltime">
                  <template slot="append">分钟</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <div class="text_label"><label for="">最多拨打次数 :</label></div>
              <el-form-item prop="outCallTactics.outCallTimes">
                <el-input v-model="ruleForm.outCallTactics.outCallTimes">
                  <template slot="append">次</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <div class="text_label"><label for="">拨通后最长通话时间 :</label></div>
              <el-form-item prop="outCallTactics.outCallDuration">
                <el-input v-model="ruleForm.outCallTactics.outCallDuration">
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
                  <i @click="peoAddDialog">+点击添加</i>
                </span>
                <span>
                  <ul>
                    <li v-for="(item,i) in taskPeo.peoSureL"
                      :key="i">
                      <span>{{item.label}}</span>
                      <span style="cursor: pointer;"
                        @click="peoDel(item)">删除</span>
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
                    label="选择"
                    width="100">
                    <template slot-scope="scope">
                      <el-radio @change="voiceSet(scope.row)"
                        v-model="radioSlect"
                        :label="scope.row.id">&nbsp;</el-radio>
                    </template>
                  </el-table-column>
                  <table-body :tableList="tableHeadList"></table-body>
                  <el-table-column fixed="right"
                    label="播放设置"
                    width="80">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.taskDefault"
                        style="color: #0978bc;cursor: pointer">设置</span>
                      <span v-if="scope.row.taskDefault"
                        style="color: red;">默认</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <page-body @currentPage="pageChange"
                :pageInfo="pageInfo"></page-body>
            </div>
          </div>

          <div class="text">
            <div>
              <div class="back">
                <span @click="taskPreClick(true)">{{contentBox.preserve}}</span>&nbsp;&nbsp;&nbsp;
                <span @click="taskPreClick(false)">{{contentBox.cancel}}</span>
              </div>
            </div>
          </div>
        </el-form>
        <!-- </div> -->
      </div>
    </div>
    <el-dialog :visible.sync="peoDialog"
      custom-class="dialogS"
      width="275px">
      <div class="dialogS_box">
        <div class="peoSelect"
          ref="peoSelect">
          <span class="clickDef"
            @click="PeoTpye(1)">按单位</span><span @click="PeoTpye(2)">自定义分组</span>
        </div>
        <div class="peoSelectL">
          <el-tree :data="taskPeo.defaultPeoL"
            show-checkbox
            ref="treeCity"
            :default-checked-keys="taskPeo.peoIdSureL"
            :default-expanded-keys="[1,2]"
            node-key="id"
            @check="checkClick"
            :props="defaultProps">
          </el-tree>
        </div>
        <div class="back"
          style="padding-top:10px;">
          <span @click="peoSureClick(true)">{{contentBox.sure}}</span>&nbsp;&nbsp;&nbsp;
          <span @click="peoSureClick(false)">{{contentBox.cancel}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { contentBox } from "./../../unit/globalVar.js";
import { administrationChoice } from "./../../unit/common.js";
import tableBody from "./../../components/table_temp";
import pageBody from "./../../components/page_temp";
// api
import { SOCTAPI } from "./../../api/SateOutCallTaskApi";
export default {
  data() {
    // inTask --> outTask
    return {
      radioSlect: null,
      contentBox: contentBox,
      defaultProps: {
        children: "children",
        label: "label"
      },
      peoDialog: false,
      timeCheck: null,
      timeCheck2: null,
      breadcrumb: null,
      pageInfo: {
        pageSize: 4,
        pageTotal: null,
        currentPage: 1
      },
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
          intervaltime: null,
          outCallTimes: null,
          outCallDuration: null
        }
      },
      rules: {
        "taskDescribe.taskName": [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { required: true, message: "请输入任务名称", trigger: "change" }
        ],
        "taskDescribe.taskTypeId": [
          { required: true, message: "请选择任务类型", trigger: "change" }
        ],
        "taskTimeSet.dayTime": [
          { required: true, message: "请设置时间", trigger: "blur" }
        ],
        "outCallTactics.intervaltime": [
          { required: true, message: "请输入内容", trigger: "blur" },
          { required: true, message: "请输入内容", trigger: "change" }
        ],
        "outCallTactics.outCallTimes": [
          { required: true, message: "请输入内容", trigger: "blur" },
          { required: true, message: "请输入内容", trigger: "change" }
        ],
        "outCallTactics.outCallDuration": [
          { required: true, message: "请输入内容", trigger: "blur" },
          { required: true, message: "请输入内容", trigger: "change" }
        ]
      },
      taskTimeDef: {
        timeTpye: [{ id: 1, label: "每月" }, { id: 2, label: "每周" }],
        timeTpyeL: null
      },
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
  props: ["taskOption"],
  components: {
    tableBody,
    pageBody
  },
  mounted() {
    this.setTableHead();
    this.getTableBodyData();
    setTimeout(() => {
      this.ruleForm.taskDescribe.taskTypeL = [
        { id: 1, label: "日常" },
        { id: 2, label: "临时" }
      ];
    }, 2000);

    this.taskTimeSet.BEtime.checked = false;
    this.taskTimeSet.monthTime.checked = false;
    this.taskTimeSet.monthTime.timeTpye = 1;
    this.breadcrumb = this.taskOption.task == null ? "任务新增" : "任务编辑";
    if (this.taskOption.task != null) {
      this.editTask(this.taskOption.task.taskId);
    }
  },
  methods: {
    // 设置语音表头部
    setTableHead() {
      this.tableHeadList = [
        {
          prop: "name",
          label: "语音文件名称",
          width: "",
          style: { "text-align": "center" }
        },
        {
          prop: "time",
          label: "上传时间",
          width: "",
          style: { "text-align": "center" }
        }
      ];
    },
    // 设置语音内容
    getTableBodyData() {
      var options = {
        stime: null,
        etime: null,
        name: null,
        pageNo: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      SOCTAPI.ecAudioCtrl_showPage(options).then(res => {
        if (res.status == 200 && res.data.errCode == 0) {
          this.tableBodyList = res.data.list;
          this.pageInfo.pageTotal = res.data.page.total;
          if (res.data.list.length != 0 || res.data.list != null) {
            const radioItem = res.data.list.filter(
              item => item.taskDefault == true
            );
         
            if (radioItem.length != 0) {
              this.radioSlect = radioItem[0].id;
            }
          }
        }
      });
    },
    //页码改变
    pageChange(p) {
      this.pageInfo.currentPage = p;
      console.log(p);
      this.getTableBodyData();
    },
    // 外呼语音设置
    voiceSet(s) {
      var options = {
        id: s.id
      };
      console.log(s);

      SOCTAPI.ecAudioCtrl_updateTaskDefault(options).then(res => {
        console.log(res);
        if (res.status == 200 && res.data.errCode == 0) {
          this.getTableBodyData();
        }
      });
    },
    // 添加拨测人员
    peoAddDialog() {
      this.peoDialog = true;
      setTimeout(() => {
        this.getUnitPeo(1);
      }, 2000);
    },
    // 获取拨测单位人员
    getUnitPeo(d) {
      if (d == 1) {
        this.taskPeo.defaultPeoL = [
          {
            id: 1,
            label: "一级 1",
            disabled: true,
            children: [
              {
                id: 11,
                label: "二级 1-1",
                children: [
                  {
                    id: 112,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 113,
                    label: "三级 1-1-2"
                  }
                ]
              },
              {
                id: 12,
                label: "二级 1-1",
                children: [
                  {
                    id: 122,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 123,
                    label: "三级 1-1-2"
                  }
                ]
              },
              {
                id: 13,
                label: "二级 1-1",
                children: [
                  {
                    id: 132,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 133,
                    label: "三级 1-1-2"
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: "一级 1",
            disabled: true,
            children: [
              {
                id: 21,
                label: "二级 1-1",
                children: [
                  {
                    id: 212,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 213,
                    label: "三级 1-1-2"
                  }
                ]
              },
              {
                id: 22,
                label: "二级 1-1",
                children: [
                  {
                    id: 222,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 223,
                    label: "三级 1-1-2"
                  }
                ]
              },
              {
                id: 23,
                label: "二级 1-1",
                children: [
                  {
                    id: 232,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 233,
                    label: "三级 1-1-2"
                  }
                ]
              }
            ]
          }
        ];
      } else {
        this.taskPeo.defaultPeoL = [
          {
            id: 1,
            label: "一级 1",
            disabled: true,
            children: [
              {
                id: 11,
                label: "二级 1-1",
                children: [
                  {
                    id: 112,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 113,
                    label: "三级 1-1-2"
                  }
                ]
              },
              {
                id: 12,
                label: "二级 1-1",
                children: [
                  {
                    id: 122,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 123,
                    label: "三级 1-1-2"
                  }
                ]
              },
              {
                id: 13,
                label: "二级 1-1",
                children: [
                  {
                    id: 132,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 133,
                    label: "三级 1-1-2"
                  }
                ]
              }
            ]
          }
        ];
      }
    },
    // 切换拨测单位人员
    PeoTpye(d) {
      if (d == 1) {
        this.$refs.peoSelect.firstChild.style["color"] = "#fff";
        this.$refs.peoSelect.firstChild.style["background"] = "#0978bd";
        this.$refs.peoSelect.lastChild.style["color"] = "#0978bd";
        this.$refs.peoSelect.lastChild.style["background"] = "#fff";
      } else {
        this.$refs.peoSelect.lastChild.style["color"] = "#fff";
        this.$refs.peoSelect.lastChild.style["background"] = "#0978bd";
        this.$refs.peoSelect.firstChild.style["color"] = "#0978bd";
        this.$refs.peoSelect.firstChild.style["background"] = "#fff";
      }
      this.getUnitPeo(d);
    },
    // 选择拨测单位人员
    checkClick() {
      const areaChoice = administrationChoice(
        this.$refs.treeCity.getCheckedNodes()
      );
      this.taskPeo.selectedPeoL = areaChoice.selectList;
      this.taskPeo.selectedPeoIdL = areaChoice.selectListId;
    },
    // 选择拨测人员确认
    peoSureClick(p) {
      if (p) {
        this.taskPeo.peoSureL = this.taskPeo.selectedPeoL;
        this.taskPeo.peoIdSureL = this.taskPeo.selectedPeoIdL;
        this.peoDialog = false;
      } else {
        this.taskPeo.selectedPeoL = this.taskPeo.peoSureL;
        this.taskPeo.selectedPeoIdL = this.taskPeo.peoIdSureL;
        this.peoDialog = false;
      }
      console.log(this.taskPeo.peoSureL);
      console.log(this.taskPeo.peoIdSureL);
    },
    // 人员删除
    peoDel(i) {
      Object.keys(this.taskPeo).forEach(key => {
        if (key != "defaultPeoL") {
          this.taskPeo[key] = this.taskPeo[key].filter(item => {
            return item.id == undefined ? item != i.id : item.id != i.id;
          });
        }
      });
    },
    // 保存 取消
    taskPreClick(q) {
      if (this.taskOption.task == null) {
        var options = {
          netType: 2,
          // id: null,
          name: this.ruleForm.taskDescribe.taskName,
          type: this.ruleForm.taskDescribe.taskTypeId,
          startTime:
            this.taskTimeSet.BEtime.time == null
              ? null
              : this.taskTimeSet.BEtime.time[0],
          endTime:
            this.taskTimeSet.BEtime.time == null
              ? null
              : this.taskTimeSet.BEtime.time[1],
          stime:
            this.ruleForm.taskTimeSet.dayTime == null
              ? null
              : this.ruleForm.taskTimeSet.dayTime[0],
          etime:
            this.ruleForm.taskTimeSet.dayTime == null
              ? null
              : this.ruleForm.taskTimeSet.dayTime[1],
          timeType: this.taskTimeSet.monthTime.timeTpye,
          startDay: this.taskTimeSet.monthTime.timeB,
          endDay: this.taskTimeSet.monthTime.timeE,
          recallInterval: this.ruleForm.outCallTactics.intervaltime,
          recall: this.ruleForm.outCallTactics.outCallTimes,
          callTime: this.ruleForm.outCallTactics.outCallDuration,
          content: "123",
          audioId: this.radioSlect
        };
        if (q) {
          this.$refs["ruleForm"].validate(valid => {
            if (valid) {
              SOCTAPI.ecTaskOut_saveEcTaskOut(options).then(res => {
                if (res.status == 200 && res.data.errCode == 0) {
                  this.$emit("taskAdd", null, "Manage", true);
                }
              });
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        } else {
          this.$emit("taskAdd", null, "Manage", false);
        }
      } else {
        var options = {
          netType: 2,
          id: this.taskOption.task.taskId,
          name: this.ruleForm.taskDescribe.taskName,
          type: this.ruleForm.taskDescribe.taskTypeId,
          startTime:
            this.taskTimeSet.BEtime.time == null
              ? null
              : this.taskTimeSet.BEtime.time[0],
          endTime:
            this.taskTimeSet.BEtime.time == null
              ? null
              : this.taskTimeSet.BEtime.time[1],
          stime:
            this.ruleForm.taskTimeSet.dayTime == null
              ? null
              : this.ruleForm.taskTimeSet.dayTime[0],
          etime:
            this.ruleForm.taskTimeSet.dayTime == null
              ? null
              : this.ruleForm.taskTimeSet.dayTime[1],
          timeType: this.taskTimeSet.monthTime.timeTpye,
          startDay: this.taskTimeSet.monthTime.timeB,
          endDay: this.taskTimeSet.monthTime.timeE,
          recallInterval: this.ruleForm.outCallTactics.intervaltime,
          recall: this.ruleForm.outCallTactics.outCallTimes,
          callTime: this.ruleForm.outCallTactics.outCallDuration,
          content: "123",
          audioId: this.radioSlect
        };
        if (q) {
          this.$refs["ruleForm"].validate(valid => {
            if (valid) {
              SOCTAPI.ecTaskOut_updateEcTaskOut(options).then(res => {
                if (res.status == 200 && res.data.errCode == 0) {
                  this.$emit("taskAdd", null, "Manage", true);
                  console.log("edit");
                }
              });
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        } else {
          this.$emit("taskAdd", null, "Manage", false);
        }
      }
    },
    // 编辑
    editTask(id) {
      var options = {
        id: id
      };
      SOCTAPI.ecTaskOut_getEcTaskOutById(options).then(res => {
        console.log(res);

        if (res.status == 200 && res.data.errCode == 0) {
          if (res.data.ecTaskOut != null || res.data.ecTaskOut != {}) {
            const idTaskData = res.data.ecTaskOut;
            this.ruleForm.taskDescribe.taskName = idTaskData.name;
            this.ruleForm.taskDescribe.taskTypeId = idTaskData.type;
            this.ruleForm.taskTimeSet.dayTime =
              idTaskData.stime == null
                ? null
                : [idTaskData.stime, idTaskData.etime];
            this.taskTimeSet.BEtime.checked =
              idTaskData.startTime == null ? false : true;
            this.taskTimeSet.BEtime.time =
              idTaskData.startTime == null
                ? null
                : [idTaskData.startTime, idTaskData.endTime];
            this.taskTimeSet.monthTime.checked =
              idTaskData.timeType == null ? false : true;
            this.taskTimeSet.monthTime.timeTpye = idTaskData.timeType;
            setTimeout(() => {
              this.taskTimeSet.monthTime.timeB = idTaskData.startDay;
              this.taskTimeSet.monthTime.timeE = idTaskData.endDay;
            });

            this.ruleForm.outCallTactics.intervaltime =
              idTaskData.recallInterval;
            this.ruleForm.outCallTactics.outCallTimes = idTaskData.recall;
            this.ruleForm.outCallTactics.outCallDuration = idTaskData.callTime;

            this.taskPeo.peoSureL = idTaskData.content;
            this.taskPeo.peoIdSureL = idTaskData.content;
          }
        }
      });
    },
    // 编辑数据展示
    editDataShow(idTaskData) {}
  },
  watch: {
    "taskTimeSet.monthTime.timeTpye": function(q) {
      var num = null;
      var numList = [];
      if (q == 1) {
        num = 31;
      } else {
        num = 7;
      }
      for (let index = 0; index < num; index++) {
        var item = {};
        if (q == 1) {
          item.value = index + 1 + "日";
          item.id = index + 1;
        } else {
          item.value = "周" + (index + 1);
          item.id = index + 1;
        }
        numList.push(item);
      }
      this.taskTimeDef.timeTpyeL = numList;
      this.taskTimeSet.monthTime.timeE = null;
      this.taskTimeSet.monthTime.timeB = null;
    },
    "taskTimeSet.BEtime.checked": function(q) {
      this.timeCheck = q;
      this.taskTimeSet.BEtime.BEtime = null;
    },
    "taskTimeSet.monthTime.checked": function(q) {
      this.timeCheck2 = q;
      this.taskTimeSet.BEtime.BEtime = null;
      this.taskTimeSet.monthTime.timeE = null;
      this.taskTimeSet.monthTime.timeB = null;
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
  height: 30px;
  width: 398px;
  text-align: center;
  line-height: 30px;
  border-bottom: 1px solid #d9d9d9;
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
.dialogS_box {
  height: 332px;
}
.dialogS_box .peoSelect {
  height: 30px;
  text-align: center;
  padding-bottom: 6px;
}
.dialogS_box .peoSelect span {
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #0978bd;
  width: 100px;
  height: 30px;
  /* color: #0978bd; */
  font-size: 16px;
  line-height: 28px;
  cursor: pointer;
}
.dialogS_box .peoSelect span:nth-child(1) {
  border-bottom-left-radius: 14px;
  border-top-left-radius: 14px;
  border-right: none;
}
.dialogS_box .peoSelect span:nth-child(2) {
  border-bottom-right-radius: 14px;
  border-top-right-radius: 14px;
}
.clickDef {
  color: #fff;
  background: #0978bd;
}
.dialogS_box .peoSelectL {
  height: 256px;
  overflow-y: auto;
}
.label_select {
  display: inline-block;
}
.label_select {
  display: inline-block;
}
</style>



