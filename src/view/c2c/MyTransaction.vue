<template>
  <div id="mytransaction">
    <div class="filters">
      <div class="flex">
        <span>{{$t('c2c.type')}}：</span>
        <ul class="types flex">
          <li @click="filterPms.type='buy';getList()" :class="{selected:filterPms.type=='buy'}">{{$t('c2c.buy')}}</li>
          <li @click="filterPms.type='sell';getList()" :class="{selected:filterPms.type=='sell'}">{{$t('c2c.sell')}}</li>
        </ul>
      </div>
      <!-- <div class="flex">
        <span>状态：</span>
        <ul class="types flex">
          <li @click="status!=3?status=3:status='none';getList()" :class="{selected:status==3}">已完成</li>
          <li @click="status!=3?status=3:status='none';getList()" :class="{selected:status==3}">已完成</li>
          <li @click="status!=4?status=4:status='none';getList()" :class="{selected:status==4}">已取消</li>
         
        </ul>
      </div> -->
      <div class="flex">
        <span>{{$t('c2c.currency')}}：</span>
        <ul class="coins flex">
          <li
            v-for="(coin,index) in coins"
            :key="index"
            @click="filterPms.currency_id = coin.id;getList()"
            :class="{selected:filterPms.currency_id==coin.id}"
          >{{coin.name}}</li>
        </ul>
      </div>
    </div>
    <div class="list-box">
      <div class="list-title">
        <el-row :gutter="10">
          <!-- <el-col :span="3">交易人</el-col> -->
          <el-col :span="4">{{$t('c2c.onePrice')}}</el-col>
          <el-col :span="5">{{$t('c2c.num')}}</el-col>
          <el-col :span="5">{{$t('c2c.pTime')}}</el-col>
          <el-col :span="4">{{$t('c2c.payType')}}</el-col>
          <el-col :span="6">{{$t('c2c.opera')}} | {{$t('c2c.state')}}</el-col>
        </el-row>
      </div>
      <el-row :gutter="10" v-for="(item,index) in list" :key="index">
        <!-- <el-col :span="3">{{item.cny_uci.pay_account}}</el-col> -->

        <el-col :span="4">{{item.price}}</el-col>
        <el-col :span="5">{{item.number}}</el-col>
        <el-col :span="5">{{item.create_time}}</el-col>
        <el-col :span="4">
          <div class="pay">
            <!-- <img v-if="item.way=='ali_pay'" src="../../assets/images/zfb_icon.png" alt>
            <img v-else-if="item.way=='we_chat'" src="../../assets/images/wx_icon.png" alt>
            <img v-else src="../../assets/images/bank_icon.png" alt> -->
            <img src="../../assets/images/zfb_icon.png" />
            <img src="../../assets/images/wx_icon.png" />
            <img src="../../assets/images/bank_icon.png" />
          </div>
        </el-col>
        <el-col :span="6">
          <!-- <el-button  v-if="item.status == 1 || item.status == 2" size="mini" @click="cancel(item.id,item.type,item.status,'cancel')" type="danger">{{$t('c2c.cancelOrder')}}</el-button> -->
          <el-button v-if="item.status == 1&&filterPms.type == 'buy'" size="mini" @click="confirmPay(item.id,item.type,item.status,'confirmPay')" type="danger">{{$t('c2c.conPay')}}</el-button>
          <el-button v-if="item.status == 2&&filterPms.type == 'sell'" size="mini" @click="confirm(item.id,item.type,item.status,'confirm')" type="danger">{{$t('c2c.conReceive')}}</el-button>
         
          <el-button v-if="item.status == 2&&filterPms.type=='buy'" type="success" size="mini" disabled>{{$t('c2c.payed')}}</el-button>
          <el-button v-if="item.status == 3" type="success" size="mini" disabled>{{$t('c2c.completed')}}</el-button>
          <el-button v-if="item.status == 4" type="info" size="mini" disabled>{{$t('c2c.canceled')}}</el-button>
          <el-button size="mini" @click="getDetail(item.id,item.type)">{{$t('c2c.detail')}}</el-button>
          <!-- <router-link :to="{path:'/orderDetail',query:{id:item.id}}">
          </router-link>-->
        </el-col>
      </el-row>
      <div v-if="!list.length" class="tip tc" style="padding:20px">{{$t('c2c.notMore')}}</div>
      <div class="mask" v-if="selId != ''">
        <div class="content">
          <i class="el-icon-close" @click="selId = ''"></i>
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
            <span>{{$t('c2c.name')}}：</span>
            <div>{{detail[detail.other_identity].real_name}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.connect')}}：</span>
            <div>{{detail.other_phone}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.ailipay')}}：</span>
             <div>{{detail[detail.other_identity].ali_pay_account}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.wxName')}}：</span>
             <div>{{detail[detail.other_identity].we_chat_account_name}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.wx')}}：</span>
             <div>{{detail[detail.other_identity].we_chat_account}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.bankName')}}：</span>
            <div>{{detail[detail.other_identity].bank_account_name}}</div>
          </div>
          <div class="flex">
            <span>{{$t('c2c.bankcard')}}：</span>
            <div>{{detail[detail.other_identity].bank_account}}</div>
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
          </div> -->
          <!-- <div class="flex btns" v-if="detail.status == 1">
            <el-button @click="cancel" size="medium" >取消交易</el-button>
            <el-button type="danger" @click="confirm" size="medium">确认付款</el-button>
          </div> -->
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
      status:'none',
      filterPms: { currency_id: "", type: "buy" },
      coins: [],
      list: [],
      selId: "",
      detail: {},
      psw:'',
      isshow:false,
      id:'',
      type:'',
      state:'',
      cid:'',
      cancelOrconfirm:''
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    this.getCoins();
  },
  methods: {
    yes(){
      this.isshow = false;
     
      if((this.type == 'buy' || this.type == 'sell')&& (this.state == 2||this.state == 1)&&this.cancelOrconfirm == 'cancel'){  //用户已付款或确认收款取消订单时
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
            this.getList()
          }
          console.log(res);
        });
      }
      }else{
        if(this.type == 'buy'&&this.cancelOrconfirm == 'confirmPay'){
           
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
          this.getList()
        }
      });
      }
      }
       
    },
    no(){
        this.isshow = false;
        this.psw = '';
    },
    getCoins() {
      if (this.token) {
        var i = layer.load();
        this.$http({
          url: "/api/currency/list",
          heades: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          if (res.data.type == "ok") {
            var coins = res.data.message.legal;
            if (coins.length) {
              this.coins = coins;
              this.filterPms.currency_id = this.coins[0].id;
              this.getList();
            }
          }
        });
      }
    },
    getList() {
      if (this.token) {
        var i = layer.load();
        this.$http({
          url: "/api/ctoc/my_ctoc",
          method: "post",
          data: this.filterPms,
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          console.log(res);
          if (res.data.type == "ok") {
            var list = res.data.message;
            this.list = list;
            // if(this.$route.query.status == 'ok'){
            //    this.selId = list[0].id;
            //    this.getDetail(list[0].id)
            // }
          }
        });
      }
    },
    getDetail(id,type) {
      console.log(id);
      this.$router.push({path:'/orderDetail',query:{id:id,types:type}})
      if (this.token) {
        var i = layer.load();
        this.$http({
          url: "/api/ctoc/order_detail",
          method: "post",
          data: { id: id },
          headers: { Authorization: this.token }
        }).then(res => {
          this.selId = id;
          layer.close(i);
          console.log(res);
          if (res.data.type == "ok") {
            this.detail = res.data.message;
            
          }
        });
      }
    },
    cancel(id,type,status,canconfirm) {
      this.cancelOrconfirm = canconfirm;
      if((type == 'buy' || type == 'sell')&& (status == 2||status == 1)){
        console.log('hahahah')
          this.isshow = true;
          this.type = type;
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
      // this.type = type;
      // this.state = status;
      var i = layer.load();
      this.$http({               //确认付款  
        url: "/api/ctoc/pay",
        method: "post",
        data: { id:id},
        headers: { Authorization: this.token }
      }).then(res => {
         this.psw = '';
        layer.close(i);
        this.selId = '';
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.getList()
        }
      }); 
    },
    confirm(id,canconfirm) {
      this.cancelOrconfirm = canconfirm;
       this.isshow = true;
       this.id = id;
       this.type = type;
      this.state = status;
    }
  }
};
</script>

<style lang='scss'>
#mytransaction {
  > .filters {
    // border-bottom: 1px solid #f3f3f3;
    margin-bottom: 20px;
    > .flex {
      margin-bottom: 15px;
      > span {
        width: 70px;
      }
      li {
        margin: 0 20px;
        cursor: pointer;
        padding-bottom: 2px;
      }
      .selected {
        font-weight: bold;
        color: #194B64;
        border-bottom: 2px solid #194B64;
      }
    }
  }
  .pay {
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
  .list-box {
    font-size: 14px;
    line-height: 40px;
    > .list-title {
      font-weight: 600;
      padding: 5px 0;
    }
    .el-row {
      padding: 5px;
      border-top: 1px solid #f3f3f3;
      .el-button {
        margin-top: 6px;
        max-width: 80px;
      }
    }
    .first {
      align-items: center;

      > span {
        margin-right: 10px;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        background: #ccc;
        color: #fff;
        text-align: center;
      }
      > div {
        line-height: 20px;
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    .content {
      position: relative;
      margin: 100px auto;
      border-radius: 4px;
      padding: 20px 30px;
      max-width: 360px;
      background: #fff;
      line-height: 36px;
      > .el-icon-close {
        position: absolute;
        top: 0;
        right: 0;
        padding: 12px;
        font-weight: bold;
        cursor: pointer;
      }
      .flex {
        color: #194B64;
        >span {
          color: #333;
          min-width: 80px;
        }
      }
      .btns{
        
        justify-content: center;
        .el-button{
          margin: 10px 20px;
        }
      }
    }
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
