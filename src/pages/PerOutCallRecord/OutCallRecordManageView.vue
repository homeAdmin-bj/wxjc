<template>
  <div>
    <p style="height:30px;line-height:30px;color:#222;font-size:12px;margin-left:10px;">呼出记录管理>信息查看</p>
    <div class="pageContent tableStyle" style="height:1120px;">
      <div class="pageBox">
        <label>基本信息</label>
        <div class="chartBox" style="height:450px;">
          <div class="inforBox">
            <p><label>呼出任务名称：</label><span>{{name}}</span></p>
            <p><label>任务类型：</label><span>{{typeName}}</span></p>
            <p><label>执行时间：</label><span>{{startTime}} 至 {{endTime}}</span></p>
          </div>
          <div class="inforBox" style="height:268px;margin-top:50px;margin-bottom:40px;">
            <el-row :gutter="50">
              <el-col :span="16"><div style="height:268px;" id="statChart"></div></el-col>
              <el-col :span="8" style="text-align:center;">
                <!-- 进度条 -->
                <div style="text-align:center;height:30px;margin-bottom:20px;color:#6d6d6d;>">总体进度：<span style="color: #0978bc;">{{inNum}}/{{totalUser}}</span></div>
                <el-progress type="circle" :width="220" :stroke-width="25" :percentage="progressNum" color="#42a986"></el-progress>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="pageBox">
        <label>任务列表</label>
        <div class="chartBox" style="height:600px;">
          <div style="width:1016px;margin:auto;">
            <el-radio-group v-model="tabPosition" style="margin: 10px 0;" @change="tabChange(tabPosition)">
              <el-radio-button label="2">已呼出用户</el-radio-button>
              <el-radio-button label="3">未呼出用户</el-radio-button>
            </el-radio-group>
            <div class="itemBox" style="height:60px;">
              <div class="itemInput">
                <label>所属单位：</label>
                <el-dropdown  :hide-on-click="true" trigger="click">
                  <span class="el-dropdown-link">
                      <el-input placeholder="请选择" v-model="deptNameList" suffix-icon="el-icon-menu"></el-input>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="width:280px;margin-top:8px;" >
                      <div style="height:260px;overflow-y:auto;">
                        <el-tree
                        :data="deptListData"
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
                        <button style="outline: none;width:60px;height:30px;line-height:30px;border-radius:15px;background:#0978bc;border:none;color:#fff;float:right;margin:5px 8px;" @click="treeCheckedNode">确定</button>
                      </el-dropdown-item>
                    </div>
                    </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="itemInput">
                <label>姓名：</label>
                <el-input v-model="userName" style="width:230px;"></el-input>
              </div>
              <div class="itemBtn" style="margin-left:30px;">
                <button class="sure_btn" @click="getTableList(tabPosition)">查询</button>
                <button class="cancel_btn" @click="reset">重置</button> 
              </div>
            </div>
            <el-table
              :data="tableData"
              stripe
              border
              style="width:100%">     
              <el-table-column
                type="index"
                label="序号"
                fixed
                width="60" >
              </el-table-column>
                <!-- 呼出记录查询切换表格组件 -->
              <tableColumn :tableHeadData="tableHeadData"></tableColumn>
            </el-table>
            <div class="paginationStyle" v-if="tabPosition==2">
              <!-- 已呼出分页 -->
              <div class="total">Total:{{calledParams.total}}</div>
              <el-pagination
                background
                layout="prev, pager, next"
                :current-page="calledParams.pageNo"
                :total="calledParams.total"
                :page-size="calledParams.pageSize"
                @current-change="handleCurrentChange">
              </el-pagination>
            </div>
            <div class="paginationStyle" v-if="tabPosition==3">
              <!-- 未呼出分页 -->
              <div class="total">Total:{{notCalledParams.total}}</div>
              <el-pagination
                background
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
    </div> 
  </div>
</template>
<script>
import https from '../../unit/httpServer'
import tableColumn from "../PerOutCallRecord/table";
import echarts from 'echarts';
export default {
  data () {
    return {
      calledParams:{  //已呼出
        pageNo:1,
        total:null,
        pageSize:10,
        taskId:null,
        dids:null,
        userName:null,
        frequency:1
      },
      notCalledParams:{  //未呼出
        pageNo:1,
        total:null,
        pageSize:10,
        taskId:null,
        dids:null,
        userName:null,
        frequency:0
      },
      dids:null, //部门id数组
      deptListData:null,   //部门列表
      deptNameList:null,   //输入框的部门名称显示列表
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      userName:null,
      name:null,  //任务名称
      typeName:null,  //类型
      startTime:null,  
      endTime:null,
      totalUser:null,   //任务用户总数
      inNum:null,       //已呼出用户数
      progressNum:0,  //进度条
      emergencyData:[],    //echart图数据
      tabPosition: 2,  //任务列表中的表格切换标识
      tableHeadData:[
        {prop:'dpetName',label:'所属单位',width:''},
        {prop:'name',label:'姓名',width:''},
        {prop:'testPhone',label:'手机号码',width:''},
        {prop:'connectTime',label:'接通时间',width:''},
        {prop:'lastCallTime',label:'最后呼叫时间',width:''},         
        {prop:'sec',label:'通话时长',width:''},
        {prop:'onState',label:'接通状态',width:''},
        {prop:'frequency',label:'次数',width:''},
      ],
      tableData: [],     //已呼入、未呼入表格数据
    }
  },
  components: {
    tableColumn,
  },
  props: ["taskParams"],
  mounted () {
    var v = this;
    this.calledParams.taskId = this.taskParams.id;  //组件所需参数
    this.notCalledParams.taskId = this.taskParams.id;
    //请求单位树
    https.fetchPost('/sys/control/getDeptTree').then(function(res){     
      if(res.data.errCode==0){
        v.deptListData=res.data.list;
        console.log(v.deptListData);
      }else{
        v.$message({message: res.data.errMsg,type: 'error'});
      }
    });
    this.getInformation(this.taskParams.id)  //请求基本信息
  },
  methods: {
    getInformation(ID){ //获取基本信息
      var v=this;
      https.fetchPost('/dialing/ecTaskOut/selectById',{id:ID}).then(function(res){
        console.log(res);
        if(res.data.errCode==0){
          v.name=res.data.ecTaskOut.name;
          v.startTime=res.data.ecTaskOut.startTime;
          v.endTime=res.data.ecTaskOut.endTime;
          v.totalUser=res.data.ecTaskOut.total;
          v.inNum=res.data.ecTaskOut.inNum;
          v.progressNum=100*v.inNum/v.totalUser;
          v.emergencyData=[v.totalUser,v.inNum,v.totalUser-v.inNum]
          if(res.data.ecTaskOut.type == 1){
            v.typeName='日常';
          }else{
            v.typeName='临时';
          };
          v.getChartdata();
          v.getTableList(2);
        }else{
          v.$message({message: res.data.errMsg,type: 'error'});
        }
      })
    }, 
    getChartdata(){ //echart图
      var pathSvg = {
        shouji:'path://M756.048807 164.101475H267.028171v615.471606h489.020636V164.101475m-193.502086-49.599651c0-5.510504-4.652973-9.918907-10.224875-9.918907h-101.894692c-5.571902 0-10.226922 4.409426-10.226922 9.918907v9.918907c0 5.450129 4.65502 9.920954 10.226922 9.920953h101.894692c5.571902 0 10.224876-4.470825 10.224875-9.920953v-9.918907m-50.947345 784.235264c22.412452 0 40.72247-17.880229 40.72247-39.741119 0-21.799492-18.310018-39.680744-40.72247-39.680745-22.410406 0-40.782845 17.882276-40.782846 39.680745 0.001023 21.86089 18.372439 39.74112 40.782846 39.741119m244.449431 59.521629H267.028171c-33.616632 0-61.111846-26.821879-61.111846-59.521629V124.420731c0-32.760125 27.495214-59.582003 61.111846-59.582004h489.020636c33.679054 0 61.174268 26.821879 61.174268 59.582004v774.316357c0 32.69975-27.495214 59.521628-61.174268 59.521629m0 0',
        yonghu:'path://M815.815 299.35c0 165.307-134.012 299.351-299.351 299.351s-299.35-134.012-299.35-299.35C217.113 134.044 351.124 0 516.463 0s299.35 134.012 299.35 299.35zM763.528 612.78c-69.758 55.071-156.219 85.662-247.064 85.662-91.901 0-179.195-31.295-249.272-87.421C82.493 678.827 0 915.779 0 1024h1027.712c0-107.26-83.134-342.55-264.184-411.187z'};
      var pathSymbols;
      var seriesName;
      if(this.taskParams.netType == 1){
        pathSymbols = pathSvg.yonghu;
        seriesName = '应急联系人';
      }else{
        pathSymbols = pathSvg.shouji;
        seriesName = '卫星终端';
      }; 
      this.charts = echarts.init(document.getElementById("statChart"));
      var option = {
        grid: {
          left: '20',
          right: '0',
          bottom: '10',
          top:'50',
          containLabel: true
        },
        textStyle: {
          color: '#6d6d6d'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            },
            formatter:'{b0}<br />{a0}：{c0}'
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
          data:['用户总数', '接通用户数', '未接通用户数'],
          axisTick: {show: false},
          axisLine: {show: false},
          axisLabel: {
              textStyle: {
                  color: '#6d6d6d'
              }
          }
        },
        yAxis: {
            splitLine: {show: true},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: true},
        },
        color:['#0978bc','#2ed0ff'],
        series: [
          {
            name: seriesName,
            type: 'pictorialBar',
            barCategoryGap: '40%',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
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
            name: seriesName,
            type: 'pictorialBar',
            // barGap: '-100%',
            symbolPosition: 'end',
            symbolSize: 20,
            symbolOffset: [0, '-120%'],
            data: [
              {
              value: this.emergencyData[0],
              symbol: pathSymbols,
              symbolSize: [13, 15]
              }, {
              value: this.emergencyData[1],
              symbol: pathSymbols,
              symbolSize: [13, 15]
              },{
              value: this.emergencyData[2],
              symbol: pathSymbols,
              symbolSize: [13, 15]
              }
            ],         
          }
        ]
      };
      this.charts.setOption(option, true); 
    },
    tabChange(code){//表格页面切换
      this.dids=null;
      this.deptNameList=null;
      this.userName=null;
      var v= this;
      if(code == 2){  //已呼出
        this.messageFlag=false;
        this.tableHeadData=[
          {prop:'dpetName',label:'所属单位',width:''},
          {prop:'name',label:'姓名',width:''},
          {prop:'testPhone',label:'手机号码',width:''},
          {prop:'connectTime',label:'接通时间',width:''},
          {prop:'lastCallTime',label:'最后呼叫时间',width:''},         
          {prop:'sec',label:'通话时长',width:''},
          {prop:'onState',label:'接通状态',width:''},
          {prop:'frequency',label:'次数',width:''},
        ];
      }else{  //未呼入
        this.messageFlag=true;
        this.tableHeadData=[
          {prop:'dpetName',label:'所属单位',width:''},
          {prop:'name',label:'姓名',width:''},          
          {prop:'testPhone',label:'手机号码',width:''},    
        ];   
        this.getTableList(this.tabPosition);
      }
    },
    reset(){  //重置
      this.dids=null;
      this.userName=null;
      this.deptNameList=null;
    }, 
    treeCheckedNode(){//确定选中节点
      // console.log(this.$refs.tree.getCheckedNodes());
      // console.log(this.$refs.tree.getCheckedKeys());
      var node=this.$refs.tree.getCheckedNodes();
      var nodeNameArr = [];
      node.forEach( function(element, index) {
        nodeNameArr.push(element.name);
      });
      this.deptNameList = nodeNameArr.join(",");
      this.dids=this.$refs.tree.getCheckedKeys();        
    },
    getTableList(tabPosition){  //呼出/未呼出列表
      var v=this;
      if(tabPosition == 2){
        //已呼入
        this.calledParams.dids=this.dids;
        this.calledParams.userName=this.userName;
        this.calledParams.frequency=1;
        https.fetchPost('/dialing/ecTaskOutRecord/findByTaskOutRecordIds',this.calledParams).then(function(res){
          console.log(res);
          if(res.data.errCode==0){
            v.calledParams.total=res.data.page.total;
            v.tableData=res.data.list;
            v.tableData.forEach((ele,index) => {
              ele['index'] = (v.calledParams.pageNo-1)*v.calledParams.pageSize + index +1; 
            });
          }else{
            v.$message({message: res.data.errMsg,type: 'error'});
          }
        })
      }else{//未呼入
        this.notCalledParams.dids=this.dids;
        this.notCalledParams.userName=this.userName;
        this.notCalledParams.frequency=0;
        https.fetchPost('/dialing/ecTaskOutRecord/findByTaskOutRecordIds',this.notCalledParams).then(function(res){
          console.log(res);
          if(res.data.errCode==0){
            v.notCalledParams.total=res.data.page.total;
            v.tableData=res.data.list;
            v.tableData.forEach((ele,index) => {
              ele['index'] = (v.notCalledParams.pageNo-1)*v.notCalledParams.pageSize + index +1; 
            });
          }else{
            v.$message({message: res.data.errMsg,type: 'error'});
          }
        })
      }
    }, 
    handleCurrentChange(value){  //分页
      // console.log(this.checkedId);
      if(this.tabPosition == 2){
        this.calledParams.pageNo=value;
        this.getTableList(2);
      }else if(this.tabPosition == 3){
        this.notCalledParams.pageNo=value;
        this.getTableList(3);
      }
    },
  }    
}
</script>
<style scoped>
.pageBox{
  margin-top:10px;font-family: "微软雅黑";
}
.pageBox > label{
  display:inline-block;
  width:70px;
  vertical-align:top;
  text-align:right;
  color: #0978bc;
  font-size: 15px;
}
.pageBox .chartBox{
  display:inline-block;
  margin-top:10px;
  border-top:1px #d9d9d9 dashed;
  width:calc(100% - 80px);
}

.inforBox{width: 1016px;margin:auto;box-sizing:border-box;}
.inforBox p{height: 20px;margin-top:15px;font-size: 14px;font-family: "微软雅黑";}
.inforBox p label{
  display: inline-block;
  color: #6d6d6d;
  text-align: right;
  width:100px;
  font-size: 14px;
  font-family: "微软雅黑";
}

.messageBtn{float:right;margin-top:10px;display:inline-block;height:25px;width:100px;font-size:14px;text-align:center;line-height:25px;}
.sure_btn .el-icon-s-promotion:hover {
  color:#fff;
}
</style>

