<template>
  <div id="myshops" class=" clr-part">
    <div class="title clr-part bg-part">{{$t('shop.myshop')}}</div>
    <div class="list-box ft14 clr-part bg-part">
      <div class="list-header flex">
        <div>{{$t('shop.name')}}</div>
        <div>{{$t('shop.tolegal')}}</div>
        <div>{{$t('shop.retime')}}</div>
        <div>{{$t('shop.balance')}}</div>
        <div>{{$t('shop.lockbalance')}}</div>
        <!-- <div>支付方式</div> -->
        <div>{{$t('do')}}</div>
      </div>
      <ul class="list">
        <li class="flex" v-for="(item,index) in list" :key="index">
          <div class="flex">
            <span class="icon blue_bg">{{item.name.charAt(0)}}</span>
            <span>{{item.name}}</span>
          </div>
          <div>{{item.currency_name}}</div>
          <div>{{item.create_time}}</div>
          <div>{{item.seller_balance}}</div>
          <div>{{item.lock_seller_balance}}</div>
          <div>
            <router-link class="blue_bg" :to="{path:'/legalShopDetail',query:{id:item.id,min:item.min_legal,max:item.max_legal}}">{{$t('shop.goshop')}}</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      page: 1
    };
  },
  created() {
    var token = window.localStorage.getItem("token") || "";
    if (token) {
      this.token = token;
      this.getList();
    }
  },
  methods: {
    getList() {
      var i = layer.load();
      this.$http({
        url: "/api/my_seller",
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        console.log(res);
        if (res.data.type == "ok") {
          var list = res.data.message.data;
          if (list.length) {
            this.list = list;
          }
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#myshops {
  margin: 30px auto 0;
  width: 1200px;
  height: 100%;
  > .title {
    margin-bottom: 20px;
    padding: 0 30px;
    background: #f8f8f8;
    line-height: 50px;
  }
  > .list-box {
    line-height: 30px;
    background: #f8f8f8;
    padding: 0 30px;
    .list-header,
    li {
      > div {
        width: 19.9%;
        height: 30px;
      }
      > div:last-child {
        // text-align: tig
        text-align: right;
      }
    }
    li {
      padding: 14px 0;
      > div:first-child {
        > span:first-child {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          text-align: center;
          background: #2e1b85;
          color: #fff;
          margin-right: 5px;
          line-height: 30px;
        }
      }
    }
    li > div:last-child a{
      float: right;
      padding: 0 14px;
      border-radius: 2px;
      background: #2e1b85;
      color: #fff;
      cursor: pointer;
      font-size: 14px;

    }
    li:nth-child(n + 2) {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
