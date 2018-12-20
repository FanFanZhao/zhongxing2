<template>
  <div id="mypublished">
    <div class="filters">
      <div class="flex">
        <span>{{$t('c2c.type')}}：</span>
        <ul class="types flex">
          <li @click="filterPms.type='buy';getList()" :class="{selected:filterPms.type=='buy'}">{{$t('c2c.buy')}}</li>
          <li @click="filterPms.type='sell';getList()" :class="{selected:filterPms.type=='sell'}">{{$t('c2c.sell')}}</li>
        </ul>
      </div>
      <div class="flex">
        <span>{{$t('c2c.currency')}}：</span>
        <ul class="coins flex">
          <li
            v-for="(coin,index) in coins"
            :key="index"
            @click="filterPms.currency_id = coin.id;getList()"
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
          <el-col :span="4">{{$t('c2c.minNums')}}</el-col>
          
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
          <el-button size="mini" @click="getDetail(item.id)">{{$t('c2c.detail')}}</el-button>
          <!-- <router-link :to="{path:'/c2cDetail',query:{id:item.id}}">
            <el-button  size="mini">查看详情</el-button>
          </router-link>-->
        </el-col>
      </el-row>
      <div v-if="!list.length" class="tip tc" style="padding:20px">{{$t('c2c.notMore')}}</div>
    </div>
    <div class="mask" v-if="selId != ''">
      <div class="content">
        <i class="el-icon-close" @click="selId = ''"></i>
        <div class="flex">
          <span>{{$t('c2c.currency')}} ：</span>
          <div>{{detail.currency_name}}</div>
        </div>
        <div class="flex">
          <span>{{$t('c2c.timer')}}：</span>
          <div>{{detail.create_time}}</div>
        </div>
        <div class="flex">
          <span>{{$t('c2c.onePrice')}}：</span>
          <div>{{detail.price}}</div>
        </div>
        <div class="flex">
          <span>{{$t('c2c.num')}}：</span>
          <div>{{detail.number}}</div>
        </div>
        <!-- <div class="flex">
            <span>账户：</span>
            <div>{{detail.cny_uci.pay_account}}</div>
          </div>
          <div class="flex">
            <span>支付名称：</span>
            <div>{{detail.cny_uci.pay_account_name}}</div>
          </div>
          <div class="flex">
            <span>名称：</span>
            <div>{{detail.cny_uci.pay_name}}</div>
        </div>-->
        <!-- <div class="flex" v-if="detail.status != 1">
            <span>状态：</span>
            <div v-if="detail.status == 2">已付款</div>
            <div v-if="detail.status == 3">已完成</div>
            <div v-if="detail.status == 4">已取消</div>
        </div>-->
        <div class="flex btns">
            <el-button @click="selId = ''"  >{{$t('c2c.cancel')}}</el-button>
            <el-button type="danger" @click="revoke" >{{$t('c2c.cancelp')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterPms: { currency_id: "", type: "buy" },
      coins: [],
      list: [],
      detail:{},
      selId:''
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
          url: "/api/ctoc/my_list",
          method: "post",
          data: this.filterPms,
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          console.log(res);
          if(res.data.type == 'ok'){
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
          this.selId = id;
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
          data: { id: this.selId },
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          console.log(res);
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            this.selId = '';
            this.getList()
          }
        });
      }
    },
    cancel(id){
      if(this.token){
        var i = layer.load();
        this.$http({
          url:'/api/ctoc/revoke',
          data:{id:id},
           heades: { Authorization: this.token }
        }).then(res => {
          console.log(res);
          
        })
      }
    }
  }
};
</script>

<style lang='scss'>
#mypublished {
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
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    .content {
      position: relative;
      margin: 100px auto;
      border-radius: 4px;
      padding: 20px 30px;
      max-width: 300px;
      background: #fff;
      line-height: 36px;
      font-size: 14px;
      > .el-icon-close {
        position: absolute;
        top: 0;
        right: 0;
        padding: 12px;
        font-weight: bold;
        cursor: pointer;
      }
      .flex {
        color: #194B64;
        > span {
          color: #333;
          width: 80px;
        }
      }
      .btns {
        justify-content: space-between;
        .el-button {
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
