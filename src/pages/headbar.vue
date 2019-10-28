<template>
  <div id="home_header">
    <div class="main">
      <img style="float:left;" src="./../assets/image/header_person.png"/><span style="margin:0 20px 0 10px;cursor:default;">{{userObj.name}}</span><span style="cursor:default">{{currentDate}}</span><i style="margin:0 17px 0 20px;cursor:pointer;" class="el-icon-arrow-down" @click="isShowBox"></i>
      <div v-show="show_box" class="box">
        <span class="shape"></span>
        <div class="message">
          <div class="message_every">
            <label>用户名：</label>
            <span>{{userObj.userName}}</span>
          </div>
          <div class="message_every">
            <label>姓名：</label>
            <span>{{userObj.name}}</span>
          </div>
          <div class="message_every">
            <label>手机号：</label>
            <span>{{userObj.phone}}</span>
          </div>
        </div>
        <div class="operation" @click="changePhone">
          <label>
            <i class="el-icon-mobile-phone"></i>
          </label>
          <span>修改手机号</span>
        </div>
        <div class="operation" @click="changePass">
          <label>
            <i class="el-icon-edit-outline"></i>
          </label>
          <span>修改密码</span>
        </div>
        <div class="operation" @click="back">
          <label>
            <i class="el-icon-circle-close"></i>
          </label>
          <span>退出登录</span>
        </div>
      </div>
    </div>
    <div class="header_bac"></div>
    <!-- 手机号密码修改 -->
    <el-dialog
      title="手机号修改"
      :visible.sync="dialogVisiblePho"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="430px"
      class="password"
    >
      <el-form :model="ruleFormPhone" :rules="rulesPhone" ref="ruleFormPhone" label-width="80px">
        <el-form-item label="旧手机号：" prop="oldPho">
          <el-input v-model="ruleFormPhone.oldPho" disabled readonly></el-input>
        </el-form-item>
        <el-form-item label="新手机号：" prop="newPho">
          <el-input v-model="ruleFormPhone.newPho"></el-input><span style="color:red;margin-left:8px;">*</span>
        </el-form-item>
      </el-form>
      <div class="sure">
        <span @click="surePhone">确定</span>
        <span @click="dialogVisiblePho=false">取消</span>
      </div>
    </el-dialog>
    <el-dialog
      title="密码修改"
      :visible.sync="dialogVisiblePass"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="430px"
      class="password"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="旧密码：" prop="oldPassword">
          <el-input type="password" v-model="ruleForm.oldPassword"></el-input><span style="color:red;margin-left:8px;">*</span>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword"></el-input><span style="color:red;margin-left:8px;">*</span>
        </el-form-item>
        <el-form-item label="确认密码：" prop="surePassword">
          <el-input type="password" v-model="ruleForm.surePassword"></el-input><span style="color:red;margin-left:8px;">*</span>
        </el-form-item>
      </el-form>
      <div class="sure">
        <span @click="surePassword">确定</span>
        <span @click="dialogVisiblePass=false">取消</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import https from '../unit/httpServer'
export default {
  data () {
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      }else if(value.length<6){
        callback(new Error("密码长度最少6位"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if(value.length<6){
        callback(new Error("密码长度最少6位"));
      }else{
        if (this.ruleForm.surePassword !== "") {
          this.$refs.ruleForm.validateField("surePassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      }else if(value.length<6){
        callback(new Error("密码长度最少6位"));
      } else {
        if (value != this.ruleForm.newPassword) {
          callback(new Error("两次输入密码不一致!"));
        }
        callback();
      }
    };
    var validatePho = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新手机号"));
      } else {
        if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){
          callback(new Error("请输入正确手机号"));
        }else{
          this.ruleFormPhone.newPho = value.replace(/[^\d]/g, "");
          if (this.ruleFormPhone.newPho == this.ruleFormPhone.oldPho) {
            callback(new Error("与旧密码一致"));
          }
          callback();
        } 
      }
    };
    return {
      userObj:{},
      currentDate:'',
      show_box:false,
      dialogVisiblePass:false,
      dialogVisiblePho:false,
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        surePassword: ''
      },
      rules: {
        oldPassword: [
          {
            validator: validateOldPass,
            trigger: ["change", "blur"]
          }
        ],
        newPassword: [
          {
            validator: validatePass,
            trigger: ["change", "blur"]
          }
        ],
        surePassword: [
          {
            validator: validatePass2,
            trigger: ["change", "blur"]
          }
        ]
      },
      ruleFormPhone: {
        oldPho: '',
        newPho: ''
      },
      rulesPhone: {
        newPho: [
          {
            validator: validatePho,
            trigger: ["change", "blur"]
          }
        ]
      }
    }
  },
  created () {
    this.getUserMsg();
  },
  computed: {
    
  },
  mounted () {
    
  },
  methods: {
    getUserMsg(){
      https.fetchPost('web/common/getUserInfo').then(res => {
        if(res.data.errCode==0){
          this.userObj = res.data.userInfo;
          this.ruleFormPhone.oldPho = this.userObj.phone;
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          this.currentDate = year + '-' + month + '-' + day;
        }
      })
    },
    isShowBox(){
      if(this.show_box){
        this.show_box = false;
      }else{
        this.show_box = true;
      }
    },
    changePass(){
      this.dialogVisiblePass = true;
      this.show_box = false;
      this.$nextTick(()=>{
        this.$refs['ruleForm'].resetFields();
      })
    },
    changePhone(){
      this.dialogVisiblePho = true;
      this.show_box = false;
      this.$nextTick(()=>{
        this.$refs['ruleFormPhone'].resetFields();
      })
    },
    back(){
      console.log(window.sessionStorage.token)
      var _this = this;
      https.fetchPost('/web/logout',{id:1}).then(function(res){
        console.log(res);
        if(res.data.errCode==0){
          //退出系统清空token登录状态
          sessionStorage.removeItem('isLogin');        
          _this.$router.push('/login');
          sessionStorage.removeItem('token');
        }
      })
      
    },
    surePhone(){
      this.$refs['ruleFormPhone'].validate((valid) => {
        if(valid){
          https.fetchPost('web/common/updateUserInfo',{phone:this.ruleFormPhone.newPho}).then(res => {
            if(res.data.errCode==0){
              this.$message({
                type: 'success',
                message: '修改手机号成功'
              });
              this.dialogVisiblePho = false;
              this.getUserMsg();
            }else{
              this.$message({
                type: 'error',
                message: res.data.errMsg
              });
            }
          })
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    },
    surePassword(){
      this.$refs['ruleForm'].validate((valid) => {
        if(valid){
          https.fetchPost('web/common/updatePassword',{oldPassword:this.ruleForm.oldPassword,newPassword:this.ruleForm.newPassword}).then(res=>{
            if(res.data.errCode==0){
              this.$message({
                type: 'success',
                message: '修改密码成功'
              });
              this.dialogVisiblePass = false;
            }else{
              this.$message({
                type: 'error',
                message: res.data.errMsg
              });
            }
          })
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    }
  },
  components: {

  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#home_header {
  color: #fff;
  background: #0978BD;
  /* 去除鼠标点击标签出现的的默认蓝框 */
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
#home_header .main {
  float:right;height:50px;padding-top:15px;box-sizing:border-box;
}
#home_header .header_bac {
  width: 450px;
  height: 34px;
  background: url('./../assets/image/logo.png') no-repeat;
  position: relative;
  top: 8px;
  left: 15px;
}
#home_header .box {
  width: 214px;height: 190px;right: 4px;top: 46px;border: 1px solid #d2d2d2;background-color: #fff;padding-top: 4px;box-shadow: 0 0 5px #aaa;position: absolute;cursor: pointer;z-index:9999;
}
#home_header .box .shape {
  position: absolute;display: block;width: 20px;height: 20px;background-color: #fff;right: 11px;top: -8px;transform: rotate(45deg);-ms-transform: rotate(45deg);-moz-transform: rotate(45deg);-webkit-transform: rotate(45deg);-o-transform: rotate(45deg);
}
#home_header .message {
  border-bottom: 1px solid #d2d2d2;color: #020202;
}
#home_header .message .message_every label{
  font-size: 14px;width: 72px;text-align: right;padding-right: 0px;line-height:30px;display:inline-block;
}
#home_header .message .message_every span{
  display: inline-block;font-size: 14px;height: 30px;line-height: 30px;vertical-align: top;cursor: pointer;
}
#home_header .operation {
  height: 30px;color: rgb(2, 2, 2);border-bottom: 1px solid rgb(210, 210, 210);
}
#home_header .operation:hover {
  background: #d2d2d2;
}
#home_header .operation label {
  display: inline-block;font-size: 16px;width: 30px;height: 30px;line-height: 30px;vertical-align: top;text-align: right;padding-right: 10px;color: rgb(115, 110, 110);
}
#home_header .operation span {
  display: inline-block;font-size: 14px;height: 30px;line-height: 30px;vertical-align: top;cursor: pointer;
}
</style>