<template>
	<div class="table_style">
    <el-table
      :data="table.tableData"
	  :row-class-name="tableRowClassName"
	  border
      style="width: 100%">
      <el-table-column 
	  	show-overflow-tooltip
        :prop='obj.typePro' 
        :label="obj.typeName" 
        :key="index" 
        :width="obj.width"
        v-for="(obj,index) in table.tablelist">
        <template slot-scope="scope">
			<div v-if="obj.typePro=='userAction'" style="padding-top:6px;">
				<span title="编辑" @click="sendTableData('edit',scope.row)"><i class="el-icon-edit-outline" style="font-size:20px;color:#0978bc"></i></span>
				<span title="查看" @click="sendTableData('view',scope.row)"><i class="el-icon-document" style="font-size:20px;color:#0978bc"></i></span>
				<span title="删除" @click="sendTableData('delete',scope.row)"><i class="el-icon-delete" style="font-size:20px;color:#0978bc"></i></span>
				<span title="启用" v-show="scope.row.status==1" @click="sendTableData('use',scope.row)"><i class="el-icon-success" style="font-size:20px;color:#0978bc"></i></span>
				<span title="停用" v-show="scope.row.status==0" @click="sendTableData('use',scope.row)"><i class="el-icon-error" style="font-size:20px;color:#0978bc"></i></span>
				<span title="重置" @click="sendTableData('reset',scope.row)"><i class="el-icon-setting" style="font-size:20px;color:#0978bc"></i></span>
			</div>
			<div v-if="obj.typePro=='roleAction'" style="padding-top:6px;">
				<span title="编辑" @click="sendTableData('edit',scope.row)"><i class="el-icon-edit-outline" style="font-size:20px;color:#0978bc"></i></span>
				<span title="删除" @click="sendTableData('delete',scope.row)"><i class="el-icon-delete" style="font-size:20px;color:#0978bc"></i></span>
			</div>
			<div v-if="obj.typePro=='logAction'||obj.typePro=='reserveViewAction'||obj.typePro=='vehicleViewAction'||obj.typePro=='personViewAction'||obj.typePro=='planViewAction'" style="padding-top:6px;">
				<span title="查看" @click="sendTableData('view',scope.row)"><i class="el-icon-document" style="font-size:20px;color:#0978bc"></i></span>
			</div>
			<div v-if="obj.typePro=='reserveManageAction'||obj.typePro=='vehicleManageAction'||obj.typePro=='personManageAction'||obj.typePro=='planManageAction'" style="padding-top:6px;">
				<span title="编辑" @click="sendTableData('edit',scope.row)"><i class="el-icon-edit-outline" style="font-size:20px;color:#0978bc"></i></span>
				<span title="查看" @click="sendTableData('view',scope.row)"><i class="el-icon-document" style="font-size:20px;color:#0978bc"></i></span>
				<span title="删除" @click="sendTableData('delete',scope.row)"><i class="el-icon-delete" style="font-size:20px;color:#0978bc"></i></span>
			</div>
			<!-- <div v-else class="selfStyle" :style="{'text-align':(obj.typePro=='name'&&(obj.typeName=='预案名称'||obj.typeName=='储备库名称'))||(obj.typePro=='areaName'&&obj.typeName=='所属行政区划')?'left':'center'}" :title="(obj.typePro=='index'||obj.typePro=='auth'||obj.typePro=='type'||obj.typePro=='src')?'':scope.row[obj.typePro]"> -->
			<div v-else class="selfStyle" :style="{'text-align':(obj.typePro=='name'&&(obj.typeName=='预案名称'||obj.typeName=='储备库名称'))||(obj.typePro=='areaName'&&obj.typeName=='所属行政区划')?'left':'center'}">
            	<!-- {{scope.row[obj.typePro]}} -->
				{{
					obj.typePro=='auth'&&scope.row.auth==1?'只允许登录WEB':
					(obj.typePro=='auth'&&scope.row.auth==2)?'只允许登录APP':
					(obj.typePro=='auth'&&scope.row.auth==3)?'可登录WEB和APP':
					(obj.typePro=='type'&&scope.row.type==1)?'保障中心领导':
					(obj.typePro=='type'&&scope.row.type==2)?'保障中心处室领导':
					(obj.typePro=='type'&&scope.row.type==3)?'拨测业务用户（应急联系人）':
					(obj.typePro=='type'&&scope.row.type==4)?'拨测业务用户（卫星终端）':
					(obj.typePro=='type'&&scope.row.type==5)?'保障中心系统管理员':
					(obj.typePro=='type'&&scope.row.type==6)?'行业单位领导':
					(obj.typePro=='type'&&scope.row.type==7)?'应急体系单位单位领导':
					(obj.typePro=='src'&&scope.row.src==1)?'PC端':
					(obj.typePro=='src'&&scope.row.src==2)?'移动端':
					scope.row[obj.typePro]
				}}
			</div>
        </template>
      </el-table-column>
    </el-table>
	</div>
</template>
<script>
	export default {
		props:['table'],
		created(){
			this.table.tableData.forEach((ele,index) => {
				ele['index'] = index+1;
			})
		},
		data() {
			return {
						
			}
		},
		methods:{
			sendTableData(type,data){
				this.$emit('getTableData',{type:type,data:data});
			},
			tableRowClassName({ row, rowIndex }) {
				if (rowIndex % 2 === 1) {
					return "warning-row";
				}
				return "";
			}
		}
	}
</script>
<style scoped>
	.selfStyle {
		cursor:default;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
	}
</style>