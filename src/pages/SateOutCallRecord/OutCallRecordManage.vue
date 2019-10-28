<template>
  <div>
    <div v-if="flag==1" class="infor_Page">
      <p style="height:30px;line-height:30px;color:#222;font-size:12px;margin-left:10px;">卫星终端呼出管理>呼出记录查询</p> 
      <div class="pageContent tableStyle">
        <div class="itemBox">
          <div>
            <div class="itemInput">
              <label>任务名称：</label>
              <el-input v-model="name"></el-input>
            </div>
            <div class="itemInput">
              <label>任务执行时间：</label>
              <el-date-picker
                  v-model="date"
                  :editable="false"
                  :clearable="false"
                  type="daterange"
                  align="left"
                  value-format="yyyy-MM-dd" 
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" @change="dateChange">
              </el-date-picker>
            </div>
            <div class="itemBtn">
              <button class="sure_btn" @click="search">查询</button>
              <button class="cancel_btn" @click="reset">重置</button> 
            </div>
          </div>
          <div>
            <div class="itemInput">
              <label>任务状态：</label>
              <el-select v-model="status" placeholder="请选择">
                <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="itemInput">
              <label>任务类型：</label>
              <el-select v-model="type" placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <el-table
          :data="tableData"
          stripe
          border
          style="width:100%">
          <el-table-column
            prop="index"
            label="序号"
            width="70">
          </el-table-column>
          <el-table-column
            prop="name"
            label="任务名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="status"
            label="任务状态" width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0" class="statusClass" style="background:#ef5a76">未执行</span>
                <span v-else-if="scope.row.status == 1" class="statusClass" style="background:#e9875c">执行中</span>
                <span v-else-if="scope.row.status == 2" class="statusClass" style="background:#42a986">已完成</span>
                <span v-else-if="scope.row.status == 3" class="statusClass" style="background:#0978bc">暂停</span>
              </template>
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="任务类型" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="total"
            label="任务用户总数"  show-overflow-tooltip>
          </el-table-column>
           <el-table-column
            prop="inNum"
            label="呼叫成功" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop=""
            label="操作" width="120">
            <template slot-scope="scope">
              <i v-if="scope.row.status==0||scope.row.status==3" class="el-icon-document" style="font-size:20px;color:rgb(130, 137, 142);"></i> 
              <i v-if="scope.row.status==1||scope.row.status==2" class="el-icon-document" style="font-size:20px;color:#0978bc;" @click="toInforView(scope.row.id)" title="查看"></i>      
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationStyle">
          <div class="total">Total：{{total}}</div>
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="pageNo"
            :total="total"
            :page-size="pageSize"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>      
      </div> 
    </div>
    <div v-if="flag==2" class="infor_Page">
      <taskInforById :taskParams="taskParams"></taskInforById>
      <div style="text-align:center;margin:20px;">
        <button class="sure_btn" @click="flag=1">返回</button>
      </div>
    </div>
  </div>
</template>
<script>
import https from '../../unit/httpServer'
import taskInforById from "../PerOutCallRecord/OutCallRecordManageView";
export default {
  data () {
    return {
      flag:1,
      pageNo:1,
      total:null,
      pageSize:14,
      date:[new Date(new Date().setTime(new Date().getTime() - 3600 * 1000* 24 * 30*6)),new Date()],
      // date:null,  //日期
      name:null,    //名称
      type:null,    //类型
      status:null,  //状态
      statusList:[{id:null,name:'全部'},{id:0,name:'未执行'},{id:1,name:'执行中'},{id:2,name:'已完成'},{id:3,name:'暂停'}],
      typeList:[{id:null,name:'全部'},{id:1,name:'日常'},{id:2,name:'临时'}],
      tableData: [], //表格数据
      taskParams:null,
    }
  },
  components: {
    taskInforById,
  },
  mounted () {  
    this.search();
  },
  methods: {
    dateChange(){//时间函数
      console.log(this.date)
    },
    handleCurrentChange(value){  //分页
      this.pageNo = value;
      this.search();
    },
    search(){ //查询
      var v=this;
      https.fetchPost('/dialing/ecTaskOut/showPage',{
        startTime:this.date!=null?this.date[0]:null,
        endTime:this.date!=null?this.date[1]:null,
        name:this.name,
        type:this.type,
        status:this.status,
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        netType:2
      }).then(function(res){
        console.log(res);
        if(res.data.errCode==0){
          v.total=res.data.page.total;
          v.tableData=res.data.list;
          v.tableData.forEach((ele,index) => {
            ele['index'] = (v.pageNo-1)*v.pageSize + index +1;
            if(ele.type == 1){
              ele.typeName="日常";
            }else{
              ele.typeName="临时";
            };
          });
        }else{
          v.$message({message: res.data.errMsg,type: 'error'});
        }
      })   
    },
    reset(){  //重置
      this.type=null;
      this.status=null;
      this.name=null;
      this.date=null;
    },
    toInforView(id){
      this.flag=2;
      this.taskParams={id:id,netType:2}
      // this.$router.push({ name: 'PerInCallRecordManageView',params:{id:id,pageNo:this.pageNo,pageSize:this.pageSize,startTime:this.startTime,endTime:this.endTime,name:this.name,status:this.status,type:this.type,pageUrl:'PerInCallRecordManage'}});
    }
  }
}
</script>
<style scoped>

</style>

