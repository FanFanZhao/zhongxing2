<template>
  <div id="c2c-publish">
    <el-row :gutter="60">
      <el-col :span="12">
        <el-form :model="buyPms" label-position="left" label-width="80px">
          <el-form-item :label="$t('c2c.currency')">
            <el-select v-model="buyPms.currency_id" :placeholder="$t('c2c.selCu')">
              <el-option
                v-for="(coin,index) in coins"
                :value="coin.id"
                :key="index"
                :label="coin.name"
                :min="coin.min"
                :max="coin.max"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('c2c.onePrice')">
            <el-input v-model="buyPms.price" type="number"></el-input>
          </el-form-item>
          <el-form-item :label="$t('c2c.num')">
            <el-input v-model="buyPms.number" type="number"></el-input>
          </el-form-item>
          <el-form-item :label="$t('c2c.minNums')">
            <el-input v-model="buyPms.min_number" type="number"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="$t('c2c.payType')">
            <el-radio-group v-model="buyPms.way">
              <el-radio label="ali_pay">{{$t('c2c.ailipay')}}</el-radio>
              <el-radio label="we_chat">{{$t('c2c.wx')}}</el-radio>
              <el-radio label="bank">{{$t('c2c.bankcard')}}</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item>
            <el-button @click="buySell('buyPms')" type="success">{{$t('c2c.pBuy')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form :model="sellPms" label-position="left" label-width="80px">
          <el-form-item :label="$t('c2c.currency')">
            <el-select v-model="sellPms.currency_id" :placeholder="$t('c2c.selCu')">
              <el-option
                v-for="(coin,index) in coins"
                :value="coin.id"
                :key="index"
                :label="coin.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('c2c.onePrice')">
            <el-input v-model="sellPms.price" type="number"></el-input>
          </el-form-item>
          <el-form-item :label="$t('c2c.num')">
            <el-input v-model="sellPms.number" type="number"></el-input>
          </el-form-item>
          <el-form-item :label="$t('c2c.minNums')">
            <el-input v-model="sellPms.min_number" type="number"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="$t('c2c.payType')">
            <el-radio-group v-model="sellPms.way">
              <el-radio label="ali_pay">{{$t('c2c.ailipay')}}</el-radio>
              <el-radio label="we_chat">{{$t('c2c.wx')}}</el-radio>
              <el-radio label="bank">{{$t('c2c.bankcard')}}</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item>
            <el-button @click="buySell('sellPms')" type="danger">{{$t('c2c.pSell')}}</el-button>
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
        currency_id: this.$t("c2c.selCu")
      },
      sellPms: {
        type: "sell",
        price: "",
        number: "",
        min_number: "",
        way: "ali_pay",
        currency_id: this.$t("c2c.selCu")
      },
      min:'',
      max:''
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
          headers: {
            Authorization: this.token
          }
        }).then(res => {
          layer.close(i);
          console.log(res);
          if (res.data.type == "ok") {
            var coins = res.data.message;
            this.min = res.data.message.min;
            this.max = res.data.message.max;
            if (coins.length) {
              this.coins = coins;
            }
          }
        });
      }
    },
    buySell(type) {
      console.log(this.min)
      var p = this[type];
      var msg = "";
      if (p.currency_id == this.$t("c2c.selCu")) {
        msg = this.$t("c2c.selCu");
      } else if (p.price == "") {
        msg = this.$t("c2c.enterPrice");
      } else if (p.number == "") {
        msg = this.$t("c2c.enterNum");
      } else if (p.min_number == "") {
        msg = this.$t("c2c.enterMinnum");
      } else if (p.min_number - 0 - p.number >= 0) {
        console.log(p);

        msg = this.$t("c2c.tips");
      }else{
          $.each(this.coins,function(k,v){
          console.log(p.currency_id)
          if(p.currency_id == v.id){
            if(p.number<(v.min-0)){
            msg = '发布数量不能小于'+v.min;
            }else if(p.number>(v.max-0)){
              msg = '发布数量不能大于'+v.max;
            }else if(p.min_number<(v.min-0)){
              msg = '发布最小数量不能小于'+v.min;
            }else if(p.min_number>(v.max-0)){
               msg = '发布最小数量不能大于'+v.max;
            }
          }
        })
      }
      if (msg) {
        layer.msg(msg);
        return;
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
          } else if (is_Billing == 0) {
            layer.msg(this.$t("lay.payset"));
            setTimeout(() => {
              this.$router.push("/userSetting");
            }, 1000);

            return;
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
                  currency_id: this.$t("c2c.selCu"),
                  price: "",
                  number: "",
                  min_number: ""
                });
              }
            });
          }
        }
      });
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
  .el-row {
    .el-col:first-child {
      border-right: 1px dashed #ccc;
    }
  }
  .el-button {
    width: 100%;
  }
}
</style>
