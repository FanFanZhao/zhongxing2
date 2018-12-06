<template>
  <div id="legal-seller" class=" clr-part">
    <div class="top flex bg-part ft14">
      <div class="top-t flex">
        <div class="logo">k</div>
        <div>
          <div>{{info.name}}</div>
          <div>{{$t('shop.retime')}}：{{info.create_time}}</div>
        </div>
      </div>
      <div class="top-b flex">
        <div>
          <div>{{info.total}}</div>
          <div>{{$t('shop.allorder')}}</div>
        </div>
        <div>
          <div>{{info.thirtyDays}}</div>
          <div>{{$t('shop.dayorder')}}</div>
        </div>
        <div>
          <div>{{info.done}}</div>
          <div>{{$t('shop.comorder')}}</div>
        </div>
        <div>
          <div>100%</div>
          <div>{{$t('shop.comrate')}}</div>
        </div>
      </div>
    </div>
    <div class="md flex bg-part ft14">
      <div>
        <span>{{$t('shop.email')}}</span>
        <img v-if="info.prove_email == 1" src="../assets/images/success.png" alt="">
        <img v-else src="../assets/images/icon_error.png" alt="">
      </div>
      <div>
        <span>{{$t('shop.phone')}}</span>
        <img v-if="info.prove_mobile == 1" src="../assets/images/success.png" alt="">
        <img v-else src="../assets/images/icon_error.png" alt="">
      </div>
      <div>
        <span>{{$t('shop.truename')}}</span>
        <img v-if="info.prove_real == 1" src="../assets/images/success.png" alt="">
        <img v-else src="../assets/images/icon_error.png" alt="">
      </div>
      <div>
        <span>{{$t('shop.high')}}</span>
        <img v-if="info.prove_level == 1" src="../assets/images/success.png" alt="">
        <img v-else src="../assets/images/icon_error.png" alt="">
      </div>
    </div>
    <div class="list bg-part ft14">
      <div class="tab">
        <span  :class="{'now':showWhich == 'sell'}" @click="showWhich = showWhich == 'sell'?'none':'sell'">{{$t('shop.onsell')}}</span>
        <span :class="{'now':showWhich == 'buy'}" @click="showWhich = showWhich == 'buy'?'none':'buy'">{{$t('shop.onbuy')}}</span>
      </div>
      <div class="ul-head flex">
        <div>{{$t('market.currency')}}</div>
        <div>{{$t('number')}}</div>
        <div>{{$t('legal.limit')}}</div>
        <div>{{$t('price')}}</div>
        <div>{{$t('legal.pay')}}</div>
        <div>{{$t('do')}}</div>
      </div>
      <ul :class="[showWhich+'-box']">
        <li v-for="(item,index) in info.lists.data" :key="index" :class="[item.type == 'buy'?'buy-item':'sell-item']">
          <div>{{item.currency_name}}</div>
          <div>{{item.surplus_number}}</div>
          <div>{{item.limitation.min}}-{{item.limitation.max}}</div>
          <div>{{item.price}}</div>
          <div>{{item.way_name}}</div>
          <div>
            <span v-if="item.type == 'buy'" @click="setDetail(item)">{{$t('legal.sell')}}</span>
            <span v-else @click="setDetail(item)">{{$t('legal.buy')}}</span>
          </div>
        </li>
      </ul>
      <div class="more" @click="getSellerInfo(true)">{{$t('more')}}</div>
    </div>
    <div class="buy-sell-box" v-if="showDetail">
      <div class="content">

        <div class="flex">
          <span>{{detail.type == 'buy'?$t('legal.sell'):$t('legal.buy')}}</span><span>{{detail.currency_name}}</span>
        </div>
        <div class="flex">
          <span>{{$t('price')}}：</span><span>{{detail.price}}</span>
        </div>
        <div class="flex">
          <span>{{$t('legal.limit')}}：</span><span>{{detail.limitation.min}}-{{detail.limitation.max}}</span>
        </div>
        <div class="flex">
          <span>{{$t('number')}}：</span><span>{{detail.surplus_number}}</span>
        </div>
        <div class="tab">
          <span :class="{'selected':detail.which == 'money'}" @click="detail.which = 'money'">CNY{{$t('account.trade')}}</span>
          <span :class="{'selected':detail.which == 'number'}" @click="detail.which = 'number'">{{detail.type == 'buy'?$t('center.outsell'):$t('center.inbuy')}}{{$t('number')}}</span>
        </div>
        <div class="inp" v-if="detail.which == 'money'">
          <input type="number" :placeholder="$t('legal.inwant')+detail.type == 'buy'?$t('legal.sell'):$t('legal.buy')+$t('shop.fatotal')" v-model="detail.money">
          <span>CNY</span>
          <span class="all" @click="detail.money = detail.limitation.max">{{$t('center.all')}}{{detail.type == 'buy'?$t('center.outsell'):$t('center.inbuy')}}</span>
        </div>
        <div class="inp" v-if="detail.which == 'number'">
          <input type="number" :placeholder="$t('legal.inwant')+detail.type == 'buy'?$t('legal.sell'):$t('legal.buy')+$t('number')" v-model="detail.num">
          <span>{{detail.currency_name}}</span>
          <span class="all" @click="detail.num = detail.surplus_number">{{$t('center.all')}}{{detail.type == 'buy'?$t('center.outsell'):$t('center.inbuy')}}</span>
        </div>
        <div class="tip">{{$t('legal.conactceil')}}</div>
        <div class="btns flex">
          <div class="cancel" @click="cancel">
            <span ref="remainTime">60</span><span>{{$t('shop.sceil')}}</span></div>
          <div class="ok" @click="buySell('buy')" v-if="detail.type == 'sell'">{{$t('legal.placeorder')}}</div>
          <div class="ok" @click="buySell('sell')" v-if="detail.type == 'buy'">{{$t('legal.placeorder')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      page: 1,
      sellerId: 6,
      info: { lists: { data: [] } },
      showWhich: "none",
      showDetail: false,
      detail: { money: "", num: "" },
      timer: ""
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    if (this.token) {
      // this.sellerId = this.$route.query.sellerId;
      this.getSellerInfo();
    }
  },
  methods: {
    getSellerInfo(more) {
      var that = this;
      this.showWhich = "none";
      if (!more) {
        this.page = 1;
      }
      let i = layer.load();
      this.$http({
        url: "/api/seller_info",
        params: {
          id: this.sellerId,
          page: this.page
        },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        // console.log(res);
        if (res.data.type == "ok") {
          var oldlist = this.info.lists.data;
          var newlist = res.data.message.lists.data;
          // this.info =Object.assign({}, res.data.message);
          this.page += 1;

          if (more) {
            if (newlist.length) {
              this.info.lists.data = newlist.concat(oldlist);
            } else {
              layer.msg(that.$t('nomore'));
            }
          } else {
            this.info = Object.assign({}, res.data.message);
          }
        }
      });
    },
    setDetail(item) {
      this.detail = Object.assign({ which: "money", money: "", num: "" }, item);
      this.showDetail = true;
      var time = 60;
      var that = this;
      that.timer = setInterval(function() {
        time--;
        that.$refs.remainTime.innerHTML = time;
        if (time == 0) {
          that.showDetail = false;
          clearInterval(that.timer);
        }
      }, 1000);
    },
    buySell() {
      // this.detail = Object.assign({which:'money'},item)
      // var value = this.detail.which == 'money'?detail.money:detail.num;
      var that = this;
      var value = "";
      if (this.detail.which == "money") {
        value = this.detail.money;
        if (value == "") {
          return;
        } else if ((value -0 - this.detail.limitation.min)<0) {
          layer.msg(that.$t('shop.nomin'));
          return;
        } else if ((value -0 - this.detail.limitation.max) > 0) {
          layer.msg(that.$t('shop.nomax'));
          return;
        }
      } else {
        value = this.detail.num;
        if(value == ''){
          return;
        } else if(value>this.detail.surplus_number){
          layer.msg(that.$t('shop.nomaxnum'));return;
        }
      }
      this.$http({
        url: "/api/do_legal_deal",
        method: "post",
        data: { means: this.detail.which, value: value, id: this.detail.id },
        headers:{Authorization:this.token}
      }).then(res => {
        this.showDetail = false;
        if(res.data.type == 'ok'){
          var message = res.data.message;
          layer.msg(message.msg)
          if(this.detail.type == 'sell'){
            this.$router.push({path:'/legalPay',query:{id:msg.data.id}})
          } else {
            this.$router.push({path:'/components/payCannel',query:{id:msg.data.id}})
          }
        }
        
      })
    },
    cancel() {
      clearInterval(this.timer);
      this.showDetail = false;
    }
  }
};
</script>

<style lang='scss'>
#legal-seller {
  margin: 30px auto 0;
  width: 1200px;
  // background: #f8f8f8;
  line-height: 30px;
  > .top {
    background: #f8f8f8;
    line-height: 36px;
    padding: 16px 30px;
    > .top-t {
      align-items: center;
      padding-right: 30px;
      border-right: 1px solid #ccc;
      margin-right: 30px;
      > .logo {
        margin-right: 20px;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background: #2e1b85;
        text-align: center;
      }
    }
    > .top-b {
      > div {
        width: 100px;
        text-align: center;
      }
    }
  }
  > .md {
    background: #f8f8f8;
    padding: 16px 30px;
    background: #f8f8f8;
    > div {
      margin-right: 50px;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
  > .list {
    background: #f8f8f8;
    margin-top: 20px;
    padding: 16px 30px;
    > .tab {
      margin: 16px 0;
      span {
        margin-right: 20px;
        cursor: pointer;
      }
      > .now {
           color: #785df5;
            font-weight: 600;
            border-bottom: 1px solid #785df5;
            font-weight: 600;
      }
    }
    > .ul-head {
      justify-content: space-between;
      > div {
        flex: 1;
        text-align: center;
      }
      > div:nth-child(3) {
        flex: 2;
      }
      > div:first-child {
        text-align: left;
      }
      > div:last-child {
        text-align: right;
      }
    }
    > ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 16px 0;
        border-bottom: 1px solid #ddd;
        > div {
          flex: 1;
          text-align: center;
        }

        > div:nth-child(3) {
          flex: 2;
        }
        > div:first-child {
          text-align: left;
        }
        > div:last-child {
          // text-align: right;
          // display: flex;
          height: 30px;
          span {
            float: right;
            background: #2e1b85;
            padding: 0 16px;
            border-radius: 2px;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
    > .buy-box > .sell-item,
    .sell-box > .buy-item {
      display: none;
    }
    .more {
      padding: 0 20px;
      text-align: center;
      cursor: pointer;
    }
  }
  > .buy-sell-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    > .content {
      margin: 100px auto 0;
      border-radius: 2px;
      width: 440px;
      padding: 20px 30px 26px 30px;
      background: #fff;
      line-height: 30px;
      > div:first-child {
        font-weight: 600;
      }
      > .flex {
        // display: flex;
        span:first-child {
          width: 80px;
        }
      }
      > .tab {
        margin: 10px 0 20px;
        border-bottom: 1px solid #eee;
        span {
          margin-right: 20px;
        }
        cursor: pointer;
        > .selected {
          font-weight: bold;
          color: #2e1b85;
        }
      }
      > .inp {
        display: flex;
        border-radius: 2px;
        justify-content: space-between;
        border: 1px solid #ccc;
        padding: 3px 16px;
        span {
          padding-left: 10px;
          margin-left: 10px;
        }
        .all {
          border-left: 1px solid #ccc;
          font-weight: 600;
          cursor: pointer;
        }
      }
      > .tip {
        font-size: 12px;
        margin-top: 10px 16px;
        color: #2e1b85;
      }
      > .btns {
        justify-content: space-between;

        > div {
          width: 46%;
          text-align: center;
          border-radius: 2px;
          line-height: 40px;
          cursor: pointer;
        }
        > .cancel {
          background: #ccc;
        }
        > .ok {
          background: #2e1b85;
          color: #fff;
        }
      }
    }
  }
}
</style>
