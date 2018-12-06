<template>
    <div class="detail clr-part">
        <div class="title  topshadow">
            <div class="inblock">
                <span>全站交易</span>
            </div>
        </div>
        <div class="content" style="overflow:hidden">
            <ul class="list-title fColor2 ft14 clear bdr-part">
                <li class="fl w12">时间</li>
                <li class="fl w12">价格</li>
                <li class="fl w12">交易量</li>
            </ul>
            <div class="containers scroll" v-if="deList.length>0">
                <ul v-for="itm in deList" class="list-item color ft12">
                    <li class="clear flex clr-part bg-hov">
                        <span class=" ">{{itm.time}}</span>
                        <span class="green">{{itm.price}}</span>
                        <span class="">{{itm.number}}</span>
                    </li>
                </ul>
            </div>
            <div class="no_data tc" v-if="deList.length<=0">
                <img src="../assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">暂无数据</p>   
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:"detail",
    data (){
        return{
            address:'',
            isChoosed:2,
            new:false,
            wayList:["买入","卖出","全部"],
            deList:[],
            legal_id:'',
            currency_id:''
        }
    },
    filters:{
		capitalize:function(value){
			return value.substring(11,19)
		}
	},
    created(){
        this.address = localStorage.getItem('address') || '';
    },
    methods:{
        wayChoosed(index){
            this.isChoosed=index;
        },
         //全站交易记录
        complete(legals_id,currencys_id){
            this.$http({
                        url: '/api/'+'transaction/deal',
                        method:'post',
                        data:{
                            legal_id:legals_id,
                            currency_id:currencys_id
                        },  
                        headers: {'Authorization':  localStorage.getItem('token')},    
                    }).then(res=>{
                        console.log(res ,222)
                        // layer.close(i);
                        if(res.data.type == "ok"){
                           this.deList = res.data.message.complete;
                           console.log(this.deList)
                           this.connect();
                        }else{
                            layer.msg(res.data.message)
                        }
                    }).catch(error=>{
                        // console.log(error)
                    })
        },
        connect(){
            console.log('completesocket')
            var that = this;
            that.$socket.emit("login", this.$makeSocketId());
            that.$socket.on('transaction',function(msg){
                // console.log(msg);
                if(msg.type == 'transaction'){
                    var complete = JSON.parse(msg.complete);
                        if(msg.legal_id == that.legal_id && msg.currency_id == that.currency_id){
                             console.log(complete);
                                that.deList = complete;
                                console.log(this.deList)
                        }
                    
                    
                }
            })
        }
      },
    mounted(){
        var that = this;
        eventBus.$on('toTrade0', function (data0) {
            that.currency_id=data0.currency_id
            that.legal_id=data0.legal_id
            that.complete(data0.legal_id,data0.currency_id)
        });
        eventBus.$on('toTrade', function (data0) {
            that.currency_id=data0.currency_id
            that.legal_id=data0.legal_id
            that.complete(data0.legal_id,data0.currency_id)
        })
        eventBus.$on('tradeOk',function(data){
            
            if(data.status == 'ok'){
                that.complete(that.legal_id,that.currency_id)
            }
        })
    } 
}
</script>
<style scoped>
.title{height: 48px;line-height: 40px;padding: 0 10px;}
.tab_title{display: inline-block;line-height: 30px;height: 30px;}
.tab_title span{cursor: pointer;}
.tab_title span:not(:last-child) {margin-right: 40px;}
.content{padding: 0 10px;height: 330px;}
.list-title{line-height: 40px; border-bottom: 1px solid #ccc;height: 40px;}
.list-title li{
    width: 33%;
    text-align: center;
}
.no_data{padding: 50px 0;}
.containers{height: 260px;overflow: auto;}
.list-item li{line-height: 30px; display: flex;}
.list-item li span{display: inline-block; float: left; width: 33.3%;text-align: center;}

/* .list-item li:hover{background-color: #eee; color: #de5959;} */
.list-item li span.green{color: #36a792}
.containers ul li{
    display: flex;
    justify-content: space-around;
}
</style>


