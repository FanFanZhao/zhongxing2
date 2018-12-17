<template>
    <div class="market clr-part">
		<div class="m_title  flex" style="padding:20px 0 ">
            <span style="width:100px">{{$t('market.market')}}</span>
            <el-input v-model="keyword" size="mini" clearable :placeholder="$t('inpCur')"></el-input>
        </div>
        <div class="m_filter">
            <div class="tabtitle ft14 curPer flex around">
                <!-- <span class="active">JNB</span> -->

                <!-- <span class="active">USDT</span>
                <span>JNB</span>
                <span>JNB</span> -->
                <span v-for="(tab,index) in tabList" :key="index" :class="['bdr-part',{'active': (index == isShow&&!showAdd)}]" @click="changeType(index,tab.name,tab.id)">{{tab.name}}</span>
                <span @click="showAdd=true" :class="['bdr-part',{'active': showAdd}]">{{$t('home.myMarkets')}}</span>
            </div>
        </div>
        <div class="coin-title clear clr-part">
            <div>
                <div class="flex tc" @click="arrSort('at')">
                  <span>{{$t('market.currency')}}</span>
                  <div class="down-up">
                    <div :class="['el-icon-caret-top curPer',{bold:sortKey == 'at'&&directions == 'up'}]" @click="directions = 'up';arrSort('at','up')"></div>
                    <div :class="['el-icon-caret-bottom curPer',{bold:sortKey == 'at'&&directions == 'down'}]" @click="directions = 'down';arrSort('at','down')"></div>
                  </div>
                </div>
                <!-- <img src="../assets/images/select0.png" alt=""> -->
            </div>
            <div>
                <div class="flex tc" @click="arrSort('now_price')">
                  <span>{{$t('market.lastprice')}}</span>
                  <div class="down-up">
                    <div :class="['el-icon-caret-top curPer',{bold:sortKey == 'now_price'&&directions == 'up'}]" @click="directions = 'up';arrSort('now_price','up')"></div>
                    <div :class="['el-icon-caret-bottom curPer',{bold:sortKey == 'now_price'&&directions == 'down'}]" @click="directions = 'down';arrSort('now_price','down')"></div>
                  </div>
                </div>
                <!-- <img src="../assets/images/select0.png" alt=""> -->
            </div>
            <div>
                 <div class="flex tc" @click="arrSort('change')">
                   <span>{{$t('market.change')}}</span>
                   <div class="down-up">
                     <div :class="['el-icon-caret-top curPer',{bold:sortKey == 'change'&&directions == 'up'}]" @click="directions = 'up';arrSort('change')"></div>
                     <div :class="['el-icon-caret-bottom curPer',{bold:sortKey == 'change'&&directions == 'down'}]" @click="directions = 'down';arrSort('change')"></div>
                   </div>
                 </div>
                <!-- <img src="../assets/images/select0.png" alt=""> -->
            </div>
        </div>
        <!-- <div class="line"></div> -->
        <ul class="coin-wrap scroll">
          <li v-for="(market,index) in marketList " :key="index" >
            <p v-for="(itm,idx) in market"  :key="itm.id" v-if="search(itm.currency_name)&&testItem(itm.legal_name,itm.added)" :class="{'bg-hov':true,'bg-even':idx%2 !=0,'bg-sel':(idx===ids)||(currency_index==itm.currency_name&&legal_index==itm.legal_name)}" :data-id='itm.id' :data-index='idx' @click="quota_shift(idx,itm.currency_id,itm.legal_id,itm.currency_name,itm.legal_name,itm,index,market,itm.now_price,itm.change,itm.volume,$event)">
              <span class="w36"><img :src="itm.logo" alt=""><i><em class="deep_blue bold">{{itm.currency_name}}</em><em class="light_blue bold">/{{itm.legal_name}}</em></i></span>
              <span class="w30 tr deep_blue bold nowPrice" :data-name='itm.currency_id+"/"+itm.legal_id'>{{itm.now_price || 0}}</span>
              <span :class="{'green':itm.change>=0,'red':itm.change<0}" class="bold">{{(itm.change>0?'+':'')+(itm.change-0).toFixed(2)}}%</span>
              <span class="  el-icon-star-on star" v-if="itm.added" @click="addDelete('delete',itm.currency_match_id)" ></span>
                <span class="  el-icon-star-off star" v-if="!itm.added"  @click="addDelete('add',itm.currency_match_id)"></span>
            </p>
          </li>
        </ul>
	</div>
</template>

<script>
export default {
  name: "market",
  data() {
    return {
      ids: 0,
      isShow: 0,
      tabList: [],
      marketList: [],
      newData: ["HQ", "$0.076128", "-1.11%"],
      legal_index: "",
      currency_index: "",
      tradeDatas: "",
      exName: "",
      currency_name: "",
      legal_name: "",
      directions:'',
      sortKey:'none',
      myAdd:[],
      token:'',
      nowLegal:'',
      showAdd:false,
      keyword:''
    };
  },
  created: function() {
    // this.init();
    this.token = localStorage.getItem("token") || "";
    //法币列表
    if(this.token){
      this.getMyAdd()
    } else {
      this.getList()
    }
    
  },
  mounted() {
    var that = this;
  },
  methods: {
    search(name){
      var l = this.keyword.length;
      if(l){
        if(l>name.length){
          return false;
        } else {
          if(name.slice(0,l) == this.keyword.toUpperCase()){
            return true;
          } else {
            return false;
          }
        }
      } else {
        return true;
      }
      
    },
    testItem(name,added){
      
      if(this.showAdd){
        return added
      } else {
        return name == this.nowLegal
      }
    },
    getMyAdd(){
      if(this.token){

          this.$http({
          url:'/api/user_match/list',
        
          headers: { Authorization: this.token}
        }).then(res => {
          if(res.data.type == 'ok'){
            var list = res.data.message;
              this.myAdd = list;
              
              this.getList();
          }
        })
      } else {
        layer.msg('请先登录')
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
        if(this.$i18n.locale == 'zh'){

          layer.msg('请先登录')
        } else {
          layer.msg('Please sign in')
        }
      }
    },
    getList(){
      var load = layer.load();
      this.$http({
      url: "/api/" + "currency/quotation",
      method: "get",
      data: {}
    }).then(res => {
      layer.close(load);
      // console.log(res);
      if (res.data.type == "ok") {
        this.tabList = res.data.message;
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
        var arr_quota = [];
        for (var i = 0; i < msg.length; i++) {
          arr_quota[i] = msg[i].quotation;
        }
        this.marketList = arr_quota;
        console.log(this.marketList);
        // this.$store.state.priceScale = Math.pow(
        //   10,
        //   this.marketList[0][0].now_price
        //     ? this.marketList[0][0].now_price.length
        //     : 0
        // );
        if (this.exName == "") {
          this.exName = this.tabList[0].name;
        }
        this.currency_name = msg[0].name;
        // this.nowLegal = msg[0].name;
        this.$store.state.priceScale = 100000;

        //默认法币id和name和行情交易对
        if (!window.localStorage.getItem("tradeData")) {
          this.$store.state.symbol =
            arr_quota[0][0].currency_name + "/" + arr_quota[0][0].legal_name;
          var legal_id = arr_quota[0][0].legal_id;
          var currency_id = arr_quota[0][0].currency_id;
          var legal_name = arr_quota[0][0].legal_name;
          this.nowLegal = arr_quota[0][0].legal_name;
          var currency_name = arr_quota[0][0].currency_name;
           var now_price = arr_quota[0][0].now_price;
          var tradeDatas = {
            currency_id: currency_id,
            legal_id: legal_id,
            currency_name: currency_name,
            legal_name: legal_name,
            now_price:now_price
          };
        } else {
          var localData = JSON.parse(window.localStorage.getItem("tradeData"));
          this.$store.state.symbol =
            localData.currency_name + "/" + localData.legal_name;
            this.nowLegal = localData.legal_name;
          var tradeDatas = {
            currency_id: localData.currency_id,
            legal_id: localData.legal_id,
            currency_name: localData.currency_name,
            legal_name: localData.legal_name,
             now_price:arr_quota[0][0].now_price
          };
          this.ids = "a";
          this.isShow = localData.isShow;
          this.legal_index = localData.legal_name;
          this.currency_index = localData.currency_name;
        }

        //组件间传值
        setTimeout(() => {
          eventBus.$emit("toTrade0", tradeDatas);
        }, 1000);
        setTimeout(() => {
          eventBus.$emit("toExchange0", tradeDatas);
        }, 1000);
        // socket连接
        this.connect();
      }
    });
    },
    arrSort(k,d){
      console.log(d);
      d = this.directions;
      
      this.sortKey = k;
      this.marketList[this.isShow].sort(function(a,b){
        if(k == 'at'){
          if(d == 'up'){

            return a.currency_name.charCodeAt() - b.currency_name.charCodeAt()
          } else {
            return b.currency_name.charCodeAt() - a.currency_name.charCodeAt()

          }
          
        } else {
          if(d == 'up'){

            return a[k] - b[k];
          } else {
            return b[k] - a[k];
          }
          
        }
      })
      
    },
    // socket封装
    connect() {
      var that = this;
      console.log("socket");
      that.$socket.emit("login", this.$makeSocketId());
      that.$socket.on("daymarket", msg => {
        // console.log(msg);
        if (msg.type == "daymarket") {
          console.log(msg);
          var lists = that.marketList;
          console.log(lists.length);
          that.marketList.forEach(function(item,index){
            var i = item.findIndex(function(ite,inde){
              return ite.currency_id == msg.currency_id&&ite.legal_id == msg.legal_id;
            })
            if(i != -1){
              item[i].now_price = msg.now_price;
              item[i].change = (msg.change-0).toFixed(2);
            }
          })
          

          // var cname = msg.currency_id + "/" + msg.legal_id;
          // var newprice = msg.now_price;
          // var newup = (msg.change-0).toFixed(2);
          // // console.log(cname)
          // if (newup < 0) {
          //   newup = newup + "%";
          //   $("span[data-name='" + cname + "']")
          //     .next()
          //     .css("color", "#ff6e42");
          // } else {
          //   newup = '+'+newup + "%";
          //   $("span[data-name='" + cname + "']")
          //     .next()
          //     .css("color", "#459e80");
          // }
          // $("span[data-name='" + cname + "']")
          //   .html(newprice)
          //   .next()
          //   .html(newup);
        }
      });
    },
    changePair(list, index, market) {
      console.log(list);
      console.log(typeof list.now_price);
      if (list.now_price != null) {
        let arr = list.now_price.split(".")[1];
        this.$store.state.priceScale = Math.pow(10, arr.length); //根据最新价小数点后几位改变价格精度
        this.$store.state.symbol = list.name + "/" + this.exName; //交易对
      }

      //	this.$store.state.symbol=list.name+'/'+this.exName
    },
    changeType(index, legal_name, currency_id) {
      this.nowLegal = legal_name;
      this.showAdd = false;
      this.directions = '';
      this.sortKey = '';
      this.isShow = index;
      // this.legal_index='';
      this.ids = "a";
      this.exName = legal_name;
      this.legal_name = legal_name;
      this.currency_id = currency_id;
      //    console.log(this.currency_name);
      console.log(this.currency_id);
    },
    getSymbols(callback) {
      if (this.address.length <= 0) {
        return false;
      }
      this.$http({
        url: "/api/" + "wallet/list?user_id=" + this.address || "",
        type: "GET"
      })
        .then(res => {
          // console.log(res)
          if (res.data.type == "ok") {
            this.accountInfo = res.data.message;
            this.dataList = res.data.message.list;
            // console.log(this.dataList)
            callback && callback();
          } else {
            // console.log(123)
            // alert(res.message)
          }
        })
        .catch(error => {
          return error;
        });
    },
    init() {
      // var index=layer.load();
      this.address = localStorage.getItem("address") || "";
      this.$http({
        url: "/api/" + "quotation",
        method: "post",
        data: {
          address: this.address
        }
      })
        .then(res => {
          // layer.close(index);
          // console.log(res)
          if (res.data.type == "ok") {
            this.getSymbols(() => {
              this.marketList = res.data.message.coin_list;
              console.log(this.marketList);
              for (var i in this.dataList) {
                for (var j in this.marketList) {
                  // console.log(this.dataList[i].name,this.marketList[j].symbol,this.dataList[i].name==this.marketList[j].symbol)

                  if (this.dataList[i].name == this.marketList[j].symbol) {
                    // console.log(1)
                    this.marketList[j].type = this.marketList[j].type || 1;
                  } else {
                    this.marketList[j].type = this.marketList[j].type || 0;
                  }
                }
              }
              // console.log(this.marketList)
            });
          } else {
            // layer.msg(res.data.message)
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //币种切换

    quota_shift(
      idx,
      currency_id,
      legal_id,
      currency_name,
      legal_name,
      list,
      index,
      market,
      now_price,
       change,
       volume,
      event
     
    ) {
      console.log($('.coin-wrap').children().eq(index).children().eq(idx).children().eq(1).text());
      $('.coin-wrap').children().eq(index).children().eq(idx).children().eq(1).text();
      // idx,currency_id,legal_id,currency_name,legal_name,list,index,market
      console.log(market);
      this.ids = idx;
      this.legal_index = "";
      this.currency_index = "";
      if (list.now_price == null || list.now_price == "0") {
        list.now_price = "0.0";
      }
      console.log(list);
      let arr = (list.now_price + "").split(".")[1];
      console.log(arr);
      this.$store.state.priceScale = Math.pow(10, arr.length); //根据最新价小数点后几位改变价格精度
      this.$store.state.symbol = currency_name + "/" + legal_name; //交易对
      console.log( this.$store.state.symbol);
      var tradeDatas = {
        currency_id: currency_id,
        legal_id: legal_id,
        currency_name: currency_name,
        legal_name: legal_name,
        isShow: this.isShow,
        now_price:now_price,
        change:change,
        volume:volume
      };
      
      console.log($('.coin-wrap').children().eq(index).children().eq(idx).children().eq(1).text());
      var sco_price = $('.coin-wrap').children().eq(index).children().eq(idx).children().eq(1).text()
      //向exchange组件传最新价
      eventBus.$emit("toexchangeNowprice",sco_price);
      //向兄弟组件传数据
      eventBus.$emit("toTrade", tradeDatas);
      eventBus.$emit("toExchange", tradeDatas);
      // 存本地
      window.localStorage.setItem("tradeData", JSON.stringify(tradeDatas));
    }
  }
};
</script>

<style scoped>
.coin-wrap li span.star{
  width:10%;line-height:30px;font-size: 14px;
}
.m_title {
  line-height: 30px;
  padding: 0 20px;
  position: relative;
}
.m_search input {
  border-radius: 3px;
  background: transparent;
  border: 1px solid #52688c;
  line-height: 25px;
}
/* .m_search{position: absolute;width: 146px;right: 20px;top: -4px;height: 26px;border-radius: 3px;padding: 4px 8px 4px 0;} */
/* .m_search input{position: absolute;left: 0;top: 10px;z-index: 2;width: 100%;padding: 5px 40px 5px 8px;height: 26px;border-radius: 3px;background: transparent;border: 1px solid #52688c;} */
.m_search img {
  width: 16px;
  height: 15px;
  position: absolute;
  right: 35px;
  top: 20px;
  z-index: 123;
}
.m_filter {
  padding: 10px 0 15px;
}
.tabtitle {
  padding: 0 14px;
}
.tabtitle span {
  flex: 1;
  text-align: center;
  padding: 3px 10px;
  border-bottom: 1px solid #ccc;
}
.tabtitle .active {
  border: 1px solid #ccc;
  border-bottom: none;
}
.coin-title .flex{
  justify-content: center;
}
.coin-title>div {
  width: 30%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  float: left;
  font-size: 12px;
}
.down-up{
  padding-top: 4px;
  font-size: 14px;
}
.down-up div{
  color: #ccc;
  display: block;
}
.down-up .bold{
  font-weight: bold;
  color: #000;
}
.line {
  width: 90%;
  margin: 0px auto;
  border-bottom: 1px solid rgb(48, 59, 75);
}
.coin-wrap {
  height: 500px;
  overflow-y: auto;
}
.coin-wrap li p:nth-child(even) {
  /* background: #f8f8f8; */
}
.coin-wrap li p:hover {
  /* background: #eee; */
}
.coin-wrap li {
  /* height: 30px; */
  line-height: 30px;
  cursor: pointer;
  font-size: 12px;
}
.coin-wrap li span {
  display: inline-block;
  width: 30%;
  float: left;
  text-align: center;
  height: 30px;
}
.coin-wrap li span.w36 {
  width: 30%;
}
.coin-wrap li span.w36 i {
  padding-left: 5px;
}
.coin-wrap li span.w30 {
  width: 30%;
  text-align: center;
}
.coin-wrap li span:first-child {
  /* padding-left: 18px; */
  text-align: left;
  /* display: flex; */
}
.coin-wrap li span:first-child img {
  margin-right: 2px;
  width: 16px;
  vertical-align: sub;
}
.coin-wrap li span:first-child i {
  font-style: normal;
  display: inline-block;
  min-width: 40px;
}
.coin-wrap li span:last-child {
  color: #ff6e42;
}
/* .coin-wrap li:nth-child(odd){background-color: #181b2a;} */
.coin-wrap li span.green {
  color: #459e80;
}
.coin-wrap li p {
  overflow: hidden;
}
.active_p {
  /* background-color: #2b3648; */
}
/* .coin-wrap li p:hover{background-color: #2b3648;} */
</style>
