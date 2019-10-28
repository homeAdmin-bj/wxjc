<template>
  <div id="login">
    <div class="login">
      <p>应急卫星移动通信网测试系统</p>
      <div class="login_box">
        <input type="text" class="input" placeholder="请输入用户名" v-model="userName" />
      </div>
      <div class="login_box">
        <input type="password" class="input" placeholder="请输入密码" v-model="password" />
      </div>
      
      <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="ruleForm">
        <el-form-item prop="userName">
          <el-input type="text" v-model="ruleForm.userName" auto-complete="off" style="width:330px;"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" style="width:330px;"></el-input>
        </el-form-item>
      </el-form> -->
      <div class="login_box" style="text-align:left;color:#fff;padding-top:20px;padding-left:50px;">
        <!-- <input type="checkbox" v-model="checked" style="height: 14px;width: 14px;float: left;margin: 5px 10px 0 50px;"/><span>记住用户名</span> -->
        <el-checkbox v-model="checked">记住用户名</el-checkbox>
      </div>
      <div class="login_box">
        <input id="submit" class="input" style="padding:0;" type="testword" value="登录" readonly @click="loginIn"/>
      </div>
    </div>
  </div>
</template>
<script>
import https from '../unit/httpServer'
export default {
  data () {
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      }else{
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else {
        callback();
      }
    };
    return {
      userName: '',
      password: '',
      checked:false,
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    var _self = this
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key == 13) {
        _self.loginIn()
      }
    } 
    sessionStorage.removeItem('isLogin');
    sessionStorage.removeItem('isBigScreen');
    if(window.localStorage.userName){
      this.userName = window.localStorage.userName;
    }
  },
  mounted(){
    console.log(sessionStorage.token);
  },
  methods: {
    loginIn () {
      console.log(window.sessionStorage.isLogin)
      console.log(window.localStorage);
      var _this = this;
      if(this.userName == undefined||this.userName == ''||this.password==undefined||this.password==''){
        alert('用户名密码不能为空');
      }else{      
        // 登录请求
        https.fetchPost('web/login',{userName:this.userName,password:this.password})
          .then(function(res){
            console.log(res);
            if(res.data.errCode==0){
              // 记住用户名
              var storage = window.localStorage;
              window.sessionStorage.token = res.data.token;
              if(_this.checked){
                storage['userName'] = _this.userName;
              }else {
                storage.removeItem('userName');
              }
              // 设置登录状态，判断是否登录
              window.sessionStorage.setItem('isLogin',true);
              if(res.data.type==100){
                // 跳转大屏
                window.sessionStorage.setItem('isBigScreen',true);
                _this.$router.push('/BigScreen'); 
              }else{
                // 跳转系统
                _this.$router.push('/PerInCallTaskManage'); 
              }  
            }else{
              alert(res.data.errMsg);
            }
          })
      }
    }
  }
}
</script>
<style scoped>
.ruleForm .el-input__inner {
  background: red;
}
#login {
  height: 100vh;
  background: url("./../assets/image/login_bac.jpg");
  background-size: 100% 100%;
}
.login {
  width: 434px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -230px 0 0 -217px;
  background: url('./../assets/image/login.png') no-repeat;
}
.login p {
  word-spacing: 5px;
  font-size: 24px;
  color: #e4e9ea;
  text-align: center;
  padding: 47px 0 15px 0;
  font-weight: bold;
  letter-spacing: 5px;
  color: #fff
}
.login_box {
  text-align: center;
  border:1px solid transparent;
}
.login_box .input {
  width: 309px;
  height: 50px;
  margin: 20px 0 0 0;
  font-size: 16px;
  border: 1px solid #314f5a;
  background: rgba(0,0,0,0.5);
  border-radius: 4px;
  padding-left: 20px;
  color: #fff;
  outline: none;
}
#submit {
  text-align: center;
  background: #179AEC;
  color: #fff;
  font-size: 18px;
  margin-top: 24px;
  cursor: pointer;
}
#submit:hover {
  background: #179AEC;
}
</style>

