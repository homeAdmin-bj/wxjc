<template>
  <div id="IncomingCallManage"
    class="contentBox">
    <div class="contentBox_page">
      <div class="page_title">
        <el-breadcrumb>
          <span>语音管理</span>
          <span>{{contentBox.breadcrumb}}</span>
          <span>{{breadcrumb}}</span>
        </el-breadcrumb>
      </div>
      <div class="page_box">
        <!-- <div class="page_box_center"> -->
        <el-form class="page_box_center"
          :model="ruleForm"
          :rules="rules"
          :inline-message="true"
          ref="ruleForm">
          <div class="text">
            <div>
              <div class="text_label"><label for="">语音文件名称：</label></div>
              <el-form-item prop="taskDescribe.taskName">
                <el-input v-model="ruleForm.taskDescribe.taskName"></el-input>
              </el-form-item>
            </div>
            <!-- <div  v-if="id">
              <div class="text_label"><label for="">上传时间：</label></div>
              <el-form-item prop="taskDescribe.taskPushTime">
                <el-date-picker 
                  v-model="ruleForm.taskDescribe.taskPushTime"                 
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  >
                </el-date-picker>
              </el-form-item>
            </div> -->
            <div v-if="!taskOption">
              <div class="text_label"><label for="">语音文件：</label></div>
              <el-form-item prop="taskDescribe.taskPushTime"
                style="vertical-align: top;">
                <el-upload class="upload-demo"
                  action="#"
                  :http-request="handleData"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :before-remove="beforeRemove"
                  :limit="1"
                  
                  :file-list="fileList">
                  <el-button size="small" 
                    type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </div>
          </div>
          <div class="text">
            <div>
              <div class="back">
                <span @click="taskPreClick(true)">{{contentBox.preserve}}</span>&nbsp;&nbsp;&nbsp;
                <span @click="taskPreClick(false)">{{contentBox.cancel}}</span>
              </div>
            </div>
          </div>
        </el-form>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { contentBox } from "./../../unit/globalVar.js";
import http from './../../unit/httpServer'
export default {
  data() {
    return {
      id:null,
      file:null,
      contentBox: contentBox,
      breadcrumb: null,
      ruleForm: {
        taskDescribe: {
          taskName: null,
          // taskPushTime: null
        }
      },
      rules: {
        "taskDescribe.taskName": [
          { required: true, message: "请输入任务名称", trigger: "blur" }
        ]
      },
      fileList: [
        
      ]
    };
  },
  props: ["taskOption"],
  components: {},
  mounted() {
    console.log(this.taskOption);
    this.breadcrumb = this.taskOption == null ? "任务新增" : "任务编辑";
    if (this.taskOption) {
      this.id=this.taskOption.id;
      console.log(this.id);
    }
  },
  methods: {
    handleSuccess(){
      console.log('success');
    },
    // 上传
    handleData(file){
      console.log(file);
      this.file=file.file;
      var vm = this;
    },
    // 保存 取消
    taskPreClick(q) {
      console.log(this.taskOption);
      var vm = this;
      if (q) {
        var idTaskData = {
          id: this.id,
          name: this.ruleForm.taskDescribe.taskName,
        };
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            
            if(vm.id){
                http.fetchPost("/dialing/ecAudioCtrl/updateEcAudio",{
                  id:vm.id,
                  name:vm.ruleForm.taskDescribe.taskName
                }).then(res=>{
                console.log(res);
                vm.$emit("taskSave",idTaskData);
              },err=>{
                console.log(err)
              }) 
            }else{
              var form = new FormData();
              form.append('file',vm.file);
              form.append('name',vm.ruleForm.taskDescribe.taskName);
              http.fetchPost("/dialing/ecAudioCtrl/saveEcAudio",form).then(res=>{
                console.log(res);
                vm.$emit("taskSave",idTaskData);
              },err=>{
                console.log(err)
              }) 
            }        
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.id=null;
        this.ruleForm.taskDescribe.taskName=null;
        this.$emit("taskCancel");
      }
    },
    
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
<style scoped>
</style>

