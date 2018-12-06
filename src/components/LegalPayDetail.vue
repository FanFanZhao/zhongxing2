<template>
  <div id="legal-pay-detail" class="clr-part">
    <div class="title bg-part">
      <span v-if="msg.is_sure == 1">{{$t('legal.finished')}}</span>
      <span v-if="msg.is_sure == 2">{{$t('legal.ceiled')}}</span>
      <span v-if="msg.is_sure == 3">{{$t('legal.payed')}}</span>
      <div v-if="msg.is_sure == 1">{{$t('legal.ordercomplete')}}</div>
      <div v-if="msg.is_sure == 2">{{$t('legal.orderceiled')}}</div>
      <div v-if="msg.is_sure == 3">{{$t('legal.payed')}}</div>
    </div>
    <div class="info bg-part ft14">
      <div>
        <span>{{$t('legal.totalmoney')}}：</span>
        <span>{{msg.deal_money}}</span>
      </div>
      <div>
        <span>{{$t('legal.seller')}}</span>
        <span>{{msg.seller_name}}</span>
      </div>
      <div>
        <span>{{$t('price')}}：</span>
        <span>{{msg.price}}</span>
      </div>
      <div>
        <span>{{$t('number')}}：</span>
        <span>{{msg.number}}</span>
      </div>
      <div>
        <span>{{$t('legal.ordertime')}}：</span>
        <span>{{msg.format_create_time}}</span>
      </div>
      <div>
        <span>{{$t('legal.reference')}}：</span>
        <span>{{msg.id}}</span>
      </div>
      <div>
        <span>{{$t('legal.shopaccount')}}：</span>
        <router-link :to="{path:'/legalSeller',query:{sellerId:msg.seller_id}}" tag="span" >{{msg.seller_name}}</router-link>
      </div>
      <!-- <div class="btns">
        <div class="btn" @click="showCancel = true">取消订单</div>
        <div class="btn" @click="showConfirm = true">我已付款，点击确认</div>
      </div> -->
    </div>
    <div class="cancel-box clr-part" v-if="showCancel">
      <div class="content">
        <div>{{$t('legal.ceilorder')}}</div>
        <div class="ft14">{{$t('legal.notceil')}}</div>
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
    <div class="confirm-box  clr-part" v-if="showConfirm">
      <div class="content">
        <div>{{$t('legal.paysure')}}</div>
        <div class="ft14">{{$t('legal.youpayed')}}</div>
        <div class="ft14">{{$t('legal.freeze')}}</div>
        <div class="yes-no flex">
          <div @click="showConfirm = false">>{{$t('legal.ceil')}}</div>
          <div @click="confirm">{{$t('legal.confirm')}}</div>
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
      msg:{}
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
      this.$http({
        url:'/api/user_legal_pay_cancel',
        method:'post',
        data:{id:this.id},
        headers:{Authorization:this.token}
      }).then(res => {
        // console.log(res);
        lay.msg(res.data.message);
        
      }).then(() => {
        this.showCancel = false;
      })
    },
    confirm(){
      this.$http({
        url:'/api/user_legal_pay',
        method:'post',
        data:{id:this.id},
        headers:{Authorization:this.token}
      }).then(res => {
        // console.log(res);
        lay.msg(res.data.message);
        
      }).then(() => {
        this.showConfirm = false;
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
      width:140px;
    }
    >.btns{
      padding: 20px 0;
      cursor: pointer;
      >div{
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
      background: #26292b;
      margin: 200px auto 0;
      border-radius: 2px;
      width: 360px;
      border-radius: 5px;
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
}
</style>
