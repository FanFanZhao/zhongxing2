<template>
  <div id="legal-pay-detail" class="clr-part">
    <div class="title bg-part">
      <span v-if="msg.is_sure == 0">{{$t('legal.nofinish')}}</span>
      <span v-if="msg.is_sure == 1">{{$t('legal.finished')}}</span>
      <span v-if="msg.is_sure == 2">{{$t('legal.ceiled')}}</span>
      <span v-if="msg.is_sure == 3">{{$t('legal.payed')}}</span>
      <div v-if="msg.is_sure == 0&&msg.type == 'sell'">{{$t('legal.waitplease')}}</div>
      <div v-if="msg.is_sure == 0&&msg.type == 'buy'">{{$t('legal.youpayed')}}</div>
      <div v-if="msg.is_sure == 1">{{$t('shop.ordercom')}}</div>
      <div v-if="msg.is_sure == 2">{{$t('shop.orderceil')}}</div>
      <div v-if="msg.is_sure == 3&&msg.type == 'sell'">{{$t('shop.buyerpayed')}}</div>
       <div v-if="msg.is_sure == 3&&msg.type == 'buy'">{{$t('shop.sellerwait')}}</div>
      <!-- <div class="mt10 ft14" v-if="msg.is_sure == 3&&msg.type == 'sell'">联系方式：{{msg.phone}}</div> -->
    </div>
    <div class="info bg-part ft14">
      <div>
        <span>{{$t('legal.totalmoney')}}：</span>
        <span>￥{{msg.deal_money}}</span>
      </div>
      <div>
        <span v-if="msg.type == 'buy'">{{$t('legal.seller')}}</span>
        <span v-if="msg.type == 'sell'">{{$t('legal.buyer')}}</span>
        <span>{{realName}}</span>
        <!-- <span v-if="msg.type == 'buy'">{{msg.hes_realname}}</span>
        <span v-if="msg.type == 'sell'">{{msg.seller_name}}</span> -->
      </div>
      <div>
        <span>{{$t('price')}}：</span>
        <span>{{msg.price}}CNY</span>
      </div>
      <div>
        <span>{{$t('number')}}：</span>
        <span>{{msg.number}}{{msg.currency_name}}</span>
      </div>
      <div>
        <span>{{$t('legal.ordertime')}}：</span>
        <span>{{msg.create_time}}</span>
      </div>
        <div  v-if="(msg.is_sure == 0||msg.is_sure == 3)&&msg.type == 'buy'">
        <span>{{$t('bankcard')}}：</span>
        <span>{{msg.user_cash_info.bank_name}}:{{msg.user_cash_info.bank_account}}</span>
      </div>
      <div  v-if="(msg.is_sure == 0||msg.is_sure == 3)&&msg.type == 'buy'">
        <span>{{$t('wechat')}}：</span>
        <span>{{msg.user_cash_info.wechat_account}}</span>
      </div>
      <div  v-if="(msg.is_sure == 0||msg.is_sure == 3)&&msg.type == 'buy'">
        <span>{{$t('alipay')}}：</span>
        <span>{{msg.user_cash_info.alipay_account}}</span>
      </div>
      <div>
        <span>{{$t('legal.contact')}}：</span>
        <span v-if="msg.type == 'buy'">{{msg.user_cash_info.account_number ||$t('center.nothing')}}</span>
        <span v-if="msg.type == 'sell'">{{msg.phone ||$t('center.nothing')}}</span>
      </div>
      <div>
        <span>{{$t('legal.reference')}}：</span>
        <span>{{msg.id}}</span>
      </div>
      <!-- <div >
        <span>商家账户：</span>
        <router-link :to="{path:'/legalSeller',query:{sellerId:msg.seller_id}}" tag="span" class="light_blue seller">{{msg.seller_name}}</router-link>
      </div> -->
      <div class="btns">
        <div class="btn" @click="showCancel = true" v-if="msg.is_sure == 0">{{$t('legal.orderceil')}}</div>
        <div class="btn blue_bg" @click="hasPay = true" v-if="msg.is_sure == 0 && msg.type =='buy'">{{$t('legal.mypayed')}}</div>
        <div class="btn blue_bg" @click="showConfirm = true" v-if="(msg.is_sure == 3) && (msg.type =='sell')">{{$t('legal.surepay')}}</div>
         <div class="btn" style="background:#ccc;color:#333;" @click="showCancel = true" v-if="(msg.is_sure == 3) && (msg.type =='sell')">{{$t('legal.orderceil')}}</div>
      </div>
    </div>
    <div class="cancel-box" v-if="showCancel">
      <div class="content">
        <div>{{$t('legal.ceilorder')}}</div>
        <div>{{$t('legal.ceilnot')}}</div>
        <!-- <div>
          <input type="checkbox" v-model="hasPay" id="haspay">
          <label for="haspay">我还没有付款给对方</label>
        </div> -->
        <div class="yes-no flex">
          <div @click="showCancel = false">{{$t('legal.ceil')}}</div>
          <div @click="cancel">{{$t('legal.confirm')}}</div>
        </div>
      </div>
    </div>
    <div class="confirm-box" v-if="hasPay">
      <div class="content">
        <div>{{$t('legal.paysure')}}</div>
        <div>{{$t('legal.youpayed')}}</div>
        <div>{{$t('legal.freeze')}}</div>
        <div class="yes-no flex">
          <div @click="hasPay = false">{{$t('legal.ceil')}}</div>
          <div @click="confirm">{{$t('legal.confirm')}}</div>
        </div>
      </div>
    </div>
    <div class="confirm-box" v-if="showConfirm">
      <div class="content">
        <div>{{$t('legal.surepay')}}</div>
        <div>{{$t('legal.otherpay')}}</div>
        <div class="yes-no flex">
          <div @click="showConfirm = false">{{$t('legal.ceil')}}</div>
          <div @click="confirm_receive">{{$t('legal.confirm')}}</div>
        </div>
      </div>
    </div>
    <!--密码框-->
    <div class="shdow flex alcenter center" v-if="isshow">
       <div class="psw_wrap flex column center">
          
            <p class="tc">请输入交易密码</p>
            <input class="mt20" type="password" v-model="psw" />
            <div class="btn_wrap flex alcenter center mt20">
              <div class="no" @click="isshow = false">取消</div>
              <div class="yes" @click="yes">确定</div>
            </div>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      token:'',
      showConfirm:false,
      showCancel:false,
      hasPay:false,
      id:'',
      msg:{},
      realName:'',
      isshow:false,
      psw:''
    };
  },
  created() {
    var token = window.localStorage.getItem("token") || "";
      // this.id = this.$route.query.id;
    if (token) {
      this.token = token;
      this.id = this.$route.query.id || '';
      this.getMsg()
    }
  },
  methods: {
    getMsg(){
      var i = layer.load();
      this.$http({
        url:'/api/legal_deal',
        params:{id:this.id},
        headers:{Authorization:this.token}
      }).then(res => {
        layer.close(i);
        console.log(res);
        if(res.data.type == 'ok'){
          this.msg = res.data.message;
          this.realName = res.data.message.user_cash_info.real_name;
        }
      })
    },
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
        }
      });
    },
    cancel(){
      var i = layer.load();
      this.$http({
        url:'/api/user_legal_pay_cancel',
        method:'post',
        data:{id:this.id},
        headers:{Authorization:this.token}
      }).then(res => {
        layer.close(i);
        // console.log(res);
        layer.msg(res.data.message);
         this.showCancel = false;
         setTimeout(() => {
           location.reload()
        }, 1000);
      })
    },
    confirm_receive(){
      this.isshow = true;
      this.showConfirm = false;
      // var i = layer.load();
      // this.$http({
      //   url:'/api/legal_deal_user_sure',
      //   method:'post',
      //   data:{id:this.id},
      //   headers:{Authorization:this.token}
      // }).then(res => {
      //   layer.close(i);
      //   // console.log(res);
      //   layer.msg(res.data.message);
      //   setTimeout(() => {
      //      location.reload()
      //   }, 1000);
        
      // }).then(() => {
      //   this.showConfirm = false;
      // })
    },
    yes(){
        var i = layer.load();
        this.$http({
          url:'/api/legal_deal_user_sure',
          method:'post',
          data:{id:this.id,pay_password:this.psw},
          headers:{Authorization:this.token}
        }).then(res => {
          layer.close(i);
          // console.log(res);
          layer.msg(res.data.message);
          setTimeout(() => {
            location.reload()
          }, 1000);
          
        }).then(() => {
          this.showConfirm = false;
        })
    },
    confirm(){
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
    }
  }
};
</script>

<style lang='scss'>
#legal-pay-detail {
  width: 1200px;
  margin: 50px auto;
  > .title {
    background: #f8f8f8;
    margin-bottom: 20px;
    padding: 0  0 20px 30px;
    span{
      font-size: 20px;
      line-height: 50px;
      font-weight: bold;
    }
    div{
      font-size: 12px;
    }
  }
  > .info {
    background: #f8f8f8;
    padding: 0 30px;
    line-height: 40px;
    >div{
      display: flex;
    }
    span:first-child{
      width:150px;
    }
    >.btns{
      padding: 20px 0;
     
      >div{
         cursor: pointer;
        color: #fff;
        border-radius: 2px;
        padding: 0 16px;
        background: #2E1B85;
        margin-right: 30px;
        font-size: 14px;
      }
      >div:first-child{
        background: #ccc;
        color: #333;
      }
    }
  }
  >.cancel-box,>.confirm-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    >.content{
      margin: 200px auto 0;
      border-radius: 2px;
      width: 360px;
      background: #fff;
      line-height: 40px;
      text-align: center;
      >div:first-child{
        font-weight: 600;
      }
      >.flex{
        margin-top: 10px;
        border-top: 1px solid #ccc;
        cursor: pointer;
        div{
          width: 50%;
        }
        >div:first-child{
          border-right: 1px solid #ccc;
        }
      }
    }
  }
  .seller{
    cursor: pointer;
  }
   .shdow{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
  }
  .psw_wrap{
    width: 450px;
    height: 200px;
    background: #fff;
    border-radius: 5px;
  }
  .psw_wrap input{
    border: 1px solid #ccc;
    width: 70%;
    margin: 0 auto;
    line-height: 50px;
    margin-top: 20px;
    border-radius: 5px;
    padding: 0 12px;
  }
  .yes{
    margin-left: 50px;
    background: #f56c6c;
  }
  .no{
    background: #69c03f;
  }
  .yes,.no{
    padding: 8px 15px;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }
}
</style>
