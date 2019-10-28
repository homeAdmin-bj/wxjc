<template>
  <div id="StaticTask">
    <div class="static">
      <div class="title">统计分析 > 拨测任务统计</div>
      <div class="content">
        <div class="search">
          <div class="static_btn">
            <span ref="outCall" @click="change(true)">呼出测试统计</span><span ref="inCall" @click="change(false)">呼入测试统计</span>
          </div>
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
          <div class="myChart_title">2019年度呼出测试结果统计</div>
          <div class="myChart_legend">
            <span></span>呼出总数
            <span></span>接通数
            <span></span>未接通数
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
          toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
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
              ['product', '呼出总数', '接通数', '未接通数'],
              ['20190201呼出测试', 43.3, 85.8, 93.7],
              ['20190202呼出测试', 83.1, 73.4, 55.1],
              ['20190203呼出测试', 86.4, 65.2, 82.5],
              ['20190204呼出测试', 72.4, 53.9, 39.1],
              ['20190205呼出测试', 72.4, 53.9, 39.1],
              ['20190206呼出测试', 72.4, 53.9, 39.1],
              ['20190207呼出测试', 72.4, 53.9, 39.1],
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {},
          series: [
            {type: 'bar',barWidth:40,color:'#0978BD'},
            {type: 'bar',barWidth:40,color:'#41A986'},
            {type: 'bar',barWidth:40,color:'#EF5A77'}
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
    },
    change(status){
      if(status){
        this.$refs.outCall.style['color'] = '#fff';
        this.$refs.outCall.style['background'] = '#0978BD';
        this.$refs.inCall.style['color'] = '#0978BD';
        this.$refs.inCall.style['background'] = '#fff';
      }else{
        this.$refs.outCall.style['color'] = '#0978BD';
        this.$refs.outCall.style['background'] = '#fff';
        this.$refs.inCall.style['color'] = '#fff';
        this.$refs.inCall.style['background'] = '#0978BD';
      }
    }
  }
}
</script>
<style scoped>
#StaticTask {
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
/* 统计切换按钮样式 */
.static_btn {
  float: right;
  
}
.static_btn span {
  width:140px;
  display: inline-block;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border: 1px solid #0978BD;
  font-size: 14px
}
.static_btn span:nth-child(1) {
  border-top-left-radius: 20px; 
  border-bottom-left-radius: 20px;
  background:#0978BD;
  color: #fff;
}
.static_btn span:nth-child(2) {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  color: #0978BD;
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
  margin-left: -10px;
}
.myChart_legend span:nth-child(2) {
  background: #41A986;
}
.myChart_legend span:nth-child(3) {
  background: #EF5A77;
}
</style>

