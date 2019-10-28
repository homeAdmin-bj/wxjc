import Vue from 'vue'
import Router from 'vue-router'
import index from './../pages/Index.vue'
import Login from './../pages/Login.vue'
// 大屏
import BigScreen from './../pages/BigScreen.vue'
// 应急联系人呼入任务管理
import PerInCallTaskManage from './../pages/PerInCallTask/InCallTaskManage.vue'
import PerInCallTaskManageAdd from './../pages/PerInCallTask/InCallTaskManageAdd.vue'
import PerInCallTaskManageView from './../pages/PerInCallTask/InCallTaskManageView.vue'
// 卫星电话呼入任务管理
import SateInCallTaskManage from './../pages/SateInCallTask/InCallTaskManage.vue'
import SateInCallTaskManageAdd from './../pages/SateInCallTask/InCallTaskManageAdd.vue'
import SateInCallTaskManageView from './../pages/SateInCallTask/InCallTaskManageView.vue'
// 应急联系人呼入记录管理
import PerInCallRecordManage from './../pages/PerInCallRecord/InCallRecordManage.vue'
//import PerInCallRecordManageView from './../pages/PerInCallRecord/InCallRecordManageView.vue'
// 卫星电话呼入记录管理
import SateInCallRecordManage from './../pages/SateInCallRecord/InCallRecordManage.vue'
//import SateInCallRecordManageView from './../pages/SateInCallRecord/InCallRecordManageView.vue'
//应急联系人短信发送管理
import PerMessageSendManage from './../pages/PerMessageSend/MessageSendManage.vue'
import PerMessageSendManageAdd from './../pages/PerMessageSend/MessageSendManageAdd.vue'
import PerMessageSendManageView from './../pages/PerMessageSend/MessageSendManageView.vue'
// 卫星电话短信发送管理
import SateMessageSendManage from './../pages/SateMessageSend/MessageSendManage.vue'
import SateMessageSendManageAdd from './../pages/SateMessageSend/MessageSendManageAdd.vue'
import SateMessageSendManageView from './../pages/SateMessageSend/MessageSendManageView.vue'
// 应急联系人呼出任务管理
import PerOutCallTaskManage from './../pages/PerOutCallTask/OutCallTaskManage.vue'
import PerOutCallTaskManageAdd from './../pages/PerOutCallTask/OutCallTaskManageAdd.vue'
import PerOutCallTaskManageView from './../pages/PerOutCallTask/OutCallTaskManageView.vue'
// 卫星电话呼出任务管理
import SateOutCallTaskManage from './../pages/SateOutCallTask/OutCallTaskManage.vue'
import SateOutCallTaskManageAdd from './../pages/SateOutCallTask/OutCallTaskManageAdd.vue'
import SateOutCallTaskManageView from './../pages/SateOutCallTask/OutCallTaskManageView.vue'
// 应急联系人呼出记录管理
import PerOutCallRecordManage from './../pages/PerOutCallRecord/OutCallRecordManage.vue'
//import PerOutCallRecordManageView from './../pages/PerOutCallRecord/OutCallRecordManageView.vue'
// 卫星电话呼出记录管理
import SateOutCallRecordManage from './../pages/SateOutCallRecord/OutCallRecordManage.vue'
//import SateOutCallRecordManageView from './../pages/SateOutCallRecord/OutCallRecordManageView.vue'
// 拨测用户管理
import CallUserManage from './../pages/CallUser/CallUserManage.vue'
import CallUserManageAdd from './../pages/CallUser/CallUserManageAdd.vue'
import CallUserManageView from './../pages/CallUser/CallUserManageView.vue'
import RCSTManage from './../pages/CallUser/RCSTManage.vue'
import RCSTManageAdd from './../pages/CallUser/RCSTManageAdd.vue'
import RCSTManageView from './../pages/CallUser/RCSTManageView.vue'
// 统计分析
import StaticPer from './../pages/Static/StaticPer.vue'
import StaticTask from './../pages/Static/StaticTask.vue'
import StaticUser from './../pages/Static/StaticUser.vue'
import StaticComprehensive from './../pages/Static/StaticComprehensive.vue'
// 告警管理
import PerAlermSet from './../pages/Alerm//PerAlermSet.vue'
import PerAlermSearch from './../pages/Alerm/PerAlermSearch.vue'
import SateAlermSet from './../pages/Alerm/SateAlermSet.vue'
import SateAlermSearch from './../pages/Alerm/SateAlermSearch.vue'
// 语音管理
import VoiceManage from './../pages/Voice/VoiceManage.vue'
import VoiceManageAdd from './../pages/Voice/VoiceManageAdd.vue'
import VoiceManageView from './../pages/Voice/VoiceManageView.vue'

// 系统管理
import userDanagement from './../pages/systemManagement/userDanagement.vue'
import roleDanagement from './../pages/systemManagement/roleDanagement.vue'
import JurDanagement from './../pages/systemManagement/JurDanagement.vue'
import dataDictionary from './../pages/systemManagement/dataDictionary.vue'
import logDanagement from './../pages/systemManagement/logDanagement.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUI)

var routes = [{
            path: '*',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/BigScreen',
            name: 'BigScreen',
            component: BigScreen
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            children: [
                // 应急联系人呼入任务管理
                {
                    path: '/PerInCallTaskManage',
                    name: 'PerInCallTaskManage',
                    component: PerInCallTaskManage
                },
                {
                    path: '/PerInCallTaskManageAdd',
                    name: 'PerInCallTaskManageAdd',
                    component: PerInCallTaskManageAdd
                },
                {
                    path: '/PerInCallTaskManageView',
                    name: 'PerInCallTaskManageView',
                    component: PerInCallTaskManageView
                },
                // 卫星电话呼入任务管理
                {
                    path: '/SateInCallTaskManage',
                    name: 'SateInCallTaskManage',
                    component: SateInCallTaskManage
                },
                {
                    path: '/SateInCallTaskManageAdd',
                    name: 'SateInCallTaskManageAdd',
                    component: SateInCallTaskManageAdd
                },
                {
                    path: '/SateInCallTaskManageView',
                    name: 'SateInCallTaskManageView',
                    component: SateInCallTaskManageView
                },
                // 应急联系人呼入记录管理
                {
                    path: '/PerInCallRecordManage',
                    name: 'PerInCallRecordManage',
                    component: PerInCallRecordManage
                },
                // {
                //     path: '/PerInCallRecordManageView',
                //     name: 'PerInCallRecordManageView',
                //     component: PerInCallRecordManageView
                // },
                // 卫星电话呼入记录管理
                {
                    path: '/SateInCallRecordManage',
                    name: 'SateInCallRecordManage',
                    component: SateInCallRecordManage
                },
                // {
                //     path: '/SateInCallRecordManageView',
                //     name: 'SateInCallRecordManageView',
                //     component: SateInCallRecordManageView
                // },
                // 应急联系人短信发送管理
                {
                    path: '/PerMessageSendManage',
                    name: 'PerMessageSendManage',
                    component: PerMessageSendManage
                },
                {
                    path: '/PerMessageSendManageAdd',
                    name: 'PerMessageSendManageAdd',
                    component: PerMessageSendManageAdd
                },
                {
                    path: '/PerMessageSendManageView',
                    name: 'PerMessageSendManageView',
                    component: PerMessageSendManageView
                },
                // 卫星电话短信发送管理
                {
                    path: '/SateMessageSendManage',
                    name: 'SateMessageSendManage',
                    component: SateMessageSendManage
                },
                {
                    path: '/SateMessageSendManageAdd',
                    name: 'SateMessageSendManageAdd',
                    component: SateMessageSendManageAdd
                },
                {
                    path: '/SateMessageSendManageView',
                    name: 'SateMessageSendManageView',
                    component: SateMessageSendManageView
                },
                // 应急联系人呼出任务管理
                {
                    path: '/PerOutCallTaskManage',
                    name: 'PerOutCallTaskManage',
                    component: PerOutCallTaskManage
                },
                {
                    path: '/PerOutCallTaskManageAdd',
                    name: 'PerOutCallTaskManageAdd',
                    component: PerOutCallTaskManageAdd
                },
                {
                    path: '/PerOutCallTaskManageView',
                    name: 'PerOutCallTaskManageView',
                    component: PerOutCallTaskManageView
                },
                // 卫星电话呼出任务管理
                {
                    path: '/SateOutCallTaskManage',
                    name: 'SateOutCallTaskManage',
                    component: SateOutCallTaskManage
                },
                {
                    path: '/SateOutCallTaskManageAdd',
                    name: 'SateOutCallTaskManageAdd',
                    component: SateOutCallTaskManageAdd
                },
                {
                    path: '/SateOutCallTaskManageView',
                    name: 'SateOutCallTaskManageView',
                    component: SateOutCallTaskManageView
                },
                // 应急联系人呼出记录管理
                {
                    path: '/PerOutCallRecordManage',
                    name: 'PerOutCallRecordManage',
                    component: PerOutCallRecordManage
                },
                // {
                //     path: '/PerOutCallRecordManageView',
                //     name: 'PerOutCallRecordManageView',
                //     component: PerOutCallRecordManageView
                // },
                // 卫星电话呼出记录管理
                {
                    path: '/SateOutCallRecordManage',
                    name: 'SateOutCallRecordManage',
                    component: SateOutCallRecordManage
                },
                // {
                //     path: '/SateOutCallRecordManageView',
                //     name: 'SateOutCallRecordManageView',
                //     component: SateOutCallRecordManageView
                // },
                // 拨测用户管理
                {
                    path: '/CallUserManage',
                    name: 'CallUserManage',
                    component: CallUserManage
                },
                {
                    path: '/CallUserManageAdd',
                    name: 'CallUserManageAdd',
                    component: CallUserManageAdd
                },
                {
                    path: '/CallUserManageView',
                    name: 'CallUserManageView',
                    component: CallUserManageView
                },
                {
                    path: '/RCSTManage',
                    name: 'RCSTManage',
                    component: RCSTManage
                },
                {
                    path: '/RCSTManageAdd',
                    name: 'RCSTManageAdd',
                    component: RCSTManageAdd
                },
                {
                    path: '/RCSTManageView',
                    name: 'RCSTManageView',
                    component: RCSTManageView
                },
                // 统计分析
                {
                    path: '/StaticPer',
                    name: 'StaticPer',
                    component: StaticPer
                },
                {
                    path: '/StaticTask',
                    name: 'StaticTask',
                    component: StaticTask
                },
                {
                    path: '/StaticUser',
                    name: 'StaticUser',
                    component: StaticUser
                },
                {
                    path: '/StaticComprehensive',
                    name: 'StaticComprehensive',
                    component: StaticComprehensive
                },
                // 告警设置
                {
                    path: '/PerAlermSet',
                    name: 'PerAlermSet',
                    component: PerAlermSet
                },
                {
                    path: '/PerAlermSearch',
                    name: 'PerAlermSearch',
                    component: PerAlermSearch
                },
                {
                    path: '/SateAlermSet',
                    name: 'SateAlermSet',
                    component: SateAlermSet
                },
                {
                    path: '/SateAlermSearch',
                    name: 'SateAlermSearch',
                    component: SateAlermSearch
                },
                // 语音管理
                {
                    path: '/VoiceManage',
                    name: 'VoiceManage',
                    component: VoiceManage
                },
                {
                    path: '/VoiceManageAdd',
                    name: 'VoiceManageAdd',
                    component: VoiceManageAdd
                },
                {
                    path: '/VoiceManageView',
                    name: 'VoiceManageView',
                    component: VoiceManageView
                },
                // 系统管理
                {
                    path: '/userDanagement',
                    name: 'userDanagement',
                    component: userDanagement
                },
                {
                    path: '/roleDanagement',
                    name: 'roleDanagement',
                    component: roleDanagement
                },
                {
                    path: '/JurDanagement',
                    name: 'JurDanagement',
                    component: JurDanagement
                },
                {
                    path: '/dataDictionary',
                    name: 'dataDictionary',
                    component: dataDictionary
                },
                {
                    path: '/logDanagement',
                    name: 'logDanagement',
                    component: logDanagement
                }
            ]
        }

    ] // 配置默认页面

const files = require.context('.', false, /\.js$/)
    // 加载各模块自定义路由
files.keys().forEach(key => {
    if (key === './index.js') return
    routes = concat(routes, files(key).default) // 合并路由
})

export default new Router({
    // mode: 'history',
    routes
})