<template>
  <div id="c2c-publish">
    <el-row :gutter="60">
      <el-col :span="12">
        <el-form :model="buyPms" label-position="left" label-width="80px">
          <el-form-item label="币种">
            <el-select v-model="buyPms.currency_id" placeholder="请选择币种">
              <el-option
                v-for="(coin,index) in coins"
                :value="coin.id"
                :key="index"
                :label="coin.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="buyPms.price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="buyPms.number" type="number"></el-input>
          </el-form-item>
          <el-form-item label="最小数量">
            <el-input v-model="buyPms.min_number" type="number"></el-input>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-radio-group v-model="buyPms.way">
              <el-radio label="ali_pay">支付宝</el-radio>
              <el-radio label="we_chat">微信</el-radio>
              <el-radio label="bank">银行卡</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button @click="buySell('buyPms')" type="success">发布求购</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form :model="sellPms" label-position="left" label-width="80px">
          <el-form-item label="币种">
            <el-select v-model="sellPms.currency_id" placeholder="请选择币种">
              <el-option
                v-for="(coin,index) in coins"
                :value="coin.id"
                :key="index"
                :label="coin.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="sellPms.price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="sellPms.number" type="number"></el-input>
          </el-form-item>
          <el-form-item label="最小数量">
            <el-input v-model="sellPms.min_number" type="number"></el-input>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-radio-group v-model="sellPms.way">
              <el-radio label="ali_pay">支付宝</el-radio>
              <el-radio label="we_chat">微信</el-radio>
              <el-radio label="bank">银行卡</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button @click="buySell('sellPms')" type="danger">发布出售</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      coins: [],
      token: "",
      buyPms: {
        type: "buy",
        price: "",
        number: "",
        min_number: "",
        way: "ali_pay",
        currency_id: "请选择币种"
      },
      sellPms: {
        type: "sell",
        price: "",
        number: "",
        min_number: "",
        way: "ali_pay",
        currency_id: "请选择币种"
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
          headers: {
            Authorization: this.token
          }
        }).then(res => {
          layer.close(i);
          console.log(res);
          if (res.data.type == "ok") {
            var coins = res.data.message.legal;
            if (coins.length) {
              this.coins = coins;
            }
          }
        });
      }
    },
    buySell(type) {
      var p = this[type];
      var msg = "";
      if (p.currency_id == "请选择币种") {
        msg = "请选择币种";
      } else if (p.price == "") {
        msg = "请输入价格";
      } else if (p.number == "") {
        msg = "请输入数量";
      } else if (p.min_number == "") {
        msg = "请输入最小数量";
      } else if (p.min_number -0 - p.number >= 0) {
        console.log(p);
        
        msg = "最小数量不能大于总数量";
      }
      if (msg) {
        layer.msg(msg);
        
      } else {
        var i = layer.load();
        this.$http({
          url: "/api/ctoc/publish",
          method: "post",
          data: p,
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          console.log(res);
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            this[type] = Object.assign(p, {
              currency_id: "请选择币种",
              price: "",
              number: "",
              min_number: ""
            });
          }
        });
      }
    }
  }
};
</script>

<style lang='scss'>
#c2c-publish {
  width: 970px;
  padding: 30px;
  .el-select {
    width: 100%;
  }
  .el-row{
    .el-col:first-child{
      border-right: 1px dashed #ccc;
    }
  }
  .el-button{
    width: 100%;
  }
}
</style>
