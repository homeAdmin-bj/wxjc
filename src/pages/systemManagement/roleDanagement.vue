<template>
  <div class="role">
    <div v-show="show_content=='role'" style="min-width:1100px;">
      <div class="main_title">
        <span>系统管理 > 角色管理</span>
      </div>
      <div class="main_body">
        <div style="padding:20px 10px;">
          <div class="condition" style="margin-bottom:10px;">
            <span class="span">角色名称：</span>
            <input type="text" placeholder="请输入内容" class="input" v-model="roleName"/>
            <button class="search" @click="searchRole(pageSize,pageNum,'search')">查询</button>
            <button class="reset" @click="reset">重置</button>
          </div>
        </div>
        <div style="border-bottom:1px dotted #d9d9d9;"></div>
        <div style="text-align:right;">
          <div class="condition" style="padding:10px 0;">
            <button class="reset" style="margin:0;" @click="roleAdd">新增</button>
          </div>
        </div>
        <selfTable :table="tableList" v-on:getTableData="getTableData"></selfTable>
        <div class="condition_page page_xp" v-show="show_page">
          <el-pagination
            @current-change="changeCurrent"
            style="float:right;"
            background
            layout="prev, pager, next"
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
        <span v-show="isEditNotAdd">系统管理 > 角色管理编辑</span>
        <span v-show="!isEditNotAdd">系统管理 > 角色管理新增</span>
      </div>
      <div class="edit_height">
        <div class="edit">
          <el-form :rules="rules" ref="ruleForm" :model="ruleForm" label-suffix="：" hide-required-asterisk>
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="ruleForm.roleName"></el-input><span class="span_red">*</span>
            </el-form-item>
            <el-form-item label="角色类型" prop="roleType">
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
            <el-form-item label="角色编码" prop="roleCode">
              <el-input v-model="ruleForm.roleCode"></el-input><span class="span_red">*</span>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDescript" style="margin-bottom:30px;">
              <el-input type="textarea" v-model="ruleForm.roleDescript"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="action_btn" style="margin:10px;">
                <input class="sure" value="保存" type="button" @click="roleEditSure('ruleForm')"/>
                <input class="cancel" value="取消" type="button" @click="show_content = 'role'"/>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import selfTable from "./../../components/self_table.vue"
import https from './../../unit/httpServer'
export default {
  name:'role',
  data() {
    return {
      // 查询条件
      roleName:'',
      pageSize:14,
      pageNum:1,
      // 分页
      total:0,
      show_page:true,
      roleId:'',
      // 记录角色名和角色编码，判断唯一性
      uniqueName:'',
      uniqueCode:'',
      // 表单验证
      ruleForm: {
        roleName: '',
        roleType: '',
        roleCode:'',
        roleDescript:''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        roleType:[
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        roleCode:[
          { required: true, message: '请输入角色编码', trigger: 'blur' },
          // { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        roleDescript:[
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
        ]
      },
      // 表格数据
      tableList:{
        tableData: [],
        tablelist:[
          {
            typeName:'序号',
            typePro:'index',
            width:'60px'
          },
          {
            typeName:"角色名称",
            typePro:'name'
          },
          {
            typeName:"角色类型",
            typePro:'type'
          },
          {
            typeName:"角色编码",
            typePro:'pri'
          },
          {
            typeName:"角色描述",
            typePro:'note'
          },
          {
            typeName:"操作",
            typePro:'roleAction',
            width:'80px'
          }
        ]
      },
      // 显示角色列表或新增或查看界面
      show_content:'role',
      // 显示角色编辑或新增title
      isEditNotAdd:true,
      roleTypeArr:[
        {
          id:1,
          name:'保障中心领导'
        },
        {
          id:2,
          name:'保障中心处室领导'
        },
        {
          id:3,
          name:'拨测业务用户（应急联系人）'
        },
        {
          id:4,
          name:'拨测业务用户（卫星终端）'
        },
        {
          id:5,
          name:'保障中心系统管理员'
        },
        {
          id:6,
          name:'行业单位领导'
        },
        {
          id:7,
          name:'应急体系单位单位领导'
        },
      ],
      // 标识，判断删除的是最后一个数据时，将当前页码减一
      len:''
    }
  },
  components: {
    selfTable
  },
  created(){ 
    this.searchRole(this.pageSize,this.pageNum,'search');
  },
  methods: {
    // 查询与重置
    searchRole(pageSize,pageNum,type){
      // 点击查询将当前页值变为1
      if(type == 'search') {
        this.pageNum = 1;
      }else{
        this.pageNum = pageNum;
      }
      var params = {
        pageSize:pageSize,
        pageNo:this.pageNum,
        name:this.roleName&&this.roleName.length>0?this.roleName:null
      }
      https.fetchPost('sys/roleMgr/showPage',params).then(res => {
        if(res.data.errCode==0){
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
    reset(){
      this.roleName = '';
    },
    changeCurrent(currentPage){
      this.pageNum = currentPage;
      this.searchRole(this.pageSize,this.pageNum,'');
    },
    getTableData(data){
      if(data.type == 'edit'){
        this.show_content = 'edit';
        this.isEditNotAdd = true;
        this.roleId = data.data.id;
        https.fetchPost('sys/roleMgr/edit',{id:data.data.id}).then(res => {
          if(res.data.errCode == 0){
            var roleObj = res.data.role;
            this.ruleForm = {
              roleName:roleObj.name,
              roleType: roleObj.type,
              roleCode:roleObj.pri,
              roleDescript:roleObj.note
            }
            this.uniqueName = roleObj.name;
            this.uniqueCode = roleObj.code;
          }else{
            this.$message({
              type: 'error',
              message: res.data.errMsg
            });
          }
        })
      }else if(data.type == 'delete'){
        this.$confirm('此操作将删除该条信息，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center:true,
          type: 'warning'
        }).then(() => {
          https.fetchPost('sys/roleMgr/delete',{id:data.data.id}).then(res => {
            if(res.data.errCode == 0 ){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              if(this.len==1&&data.data.index > 10&&(data.data.index-1)%14==0){
                this.pageNum = this.pageNum - 1;
              }
              this.searchRole(this.pageSize,this.pageNum,'');
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
    roleAdd(){
      this.show_content = 'edit';
      this.isEditNotAdd = false;
      this.uniqueName = '';
      this.uniqueCode = '';
      this.ruleForm = {
        roleName: '',
        roleType: '',
        roleCode:'',
        roleDescript:''
      }
    },
    roleEditSure(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.isEditNotAdd==false){
            var obj = {
              name:this.ruleForm.roleName,
              note:this.ruleForm.roleDescript,
              pri:this.ruleForm.roleCode,
              type:this.ruleForm.roleType
            }
            // userServer.roleCheck(this.ruleForm.roleName).then(res => {
              // if(res.data.errCode==0){
              //   if(res.data.validRoleName==true){
              //     this.$message({
              //       type: 'error',
              //       message: '角色名称已经存在，请重新添加角色名称'
              //     });     
              //   }else{
              //     userServer.codeCheck(this.ruleForm.roleCode).then(res => {
              //       if(res.data.errCode==0){
              //         if(res.data.validCode==true){
              //           this.$message({
              //             type: 'error',
              //             message: '角色编码已经存在，请重新添加角色编码'
              //           });     
              //         }else{
                        https.fetchPost('sys/roleMgr/add',obj).then(res => {
                          if(res.data.errCode==0){
                            this.show_content = 'role';
                            this.$message({
                              type: 'success',
                              message: '保存成功'
                            });
                            this.searchRole(this.pageSize,this.pageNum,'');
                          }else{
                            this.$message({
                              type: 'error',
                              message: res.data.retMsg
                            });      
                          }
                        })
              //         }
              //       }else{
              //         this.$message({
              //           type: 'error',
              //           message: res.data.errMsg
              //         });
              //       }
              //     })
              //   }
              // }else{
              //   this.$message({
              //     type: 'error',
              //     message: res.data.errMsg
              //   });
              // }
            // })
          }else{
            var obj = {
              id:this.roleId,
              name:this.ruleForm.roleName,
              note:this.ruleForm.roleDescript,
              pri:this.ruleForm.roleCode,
              type:this.ruleForm.roleType
            }
            // if(this.uniqueName==this.ruleForm.roleName&&this.uniqueCode==this.ruleForm.roleCode){
            //   userServer.roleEdit(obj).then(res => {
            //     if(res.data.errCode == 0 ){
            //       this.show_content = 'role';
            //       this.$message({
            //         type: 'success',
            //         message: '保存成功'
            //       });
            //       this.searchRole(this.pageSize,this.pageNum,'');
            //     }else{
            //       this.$message({
            //         type: 'error',
            //         message: res.data.errMsg
            //       });
            //     }
            //   })
            // }else if(this.uniqueName!=this.ruleForm.roleName&&this.uniqueCode==this.ruleForm.roleCode){
            //   userServer.roleCheck(this.ruleForm.roleName).then(res => {
            //     if(res.data.errCode==0){
            //       if(res.data.validRoleName==true){
            //         this.$message({
            //           type: 'error',
            //           message: '角色名称已经存在，请重新添加角色名称'
            //         });     
            //       }else{
                    https.fetchPost('sys/roleMgr/update',obj).then(res => {
                      if(res.data.errCode == 0 ){
                        this.show_content = 'role';
                        this.$message({
                          type: 'success',
                          message: '保存成功'
                        });
                        this.searchRole(this.pageSize,this.pageNum,'');
                      }else{
                        this.$message({
                          type: 'error',
                          message: res.data.errMsg
                        });
                      }
                    })
      //             }
      //           }else{
      //             this.$message({
      //               type: 'error',
      //               message: res.data.errMsg
      //             });
      //           }
      //         })
      //       }else if(this.uniqueName==this.ruleForm.roleName&&this.uniqueCode!=this.ruleForm.roleCode){
      //         userServer.codeCheck(this.ruleForm.roleCode).then(res => {
      //           if(res.data.errCode == 0){
      //             if(res.data.validCode==true){
      //               this.$message({
      //                 type: 'error',
      //                 message: '角色编码已经存在，请重新添加角色编码'
      //               });  
      //             }else{
      //               userServer.roleEdit(obj).then(res => {
      //                 if(res.data.errCode == 0 ){
      //                   this.show_content = 'role';
      //                   this.$message({
      //                     type: 'success',
      //                     message: '保存成功'
      //                   });
      //                   this.searchRole(this.pageSize,this.pageNum,'');
      //                 }else{
      //                   this.$message({
      //                     type: 'error',
      //                     message: res.data.errMsg
      //                   });
      //                 }
      //               })
      //             }
      //           }else{
      //             this.$message({
      //               type: 'error',
      //               message: res.data.errMsg
      //             });
      //           }
      //         })
      //       }else{
      //         userServer.roleCheck(this.ruleForm.roleName).then(res => {
      //           if(res.data.errCode==0){
      //             if(res.data.validRoleName==true){
      //               this.$message({
      //                 type: 'error',
      //                 message: '角色名称已经存在，请重新添加角色名称'
      //               });     
      //             }else{
      //               userServer.codeCheck(this.ruleForm.roleCode).then(res => {
      //                 if(res.data.errCode == 0){
      //                   if(res.data.validCode==true){
      //                     this.$message({
      //                       type: 'error',
      //                       message: '角色编码已经存在，请重新添加角色编码'
      //                     });  
      //                   }else{
      //                     userServer.roleEdit(obj).then(res => {
      //                       if(res.data.errCode == 0 ){
      //                         this.show_content = 'role';
      //                         this.$message({
      //                           type: 'success',
      //                           message: '保存成功'
      //                         });
      //                         this.searchRole(this.pageSize,this.pageNum,'');
      //                       }else{
      //                         this.$message({
      //                           type: 'error',
      //                           message: res.data.errMsg
      //                         });
      //                       }
      //                     })
      //                   }
      //                 }else{
      //                   this.$message({
      //                     type: 'error',
      //                     message: res.data.errMsg
      //                   });
      //                 }
      //               })
      //             }
      //           }else{
      //             this.$message({
      //               type: 'error',
      //               message: res.data.errMsg
      //             });
      //           }
      //         })
      //       }
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
  * {
    white-space: nowrap;
  }
  .role {
    background: #e4ebf0;
    min-width: 1100px;
    box-sizing: border-box;
    padding-bottom:10px;
  }
  .el-row {
    padding:30px 0 0;
  }
</style>