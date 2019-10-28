<template>
  <div class="username">
    <div v-show="show_content=='user'" style="min-width:1100px;">
      <div class="main_title">
        <span>系统管理 > 用户管理</span>
      </div>
      <div class="main_body">
        <div style="padding:20px 10px;">
          <div class="condition" style="margin-bottom:10px;">
            <span class="span">姓名：</span>
            <input type="text" placeholder="请输入内容" class="input" v-model="name"/>
            <span style="margin-left:10px;" class="span">用户名：</span>
            <input type="text" placeholder="请输入内容" class="input" v-model="username"/>
            <button class="search" @click="searchUser(pageSize,pageNum,'search')">查询</button>
            <button class="reset" @click="reset">重置</button>
          </div>
          <div class="condition" style="position:relative;">
            <span class="span">所属单位：</span>
            <input type="text" placeholder="请选择" @click="selectDept('search')" class="input" readonly unselectable="on" :value="searchDeptStr" style="padding-right:30px;cursor:default;"/>
            <i class="el-icon-menu" id="left_icon" @click="selectDept('search')"></i>
            <span style="margin-left:10px;" class="span">手机号码：</span>
            <input type="text" placeholder="请输入内容" class="input" v-model="phone"/>
            <div v-show="dialog_dept" class="select_style_search" style="left:82px;">
              <div class="select_style_scroll" style="width:314px;">
                <el-tree
                  :data="deptTreeArr"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="deptTree"
                  highlight-current
                  :props="defaultProps">
                </el-tree>
              </div>
              <div class="action_btn_right">
                <button class="sure" @click="deptSure('search')">确认</button>
              </div>
            </div>
          </div>
        </div>
        <div style="border-bottom:1px dotted #d9d9d9;"></div>
        <div style="text-align:right;">
          <div class="condition" style="padding:10px 0;">
            <button class="reset" style="margin:0;" @click="userAdd">新增</button>
          </div>
        </div>
        <selfTable :table="tableList" v-on:getTableData="getTableData"></selfTable>
        <div class="condition_page page_xp" v-show="show_page">
          <el-pagination
            background
            style="float:right;"
            layout="prev, pager, next"
            @current-change="changeCurrent"
            :page-size="pageSize"
            :current-page="pageNum"
            :total="total">
          </el-pagination>
          <span style="float:left;">Total：{{total}} </span>
        </div>
      </div>
    </div>
    <div v-if="show_content=='edit'" class="list_edit">
      <div class="main_title">
        <span v-show="isEditNotAdd">系统管理 > 用户管理编辑</span>
        <span v-show="!isEditNotAdd">系统管理 > 用户管理新增</span>
      </div>
      <div class="edit_height">
        <div class="edit">
          <el-form :rules="rules" ref="ruleForm" :model="ruleForm" label-suffix="：" hide-required-asterisk>
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="ruleForm.userName"></el-input><span class="span_red">*</span>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input><span class="span_red">*</span>
            </el-form-item>
            <el-form-item label="所属单位" style="position:relative;" prop="dept">
              <el-input @focus="selectDept('edit')" v-model="ruleForm.dept" readonly class="readonly_input"></el-input><span class="span_red">*</span>
              <i class="el-icon-menu" id="iconImage" @click="selectDept('edit')"></i>       
              <div v-show="edit_dept" class="select_style_edit" style="left:110px;">
                <div class="select_style_scroll" style="width:400px;">
                  <el-tree
                    :data="deptTreeArr"
                    :expand-on-click-node="false"
                    node-key="id"
                    @node-click="getNode"
                    ref="edit_deptTree"
                    highlight-current
                    :props="defaultProps">
                  </el-tree>
                </div>
                <div class="action_btn_right">
                  <input class="sure" value="确认" type="button" @click="deptSure('edit')"/>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="角色" prop="roleType">
              <el-select v-model="ruleForm.roleType" placeholder="请选择">
                <el-option
                  v-for="item in roleTypeArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <span class="span_red">*</span>
            </el-form-item>
            <el-form-item label="岗位" prop="duty">
              <el-input v-model="ruleForm.duty"></el-input><span class="span_red">*</span>   
            </el-form-item>
            <el-form-item label="手机号码" prop="phoneNum">
              <el-input v-model="ruleForm.phoneNum"></el-input><span class="span_red">*</span>
            </el-form-item>
            <el-form-item label="人员类型" prop="perType">
              <el-select v-model="ruleForm.perType" placeholder="请选择">
                <el-option
                  v-for="item in perTypeArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <span class="span_red">*</span>
            </el-form-item>
            <el-form-item>
              <div class="action_btn" style="margin:10px;">
                <input class="sure" value="保存" type="button" @click="userEditSure('ruleForm')"/>
                <input class="cancel" value="取消" type="button" @click="show_content = 'user'"/>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div v-show="show_content=='view'" class="list_view">
      <div class="main_title">
        <span>系统管理 > 用户管理查看</span>
      </div>
      <div class="view_height">
        <el-row>
          <el-col style="text-align:right;" :span="10">用户名：</el-col>
          <el-col :span="14">
            <input type="text" readonly unselectable="on" v-model="userName_view">
          </el-col>
        </el-row>
        <el-row>
          <el-col style="text-align:right;" :span="10">姓名：</el-col>
          <el-col :span="14">
            <input type="text" readonly unselectable="on" v-model="name_view">
          </el-col>
        </el-row>
        <el-row>
          <el-col style="text-align:right;" :span="10">所属单位：</el-col>
          <el-col :span="14">
            <input type="text" readonly unselectable="on" v-model="dept_view">
          </el-col>
        </el-row>
        <el-row>
          <el-col style="text-align:right;" :span="10">角色：</el-col>
          <el-col :span="14">
            <input type="text" readonly unselectable="on" v-model="role_view">
          </el-col>
        </el-row>
        <el-row>
          <el-col style="text-align:right;" :span="10">岗位：</el-col>
          <el-col :span="14">
            <input type="text" readonly unselectable="on" v-model="duty_view">
          </el-col>
        </el-row>
        <el-row>
          <el-col style="text-align:right;" :span="10">手机号码：</el-col>
          <el-col :span="14">
            <input type="text" readonly unselectable="on" v-model="phone_view">
          </el-col>
        </el-row>
        <el-row>
          <el-col style="text-align:right;" :span="10">人员类型：</el-col>
          <el-col :span="14">
            <input type="text" readonly unselectable="on" v-model="per_view">
          </el-col>
        </el-row>
        <div class="action_btn" style="padding:30px 0">
          <button class="cancel" @click="show_content = 'user'">返回</button>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import selfTable from "./../../components/self_table.vue"
import https from './../../unit/httpServer'
export default {
  name:'username',
  data() {
    return {
      // 查询字段
      name:'',
      username:'',
      phone:'',
      deptList:[],
      pageSize:14,
      pageNum:1,
      total:0,
      show_page:true,
      ruleForm: {
        name: '',
        userName: '',
        roleType: '',
        duty:'',
        dept:'',
        phoneNum:'',
        perType:''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        roleType:[
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        logType:[
          { required: true, message: '请选择登录类型', trigger: 'change' }
        ],
        duty:[
          { required: true, message: '请输入岗位', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        dept:[
          { required: true, message: '请输入所属单位', trigger: 'change' }
        ],
        phoneNum:[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
          { pattern: /^((13|14|15|17|18)[0-9]{1}\d{8})$/, message: '请输入正确的手机格式' }
        ],
        perType:[
          { required: true, message: '请选择人员', trigger: 'change' }
        ],
      },
      // 用户列表表格数据
      tableList:{
        tableData: [],
        tablelist:[
          {
            typeName:'序号',
            typePro:'index',
            width:'60px'
          },
          {
            typeName:"姓名",
            typePro:'name',
            width:'120px'
          },
          {
            typeName:"用户名",
            typePro:'userName'
          },
          {
            typeName:"角色",
            typePro:'role'
          },
          {
            typeName:"所属单位",
            typePro:'dept'
          },
          {
            typeName:"岗位",
            typePro:'job'
          },
          {
            typeName:"手机号码",
            typePro:'phone'
          },
          {
            typeName:"操作",
            typePro:'userAction',
            width:'150px'
          }
        ],
      },
      // 显示用户列表或新增或查看界面
      show_content:'user',
      // 显示用户编辑或新增title
      isEditNotAdd:true,
      // 角色类型下拉数据
      roleTypeArr:[],
      roleTypeValue:'',
      // 人员类型下拉数据
      perTypeArr:[
        {
          id:1,
          name:'普通用户'
        },
        {
          id:2,
          name:'应急人员'
        },
        {
          id:3,
          name:'行政人员'
        },
        {
          id:100,
          name:'大屏用户'
        }
      ],
      logSourceValue:'',
      // 所属单位数据以及查询条件中所属单位弹框
      dialog_dept:false,
      deptTreeArr:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      searchDeptStr :'',
      // 编辑界面id
      edit_id:'',
      // 编辑界面选中树对象
      deptObj:{},
      // 编辑界面所属单位弹框
      edit_dept:false,
      editDeptStr:'',
      // 查看界面字段
      userName_view:'',
      name_view:'',
      log_view:'',
      role_view:'',
      dept_view:'',
      duty_view:'',
      phone_view:'',
      per_view:'',
      // 标识，判断删除的是最后一个数据时，将当前页码减一
      len:'',
      // 唯一用户名，判断重名校验
      uniqueUserName:''
    }
  },
  components: {
    selfTable
  },
  created(){
    this.searchUser(this.pageSize,this.pageNum,'search');
    this.getDeptCtrl();
    this.getRoleCtrl();
  },
  methods: {
    // 获取单位树
    getDeptCtrl(){
      https.fetchPost('sys/control/getDeptTree').then(res => {
        if(res.data.errCode == 0){
          this.deptTreeArr = res.data.list;
        }else{
          this.$message({
            type: 'error',
            message: res.data.errMsg
          });
        }
      })
    },
    // 获取角色树
    getRoleCtrl(){
      https.fetchPost('sys/control/getRoleList').then(res => {
        if(res.data.errCode == 0){
          this.roleTypeArr = res.data.list;
        }else{
          this.$message({
            type: 'error',
            message: res.data.errMsg
          });
        }
      })
    },
    // 新增编辑点击获取单位
    getNode(data){
      this.deptObj = data;
    },
    // 查询用户
    searchUser(pageSize,pageNum,type){
      this.dialog_dept = false;
      // 点击查询将当前页值变为1
      if(type == 'search') {
        this.pageNum = 1;
      }else{
        this.pageNum = pageNum;
      }
      // 请求参数
      var params = {
        name:this.name.length==0?undefined:this.name,
        userName:this.username.length==0?undefined:this.username,
        phone:this.phone.length==0?undefined:this.phone,
        deptIdList:this.deptList.length==0?null:this.deptList,
        pageSize:pageSize,
        pageNo:this.pageNum
      }
      https.fetchPost('sys/userMgr/showPage',params).then(res => {      
        if(res.data.errCode == 0){
          if(res.data.list.length > 0){
            res.data.list.forEach((ele,index) => {
              ele['index'] = (res.data.page.pageNo - 1)*this.pageSize + index + 1;
            })
            this.tableList.tableData = res.data.list;
            this.total = res.data.page.total;
            this.show_page = true;
            this.len = res.data.list.length;
          }else{
            this.show_page = false;
            this.tableList.tableData = res.data.list;
          }
        }else{
          this.$message({
            type: 'error',
            message: res.data.errMsg
          });
        }
      })
    },
    // 点击分页查询用户
    changeCurrent(currentPage){
      this.pageNum = currentPage;
      this.searchUser(this.pageSize,this.pageNum,'');
    },
    // 重置
    reset(){
      this.dialog_dept = false;
      this.name = '';
      this.username = '';
      this.phone = '';
      this.$refs.deptTree.setCheckedKeys([]);
      this.deptList = [];
      this.searchDeptStr = '';
    },
    // 点击新增按钮
    userAdd(){
      this.show_content = 'edit';
      this.isEditNotAdd = false;
      this.editDeptStr = '';
      this.deptObj = {};
      this.ruleForm = {
        name: '',
        roleType: '',
        logType:'',
        duty:'',
        dept:'',
        phoneNum:'',
        perType:''
      }
      // 隐藏所属单位弹框
      this.dialog_dept = false;
      this.edit_dept = false;
    },
    // 点击基本操作
    getTableData(data){
      if(data.type == 'edit'){
        // 隐藏所属单位弹框
        this.dialog_dept = false;
        this.edit_dept = false;
        // 显示编辑界面
        this.show_content = 'edit';
        this.isEditNotAdd = true;
        // 记录id
        this.edit_id = data.data.id;
        // 所属单位
        this.deptObj = {};
        https.fetchPost('sys/userMgr/edit',{id:data.data.id}).then(res => {
          if(res.data.errCode==0){
            this.ruleForm = {
              name:res.data.user.name,
              userName:res.data.user.userName,
              roleType: res.data.user.roleId,
              duty:res.data.user.job,
              dept:res.data.user.dept,
              phoneNum:res.data.user.phone,
              perType:res.data.user.type
            }
            this.deptObj.id = res.data.user.deptId;
            this.uniqueUserName = res.data.user.userName;
          }else{
            this.$message({
              type: 'error',
              message: res.data.errMsg
            });
          }
        })
      }else if(data.type == 'view'){
        this.dialog_dept = false;
        this.edit_dept = false;
        this.show_content = 'view';
        https.fetchPost('sys/userMgr/edit',{id:data.data.id}).then(res => {
          if(res.data.errCode==0){
            this.name_view = res.data.user.name;
            this.userName_view = res.data.user.userName;
            // this.log_view = res.data.user.auth;
            this.role_view = res.data.user.role;
            this.dept_view = res.data.user.dept;
            this.duty_view = res.data.user.job;
            this.phone_view = res.data.user.phone;
            this.perTypeArr.forEach((ele,index) => {
              if(ele.id == res.data.user.type){
                this.per_view = ele.name;
              }
            })
          }else{
            this.$message({
              type: 'error',
              message: res.data.errMsg
            });
          }
        })
      }else if(data.type == 'delete'){
        // this.dialog_delete = true;
        this.$confirm('此操作将删除该条信息，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center:true,
          type: 'warning'
        }).then(() => {
          https.fetchPost('sys/userMgr/delete',{id:data.data.id}).then(res => {
            if(res.data.errCode ==0 ){
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              if(this.len==1&&data.data.index > 10&&(data.data.index-1)%14==0){
                this.pageNum = this.pageNum - 1;
              }
              this.searchUser(this.pageSize,this.pageNum,'');
            }else{
              this.$message({
                type: 'error',
                message: res.data.errMsg
              });
            }
          })  
        }).catch(()=>{

        })
      }else if(data.type == 'use'){
        if(data.data.status==1){
          var titleMsg = '你确认停用此用户吗?'
          var successMsg = '停用成功';
          var statusId = 0;
        }else{
          var titleMsg = '你确认启用此用户吗?'
          var successMsg = '启用成功';
          var statusId = 1;
        }
        this.$confirm(titleMsg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center:true,
          type: 'warning'
        }).then(() => {
          https.fetchPost('sys/userMgr/setUserStatus',{id:data.data.id,status:statusId}).then(res => {
            if(res.data.errCode==0){
              this.$message({
                type: 'success',
                message: successMsg,
              });
              this.searchUser(this.pageSize,this.pageNum,'');
            }else{
              this.$message({
                type: 'error',
                message: res.data.errMsg
              });
            }
          })
        }).catch(()=>{
          
        })
      }else if(data.type == 'reset'){
        this.$confirm('你确认重置此用户?重置后密码为123456', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center:true,
          type: 'warning'
        }).then(() => {
          https.fetchPost('sys/userMgr/resetPassword',{id:data.data.id}).then(res => {
            if(res.data.errCode ==0 ){
              this.$message({
                type: 'success',
                message: '重置密码成功!',
              });
              this.searchUser(this.pageSize,this.pageNum,'');
            }else{
              this.$message({
                type: 'error',
                message: res.data.errMsg
              });
            }
          })
        }).catch(()=>{
          
        })
      }
    },
    // 保存新增编辑用户
    userEditSure(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.isEditNotAdd == false){
            var obj = {};
            obj.name = this.ruleForm.name;
            obj.userName = this.ruleForm.userName;
            obj.roleId = this.ruleForm.roleType;
            obj.job = this.ruleForm.duty;
            obj.deptId = this.deptObj.id;
            obj.phone = this.ruleForm.phoneNum;
            obj.type = this.ruleForm.perType;
            https.fetchPost('sys/userMgr/checkUserName',{userName:this.ruleForm.userName}).then(res => {
              if(res.data.errCode==0){
                https.fetchPost('sys/userMgr/add',obj).then(res => {
                  if(res.data.errCode == 0){
                    this.show_content = 'user';
                    this.$message({
                      type: 'success',
                      message: '保存成功'
                    });
                    this.searchUser(this.pageSize,this.pageNum,'');
                  }
                })
              }else{
                this.$message({
                  type: 'error',
                  message: res.data.errMsg
                });
              }
            })
          }else{
            var obj = {};
            obj.id = this.edit_id;
            obj.name = this.ruleForm.name;
            obj.userName = this.ruleForm.userName;
            obj.roleId = this.ruleForm.roleType;
            obj.job = this.ruleForm.duty;
            obj.deptId = this.deptObj.id;
            obj.phone = this.ruleForm.phoneNum;
            obj.type = this.ruleForm.perType;
            if(this.uniqueUserName==this.ruleForm.userName){
              https.fetchPost('sys/userMgr/update',obj).then(res => {
                if(res.data.errCode == 0){
                  this.show_content = 'user';
                  this.$message({
                    type: 'success',
                    message: '保存成功'
                  });
                  this.searchUser(this.pageSize,this.pageNum,'');
                }else{
                  this.$message({
                    type: 'error',
                    message: res.data.errMsg
                  });
                }
              })
            }else{
              https.fetchPost('sys/userMgr/checkUserName',{userName:this.ruleForm.userName}).then(res => {
                if(res.data.errCode==0){
                  https.fetchPost('sys/userMgr/update',obj).then(res => {
                    if(res.data.errCode == 0){
                      this.show_content = 'user';
                      this.$message({
                        type: 'success',
                        message: '保存成功'
                      });
                      this.searchUser(this.pageSize,this.pageNum,'');
                    }else{
                      this.$message({
                        type: 'error',
                        message: res.data.errMsg
                      });
                    }
                  })
                }else{
                  this.$message({
                    type: 'error',
                    message: res.data.errMsg
                  });
                }
              })
            }
          }
        } else {
          return false;
        }
      });
    },
    // 显示单位树
    selectDept(type){
      if(type=='search'){
        this.dialog_dept = true;
      }else{
        this.edit_dept = true;
      }
    },
    // 确认选择单位树
    deptSure(type){
      if(type == 'search'){
        this.dialog_dept = false;
        var arr = [];
        this.$refs.deptTree.getCheckedNodes().forEach((e) => {
          arr.push(e.name);
        })  
        this.searchDeptStr = arr.join(',');
        this.deptList = this.$refs.deptTree.getCheckedKeys();
      }else{
        this.ruleForm.dept = this.deptObj.name;
        this.edit_dept = false;
      }
    }
  }
};
</script>
<style scoped>
  * {
    white-space: nowrap;
  }
  .username {
    background: #e4ebf0;
    min-width: 1100px;
    box-sizing: border-box;
    padding-bottom:10px;
  }
  .el-row {
    padding:30px 0 0;
  }
</style>