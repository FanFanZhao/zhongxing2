<template>
    <div class="trade clr-part" style="">
        <div class="title_box">
            <div class="tabtitle 1 ft16curPer">
                <!-- <span :class="{active:show == true}">限价交易</span>
                <span :class="{active:show == false}" @click="changeType">市价交易</span> -->
                <span v-for="(item,index) in tradetype" :class="{active:index==current}" @click="changeType(index)">{{item.typetext}}</span>
            </div>
        </div>
        <!-- 限价交易 -->
        <div class="content clear">
            <div class="w50 fl first brcolor bdr-part">
               
                <div class="ft14">
                    <div class="available clear 1 " v-if="address.length<=0"><span class="redColor curPer" @click="goNext('login')">{{$t('logins')}}</span>
                    {{$t('center.or')}} <span class="redColor curPer" @click="goNext('register')">{{$t('registers')}}</span>
                    {{$t('center.start')}}
                    </div>
                    <div class="clear available bdr-part" v-else>
                        <span class="fl 1">{{$t('center.available')}} {{user_legal}} {{legal_name}}</span>
                        <!-- <span class="fr redColor curPer" @click="goNext('account')">充币</span> -->
                    </div>
                    <div class="mt40 input-item clear">
                        <label>{{$t('center.buyprice')}}</label>
                        <input class="clr-part bg-main bdr-part" type="number" v-model="buyPrice" min="0" @keydown.69.prevent  :disabled="disabled" v-if="!disabled">
                        <input class="clr-part bg-main bdr-part" type="number" v-model="lastPrice02" @keydown.69.prevent  :disabled="disabled" v-if="disabled">
                        <span>{{legal_name}}</span>
                    </div>
                    <div class="mt40 input-item clear">
                        <label>{{$t('center.buynumber')}}</label>
                        <input class="clr-part bg-main bdr-part" type="number" min="0" v-model="buyNum" @keydown.69.prevent  @keyup="numFilter($event)">
                        <span>{{currency_name}}</span>
                    </div>
                    <div class="mt40 input-item clear">
                        <label>交易密码</label>
                        <input class="clr-part bg-main bdr-part" v-model="buyPsw" type="password">
                    </div>
                    <!-- <div class="mt40 input-item clear">
                        <label>资金密码:</label>
                        <input type="password" v-model="buyInfo.pwd" @keydown.69.prevent>
                    </div> -->
                    <!-- <div class="attion tr 1">范围 (0.000001,20,精度: 0.000001)</div> -->
                    <!-- <div class="mt40 input-item clear">
                        <label style="width:25%">交易密码：</label>
                        <input style="width:75%" class="clr-part bg-main bdr-part" type="text">
                    </div> -->
                    <el-slider v-model="value1" :min="0" :max="100" show-stops :show-tooltip="true" :format-tooltip="formatTooltip01" :step="25" :disabled="address?current == 0?buyPrice=='':lastPrice02==0?true:false:true" @change="changeVal"></el-slider>
                    
                    <div class="mt50 1 ft16">{{$t('center.tradetotal')}} {{buyTotal}} {{legal_name}}</div>
                    <div class="sell_btn curPer mt40 tc greenBack 1 ft16" @click="buyCoin">{{$t('center.buyin')}}{{currency_name}}</div>
                </div>
            </div>
            <div class="w50 fl second">
                <div class="ft14">
                    <div class="available clear 1 bdr-part" v-if="address.length<=0"><span class="redColor curPer" @click="goNext('login')">{{$t('logins')}}</span>
                    {{$t('center.or')}} <span class="redColor curPer" @click="goNext('register')">{{$t('registers')}}</span>
                    {{$t('center.start')}}
                    </div>
                    <div class="clear available bdr-part" v-else>
                        <span class="fl 1">{{$t('center.available')}} {{user_currency}} {{currency_name}}</span>
                        <!-- <span class="fr redColor curPer" @click="goNext('account')">充币</span> -->
                    </div>
                    <div class="mt40 input-item clear">
                        <label>{{$t('center.sellprice')}}</label>
                        <input class="clr-part bg-main bdr-part" type="number" @keydown.69.prevent v-model="sellPrice" v-if="!disabled" min="0">
                        <input class="clr-part bg-main bdr-part" type="number" @keydown.69.prevent v-model="lastPrice01" :disabled='disabled' v-if="disabled">
                        <span>{{legal_name}}</span>
                    </div>
                    <div class="mt40 input-item clear">
                        <label>{{$t('center.sellnumber')}}</label>
                        <input class="clr-part bg-main bdr-part" type="number" @keydown.69.prevent  @keyup="numFilter($event)" v-model="sellNum" min="0">
                        <span>{{currency_name}}</span>
                    </div>
                    <div class="mt40 input-item clear">
                        <label>交易密码</label>
                        <input class="clr-part bg-main bdr-part" v-model="sellPsw" type="password">
                    </div>
                    <!-- <div class="mt40 input-item clear">
                        <label>资金密码:</label>
                        <input type="password" v-model="sellInfo.pwd" @keydown.69.prevent>
                    </div> -->
                    <!-- <div class="attion tr 1">范围 (0.000001,20,精度: 0.000001)</div> -->
                    <el-slider v-model="value2" :min="0" :max="100" :show-tooltip="true" show-stops :step="25" :format-tooltip="formatTooltip02"  :disabled="address?current == 0?sellPrice=='':lastPrice01==0?true:false:true" @change="changeVal2"></el-slider>
                    
                    <div class="mt50 1 ft16">{{$t('center.tradetotal')}} {{sellTotal}} {{legal_name}}</div>
                    <div class="sell_btn curPer mt40 tc redBack 1 ft16" @click="sellCoin">{{$t('center.sellout')}}{{currency_name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "trade",
  data() {
    return {
      timer: "",
      timer2: "",
      timer3: "",
      address: "",
      currency_name: "",
      legal_name: "",
      user_currency: "",
      user_legal: "",
      show: true,
      showNone: false,
      current: 0,
      allBalance: 0,
      disabled: false,
      lastPrice: "",
      lastPrice01:'',
      lastPrice02:'',
      pwd: "",
      buyPrice: "",
      buyNum: "",
      sellNum: "",
      sellPrice: "",
      buyInfo: { buyPrice: 0, buyNum: 0, pwd: "", url: "transaction/in" },
      sellInfo: { sellPrice: 0, sellNum: 0, pwd: "", url: "transaction/out" },
      tradetype: [{ typetext: this.$t('center.xian') }, { typetext: this.$t('center.shi') }],
      value1: 0,
      value2: 0,
      disable: false,
      disable02: false,
      buyPsw:'',
      sellPsw:''
    };
  },
  watch: {
    buyPrice: function(newVal) {
      if (newVal < 0) {
        this.buyPrice = "";
      }
    },
    sellPrice: function(val) {
      if (val < 0) {
        this.sellPrice = "";
      }
    },
    buyNum: function(val) {
      if (val < 0) {
        this.buyNum = "";
      }
    },
    sellNum: function(val) {
      if (val < 0) {
        this.sellNum = "";
      }
    }
  },
  created() {
    this.address = localStorage.getItem("token") || "";
    if (this.address == "") {
      this.disable = true;
      this.disable02 = true;
    }
  },
  mounted() {
    var that = this;
    that.address = localStorage.getItem("token") || "";
    eventBus.$on("toPrice", function(data) {
      console.log("-------------------------------------");
      console.log(data);
      // if (data) {
      //   that.buyPrice = data;
      //   that.sellPrice = data;
      // }
    });
    eventBus.$on("toTrade", function(data) {
      console.log(data);
      that.currency_id = data.currency_id;
      that.legal_id = data.legal_id;
      that.currency_name = data.currency_name;
      that.legal_name = data.legal_name;
      that.buyPrice = '';
      that.sellPrice = '';
      // that.buy_sell(that.legal_id, that.currency_id);
      that.currency_val(that.legal_id, that.currency_id)
    });
    eventBus.$on("toTrade0", function(data0) {
      console.log(data0);
      (that.currency_id = data0.currency_id), (that.legal_id = data0.legal_id);
      that.currency_name = data0.currency_name;
      that.legal_name = data0.legal_name;
      // that.buy_sell(that.legal_id, that.currency_id);
      that.currency_val(that.legal_id, that.currency_id)
    });
    eventBus.$on("tocel", function(datas) {
      // console.log(datas);
      if (datas) {
        // that.buy_sell(that.legal_id, that.currency_id);
        that.currency_val(that.legal_id, that.currency_id)
      }
    });
    // 从exchange传过来的买一卖一价
    eventBus.$on("totradePrice", function(data) {
      console.log(data);
      that.lastPrice01 = data.buyPrice;
      that.lastPrice02 = data.sellPrice;
      // that.lastPrice = data;
    })
    // 从exchange传过来的最新价
    eventBus.$on("priceToTrade", function(data) {
      console.log(data);
      that.lastPrice01 = data.buyPrice;
      that.lastPrice02 = data.sellPrice;
      // that.lastPrice = data;
    });
  },
  methods: {
    //获取可用余额
    //币币余额
    currency_val(legal_id,currency_id) {
      if(!this.address){
        return;
      }
      this.$http({
        url: "/api/" + "wallet/get_currency_balance",
        method: "GET",
        params: {
          legal_id:legal_id,
          change_id: currency_id
        },
        headers: { Authorization: this.address }
      }).then(res => {
        console.log(res)
        if (res.status == 200) {
          this.user_currency = res.data.change_price;
          this.user_legal = res.data.legal_price;
        } else {
          clearInterval(this.timer);
          clearInterval(this.timer2);
        }
      });
    },
    //法币余额
    // currency_val02(legal_id) {
    //   if(!this.address){
    //     return;
    //   }
    //   this.$http({
    //     url: "/api/" + "wallet/get_currency_balance",
    //     method: "GET",
    //     params: {
    //       currency_id: legal_id
    //     },
    //     headers: { Authorization: this.address }
    //   }).then(res => {
    //     if (res.data.type == "ok") {
    //       this.user_legal = res.data.message;
    //     } else {
    //       clearInterval(this.timer);
    //       clearInterval(this.timer2);
    //     }
    //   });
    // },
    //格式化Tolltip
    formatTooltip01(val01){
        return val01+'%'
    },
    formatTooltip02(val02){
        return val02+'%'
    },
    changeVal(){
     
         if(this.current == 0){
           this.buyNum = (this.user_legal/this.buyPrice*(this.value1/100)).toFixed(5);
         } 
         if(this.current == 1){
           this.buyNum = (this.user_legal/this.lastPrice02*(this.value1/100)).toFixed(5);
         }   
    },
    changeVal2(){
        if(this.current == 0){
            this.sellNum = (this.user_currency*(this.value2/100)).toFixed(5);
         }  
         if(this.current == 1){
           this.sellNum = (this.user_currency*(this.value2/100)).toFixed(5);
         } 
    },
    numFilter(ev) {
      //48-57 96-105 108
      // console.log(ev.keyCode)
    },
    changeType(index) {
      this.value1 = 0;
      this.value2 = 0;
      this.current = index;

      if (index == 1) {
        this.buyPrice = "";
        this.sellPrice = "";
        this.buyNum = "";
        this.sellNum = "";
        this.disabled = true;
      } else {
        this.disabled = false;
        this.buyPrice = "";
        this.sellPrice = "";
        this.buyNum = "";
        this.sellNum = "";
      }
    },
    goNext(url) {
      this.$router.push({ name: url });
    },
    init() {
      this.$http({
        url: "/api/" + "transaction/deal",
        method: "post",
        data: {
          address: this.address
        }
      }).then(res => {
        // console.log(res)
        this.allBalance = res.data.message.user_cny;
        // console.log(this.allBalance)
      });
    },
    buyCoin() {
      var that = this;
      if (!this.disabled) {
        if (!this.buyPrice || this.buyPrice <= 0) {
          layer.msg(that.$t('lay.inprice'));
          return;
        }
        
      }else{
          if(this.lastPrice02<=0){
            layer.msg(that.$t('lay.noinprice'));
            return;
          }
      }
      
      if (!this.buyNum || this.buyNum <= 0) {
        layer.msg(that.$t('lay.innumber'));
        return;
      }
      if(this.buyPsw == ''){
        layer.msg('请输入交易密码');
        return;
      }
      if(this.address == ''){
        layer.msg(that.$t('lay.plogin'));
        setTimeout(function(){
           that.$router.push('/components/login');
        },1000);
        return;
      }
      // if(!this.buyInfo.pwd || this.buyInfo.pwd.length< 6){
      //   layer.msg("请输入资金密码");
      //   return;
      // }
      var i = layer.load();
      this.$http({
        url: "/api/" + this.buyInfo.url,
        method: "post",
        data: {
          legal_id: this.legal_id,
          currency_id: this.currency_id,
          price: this.disabled ? this.lastPrice02 : this.buyPrice,
          num: this.buyNum,
          pay_password:this.buyPsw
          // pay_password:this.buyInfo.pwd
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          
          layer.close(i);

          if (res.data.type == "ok") {
            eventBus.$emit("tradeOk", { status: "ok" });
            layer.msg(res.data.message);
            console.log(this.current);
            if (this.current == 0) {
              // this.buyPrice = '';
              this.buyNum = "";
              this.buyInfo.pwd = "";
            } else {
              this.buyNum = "";
              this.buyInfo.pwd = "";
            }
             that.currency_val(that.legal_id, that.currency_id)
            // that.buy_sell(that.legal_id, that.currency_id);
            that.get
            eventBus.$emit("buyTrade", "tradebuy");
            eventBus.$emit("tocel", "updata");
            console.log(res.data.message);
          } else {
            this.buyNum = "";
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    sellCoin() {
      console.log(localStorage.getItem("token"));

      var that = this;
      if (!this.disabled) {
        if (!this.sellPrice || this.sellPrice <= 0) {
          layer.msg(that.$t('lay.outprice'));
          return;
        }
      }else{
        if(this.lastPrice01<=0){
          layer.msg(that.$t('lay.outinprice'));
          return;
        }
      }
      if (!this.sellNum || this.sellNum <= 0) {
        layer.msg(that.$t('lay.outnumber'));
        return;
      }
      if(this.sellPsw == ''){
        layer.msg('请输入交易密码');
        return;
      }
      if(this.address == ''){
        layer.msg(that.$t('lay.plogin'));
        setTimeout(function(){
           that.$router.push('/components/login')
        },1000);
        return;
      }
      // if(!this.sellInfo.pwd || this.sellInfo.pwd.length< 6){
      //   layer.msg("请输入资金密码");
      //   return;
      // }
      var i = layer.load();
      this.$http({
        url: "/api/" + this.sellInfo.url,
        method: "post",
        data: {
          legal_id: this.legal_id,
          currency_id: this.currency_id,
          price: this.disabled ? this.lastPrice01 : this.sellPrice,
          num: this.sellNum,
          pay_password:this.sellPsw
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          console.log(
            res,
            "99999999999999999999999999999999999999999999999999"
          );
          layer.close(i);
          // layer.msg(res.data.message)
          if (res.data.type == "ok") {
            setTimeout(function() {
              that.buy_sell(that.legal_id, that.currency_id);
            }, 3000);
             that.currency_val(that.legal_id, that.currency_id)

            eventBus.$emit("tradeOk", { status: "ok" });
            if (this.current == 0) {
              // this.sellPrice = '';
              this.sellNum = "";
              this.sellInfo.pwd = "";
            } else {
              this.sellNum = "";
              this.sellInfo.pwd = "";
            }
            eventBus.$emit("buyTrade", "tradebuy");
            eventBus.$emit("tocel", "updata");
            layer.msg(res.data.message);
          } else {
            this.sellNum = "";
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //买入、卖出记录
    buy_sell(legals_id, currencys_id) {
      // console.log("啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊");
      var i = layer.load();
      this.$http({
        url: "/api/" + "transaction/deal",
        method: "post",
        data: {
          legal_id: legals_id,
          currency_id: currencys_id
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
         
          layer.close(i);
          // console.log(res ,222)
          // layer.close(i);
          if (res.data.type == "ok") {
            this.lastPrice = res.data.message.last_price;
            // this.user_currency = res.data.message.user_currency;
            // this.user_legal = res.data.message.user_legal;
            console.log("console------" + this.user_currency, this.user_legal);
            // console.log(res.data)
            // this.buyPrice = 0;
            // this.buyNum = 0;
          } else {
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          // console.log(error)
        });
    }
  },
  computed: {
    buyTotal() {
      return ((this.buyPrice||this.lastPrice02) * this.buyNum).toFixed(5) || 0;
    },
    sellTotal() {
      return ((this.sellPrice||this.lastPrice01) * this.sellNum).toFixed(5) || 0;
    }
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
  }
};
</script>

<style scoped>
.title_box {
  height: 48px;
  line-height: 48px;
  padding: 0 30px;
}
.tabtitle span {
  cursor: pointer;
}
.tabtitle span:not(:last-child) {
  margin-right: 40px;
}
.content .first {
  padding: 0 15px 0 25px;
}
.content .second {
  padding: 0 25px 0 15px;
}
.available {
  height: 48px;
  border-bottom: 1px solid #ccc;
  line-height: 48px;
}
.input-item {
  position: relative;
  line-height: 40px;
}
.input-item label {
  width: 20%;
  float: left;
  font-size: 14px;
}
.input-item input {
  width: 80%;
  float: left;
  border: 1px solid #ccc;
  border-radius: 3px;
  height: 40px;
  text-indent: 15px;
  font-size: 16px;
  line-height: 38px;
}
.input-item span {
  position: absolute;
  right: 15px;
  font-size: 16px;
}
.attion {
  height: 20px;
  line-height: 30px;
  font-size: 12px;
}
.sell_btn {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  line-height: 40px;
}
.greenBack {
  background-color: #55a067;
  color: #fff;
}
.redBack {
  background-color: #cc4951;
  color: #fff;
}
input:disabled {
  color: #627085;
  cursor: not-allowed;
}
</style>

