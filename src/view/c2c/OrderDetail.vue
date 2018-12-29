<template>
  <div id="c2c-detail">
    <!-- <div class="flex">
      <span>{{$t('c2c.timer')}}：</span>
      <span>{{detail.create_time}}</span>
    </div>
    <div class="flex">
      <span>{{$t('c2c.type')}}</span>
      <span>{{detail.type =='buy'?$t('c2c.buy'):$t('c2c.sell')}}</span>
    </div>
    <div class="flex">
      <span>{{$t('c2c.price')}}：</span>
      <span>{{detail.price}}</span>
    </div>
    <div class="flex">
      <span>{{$t('c2c.num')}}：</span>
      <span>{{detail.number}}</span>
    </div>
    <div class="flex">
      <span>{{$t('c2c.payType')}}：</span>
      <img v-if="detail.way=='ali_pay'" src="../../assets/images/zfb_icon.png" alt>
      <img v-else-if="detail.way=='we_chat'" src="../../assets/images/wx_icon.png" alt>
      <img v-else src="../../assets/images/bank_icon.png" alt>
    </div> -->
    <!-- <el-button type="danger" size="small" @click="cancel">{{$t('c2c.cancelp')}}</el-button> -->
    <div class="mask">
        <div class="content">
          <!-- <i class="el-icon-close" @click="selId = ''"></i> -->
          <div class="flex">
            <span>{{$t('c2c.currency')}} ：</span>
            <div>{{detail.currency_name}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.timer')}}：</span>
            <div>{{detail.create_time}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.onePrice')}}：</span>
            <div>{{detail.price}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.num')}}：</span>
            <div>{{detail.number}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.totalmoney')}}：</span>
            <div>{{detail.total_price}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.name')}}：</span>
            <div>{{realName}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.connect')}}：</span>
            <div>{{detail.other_phone}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.ailipay')}}：</span>
             <div>{{alipayaccount}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.wxName')}}：</span>
             <div>{{wechatname}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.wx')}}：</span>
             <div>{{wechataccount}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.bankName')}}：</span>
            <div>{{bankaccountname}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.bankcard')}}：</span>
            <div>{{bankaccount}}</div>
            <!-- <div>{{filterPms.type == 'sell'?detail.cny_uci.pay_account:detail.currency_uci.pay_account}}</div> -->
          </div>
          <!-- <div class="flex">
            <span>{{$t('c2c.payAccount')}}：</span>
            <div>{{filterPms.type == 'sell'?detail.cny_uci.pay_account:detail.currency_uci.pay_account}}</div>
          </div> -->
          <!-- <div class="flex">
            <span>{{$t('c2c.payType')}}：</span>
            <div>{{filterPms.type == 'sell'?detail.cny_uci.pay_name:detail.currency_uci.pay_name}}</div>
          </div> -->
          <!-- <div class="flex">
            <span>名称：</span>
            <div>{{detail.cny_uci.pay_name}}</div>
          </div> -->
          <!-- <div class="flex" v-if="detail.status != 1">
            <span>状态：</span>
            <div v-if="detail.status == 2">已付款</div>
            <div v-if="detail.status == 3">已完成</div>
            <div v-if="detail.status == 4">已取消</div>
          </div>
          <div class="flex btns" v-if="detail.status == 1">
            <el-button @click="cancel" size="medium" >取消交易</el-button>
            <el-button type="danger" @click="confirm" size="medium">确认付款</el-button>
          </div> -->
          <div>
          <!-- <el-button  v-if="detail.status == 1 || detail.status == 2" size="medium" @click="cancel(detail.id,types,detail.status,'cancel')" type="danger">{{$t('c2c.cancelOrder')}}</el-button> -->
          <el-button v-if="detail.status == 1&&types == 'buy'" size="medium" @click="confirmPay(detail.id,types,detail.status,'confirmPay')" type="danger">{{$t('c2c.conPay')}}</el-button>
          <el-button v-if="detail.status == 2&&types == 'sell'" size="medium" @click="confirm(detail.id,types,detail.status,'confirm')" type="danger">{{$t('c2c.conReceive')}}</el-button>
         
          <el-button v-if="detail.status == 2&&types=='buy'" type="success" size="medium" disabled>{{$t('c2c.payed')}}</el-button>
          <el-button v-if="detail.status == 3" type="success" size="medium" disabled>{{$t('c2c.completed')}}</el-button>
          <el-button v-if="detail.status == 4" type="info" size="medium" disabled>{{$t('c2c.canceled')}}</el-button>
        </div>
        </div>
      </div>
      <!--密码框-->
    <div class="shdow flex alcenter center" v-if="isshow">
       <div class="psw_wrap flex column center">
          
            <p class="tc">请输入交易密码</p>
            <input class="mt20" type="password" v-model="psw" />
            <div class="btn_wrap flex alcenter center mt20">
              <div class="no" @click="no">取消</div>
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
      token: "",
      id: "",
      detail: {},
      types:'',
      isshow:false,
      psw:'',
      cancelOrconfirm:'',
      cid:'',
      realName:'',
      alipayaccount:'',
      wechatname:'',
      wechataccount:'',
      bankaccountname:'',
      bankaccount:''
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    this.id = this.$route.query.id || "";
    this.types = this.$route.query.types || "";
    this.getDetail();
  },
  methods: {
    getDetail() {
      if (this.id && this.token) {
        var i = layer.load();
        this.$http({
          url: "/api/ctoc/order_detail",
          method: "post",
          data: { id: this.id },
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          console.log(res);
          if (res.data.type == "ok") {
            var msg = res.data.message
            this.detail = res.data.message;
            this.realName = msg[msg.other_identity].real_name;
            this.wechatname = msg[msg.other_identity].we_chat_account_name;
            this.alipayaccount = msg[msg.other_identity].ali_pay_account;
            this.wechataccount = msg[msg.other_identity].we_chat_account;
            this.bankaccountname = msg[msg.other_identity].bank_account_name;
            this.bankaccount = msg[msg.other_identity].bank_account;
          }
        });
      }
    },
    // cancel() {
    //   if (this.token) {
    //     var i = layer.load();
    //     this.$http({
    //       url: "/api/ctoc/cancel",
    //       method: "post",
    //       data: { id: this.id },
    //       headers: { Authorization: this.token }
    //     }).then(res => {
    //       layer.close(i);
    //       console.log(res);
    //       layer.msg(res.data.message);
    //       if (res.data.type == "ok") {
    //         this.$router.go(-1);
    //       }
    //     });
    //   }
    // },
    // confirmPay(){

    // },
    // confirm(){

    // },
    ///////////
        cancel(id,type,status,canconfirm) {
      this.cancelOrconfirm = canconfirm;
      if((type == 'buy' || type == 'sell')&& (status == 2||status == 1)){
        console.log('hahahah')
          this.isshow = true;
          // this.type = type;
          this.state = status;
          this.cid = id
      }else{
         if (this.token) {
        var i = layer.load();
        this.$http({
          url: "/api/ctoc/cancel",
          method:'post',
          data: { id: id },
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          layer.msg(res.data.message);
          if(res.data.type == 'ok'){
            this.getList()
          }
          console.log(res);
        });
      }
      }
      
    },
    confirmPay(id,type,status,canconfirm) {
      // this.cancelOrconfirm = canconfirm;
      // this.isshow = true;
      // this.id = id;
      // // this.type = type;
      // this.state = status;
      var i = layer.load();
      this.$http({               //确认付款  
        url: "/api/ctoc/pay",
        method: "post",
        data: { id: this.id},
        headers: { Authorization: this.token }
      }).then(res => {
         this.psw = '';
        layer.close(i);
        this.selId = '';
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
         location.reload();
        }
      });  
    },
    confirm(id,canconfirm) {
      this.cancelOrconfirm = canconfirm;
       this.isshow = true;
       this.id = id;
      //  this.type = type;
      this.state = status;
    },
    yes(){
      this.isshow = false;
     
      if((this.types == 'buy' || this.types == 'sell')&& (this.state == 2||this.state == 1)&&this.cancelOrconfirm == 'cancel'){  //用户已付款或确认收款取消订单时
         if (this.token) {
        var i = layer.load();
        this.$http({
          url: "/api/ctoc/cancel",
          method:'post',
          data: { id: this.cid,pay_password:this.psw },
          headers: { Authorization: this.token }
        }).then(res => {
           this.psw = '';
          layer.close(i);
          layer.msg(res.data.message);
          if(res.data.type == 'ok'){
            location.reload();
          }
          console.log(res);
        });
      }
      }else{
        if(this.types == 'buy'&&this.cancelOrconfirm == 'confirmPay'){
          
      }else{
        var i = layer.load();
      this.$http({
        url: "/api/ctoc/confirm",
        method: "post",
        data: { id:this.id,pay_password:this.psw },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        this.selId = '';
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          location.reload();
        }
      });
      }
      }
       
    },
    no(){
        this.isshow = false;
        this.psw = '';
    }
  }
};
</script>

<style lang='scss' scoped>
#c2c-detail {
  margin: 30px auto;
  padding: 20px 30px;
  width: 1200px;
  background: #fff;
  > .flex {
    line-height: 40px;
    span {
      min-width: 90px;
    }
    img {
      margin-top: 10px;
      width: 20px;
      height: 20px;
    }
  }
  .el-button {
    margin-top: 20px;
    width: 90px;
  }
  .content div{
    margin-bottom: 10px;
  }
  .content>div>span{
    display: inline-block;
    width: 120px;
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
   padding: 0px 20px;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }
}
</style>
