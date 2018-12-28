<template>
    <div class="entrust clr-part">
        <div class="title">
            <div class="tab_title clr-part">
                <span v-for="(url,index) in urlList" :class="{'active': index == isUrl}" @click="changeType(index,url.url)">{{url.title}}</span>
            </div>
            <div class="tab_title fr ft12" v-if="isUrl == 0">
                <span v-for="(way,index) in wayList" :class="{'active': index == isChoosed}" @click="wayChoose(index,way.type)">{{way.title}}</span>
            </div>
        </div>
        <div class="content" v-show="isUrl==0" >
            <ul class="list-title fColor2 ft12 clear bdr-part">
                <li class="fl w20">{{$t('time')}}</li>
                <li class="fl w12">{{$t('center.pairs')}}</li>
                <li class="fl w12">{{$t('center.direction')}}</li>
                <li class="fl w12">{{$t('price')}}</li>
                <li class="fl w14">{{$t('number')}}</li>
                <li class="fl w20">{{$t('center.dealtotal')}}</li>
                <li class="fl w8 tr">{{$t('do')}}</li>
            </ul>
            <div class="container scroll" >
                <ul class="list-item ft12" v-if="flags01&&enList01.length>0">
                    <li v-for="item in enList01" class="clear">
                        <span class="fl w20">{{item.create_time}}</span>
                        <span class="fl w12">{{item.currency_name}}/{{item.legal_name}}</span>
                        <span class="fl w12" :class="{'green': item.typeInfo == 'in'}">{{item.typeInfo=='in'?$t('center.inbuy'):$t('center.outsell')}}</span>
                        <span class="fl w12">{{item.price}}</span>
                        <span class="fl w14">{{item.number}}</span>
                        <span class="fl w20">{{item.total_price}}</span>
                        <span class="fl w8 tr curPer ceilColor" @click="revoke(item.id)">{{$t('revoke')}}</span>
                    </li>
                </ul>
                <ul class="list-item ft12" v-if="flags02&&enList02.length>0">
                    <li v-for="item in enList02" class="clear">
                        <span class="fl w20">{{item.create_time}}</span>
                        <span class="fl w12">{{item.currency_name}}/{{item.legal_name}}</span>
                        <span class="fl w12" :class="{'green': item.typeInfo == 'in'}">{{item.typeInfo=='in'?$t('center.inbuy'):$t('center.outsell')}}</span>
                        <span class="fl w12">{{item.price}}</span>
                        <span class="fl w14">{{item.number}}</span>
                        <span class="fl w20">{{item.total_price}}</span>
                        <span class="fl w8 tr curPer ceilColor" @click="revoke(item.id)">{{$t('revoke')}}</span>
                    </li>
                </ul>
                <div class="getmore tc fColor1 ft14 mt10 curPer" @click="getMore" v-if="!loading && enList01.length>9||enList02.length>9">{{more}}</div>
                <div class="tc" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt=""  class="lodw20">
                    <p class="ft12 baseColor">{{$t('loading')}}...</p>
                </div>
                <div class="no_data tc" v-if="flags01==true && enList01.length<=0">
                <img src="@/assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">{{$t('nodata')}}</p> 
            </div>
            <div class="no_data tc" v-if="flags02==true && enList02.length<=0">
                <img src="@/assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">{{$t('nodata')}}</p> 
            </div>
            <div class="no_data tc" v-if="enList01.length<=0 && enList02.length<=0 && flags01==false&&flags02 == false">
                <img src="@/assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">{{$t('nodata')}}</p> 
            </div>
            </div>
            
        </div>
        <div class="content" v-show="isUrl==1">
            <ul class="list-title fColor2 ft12 clear bdr-part">
                <li class="fl w18">{{$t('time')}}</li>
                <li class="fl w10">{{$t('center.pairs')}}</li>
                <li class="fl w8">{{$t('number')}}</li>
                <li class="fl w10">{{$t('price')}}</li>
                <li class="fl w8">{{$t('center.dealtotal')}}</li>
                <li class="fl w10">{{$t('center.tprice')}}</li>
                <li class="fl w10">{{$t('status')}}</li>
                <li class="fl w15">{{$t('rate')}}</li>
                <li class="fl w8 tr">{{$t('center.direction')}}</li>
            </ul>
            <div class="container scroll" v-if="hisList.length>0">
                <ul class="list-item ft12">
                    <li v-for="item in hisList" class="clear">
                       <span class="fl w18">{{item.time}}</span>
                        <span class="fl w10">{{item.currency_name}}/{{item.legal_name}}</span>
                        <span class="fl w8">{{item.number}}</span>
                        <span class="fl w10">{{item.price}}</span>
                        <span class="fl w8">{{(item.price * item.number) | numFilter}}</span>
                        <span class="fl w10">{{item.price}}</span>
                        <span class="fl w10">{{$t('center.contran')}}</span>
                        <!-- <span class="fl w10">{{item.type=='in'? item.buyFee||$t('center.nothing'):item.sellFee||$t('center.nothing')}}</span> -->
                        <span class="fl w15" v-if="item.type == 'in'">{{item.buyFee||$t('center.nothing')}}</span>
                        <span class="fl w15" v-if="item.type == 'out'">{{item.sellFee||$t('center.nothing')}}</span>
                        <span class="fl w15" v-if="item.type == 'in/out'">{{item.fee||$t('center.nothing')}}</span>
                        <!-- <span class="fl w8 tr" :class="item.type=='out'?'redColor':''">{{item.type=='in'?$t('center.inbuy'):$t('center.outsell')}}</span> -->
                        <span class="fl w8 tr green" v-if="item.type == 'in'">{{$t('center.inbuy')}}</span>
                        <span class="fl w8 tr redColor" v-if="item.type == 'out'">{{$t('center.outsell')}}</span>
                        <span class="fl w8 tr" v-if="item.type == 'in/out'">买入/卖出</span>
                    </li>
                </ul>
                <div class="getmore tc fColor1 ft14 mt10 curPer" @click="getMore01" v-if="!loading && hisList.length>9">{{more01}}</div>
                <div class="tc" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt="" class="lodw20">
                    <p class="ft12 baseColor">{{$t('loading')}}...</p>
                </div>
            </div>
            <div class="no_data tc" v-if="hisList.length<=0">
                <img src="@/assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">{{$t('nodata')}}</p>   
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "entrust",
  data() {
    return {
      address: "",
      isChoosed: 0,
      isUrl: 0,
      page: 1,
      page01: 1,
      url: "entrust",
      type: "in",
      more: this.$t('more'),
      more01: this.$t('more'),
      loading: false,
      urlList: [
        { title: this.$t('center.cdel'), url: "transaction_in" },
        { title: this.$t('center.hdeal'), url: "transaction_complete" }
      ],
      wayList: [{ title: this.$t('center.inbuy'), type: "in" }, { title: this.$t('center.outsell'), type: "out" }, { title: this.$t('center.all'), type: "all" }],
      enList: [],
      enList01: [],
      enList02: [],
      hisList: [],
      urls: "transaction_in",
      types: "in",
      flags01:true,
      flags02:false
    };
  },
  created() {
    this.address = localStorage.getItem("address") || "";
    this.token = localStorage.getItem("token") || "";
    //  this.getdata('transaction_in');
  },
  methods: {
    changeType(index, url) {
      this.isUrl = index;
      this.url = url;
      this.page = 1;
      this.more = this.$t('more');
      if (index == 0) {
        this.getdata(this.urls, this.types);
      } else if (index == 1) {
        this.getHistory();
      }
    },
    wayChoose(index, type) {
      var that = this;
      this.page = 1;
      // this.type = type;
      this.more = this.$t('more');
      this.isChoosed = index;
      if (index == 1) {
        this.flags02 = true;
        this.flags01 = false;
        this.urls = "transaction_out";
        this.types = "out";
        this.getdata(this.urls, this.types);
      } else if (index == 0) {
        this.flags02 = false;
        this.flags01 = true;
        this.urls = "transaction_in";
        this.types = "in";
        this.getdata(this.urls, this.types);
      }else if(index == 2){
        if(this.enList02.length>0){
          this.flags02 = true;
        }else{
           this.flags02 = false;
        }
        if(this.enList01.length>0){
          this.flags01 = true;
        }else{
           this.flags01 = false;
        }
         this.getdata("transaction_in", "in");
         this.getdata("transaction_out", "out");
      }
    },
    getMore() {
      this.page = ++this.page;
      this.loading = true;
      // console.log(this.page);
      // console.log(this.types);
      // this.getdata(this.urls, this.types);
        this.getdata("transaction_in", "in");
         this.getdata("transaction_out", "out");
    },
    getMore01() {
      this.page01 = ++this.page01;
      this.loading = true;
      this.getHistory();
    },
    revoke(id) {
      
      if(!this.token){
        return;
      }
      var that = this;
      layer.confirm(that.$t('lay.revoke'), {btn:[that.$t('lay.sure'), that.$t('lay.ceil')]}, () => {
        // var id = id;
        that
          .$http({
            url: "/api/" + "transaction_del",
            method: "post",
            data: {
              // address:that.address,
              type: that.types,
              id: id
            },
            headers: { Authorization: this.token }
          })
          .then(res => {
            res = res.data;
            // console.log(res);
            if (res.type === "ok") {
              layer.msg(res.message);
              that.getdata(that.urls, that.types);
            } else {
              layer.msg(res.message);
            }
          })
          .catch(error => {
            // console.log(error)
          });
      });
    },

    getdata(url, type) {
      // console.log(type);
      var that = this;
      var page = this.page;
      if(!this.token){
        return;
      }
      this.$http({
        url: "/api/" + url,
        method: "post",
        data: {
          page: page
        },
        headers: { Authorization: this.token }
      })
        .then(res => {
          // console.log(res);
          res = res.data;
          this.loading = false;
          let mlist = [];
          if (res.type == "ok") {
            mlist = res.message.list;
          }
          if (url == "transaction_in") {
            //  page = 1;
            //  this.enList = []
            if (page == 1) {
              // console.log("-----------------");
              this.enList01 = mlist;
            } else {
              var newEist = mlist;
              console.log(newEist.length);
              if (newEist.length <= 0) {
                this.more = that.$t('nomore');
                return;
              } else {
                this.enList01 = this.enList01.concat(newEist);
              }
              // conaole.log(this.enList)
            }
            for (var i in this.enList01) {
              this.enList01[i].typeInfo = type;
            }
            // console.log(this.enList);
          } else if(url == "transaction_out"){
            var newEist = mlist;
            //  page = 1;
            //  this.enList = [];
            //    console.log(res.message.data.data);
            if (page == 1) {
              this.enList02 = mlist;
            } else {
              console.log('kkkkkkkk')
              console.log(newEist)
              console.log(newEist.length)
              var newEist = mlist;
              if (newEist.length <= 0) {
                this.more = that.$t('nomore');
                return;
              } else {
                this.enList02 = this.enList02.concat(newEist);
              }
              //   console.log(this.hisList)
            }
            for (var i in this.newEist) {
              this.enList02[i].typeInfo = type;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //历史委托
    getHistory() {
      if(!this.token){
        return;
      }
      var page01 = this.page01;
      this.$http({
        url: "/api/" + "transaction_complete",
        method: "post",
        data: {
          page: page01
        },
        headers: { Authorization: this.token }
      })
        .then(res => {
          console.log(res);
          this.loading = false;
          let mlist = [];
          if(res.data.type == 'ok'){
              mlist = res.data.message.list;
          }
          if (page01 == 1) {
            this.hisList = mlist;
          } else {
            var newhist = mlist;
            if (newhist.length <= 0) {
              this.more = that.$t('nomore');
              return;
            } else {
              this.hisList = this.hisList.concat(newhist);
            }
            // conaole.log(this.enList)
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    var that = this;
    // console.log('entrust2')
    if (this.token != "") {
      that.getdata(this.urls, this.types);
      // eventBus.$on("toTrade", function() {
      //   that.isUrl = 0;
      //   that.isChoosed = 0;
      //   that.getdata(that.urls, that.types);
      // });
    }
    eventBus.$on('tradeOk',function(data){  
        if(data.status == 'ok'){
            that.getdata(that.urls, that.types);
        }
    })
  }
};
</script>
<style scoped>
.entrust {
  color: #333;
}
.title {
  height: 48px;
  line-height: 46px;
  padding: 0 40px 0 30px;
}
.tab_title {
  display: inline-block;
  line-height: 46px;
  height: 46px;
}
.tab_title span {
  cursor: pointer;
}
.tab_title span:not(:last-child) {
  margin-right: 40px;
}
.content {
  padding: 0 40px 0 30px;
  height: 500px;
}
.list-title {
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  height: 40px;
  overflow: hidden;
}
.no_data {
  padding: 50px 0;
}
.container {
  height: 90%;
  overflow: auto;
}
.list-item li {
  line-height: 30px;
}
.list-item li span {
  display: inline-block;
  float: left;
}
.list-item li span:nth-child(3) {
  color: #cc4951;
}
.list-item li:hover {
}
.list-item li span.green {
  color: #55a067;
}
</style>


