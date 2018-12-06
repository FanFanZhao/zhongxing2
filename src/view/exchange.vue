<template>
    <div class="exchange clr-part ">
		<!-- <div class="title fColor1">交易所</div> -->
        <div class="content">
            <div class="new_price bdr-part">
                <span class="ft14">最新价 {{newData}}{{legal_name}}</span>
            </div>
            <div class="exchange_title ft14 clear tc">
                <span>方向</span>
                <span>价格({{legal_name}})</span>
                <span>数量({{currency_name}})</span>
            </div>
            <ul class="list-item ft12 tc">
                <li :class="['curPer','redColor','bg-hov',{'bg-evev':index%2 != 0}]" v-for="(out,index) in outlist" @click="price(out.price)" :key="index">
                    <span >卖 {{outlist.length-index}}</span>
                    <span style="font-weight:600">{{out.price}}</span>
                    <span>{{out.number}}</span>
                </li>
                <div class="line bdr-part"></div>
                 <li class="curPer ceilColor bg-hov" v-for="(buy,index) in inlist" :key="index" @click="price(buy.price)">
                    <span>买 {{index+1}}</span>
                    <span style="font-weight:600">{{buy.price}}</span>
                    <span>{{buy.number}}</span>
                </li>
            </ul>
            
        </div>
	</div>
</template>

<script>
export default {
  name: "exchange",
  data() {
    return {
      outlist: [],
      inlist: [],
      load: 1,
      newData: 0,
      currency_name: "",
      legal_name: "",
      currency_id: "",
      legal_id: ""
    };
  },
  created: function() {
    // var local_lid = window.localStorage.getItem("l_id"),
    //   local_cid = window.localStorage.getItem("c_id");
    

  },
  mounted(){
    var that = this;
    var localData=JSON.parse(window.localStorage.getItem('tradeData'))
    that.currency_id = localData.currency_id;
    that.legal_id = localData.legal_id;
    that.connect();
    eventBus.$on("toExchange0", function(data0) {
      that.currency_name = data0.currency_name;
      that.legal_name = data0.legal_name;
      that.currency_id = data0.currency_id;
      that.legal_id = data0.legal_id;
      that.buy_sell(that.legal_id, that.currency_id);
    });
    eventBus.$on("toExchange", function(data) {
      that.currency_name = data.currency_name;
      that.legal_name = data.legal_name;
      that.currency_id = data.currency_id;
      that.legal_id = data.legal_id;
      that.buy_sell(that.legal_id,that.currency_id);
    });
  },
  sockets: {

  },
  methods: {
    price(price) {
      eventBus.$emit("toPrice", price);
    },
    // 第一次默认最新价数据
    buy_sell(legal_id, currency_id) {
      var i = layer.load();
      this.$http({
        url: "/api/" + "transaction/deal",
        method: "post",
        data: {
          legal_id: legal_id,
          currency_id: currency_id
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          layer.close(i);
          if (res.data.type == "ok") {
            this.inlist = res.data.message.in;
            this.outlist = res.data.message.out;
            this.newData = res.data.message.last_price;
            this.buyInfo.buyPrice = 0;
            this.buyInfo.buyNum = 0;
            // this.connect(
            //   legals_id,
            //   currencys_id
            // );
          } else {
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          // console.log(error)
        });
    },
    connect() {
      // console.log(legal_id, currency_id);
      var that = this;
      console.log("socket");
      that.$socket.emit("login", this.$makeSocketId());
      that.$socket.on("transaction", msg => {
        console.log(msg);
        if (msg.type == "transaction") {
          //组件间传值
          var newPrice = {
            newprice: msg.last_price,
            newup: msg.proportion,
            istoken: msg.token,
            yesprice: msg.yesterday,
            toprice: msg.today
          };
          setTimeout(() => {
            eventBus.$emit("toNew", newPrice);
          }, 1000);
          that.newData = msg.last_price;
          // eventBus.$emit('priceToTrade',function(data){
          //   that.newData = data.lastPrice;
          // })
          eventBus.$emit("priceToTrade", msg.last_price);
          var inData = JSON.parse(msg.in);
          var outData = JSON.parse(msg.out);
          if (msg.legal_id == that.legal_id && msg.currency_id == that.currency_id) {
            that.inlist = inData;
            that.outlist = outData;
          }
        }
      });
    }
  },


};
</script>

<style scoped>
.title {
  height: 48px;
  line-height: 48px;
  padding: 0 10px 0 30px;
  /* background-color: #181b2a; */
}
.content {
  padding: 0 10px;
}
.new_price {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  padding: 0 0 0 20px;
}
.exchange_title {
  line-height: 25px;
  position: relative;
  /* color: #637085; */
}
.list-item li {
  line-height: 25px;
  overflow: hidden;
}
.list-item li span,
.exchange_title span {
  width: 33.3%;
  display: inline-block;
  float: left;
}
.green {
  color: #008069;
}
.red {
  color: #cc4951;
}

.line {
  height: 5px;
  border-bottom: 1px solid #ccc;
}
</style>
