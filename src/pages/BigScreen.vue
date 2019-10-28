<template>
  <div id="bigScreen">
      <div class="header">
        <div class="header_left">
          <span class="callWord" style="margin-right:50px;" @click="back">2019年累计拨测次数</span><span class="callNum"></span><span class="callNum"></span><span class="callNum">1</span><span class="callNum">2</span><span class="callNum">0</span><span class="callNum">0</span><span class="callNum">0</span><span style="margin-left:20px;" class="callWord">次</span>
        </div>
        <div class="header_middle">
          <span>告警数量</span><input type="text" value="13" readonly/><span>次</span>
        </div>
        <div class="header_right">
           <span class="callWord" style="margin-right:50px;">呼出次数</span><span class="callNum">8</span><span class="callNum">0</span><span class="callNum">0</span><span class="callNum">0</span><span style="margin-left:20px;" class="callWord">次</span><span class="callWord" style="margin:0 50px 0 160px;">呼入次数</span><span class="callNum">4</span><span class="callNum">0</span><span class="callNum">0</span><span class="callNum">0</span><span style="margin-left:20px;" class="callWord">次</span>
        </div>
      </div>
      <div class="main">
        <div class="first">
          <div class="title">
            <img src="./../assets/image/title_left.png" style="margin-right:100px;"/>2019年度呼出测试结果统计<img style="margin-left:100px;" src="./../assets/image/title_right.png"/><img class="title_bac" src="./../assets/image/title_line.png"/>
          </div>
          <div class="legend">
            <span style="background:#3cc6ff;margin-left:150px;" class="legend_left"></span><span class="legend_right">呼出总数</span><span style="background:#5289dd;" class="legend_left"></span><span class="legend_right">接通数</span><span style="background:#3263bb;" class="legend_left"></span><span class="legend_right">未接通数</span>
          </div>
          <div style="height:1024px;" ref="outCall_resaultStatic" class="outCall_resaultStatic"></div>
        </div>
        <div class="second">
          <div class="title">
            <img src="./../assets/image/title_left.png" style="margin-right:60px;"/>201903015呼出任务测试<img style="margin-left:100px;" src="./../assets/image/title_right.png"/><img class="title_bac" src="./../assets/image/title_line.png"/>
          </div>
          <div style="text-align:right;color:#6fb9e9;font-size:45px;">
            <span class="legend" style="margin-right:70px;">呼出总用户数(50)</span><span class="legend" style="margin-right:70px;">未接通用户数(20)</span><span class="legend" style="margin-right:70px;">接通用户数(30)</span>
          </div>
          <div class="table">
            <div class="table_list">
              <img src="./../assets/image/table_phone.png" alt=""/><span>卫星终端</span><span>20</span><span>12</span><span>10</span>
            </div>
            <div class="table_list">
              <img src="./../assets/image/table_person.png" alt=""/><span>应急联系人</span><span>30</span><span>8</span><span>20</span>
            </div>
          </div>
          <div ref="outCall_taskStatic" style="height:580px;"></div>
        </div>
        <div class="third">
          <div class="title">
            <img src="./../assets/image/title_left.png" style="margin-right:60px;"/>用户数、接通数统计<img style="margin-left:60px;" src="./../assets/image/title_right.png"/><img class="title_bac" src="./../assets/image/title_line.png"/>
          </div>
          <div ref="userNumStatic" style="height:1128px"></div>
        </div>
        <div class="fourth">
          <div class="title">
            <img src="./../assets/image/title_left.png" style="margin-right:60px;"/>2019年度未按规定呼入次数排名<img style="margin-left:60px;" src="./../assets/image/title_right.png"/><img class="title_bac" src="./../assets/image/title_line.png"/>
          </div>
          <div ref="inCall_rank" style="height:1200px;"></div>
        </div>
      </div>
      <div class="footer">
        <div class="first" style="padding-top:50px;margin-right:0;">
          <div class="title">
            <img src="./../assets/image/title_left.png" style="margin-right:100px;"/>2019年度呼入测试结果统计<img style="margin-left:100px;" src="./../assets/image/title_right.png"/><img class="title_bac" src="./../assets/image/title_line.png"/>
          </div>
           <div class="legend">
            <span style="background:#3cc6ff;margin-left:150px;" class="legend_left"></span><span class="legend_right">呼入任务用户数</span><span style="background:#5289dd;" class="legend_left"></span><span class="legend_right">呼入用户数</span><span style="background:#3263bb;" class="legend_left"></span><span class="legend_right">未呼入用户数</span>
          </div>
          <div ref="inCallResault" style="height:1050px;"></div>
        </div>
        <div class="second" style="padding:0 0 0 254px;width:1764px;">
           <div class="title">
            <img src="./../assets/image/title_left.png" style="margin-right:100px;"/>拨测用户统计<img style="margin-left:100px;" src="./../assets/image/title_right.png"/><img  class="title_bac" src="./../assets/image/title_line.png"/>
          </div>
           <div class="legend">
            <span style="background:#3cc6ff;margin-left:150px;" class="legend_left"></span><span class="legend_right">卫星终端</span><span style="background:#3263bb;" class="legend_left"></span><span class="legend_right">应急联系人</span>
          </div>
          <div ref="userStatic" style="height:1060px;"></div>
        </div>
        <div class="third" style="padding:0;">
          <div class="title">
            <img src="./../assets/image/title_left.png" style="margin-right:100px;"/>2019年度拨测情况统计<img style="margin-left:100px;" src="./../assets/image/title_right.png"/><img  class="title_bac" src="./../assets/image/title_line.png"/>
          </div>
           <div class="legend">
            <span style="background:#3cc6ff;margin-left:150px;" class="legend_left"></span><span class="legend_right" style="color:#fff;">日常任务</span><span style="background:#3263bb;" class="legend_left"></span><span class="legend_right" style="color:#fff;">临时任务</span>
          </div>
          <div ref="comprehensiveStatic" style="height:1060px;"></div>
        </div>
        <div class="fourth" style="padding-top:50px;">
          <div class="title">
            <img src="./../assets/image/title_left.png" style="margin-right:100px;"/>2019年度呼出未接通次数排名<img style="margin-left:100px;" src="./../assets/image/title_right.png"/><img class="title_bac" src="./../assets/image/title_line.png"/>
          </div>
          <div ref="outCall_rank" style="height:1100px;"></div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.getResaultStatic();
    this.getTaskStatic();
    this.getUserNumStatic();
    this.getInCallRank();
    this.getInCallTaskResault();
    this.getUserStatic();
    this.getComprehensiveStatic();
    this.getOutCallRank();
  },
  methods: {
    back(){
      sessionStorage.removeItem('isLogin');
      sessionStorage.removeItem('isBigScreen');
      sessionStorage.removeItem('token');
      this.$router.push('/login'); 
    },
    getResaultStatic(){
      var myChart = this.$echarts.init(this.$refs.outCall_resaultStatic);
      var option = {
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer : {           
        //     type : 'shadow'        
        //   }
        // },
        grid:{
          left: '12%',
          right: '2%',
          top:'5%',
          bottom:130
        },
        dataset: {
          source: [
            ['product', '呼出总数', '接通数', '未接通数'],
            ['2018-01-03', 143.3, 285.8, 93.7],
            ['2018-01-05', 183.1, 273.4, 55.1],
            ['2018-01-09', 186.4, 265.2, 82.5],
            ['2018-01-11', 172.4, 253.9, 39.1]
          ]
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6fb9e9',
              fontSize:45
            },
            margin:60
          },
          axisLine:{
            lineStyle:{
              color:'rgba(147,173,255,0.5)'
            }
          }
        },
        yAxis: {
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6fb9e9',
              fontSize:45
            },
            margin:40
          },
          splitLine:{
            lineStyle:{
              color:'rgba(147,173,255,0.5)'
            }
          },
          axisLine:{
            lineStyle:{
              color:'rgba(147,173,255,0.5)'
            }
          }
        },
        series: [
          {
            type: 'bar',
            color:'#3cc6ff',
            barWidth:45
          },
          {
            type: 'bar',
            color:'#5289dd',
            barWidth:45
          },
          {
            type: 'bar',
            color:'#3263bb',
            barWidth:45
          }
        ]
      };
      myChart.setOption(option);
      // window.onresize = myChart.resize();
    },
    getTaskStatic(){
      var myChart = this.$echarts.init(this.$refs.outCall_taskStatic);
      var option = {
        grid: {
          left: '3%',
          right: '4%',
          top:'0',
          bottom: '10%',
          containLabel: true
        },
        xAxis:  {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6fb9e9',
              fontSize:45
            },
            margin:80
          },
          axisLine:{
            lineStyle:{
              color:'transparent'
            }
          },
          splitLine:{
            lineStyle:{
              color:'rgba(147,173,255,0.5)'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['呼出总数','接通数','未接通数'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6fb9e9',
              fontSize:45
            },
            margin:60
          },
          axisLine:{
            lineStyle:{
              color:'rgba(147,173,255,0.5)'
            }
          }
        },
        series: [
          {
            type: 'bar',
            barWidth:45,
            data: [
              {
                value:30,
                itemStyle:{
                  color:'#93adff'
                }
              },{
                value:270,
                itemStyle:{
                  color:'#5289dd'
                }
              },
              {
                value:150,
                itemStyle:{
                  color:'#3cc6ff'
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    getUserNumStatic(){
      var myChart = this.$echarts.init(this.$refs.userNumStatic);
      var option = {
            tooltip: {
                trigger: 'item',
                // formatter: "{a} <br/>{b}: {c} ({d}%)"
                // formatter: "<span style='font-size:45px;'>{b}</span><br/>{c}",
                formatter: "<div style='font-size:45px;'>{b}</div><div style='text-align:left;'>{c}</div>",
                textStyle:{
                  color:'#78d6fd',
                  fontSize:60
                },
                backgroundColor:'rgba(0,0,0,0.76)',
                padding:[20,50]
            },
            // legend: {
            //     orient: 'vertical',
            //     x: 'left',
            //     data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
            // },
            series: [
              {
                name:'访问来源',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '50%'],
                label: {
                  // normal: {
                  //   position: 'inner'
                  // }
                  show:false
                },
                labelLine: {
                  normal: {
                      show: false
                  }
                },
                data:[
                  {
                    value:130, 
                    name:'呼入用户数',
                    itemStyle:{
                      color:'#3cc6ff',
                    }
                  },
                  {
                    value:150, 
                    name:'未呼入用户数',
                    itemStyle:{
                      color:'#5289dd'
                    }
                  },
                  {
                    value:100, 
                    name:'接通数',
                    itemStyle:{
                      color:'#93adff'
                    }
                  },
                  {
                    value:320, 
                    name:'未接通数',
                    itemStyle:{
                      color:'#3263bb'
                    }
                  }
                ]
              },
              {
                name:'',
                type:'pie',
                radius: ['70%', '90%'],
                label: {
                  normal: {
                      formatter: '{b|{b}}\n{hr|}',
                      // formatter: '{b|{b}}{c}',
                      backgroundColor: 'transparent',
                      borderColor: '#aaa',
                      borderWidth: 0,
                      borderRadius: 0,
                      // shadowBlur:3,
                      // shadowOffsetX: 2,
                      // shadowOffsetY: 2,
                      // shadowColor: '#999',
                      // padding: [0, 7],
                      rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                            borderColor: 'rgba(147,173,255,0.5)',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 45,
                            lineHeight: 80,
                            color:'#6fb9e9'
                        }
                      }
                    }
                },
                data:[
                  {
                    value:130, 
                    name:'呼入用户数',
                    itemStyle:{
                      color:'#3cc6ff'
                    }
                  },
                  {
                    value:150, 
                    name:'未呼入用户数',
                    itemStyle:{
                      color:'#5289dd'
                    }
                  },
                  {
                    value:100, 
                    name:'接通数',
                    itemStyle:{
                      color:'#93adff'
                    }
                  },
                  {
                    value:240, 
                    name:'未接通数',
                    itemStyle:{
                      color:'#3263bb'
                    }
                  }
                ]
              }
            ]
        };
      myChart.setOption(option);
    },
    getInCallRank(){
      var myChart = this.$echarts.init(this.$refs.inCall_rank);
      var option = {
          // backgroundColor: new this.$echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
          //     offset: 0,
          //     color: '#f7f8fa'
          // }, {
          //     offset: 1,
          //     color: '#cdd0d5'
          // }]),
          backgroundColor:'transparent',
          grid:{
            top:80,
            bottom:230,
            left:'10%',
            right:'2%'

          },
          xAxis: {
            type:'category',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#6fb9e9',
                fontSize:45
              },
              margin:50
            },
            axisLine:{
              lineStyle:{
                color:'rgba(147,173,255,0.5)'
              }
            },
            data:['李刚','刘敏','赵子怡','张毅','刘琦']
          },
          yAxis: {
            axisLabel: {
              show: true,
              textStyle: {
                color: '#6fb9e9',
                fontSize:45
              },
              margin:30
            },
            axisLine:{
              lineStyle:{
                color:'rgba(147,173,255,0.5)'
              }
            },
            splitLine:{
              lineStyle:{
                color:'rgba(147,173,255,0.5)'
              }
            }
          },
          series: [{
              name: '2019年',
              data: [
                {
                  name:'李刚',
                  value:70,
                  itemStyle:{
                    color:'rgba(60,198,255,0.6)'
                  }
                },
                {
                  name:'刘敏',
                  value:58,
                  itemStyle:{
                    color:'rgba(82,137,221,0.6)'
                  }
                },
                {
                  name:'赵子怡',
                  value:43,
                  itemStyle:{
                    color:'rgba(50,99,187,0.6)'
                  }
                },
                {
                  name:'张毅',
                  value:34,
                  itemStyle:{
                    color:'rgba(111,185,233,0.6)'
                  }
                },
                {
                  name:'刘琦',
                  value:30,
                  itemStyle:{
                    color:'rgba(62,144,255,0.6)'
                  }
                }
              ],
              type: 'scatter',
              symbolSize: function (data) {
                // return Math.sqrt(data[2]) / 5e2;
                return 120;
              },
              label: {
                // emphasis: {
                //   show: true,
                //   formatter: function (param) {
                //     return param.data[3];
                //   }
                // }
                show:true,
                fontSize:45,
                color:'#3cc6ff'
              }
          }]
      };
      myChart.setOption(option);
    },
    getInCallTaskResault(){
      var myChart = this.$echarts.init(this.$refs.inCallResault);
      var option = {
        grid: {
          left: '5%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data : ['20190501','20190502','20190503','20190504'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6fb9e9',
              fontSize:45
            },
            margin:60
          },
          axisLine:{
            lineStyle:{
              color:'rgba(147,173,255,0.5)'
            }
          }
        },
        yAxis: {
          type : 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6fb9e9',
              fontSize:45
            },
            margin:40
          },
          splitLine:{
            lineStyle:{
              color:'rgba(147,173,255,0.5)'
            }
          },
          axisLine:{
            lineStyle:{
              color:'rgba(147,173,255,0.5)'
            }
          }
        },
        series : [
          {
            name:'直接访问',
            type:'bar',
            barWidth:45,
            data:[320, 332, 301, 334, 390, 330, 320],
            itemStyle:{
              color:'#3cc6ff'
              }
          },
          {
            name:'邮件营销',
            type:'bar',
            stack: '广告',
            data:[120, 132, 101, 134, 90, 230, 210],
            barWidth:20,
            itemStyle:{
                color:'#5289dd'
            }
          },
          {
            name:'联盟广告',
            type:'bar',
            stack: '广告',
            data:[220, 182, 191, 234, 290, 330, 310],
            barWidth:20,
            itemStyle:{
                color:'#6fd9e9'
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    getUserStatic(){
      var myChart = this.$echarts.init(this.$refs.userStatic);
      var option = {
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'none'
        //   },
        //   formatter: function (params) {
        //     console.log(params);
        //     return params[0].name + '<br/>' + '卫星终端：' + params[0].value + '<br/>' + '应急联系人：' + params[3].value;
        //   }
        // },
        grid:{
          left:'15%',
          right:'4%',
          top:'5%',
          bottom:'14%'
        },
        xAxis: {
            data: ['应急保障中心', '某某某通管局', '某某某地市局', '某某某移动公司'],
            axisTick: {show: false},
            axisLabel: {
              show: true,
              textStyle: {
                color: '#6fb9e9',
                fontSize:45
              },
              margin:60
            },
            axisLine:{
              lineStyle:{
                color:'rgba(147,173,255,0.5)'
              }
            }
        },
        yAxis: {
            axisTick: {show: false},
            axisLine: {show: false},
            position:'left',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#6fb9e9',
                fontSize:45
              },
              margin:40
            },
            splitLine:{
              lineStyle:{
                color:'rgba(147,173,255,0.5)'
              }
            },
            axisLine:{
              lineStyle:{
                color:'rgba(147,173,255,0.5)'
              }
            }
        },
        series: [{
          name: 'hill',
          type: 'pictorialBar',
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          itemStyle: {
            normal: {
                color:'rgba(60,198,255,0.8)'
            },
            emphasis: {
              color:'rgba(60,198,255,1)'
            }
          },
          data: [63, 60, 40, 48],
          z: 11
        },{
          name: 'hill1',
          type: 'pictorialBar',
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          symbolOffset:[100,0],
          itemStyle: {
            normal: {
              color:'rgba(50,99,187,0.8)'
            },
            emphasis: {
              color:'rgba(50,99,187,1)'
            }
          },
          data: [23, 30, 75, 68],
          z: 10
        }]
      };
      myChart.setOption(option);
    },
    getComprehensiveStatic(){
      var myChart = this.$echarts.init(this.$refs.comprehensiveStatic);
      var option = {
        grid: {
          left: '3%',
          right: '5%',
          top:'3%',
          bottom: '5%',
          containLabel: true
        },
        xAxis:  {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6fb9e9',
              fontSize:45
            },
            margin:40
          },
          axisLine:{
            lineStyle:{
              color:'transparent'
            }
          },
          splitLine:{
            lineStyle:{
              color:'rgba(147,173,255,0.5)'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['呼入用户数','未呼入用户数','呼出接通数','呼出未接通数','拨测总数'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6fb9e9',
              fontSize:45
            },
            margin:60
          },
          axisLine:{
            lineStyle:{
              color:'rgba(147,173,255,0.5)'
            }
          }
        },
        series: [
          {
            type: 'bar',
            barWidth:45, 
            itemStyle: {
              normal: {
                  color:'rgba(50,99,187)'
              },
              emphasis: {
                color:'rgba(50,99,187)'
              }
            },
            data: [12,28,15,30,45]
          },
          {
            type: 'bar',
            barWidth:45,
            itemStyle: {
              normal: {
                  color:'rgba(60,198,255)'
              },
              emphasis: {
                color:'rgba(60,198,255)'
              }
            },
            data: [18,10,30,50,20]
          }
        ]
      };
      myChart.setOption(option);
    },
    // getOutCallRank(){
    //   var myChart = this.$echarts.init(this.$refs.outCall_rank);
    //   var category = ['服务器数（台）', '计算容量（核）', '内存容量（GB）', '存储容量（PB）'];
    //   // var barData = [0, ~~(Math.random() * 100), ~~(Math.random() * 100), ~~(Math.random() * 100), ~~(Math.random() * 100)];
    //   var barData = [60, 30, 52, 34, 90];
    //   var lineData = [63, 63, 63, 63, 100]

    //   // console.log(barData)
    //   var option = {
    //       backgroundColor: '#0d073d',//背景色
    //       grid: [{//图形的位置
    //           left: '30%',
    //           bottom: '10%',
    //           top: 3,
    //           right: 30
    //       }],
    //       xAxis: {
    //         show: true,//是否展示X轴
    //         axisLabel: {
    //         show: true,
    //         textStyle: {
    //           color: '#6fb9e9',
    //           fontSize:45
    //         },
    //         margin:40
    //       },
    //       axisLine:{
    //         lineStyle:{
    //           color:'transparent'
    //         }
    //       },
    //       splitLine:{
    //         lineStyle:{
    //           color:'rgba(147,173,255,0.5)'
    //         }
    //       }
    //       },
    //       yAxis: {
    //           data: category,
    //           show: true,
    //           axisLabel: {
    //               inside: true,
    //               verticalAlign: 'middle',
    //               lineHeight: 150,
    //               color: '#4488bc',
    //               fontSize: 8
    //           },
    //           axisLine: {
    //               show: false//不展示刻度
    //           },
    //           axisLabel: {
    //             show: true,
    //             textStyle: {
    //               color: '#6fb9e9',
    //               fontSize:45
    //             },
    //             margin:60
    //           },
    //           axisLine:{
    //             lineStyle:{
    //               color:'rgba(147,173,255,0.5)'
    //             }
    //           }
    //       },
    //       series: [
              

    //           { // 下层块
    //               name: '',
    //               type: 'pictorialBar',
    //               symbol: 'roundRect',
    //               barWidth: '3%',
    //               barMaxWidth: '20%',
    //               symbolOffset: [75, 0],
    //               itemStyle: {
    //                 normal: {
    //                   color: '#1F4683'
    //                 }
    //               },
    //               z: -11,
    //               symbolRepeat: true,
    //               symbolSize: [6, 16],
    //               data: lineData,
    //               barGap: 50,
    //               barCategoryGap: 0,
    //               animationEasing: 'elasticOut',

    //           },

    //           { // 上层块
    //             name: '', // blue bar
    //             type: 'pictorialBar',
    //             symbol: 'roundRect',
    //             barWidth: '3%',
    //             barMaxWidth: 100,
    //             symbolOffset: [75, 0],
    //             itemStyle: {
    //               normal: {
    //                   barMaxWidth: '20%',
    //                   barBorderRadius: 100,
    //                   color: '#6DE8FA',

    //               }
    //             },
    //             symbolRepeat: true,
    //             symbolSize: [6, 16],
    //             // symbolClip: true,
    //             data: barData,
    //           },
    //           /* 
    //           */

    //       ],

    //   }
    //   myChart.setOption(option);
    // },
    getOutCallRank(){
      var myChart = this.$echarts.init(this.$refs.outCall_rank);
      let symbols = [
        'path://M692.885,352.268a39.6,39.6,0,1,0,39.6-39.864,39.73,39.73,0,0,0-39.6,39.864h0Zm0,0M785.343,405.7h-104.7a18.239,18.239,0,0,0-18.3,16.342V570.068c0,7.11,5.214,12.885,12.307,12.885A12.878,12.878,0,0,0,687.5,570.068V448.8a1.824,1.824,0,0,1,1.411-1.809,1.742,1.742,0,0,1,2,1.69V744.667c0,10.725,8.308,19.88,19.011,20.233a19.776,19.776,0,0,0,20.461-19.761V580.321a2.181,2.181,0,0,1,4.311,0V744.746c0,10.725,8.309,19.879,19.012,20.232a19.775,19.775,0,0,0,20.461-19.761V448.6a1.659,1.659,0,0,1,1.645-1.651h0.158a1.659,1.659,0,0,1,1.647,1.651V570.028a12.877,12.877,0,0,0,12.856,12.885,13.149,13.149,0,0,0,13.17-12.885V422.046A18.212,18.212,0,0,0,785.343,405.7h0Zm0,0" transform="translate(-662.344 -312.406)"'
      ];
      var bodyMax = 123;

      var labelSetting = {
        normal: {
          show: true,
          position: 'outside',
          offset: [10, 370],
          formatter: function (param) {
            // return (param.value / bodyMax * 100).toFixed(0) + '%';
            return param.value;
          },
          textStyle: {
            fontSize: 45,
            fontFamily: 'Arial',
            color:'#6fb9e9'
          }
        }
      };
      let option = {
        tooltip: {
          show:false
        },
        // dataZoom:[
        //   {
        //     type: 'slider',
        //     show: true,
        //     start: 1,
        //     end: 100
        //   },
        // ],
        xAxis: {
            data: ['许鹏','王丹丹','邢岩青','宋洋洋','赵振辉'],
            axisTick: {show: false},
            // axisLine: {show: false},
            // axisLabel: {show: false}
            axisLabel: {
              show: true,
              textStyle: {
                color: '#6fb9e9',
                fontSize:45
              },
              margin:50
            },
            axisLine:{
              show:false,
              lineStyle:{
                color:'rgba(147,173,255,0.5)'
              }
            },
        },
        yAxis: {
            max: bodyMax,
            // splitLine: {show: false},
            axisTick: {show: false},
            axisLine:{
              show:false
            },
            max:bodyMax,
            axisLabel: {
              show: false,
              textStyle: {
                color: '#6fb9e9',
                fontSize:45
              },
              margin:30
            },
            splitLine:{
              show:false,
              lineStyle:{
                color:'rgba(147,173,255,0.5)'
              }
            }
        },
        grid: {
          top: '620',
          height: 320,
          left:'0',
          right:'20'
        },
        markLine: {     
          z: -100
        },
        series: [{
          symbolSize:[1200,1200],
          name: 'typeA',
          type: 'pictorialBar',
          symbolClip: true,
          symbolBoundingData: bodyMax,
          label: labelSetting,
          symbolOffset:['-460',0],
          itemStyle: {
            normal: {
              color: '#0978BD'
            }
          },
          data: [{
            value: 123,
            symbol: symbols[0],
            itemStyle:{
              color:'#3cc6ff'
            }
          }, {
            value: 114,
            symbol: symbols[0],
            itemStyle:{
              color:'#5289dd'
            }
          }, {
            value: 91,
            symbol: symbols[0],
            itemStyle:{
              color:'#3263bb'
            }
          }, {
            value: 79,
            symbol: symbols[0],
            itemStyle:{
              color:'#6fb9e9'
            }
          }, {
            value: 52,
            symbol: symbols[0],
            itemStyle:{
              color:'#367bd9'
            }
          }],
          z: 10
        },
        {
          symbolSize:[1200,1200],
          name: 'full',
          type: 'pictorialBar',
          symbolBoundingData: bodyMax,
          animationDuration: 0,
          symbolOffset:['-460',0],
          itemStyle: {
            normal: {
                color: 'rgba(255,255,255,0.1)'
            }
          },
          data: [{
            value: 1,
            symbol: symbols[0]
          }, {
            value: 1,
            symbol: symbols[0]
          }, {
            value: 1,
            symbol: symbols[0]
          }, {
            value: 1,
            symbol: symbols[0]
          }, {
            value: 1,
            symbol: symbols[0]
          }]
        }]
      };
      myChart.setOption(option);
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: '微软雅黑';
  /* 去除鼠标点击标签出现的的默认蓝框 */
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
#bigScreen {
  width:7680px;
  height:3240px;
  box-sizing: border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  /* border: 1px solid red; */
  background: url('./../assets/image/big_bac.jpg') no-repeat;
  background-size: 100% 100%;
}
/*----------------------------   头部模块样式 ------------------------------*/
.header {
  height: 410px;
}
.header .header_left,.header .header_middle,.header .header_right {
  float: left;
  text-align: center;
}
.header .header_left,.header .header_right {
  width: 2318px;
  /* border:1px solid red; */
  height: 174px;
  margin-top: 138px;
  background: url('./../assets/image/num_bac.png') no-repeat;
  background-size: 100% 100%;
  display: inline-block;
}
.header .header_left{
  margin-left: 584px;
}
/* header里面左右两块的框样式 */
.header .callWord {
  font-size: 60px;
  color: rgba(255,255,255,0.7);
  vertical-align: top;
  line-height: 174px;
}
.header .callNum {
  width: 112px;
  height: 114px;
  font-size: 80px;
  color:#78d6fd;
  line-height: 114px;
  border: 2px solid #5273a7;
  background: rgba(9,17,41,0.5);
  display: inline-block;
  position: relative;
  top: 30px;
  margin:0 30px 0 0;
  /* 解决display:inline-block引起的有内容和没内容时的头部对齐和底部对齐 */
  vertical-align: middle;
}
/* header里边的中间部分样式 */
.header .header_middle {
  width:1865px;
  margin-top:240px;
}
.header .header_middle>input {
  font-size: 80px;
  color: #d93875;
  width:254px;
  height: 90px;
  text-align: center;
  border: 2px solid #5273a7;
  background: rgba(9,17,41,0.5);
  outline: none;
  margin:0 40px;
  cursor: default;
}
.header .header_middle>span {
  color: rgba(255,255,255,0.7);
  font-size: 60px;
  display: inline-block;
  line-height: 60px;
  position: relative;
  top: -10px;
}
/*----------------------------   中间模块样式 ------------------------------*/
.main {
  height: 1415px;
}
.main .first,.main .second,.main .third,.main .fourth,.footer .first,.footer .second,.footer .third,.footer .fourth {
  float: left;
  width: 1664px;
  text-align: center;
} 
.main .first,.footer .first {
  margin:0 354px 0 130px;
  /* width: 1600px; */
}
.main .second,.footer .second {
  /* width: 1664px; */
  padding-top: 72px;
}
.main .second .table {
  padding:64px 0 114px;
}
.main .second .table .table_list {
  width:1664px;box-sizing:border-box;padding-left:60px;height:134px;line-height: 134px;font-size:55px;display:inline-block;background: rgba(77,186,243,0.2);border-radius: 67px;margin-bottom:28px;
}
.main .second .table .table_list>img:nth-child(1) {
  margin:-10px 0 0 -40px;vertical-align:middle;
}
.main .second .table .table_list>span:nth-child(2) {
  color:#6fb9e9;display:inline-block;font-size:45px;width:260px;
}
.main .second .table .table_list>span:nth-child(3) {
  color:#78d6fd;display:inline-block;width:420px;
}
.main .second .table .table_list>span:nth-child(4) {
  color:#78d6fd;display:inline-block;width:420px;
}
.main .second .table .table_list>span:nth-child(5) {
  color:#78d6fd;display:inline-block;width:420px;
}
.main .third,.footer .third {
  /* width: 1664px; */
  /* margin: 0 312px 0 192px; */
  margin: 0 250px 0 192px;
  padding-top: 72px;
}
.main .fourth,.footer .fourth{
  /* width: 1664px; */
}
/*----------------------------   底部模块样式 ------------------------------*/
.footer {
  /* height: 1248px; */
  /* border:1px solid red; */
  overflow: hidden;
}


/* 公共样式 */
.title {
  font-size:55px;
  color:#78d6fd; 
  position: relative;
  height: 150px;
}
.title .title_bac {
  position: absolute;
  top: 100px;
  left: 20%;
}

.legend .legend_left {
  display: inline-block;
  width: 45px;
  height: 45px;
  margin-right: 20px;
  position: relative;
  top: 5px;
}
.legend .legend_right {
  font-size: 45px;
  color: #6fb9e9;
  margin-right:150px;
}
</style>

