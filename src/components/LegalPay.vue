<template>
  <div id="legal-pay" class="bg-main clr-part">
    
    <div class="title bg-part ft16">
      <span v-if="msg.is_sure == 0&&msg.type =='buy'">请付款，请向以下账户付款</span>
      <div v-if="msg.is_sure == 1">订单已完成</div>
      <div v-if="msg.is_sure == 2">订单已取消</div>
      <div v-if="msg.is_sure == 3&&msg.type =='buy'">已付款，等待商家确认收款</div>
      
      <span v-if="msg.is_sure == 0 && msg.type =='buy'">{{msg.deal_money}}CNY</span>
      
    </div>
    <div class="info bg-part ft14">
      <div class="flex">
        <span>交易单价：</span>
        <span>{{msg.price}}CNY</span>
      </div>
      <div class="flex">
        <span>交易数量：</span>
        <span>{{msg.number}}{{msg.currency_name}}</span>
      </div>
      <div class="flex">
        <span>下单时间：</span>
        <span>{{msg.create_time}}</span>
      </div>
      <div class="flex" v-if="msg.is_sure == 0||msg.is_sure == 3&&msg.type =='buy'">
        <span>银行卡号：</span>
        <span>{{msg.user_cash_info.bank_name}}:{{msg.user_cash_info.bank_account}}</span>
      </div>
      <div class="flex" v-if="msg.is_sure == 0||msg.is_sure == 3&&msg.type =='buy'">
        <span>微信：</span>
        <span>{{msg.user_cash_info.wechat_account}}</span>
      </div>
      <div class="flex" v-if="msg.is_sure == 0||msg.is_sure == 3&&msg.type =='buy'">
        <span>支付宝：</span>
        <span>{{msg.user_cash_info.alipay_account}}</span>
      </div>
      <div class="flex">
        <span>{{msg.type == 'buy'?'商家':'买家'}}账户：</span>
        <span v-if="msg.type == 'buy'">{{msg.user_cash_info.real_name}}</span>
      <router-link v-if="msg.type=='buy'" :to="{path:'/legalSeller',query:{sellerId:msg.seller_id}}" tag="span">{{msg.seller_name}}</router-link>
      </div>
      <div class="flex">
        <span>{{msg.type == 'buy'?'商家':'买家'}}电话：</span>
        <span v-if="msg.user_cash_info">{{msg.user_cash_info.account_number}}</span>
      </div>
      
      
      
      <div class="btns flex" v-show="msg.is_sure==0&&msg.type=='buy'">
        <div class="btn" @click="showCancel = true">取消订单</div>
        <div class="btn" @click="showConfirm = true">我已付款，点击确认</div>
      </div>
      <!-- <div class="btns flex" v-show="msg.is_sure==3&&msg.type=='sell'">
        <div class="btn" @click="">确认收款</div>
      </div> -->
    </div>
    <div class="cancel-box" v-if="showCancel">
      <div class="content">
        <div>取消交易</div>
        <div>如您已向卖家付款请千万不要取消交易</div>
        <!-- <div>
          <input type="checkbox" v-model="hasPay" id="haspay">
          <label for="haspay">我还没有付款给对方</label>
        </div> -->
        <div class="yes-no flex">
          <div @click="showCancel = false">取消</div>
          <div @click="cancel">确认</div>
        </div>
      </div>
    </div>
    <div class="confirm-box" v-if="showConfirm">
      <div class="content">
        <div>付款确认</div>
        <div>请确认您已向卖家付款</div>
        <div>恶意点击将直接冻结账户</div>
        <div class="yes-no flex">
          <div @click="showConfirm = false">取消</div>
          <div @click="confirm">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: {type:'sell'},
      token: "",
      showConfirm: false,
      showCancel: false,
      hasPay: false,
      id: "",
      // type: "",
      // is_sure: -1
    };
  },
  created() {
    var token = window.localStorage.getItem("token") || "";
    if (token) {
      this.token = token;
      this.id = this.$route.query.id;
      this.type = this.$route.query.type;
      console.log(this.$route.query.id, this.id);
      this.getData();
    }
  },
  methods: {
    getData() {
      var i = layer.load();
      this.$http({
        url: "/api/legal_deal",
        params: {
          id: this.id
        },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        console.log(res);
        if (res.data.type == "ok") {
          this.msg = res.data.message;
          this.is_sure = res.data.message.is_sure;
        }
      });
    },
    cancel() {
      var i = layer.load();
      this.$http({
        url: "/api/user_legal_pay_cancel",
        method: "post",
        data: { id: this.id },
        headers: { Authorization: this.token }
      })
        .then(res => {
          layer.close(i);
          // console.log(res);
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            setTimeout(() => {
              location.reload();
              // this.$router.push('/legalRecord')
            }, 1000);
          }
        })
        .then(() => {
          this.showCancel = false;
        });
    },
    confirm() {
      var i = layer.load();
      this.$http({
        url: "/api/user_legal_pay",
        method: "post",
        data: { id: this.id },
        headers: { Authorization: this.token }
      })
        .then(res => {
          layer.close(i)
          // console.log(res);
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            setTimeout(() => {
              location.reload();
              // this.$router.push('/legalRecord')
            }, 1000);
          }
        })
        .then(() => {
          this.showConfirm = false;
        });
    }
  }
};
</script>

<style lang='scss'>
#legal-pay {
  width: 1200px;
  margin: 50px auto;
  > .title {
    background: #f8f8f8;
    margin-bottom: 20px;
    padding: 20px 0;
    // font-size: 20px;
    // line-height: 60px;
    > span {
      padding: 0 30px;
    }
    > div {
      padding: 0 30px 0;
    }
    > span:last-child {
      font-weight: 600;
    }
  }
  > .info {
    background: #f8f8f8;
    padding: 0 30px;
    line-height: 40px;
    
    span:first-child {
      width: 140px;
    }
    > .btns {
      padding: 20px 0;
      cursor: pointer;
      > div {
        color: #fff;
        border-radius: 2px;
        padding: 0 16px;
        background: #2e1b85;
        margin-right: 30px;
        font-size: 14px;
      }
      > div:first-child {
        background: #ccc;
        color: #333;
      }
    }
  }
  > .cancel-box,
  > .confirm-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    > .content {
      margin: 200px auto 0;
      border-radius: 2px;
      width: 360px;
      background: #fff!important;
      line-height: 40px;
      text-align: center;
      > div:first-child {
        font-weight: 600;
      }
      > .flex {
        margin-top: 10px;
        border-top: 1px solid #ccc;
        cursor: pointer;
        div {
          width: 50%;
        }
        > div:first-child {
          border-right: 1px solid #ccc;
        }
      }
    }
  }
}
</style>
