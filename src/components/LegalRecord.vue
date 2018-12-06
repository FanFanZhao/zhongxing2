<template>
  <div id="legal-record" class="clr-part bg-main">
    <div class="title bg-part ft16">法币交易记录</div>
    <div class="filter-box bg-part ft14">
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
        <span :class="{'select':filterPms.isSure == 3}" @click="filterPms.isSure = 3;getList()">已付款</span>
      </div>
    </div>
    
    <ul class="bg-part">
      <li class="bdr-part" v-for="(item,index) in list" :key="index">
        <div class="flex li-t ft14">
          <div>
            <span v-if="item.type == 'sell'">购买</span>
            <span v-else>出售</span>
            <span>{{item.currency_name}}</span>
          </div>
          
        </div>
        <div class="flex li-b alcenter">
          <div>
            <div class="ft14">时间</div>
            <div class="ft12">{{item.create_time}}</div>
          </div>
          <div>
            <div class="ft14">数量</div>
            <div class="ft12">{{item.number}}</div>
          </div>
          <div>
            <div class="ft14">交易总额（{{item.currency_name}})</div>
            <div class="ft12">{{item.deal_money}}</div>
          </div>
          <div class="status">
            <span  @click="gotoNext(item.id,item.type)" v-if="item.is_sure == 0">未完成 ></span>
            <span  @click="gotoNext(item.id,item.type)" v-else-if="item.is_sure == 1">已完成 ></span>
            <span  @click="gotoNext(item.id,item.type)" v-else-if="item.is_sure == 2">已取消 ></span>
            <span  @click="gotoNext(item.id,item.type)"  v-else>已付款 ></span>
          </div>
        </div>
      </li>
      
    </ul>
    <div class="more bg-part" @click="getList(true)" v-if="list.length">加载更多</div>
   
    <div v-else class="nomore">暂无更多</div>
     
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
              layer.msg("暂无更多");
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
      background: #563BD1;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    padding: 0 6px;
    border-radius: 3px;
}
</style>
