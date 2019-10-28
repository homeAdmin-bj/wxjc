<template>
  <div id="IncomingCallManage"
    class="contentBox">
    <div class="contentBox_page">
      <div class="page_title">
        <el-breadcrumb>
          <span>短信发送管理</span>
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
              <div class="text_label"><label for="">呼入任务名称 :</label></div>
              <el-form-item prop="taskDescribe.taskName">
                <el-input v-model="ruleForm.taskDescribe.taskName"></el-input>
              </el-form-item>
            </div>
            <!-- <div> -->
            <!-- <div class="text_label"><label for="">任务类型 :</label></div> -->
            <!-- <el-form-item prop="taskDescribe.taskTypeId">
                <el-select v-model="ruleForm.taskDescribe.taskTypeId"
                  placeholder="请选择">
                  <el-option v-for="item in ruleForm.taskDescribe.taskTypeL"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item> -->
            <!-- <el-select v-model="taskDescribe.taskTypeId"
                placeholder="请选择">
                <el-option v-for="item in taskDescribe.taskTypeL"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select> -->
            <!-- </div> -->
          </div>
          <div class="line">
            <span>接收人员选择</span><span></span>
          </div>
          <div class="text">
            <div>
              <div class="text_label"></div>
              <span class="selectPeo">
                <span>
                  <i @click="peoAddDialog">+点击添加</i>
                </span>
                <span>
                  <ul>
                    <li v-for="(item,i) in taskPeo.peoSureL"
                      :key="i">
                      <span>{{item.name}}</span>
                      <span style="cursor: pointer;"
                        @click="peoDel(item)">删除</span>
                    </li>
                  </ul>
                </span>
              </span>
            </div>
          </div>
          <div class="line">
            <span>短信内容设置</span><span></span>
          </div>
          <div class="text">
            <div>
              <div class="text_label"><label for="">&nbsp;</label></div>
              <el-form-item prop="taskDescribe.taskContent">
                <el-input type="textarea"
                  :rows="7"
                  placeholder="请输入内容"
                  v-model="ruleForm.taskDescribe.taskContent">
                </el-input>
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
    <el-dialog :visible.sync="peoDialog"
      custom-class="dialogS"
      width="275px">
      <div class="dialogS_box">
        <div class="peoSelect"
          ref="peoSelect">
          <span class="clickDef"
            @click="PeoTpye(2)">按人员</span>
        </div>
        <div class="peoSelectL">
          <el-tree :data="taskPeo.defaultPeoL"
            show-checkbox
            ref="treeCity"
            :default-checked-keys="taskPeo.peoIdSureL"
            node-key="id"
            @check="checkClick"
            :props="defaultProps">
          </el-tree>
        </div>
        <div class="back"
          style="padding-top:10px;">
          <span @click="peoSureClick(true)">{{contentBox.sure}}</span>&nbsp;&nbsp;&nbsp;
          <span @click="peoSureClick(false)">{{contentBox.cancel}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { contentBox } from "./../../unit/globalVar.js";
import { administrationChoice } from "./../../unit/common.js";
import tableBody from "./../../components/table_temp";
import pageBody from "./../../components/page_temp";
// api
import { INCALLAPI } from "./../../api/InCallTaskApi";
export default {
  data() {
    return {
      contentBox: contentBox,
      defaultProps: {
        children: "children",
        label: "name"
      },
      peoDialog: false,
      breadcrumb: null,
      pageInfo: {
        pageSize: 14,
        pageTotal: 112,
        currentPage: 1
      },
      ruleForm: {
        taskDescribe: {
          taskName: null,
          taskContent: null
          //   taskTypeId: null
        }
      },
      rules: {
        "taskDescribe.taskName": [
          { required: true, message: "请输入短信名称", trigger: "blur" }
        ],
        "taskDescribe.taskContent": [
          { required: true, message: "请输入短信内容", trigger: "blur" }
        ]
      },
      taskPeo: {
        peoSureL: null,
        peoIdSureL: null,
        selectedPeoL: null,
        selectedPeoIdL: null,
        defaultPeoL: null
      }
    };
  },
  props: ["taskOption"],
  components: {
    tableBody,
    pageBody
  },
  mounted() {
    
  },
  methods: {
    // 添加拨测人员
    peoAddDialog() {
      this.peoDialog = true;
      this.taskPeo.defaultPeoL = null;
      setTimeout(() => {
        this.PeoTpye(2);
      });
    },
    // 获取拨测单位人员
    getUnitPeo(d) {
      if (d == 2) {
        var opt = {
          netType: 2
        };
        INCALLAPI.commonControl_getDeptTestUser(opt).then(res => {
          if (res.status == 200 && res.data.errCode == 0) {
            console.log(res);
            if (res.data.list != undefined) {
              this.treeLoading = false;
              this.taskPeo.defaultPeoL = res.data.list;
            }
          }
        });
      }
    },
    // 切换拨测单位人员
    PeoTpye(d) {
      if (d == 2) {
        this.taskPeo.selectedPeoL = null;
        this.taskPeo.selectedPeoIdL = null;
        // this.$refs.peoSelect.firstChild.style["color"] = "#fff";
        // this.$refs.peoSelect.firstChild.style["background"] = "#0978bd";
        // this.$refs.peoSelect.lastChild.style["color"] = "#0978bd";
        // this.$refs.peoSelect.lastChild.style["background"] = "#fff";
      }
      this.getUnitPeo(d);
    },
    // 选择拨测单位人员
    checkClick() {
      const areaChoice = administrationChoice(
        this.$refs.treeCity.getCheckedNodes()
      );
      this.taskPeo.selectedPeoL = areaChoice.selectList;
      this.taskPeo.selectedPeoIdL = areaChoice.selectListId;
    },
    // 选择拨测人员确认
    peoSureClick(p) {
      if (p) {
        this.taskPeo.peoSureL = this.taskPeo.selectedPeoL;
        this.taskPeo.peoIdSureL = this.taskPeo.selectedPeoIdL;
        this.peoDialog = false;
      } else {
        this.taskPeo.selectedPeoL = this.taskPeo.peoSureL;
        this.taskPeo.selectedPeoIdL = this.taskPeo.peoIdSureL;
        this.peoDialog = false;
      }
      console.log(this.taskPeo.peoSureL);
      console.log(this.taskPeo.peoIdSureL);
    },
    // 人员删除
    peoDel(i) {
      Object.keys(this.taskPeo).forEach(key => {
        if (key != "defaultPeoL") {
          this.taskPeo[key] = this.taskPeo[key].filter(item => {
            return item.id == undefined ? item != i.id : item.id != i.id;
          });
        }
      });
    },
    // 保存 取消
    taskPreClick(q) {
      if (q) {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            var options = {
              netType: 2,
              title: this.ruleForm.taskDescribe.taskName,
              sysUserIds: this.taskPeo.peoIdSureL,
              content: this.ruleForm.taskDescribe.taskContent
            };
            INCALLAPI.ecSms_saveEcSms(options).then(res => {
              if (res.status == 200 && res.data.errCode == 0) {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.$emit("taskAdd", null, "Manage", true);
              }
            });
          } else {
            return false;
          }
        });
      } else {
        this.$emit("taskAdd", null, "Manage", false);
      }
    }
  }
};
</script>
<style scoped>
.selectPeo {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  width: 400px;
  height: 178px;
  background: #f8f6f6;
  border: 1px solid #d9d9d9;
}
.selectPeo > span:nth-child(1) {
  display: block;
  box-sizing: border-box;
  height: 30px;
  width: 398px;
  text-align: center;
  line-height: 30px;
  border-bottom: 1px solid #d9d9d9;
}
.selectPeo > span:nth-child(1) i {
  font-size: 14px;
  font-style: normal;
  cursor: pointer;
  color: #0978bd;
}
.selectPeo > span:nth-child(2) {
  display: block;
  box-sizing: border-box;
  max-height: 146px;
  width: 398px;
  overflow-y: auto;
}
.selectPeo > span:nth-child(2) ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.selectPeo > span:nth-child(2) li {
  padding: 0;
  margin: 0;
  height: 24px;
  line-height: 24px;
  padding-left: 10px;
  padding-right: 60px;
  list-style: none;
}
.selectPeo > span:nth-child(2) li:hover {
  background: rgba(213, 232, 246, 0.5);
}
.selectPeo > span:nth-child(2) li span:nth-child(1) {
  font-size: 14px;
  color: black;
  font-family: "Microsoft YaHei";
  float: left;
}
.selectPeo > span:nth-child(2) li span:nth-child(2) {
  font-size: 14px;
  color: #0978bd;
  font-family: "Microsoft YaHei";
  float: right;
}
.dialogS_box {
  height: 332px;
}
.dialogS_box .peoSelect {
  height: 30px;
  text-align: center;
  padding-bottom: 6px;
}
.dialogS_box .peoSelect span {
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #0978bd;
  width: 100px;
  height: 30px;
  /* color: #0978bd; */
  font-size: 16px;
  line-height: 28px;
  cursor: pointer;
}
.dialogS_box .peoSelect span:nth-child(1) {
  border-bottom-left-radius: 14px;
  border-top-left-radius: 14px;
  border-bottom-right-radius: 14px;
  border-top-right-radius: 14px;
  /* border-right: none; */
}
.dialogS_box .peoSelect span:nth-child(2) {
  border-bottom-right-radius: 14px;
  border-top-right-radius: 14px;
}
.clickDef {
  color: #fff;
  background: #0978bd;
}
.dialogS_box .peoSelectL {
  height: 256px;
  overflow-y: auto;
}
.label_select {
  display: inline-block;
}
.label_select {
  display: inline-block;
}
</style>

