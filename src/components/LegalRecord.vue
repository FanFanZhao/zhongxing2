<template>
  <div id="legal-record" class="clr-part bg-main">
    <div class="title bg-part ft16">{{$t('legal.traderecord')}}</div>
    <div class="filter-box bg-part ft14">
      <div>
        <span>{{$t('legal.tredetype')}}：</span>
        <span :class="{'select':filterPms.type == 'sell'}" @click="filterPms.type = 'sell';getList()">{{$t('legal.buy')}}</span>
        <span :class="{'select':filterPms.type  == 'buy'}" @click="filterPms.type  = 'buy';getList()">{{$t('legal.sell')}}</span>
      </div>
      <div>
        <span>{{$t('legal.orderstatus')}}：</span>
        <span :class="{'select':filterPms.isSure == 0}" @click="filterPms.isSure = 0;getList()">{{$t('legal.nofinish')}}</span>
        <span :class="{'select':filterPms.isSure == 1}" @click="filterPms.isSure = 1;getList()">{{$t('legal.finished')}}</span>
        <span :class="{'select':filterPms.isSure == 2}" @click="filterPms.isSure = 2;getList()">{{$t('legal.ceiled')}}</span>
        <span :class="{'select':filterPms.isSure == 3}" @click="filterPms.isSure = 3;getList()">{{$t('legal.payed')}}</span>
      </div>
    </div>
    
    <ul class="bg-part">
      <li class="bdr-part" v-for="(item,index) in list" :key="index">
        <div class="flex li-t ft14">
          <div>
            <span v-if="item.type == 'sell'">{{$t('legal.buy')}}</span>
            <span v-else>{{$t('legal.sell')}}</span>
            <span>{{item.currency_name}}</span>
          </div>
          
        </div>
        <div class="flex li-b alcenter">
          <div>
            <div class="ft14">{{$t('legal.time')}}</div>
            <div class="ft12">{{item.create_time}}</div>
          </div>
          <div>
            <div class="ft14">{{$t('legal.number')}}</div>
            <div class="ft12">{{item.number}}</div>
          </div>
          <div>
            <div class="ft14">{{$t('legal.totalmoney')}}（{{item.currency_name}})</div>
            <div class="ft12">{{item.deal_money}}</div>
          </div>
          <div class="status blue_bg">
            <span  @click="gotoNext(item.id,item.type)" v-if="item.is_sure == 0">{{$t('legal.nofinish')}} ></span>
            <span  @click="gotoNext(item.id,item.type)" v-else-if="item.is_sure == 1">{{$t('legal.finished')}} ></span>
            <span  @click="gotoNext(item.id,item.type)" v-else-if="item.is_sure == 2">{{$t('legal.ceiled')}} ></span>
            <span  @click="gotoNext(item.id,item.type)"  v-else>{{$t('legal.payed')}} ></span>
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
    gotoNext(id,_type){
      var type=this.filterPms.type;
      console.log(this.filterPms.type)
      if(_type=='buy'){
        this.$router.push({path: '/components/payCannel',query:{ id,type:this.filterPms.type}});
      }else{
        // 购买
        this.$router.push({path: '/legalPay',query:{ id,type:this.filterPms.type}});
      }
    },
    getList(more = false) {
      var that = this;
      var pms = {};
      if (!more) {
        this.filterPms.page = 1;
      }
      pms.id = this.filterPms.id;
      pms.page = this.filterPms.page;
      if (this.filterPms.type != "none") {
        pms.type = this.filterPms.type;
      }
      if (this.filterPms.isSure != "none") {
        pms["is_sure"] = this.filterPms.isSure;
      }
      var i = layer.load();
      this.$http({
        url: "/api/legal_user_deal",
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
  },

};
</script>

<style lang='scss'>
#legal-record {
  width: 1200px;
  margin: 30px auto;
  > .title {
    margin-bottom: 30px;
    padding: 0 20px;
    line-height: 50px;
    // font-size: 20px;
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
      color: #194B64;
      border-bottom: 2px solid #194B64;
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
    >li:first-child{
      border: none;
    }
    > li:nth-child(n + 2) {
      border-top: 1px solid #ccc;
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
      font-size: 14px;
      cursor: pointer;
    padding: 0 6px;
    border-radius: 3px;
}
</style>
