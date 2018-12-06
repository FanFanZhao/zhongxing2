<template>
    <div class="market clr-part">
		<div class="m_title  clear">
            <span class=" fl">市场</span>
            <div class="m_search fr hide">
               <input type="text" >
               <img src="../assets/images/search.png" alt="">
            </div>
        </div>
        <div class="m_filter">
            <div class="tabtitle ft14 curPer flex around">
                <!-- <span class="active">JNB</span> -->

                <!-- <span class="active">USDT</span>
                <span>JNB</span>
                <span>JNB</span> -->
                <span v-for="(tab,index) in tabList " :key="index" :class="['bdr-part',{'active': (index == isShow)}]" @click="changeType(index,tab.name,tab.id)">{{tab.name}}</span>
            </div>
        </div>
        <div class="coin-title clear clr-part">
            <div>
                <span>币种</span>
                <img src="../assets/images/select0.png" alt="">
            </div>
            <div>
                <span>最新价</span>
                <img src="../assets/images/select0.png" alt="">
            </div>
            <div>
                 <span>涨幅</span>
                <img src="../assets/images/select0.png" alt="">
            </div>
        </div>
        <!-- <div class="line"></div> -->
        <ul class="coin-wrap scroll">
          <li v-for="(market,index) in marketList " :key="index" v-show="(index == isShow )" >
            <p v-for="(itm,idx) in market"  :key="itm.id" :class="{'bg-hov':true,'bg-even':idx%2 !=0,'bg-sel':(idx===ids)||(currency_index==itm.currency_name&&legal_index==itm.legal_name)}" :data-id='itm.id' :data-index='idx' @click="quota_shift(idx,itm.currency_id,itm.legal_id,itm.currency_name,itm.legal_name,itm,index,market)">
              <span class="w36"><img :src="itm.logo" alt=""><i><em class="deep_blue bold">{{itm.currency_name}}</em><em class="light_blue bold">/{{itm.legal_name}}</em></i></span>
              <span class="w30 tr deep_blue bold" :data-name='itm.currency_name+"/"+itm.legal_name'>${{itm.now_price || 0}}</span>
              <span :class="{'green':itm.change>=0}" class="bold">{{(itm.change>0?'+':'')+(itm.change-0).toFixed(2)}}%</span>
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
      legal_index: '',
      currency_index: '',
      tradeDatas: "",
      exName: "",
      currency_name: "",
      legal_name:""
    };
  },
  created: function() {
    // this.init();
    this.token = localStorage.getItem("token") || "";
    //法币列表
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
        var arr_quota = [];
        for (var i = 0; i < msg.length; i++) {
          arr_quota[i] = msg[i].quotation;
        }
        this.marketList = arr_quota;
        console.log(this.marketList)
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
        this.$store.state.priceScale = 100000;
        
        //默认法币id和name和行情交易对
        if(!window.localStorage.getItem('tradeData')){
          this.$store.state.symbol = arr_quota[0][0].currency_name + "/" + arr_quota[0][0].legal_name;
          var legal_id = arr_quota[0][0].legal_id;
          var currency_id = arr_quota[0][0].currency_id;
          var legal_name = arr_quota[0][0].legal_name;
          var currency_name = arr_quota[0][0].currency_name;
          var tradeDatas = {
            currency_id: currency_id,
            legal_id: legal_id,
            currency_name: currency_name,
            legal_name: legal_name
          };
        }else{
          var localData=JSON.parse(window.localStorage.getItem('tradeData'))
          this.$store.state.symbol = localData.currency_name + "/" + localData.legal_name;
          var tradeDatas = {
            currency_id: localData.currency_id,
            legal_id: localData.legal_id,
            currency_name: localData.currency_name,
            legal_name: localData.legal_name
          };
          this.ids='a';
          this.isShow=localData.isShow;
          this.legal_index=localData.legal_name;
          this.currency_index= localData.currency_name;
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
  mounted() {
    var that = this;
  },
  methods: {
    // socket封装
    connect() {
      var that = this;
      console.log("socket");
      that.$socket.emit("login", this.$makeSocketId());
      that.$socket.on("daymarket", msg => {
        // console.log(msg);
        if (msg.type == "daymarket") {
          var cname = msg.currency_name + "/" + msg.legal_name;
          var newprice = msg.now_price;
          var newup = msg.change;
          // console.log(cname)
          if (newup < 0) {
            newup = newup + "%";
            $("span[data-name='" + cname + "']")
              .next()
              .css("color", "#cc4951");
          } else {
            newup = newup + "%";
            $("span[data-name='" + cname + "']")
              .next()
              .css("color", "#55a067");
          }
          $("span[data-name='" + cname + "']")
            .html("$" + newprice)
            .next()
            .html(newup);
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
              console.log(this.marketList)
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

    quota_shift(idx,currency_id,legal_id,currency_name,legal_name,list,index,market) {
      // idx,currency_id,legal_id,currency_name,legal_name,list,index,market
      console.log(market)
      this.ids = idx;
      this.legal_index='';
      this.currency_index='';
      if (list.now_price == null) {
        list.now_price = "0.0";
      }
      let arr = (list.now_price+'').split(".")[1];
      this.$store.state.priceScale = Math.pow(10, arr.length); //根据最新价小数点后几位改变价格精度
      this.$store.state.symbol = currency_name + "/" + legal_name; //交易对
      var tradeDatas = {
        currency_id: currency_id,
        legal_id: legal_id,
        currency_name:currency_name,
        legal_name: legal_name,
        isShow:this.isShow,
      };
      //向兄弟组件传数据
      eventBus.$emit("toTrade", tradeDatas);
      eventBus.$emit("toExchange", tradeDatas);
      // 存本地
      window.localStorage.setItem('tradeData',JSON.stringify(tradeDatas))
    }
  }
};
</script>

<style scoped>
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
  padding: 0 20px;
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
.coin-title div {
  width: 33.3%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  float: left;
  font-size: 12px;
}
.coin-title img {
  vertical-align: middle;
  margin-top: -3px;
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
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  font-size: 12px;
}
.coin-wrap li span {
  display: inline-block;
  width: 33%;
  float: left;
  text-align: center;
  height: 30px;
}
.coin-wrap li span.w36 {
  width: 36%;
}
.coin-wrap li span.w36 i {
  padding-left: 5px;
}
.coin-wrap li span.w30 {
  width: 30%;
  text-align: right;
}
.coin-wrap li span:first-child {
  padding-left: 18px;
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
