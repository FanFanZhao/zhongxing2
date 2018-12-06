<template>
    <div class="indexBlackes">
        <!-- <div class="banneres">
            <div class="content ">
                <h1>区块链数字资产交易平台</h1>
                <p class="introduce">安全&nbsp;&nbsp;&nbsp;公正&nbsp;&nbsp;&nbsp;高效&nbsp;&nbsp;&nbsp;不可篡改</p>
                <div class="QRCode"><img src="@/assets/images/code.png"></div>
                <p class="kefu">手机下载二维码</p>
            </div>
        </div> -->
        <!-- <home-login></home-login> -->
        <!-- <home-login></home-login> -->
        <div class="swiper-container banner_wrap swiper-container-horizontal">
            <div class="swiper-wrapper">
               <div class="swiper-slide sliders">
                   <a href="">
                   <img src="../../static/imgs/banner01.png" />
                   </a>
               </div>
               <div class="swiper-slide sliders">
                   <a href="">
                   <img src="../../static/imgs/banner00.jpg" />
                   </a>
               </div>
            </div>
             <div class="swiper-pagination swiper-pagination02"></div>
        </div>
        <!-- <div class="carousel">
            <div class="swiper-container swiper-container01 swiper-container-horizontal">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" :class="{active:index==curSwiper}" v-for="(item ,index) in swiperList" style="width: 232px; margin-right: 10px;" @mouseover="mouseEnter(index)">
                        <p class="name">{{item.symbol}}</p>
                        <p class="last">{{item.quotes.USD.price}}</p>
                        <p class="range" :class="{red:item.quotes.USD.percent_change_24h>=0}">
                            <i class="iconfont icon-u-arrow3-loss" v-if="item.quotes.USD.percent_change_24h<0"></i>
                            <i class="iconfont icon-u-arrow3-right" v-else></i>
                            {{item.quotes.USD.percent_change_24h}}%
                        </p>
                    </div>
                </div>   
                <div class="swiper-pagination01"></div>
            </div>
            <div slot="button-prev" class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"></div>
            <div slot="button-next" class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide"></div>
        </div> -->
      <div style="background:#fff!important;color:#333!important">

     
        <div class="notice">
           <ul class="flex alcenter center notice_ul">
               <li v-for="item in noticeList" :key="item.id" class="fl notice_li"><a class="notice_a ft14" :data-id='item.id'>{{item.name}}</a></li>
           </ul>
        </div>
        <!-- <div class="active-data clearfix">
            <div class="data high">
                <div class="name">最高价</div>
                <div class="content">{{coinKline.hight}}</div>
            </div>
            <div class="data high">
                <div class="name">最低价</div>
                <div class="content">{{coinKline.low}}</div>
            </div>
             <div class="data high">
                <div class="name">开盘价</div>
                <div class="content">{{coinKline.open}}</div>
            </div>
            <div class="data high">
                <div class="name">收盘价</div>
                <div class="content">{{coinKline.close}}</div>
            </div>
            <div class="data range">
                <div class="name">涨跌幅</div>
                <div class="content">-{{Math.floor(((coinKline.close-coinKline.open)/coinKline.open) * 100)/100 || 0}}%</div>
            </div>
            <div class="data vol">
                <div class="name">成交量</div>
                <div class="content">{{coinKline.volume}}</div>
            </div>
            <div class="time">24H</div>
        </div> -->
        <!-- <div id="chart" _echarts_instance_="ec_1533699609264" style="width: 100%; height: 320px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;">
            
        </div> -->
          <div class="coin-tab">
            <ul class="coins">
              <li v-for="(coin,index) in quotation" :key="index" @click="nowCoin = coin.name" :class="{activeCoin:nowCoin == coin.name}">对{{coin.name}}交易区<span class='' v-if="nowCoin == coin.name"></span></li>
            </ul>
          </div>
        <div class="coins-list">
          <div class="list-title">
            <span>币种对{{nowCoin}}</span>
            <span>价格({{nowCoin}})</span>
             <span>涨跌</span>
              <span>最高价</span>
               <span>最低价</span>
            <span>交易量({{nowCoin}})</span>
            
            <!-- <span>操作</span> -->
          </div>
          
          <ul class="list-con scroll" v-for="(item,index) in quotation" :key="index" v-if="nowCoin == item.name">
            <li v-for="(li,inde) in item.quotation" :key="inde" :data-name='li.currency_name+"/"+li.legal_name'>
              <div class="two-coin">
                <img :src="li.logo" alt="" style="width:30px;">
                <span style="font-weight:bold"><span class="high_blue">{{li.currency_name}}</span><span class="low_blue">/{{li.legal_name}}</span></span>
              </div>
              <div class="yester">
                <!-- <span :class="setColor(li.change)">{{li.now_price==null?'0':li.now_price}}</span>/ -->
                <span class="high_blue bold">{{li.now_price==null?'0':li.now_price}}</span>
              </div>
              <div class="yes-toa">
                <!-- <span :class="setColor(li.last_price,li.yesterday_last_price)">{{li.change == null?'+0.000':li.change}}%</span> -->
                <span :class="setColor(li.change)" class="bold">{{(li.change>0?'+':'')+(li.change-0).toFixed(2)}}%</span>
              </div>
              <div>
                <span class="high_blue bold">{{li.high_price}}</span>
              </div>
              <div>
                <span class="high_blue bold">{{li.low_price}}</span>
              </div>
              <div class="count high_blue bold">{{li.volume == null?'0':li.volume}}</div>
              
              <!-- <div>
                <span @click="setData({currency_id:item.id,legal_id:li.currency_id,currency_name:item.name,leg_name:li.name,isShow:index})">交易 </span>
              </div> -->
            </li>
          </ul>
        </div>
        <div class="coinTable" style='display:none'>
            <div class="tabhang">
                <div class="tabul">
                    <ul class="clearfix">
                        <li :class="{active:index==curCoinTab}" v-for="(tab,index) in quotation" :key="index" @click="getCurrent(index)" >{{tab.name}}</li> 
                    </ul>
                </div>
                <div class="tabtable">
                    <ul class="table-nav">
                        <div class="nav_left">
                        <li style="width:220px;text-align:left;">交易市场</li>
                        <!-- <li>最新成交价</li>
                        <li>涨跌</li> -->
                        <li style="width:220px;text-align:center;">最高价 ( 24h )</li>
                        <li style="width:220px;text-align:center;">最低价 ( 24h )</li>
                        <li style="width:220px;text-align:center;">最新价</li>
                        <!-- <li>成交量</li> -->
                        </div>
                        <li class="last tc fr">操作</li>
                    </ul>
                    <div class="scroll list-list">
                      <ul class="content" v-for="(coin,index) in coin_list">
                          <div class="con_left">
                          <li class="hovertd" style="width:220px;text-align:left;">
                              <i class="iconfont icon-BTCUSDT-copy" style="float:initial;"></i>
                              <!-- <span class="hover">{{coin.symbol}}</span><br> -->
                              <span>{{coin.name}}</span>
                          </li>
                          <!-- <li> -->
                              <!-- <span >¥ {{coin.quotes.USD.price}}</span> -->
                              <!-- <span>{{coin.name}}</span> -->
                              <!-- / ¥ {{coin.quotes.USD.price}} -->
                              <!-- <i class="iconfont icon-arrow-down"></i> -->
                          <!-- </li> -->
                          <li style="width:220px;text-align:center;">{{coin.min_price}}</li>
                          <li style="width:220px;text-align:center;">{{coin.max_price}}</li>
                          <li style="width:220px;text-align:center;">{{coin.new_price}}≈0.00CNY</li>
                          <!-- <li class="red" :class="{green:coin.quotes.USD.percent_change_24h.toString().substr(0, 1)=='-'}">
                              <i v-if="coin.quotes.USD.percent_change_24h.toString().substr(0, 1)=='-'" class="iconfont icon-arrow-down"></i>
                              <i v-else class="iconfont icon-arrow-up"></i>
                              {{coin.quotes.USD.percent_change_24h}}%
                              </li> -->
                          <!-- <li>{{coin.highest}}</li>
                          <li>{{coin.lowest}}</li> -->
                          <!-- <li>{{coin.total_supply}}</li> -->
                          </div>
                          <li class="last fr">
                              <a class="baseColor">充币</a>
                              <a class="baseColor withdraw">提币</a>
                              <a class="baseColor">兑换</a>
                              <!-- <button>交易</button> -->
                          </li>
                      </ul>
                    </div>
                    
                </div>
            </div>
        </div>
        <!--图文内容-->
        <div id="content01" class="content01 flex alcenter   center" style="background:#fff;">
            <div class="text01 mr100 left01 animated">
              <h1 class="ft26 bold mb30">全球化的数字资产配置及交易服务</h1>
              <p class="ft16 bold mb10">遍布全球的项目拓展及运营管理体系</p>
               <p class="ft16 bold mb10">在多个国家设有本地交易服务中心</p>
                <p class="ft16 bold mb10">服务超过130个国家的数百万用户</p>
            </div>
            <img class="imgs01" src="../assets/images/imgs01.png" />
        </div>
        <div class="content01 flex alcenter center ">
          <img class="imgs02" src="../assets/images/imgs02.png" />
            <div class="text01 ml100">
              <h1 class="ft26 bold mb30">SMART-Chain资产评估模型</h1>
              <p class="ft16 bold mb10">独立专业的区块链资产研究评估体系</p>
               <p class="ft16 bold mb10">长期跟踪产业链并提供最权威中立的资产分析</p>
                <p class="ft16 bold mb10">一站式的项目进度跟踪及信息披露系统</p>
            </div>
            
        </div>
        <div class="content01 flex alcenter grayBg center" style="background:#fff;">
            <div class="text01 mr100">
              <h1 class="ft26 bold mb30">依托4年的数字资产安全风控经验</h1>
              <p class="ft16 bold mb10">安全稳定运营数字资产交易所超过四年</p>
               <p class="ft16 bold mb10">管理资产规模超过10亿美金，服务数百万用户</p>
                <p class="ft16 bold mb10">专业分布式架构和防DDOS攻击系统</p>
                 <p class="ft16 bold mb10">98%数字资产存储多重签名冷钱包</p>
            </div>
            <img class="imgs03" src="../assets/images/imgs03.png" />
        </div>
        <div class="content01 flex alcenter center bg01   ">
          <img class="imgs04" src="../assets/images/imgs04.png" />
            <div class="text01 ml100">
              <h1 class="ft26 bold gray9 mb30">香港  首尔  新加坡  东京</h1>
              <p class="ft16 bold mb10 tr">遍布世界各地的服务中心</p>
            </div>
            
        </div>
        <div class="content01 flex alcenter grayBg center bg02">
            <div class="text01 mr100">
              <h1 class="ft26 bold mb30">多平台终端接入</h1>
              <p class="ft16 bold mb10">覆盖IOS、Android、Windows多个平台，支持全业务功能</p>
            </div>
            <img class="imgs05" src="../assets/images/imgs05.png" />
        </div>
        <!--马上交易-->
        <div class="go_transfer">
           <h1 class="bold ft24 mb30 tc">马上交易</h1>
           <p class="ft14 mb30 tc">注册一个一带一路交易中心账号，开启交易旅程</p>
           <div class="login_register flex alcenter center" v-if="!account_number.length">
             <div class="login_btn mr60 bdr-part" @click="go_login">登录</div>
             <div class="register_btn white" @click="go_register">注册</div>
           </div>
        </div>
        <!--底部-->
        <!-- <div class="foot flex column alcenter grayBg">
           <h1 class="ft18 mb15">一带一路交易中心</h1>
           <p class="ft12 mb30">我/们/在/去/中/心/化/路/上</p>
           <img src="../assets/images/flags.png" />
        </div> -->
        <!-- <div class="bottom">
            <p>温馨提示</p>
            <p>数字资产是创新的投资产品，价格波动较大，具有较高的投资风险，请您投资前 对数字资产充分认知，理性判断自己的投资能力，审慎做出投资决策。</p>
        </div> -->
    </div>
     </div>
</template>


<script>
import "@/assets/style/iconfont2.css";
import "@/assets/style/iconfont.css";
import "@/assets/style/index.css";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import indexHeader from "@/view/indexHeader";
import homeLogin from "@/view/homeLogin";
// var echarts = require("echarts");
export default {
  name: "homeContent",
  components: { indexHeader, homeLogin },
  data() {
    return {
      quotation: [],
      nowCoin: "",
      //   banner_imgs:[
      //       {href:'',img:'../assets/images/bg2.png'},
      //       {href:'',img:'../assets/images/bg2.png'},
      //       {href:'',img:'../assets/images/bg2.png'}
      //   ],
      noticeList:'',
      curSwiper: 0,
      curCoinTab: 0,
      coinTabList: [{ title: "USDT行情" }, { title: "BTC行情" }],
      coinKlineList: [],
      coinKline: {},
      swiperList: [],
      coinList: [],
      coin_list: [],
      account_number:''
    };
  },
  created() {
    // this.init(this.initKline);
    this.account_number = window.localStorage.getItem("accountNum") || "";
    this.getQuotation();
    eventBus.$on('loginSuccess',function(){
       location.reload();
    })
  },
  mounted() {
    var mySwiper = new Swiper(".swiper-container01", {
      // 如果需要分页器
      pagination: ".swiper-pagination01",
      paginationClickable: true,
      // 如果需要前进后退按钮
      slidesPerView: 5,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
    var mySwiper02 = new Swiper(".banner_wrap", {
      // direction: 'vertical',
      loop: true,
      autoplay: 2000,
      // 如果需要分页器
      pagination: ".swiper-pagination02",
      paginationClickable: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
    // this.setChart();
    // this.$http({
    //   url: '/api/' + "news/help",
    //   method: "get",
    //   data: {}
    // })
    //   .then(res => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       this.noticeList = res.data.message;
    //     } else {
    //       layer.msg(res.message);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    //  eventBus.$on('toNew', function (data) {
    //   console.log(data);
    //   if(data){
    //         var newprice=data.newprice;
    //         var cname=data.istoken
    //         console.log(that.currency_name)
    //         console.log(newprice)
    //         $("span[data-name='"+cname+"']").html('$'+newprice);
    //     }
    // });
    this.connect();
   
  },
  methods: {
    
    setData(obj) {
      window.localStorage.setItem("tradeData", JSON.stringify(obj));
      this.$router.push("/dealCenter");
    },
    //登录
    go_login(){
       this.$router.push('/components/login')
    },
    //注册
    go_register(){
       this.$router.push('/components/register')
    },
    connect() {
      var that = this;
      console.log("socket");
      that.$socket.emit("login", this.$makeSocketId());
      that.$socket.on("transaction", msg => {
        console.log(msg);
        var cname = msg.token;
        var yesprice = msg.yesterday;
        var toprice = msg.today;
        console.log(cname);
        var zf = 0;
        if (toprice - yesprice == 0) {
          zf = "0%";
        } else if (toprice == 0) {
          zf = "-100";
        } else if (yesprice) {
          zf = "+100%";
        } else {
          zf = ((toprice - yesprice) / yesprice / 100).toFixed(2);
          if (zf > 0) {
            zf = "+" + zf + "%";
          } else {
            zf = zf + "%";
          }
        }
        var zf = toprice - yesprice;
        $("li[data-name='" + cname + "']")
          .find(".yester span")
          .html(yesprice);
        $("li[data-name='" + cname + "']")
          .find(".today span")
          .html(toprice);
        $("li[data-name='" + cname + "']")
          .find(".yes-toa span")
          .html(zf);
      });
    },
    setColor(c) {
      if (c > 0) {
        return "ceilColor";
      } else if (c < 0) {
        return "redColor";
      } else {
        return "";
      }
    },
    getQuotation() {
      this.$http({
        url: "/api/currency/quotation",
        method: "get"
      }).then(res => {
        console.log(res.data);
        if (res.data.type == "ok" && res.data.message.length != 0) {
          this.quotation = res.data.message;
          this.nowCoin = this.quotation[0].name;
          let msg = res.data.message[0];
          let quo = msg.quotation[0];
          var tradeData = {
            currency_id: quo.currency_id,
            legal_id: quo.legal_id,
            currency_name: quo.currency_name,
            legal_name: quo.legal_name,
            isShow:0
          };
          if(!window.localStorage.getItem('tradeData')){
             window.localStorage.setItem('tradeData',JSON.stringify(tradeData))
          }
        }
      });
    },
    getCurrent(index) {
      this.curCoinTab = index;
    },
    mouseEnter(index) {
      this.curSwiper = index;
    },
    init(callback) {
      this.$http.post('/api/' + "quotation").then(res => {
        if (res.data.type == "ok") {
          this.coinList = res.data.message.coin_list;
          this.swiperList = res.data.message.coin_list;
          callback && callback();
        } else {
          // layer.msg(res.message);
        }
      });
    },
    initKline() {
      this.$http.post('/api/' + "historical_data").then(res => {
        if (res.data.type == "ok") {
          if (res.data.message.day.length > 0) {
            this.coinKline = res.data.message.day[0].data;
            this.coinKlineList = res.data.message.day;
          }
          console.log(res.data.message.day[0].data);
          console.log(res.data.message.day);
        }
      });
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      let Y = date.getFullYear() + "/";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      let D = date.getDate() + " ";
      return Y + M + D;
    },

    setChart() {
      var myChart = echarts.init(document.getElementById("chart"));
      var that = this;
      // 指定图表的配置项和数据
      var base = 2;
      var date = [];
      var data = [1, 2, 4, 5, 6, 7, 8];
      var now = new Date();
      console.log(that.coinKlineList);
      for (var i in that.coinKlineList) {
        let temp = that.timestampToTime(that.coinKlineList[i].timestamp);
        console.log(temp);
        date.push(temp);
      }
      console.log(date);
      var option = {
        textStyle: {
          color: "#d45858"
        },
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#fff"
            }
          }
        },
        title: {
          left: "center",
          text: "24小时数据图"
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "5%",
          containLabel: true
        },
        toolbox: {
          feature: {
            // dataZoom: {
            //     yAxisIndex: 'none'
            // },
            // restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
          color: ["#ff9232"]
        },

        yAxis: {
          type: "value",
          yaxisLabel: {
            backgroundColor: "#fff"
          }
        },
        series: [
          {
            name: "当前价格",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              normal: {
                // 6e446e
                color: "#6e446e"
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#6e446e"
                  },
                  {
                    offset: 1,
                    color: "#1e1e2a"
                  }
                ])
              }
            },

            data: data
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
    // go_detail(index,inde){
    //   this.$router.push({
    //     path:'/dealCenter',
    //     name:'dealCenter',
    //     params:{
    //       legal_index:index,
    //       currency_index:inde
    //     }
    //   })
    // }
  }
};
</script>
<style lang='scss' scoped>

.swiper-container {
  // height: 310px;
}
.swiper-container a {
  display: block;
  // height: 310px;
}
.swiper-container img {
  display: block;
  // margin-top: -50px;
  // height: 310px;
}
.coin-tab {
  max-width: 90%;
  margin: 0 auto;
  line-height: 52px;
  height: 52px;
  background: #563BD1;
  // color: #c7cce6;
  display: flex;
  > ul {
    max-width: 90%;
    display: flex;
    li {
      padding: 0 40px;
      color: #ddd;
      border-bottom: 1px solid #fff;
      border-right: 1px solid #fff;
      // box-shadow: 0 0 1px hsla(231, 9%, 54%, 0.2);
    }
    .activeCoin {
      border-bottom: none;
      // color: #d45858;
    }
  }
}
/* 币种列表 */
.coins-list {
  margin: 10px auto;
  max-width: 90%;
  line-height: 51px;
  text-align: center;
  margin-top: 0;

  .list-title {
    display: flex;
    padding: 0 30px;
    background: #563BD1;
    > span {
      flex: 1;

      text-align: center;
      // color: #c7cce6;
      font-size: 14px;
      color: #fff;
    }
    > span:first-child {
      text-align: left;
    }
    > span:last-child {
      text-align: right;
    }
  }
  .list-con {
    background: #F0F0F0;
    max-height: 400px;
    overflow: scroll;
    border:1px solid #563BD1;
    border-top: none;

    li {
      display: flex;
      // border-top: 1px solid #ddd;
      padding: 10px 30px;
      line-height: 30px;
      // color: #c7cce6;
      .high_blue{
          color:#563BD1; 
        }
        .low_blue{
          color: #8D75F7;
        }
      img{
        vertical-align: bottom;
      }
      > div {
        flex: 1;
        text-align: center;
        
      }
      > div:first-child {
        text-align: left;
      }
      > div:last-child {
        text-align: right;
      }
    }
    li:last-child{
      // border-bottom: 1px solid #ddd;
    }
  }
}
.carousel .swiper-slide:hover {
  background-color: #327add;
}
.nav_left,
.con_left {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.withdraw {
  margin: 0 4px;
}
.carousel .last a:hover {
  cursor: pointer;
}
.sliders {
  width: 100%;
}
.sliders img {
  width: 100%;
  // height: 500px;
}
.notice_ul {
  padding: 25px 0;
  // background: #161923;
  margin-bottom: 5px;
}
.notice_li {
  // flex: 1;
  
  text-align: center;
}
.notice_li a{
   padding: 0 25px;
   letter-spacing: 5px;
}
.notice_li::after {
  content: "/";
  float: right;
}
.notice_li:last-child:after {
  content: "";
  color: #6b80ae;
}
.notice_a:hover {
  color: #563BD1;
  cursor: pointer;
}
.coins li {
  position: relative;
}
.arrow {
  border-width: 16px;
  border-right: 8px solid transparent;
  border-left: 8px solid transparent;
  border-top: none;
  border-bottom: 8px dashed;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -4px;
}
.coins li:hover {
  cursor: pointer;
  // background: #303e4c;
}
.content01{
  padding: 40px 0;
  background: #f3f3f3;
  .imgs01{
      width: 250px;
  }
  .imgs02{
    width: 500px;
  }
  .imgs03{
    width: 300px;
  }
  .imgs04{
    width: 500px;
  }
  .imgs05{
    width: 150px;
  }
}
.bg01{
  background: url('../assets/images/content_bg01.png') center no-repeat;
  width: 100%;
  // height: 300px;
  background-size: cover;
  padding: 150px 0;
}
.bg02{
  background: url('../assets/images/content_bg02.png') center no-repeat;
  width: 100%;
  background-size: cover;
}
.login_btn{
  padding: 15px 80px;
  border:1px solid rgba(0,0,0,1);
  border-radius:5px;
  cursor: pointer;
}
.register_btn{
  padding: 15px 80px;
  background:#563BD1;
  border-radius:5px;
  cursor: pointer;
}
.go_transfer{
  padding: 50px 0;
}
.foot{
  padding: 50px 0;
}
</style>


