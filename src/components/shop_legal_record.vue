<template>
  <div id="legal-record" class="clr-part">
    <div class="title bg-part">{{$t('legal.record')}}</div>
    <!-- <div class="filter-box">
      <div>
        <span>交易类型：</span>
        <span :class="{'select':filterPms.type == 'sell'}" @click="filterPms.type = 'sell';getList()">购买</span>
        <span :class="{'select':filterPms.type  == 'buy'}" @click="filterPms.type  = 'buy';getList()">出售</span>
      </div>
      <div>
        <span>订单状态：</span>
        <span :class="{'select':filterPms.isSure == 0}" @click="filterPms.isSure = 0;getList()">未完成</span>
        <span :class="{'select':filterPms.isSure == 1}" @click="filterPms.isSure = 1;getList()">已完成</span>
        <span :class="{'select':filterPms.isSure == 2}" @click="filterPms.isSure = 2;getList()">已取消</span>
      </div>
    </div> -->
    
    <ul class="bg-part ft14">
      <li v-for="(item,index) in list" :key="index" class="bdr-part">
        <div class="flex li-t">
          <div>
            <span v-if="item.type == 'sell'">{{$t('legal.buy')}}</span>
            <span v-else>{{$t('legal.sell')}}</span>
            <span>{{item.currency_name}}</span>
          </div>
          <div class="status blue_bg">
            <router-link :to="{path:'/shopLegalPayDetail',query:{id:item.id}}" v-if="item.is_sure == 0">{{$t('legal.nofinish')}} ></router-link>
            <router-link :to="{path:'/shopLegalPayDetail',query:{id:item.id}}" v-else-if="item.is_sure == 1">{{$t('legal.finished')}} ></router-link>
            <router-link :to="{path:'/shopLegalPayDetail',query:{id:item.id}}" v-else-if="item.is_sure == 2">{{$t('legal.ceiled')}} ></router-link>
            <router-link :to="{path:'/shopLegalPayDetail',query:{id:item.id}}" v-else>{{$t('legal.payed')}} ></router-link>
          </div>
        </div>
        <div class="flex li-b" @click="$router.push({path:'/shopLegalPayDetail',query:{id:item.id}})">
          <div>
            <div class="tl">{{$t('time')}}</div>
            <div class="tc">{{item.create_time}}</div>
          </div>
          <div>
            <div class="tc" v-if="item.type == 'sell'">{{$t('legal.buyer')}}</div>
            <div class="tc" v-else>{{$t('legal.seller')}}</div>
            <div class="tc">{{item.user_realname}}</div>
          </div>
          <div>
            <div class="tc">{{$t('number')}}</div>
            <div class="tc">{{item.number}}</div>
          </div>
          <div>
            <div class="tc">{{$t('legal.totalmoney')}}(CNY)</div>
            <div class="tc">{{item.deal_money}}</div>
          </div>
        </div>
      </li>
      
    </ul>
    <div class="more bg-part" @click="getList(true)" v-if="list.length">{{$t('more')}}</div>
   
    <div v-else class="nomore">{{$t('nomore')}}</div>
     
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      filterPms: { type: "none", id: '', page: 1, isSure: "none" }
    };
  },
  created() {
    var token = window.localStorage.getItem("token") || "";
    if (token) {
      this.token = token;
      this.filterPms.id = this.$route.query.id || "";
      this.getList();
    }
  },
  methods: {
    
    getList(more = false) {
      var that = this;
      var pms = {};
      if (!more) {
        this.filterPms.page = 1;
      }
      pms.id = this.filterPms.id;
    //  pms.id = '55'
      pms.page = this.filterPms.page;
      if (this.filterPms.type != "none") {
        pms.type = this.filterPms.type;
      }
      if (this.filterPms.isSure != "none") {
        pms["is_sure"] = this.filterPms.isSure;
      }
      var i = layer.load();
      this.$http({
        url: "/api/legal_send_deal_list",
        params: pms,
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          var msg = res.data.message;
          if (more) {
            if (msg.data.length) {
              this.list = this.list.concat(msg.data);
            } else {
              layer.msg(that.$t('nomore'));
            }
          } else {
            this.list = msg.data;
          }
          if(msg.data.length){
            this.filterPms.page+=1;
          }
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#legal-record {
  width: 1200px;
  margin: 30px auto;
  > .title {
    margin-bottom: 30px;
    padding: 0 30px;
    line-height: 50px;
    font-size: 20px;
    background: #f8f8f8;
  }
  > .filter-box {
    line-height: 30px;
    background: #f8f8f8;
    span {
      margin-left: 16px;
      cursor: pointer;
    }
    span:nth-child(n + 2) {
      font-weight: 600;
    }
    .select {
      color: #563bd1;
    }
  }
  > ul {
    padding: 10px 30px;
    background: #f8f8f8;
    li {
      padding: 10px 0;
      > div {
        justify-content: space-between;
        line-height: 30px;
      }
    }
    > li:nth-child(n + 2) {
      border-top: 1px solid #ccc;
    }
    >li:first-child{
      border:none;
    }
  }

  > .more {
    text-align: center;
    padding: 20px;
    background: #f8f8f8;
    cursor: pointer;
  }
  >.nomore{
    padding: 16px;
    text-align: center;
  }
}
.log_wrap{
  overflow: auto;
}
.status{
      // background: #563BD1;
      color: #fff;
    padding: 0 6px;
    border-radius: 3px;
}
.li-b{
  cursor: pointer;
}
</style>
