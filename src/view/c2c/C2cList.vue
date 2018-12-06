<template>
  <div id="c2c-list">
    <div class="filters">
      <div class="flex">
        <span>类型：</span>
        <ul class="types flex">
          <li @click="filterPms.type='sell';getList()" :class="{selected:filterPms.type=='sell'}">购买</li>
          <li @click="filterPms.type='buy';getList()" :class="{selected:filterPms.type=='buy'}">出售</li>
        </ul>
      </div>
      <div class="flex">
        <span>币种：</span>
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
          <el-col :span="4">单价</el-col>
          <el-col :span="4">数量</el-col>
          <el-col :span="4">最小数量</el-col>
          <el-col :span="4">发布时间</el-col>
          <el-col :span="4">支付方式</el-col>
          <el-col :span="4">操作</el-col>
        </el-row>
      </div>
      <el-row :gutter="10" v-for="(item,index) in list" :key="index">
        <el-col :span="4">{{item.price}}</el-col>
        <el-col :span="4">{{item.number}}</el-col>
        <el-col :span="4">{{item.min_number}}</el-col>
        <el-col :span="4">{{item.create_time}}</el-col>
        <el-col :span="4">
          <div class="pay">
            <img v-if="item.way=='ali_pay'" src="../../assets/images/zfb_icon.png" alt>
            <img v-else-if="item.way=='we_chat'" src="../../assets/images/wx_icon.png" alt>
            <img v-else src="../../assets/images/bank_icon.png" alt>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button
            size="mini"
            v-if="filterPms.type=='sell'"
            @click="setPms(index)"
            :disabled="item.number == 0"
          >购买</el-button>
          <el-button size="mini" v-else @click="setPms(index)" :disabled="item.number == 0">出售</el-button>
          <!-- <el-button size="mini" @click="getDetail(item.id)">详情</el-button> -->
        </el-col>
      </el-row>
    </div>
    <div class="mask" v-if="orderPms.max != ''">
      <div class="content">
        <el-tabs v-model="orderPms.type">
          <el-tab-pane label="数量" name="number"></el-tab-pane>
          <el-tab-pane label="金额" name="money"></el-tab-pane>
        </el-tabs>
        <div class="flex">
          <span>请输入{{orderPms.type == 'number'?'数量':'金额'}}</span>
          <el-input type="number" v-model="orderPms.number" size="small" :min="orderPms.type == 'number'?orderPms.min:orderPms.pMin" :max="orderPms.type == 'number'?orderPms.max:orderPms.pMax"></el-input>
        </div>
        <div
          class="tip-num"
          v-if="orderPms.type=='number'"
        >数量在 {{orderPms.min}} - {{orderPms.max}} 之间</div>
        <div class="tip-num" v-else>金额在 {{orderPms.pMin}} - {{orderPms.pMax}} 之间</div>
        <div class="btns flex">
          <el-button size="medium" @click="orderPms.max ='';orderPms.type ='number'">取消</el-button>
          <el-button
            v-if="filterPms.type=='sell'"
            type="success"
            @click="buySell"
            size="medium"
          >{{filterPms.type=='sell'&&'购买'}}</el-button>
          <el-button v-else type="success" @click="buySell" size="medium">出售</el-button>
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
            layer.msg("数量不能超出" + this.orderPms.max);
            return;
          } else if (this.orderPms.number - this.orderPms.min < 0) {
            layer.msg("数量不能少于" + this.orderPms.min);
            return;
          }
        } else {
          
          if (this.orderPms.number - 0 - this.orderPms.pMax > 0) {
            layer.msg("金额不能超出" + this.orderPms.pMax);
            return;
          } else if (this.orderPms.number - this.orderPms.pMin < 0) {
            layer.msg("金额不能少于" + this.orderPms.pMin);
            return;
          }
        }
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
          layer.msg(res.data.message);
          this.getList();
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
        color: blueviolet;
        border-bottom: 2px solid blueviolet;
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
      width: 300px;

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
