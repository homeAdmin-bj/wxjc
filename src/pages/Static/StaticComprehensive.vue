<template>
  <div id="StaticComprehensive">
    <div class="static">
      <div class="title">统计分析 > 拨测综合统计</div>
      <div class="content">
        <div class="search">
          <span class="select_time">选择时间：</span>
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <input type="button" value="统计" class="search_btn">
          <input type="button" value="导出" class="reset_btn">  
        </div>
        <div>
          <div class="myChart_title">2019年度拨测情况统计</div>
          <div class="myChart_legend">
            <span></span>日常任务
            <span></span>临时任务
          </div>
          <div id="myChart" ref="myChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      time:''
    }
  },
  mounted() {
    this.drawLine();
    this.init();
    this.$root.$on('listenEvent',(data)=>{
      if(this.$refs.myChart){
        this.$refs.myChart.style['width'] = 'calc(100vw - ' + data + 'px)';
        this.drawLine();
        this.init();
      }
    })
  },
  methods: {
    drawLine(){
      let myChart = this.$echarts.init(this.$refs.myChart);
      let option = {
           tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          dataZoom:[
            {
              type: 'slider',
              show: true,
              start: 1,
              end: 50
            },
          ],
          dataset: {
            source: [
              ['product', '日常任务', '临时任务'],
              ['拨测总数', 43.3, 85.8, 93.7],
              ['呼出未接通数', 83.1, 73.4, 55.1],
              ['呼出接通数', 86.4, 65.2, 82.5],
              ['未呼入用户数', 72.4, 53.9, 39.1],
              ['呼入用户数', 72.4, 53.9, 39.1]
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {},
          series: [
            {type: 'bar',barWidth:40,color:'#0978BD'},
            {type: 'bar',barWidth:40,color:'#41A986'}
          ]
      };
      myChart.setOption(option)
      window.onresize = myChart.resize();
    },
    init() {
      const self = this;//因为箭头函数会改变this指向，指向windows。所以先把this保存
      setTimeout(() => {
        window.onresize = function() {
            self.myChart = self.$echarts.init(self.$refs.myChart);
            self.myChart.resize();
        }
      },20)
    }
  }
}
</script>
<style scoped>
#StaticComprehensive {
  height: calc(100vh - 50px);
  background: #E4EBF1;
  font-family: MicrosoftYaHel;
}
.static {
  margin: 0 10px;
}
/* 页面标题 */
.static > .title {
  height:30px;
  font-size:12px;
  line-height:30px;
}
/* 内容白色区部分  */
.static > .content {
  height: calc(100vh - 90px);
  background: #fff;
}
/* 查询条件 */
.search {
  padding: 10px 10px 0 10px;
}
/* echarts高度 */
#myChart {
  height: calc(100vh - 330px);
  /* background: #eee; */
  box-sizing: border-box;
}
/* echarts 标题样式 */
.myChart_title {
  text-align:center;font-weight:bolder;font-size:22px;padding-top:60px;color:#333;
}
/* echarts 图例样式 */
.myChart_legend {
  text-align: center;
  padding: 50px 0 0;
  font-size: 14px;
}
.myChart_legend span{
  display: inline-block;
  width:12px;
  height: 12px;
  margin:0 5px 0 60px;
  position: relative;
  top: 1px;
}
.myChart_legend span:nth-child(1) {
  background: #0978BD;
  margin-left: -15px;
}
.myChart_legend span:nth-child(2) {
  background: #41A986;
}
</style>

