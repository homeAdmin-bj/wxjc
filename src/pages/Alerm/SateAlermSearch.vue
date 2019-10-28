<template>
  <div class="infor_Page">
    <p style="height:30px;line-height:30px;color:#222;font-size:12px;margin-left:10px;">告警管理>告警查询</p> 
    <div class="pageContent tableStyle">
      <div class="itemBox">
          <div>
            <!-- <div class="itemInput">
              <label>告警名称：</label>
              <el-input v-model="name"></el-input>
            </div> -->
            <div class="itemInput">
              <label>告警时间：</label>
              <el-date-picker
                  v-model="date"
                  type="datetimerange"
                  align="left"
                  value-format="yyyy-MM-dd HH:mm:ss" 
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="itemBtn">
              <button class="sure_btn" @click="search">查询</button>
              <button class="cancel_btn" @click="reSet">重置</button> 
            </div>
          </div>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width:100%">
        <el-table-column
          prop="index"
          label="序号"
          width="70">
        </el-table-column>
        <el-table-column
          prop="title"
          label="拨测用户">
        </el-table-column>
        <el-table-column
          prop="type"
          label="手机号码">
            <template slot-scope="scope" >
            <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="scope.row.type">{{scope.row.type}}</div>       
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="所属单位">
            <template slot-scope="scope" >
            <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="scope.row.title">{{scope.row.title}}</div>       
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="告警信息">
            <template slot-scope="scope" >
            <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="scope.row.type">{{scope.row.type}}</div>       
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="告警时间">
            <template slot-scope="scope" >
            <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="scope.row.type">{{scope.row.type}}</div>       
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationStyle">
        <div class="total">total:{{total}}</div>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="curPage"
          :total="total"
          :page-size="pageSize"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>      
    </div> 
  </div>
</template>
<script>
export default {
  data () {
    return {
      curPage:1,
      total:0,
      pageSize:14,
      date:null,
      name:null,
      tableData: []
     
    }
  },
  created () {
    
  },
  methods: {
    handleCurrentChange(value){  //分页
      this.curPage = value;
    },
    reSet(){},
    search(){
      
    }
    
  }
}
</script>
<style scoped>

</style>

