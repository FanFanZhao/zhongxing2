<template>
  <div id="legal-shop-detail">
    <div class="top flex bg-part clr-part ft14" v-if="info.name">
      <div class="top-t flex bdr-part">
        <div class="logo white blue_bg">{{info.name.charAt(0)}}</div>
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
          <div>{{(info.done == 0 || info.total == 0)?0:(((info.done-0)/(info.total-0)-0)*100).toFixed(4)}}%</div>
          <div>{{$t('shop.comrate')}}</div>
        </div>
      </div>
      <div class="submit flex">
        <div class="blue_bg" @click="showSubmit = true">{{$t('shop.release')}}</div>
      </div>
    </div>
    <div class="md flex clr-part bg-part ft14">
      <div>
        <span>{{$t('shop.email')}}</span>
        <img v-if="info.prove_email == 1" src="../assets/images/success.png" alt>
        <img v-else src="../assets/images/icon_error.png" alt>
      </div>
      <div>
        <span>{{$t('shop.phone')}}</span>
        <img v-if="info.prove_mobile == 1" src="../assets/images/success.png" alt>
        <img v-else src="../assets/images/icon_error.png" alt>
      </div>
      <div>
        <span>{{$t('shop.truename')}}</span>
        <img v-if="info.prove_real == 1" src="../assets/images/success.png" alt>
        <img v-else src="../assets/images/icon_error.png" alt>
      </div>
      <div>
        <span>{{$t('shop.high')}}</span>
        <img v-if="info.prove_level == 1" src="../assets/images/success.png" alt>
        <img v-else src="../assets/images/icon_error.png" alt>
      </div>
    </div>
    <div class="list bg-part clr-part ft14">
      <div class="tab">
        <div class="flex">
          <div>{{$t('shop.type')}}：</div>
          <div>
            <span
              :class="{'now':filterPms.type == 'sell'}"
              @click="filterPms.type = 'sell';getList()"
            >{{$t('shop.mysell')}}</span>
            <span
              :class="{'now':filterPms.type == 'buy'}"
              @click="filterPms.type = 'buy';getList()"
            >{{$t('shop.mybuy')}}</span>
          </div>
        </div>
        <div class="flex">
          <div>{{$t('status')}}：</div>
          <div>
            <span
              :class="{'now':filterPms.wasDone == false}"
              @click="filterPms.wasDone = false;getList()"
            >{{$t('legal.nofinish')}}</span>
            <span
              :class="{'now':filterPms.wasDone == true}"
              @click="filterPms.wasDone = true;getList()"
            >{{$t('legal.finished')}}</span>
          </div>
        </div>
      </div>
      <div class="ul-head">
        <div class="w10">{{$t('market.currency')}}</div>
        <div class="w15">{{$t('number')}}</div>
        <div class="w20">{{$t('legal.limit')}}</div>
        <div class="w15">{{$t('price')}}</div>
        <div class="w10">{{$t('legal.pay')}}</div>
        
        <div v-if="filterPms.type == 'buy'" class="w10">{{$t('legal.paywait')}}</div>
        <div v-if="filterPms.type == 'sell'" class="w10">{{$t('legal.payed')}}</div>
        <div>{{$t('do')}}</div>
      </div>
      <ul :class="[showWhich+'-box']">
        <li
          v-for="(item,index) in list"
          :key="index"
          :class="[item.type == 'buy'?'buy-item':'sell-item']"
          class="bdr-part"
        >
          <div class="w10">{{item.currency_name}}</div>
          <div class="w15">{{item.surplus_number}}</div>
          <div class="w20">{{(item.limitation.min-0).toFixed(4)}}-{{(item.limitation.max-0).toFixed(4)}}</div>
          <div class="w15">{{item.price}}</div>
          <!-- <div class="w10">{{item.way_name}}</div> -->
           <div class="w10 pay_type">
             <img src="../assets/images/wx_icon.png">
             <img src="../assets/images/zfb_icon.png">
             <img src="../assets/images/bank_icon.png">
           </div>
          <div v-if="filterPms.type == 'buy'"  class="w10">{{item.wait_confirm}}</div>
          <div v-if="filterPms.type == 'sell'"  class="w10">{{item.paid_confirm}}</div>
          <div>
            <span class="blue_bg" @click="changeOrder('error_send',item.id)" v-if="item.is_done!=1">{{$t('shop.abnormal')}}</span>
            <span class="blue_bg" @click="changeOrder('back_send',item.id)" v-if="item.is_done!=1">{{$t('revoke')}}</span>
            <router-link class="blue_bg" tag="span" :to="{path:'/shopLegalRecord',query:{id:item.id}}">{{$t('shop.seeorder')}}</router-link>
          </div>
        </li>
      </ul>
      <div class="more" @click="getList(true)" v-if="list.length">{{$t('more')}}</div>
      <div class="more" v-else>{{$t('nomore')}}</div>
    </div>
    <div class="submit-box" v-if="showSubmit">
      <div class="content">
        <div
          class="close"
          @click="showSubmit = false;submitPms = {type:'sell',way:'-1',price:'',min_number:'',total_number:''}"
        >X</div>
        <div class="tab">
          <div>{{$t('shop.choosetype')}}：</div>
          <div :class="{'now':submitPms.type == 'sell'}" @click="submitPms.type = 'sell'">{{$t('shop.sell')}}</div>
          <div :class="{'now':submitPms.type == 'buy'}" @click="submitPms.type = 'buy'">{{$t('shop.buy')}}</div>
        </div>
        <div class="flex">
          <span>{{$t('market.currency')}}：</span>
          <span>{{info.currency_name}}</span>
        </div>
        <div class="flex">
          <span>{{$t('legal.limit')}}：</span>
          <span>{{min}} - {{max}}</span>
        </div>
        <!-- <div class="flex">
          <span>{{$t('legal.pay')}}：</span>
          <select name id v-model="submitPms.way">
            <option value="-1">{{$t('shop.pchoose')}}</option>
            <option value="ali_pay">{{$t('alipay')}}</option>
            <option value="we_chat">{{$t('wechat')}}</option>
            <option value="bank">{{$t('bankcard')}}</option>
          </select>
        </div> -->
        <div class="flex">
          <span>{{$t('price')}}：</span>
          <input type="number" v-model="submitPms.price">
        </div>
        <div class="flex">
          <span>{{$t('number')}}：</span>
          <input type="number" v-model="submitPms.total_number">
        </div>
        <div class="flex">
          <span>{{$t('minAm')}}：</span>
          <input type="number" v-model="submitPms.min_number">
        </div>
        <div class="btn blue_bg" @click="legalSend">{{$t('shop.release')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      sellerId: "",
      min: "",
      max: "",
      currencyId: "",
      info: { lists: { data: [] } },
      showWhich: "none",
      showSubmit: false,
      detail: { money: "", num: "" },
      timer: "",
      filterPms: { id: "", page: 1, wasDone: false, type: "sell" },
      list: [],
      submitPms: {
        type: "sell",
        price: "",
        way: "-1",
        total_number: "",
        min_number: ""
      }
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    if (this.token) {
      this.sellerId = this.$route.query.id || "";
      this.min = this.$route.query.min;
      this.max = this.$route.query.max;
      this.getSellerInfo();
      this.getList();
    }
  },
  filters: {
    getPercent(done, total) {
      if (done == 0 || total == 0) {
        return 0;
      } else {
      }
    }
  },
  methods: {
    getSellerInfo(more) {
      this.showWhich = "none";
      if (!more) {
        this.page = 1;
      }
      let i = layer.load();
      this.$http({
        url: "/api/seller_info",
        params: {
          id: this.sellerId,
          page: 1
        },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        // console.log(res);
        if (res.data.type == "ok") {
          this.info = Object.assign({}, res.data.message);
          this.currencyId = res.data.message.currency_id;
        }
      });
    },
    getList(more = false) {
      var that = this;
      var pms = {};
      if (!more) {
        this.filterPms.page = 1;
      }
      pms.page = this.filterPms.page;
      if (this.filterPms.type != "none") {
        pms.type = this.filterPms.type;
      }
      if (this.filterPms.wasDone != "none") {
        pms.was_done = this.filterPms.wasDone;
      }
      pms.id = this.sellerId;
      var i = layer.load();
      this.$http({
        url: "/api/seller_trade",
        params: pms,
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          var msg = res.data.message;
          if (more) {
            if (msg.data.length) {
              this.list = this.list.concat(msg.data);
              this.filterPms.page += 1;
            } else {
              layer.msg(that.$t('nomore'));
            }
          } else {
            this.list = msg.data;
            if (msg.data.length) {
              this.filterPms.page += 1;
            }
          }
        }
      });
    },
    changeOrder(url, id) {
      var i = layer.load();
      this.$http({
        url: "/api/" + url,
        method: "post",
        data: { id: id },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          layer.msg(res.data.message);
          this.getList();
        } else {
          layer.msg(res.data.message);
        }
      });
    },
    legalSend() {
      var that = this;
      if (this.submitPms.price == "") {
        layer.msg(that.$t('lay.mprice'));
        return;
      } else if (this.submitPms.min_number == "") {
        layer.msg(that.$t('lay.minnum'));
        return;
      } else if (this.submitPms.min_number - 0 - this.min < 0) {
        layer.msg(that.$t('lay.lessnum') + this.min);
        return;
      } else if (this.submitPms.total_number - 0 - this.max > 0) {
        layer.msg(that.$t('lay.morenum') + this.max);
        return;
      } else if (this.submitPms.total_number == "") {
        layer.msg(that.$t('lay.mnum'));
        return;
      } else if (
        this.submitPms.min_number - 0 - this.submitPms.total_number >
        0
      ) {
        layer.msg(that.$t('lay.notnum'));
        return;
      }
      var pms = Object.assign({ currency_id: this.currencyId }, this.submitPms);
      var i = layer.load();
      this.$http({
        url: "/api/legal_send",
        method: "post",
        data: pms,
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        layer.msg(res.data.message);
        console.log(res);
        this.showSubmit = false;
        this.filterPms.wasDone = false;
        this.filterPms.type = pms.type;
        this.getList();
        this.submitPms = {
          type: "sell",
          way: "-1",
          price: "",
          min_number: "",
          total_number: ""
        };
        if (res.data.type == "ok") {
        }
      });
    }
  }
};
</script>

<style lang='scss'>
.pay_type img{
  width: 20px;
  margin-right: 5px;
}
#legal-shop-detail {
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
        line-height: 50px;
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
    > .submit {
      align-items: center;
      justify-content: flex-end;
      > div {
        border-radius: 2px;
        margin-left: 30px;
        color: #fff;
        padding: 0 16px;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        background: #2e1b85;
        cursor: pointer;
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
        vertical-align: middle;
      }
    }
  }
  > .list {
    background: #f8f8f8;
    margin-top: 20px;
    padding: 5px 30px 16px;
    > .tab {
      margin: 16px 0;
      > .flex {
        > div:first-child {
          width: 80px;
        }
      }
      span {
        margin-right: 20px;
        cursor: pointer;
      }
      .now {
        color: #194B64;
        font-weight: 600;
      }
    }
    > .ul-head {
      height: 30px;
      overflow: hidden;
      > div {
        // text-align: center;
        float: left;
      }
      > div:last-child {
        float: right;
      }
    }
    > ul {
      li {
        padding: 16px 0;
        height: 62px;
        border-bottom: 1px solid #ddd;
        > div {
          float: left;
        }
        > div:last-child {
          float: right;
        }
        // > div:nth-child(3) {
        //   flex: 2;
        // }
        // > div:first-child {
        //   text-align: left;
        //   flex: 0.5;
        // }
        > div:last-child {
          // text-align: right;
          // display: flex;
          height: 30px;
          span {
            float: right;
            background: #2e1b85;
            padding: 0 12px;
            border-radius: 2px;
            color: #fff;
            cursor: pointer;
            font-size: 12px;
            margin-right: 5px;
          }
        }
      }
    }
    > .buy-box > .sell-item,
    .sell-box > .buy-item {
      display: none;
    }
    .more {
      padding: 20px 20px;
      text-align: center;
      cursor: pointer;
    }
  }
  > .submit-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    > .content {
      position: relative;
      margin: 100px auto 0;
      border-radius: 4px;
      width: 440px;
      padding: 20px 30px 26px 30px;
      background: #fff;
      line-height: 30px;
      > .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: 2px 10px;
        cursor: pointer;
      }
      > .tab {
        display: flex;
        > div {
          margin-right: 50px;
        }
        .now {
          font-weight: 600;
          padding-bottom: 3px;
          color: #194B64;
          border-bottom: 2px solid #194B64;
        }
      }
      > .btn {
        background: #2e1b85;
        color: #fff;
        border-radius: 2px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
      > .flex {
        // display: flex;
        margin-bottom: 20px;
        span {
          width: 130px;
        }
        input {
          border-radius: 2px;
          border: 1px solid #ccc;
          padding: 0 16px;
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
