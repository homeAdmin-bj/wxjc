<template>
    <div id="leftbar">
      <div class="transformation">
        <img src="./../assets/image/menu/menuOpen.png" @click="change" alt="">
      </div>
      <!-- menuData -->
      <el-menu
        v-if="!showMenu"
        unique-opened
        class="el-menu-vertical"
        text-color="#fff"
        active-text-color="#fff">
        <div :key="index" v-for="(value,index) in menuData">
          <div v-if="value.isChild">
            <el-submenu :index="value.name">
              <template slot="title">
                <div @click="getToPath(value.path)">
                  <img :src="require('./../assets/image/menu/'+ value.path +'.svg')" alt="">
                  <span :index="value.name">
                    {{value.name}}
                  </span>
                </div>
              </template>
            </el-submenu>
          </div>
          <div v-if="!value.isChild">
            <el-submenu :index="value.name">
              <template slot="title">
                <img :src="require('./../assets/image/menu/'+ value.path +'.svg')" alt="">
                <span>{{value.name}}</span>
              </template>
              <el-menu-item-group>
                <div :key="i" v-for="(v,i) in value.children" @click="getToPath(v.path)">
                  <el-menu-item :index="v.path">
                    <span>{{v.name}}</span>
                  </el-menu-item>
                </div>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </div>
      </el-menu>
      <!-- <el-menu
        v-if="!showMenu"
        unique-opened
        class="el-menu-vertical"
        @open="handleOpen"
        @close="handleClose"
        text-color="#fff"
        active-text-color="#fff">
        <el-submenu index="1">
          <template slot="title">
            <img src="./../assets/image/menu/inCall.svg" alt="">
            <span>应急联系人呼入管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="InCallTaskManage"><router-link to="PerInCallTaskManage">呼入任务管理</router-link></el-menu-item>
            <el-menu-item index="InCallRecordManage"><router-link to="PerInCallRecordManage">呼入记录查询</router-link></el-menu-item>
            <el-menu-item index="MessageSendManage"><router-link to="PerMessageSendManage">短信发送管理</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <img src="./../assets/image/menu/inCall.svg" alt="">
            <span>卫星终端呼入管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="InCallTaskManage"><router-link to="SateInCallTaskManage">呼入任务管理</router-link></el-menu-item>
            <el-menu-item index="InCallRecordManage"><router-link to="SateInCallRecordManage">呼入记录查询</router-link></el-menu-item>
            <el-menu-item index="MessageSendManage"><router-link to="SateMessageSendManage">短信发送管理</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <img src="./../assets/image/menu/outCall.svg" alt="">
            <span>应急联系人呼出管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="OutCallTaskManage"><router-link to="PerOutCallTaskManage">呼出任务管理</router-link></el-menu-item>
            <el-menu-item index="OutCallRecordManage"><router-link to="PerOutCallRecordManage">呼出记录查询</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <img src="./../assets/image/menu/outCall.svg" alt="">
            <span>卫星终端呼出管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="OutCallTaskManage"><router-link to="SateOutCallTaskManage">呼出任务管理</router-link></el-menu-item>
            <el-menu-item index="OutCallRecordManage"><router-link to="SateOutCallRecordManage">呼出记录查询</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <router-link to="CallUserManage"><img src="./../assets/image/menu/call.svg" alt=""></router-link>
            <span index="CallUserManage">
              <router-link to="CallUserManage" style="color:#fff;text-decoration:none;">拨测用户管理</router-link>
            </span>
          </template>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <img src="./../assets/image/menu/static.svg" alt="">
            <span>统计分析</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="StaticPer"><router-link to="StaticPer">违规人员排名</router-link></el-menu-item>
            <el-menu-item index="StaticTask"><router-link to="StaticTask">拨测任务统计</router-link></el-menu-item>
            <el-menu-item index="StaticComprehensive"><router-link to="StaticComprehensive">拨测综合统计</router-link></el-menu-item>
            <el-menu-item index="StaticUser"><router-link to="StaticUser">拨测用户统计</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <img src="./../assets/image/menu/alerm.svg" alt="">
            <span>告警管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="PerAlermSet"><router-link to="PerAlermSet">应急联系人告警设置</router-link></el-menu-item>
            <el-menu-item index="PerAlermSearch"><router-link to="PerAlermSearch">应急联系人告警查询</router-link></el-menu-item>
            <el-menu-item index="SateAlermSet"><router-link to="SateAlermSet">卫星终端告警设置</router-link></el-menu-item>
            <el-menu-item index="SateAlermSearch"><router-link to="SateAlermSearch">卫星终端告警查询</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">
            <router-link to="VoiceManage"><img src="./../assets/image/menu/voice.svg" alt=""></router-link>
            <span index="VoiceManage">
              <router-link to="VoiceManage" style="color:#fff;text-decoration:none;">语音管理</router-link>
            </span>
          </template>
        </el-submenu>
        <el-submenu index="9">
          <template slot="title">
            <img src="./../assets/image/menu/alerm.svg" alt="">
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="userDanagement"><router-link to="userDanagement">用户管理</router-link></el-menu-item>
            <el-menu-item index="roleDanagement"><router-link to="roleDanagement">角色管理</router-link></el-menu-item>
            <el-menu-item index="JurDanagement"><router-link to="JurDanagement">权限管理</router-link></el-menu-item>
            <el-menu-item index="dataDictionary"><router-link to="dataDictionary">数据字典</router-link></el-menu-item>
            <el-menu-item index="logDanagement"><router-link to="logDanagement">日志管理</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu> -->
      <el-menu 
        v-if="showMenu"
        background-color="#163B55"
        text-color="#fff">
        <div @click="getToPath(value.path)" :key="index" v-for="(value,index) in menuData">
          <el-tooltip effect="dark" :content="value.name" placement="right" popper-class="menu">
            <el-submenu index="-11">
              <template slot="title">             
                  <img :src="require('./../assets/image/menu/'+ value.path +'.svg')" alt="">             
              </template>
            </el-submenu>
          </el-tooltip>  
        </div>
      </el-menu>
      <!-- <el-menu 
        v-if="showMenu"
        background-color="#163B55"
        text-color="#fff">
        <el-submenu index="-11">
          <template slot="title">
            <img src="./../assets/image/menu/inCall.svg" alt="">
          </template>
        </el-submenu>
        <el-submenu index="-11">
          <template slot="title">
            <img src="./../assets/image/menu/inCall.svg" alt="">
          </template>
        </el-submenu>
        <el-submenu index="-11">
          <template slot="title">
            <img src="./../assets/image/menu/outCall.svg" alt="">
          </template>
        </el-submenu>
        <el-submenu index="-11">
          <template slot="title">
            <img src="./../assets/image/menu/outCall.svg" alt="">
          </template>
        </el-submenu>
        <el-submenu index="-11">
          <template slot="title">
            <img src="./../assets/image/menu/call.svg" alt="">
          </template>
        </el-submenu>
        <el-submenu index="-11">
          <template slot="title">
            <img src="./../assets/image/menu/static.svg" alt="">
          </template>
        </el-submenu>
        <el-submenu index="-11">
          <template slot="title">
            <img src="./../assets/image/menu/alerm.svg" alt="">
          </template>
        </el-submenu>
        <el-submenu index="-11">
          <template slot="title">
            <img src="./../assets/image/menu/voice.svg" alt="">
          </template>
        </el-submenu>
        <el-submenu index="-11">
          <template slot="title">
            <img src="./../assets/image/menu/alerm.svg" alt="">
          </template>
        </el-submenu>
      </el-menu> -->
    </div>
</template>
<script>
import Vue from 'vue'
import https from '../unit/httpServer'
export default {
  name: 'leftbar',
  data () {
    return {
      isCollapse: true,
      showMenu:true,
      menuData:[],
      // menuData: [
      //   {
      //     id:1,
      //     name:'应急联系人呼入管理',
      //     img:'PerInCallTaskManage',
      //     path:'PerInCallTaskManage',
      //     children:[
      //       {
      //         id:11,
      //         name:'呼入任务管理',
      //         path:'PerInCallTaskManage'
      //       },
      //       {
      //         id:12,
      //         name:'呼入记录管理',
      //         path:'PerInCallRecordManage'
      //       },
      //       {
      //         id:13,
      //         name:'短信发送管理',
      //         path:'PerMessageSendManage'
      //       }
      //     ]
      //   },
      //   {
      //     id:2,
      //     name:'卫星终端呼入管理',
      //     img:'SateInCallTaskManage',
      //     path:'SateInCallTaskManage',
      //     children:[
      //       {
      //         id:21,
      //         name:'呼入任务管理',
      //         path:'SateInCallTaskManage'
      //       },
      //       {
      //         id:22,
      //         name:'呼入记录管理',
      //         path:'SateInCallRecordManage'
      //       },
      //       {
      //         id:23,
      //         name:'短信发送管理',
      //         path:'SateMessageSendManage'
      //       }
      //     ]
      //   },
      //   {
      //     id:3,
      //     name:'应急联系人呼出管理',
      //     img:'PerOutCallTaskManage',
      //     path:'PerOutCallTaskManage',
      //     children:[
      //       {
      //         id:31,
      //         name:'呼出任务管理',
      //         path:'PerOutCallTaskManage'
      //       },
      //       {
      //         id:32,
      //         name:'呼出记录查询',
      //         path:'PerOutCallRecordManage'
      //       }
      //     ]
      //   },
      //   {
      //     id:4,
      //     img:'SateOutCallTaskManage',
      //     name:'卫星终端呼出管理',
      //     path:'SateOutCallTaskManage',
      //     children:[
      //       {
      //         id:41,
      //         name:'呼出任务管理',
      //         path:'SateOutCallTaskManage'
      //       },
      //       {
      //         id:42,
      //         name:'呼出记录查询',
      //         path:'SateOutCallRecordManage'
      //       }
      //     ]
      //   },
      //   {
      //     id:5,
      //     name:'拨测用户管理',
      //     img:'CallUserManage',
      //     path:'CallUserManage'
      //   },
      //   {
      //     id:6,
      //     name:'统计分析',
      //     img:"StaticPer",
      //     path:'StaticPer',
      //     children:[
      //       {
      //         id:61,
      //         name:'违规人员排名',
      //         path:'StaticPer'
      //       },
      //       {
      //         id:61,
      //         name:'拨测任务统计',
      //         path:'StaticTask'
      //       },
      //       {
      //         id:63,
      //         name:'拨测综合统计',
      //         path:'StaticComprehensive'
      //       },
      //       {
      //         id:64,
      //         name:'拨测用户统计',
      //         path:'StaticUser'
      //       }
      //     ]
      //   },
      //   {
      //     id:7,
      //     name:'大屏展示',
      //     img:"VoiceManage",
      //     path:'VoiceManage'
      //   },
      //   {
      //     id:8,
      //     name:'告警管理',
      //     img:"PerAlermSet",
      //     path:'PerAlermSet',
      //     children:[
      //       {
      //         id:81,
      //         name:'应急联系人告警设置',
      //         path:'PerAlermSet'
      //       },
      //       {
      //         id:82,
      //         name:'应急联系人告警查询',
      //         path:'PerAlermSearch'
      //       },
      //       {
      //         id:83,
      //         name:'卫星终端告警设置',
      //         path:'SateAlermSet'
      //       },
      //       {
      //         id:84,
      //         name:'卫星终端告警查询',
      //         path:'SateAlermSearch'
      //       }
      //     ]
      //   },
      //   {
      //     id:9,
      //     name:'语音管理',
      //     img:'VoiceManage',
      //     path:'VoiceManage'
      //   },
      //   {
      //     id:10,
      //     name:'系统管理',
      //     img:"userDanagement",
      //     path:'userDanagement',
      //     children:[
      //       {
      //         id:101,
      //         name:'用户管理',
      //         path:'userDanagement'
      //       },
      //       {
      //         id:102,
      //         name:'角色管理',
      //         path:'roleDanagement'
      //       },
      //       {
      //         id:103,
      //         name:'权限管理',
      //         path:'JurDanagement'
      //       },
      //       {
      //         id:104,
      //         name:'数据字典',
      //         path:'dataDictionary'
      //       },
      //       {
      //         id:105,
      //         name:'日志管理',
      //         path:'logDanagement'
      //       }
      //     ]
      //   },
      // ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created(){
    https.fetchPost('web/common/getMenu').then(res => {
      console.log(res);
      this.menuData = res.data.routerList;
      this.menuData.forEach((value,index) => {
        if(value.children&&value.children.length>0){
          value.isChild = false;
        }else{
          value.isChild = true;
        }
      })
    })
  },
  mounted () {
   
  },
  methods: {
    // 拼接本地图片src路径
    getSrc(img){
      console.log(img);
      return require('./../assets/image/menu/'+ img +'.svg');
    },
    // 菜单路由跳转
    getToPath(html){
      this.$router.push(html)
    },
    // handleNodeClick(data){
    //   if(data.html){
    //     this.$router.push('/'+data.html)
    //   }
    // },
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // 动态改变菜单和内容界面宽度
    change(){
      if(this.showMenu==true){
        this.$emit('getLen','190px');
        this.$root.$emit('listenEvent','210');
        this.showMenu = false;
      }else{
        this.$emit('getLen','50px');
        this.showMenu = true;
        this.$root.$emit('listenEvent','70');
      }
    }
  }
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #leftbar{
    width: 190px;
    text-align: center;
    max-height: calc(100vh - 50px);
    height: calc(100vh - 50px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .el-menu {
    background:transparent;
    border: none;
  }
  .el-submenu {
    text-align: left;
    /* padding:0 8px!important; */
  }
  img {
    width: 20px;
    height: 20px;
    border-style: none;
  }
</style>