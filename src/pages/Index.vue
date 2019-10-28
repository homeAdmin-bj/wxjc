<template>
  <div class="index">
    <headbar class="header"></headbar>
    <div id="main" :style="{'padding-right':len}">
      <div class="main" :style="{'margin-left':len}">
        <router-view></router-view>
      </div>
      <div class="left" :style="{'width':len}">
        <leftbar v-on:getLen="getLen"></leftbar>
      </div>      
    </div>
  </div>
</template>
<script>
import headbar from './headbar.vue'
import leftbar from './leftbar.vue'
export default {
  name: 'index',
  components: { headbar, leftbar },
  data () {
    return {
      len:'50px'
    }
  },
  methods:{
    getLen(data){
      this.len = data;
    }
  }
}
</script>

<style scoped>
  .header {
    height: 50px;
  }
  #main {
    padding-right: 190px;
    position: relative;
  }
  #main:after {
    clear:both;
    content:' ';
    display:block;
    width: 0;
    height: 0;
    visibility:hidden;
  }
   .main,.left {
    float: left;
    height: calc(100vh - 50px);
   }
   .left {
     width: 190px;
     position: absolute;
     overflow: hidden;
     background:#163B55
   }
   .main {
     width: 100%;
     margin-left: 190px;
     overflow: auto;
   }
</style>

