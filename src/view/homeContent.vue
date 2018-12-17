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
               <div class="swiper-slide sliders" v-for="(item,index) in pics" :key="index">
                   <img :src="item.pic" alt="">
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
               <li v-for="item in noticeList" :key="item.id" class="fl notice_li" @click="$router.push({path:'components/noticeDetail',query:{id:item.id}})"><a class="notice_a ft14" :data-id='item.id'>{{item.title}}</a></li>
           </ul>
        </div>
      
          <div class="coin-tab">
            <ul class="coins">
              <li v-for="(coin,index) in quotation" :key="index" @click="nowCoin = coin.name" :class="{activeCoin:nowCoin == coin.name}">{{$t('home.with')}}{{coin.name}}  {{$t('home.markets')}}<span class='' v-if="nowCoin == coin.name"></span></li>
              <li :class="{activeCoin:nowCoin == '自选'}" @click="nowCoin ='自选'">{{$t('home.myMarkets')}}</li>
            </ul>
          </div>
        <div class="coins-list">
          <div class="list-title">
            <span>{{$t('home.pair')}}</span>
            <span>{{$t('home.price')}}({{nowCoin}})</span>
             <span>{{$t('home.change')}}</span>
              <span>{{$t('home.high')}}</span>
               <span>{{$t('home.min')}}</span>
            <span>{{$t('home.volume')}}</span>
            
            <span>{{$t('home.trade')}}</span>
          </div>
          
          <ul class="list-con scroll" v-for="(item,index) in quotation" :key="index">
            <li v-for="(li,inde) in item.quotation" :key="inde" :data-name='li.currency_id+"/"+li.legal_id' v-if="(li.added&&nowCoin == $t('home.myMarkets')) ||li.legal_name == nowCoin">
              <div class="two-coin">
                <img :src="li.logo" alt="" style="width:30px;">
                <span style="font-weight:bold"><span class="">{{li.currency_name}}</span><span class="gray">/{{li.legal_name}}</span></span>
              </div>
              <div class="yester">
                <!-- <span :class="setColor(li.change)">{{li.now_price==null?'0':li.now_price}}</span>/ -->
                <span class=" bold">{{li.now_price==null?'0':li.now_price}}</span>
              </div>
              <div class="yes-toa">
                <!-- <span :class="setColor(li.last_price,li.yesterday_last_price)">{{li.change == null?'+0.000':li.change}}%</span> -->
                <span :class="setColor(li.change)" class="bold change">{{(li.change>0?'+':'')+(li.change-0).toFixed(2)}}%</span>
              </div>
              <div>
                <span class=" bold high_price">{{li.high_price}}</span>
              </div>
              <div>
                <span class=" bold low_price">{{li.low_price}}</span>
              </div>
              <div class="count  bold volume">{{li.volume == null?'0':li.volume}}</div>
              <div class=""  style="color:#194B64;">
                <span class=" fr el-icon-star-on" v-if="li.added" @click="addDelete('delete',li.currency_match_id)" style="line-height:30px;margin-left:20px"></span>
                <span class=" fr el-icon-star-off" v-if="!li.added" style="line-height:30px;margin-left:20px" @click="addDelete('add',li.currency_match_id)"></span>
                <span class="fr" @click="setCurrent(index,inde)">{{$t('home.toTrade')}}</span>
                <!-- <span :hah='testMy(li.currency_id,li.legal_id)'>{{li.currency_id +''+li.legal_id}}</span> -->
              </div>
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
        <div id="content01" class="content01 flex alcenter   center" style="background:#f3f3f3;padding:50px 0;">
            <div class="text01 mr100 left01 animated">
              <h1 class="ft26 bold mb30">{{$t('home.c1')}}</h1>
              <p class="ft16 bold mb10">{{$t('home.c2')}}</p>
               <p class="ft16 bold mb10">{{$t('home.c3')}}</p>
                <p class="ft16 bold mb10">{{$t('home.c4')}}</p>
            </div>
            <img class="imgs01" src="../assets/images/imgs01.png" />
        </div>
        <div class="content01 flex alcenter center ">
          <img class="imgs02" src="../assets/images/imgs02.png" />
            <div class="text01 ml100">
              <h1 class="ft26 bold mb30">{{$t('home.c5')}}</h1>
              <p class="ft16 bold mb10">{{$t('home.c6')}}</p>
               <p class="ft16 bold mb10">{{$t('home.c7')}}</p>
                <p class="ft16 bold mb10">{{$t('home.c8')}}</p>
            </div>
            
        </div>
        <div class="content01 flex alcenter grayBg center" style="background:#f3f3f3;">
            <div class="text01 mr100">
              <h1 class="ft26 bold mb30">{{$t('home.c9')}}</h1>
              <p class="ft16 bold mb10">{{$t('home.c10')}}</p>
               <p class="ft16 bold mb10">{{$t('home.c11')}}</p>
                <p class="ft16 bold mb10">{{$t('home.c12')}}</p>
                 <p class="ft16 bold mb10">{{$t('home.c13')}}</p>
            </div>
            <img class="imgs03" src="../assets/images/imgs03.png" />
        </div>
        <div class="content01 flex alcenter center bg01   ">
          <img class="imgs04" src="../assets/images/imgs04.png" />
            <div class="text01 ml100">
              <h1 class="ft26 bold gray9 mb30">{{$t('home.c14')}}</h1>
              <p class="ft16 bold mb10 tr">{{$t('home.c15')}}</p>
            </div>
            
        </div>
        <div class="content01 flex alcenter grayBg center bg02">
            <div class="text01 mr100">
              <h1 class="ft26 bold mb30">{{$t('home.access')}}</h1>
              <p class="ft16 bold mb10">{{$t('home.cover')}}</p>
            </div>
            <img class="imgs05" src="../assets/images/imgs06.png" />
        </div>
        <!--马上交易-->
        <div class="go_transfer">
           <h1 class="bold ft24 mb30 tc">{{$t('home.c16')}}</h1>
           <p class="ft14 mb30 tc">{{$t('home.c17')}}</p>
           <div class="login_register flex alcenter center" v-if="!account_number.length">
             <div class="login_btn mr60 bdr-part" @click="go_login">{{$t('logins')}}</div>
             <div class="register_btn white blue_bg" @click="go_register">{{$t('registers')}}</div>
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
      pics:[],
      quotation: [],
      nowCoin: "",
      //   banner_imgs:[
      //       {href:'',img:'../assets/images/bg2.png'},
      //       {href:'',img:'../assets/images/bg2.png'},
      //       {href:'',img:'../assets/images/bg2.png'}
      //   ],
      noticeList: "",
      curSwiper: 0,
      curCoinTab: 0,
      coinTabList: [{ title: "USDT行情" }, { title: "BTC行情" }],
      coinKlineList: [],
      coinKline: {},
      swiperList: [],
      coinList: [],
      coin_list: [],
      account_number: "",
      token:'',
      myAdd:[]
    };
  },
  created() {
    // this.getMyAdd();
    // this.init(this.initKline);
    this.token = window.localStorage.getItem('token') || '';
    if(this.token){
      this.getMyAdd()
    } else {
      this.getQuotation()
    }
    this.account_number = window.localStorage.getItem("accountNum") || "";
    
    eventBus.$on("loginSuccess", function() {
      location.reload();
    });
  },
  mounted() {
    this.getSwiper();
    
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
    
    // this.setChart();
    this.$http({
      url: '/api/' + "news/list",
      method: "post",
      data: {
        language:this.$i18n.locale == 'zh'?1:2,
        c_id:21
      }
    })
      .then(res => {
        console.log(res);
        if (res.data.type == 'ok') {
          var list = res.data.message.list;
          this.noticeList = list;
          // if(list.length>4){

          //   this.noticeList = list.slice(0,4)
          // } else {
          //   this.noticeList = list;
          // }
        }
      })
     
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
    getMyAdd(){
      if(this.token){

        this.$http({
        url:'/api/user_match/list',
       
        headers: { Authorization: this.token}
      }).then(res => {
        if(res.data.type == 'ok'){
          var list = res.data.message;
            this.myAdd = list;
            
            this.getQuotation();
        }
      })
      } else {
        if(this.$i18n.locale == 'zh'){

          layer.msg('请先登录') 
        } else {
          layer.msg('Please sign in')
        }
      }
    },
    testMy(c,l){
      if(this.myAdd.length){
        var cid  = c;
        var lid = l;
        var s = this.myAdd.filter(function(item){
          return (item.currencyId == cid&&item.legalId == lid);
        })
        if(s.length){
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    addDelete(url,id){
      if(this.token){

          this.$http({
          url:'/api/user_match/'+url,
          method:'post',
          data:{id:id},
          headers: { Authorization: this.token}
        }).then(res => {
          layer.msg(res.data.message);
          this.getMyAdd()
        })
      } else {
        layer.msg('请先登录')
      }
    },
    getSwiper(){
      var url = this.$i18n.locale == 'zh'?'/api/news/pcPic':'/api/news/pcEngPic'
      this.$http({
        url:url
      }).then(res => {
        console.log(res);
        this.pics = res.data.message;
        var mySwiper02 = new Swiper(".banner_wrap", {
      // direction: 'vertical',
      loop: true,
      autoplay: 2000,
      autoplayDisableOnInteraction:false, //用户操作swiper之后自动切换不会停止
      // 如果需要分页器
      pagination: ".swiper-pagination02",
      paginationClickable: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
      })
    },
    setData(obj) {
      window.localStorage.setItem("tradeData", JSON.stringify(obj));
      this.$router.push("/dealCenter");
    },
    //登录
    go_login() {
      this.$router.push("/components/login");
    },
    //注册
    go_register() {
      this.$router.push("/components/register");
    },
    connect() {
      var that = this;
      console.log("socket");
      that.$socket.emit("login", this.$makeSocketId());
      that.$socket.on("daymarket", msg => {
        console.log(msg);
        var cname = msg.currency_id+'/'+msg.legal_id;
        var now_price = msg.now_price;
        var change = (msg.change-0).toFixed(2);
        if(change<0){
          $("li[data-name='" + cname + "']")
          .find(".yes-toa span")
          .css("color", "#ff6e42")
          .html(change+'%');
        }else{
          $("li[data-name='" + cname + "']")
          .find(".yes-toa span")
          .css("color", "#459e80")
          .html('+'+change+'%');
        }
        console.log(cname);
        // var zf = 0;
        // if (toprice - yesprice == 0) {
        //   zf = "0%";
        // } else if (toprice == 0) {
        //   zf = "-100";
        // } else if (yesprice) {
        //   zf = "+100%";
        // } else {
        //   zf = ((toprice - yesprice) / yesprice / 100).toFixed(2);
        //   if (zf > 0) {
        //     zf = "+" + zf + "%";
        //   } else {
        //     zf = zf + "%";
        //   }
        // }
        // var zf = toprice - yesprice;
        $("li[data-name='" + cname + "']")
          .find(".yester span")
          .html((now_price-0).toFixed(8));
        // $("li[data-name='" + cname + "']")
        //   .find(".today span")
        //   .html(toprice);
        
          $("li[data-name='" + cname + "']")
          .find(".high_price")
          .html((msg.high_price-0).toFixed(8));
          $("li[data-name='" + cname + "']")
          .find(".low_price")
          .html((msg.low_price-0).toFixed(8));
           $("li[data-name='" + cname + "']")
          .find(".volume")
          .html((msg.volume-0).toFixed(5));
      });
    },
    setColor(c) {
      if (c >= 0) {
        return "ceilColor";
      } else if (c < 0) {
        return "redColor";
      } else {
        return "";
      }
    },
    setCurrent(index, inde) {
      
      let msg = this.quotation[index];
      let quo = msg.quotation[inde];
      var tradeData = {
        currency_id: quo.currency_id,
        legal_id: quo.legal_id,
        currency_name: quo.currency_name,
        legal_name: quo.legal_name,
        isShow: index,
        change:quo.change,
        volume:quo.volume
      };
      window.localStorage.setItem("tradeData", JSON.stringify(tradeData));
      this.$router.push('/dealCenter');
    },
    getQuotation() {
      var i = layer.load();
      this.$http({
        url: "/api/currency/quotation",
        method: "get"
      }).then(res => {
        layer.close(i);
        console.log(res.data);
        if (res.data.type == "ok" && res.data.message.length != 0) {
          var msg = res.data.message;
          if(this.myAdd.length){

            msg.forEach((item,index) => {
              this.myAdd.forEach((ite,ind) => {
                if(item.id == ite.legalId){
                  item.quotation.find((c) => {
                    return c.currency_id == ite.currencyId;
                  }).added = true
                }
              })
            })
          }
          this.quotation = res.data.message;
          this.nowCoin = this.quotation[0].name;
          let msg = res.data.message[0];
          let quo = msg.quotation[0];
          var tradeData = {
            currency_id: quo.currency_id,
            legal_id: quo.legal_id,
            currency_name: quo.currency_name,
            legal_name: quo.legal_name,
            isShow: 0,
            change:quo.change,
            volume:quo.volume
          };
          if (!window.localStorage.getItem("tradeData")) {
            window.localStorage.setItem("tradeData", JSON.stringify(tradeData));
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
      this.$http.post("/api/" + "quotation").then(res => {
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
      this.$http.post("/api/" + "historical_data").then(res => {
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
.swiper-slide>img{
  width: 100%;
  height: 590px;
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
  background: #194B64;
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
  border: 1px solid #194B64;
  .list-title {
    display: flex;
    padding: 0 30px;
    background: #194B64;
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
    background: #f0f0f0;
    max-height: 400px;
    overflow-y: scroll;
    // border: 1px solid #563bd1;
    border-top: none;

    li {
      cursor: pointer;
      display: flex;
      // border-top: 1px solid #ddd;
      padding: 10px 30px;
      line-height: 30px;
      // color: #c7cce6;
      &:hover{
        background: #fff;
      }
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
    li:last-child {
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
.notice_li a {
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
  color: #194B64;
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
.content01 {
  padding: 40px 0;
  background: #fff;
  .imgs01 {
    width: 300px;
  }
  .imgs02 {
    width: 400px;
  }
  .imgs03 {
    width: 450px;
  }
  .imgs04 {
    width: 450px;
  }
  .imgs05 {
    width: 450px;
  }
}
.bg01 {
  background: url("../assets/images/content_bg01.png") center no-repeat;
  width: 100%;
  // height: 300px;
  background-size: cover;
  padding: 50px 0;
}
.bg02 {
  background: url("../assets/images/content_bg02.png") center no-repeat;
  width: 100%;
  background-size: cover;
  // padding: 0!important;
  padding: 50px 0;
}
.login_btn {
  padding: 15px 80px;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 5px;
  cursor: pointer;
}
.register_btn {
  padding: 15px 80px;
  background: #563bd1;
  border-radius: 5px;
  cursor: pointer;
}
.go_transfer {
  padding: 50px 0;
}
.foot {
  padding: 50px 0;
}
</style>


