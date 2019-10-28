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
              <div class="text_label"><label for="">呼出任务名称 :</label></div>
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
                <label for="">重复日期 :</label>
              </div>
              <el-form-item prop="taskTimeSet.BEtime.day">
                <el-date-picker v-model="ruleForm.taskTimeSet.BEtime.day"
                  type="daterange"
                  :editable="false"
                  :clearable="false"
                  value-format="timestamp"
                  format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>

            </div>
            <div>
              <div class="text_label">
                <label for="">重复时间 :</label>
              </div>
              <el-time-select v-model="taskTimeSet.BEtime.Btime"
                value-format="timestamp"
                format="hh:mm"
                placeholder="起始时间"
                :picker-options="{  start: '00:30',  step: '00:30',  end: '23:30'}">
              </el-time-select>&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;<el-time-select v-model="taskTimeSet.BEtime.Etime"
                value-format="timestamp"
                format="hh:mm"
                placeholder="结束时间"
                :picker-options="{  start: '00:30',  step: '00:30',  end: '23:30'}">
              </el-time-select>
            </div>
            <div v-if="taskCycle == 2">
              <div class="text_label">
                <label for="">重复周期 :</label>
              </div>
              <el-select v-model="taskTimeSet.monthTime.timeTpye"
                placeholder="请选择">
                <el-option v-for="item in taskTimeDef.timeTpye"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div v-if="taskCycle == 2 && monthTime_timeTpye == 1">
              <div class="text_label">
                <label for="">&nbsp;</label>
              </div>
              <div class="label_select label_select2">每
                <el-select v-model="taskTimeSet.monthTime.timeT"
                  placeholder="请选择">
                  <el-option v-for="item in taskTimeDef.timeTpyeT"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select> 月的
              </div>
              <div class="label_select label_select2">
                <el-select v-model="taskTimeSet.monthTime.timeB"
                  placeholder="请选择">
                  <el-option v-for="item in taskTimeDef.timeTpyeL"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div> 号到
              <div class="label_select label_select2">
                <el-select v-model="taskTimeSet.monthTime.timeE"
                  placeholder="请选择">
                  <el-option v-for="item in taskTimeDef.timeTpyeL"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div> 号
            </div>
            <div v-if="taskCycle == 2 && monthTime_timeTpye == 3">
              <div class="text_label">
                <label for="">&nbsp;</label>
              </div>
              <div class="label_select label_select2">每
                <el-select v-model="taskTimeSet.monthTime.timeT"
                  placeholder="请选择">
                  <el-option v-for="item in taskTimeDef.timeTpyeL"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select> 天
              </div>
            </div>
            <div v-if="taskCycle == 2 && monthTime_timeTpye == 2">
              <div class="text_label">
                <label for="">&nbsp;</label>
              </div>
              <div class="label_select label_select2">每
                <el-select v-model="taskTimeSet.monthTime.timeT"
                  placeholder="请选择">
                  <el-option v-for="item in taskTimeDef.timeTpyeW"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select> 周
              </div>
            </div>
            <div v-if="taskCycle == 2 && monthTime_timeTpye == 2">
              <div class="text_label">
                <label for="">&nbsp;</label>
              </div>
              <div class="label_select label_select2">
                <el-checkbox v-model="taskTimeSet.weekTime.week1">星期1</el-checkbox>
                <el-checkbox v-model="taskTimeSet.weekTime.week2">星期2</el-checkbox>
                <el-checkbox v-model="taskTimeSet.weekTime.week3">星期3</el-checkbox>
                <el-checkbox v-model="taskTimeSet.weekTime.week4">星期4</el-checkbox>
                <!-- <el-checkbox v-model="taskTimeSet.weekTime.week5">星期5</el-checkbox> -->
                <!-- <el-checkbox v-model="taskTimeSet.weekTime.week6">星期6</el-checkbox> -->
                <!-- <el-checkbox v-model="taskTimeSet.weekTime.week7">星期7</el-checkbox> -->
              </div>
            </div>
            <div v-if="taskCycle == 2 && monthTime_timeTpye == 2">
              <div class="text_label">
                <label for="">&nbsp;</label>
              </div>
              <div class="label_select label_select2">
                <el-checkbox v-model="taskTimeSet.weekTime.week5">星期5</el-checkbox>
                <el-checkbox v-model="taskTimeSet.weekTime.week6">星期6</el-checkbox>
                <el-checkbox v-model="taskTimeSet.weekTime.week7">星期7</el-checkbox>
              </div>
            </div>
          </div>
          <div class="line">
            <span>呼出策略设置</span><span></span>
          </div>
          <div class="text">
            <div>
              <div class="text_label"><label for="">重拨间隔时间 :</label></div>
              <el-form-item prop="outCallTactics.intervaltime">
                <el-input v-model.number="ruleForm.outCallTactics.intervaltime">
                  <template slot="append">分钟</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <div class="text_label"><label for="">最多拨打次数 :</label></div>
              <el-form-item prop="outCallTactics.outCallTimes">
                <el-input v-model.number="ruleForm.outCallTactics.outCallTimes">
                  <template slot="append">次</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <div class="text_label"><label for="">拨通后最长通话时间 :</label></div>
              <el-form-item prop="outCallTactics.outCallDuration">
                <el-input v-model.number="ruleForm.outCallTactics.outCallDuration">
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
                      <span>{{item.name}}</span>
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
      width="392px">
      <div class="dialogS_box">
        <div class="peoSelect"
          ref="peoSelect">
          <span class="clickDef"
            @click="PeoTpye(1)">按单位</span><span @click="PeoTpye(2)">按人员</span><span @click="PeoTpye(3)">自定义分组</span>
        </div>
        <div class="peoSelectL"
          v-loading="treeLoading">
          <el-tree :data="taskPeo.defaultPeoL"
            show-checkbox
            ref="treeCity"
            :default-checked-keys="taskPeo.peoIdSureL"
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
import { INCALLAPI } from "./../../api/InCallTaskApi";
import { SOCTAPI } from "./../../api/SateOutCallTaskApi";
export default {
  data() {
    // inTask --> outTask
    var valtaskName = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error("请输入数字值"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    var outCallTimes = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入数字值"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    var outCallDuration = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入数字值"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    return {
      treeLoading: false,
      radioSlect: null,
      taskCycle: null,
      PeoTpyeId: null,
      contentBox: contentBox,
      defaultProps: {
        children: "children",
        label: "name"
      },
      peoDialog: false,
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
          BEtime: {
            day: null
          }
        },
        outCallTactics: {
          intervaltime: null,
          outCallTimes: null,
          outCallDuration: null
        }
      },
      rules: {
        "taskDescribe.taskName": [
          {
            required: true,
            message: "请输入任务名称",
            trigger: "blur"
          },
          {
            required: true,
            message: "请输入任务名称",
            trigger: "change"
          }
        ],
        "taskDescribe.taskTypeId": [
          { required: true, message: "请选择任务类型", trigger: "change" }
        ],
        "taskTimeSet.BEtime.day": [
          { required: true, message: "请选择日期", trigger: "blur" }
        ],
        "outCallTactics.intervaltime": [
          {
            required: true,
            validator: valtaskName,
            trigger: "change"
          }
        ],
        "outCallTactics.outCallTimes": [
          {
            required: true,
            validator: outCallTimes,
            trigger: "change"
          }
        ],
        "outCallTactics.outCallDuration": [
          {
            required: true,
            validator: outCallDuration,
            trigger: "change"
          }
        ]
      },
      taskTimeDef: {
        timeTpye: [
          { id: 1, label: "按月" },
          { id: 2, label: "按周" },
          { id: 3, label: "按日" }
        ],
        timeTpyeL: null,
        timeTpyeT: null
      },
      taskTimeSet: {
        BEtime: {
          Btime: "08:30",
          Etime: "17:30"
        },
        monthTime: {
          timeTpye: null,
          timeT: null,
          timeB: null,
          timeE: null
        },
        weekTime: {
          week1: false,
          week2: false,
          week3: false,
          week4: false,
          week5: false,
          week6: false,
          week7: false
        }
      },
      taskPeo: {
        peoSureL: null,
        peoIdSureL: null,
        selectedPeoL: null,
        selectedPeoIdL: null,
        defaultPeoL: null
      },
      monthTime_timeTpye: null,
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
    });
    this.taskTimeSet.monthTime.timeTpye = 1;
    // 是否为周期任务
    this.taskCycle = this.taskOption.addType;
    this.breadcrumb =
      this.taskOption.taskD == undefined ? "任务新增" : "任务编辑";
    if (this.taskOption.taskD != undefined) {
      this.editTask(this.taskOption.taskD.taskId);
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
      INCALLAPI.ecAudioCtrl_showPage(options).then(res => {
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
    //语音页码改变
    pageChange(p) {
      this.pageInfo.currentPage = p;
      //   console.log(p);
      this.getTableBodyData();
    },
    // 外呼语音设置
    voiceSet(s) {
      var options = {
        id: s.id
      };
      INCALLAPI.ecAudioCtrl_updateTaskDefault(options).then(res => {
        // console.log(res);
        if (res.status == 200 && res.data.errCode == 0) {
          this.getTableBodyData();
        }
      });
    },
    // 添加拨测人员
    peoAddDialog() {
      this.peoDialog = true;
      this.treeLoading = true;
      this.taskPeo.defaultPeoL = null;
      setTimeout(() => {
        this.PeoTpye(1);
      });
      // this.PeoTpye(1);
    },
    // 获取拨测单位人员
    getUnitPeo(d) {
      if (d == 1) {
        INCALLAPI.control_getDeptTree().then(res => {
          if (res.status == 200 && res.data.errCode == 0) {
            if (res.data.list != undefined) {
              this.treeLoading = false;
              this.taskPeo.defaultPeoL = res.data.list;
            }
          }
        });
      } else if (d == 2) {
        var opt = {
          netType: 1
        };
        INCALLAPI.commonControl_getDeptTestUser(opt).then(res => {
          if (res.status == 200 && res.data.errCode == 0) {
            console.log(res);
            if (res.data.list != undefined) {
              this.treeLoading = false;
              this.taskPeo.defaultPeoL = res.data.list;
            }
          }
        });
      } else {
          var opt = {
          netType: 1
        };
        INCALLAPI.testGroup_selectEcTestUsers(opt).then(res => {
          if (res.status == 200 && res.data.errCode == 0) {
            console.log(res);
            if (res.data.groups != undefined) {
              this.treeLoading = false;
              this.taskPeo.defaultPeoL = res.data.groups;
            }
          }
        });
      }
    },
    // 切换拨测单位人员
    PeoTpye(d) {
      this.PeoTpyeId = d;
      this.treeLoading = true;
      this.taskPeo.selectedPeoL = null;
      this.taskPeo.selectedPeoIdL = null;
      if (d == 1) {
        this.$refs.peoSelect.firstChild.style["color"] = "#fff";
        this.$refs.peoSelect.firstChild.style["background"] = "#0978bd";
        this.$refs.peoSelect.lastChild.style["color"] = "#0978bd";
        this.$refs.peoSelect.lastChild.style["background"] = "#fff";
        this.$refs.peoSelect.children[1].style["color"] = "#0978bd";
        this.$refs.peoSelect.children[1].style["background"] = "#fff";
      } else if (d == 2) {
        this.$refs.peoSelect.children[1].style["color"] = "#fff";
        this.$refs.peoSelect.children[1].style["background"] = "#0978bd";
        this.$refs.peoSelect.lastChild.style["color"] = "#0978bd";
        this.$refs.peoSelect.lastChild.style["background"] = "#fff";
        this.$refs.peoSelect.firstChild.style["color"] = "#0978bd";
        this.$refs.peoSelect.firstChild.style["background"] = "#fff";
      } else {
        this.$refs.peoSelect.lastChild.style["color"] = "#fff";
        this.$refs.peoSelect.lastChild.style["background"] = "#0978bd";
        this.$refs.peoSelect.children[1].style["color"] = "#0978bd";
        this.$refs.peoSelect.children[1].style["background"] = "#fff";
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
      //   console.log(this.taskPeo.peoSureL);
      //   console.log(this.taskPeo.peoIdSureL);
    },
    // 人员删除
    peoDel(i) {
      Object.keys(this.taskPeo).forEach(key => {
        // console.log(key);
        // console.log(this.taskPeo[key]);

        if (key != "defaultPeoL") {
          this.taskPeo[key] = this.taskPeo[key].filter(item => {
            return item.id == undefined ? item != i.id : item.id != i.id;
          });
        }
      });
    },
    // 保存 取消
    taskPreClick(q) {
      console.log(this.taskTimeSet.BEtime.Btime);

      if (q) {
        if (this.taskOption.taskD == undefined) {
          //新增
          if (this.taskOption.addType == 1) {
            //普通新增
            this.$refs["ruleForm"].validate(valid => {
              if (valid) {
                var options = {
                  netType: 1,
                  name: this.ruleForm.taskDescribe.taskName,
                  type: this.ruleForm.taskDescribe.taskTypeId,
                  startTime:
                    this.ruleForm.taskTimeSet.BEtime.day == null
                      ? null
                      : this.ruleForm.taskTimeSet.BEtime.day[0],
                  endTime:
                    this.ruleForm.taskTimeSet.BEtime.day == null
                      ? null
                      : this.ruleForm.taskTimeSet.BEtime.day[1],
                  content: this.taskPeo.peoIdSureL.join(","),
                  depElect: this.PeoTpyeId == 1 ? 1 : 0,
                  stratHm: this.taskTimeSet.BEtime.Btime,
                  endHm: this.taskTimeSet.BEtime.Etime,
                  recallInterval: this.ruleForm.outCallTactics.intervaltime,
                  recall: this.ruleForm.outCallTactics.outCallTimes,
                  callTime: this.ruleForm.outCallTactics.outCallDuration,
                  audioId: this.radioSlect
                };
                SOCTAPI.ecTaskOut_saveGeneralEcTaskOut(options).then(res => {
                  if (res.status == 200 && res.data.errCode == 0) {
                    this.$message({
                      type: "success",
                      message: "添加成功!"
                    });
                    this.$emit("taskAdd", null, "Manage", true);
                  }
                });
              } else {
                // this.$message({
                //   type: "info",
                //   message: "操作删除"
                // });
                return false;
              }
            });
          } else {
            //周期新增
            this.$refs["ruleForm"].validate(valid => {
              if (valid) {
                var weekList = [];
                Object.keys(this.taskTimeSet.weekTime).forEach(key => {
                  if (this.taskTimeSet.weekTime[key]) {
                    weekList.push(key.slice(4));
                  }
                });
                var options = {
                  netType: 1,
                  name: this.ruleForm.taskDescribe.taskName,
                  type: this.ruleForm.taskDescribe.taskTypeId,
                  repetitionStime:
                    this.ruleForm.taskTimeSet.BEtime.day == null
                      ? null
                      : this.ruleForm.taskTimeSet.BEtime.day[0],
                  repetitionEtime:
                    this.ruleForm.taskTimeSet.BEtime.day == null
                      ? null
                      : this.ruleForm.taskTimeSet.BEtime.day[1],
                  content: this.taskPeo.peoIdSureL.join(","),
                  depElect: this.PeoTpyeId == 1 ? 1 : 0,
                  timeType: this.taskTimeSet.monthTime.timeTpye,
                  timeNum: this.taskTimeSet.monthTime.timeT,
                  startDay:
                    this.taskTimeSet.monthTime.timeTpye != 1
                      ? null
                      : this.taskTimeSet.monthTime.timeB,
                  endDay:
                    this.taskTimeSet.monthTime.timeTpye != 1
                      ? null
                      : this.taskTimeSet.monthTime.timeE,
                  weekSeveral:
                    this.taskTimeSet.monthTime.timeTpye != 2
                      ? null
                      : weekList.join(","),
                  stratHm: this.taskTimeSet.BEtime.Btime,
                  endHm: this.taskTimeSet.BEtime.Etime,
                  recallInterval: this.ruleForm.outCallTactics.intervaltime,
                  recall: this.ruleForm.outCallTactics.outCallTimes,
                  callTime: this.ruleForm.outCallTactics.outCallDuration,
                  audioId: this.radioSlect
                };
                SOCTAPI.ecTaskOut_saveCycleEcTaskOut(options).then(res => {
                  if (res.status == 200 && res.data.errCode == 0) {
                    this.$message({
                      type: "success",
                      message: "添加成功!"
                    });
                    this.$emit("taskAdd", null, "Manage", true);
                  }
                });
              } else {
                // this.$message({
                //   type: "info",
                //   message: "操作删除"
                // });
                return false;
              }
            });
          }
        } else {
          //编辑
          this.$refs["ruleForm"].validate(valid => {
            if (valid) {
              var options = {
                netType: 1,
                id: this.taskOption.taskD.taskId,
                name: this.ruleForm.taskDescribe.taskName,
                type: this.ruleForm.taskDescribe.taskTypeId,
                startTime:
                  this.ruleForm.taskTimeSet.BEtime.day == null
                    ? null
                    : this.ruleForm.taskTimeSet.BEtime.day[0],
                endTime:
                  this.ruleForm.taskTimeSet.BEtime.day == null
                    ? null
                    : this.ruleForm.taskTimeSet.BEtime.day[1],
                content: this.taskPeo.peoIdSureL.join(","),
                depElect: this.PeoTpyeId == 1 ? 1 : 0,
                stratHm: this.taskTimeSet.BEtime.Btime,
                endHm: this.taskTimeSet.BEtime.Etime,
                recallInterval: this.ruleForm.outCallTactics.intervaltime,
                recall: this.ruleForm.outCallTactics.outCallTimes,
                callTime: this.ruleForm.outCallTactics.outCallDuration,
                audioId: this.radioSlect
              };
              SOCTAPI.ecTaskOut_updateByEcTaskOut(options).then(res => {
                if (res.status == 200 && res.data.errCode == 0) {
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  this.$emit("taskAdd", null, "Manage", true);
                }
              });
            } else {
              // this.$message({
              //   type: "info",
              //   message: "操作删除"
              // });
              return false;
            }
          });
        }
      } else {
        this.$emit("taskAdd", null, "Manage", false);
      }
    },
    // 编辑
    editTask(id) {
      var options = {
        id: id
      };
      SOCTAPI.ecTaskOut_selectById(options).then(res => {
        console.log(res);
        if (res.status == 200 && res.data.errCode == 0) {
          if (res.data.ecTaskOut != undefined) {
            this.ruleForm.taskDescribe.taskName = res.data.ecTaskOut.name;
            this.ruleForm.taskDescribe.taskTypeId = res.data.ecTaskOut.type;
            this.ruleForm.outCallTactics.intervaltime =
              res.data.ecTaskOut.recallInterval;
            this.ruleForm.outCallTactics.outCallTimes =
              res.data.ecTaskOut.recall;
            this.ruleForm.outCallTactics.outCallDuration =
              res.data.ecTaskOut.callTime;
            this.radioSlect = res.data.ecTaskOut.audioId;
            this.ruleForm.taskTimeSet.BEtime.day = [
              new Date(res.data.ecTaskOut.startTime.split(" ")[0]).getTime(),
              new Date(res.data.ecTaskOut.endTime.split(" ")[0]).getTime()
            ];
            this.taskTimeSet.BEtime.Btime =
              res.data.ecTaskOut.stime == null
                ? null
                : res.data.ecTaskOut.stime.split(" ")[1].slice(0, 5);
            this.taskTimeSet.BEtime.Etime =
              res.data.ecTaskOut.etime == null
                ? null
                : res.data.ecTaskOut.etime.split(" ")[1].slice(0, 5);
            INCALLAPI.ecTaskIn_findByEcTaskInfo({
              content: res.data.ecTaskOut.content,
              depElect: res.data.ecTaskOut.depElect
            }).then(res => {
              if (res.status == 200 && res.data.errCode == 0) {
                console.log(res);
                var contentName = [];
                if (res.data.list != undefined) {
                  this.taskPeo.peoSureL = res.data.list;
                  this.taskPeo.selectedPeoL = res.data.list;
                }
              }
            });
            this.taskPeo.peoIdSureL = res.data.ecTaskOut.content.split(",");
            this.taskPeo.selectedPeoIdL = res.data.ecTaskOut.content.split(",");
          }
        }
      });
    }
  },
  watch: {
    "taskTimeSet.monthTime.timeTpye": function(q) {
      this.monthTime_timeTpye = q;
      this.taskTimeDef.timeTpyeL = null;
      this.taskTimeDef.timeTpyeT = null;
      var num = null;
      var num2 = null;
      var numList = [];
      var numList2 = [];
      if (q == 1 || q == 3) {
        num = 31;
        num2 = 12;
        for (let index = 0; index < num; index++) {
          var item = {};
          item.value = index + 1;
          item.id = index + 1;
          numList.push(item);
        }
        for (let index = 0; index < num2; index++) {
          var item = {};
          item.value = index + 1;
          item.id = index + 1;
          numList2.push(item);
        }
        this.taskTimeDef.timeTpyeL = numList;
        this.taskTimeDef.timeTpyeT = numList2;
        this.taskTimeSet.monthTime.timeT = 1;
        this.taskTimeSet.monthTime.timeE = 1;
        this.taskTimeSet.monthTime.timeB = 1;
      } else {
        num = 7;
        for (let index = 0; index < num; index++) {
          var item = {};
          item.value = index + 1;
          item.id = index + 1;
          numList.push(item);
        }
        this.taskTimeDef.timeTpyeW = numList;
        this.taskTimeSet.monthTime.timeT = 1;
        this.taskTimeSet.monthTime.timeE = 1;
        this.taskTimeSet.monthTime.timeB = 1;
      }
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
  /* border-bottom-right-radius: 14px; */
  /* border-top-right-radius: 14px; */
}
.dialogS_box .peoSelect span:nth-child(3) {
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



