// 兼容ie对vuex的支持
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        routList: [
            'InCallTaskManage', 'InCallTaskManageAdd', 'InCallTaskManageView',
            'InCallRecordManage', 'InCallRecordManageView',
            'MessageSendManage',
            'MessageSendManageAdd', 'MessageSendManageView',
            'OutCallTaskManage', 'OutCallTaskManageAdd', 'OutCallTaskManageView',
            'OutCallRecordManage', 'OutCallRecordManageView',
            'CallUserManage', 'CallUserManageAdd', 'CallUserManageView',
            'StaticPer', 'StaticTask', 'StaticUser', 'StaticComprehensive',
            'AlermSet', 'AlermSearch',
            'VoiceManage', 'VoiceManageAdd', '/VoiceManageView',
            'BigScreen'
        ],
        // 拨测用户管理模块  当前是否是 自定义分组  false---表示按单位  true---表示自定义分组
        isCommon: false, //应急联系人
        isCommonR: false //卫星电话
    },
    getters: {
        getRoutList: state => {
            return state.routList
        },
        getIsCommon: state => {
            return state.isCommon
        },
        getIsCommonR: state => {
            return state.isCommonR
        }
    },
    mutations: {
        ISCOMMON: (state, isCommon) => {
            state.isCommon = isCommon
        },
        ISCOMMONR: (state, isCommonR) => {
            state.isCommonR = isCommonR
        },
    },
    actions: {
        setIsCommon({ commit }, isCommon) {
            commit('ISCOMMON', isCommon)
        },
        setIsCommonR({ commit }, isCommonR) {
            commit('ISCOMMONR', isCommonR)
        }

    }
})