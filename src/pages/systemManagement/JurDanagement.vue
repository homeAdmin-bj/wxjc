<template>
  <div class="jur">
    <div class="main_title">
      <span>系统管理 > 权限管理</span>
    </div>
    <div style="margin:0 10px;background:#fff;">
      <div class="left_tree_style">
        <el-tree
            :data="roleList"
            :props="props"
            accordion
            node-key="id"
            ref="role_tree"
            default-expand-all
            highlight-current
            @node-click="getRoleInfo">
          </el-tree>
      </div>
      <div class="right_tree_style">
        <el-tree
          :data="menuList"
          show-checkbox
          check-strictly
          @check-change="relativeFa"
          ref="menu_tree"
          node-key="id"
          default-expand-all
          :props="props">
        </el-tree>
      </div>
    </div>
    <div class="action_btn" style="padding:10px;clear:both;">
      <input class="btn" value="保存" type="button" @click="jurSure()"/>
      <input class="btn" value="清空" type="button" @click="clearSelected()"/>
    </div>
  </div>
</template>

<script>
import https from './../../unit/httpServer'
export default {
  data() {
    return {
      roleid:'',
      roleList:[],
      menuList:[],
      props: {
        children: 'children',
        label: 'name'
      },
    }
  },
  created(){
    this.getRoleList();
  },
  methods: {
    // 获取角色列表
    getRoleList(){
      https.fetchPost('sys/control/getRoleList').then(res => {
        if(res.data.errCode == 0 ){
          this.roleList = [{
              name:'角色树',
              children:res.data.list
          }]
          this.roleid = res.data.list[0].id;
          this.$nextTick(() => {
            this.$refs.role_tree.setCurrentKey(this.roleid); 
          })
          this.getMenuList(res.data.list[0].id);
        }else{
          this.$message({
            type: 'error',
            message: res.data.errMsg
          });
        }
      })
    },
    // 点击角色获取菜单列表
    getRoleInfo (data) {
      if(data.id){
        this.roleid = data.id;
        this.getMenuList(data.id);
      }
    },
    // 获取菜单列表
    getMenuList(roleId){
      https.fetchPost('sys/menuMgr/showTree').then(res => {
        this.menuList = res.data.list;
        if(res.data.errCode==0){
          https.fetchPost('/sys/roleMenuMgr/getMenu',{roleId:roleId}).then(res => {
            if(res.data.errCode==0){
              this.$refs.menu_tree.setCheckedKeys(res.data.list);
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
      // https.fetchPost('sys/menuMgr/showTree',roleId).then(res => {
      //   if(res.data.errCode == 0 ){
      //     this.menuList = res.data.menuList;
      //     var data = res.data.menuList;
      //     this.menuList = [{
      //       name:'系统功能',
      //       children:this.dealMenuList(data)
      //     }]
      //     this.$refs.menu_tree.setCheckedKeys(res.data.selectList);
      //   }else{
      //     this.$message({
      //       type: 'error',
      //       message: res.data.errMsg
      //     });
      //   }
      // })
    },
    // 处理菜单列表数据
    // dealMenuList(data){
      // var arr = [];
      // for (var i = 0; i < data.length; i++) {
      //   var obj = {}
      //   var childArr = []
      //   for (var j = 0; j < data.length; j++) {
      //     if (data[i].id == data[j].pid) {
      //       obj = data[i];
      //       var childObj = {}
      //       childObj = data[j];
      //       childArr.push(childObj)
      //     }
      //   }
      //   obj['children'] = childArr
      //   if (childArr.length != 0) {
      //     arr.push(obj)
      //   }
      // }
      // var list = [];
      // for (var m = 0; m < data.length; m++) {
      //   if(data[m].pid == 0){
      //     for(var n = 0; n < arr.length; n++){
      //       if(data[m].id==arr[n].id){
      //         data[m] = arr[n]
      //       }
      //     }
      //     list.push(data[m]);
      //   }
      // }
      // return list;
    // },
    // 菜单全部选择时，过滤手动添加的第一项数据
    // filterNum(element){
      // return element > 0;
    // },
    // 选中子节点勾选父节点
    relativeFa(ele,checked){
      if(checked){
        this.$refs.menu_tree.setChecked(ele.pid,true);
      }
    },
    clearSelected(){
      this.$refs.menu_tree.setCheckedKeys([]);
      // -------------模拟添加菜单------------
      // var data = {
      //   name:'卫星终端',
      //   title:'卫星终端',
      //   pid:11,
      //   html:'RCSTManage',
      //   type:'null',
      //   pri:2
      // };
      // 添加菜单接口
      // https.fetchPost('sys/menuMgr/add',data).then(res => {
      //更新菜单接口
      // https.fetchPost('sys/menuMgr/update',data).then(res => {
      // 查询菜单接口
      // https.fetchPost('sys/menuMgr/showTree').then(res => {
      // 获取左侧菜单接口
      // https.fetchPost('web/common/getMenu').then(res => {
      //   console.log(res);
      // })
      // -------------模拟添加菜单结束------------
    },
    // 保存权限
    jurSure(){
      if(this.$refs.menu_tree.getCheckedKeys().length==0){
        this.$message({
          type: 'info',
          message: '用户权限不能为空'
        });  
        return;
      }
      // var list = this.$refs.menu_tree.getCheckedKeys().filter(this.filterNum)
      var list = this.$refs.menu_tree.getCheckedKeys();
      https.fetchPost('sys/roleMenuMgr/update',{roleId:this.roleid,menuIdList:list}).then(res => {
        if(res.data.errCode == 0){
          this.$message({
            type: 'success',
            message: '保存成功'
          });  
        }else{
          this.$message({
            type: 'error',
            message: res.data.errMsg
          });
        }
      })
    }
  }
}
</script>
<style scoped>
  * {
    white-space: nowrap;
  }
  .jur {
    background: #e4ebf0;
    height: calc(100vh - 50px);
    padding-bottom:10px;
    box-sizing: border-box;
  }
</style>