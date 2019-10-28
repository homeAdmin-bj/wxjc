<template>
    <div id="CallUserManage" >
      <div class='title'>
        拨测用户管理 > 应急联系人管理
      </div>
       <div class="body_box">
         <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            size="mini"
          >
            <el-form-item prop="name" label="姓名：">
              <el-input readonly style="width:400px" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别：">
              <el-input readonly style="width:400px" v-model="ruleForm.sex"></el-input>
            </el-form-item>
            <el-form-item prop="officePhone" label="值班电话：">
              <el-input readonly style="width:400px"  v-model="ruleForm.officePhone"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号码：">
              <el-input readonly style="width:400px" v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item prop="duty" label="职责：">
              <el-input readonly style="width:400px" type="textarea" v-model="ruleForm.duty"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="close" round style="border:1px solid #0978bc;color:#0978bc;margin-left:130px">关闭</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>

</template>
<script>

export default {
  props:['info'],
  data() {
    return {
      ruleForm: {
        id:"",
        name:"",
        sex:"",
        officePhone:"",
        phone:"",
        dept:"",
        deptId:"",
        duty:""
      },
    };
  },
  watch: {
    info(){
      console.log(this.info);
      if(this.info!=null){
        this.ruleForm.id=this.info.id;
        this.ruleForm.deptId=this.info.deptId;
        this.ruleForm.name=this.info.name;
        this.ruleForm.sex=this.info.sex;
        this.ruleForm.officePhone=this.info.officePhone;
        this.ruleForm.phone=this.info.phone;
        this.ruleForm.duty=this.info.duty;
      }
    }
  },
  mounted() {
    
  },  
  methods: {
    close() {
      this.$emit('closeManageView')
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



