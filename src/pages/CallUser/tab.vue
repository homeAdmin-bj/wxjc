<template>
  <div class="outbox" @click="change">
    <div
      id="outboxLeft"
      class='left common'
      :class="{'active':!isCom}"
    >按单位</div>
    <div
      id="outboxRight"
      class='right common'
      :class="{'active':isCom}"
    >自定义分组</div>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
        //isCom:false
    };
  },
  computed: {
    isCom(){
      return this.$store.getters.getIsCommon
    }
  },
  methods: {
    change(e) {
      var tar = e.target || window.event.target;
      var str = tar.innerText.replace(/\s*/g, "");
      if (str == "按单位") {
        this.$store.dispatch('setIsCommon',false);
      } else {
        this.$store.dispatch('setIsCommon',true);
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.outbox {
  width: 168px;
  height: 26px;
  font-family: "Microsoft YaHei";
  font-size: 12px;
  text-align: center;
  line-height: 24px;
  box-sizing: border-box;
  cursor: pointer;
}
.active{
  background: #0978bc!important;
  color: #fff!important;
}
.common{
  width: 82px;
  float: left;
  height: 26px;
  background: #fff;
  color: #0978bc;
  border: 1px solid #0978bc;
  box-sizing: border-box;
}
.left {
  border-bottom-left-radius: 13px;
  border-top-left-radius: 13px;
}
.right {
  border-bottom-right-radius: 13px;
  border-top-right-radius: 13px;
}
</style>
