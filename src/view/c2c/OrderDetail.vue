<template>
  <div id="c2c-detail">
    <div class="flex">
      <span>时间：</span>
      <span>{{detail.create_time}}</span>
    </div>
    <div class="flex">
      <span>类型</span>
      <span>{{detail.type =='buy'?'购买':'出售'}}</span>
    </div>
    <div class="flex">
      <span>价格：</span>
      <span>{{detail.price}}</span>
    </div>
    <div class="flex">
      <span>数量：</span>
      <span>{{detail.number}}</span>
    </div>
    <div class="flex">
      <span>支付方式：</span>
      <img v-if="detail.way=='ali_pay'" src="../../assets/images/zfb_icon.png" alt>
      <img v-else-if="detail.way=='we_chat'" src="../../assets/images/wx_icon.png" alt>
      <img v-else src="../../assets/images/bank_icon.png" alt>
    </div>
    <el-button type="danger" size="small" @click="cancel">取消发布</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      id: "",
      detail: {}
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    this.id = this.$route.query.id || "";
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
            this.detail = res.data.message;
          }
        });
      }
    },
    cancel() {
      if (this.token) {
        var i = layer.load();
        this.$http({
          url: "/api/ctoc/cancel",
          method: "post",
          data: { id: this.id },
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          console.log(res);
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            this.$router.go(-1);
          }
        });
      }
    }
  }
};
</script>

<style lang='scss'>
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
}
</style>
