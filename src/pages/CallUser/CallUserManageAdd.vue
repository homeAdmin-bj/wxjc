<template>
    <div id="CallUserManage" >
      <div class='title'>
        拨测用户管理 > 应急联系人管理
      </div>
       <div class="body_box">
         <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            size="mini"
          >
            <el-form-item prop="name" label="姓名：">
              <el-input style="width:400px" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别：">
              <el-select v-model="ruleForm.sex" style="width:400px">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="officePhone" label="值班电话：">
              <el-input style="width:400px"  v-model="ruleForm.officePhone"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号码：">
              <el-input style="width:400px" v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item prop="duty" label="职责：">
              <el-input style="width:400px" type="textarea" v-model="ruleForm.duty"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm('ruleForm')" round style="border:1px solid #0978bc;color:#0978bc;margin-left:130px">保存</el-button>
              <el-button @click="resetForm('ruleForm')" round style="border:1px solid #0978bc;color:#0978bc">取消</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>

</template>
<script>
import http from "./../../unit/httpServer";
export default {
  props:['info'],
  data() {
    return {
      ruleForm: {
        id:"",
        name:"",
        sex:"0",
        officePhone:"",
        phone:"",
        dept:"",
        deptId:"",
        duty:""
      },
      rules: {
        "name": [
          { required: true, message: "姓名不可为空", trigger: "blur" }
        ],
        "officePhone": [
          { required: true, message: "值班电话不可为空", trigger: "blur" }
        ],
        "phone": [
          { required: true, message: "手机号码不可为空", trigger: "blur" }
        ],
        "duty": [
          { required: true, message: "职责不可为空", trigger: "blur" }
        ],
      }
    };
  },
  watch: {
    info(){
      console.log(this.info);
      if(this.info.id){
        this.ruleForm.id=this.info.id;
        this.ruleForm.deptId=this.info.deptId;
        this.ruleForm.name=this.info.name;
        this.ruleForm.sex=this.info.sex=="男"?"0":"1";
        this.ruleForm.officePhone=this.info.officePhone;
        this.ruleForm.phone=this.info.phone;
        this.ruleForm.duty=this.info.duty;
      }else{
        this.ruleForm.deptId=this.info.deptId;
      }
    }
  },
  mounted() {
    
  },  
  methods: {
    submitForm(formName) {
      var vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.id){
              http.fetchPost("/dialing/ecTestUser/updateEcTestUser", {
                "id":vm.ruleForm.id,
                "jobDetail": vm.ruleForm.duty,
                "sex":  vm.ruleForm.sex,
                "name":vm.ruleForm.name,
                "testPhone":vm.ruleForm.phone,
                "officePhone":vm.ruleForm.officePhone,
                "deptId":vm.ruleForm.deptId,
                "netType":1 
              }).then(res=>{
                console.log(res);
                if(res.data.errCode==0){
                  vm.$emit('closeManageAdd',true)
                }else{
                  alert('保存失败');
                  return;
                } 
              })
            }else{
              http.fetchPost("/dialing/ecTestUser/saveEcTestUser", {
                "jobDetail": vm.ruleForm.duty,
                "sex":  vm.ruleForm.sex,
                "name":vm.ruleForm.name,
                "testPhone":vm.ruleForm.phone,
                "officePhone":vm.ruleForm.officePhone,
                "deptId":vm.ruleForm.deptId,
                "netType":1 
              }).then(res=>{
                console.log(res);
                if(res.data.errCode==0){
                  vm.$emit('closeManageAdd',true)
                }else{
                  alert('保存失败');
                  return;
                } 
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        var vm = this;
        this.$refs[formName].resetFields();
        vm.$emit('closeManageAdd',false)
      }
  }
};
</script>
<style scoped>
#CallUserManage {
  position: relative;
  height: 100%;
  width: 100%;
  font-family: "Microsoft YaHei";
  font-size: 12px;
}
.title {
  position: absolute;
  top: 0;
  left: 0px;
  height: 30px;
  width: 100%;
  padding-left: 10px;
  z-index: 1000;
  line-height: 30px;
  color: #333;
  background: #e4ebf0;
  box-sizing: border-box;
}
.body_box{
  width: 500px;
  position: absolute;
  top: 50px;
  left: 50%;
  margin-left: -250px;
}
</style>

