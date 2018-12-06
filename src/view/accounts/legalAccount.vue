<template>
    <div class="main bgf8 bg-part clr-part">
        <p class="legal_name">{{legal_name}}</p>
        <div class="legalAccount_msg flex between">
          <div>
              <p class="ft12 msg_title">可用</p>
              <p>{{legal_balance}}</p>
          </div>
          <div>
              <p class="ft12 msg_title">冻结</p>
              <p>{{lock_legal_balance}}</p>
          </div>
          <div>
              <p class="ft12 msg_title">折合（USDT）</p>
              <p>{{legal_price}}</p>
          </div>
        </div>
        <div class="rec_wrap">
           <p class="rec_title flex between">
               <span>财务记录</span>
               <!-- <span class="all">全部</span> -->
           </p>
           <p class="list_title flex around">
               <span class="ft14">数量</span>
               <span class="ft14">记录</span>
               <span class="ft14">时间</span>
           </p>
           <div class="log_wrap bdr-part">
           <ul>
              <li class="flex around ft12" v-for="(item,index) in recData" :key="index">
                  <span class="flex1 ft12 ptb tc">{{item.change}}</span>
                  <span class="flex1 ft12 ptb tc">{{item.memo}}</span>
                  <span class="flex1 ft12 ptb tc">{{item.create_time}}</span>
              </li>
           </ul>
           <p class="ft12 light_blue no_rec" style="text-align:center;margin:30px 0;" v-show="recData.length == 0">暂无记录</p>
           <p class="ft12 light_blue no_rec" style="text-align:center;margin:30px 0;" v-show="recData.length != 0" @click="more">{{moreLog}}</p>
           </div>
        </div>
        <router-link tag="p" class="huazhuan redBg" to='/transferLegal'>划转</router-link>
    </div>
</template>
<script>
export default {
    data(){
        return{
           legal_name:'',
           legal_balance:'',
           lock_legal_balance:'',
           legal_price:'',
           recData:[],
           moreLog:'加载更多',
           page:1,
           currencyId:''
        }
    },
    created(){
       this.token = localStorage.getItem('token') || '';
       this.currencyId = this.$route.params.currency_id;
    },
    mounted(){
        this.init();
       this.getLog();
    },
    methods:{
        init(){
            var load = layer.load();
        var that = this
                 this.$http({
                    url: '/api/' + 'wallet/detail',
                    method:'post',
                    data:{
                        currency:this.$route.params.currency_id,
                        type:'legal'
                    },
                    headers: {'Authorization':  that.token}
                    }).then(res=>{
                        layer.close(load)
                    console.log(res)  
                        if(res.data.type  =='ok'){
                            var msg = res.data.message;
                            that.legal_name = msg.currency_name;
                            that.legal_balance = msg.legal_balance;
                            that.lock_legal_balance = msg.lock_legal_balance;
                            that.legal_price = msg.legal_price;
                             
                        }else{
                            layer.msg(res.message);
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
                        
        },
        //获取记录
        getLog(){
            var load = layer.load();
            this.$http({
                        url: '/api/wallet/legal_log',
                        method:'post',
                        data:{type:'1',currency:this.$route.params.currency_id,page:this.page},
                        headers:{'Authorization':this.token}
                    }).then( res => {
                        layer.close(load);
                        console.log(res);
                        console.log(res.data.message.list)
                        if(res.data.type == 'ok'){
                            console.log(res);
                            this.recData = this.recData.concat(res.data.message.list);
                            if(res.data.message.list.length != 0){
                                this.moreLog = '加载更多'
                            }else{
                                this.moreLog = '没有更多记录了'
                            }
                        }
                    })
        },
        //加载更多
        more(){
            this.page++;
            this.moreLog = '加载中...';
            this.getLog()
        }
    }
}
</script>
<style scoped>
   .legal_name{
       /* background: #1b1e2e; */
       padding: 5px 0;
   }
    .msg_title{
        /* color: #61688a; */
    }
   .main{
       /* color:#fff; */
       padding: 30px;
   }
   .legalAccount_msg{
       /* background: #1b1e2e; */
       padding: 6px 0;
   }
   .legalAccount_msg div p:first-child{
       margin-bottom: 10px;
   }
   .rec_wrap{
       margin-top: 30px;
       margin-bottom: 30px;
   }
   .rec_title{
       margin-bottom: 10px;
       
   }
   .all{
        /* color: #61688a; */
   }
   .list_title{
       padding: 10px 0;
       /* background: #1b1e2e; */
   }
   .huazhuan{
       text-align: center;
       margin-top: 60px;
       background: #d45858;
       padding: 8px;
   }
   .huazhuan:hover{
       cursor: pointer;
   }
   .ptb{
       padding: 8px 0;
   }
   .no_rec{
       cursor: pointer;
   }
   .log_wrap{
       height: 480px;
       overflow: auto;
        border: 1px solid #EDEDED;
       
   }
   .log_wrap::-webkit-scrollbar {/*滚动条整体样式*/
        width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 8px;
       
           }
       .log_wrap::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #9e9898;
            }
        .log_wrap::-webkit-scrollbar-track {/*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 10px;
                background: #EDEDED;
        }
</style>
