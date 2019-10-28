<template>
  <div class="infor_Page">
      <p style="height:30px;line-height:30px;color:#222;font-size:12px;margin-left:10px;">告警管理>告警设置</p>
      <div class="pageContent">
        <div style="width:600px;margin:auto;padding-top:20px;">
          <el-form :model="inforForm" ref="inforForm" label-width="100px" class="demo-dynamic">
              <!-- <el-form-item
                label="告警名称:"
                prop="name"
                :rules="[
                  { required: true, message: '告警名称不可为空'},
                  { min: 1, max: 190, message: '长度在1到190个字符', trigger: 'blur' } 
                ]">
                <el-input v-model="inforForm.name"></el-input>
              </el-form-item> -->
              <el-form-item label="" prop="outNumber" :rules="[
                  { required: true, message: '数值不可为空'} 
                ]">
                <el-col :span="4" style="margin-right:10px;"><el-input v-model="inforForm.Number"></el-input></el-col>
                <el-col :span="1"></el-col>
                <el-col :span="4">
                  <el-select v-model="inforForm.time">
                    <el-option
                      v-for="item in Options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="5" style="text-align:center">内累计呼出</el-col>
                <el-col :span="4"><el-input v-model="inforForm.outNumber"></el-input></el-col>
                <el-col :span="6" style="text-align:center">次未接通(或关机)</el-col>
              </el-form-item>
              <el-form-item label="" prop="inNumber" :rules="[
                  { required: true, message: '数值不可为空'} 
                ]">
                <el-col :span="4" style="margin-right:10px;"><el-input v-model="inforForm.Number"></el-input></el-col>
                <el-col :span="1"></el-col>
                <el-col :span="4">
                  <el-select v-model="inforForm.time">
                    <el-option
                      v-for="item in Options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="5" style="text-align:center">内累计通知</el-col>
                <el-col :span="4"><el-input v-model="inforForm.inNumber"></el-input></el-col>
                <el-col :span="6" style="text-align:center">次未进行呼入测试</el-col>
              </el-form-item>
              <el-form-item label="是否启用:" prop="Enable">
                <el-switch v-model="inforForm.Enable"></el-switch>
              </el-form-item>
              <el-form-item label="通知方式:" prop="type" :rules="[
                  { required: true, message: '请选择通知方式'} 
                ]">
                <el-checkbox-group v-model="inforForm.type">
                  <el-checkbox label="邮件"  name="type"></el-checkbox>
                  <el-checkbox label="短信"  name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item style="margin-top:30px" label="通知人员:" prop="persons" :rules="[
                  { required: true, message: '通知人员不可为空'} 
                ]">
                <el-input type="textarea" v-model="inforForm.persons" :rows="4"></el-input>
              </el-form-item>
              <el-form-item class="infoInput" style="text-align:center;">
                <input class="sure_btn" type="button" value="保存" @click="submitForm('inforForm')">
                <input class="cancel_btn" type="button" value="取消" @click="resetForm('inforForm')">
              </el-form-item>
          </el-form> 
        </div>
      </div>    
  </div>
</template>
<script>
export default {
  data () {
    return {
      inforForm:{
        name:null,
        Enable:null,
        persons:null,
        type:[],
        time:1,
        Number:null,
        outNumber:null,
        inNumber:null

      },
       setForm1: {
          age:null
        },
      Options:[{id:1,name:'周'},{id:2,name:'月'},{id:3,name:'季度'}]
    }
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>
<style scoped>

</style>

