import https from '../unit/httpServer'

export let SOCTAPI = {
  //查询呼出列表信息
  ecTaskOut_showPage(data) {
    return https.fetchPost('/dialing/ecTaskOut/showPage', data);
  },
  //新增呼出任务 - 周期性任务
  ecTaskOut_saveCycleEcTaskOut(data) {
    return https.fetchPost('/dialing/ecTaskOut/saveCycleEcTaskOut', data);
  },
  //新增呼出任务 - 普通任务
  ecTaskOut_saveGeneralEcTaskOut(data) {
    return https.fetchPost('/dialing/ecTaskOut/saveGeneralEcTaskOut', data);
  },
  //更新呼出任务信息
  ecTaskOut_updateByEcTaskOut(data) {
    return https.fetchPost('/dialing/ecTaskOut/updateByEcTaskOut', data);
  },
  //删除呼出任务
  ecTaskOut_deleteByIds(data) {
    return https.fetchPost('/dialing/ecTaskOut/deleteById', data);
  },
  //切换呼出任务状态
  ecTaskOut_cutEcTaskOutEnable(data) {
    return https.fetchPost('/dialing/ecTaskOut/cutEcTaskOutEnable', data);
  },
  //语音列表
  ecAudioCtrl_showPage(data) {
    return https.fetchPost('/dialing/ecAudioCtrl/showPage', data);
  },
  //语音列表
  ecAudioCtrl_updateTaskDefault(data) {
    return https.fetchPost('/dialing/ecAudioCtrl/updateTaskDefault', data);
  },
  // 编辑 根据任务ID查询任务信息
  ecTaskOut_selectById(data) {
    return https.fetchPost('/dialing/ecTaskOut/selectById', data);
  }
}
