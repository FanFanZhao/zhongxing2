<template>
  <div id="c2c-list">
    <div class="filters">
      <div class="flex">
        <span>{{$t('c2c.type')}}：</span>
        <ul class="types flex">
          <li @click="filterPms.type='sell';getList()" :class="{selected:filterPms.type=='sell'}">{{$t('c2c.buy')}}</li>
          <li @click="filterPms.type='buy';getList()" :class="{selected:filterPms.type=='buy'}">{{$t('c2c.sell')}}</li>
        </ul>
      </div>
      <div class="flex">
        <span>{{$t('c2c.currency')}}：</span>
        <ul class="coins flex">
          <li
            v-for="(coin,index) in coins"
            :key="index"
            @click="filterPms.currency_id = coin.id;;getList()"
            :class="{selected:filterPms.currency_id==coin.id}"
          >{{coin.name}}</li>
        </ul>
      </div>
    </div>
    <div class="list-box">
      <div class="list-title">
        <el-row :gutter="10">
          <el-col :span="4">{{$t('c2c.onePrice')}}</el-col>
          <el-col :span="4">{{$t('c2c.num')}}</el-col>
          <el-col :span="4">{{$t('c2c.minNum')}}</el-col>
          <el-col :span="4">{{$t('c2c.pTime')}}</el-col>
          <el-col :span="4">{{$t('c2c.payType')}}</el-col>
          <el-col :span="4">{{$t('c2c.opera')}}</el-col>
        </el-row>
      </div>
      <el-row :gutter="10" v-for="(item,index) in list" :key="index">
        <el-col :span="4">{{item.price}}</el-col>
        <el-col :span="4">{{item.number}}</el-col>
        <el-col :span="4">{{item.min_number}}</el-col>
        <el-col :span="4">{{item.create_time}}</el-col>
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
        <el-col :span="4">
          <el-button
            size="mini"
            v-if="filterPms.type=='sell'"
            @click="setPms(index)"
            :disabled="item.number == 0"
          >{{$t('c2c.buy')}}</el-button>
          <el-button size="mini" v-else @click="setPms(index)" :disabled="item.number == 0">{{$t('c2c.sell')}}</el-button>
          <!-- <el-button size="mini" @click="getDetail(item.id)">详情</el-button> -->
        </el-col>
      </el-row>
    </div>
    <div class="mask" v-if="orderPms.max != ''">
      <div class="content">
        <el-tabs v-model="orderPms.type">
          <el-tab-pane :label="$t('c2c.num')" name="number"></el-tab-pane>
          <el-tab-pane :label="$t('c2c.money')" name="money"></el-tab-pane>
        </el-tabs>
        <div class="flex">
          <span>{{$t('c2c.enter')}}{{orderPms.type == 'number'?$t("c2c.num"):$t("c2c.money")}}</span>
          <el-input type="number" v-model="orderPms.number" size="small" :min="orderPms.type == 'number'?orderPms.min:orderPms.pMin" :max="orderPms.type == 'number'?orderPms.max:orderPms.pMax"></el-input>
        </div>
        <div
          class="tip-num"
          v-if="orderPms.type=='number'"
        >{{$t('c2c.numIs')}} {{orderPms.min}} - {{orderPms.max}} {{$t('c2c.rangeL')}}</div>
        <div class="tip-num" v-else>{{$t('c2c.moneyIs')}} {{orderPms.pMin}} - {{orderPms.pMax}} {{$t('c2c.rangeL')}}</div>
        <div class="tip_msg">请在30分钟内联系对方付款，超出30分钟将自动取消</div>
        <div class="btns flex">
          <el-button size="medium" @click="orderPms.max ='';orderPms.type ='number'">{{$t('c2c.cancel')}}</el-button>
          <el-button
            v-if="filterPms.type=='sell'"
            type="success"
            @click="buySell"
            size="medium"
          >{{filterPms.type=='sell'&&$t('c2c.buy')}}</el-button>
          <el-button v-else type="success" @click="buySell" size="medium">{{$t('c2c.sell')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterPms: { currency_id: "", type: "sell" },
      coins: [],
      list: [],
      detail: {},
      showDialog: false,
      selectedIndex: "none",
      orderPms: {
        id: "",
        number: "",
        max: "",
        min: "",
        type: "number"
      }
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    this.getCoins();
  },
  methods: {
    getCoins() {
      if (this.token) {
        var i = layer.load();
        this.$http({
          url: "/api/currency/ctoc_list",
          heades: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          if (res.data.type == "ok") {
            var coins = res.data.message;
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
          url: "/api/ctoc/list",
          method: "post",
          data: this.filterPms,
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          // console.log(res);
          if (res.data.type == "ok") {
            var list = res.data.message;
            this.list = list;
          }
        });
      }
    },
    getDetail(id) {
      if (this.token) {
        var i = layer.load();
        this.$http({
          url: "/api/ctoc/detail",
          method: "post",
          data: { id: id },
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          console.log(res);
          if (res.data.type == "ok") {
            this.detail = res.data.message;
          }
        });
      }
    },
    setPms(index) {
      this.orderPms.id = this.list[index]["id"];
      this.orderPms.max = this.list[index]["number"] - 0;
      this.orderPms.min = this.list[index]["min_number"] - 0;
      // this.orderPms.price = this.list[index]["price"]-0;
      this.orderPms.pMin = (this.list[index]["price"] - 0) * this.orderPms.min;
      this.orderPms.pMax = (this.list[index]["price"] - 0) * this.orderPms.max;
    },
    buySell() {
      if (this.token) {
        if (this.orderPms.type == "number") {
          if (this.orderPms.number - 0 - this.orderPms.max > 0) {
            layer.msg(this.$t('c2c.maxNum') + this.orderPms.max);
            return;
          } else if (this.orderPms.number - this.orderPms.min < 0) {
            layer.msg(this.$t('c2c.minNum') + this.orderPms.min);
            return;
          }
        } else {
          
          if (this.orderPms.number - 0 - this.orderPms.pMax > 0) {
            layer.msg(this.$t('c2c.maxMoney') + this.orderPms.pMax);
            return;
          } else if (this.orderPms.number - this.orderPms.pMin < 0) {
            layer.msg(this.$t('c2c.minMoney') + this.orderPms.pMin);
            return;
          }
        }
        
        //获取实名认证状态
      var review_status; //是否实名认证
      var is_Billing; //是否设置收款方式 1 已设置 0 未设置
      var load = layer.load();
      this.$http({
        url: "/api/user/info",
        method: "GET",
        data: {},
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          review_status = res.data.message.review_status;
          is_Billing = res.data.message.is_Billing;
          if (review_status != 2) {
            layer.msg(this.$t("lay.tname"));
            setTimeout(() => {
              this.$router.push("/components/authentication");
            }, 1000);
            return false;
          } 
          if (is_Billing == 0) {
            layer.msg(this.$t("lay.payset"));
            setTimeout(() => {
              this.$router.push("/userSetting");
            }, 1000);

            return;
          }
          //购买或出售
        var i = layer.load();
        this.$http({
          url: "/api/ctoc/order",
          method: "post",
          data: {
            id: this.orderPms.id,
            number: this.orderPms.number,
            type: this.orderPms.type
          },
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          this.orderPms.max = "";
          this.orderPms.number = "";
          this.orderPms.type = "number";
          // this.orderPms = { id: "", number: "", max: "",min:'' };
          // layer.msg(res.data.message);
          if(res.data.type == 'ok'){
            layer.msg('下单成功');
             this.getList();
          setTimeout(() => {
             this.$router.push({path:'/orderDetail',query:{id:res.data.message,types:this.filterPms.type=='sell'?'buy':'sell'}})
          }, 1000);
          }else if(res.data.type == 'error'){
             layer.msg(res.data.message);
          }
          
        });
        }
      });

        
      }
    }
  }
};
</script>

<style lang='scss'>
#c2c-list {
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
        width: 80px;
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
  > .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    > .content {
      margin: 200px auto;
      border-radius: 4px;
      padding: 30px 30px;
      width: 350px;

      background: #fff;
      line-height: 40px;
      font-size: 14px;
      > div {
        span {
          width: 120px;
        }
      }
      .tip-num {
        font-size: 12px;
        color: red;
        text-align: right;
        line-height: 0;
        margin: 10px 0 20px;
      }
      .tip_msg{
         font-size: 12px;
         color: red;
      }
      > .btns {
        justify-content: space-between;
        .el-button {
          width: 40%;
        }
      }
    }
  }
}
</style>
