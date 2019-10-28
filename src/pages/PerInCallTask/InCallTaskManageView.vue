<template>
  <div id="IncomingCallManage"
    class="contentBox">
    <div class="contentBox_page contentBox_pageSee">
      <div class="page_title">
        <el-breadcrumb>
          <span>呼入任务管理</span>
          <span>{{contentBox.breadcrumb}}</span>
          <span>任务查看</span>
        </el-breadcrumb>
      </div>
      <div class="page_box"
        style="min-height: calc(100vh - 140px);">
        <div class="pageContent tableStyle">
          <div class="pageBox"
            style="margin-top: 0px;padding-top:10px;">
            <label>基本信息</label>
            <div class="chartBox"
              style="height:450px;">
              <div class="inforBox">
                <p><label>呼入任务名称：</label><span>{{name}}</span></p>
                <p><label>任务类型：</label><span>{{typeName}}</span></p>
                <p><label>执行时间：</label><span>{{startTime}} 至 {{endTime}}</span></p>
              </div>
              <div class="inforBox"
                style="height:268px;margin-top:50px;margin-bottom:40px;">
                <el-row :gutter="50">
                  <el-col :span="16">
                    <div style="height:268px;"
                      id="statChart"></div>
                  </el-col>
                  <el-col :span="8"
                    style="text-align:center;">
                    <!-- 进度条 -->
                    <div style="text-align:center;height:30px;margin-bottom:20px;color:#6d6d6d;>">总体进度：<span style="color: #0978bc;">{{inNum}}/{{totalUser}}</span></div>
                    <el-progress type="circle"
                      :width="220"
                      :stroke-width="25"
                      :percentage="progressNum"
                      color="#42a986"></el-progress>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="pageBox">
            <label>任务列表</label>
            <div class="chartBox">
              <div style="width:1016px;margin:auto;">
                <el-radio-group v-model="tabPosition"
                  style="margin: 10px 0;"
                  @change="tabChange(tabPosition)">
                  <!-- <el-radio-button label="1">呼入用户总数</el-radio-button> -->
                  <el-radio-button label="2">已呼入用户数</el-radio-button>
                  <el-radio-button label="3">未呼入用户数</el-radio-button>
                </el-radio-group>
                <span class="sure_btn messageBtn"
                  v-if="messageFlag==true"
                  @click="messdialogVisible = true"><i style="font-size:16px;margin-right:5px;"
                    class="el-icon-s-promotion"></i>发送短息</span>
                <div class="itemBox"
                  style="height:60px;">
                  <div class="itemInput">
                    <label>所属单位：</label>
                    <el-dropdown :hide-on-click="true"
                      trigger="click">
                      <span class="el-dropdown-link">
                        <el-input placeholder="请选择"
                          v-model="deptNameList"
                          suffix-icon="el-icon-menu"></el-input>
                      </span>
                      <el-dropdown-menu slot="dropdown"
                        style="width:280px;margin-top:8px;">
                        <div style="height:260px;overflow-y:auto;">
                          <el-tree :data="deptListData"
                            show-checkbox
                            accordion
                            node-key="id"
                            ref="tree"
                            highlight-current
                            :props="defaultProps">
                          </el-tree>
                        </div>
                        <div style="padding-top:10px;">
                          <el-dropdown-item>
                            <button style="outline: none;width:60px;height:30px;line-height:30px;border-radius:15px;background:#0978bc;border:none;color:#fff;float:right;margin:5px 8px;"
                              @click="treeCheckedNode">确定</button>
                          </el-dropdown-item>
                        </div>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="itemInput">
                    <label>姓名：</label>
                    <el-input v-model="userName"
                      style="width:230px;"></el-input>
                  </div>
                  <div class="itemBtn" 
                    style="margin-left:30px;width: 240px;">
                    <span class="backB"
                      @click="getTableList(tabPosition)">查询</span><span class="backB"
                      @click="reset">重置</span>
                  </div>
                </div>
                <el-table :data="tableData"
                  stripe
                  style="width:100%">
                  <el-table-column align="left"
                    width="60"
                    v-if="messageFlag==true"
                    fixed>
                    <template slot="header"
                      slot-scope="scope">
                      <el-checkbox v-model="checkAll"
                        @change="handleCheckAllChange"></el-checkbox>
                    </template>
                    <template slot-scope="scope">
                      <el-checkbox-group v-model="checkedId"
                        @change="handleCheckChange">
                        <el-checkbox :label="scope.row.testUserId"></el-checkbox>
                      </el-checkbox-group>
                    </template>
                  </el-table-column>
                  <el-table-column type="index"
                    label="序号"
                    fixed
                    width="60">
                  </el-table-column>
                  <!-- 呼出记录查询切换表格组件 -->
                  <tableColumn :tableHeadData="tableHeadData"></tableColumn>
                </el-table>
                <div class="paginationStyle"
                  v-if="tabPosition==2">
                  <!-- 已呼入分页 -->
                  <div class="total">Total:{{calledParams.total}}</div>
                  <el-pagination background
                    layout="prev, pager, next"
                    :current-page="calledParams.pageNo"
                    :total="calledParams.total"
                    :page-size="calledParams.pageSize"
                    @current-change="handleCurrentChange">
                  </el-pagination>
                </div>
                <div class="paginationStyle"
                  v-if="tabPosition==3">
                  <!-- 未呼入分页 -->
                  <div class="total">Total:{{notCalledParams.total}}</div>
                  <el-pagination background
                    layout="prev, pager, next"
                    :current-page="notCalledParams.pageNo"
                    :total="notCalledParams.total"
                    :page-size="notCalledParams.pageSize"
                    @current-change="handleCurrentChange">
                  </el-pagination>
                </div>
                <!-- <div style="width:1016px;text-align:center;margin-top:30px;">
              <button class="sure_btn" @click="pageReturn">返回</button>
            </div> -->
              </div>
            </div>
          </div>

          <!-- 发送短信弹出框 -->
          <el-dialog title=""
            width="450px"
            :visible.sync="messdialogVisible"
            center>
            <div style="height:290px;">
              <el-form :model="messageForm"
                ref="messageForm"
                label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="短信标题："
                  prop="title">
                  <el-input v-model="messageForm.title"
                    :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="短信内容："
                  prop="content"
                  :rules="[
                  { required: true, message: '标题不可为空'},
                  { min: 1, max: 120, message: '长度在1到200个字符', trigger: 'blur' } 
                ]">
                  <el-input type="textarea"
                    v-model="messageForm.content"
                    :rows="8"></el-input>
                </el-form-item>
                <el-form-item class="infoInput"
                  style="text-align:center;">
                  <input class="sure_btn"
                    type="button"
                    value="发送"
                    @click="submitMessForm('messageForm')">
                  <input class="cancel_btn"
                    type="button"
                    value="取消"
                    @click="messdialogVisible = false">
                </el-form-item>
              </el-form>
            </div>
          </el-dialog>
          <!-- 发送短信弹出框结束 -->
        </div>

      </div>
      <div style="height:50px;background-color: #e4ebf0;text-align: center;">
        <span class="backB" style="margin-top: 14px;"
          @click="backB">返回</span>
      </div>
    </div>

  </div>
</template>



<script>
import { contentBox } from "./../../unit/globalVar.js";
import https from "../../unit/httpServer";
import tableColumn from "../PerOutCallRecord/table";
import echarts from "echarts";
export default {
  data() {
    return {
      contentBox: contentBox,
      calledParams: {
        //已呼入
        pageNo: 1,
        total: null,
        pageSize: 10,
        taskId: null,
        dids: null,
        userName: null,
        frequency: 1
      },
      notCalledParams: {
        //未呼入
        pageNo: 1,
        total: null,
        pageSize: 2,
        taskId: null,
        dids: null,
        userName: null,
        frequency: 0
      },
      dids: null,
      deptListData: null,
      deptNameList: null,
      defaultProps: {
        children: "children",
        label: "name"
      },
      userName: null,
      name: null, //任务名称
      typeName: null, //类型
      startTime: null,
      endTime: null,
      totalUser: null, //任务用户总数
      inNum: null, //已呼入用户数
      progressNum: 0, //进度条
      messdialogVisible: false, //发送短信弹出框
      checkAll: false, //是否全选
      checkedId: [], //选中userId数组，传参
      checkedIdList: [], //复选全部userId数组
      emergencyData: [], //echart图数据
      messageForm: {
        title: null,
        content: null,
        netType: 1,
        sysUserIds: null,
        taskId: null
      }, //短信
      tabPosition: 2, //任务列表中的表格切换标识
      messageFlag: false, //短信发送功能在true时显示
      tableHeadData: [
        { prop: "dpetName", label: "所属单位", width: "" },
        { prop: "name", label: "姓名", width: "" },
        { prop: "testPhone", label: "手机号码", width: "" },
        { prop: "time", label: "最后呼入时间", width: "" },
        { prop: "sec", label: "通话时长", width: "" },
        { prop: "frequency", label: "次数", width: "" }
      ],
      tableData: [], //已呼入、未呼入表格数据
      notCalledData: [] //全部未呼入列表数据，全选时用
    };
  },
  components: {
    tableColumn
  },
  props: ["taskParams"],
  mounted() {
    //console.log(this.$route.params);
    var v = this;
    this.calledParams.taskId = this.taskParams.id;
    this.notCalledParams.taskId = this.taskParams.id;
    (this.messageForm = {
      title: null,
      content: null,
      netType: 1,
      sysUserIds: null,
      taskId: v.taskParams.id
    }),
      //请求单位树
      https.fetchPost("/sys/control/getDeptTree").then(function(res) {
        if (res.data.errCode == 0) {
          v.deptListData = res.data.list;
          console.log(v.deptListData);
        } else {
          v.$message({ message: res.data.errMsg, type: "error" });
        }
      });
    this.getInformation(this.taskParams.id); //请求基本信息
  },
  methods: {
    getInformation(ID) {
      //获取基本信息
      var v = this;
      https
        .fetchPost("/dialing/ecTaskIn/selectById", { id: ID })
        .then(function(res) {
          console.log(res);
          if (res.data.errCode == 0) {
            v.name = res.data.ecTaskIn.name;
            v.startTime = res.data.ecTaskIn.startTime;
            v.endTime = res.data.ecTaskIn.endTime;
            v.totalUser = res.data.ecTaskIn.total;
            v.inNum = res.data.ecTaskIn.inNum;
            v.progressNum = (100 * v.inNum) / v.totalUser;
            v.emergencyData = [v.totalUser, v.inNum, v.totalUser - v.inNum];
            if (res.data.ecTaskIn.type == 1) {
              v.typeName = "日常";
            } else {
              v.typeName = "临时";
            }
            v.messageForm.title = res.data.ecTaskIn.name;
            //如对未呼入用户发短信，短信标题默认为任务名，不可修改
            v.getChartdata();
            v.getTableList(2);
          } else {
            v.$message({ message: res.data.errMsg, type: "error" });
          }
        });
    },
    // pageReturn(){ //返回上一页
    //   this.$router.push({ name:this.$route.params.pageUrl,params:this.$route.params});
    // },
    getChartdata() {
      //echart图
      var pathSymbols = {
        yonghu:
          "path://M815.815 299.35c0 165.307-134.012 299.351-299.351 299.351s-299.35-134.012-299.35-299.35C217.113 134.044 351.124 0 516.463 0s299.35 134.012 299.35 299.35zM763.528 612.78c-69.758 55.071-156.219 85.662-247.064 85.662-91.901 0-179.195-31.295-249.272-87.421C82.493 678.827 0 915.779 0 1024h1027.712c0-107.26-83.134-342.55-264.184-411.187z"
      };
      this.charts = echarts.init(document.getElementById("statChart"));
      var option = {
        grid: {
          left: "20",
          right: "0",
          bottom: "10",
          top: "50",
          containLabel: true
        },
        textStyle: {
          color: "#6d6d6d"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: "{b0}<br />{a0}：{c0}"
          // formatter: function (params) {
          //     return params[0].name + ': ' + params[0].value;
          // }
        },
        // legend: {
        //   itemWidth:15,
        //   // itemHeight:14,
        //   selectedMode:false,
        //   data: [{name:'卫星终端',icon:'rect'},{name:'应急联系人',icon:'rect'}],
        //   textStyle: {
        //     color: '#6d6d6d'
        //   },
        // },
        xAxis: {
          data: ["用户总数", "已呼入用户数", "未呼入用户数"],
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            textStyle: {
              color: "#6d6d6d"
            }
          }
        },
        yAxis: {
          splitLine: { show: true },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: true }
        },
        color: ["#0978bc", "#2ed0ff"],
        series: [
          {
            name: "应急联系人",
            type: "pictorialBar",
            barCategoryGap: "40%",
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            itemStyle: {
              normal: {
                opacity: 1
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.emergencyData,
            z: 10
          },
          {
            name: "应急联系人",
            type: "pictorialBar",
            // barGap: '-100%',
            symbolPosition: "end",
            symbolSize: 20,
            symbolOffset: [0, "-120%"],
            data: [
              {
                value: this.emergencyData[0],
                symbol: pathSymbols.yonghu,
                symbolSize: [15, 15]
              },
              {
                value: this.emergencyData[1],
                symbol: pathSymbols.yonghu,
                symbolSize: [15, 15]
              },
              {
                value: this.emergencyData[2],
                symbol: pathSymbols.yonghu,
                symbolSize: [15, 15]
              }
            ]
          }
        ]
      };
      this.charts.setOption(option, true);
    },
    tabChange(code) {
      //表格页面切换
      this.dids = null;
      this.deptNameList = null;
      this.userName = null;
      var v = this;
      if (code == 2) {
        //已呼入
        this.messageFlag = false;
        this.tableHeadData = [
          { prop: "dpetName", label: "所属单位", width: "" },
          { prop: "name", label: "姓名", width: "" },
          { prop: "testPhone", label: "手机号码", width: "" },
          { prop: "time", label: "最后呼入时间", width: "" },
          { prop: "sec", label: "通话时长", width: "" },
          { prop: "frequency", label: "次数", width: "" }
        ];
      } else {
        //未呼入
        this.messageFlag = true;
        this.tableHeadData = [
          { prop: "dpetName", label: "所属单位", width: "" },
          { prop: "name", label: "姓名", width: "" },
          { prop: "testPhone", label: "手机号码", width: "" }
        ];
        //请求所有未呼入用户，为全选操作准备数据
        https
          .fetchPost("/dialing/ecTaskInRecord/findByTaskInRecordIds", {
            pageNo: 1,
            pageSize: 10000,
            taskId: this.taskParams.id,
            dids: this.dids,
            userName: this.userName,
            frequency: 0
          })
          .then(function(res) {
            console.log(res);
            if (res.data.errCode == 0) {
              v.notCalledData = res.data.list; //全选时根据未呼入列表的用户ID数组进行判断
            } else {
              v.$message({ message: res.data.errMsg, type: "error" });
            }
          });
      }
      this.getTableList(this.tabPosition);
    },
    handleCheckAllChange(val) {
      //全选时选择表格全部数据，遍历数组用户id
      this.checkedIdList = []; //清空
      this.notCalledData.forEach((ele, index) => {
        this.checkedIdList.push(ele.testUserId);
      });
      this.checkedId = val ? this.checkedIdList : [];
      this.isIndeterminate = false;
      console.log(this.checkedId);
    },
    handleCheckChange(val) {
      //复选框点击
      this.checkedId = val;
      console.log(this.checkedId);
    },
    reset() {
      //重置
      this.dids = null;
      this.userName = null;
      this.deptNameList = null;
    },
    treeCheckedNode() {
      //确定选中节点
      // console.log(this.$refs.tree.getCheckedNodes());
      // console.log(this.$refs.tree.getCheckedKeys());
      var node = this.$refs.tree.getCheckedNodes();
      var nodeNameArr = [];
      node.forEach(function(element, index) {
        nodeNameArr.push(element.name);
      });
      this.deptNameList = nodeNameArr.join(",");
      this.dids = this.$refs.tree.getCheckedKeys();
    },
    getTableList(tabPosition) {
      //呼入/未呼入列表
      var v = this;
      if (tabPosition == 2) {
        //已呼入
        this.calledParams.dids = this.dids;
        this.calledParams.userName = this.userName;
        this.calledParams.frequency = 1;
        https
          .fetchPost(
            "/dialing/ecTaskInRecord/findByTaskInRecordIds",
            this.calledParams
          )
          .then(function(res) {
            console.log(res);
            if (res.data.errCode == 0) {
              v.calledParams.total = res.data.page.total;
              v.tableData = res.data.list;
            } else {
              v.$message({ message: res.data.errMsg, type: "error" });
            }
          });
      } else {
        //未呼入
        this.notCalledParams.dids = this.dids;
        this.notCalledParams.userName = this.userName;
        this.notCalledParams.frequency = 0;
        https
          .fetchPost(
            "/dialing/ecTaskInRecord/findByTaskInRecordIds",
            this.notCalledParams
          )
          .then(function(res) {
            console.log(res);
            if (res.data.errCode == 0) {
              v.notCalledParams.total = res.data.page.total;
              v.tableData = res.data.list;
            } else {
              v.$message({ message: res.data.errMsg, type: "error" });
            }
          });
      }
    },
    handleCurrentChange(value) {
      //分页
      // console.log(this.checkedId);
      if (this.tabPosition == 2) {
        this.calledParams.pageNo = value;
        this.getTableList(2);
      } else if (this.tabPosition == 3) {
        this.notCalledParams.pageNo = value;
        this.getTableList(3);
      }
    },
    submitMessForm(formName) {
      //短信发送
      var v = this;
      v.messageForm.sysUserIds = v.checkedId;
      // this.selectList
      this.$refs[formName].validate(valid => {
        if (valid) {
          https
            .fetchPost("/dialing/ecSms/saveEcSms", v.messageForm)
            .then(function(res) {
              console.log(res);
              if (res.data.errCode == 0) {
              } else {
                v.$message({ message: res.data.errMsg, type: "error" });
              }
            });
        }
      });
    },
    backB() {
      this.$emit("taskAdd", null, "Manage", false);
    }
  }
};
</script>
<style scoped>
.pageBox {
  margin-top: 10px;
  font-family: "微软雅黑";
}
.pageBox > label {
  display: inline-block;
  width: 70px;
  vertical-align: top;
  text-align: right;
  color: #0978bc;
  font-size: 15px;
}
.pageBox .chartBox {
  display: inline-block;
  margin-top: 10px;
  border-top: 1px #d9d9d9 dashed;
  width: calc(100% - 80px);
}

.inforBox {
  width: 1016px;
  margin: auto;
  box-sizing: border-box;
}
.inforBox p {
  height: 20px;
  margin-top: 15px;
  font-size: 14px;
  font-family: "微软雅黑";
}
.inforBox p label {
  display: inline-block;
  color: #6d6d6d;
  text-align: right;
  width: 100px;
  font-size: 14px;
  font-family: "微软雅黑";
}

.messageBtn {
  float: right;
  margin-top: 10px;
  display: inline-block;
  height: 25px;
  width: 100px;
  font-size: 14px;
  text-align: center;
  line-height: 25px;
}
.sure_btn .el-icon-s-promotion:hover {
  color: #fff;
}
.backB {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 60px;
  height: 30px;
  border: 1px solid #0978bc;
  text-align: center;
  line-height: 28px;
  border-radius: 15px;
  margin-right: 14px;
  color: #0978bc;
  font-size: 14px;
  cursor: pointer;
  background: #fff;
}
.backB:hover {
  background: #0978bc;
  color: #fff;
}
</style>

