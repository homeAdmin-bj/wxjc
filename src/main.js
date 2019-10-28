import Vue from 'vue'
import App from './App'
import router from './router'
//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//全部样式
import './assets/css/index.css';

import '../static/font-awesome-4.7.0/css/font-awesome.min.css';
//syy 修改elementui样式
import './css/callUserManage.css'

// echarts
import echarts from 'echarts' 
Vue.prototype.$echarts = echarts 

// vuex
import store from './store/index'

//axios
// import axios from 'axios';
// Vue.prototype.$axios = axios;
// import QS from 'qs'
// Vue.prototype.qs = QS;

// // 全局路由守卫
router.beforeEach((to, from, next) => {
    // const token = store.state.token?store.state.token:window.sessionStorage.getItem('token');
    // var nextRoute = store.getters.getRoutList;
    // 未登录状态；当路由到nextRoute指定页时，跳转至login
    // if (nextRoute.indexOf(to.name) >= 0) {  
    //     // 刷新界面未登录状态返回登录页
    //     if (!window.sessionStorage.isLogin) {
    //         router.push({ name: 'login' })
    //     }
    // }
    const routList = [
        'index',
        'PerInCallTaskManage', 'PerInCallTaskManageAdd', 'PerInCallTaskManageView',
        'SateInCallTaskManage', 'SateInCallTaskManageAdd', 'SateInCallTaskManageView',
        'PerInCallRecordManage','PerInCallRecordManageView',
        'SateInCallRecordManage','SateInCallRecordManageView',
        'PerMessageSendManage','PerMessageSendManageAdd','PerMessageSendManageView',
        'SateMessageSendManage','SateMessageSendManageAdd','SateMessageSendManageView',
        'PerOutCallTaskManage','PerOutCallTaskManageAdd','PerOutCallTaskManageView',
        'SateOutCallTaskManage','SateOutCallTaskManageAdd','SateOutCallTaskManageView',
        'PerOutCallRecordManage','PerOutCallRecordManageView',
        'SateOutCallRecordManage','SateOutCallRecordManageView',
        'CallUserManage','CallUserManageAdd','CallUserManageView',
        'StaticPer','StaticTask','StaticUser','StaticComprehensive',
        'AlermSet','AlermSearch',
        'VoiceManage','VoiceManageAdd','/VoiceManageView',
        'BigScreen'
    ]
    // 未登录状态防止跳入系统首页
    if(routList.indexOf(to.name)!=-1&&window.sessionStorage.isLogin==undefined){
        router.push({name:'login'});
        return;
    }
    // 退出后阻止登录
    if(from.name=='login'&&window.sessionStorage.isLogin==undefined){
        return;
    }
    // 大屏登录后，如果跳转至任何界面则跳转大屏
    if(from.name=='BigScreen'&&window.sessionStorage.isLogin&&window.sessionStorage.isBigScreen){
        return;
    }
    // if(to.name=='PerInCallTaskManage'&&window.sessionStorage.isLogin&&window.sessionStorage.isBigScreen) {
    //     // 已登录状态后退不反回登录页
    //     router.push({name:'BigScreen'});
    //     return;
    // }
    // 系统登录后阻止跳转到到界面
    if(to.name=='BigScreen'&&window.sessionStorage.isLogin&&!window.sessionStorage.isBigScreen) {
        // 已登录状态后退不反回登录页
        return;
    }
    // 已登录状态；当路由到login时，跳转至home 
    if (to.name === 'login') {
        if (window.sessionStorage.isLogin) {
            // console.log(window.sessionStorage.isLogin)
            // 已登录状态后退不反回登录页
            router.push({name:'PerInCallTaskManage'});
            return; 
        }
    }
    
    // 退出系统后，阻止在进入系统或者大屏
    if((to.name === 'PerInCallTaskManage'||to.name === 'BigScreen')&&!window.sessionStorage.isLogin) {
        router.push({name:'login'});
        return; 
    }
    next();
})

Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})