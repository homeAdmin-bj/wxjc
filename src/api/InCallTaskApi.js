import https from '../unit/httpServer'

export let INCALLAPI = {
  //查询呼出列表信息
  ecTaskIn_showPage(data) {
    return https.fetchPost('/dialing/ecTaskIn/showPage', data);
  },
  //根据ID删除呼入任务
  ecTaskIn_deleteById(data) {
    return https.fetchPost('/dialing/ecTaskIn/deleteById', data);
  },
  //根据ID删除呼入任务
  control_getDeptTree(data) {
    return https.fetchPost('/web/control/getDeptTree', data);
  },
  //切换呼入任务状态
  ecTaskIn_cutEcTaskInEnable(data) {
    return https.fetchPost('/dialing/ecTaskIn/cutEcTaskInEnable', data);
  },
  //语音列表
  ecAudioCtrl_showPage(data) {
    return https.fetchPost('/dialing/ecAudioCtrl/showPage', data);
  },
  //语音列表
  ecAudioCtrl_updateTaskDefault(data) {
    return https.fetchPost('/dialing/ecAudioCtrl/updateTaskDefault', data);
  },
  //新增呼入任务 - 普通任务
  ecTaskIn_saveGeneralEcTaskIn(data) {
    return https.fetchPost('/dialing/ecTaskIn/saveGeneralEcTaskIn', data);
  },
  //新增呼入任务 - 周期性任务
  ecTaskIn_saveCycleEcTaskIn(data) {
    return https.fetchPost('/dialing/ecTaskIn/saveCycleEcTaskIn', data);
  },
  //根据Id查询呼入信息
  ecTaskIn_selectById(data) {
    return https.fetchPost('/dialing/ecTaskIn/selectById', data);
  },
  //获取关联的部门或者拨测用户信息
  ecTaskIn_findByEcTaskInfo(data) {
    return https.fetchPost('/dialing/ecTaskIn/findByEcTaskInfo', data);
  },
  //单位拨测用户树
  commonControl_getDeptTestUser(data) {
    return https.fetchPost('/dialing/commonControl/getDeptTestUser', data);
  },
  //根据公司Id查询拨测用户分组
  testGroup_selectEcTestUsers(data) {
    return https.fetchPost('/dialing/testGroup/selectEcTestUsers', data);
  },
  //更新呼入任务信息
  ecTaskIn_updateByEcTaskInfo(data) {
    return https.fetchPost('/dialing/ecTaskIn/updateByEcTaskInfo', data);
  },
  //查询短信列表信息
  ecSms_showPage(data) {
    return https.fetchPost('/dialing/ecSms/showPage', data);
  },
  //查询短信列表信息
  ecSms_saveEcSms(data) {
    return https.fetchPost('/dialing/ecSms/saveEcSms', data);
  },
  //根据ID删除短信记录
  ecSms_deleteById(data) {
    return https.fetchPost('/dialing/ecSms/deleteById', data);
  },
  //根据ID查询短信信息
  ecSms_selectById(data) {
    return https.fetchPost('/dialing/ecSms/selectById', data);
  }
}
