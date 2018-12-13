<template>
  <div id="c2c-detail">
    <div class="flex">
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
    </div>
    <el-button type="danger" size="small" @click="revoke">{{$t('c2c.cancelp')}}</el-button>
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
          url: "/api/ctoc/detail",
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
    revoke() {
      if (this.token) {
        var i = layer.load();
        this.$http({
          url: "/api/ctoc/revoke",
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
