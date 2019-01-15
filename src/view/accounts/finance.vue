<template>
    <div class="bgf8 bg-part clr-part main-wrap scroll">
        <div class="header bgf8 bg-part">
            <p class="fl">{{$t('account.totalassets')}}：<span class="asset_num">{{total}}</span><span class="asset_name"> USDT</span><span class="ft12 "> ≈ <span>{{totalCNY}}</span>CNY</span>
            <!-- <label class="min_lab ft14"><input type="checkbox" />隐藏小额资产</label><i></i><label class="inp_lab"><input  type="text"/><i></i></label> -->
            </p>
            <div class="hide-min" >
                <input type="checkbox" id="min" v-model="hideMin" :checked='hideMin' style="margin:0 5px 0 30px">
                <label for="min" class="ft16">{{$t('account.hideSm')}}</label>
                <input type="text" v-model="keyword" :placeholder="$t('inpCur')" class='search'>
                <router-link  class="fr light_blue" style="font-size:14px;color:#563BD1;margin-left:50px" to="/allRec">{{$t('account.allRec')}}</router-link>
            </div>
            <p class="fr right_text mt20 light_blue">
                <!-- <span class="record" @click="record">财务记录</span> -->
                <span class="address ft14 light_blue" @click="withdraw_address">{{$t('account.upaddress')}}</span>
            </p>
        </div>
        <div class="content  ft12">
           <div class="content_top flex alcenter fColor2">
               <p class="flex1 tc">{{$t('market.currency')}}<i></i></p>
               <p class="flex1 tc">{{$t('center.available')}}</p>
               <p class="flex1 tc">{{$t('account.freezes')}}</p>
               <p class="flex1 tc">{{$t('account.conversion')}}(CNY)</p>
               <!-- <p class="flex1 tc">BTC估值<i></i></p> -->
               <!-- <p class="flex1 tc">锁仓</p> -->
               <p class="flex1 tc">{{$t('do')}}</p>
           </div>
           <ul class="content_ul">
               <li v-for="(item,index) in asset_list" :key="index" :hidden='((item.change_balance - 0 -minBalance)<=0&&hideMin)||search(item.currency_name)'>
                    <div class="content_li flex alcenter between bdr-part">
                   <p class="flex1 tc">{{item.currency_name}}</p>
                   <p class="flex1 tc">{{item.change_balance}}</p>
                   <p class="flex1 tc">{{item.lock_change_balance}}</p>
                   <p class="flex1 tc">{{item.cny_price}}</p>
                   <!-- <p class="flex1 tc">{{item.lock_position}}</p> -->
                   <p class="flex1 tc operation">
                       <span v-if="item.is_recharge==0" @click="noopen" class="no_open">{{$t('account.charging')}}</span>
                       <span class="light_blue" v-if="item.is_recharge==1" @click="excharge(index,item.currency)">{{$t('account.charging')}}</span>
                       <span v-if="item.is_pick_up==0" @click="noopen" class="no_open">{{$t('account.withdraw')}}</span>
                       <span class="light_blue" v-if="item.is_pick_up==1" @click="withdraw(index,item.currency,item.currency_name)">{{$t('account.withdraw')}}</span>
                       <span class="light_blue" @click="rec(index,item.currency)">{{$t('account.record')}}</span>
                   </p>
                   </div>
                   <!--充币区-->
                   <div class="hide_div bdr-part" v-if="index == active">
                       <p class="fColor2 ft12">{{$t('account.cgaddress')}}</p>
                       <p class="mt50 mb50"><span class="ft18  excharge_address" :class="{'bg':flags}">{{excharge_address}}</span><span id="copy" @click="copy" class="copy ft14 light_blue">{{$t('account.copy')}}</span><span class="ewm_wrap"><span class="ewm ft14 light_blue" @click="show_ewm">{{$t('account.code')}}</span>
                         <div class="ewm_img" id="code" :class="{'hide':isHide}">
                             
                         </div>
                         <!-- <img class="ewm_img" :class="{'hide':isHide}" src="../../assets/images/ewm.jpg" /> -->
                       </span></p>
                       <!-- <p class="ft12 fColor2 mb50">查看<span class="excharge_record">充币记录</span>跟踪状态</p> -->
                       <p class="ft12 fColor2 mb15 mt80">{{$t('account.notice')}}</p>
                       <ul class="tips_ul ft12 fColor2">
                           <!-- <li class="tips_li" style="list-style:disc inside" v-for="item in tip_list">{{item}}</li> -->
                           <li>
                                • {{$t('account.a1')}}{{item.currency_name}}{{$t('account.a2')}}<br>
                                • {{item.currency_name}} {{$t('account.a3')}}<br>
                                • {{$t('account.a4')}}<br>
                                • {{$t('account.a5')}}：{{minNum}} {{item.currency_name}} ，{{$t('account.a6')}}<br>
                                • {{$t('account.a7')}}<br>
                                • {{$t('account.a8')}}
                           </li>
                       </ul>
                   </div>
                   <!--提币区-->
                   <div class="hide_div bdr-part" v-if="index == active01">
                       <p class="fColor2 ft12 mb15">{{$t('account.whaddress')}}</p>
                       <!-- <input class="address_inp clr-part  mb30" type="text" v-model="address" /> -->
                       <select class="address_inp clr-part  mb30" v-model="address">
                           <option value="">{{$t('account.chaddress')}}</option>
                           <option :value="item.address" v-for="(item,index) in addressList" :key="index">{{item.address}}</option>
                       </select>
                       <p class="fColor2 ft12 mb15 flex between alcenter"><span>{{$t('number')}}</span><span>{{$t('center.available')}}：<span class="use_num">{{balance}} {{coinname}}</span><span></span></span></p>
                       <label class="num_lab flex between mb30">
                            <input class="clr-part" type="text" :placeholder="min_number" v-model="number" />
                            <span>{{coinname}}</span>
                        </label>
                       <div class="flex mb30">
                           <div class="left_inp_wrap flex1">
                               <p class="fColor2 ft12 mb15">
                                   <span>{{$t('rate')}}</span>
                                   <!-- <span>{{$t('account.range')}}：<span>{{ratenum}}</span></span> -->
                               </p>
                               <label class="range_lab flex alcenter between"><input class="clr-part" disabled  type="text" v-model="rates" /><span>{{coinname}}</span></label>
                           </div>
                           <div class="right_inp_wrap flex1">
                               <p class=" mb15">
                                   <span class="fColor2 ft12">{{$t('account.havenum')}}</span>
                               </p>
                               <label class="get_lab flex alcenter between"><input class="clr-part" disabled v-model="reachnum" type="number" /><span>{{coinname}}</span></label>
                           </div>
                       </div>
                        <p class="fColor2 ft12 mb15">{{$t('account.uppwd')}}</p>
                       <input class="address_inp clr-part  mb30" type="password" v-model="password" />
                       <div class="flex">
                        <div class="flex2">
                       <!-- <p class="ft12 fColor2 mb15">温馨提示</p> -->
                       <ul class="tips_ul ft12 fColor2" style="list-style:disc inside">
                           <li>{{$t('account.minnum')}}：{{min_number}}{{item.currency_name}}。</li>
                           <li>
                                {{$t('account.call')}}
                           </li>
                           <li>
                                {{$t('account.a8')}}
                           </li>
                       </ul>
                       </div>
                       <div class="flex1 tc"><button class="withdraw_btn" @click="mention">{{$t('account.withdraw')}}</button></div>
                       
                       </div>
                   </div>
                   <!--记录区-->
                   <div class="hide_div bdr-part rec-box" v-if="index == active02">
                       <div class="rec-con">
                        <div class="rec-title">
                            <span>{{$t('number')}}</span>
                            <span>{{$t('account.record')}}</span>
                            <span>{{$t('time')}}</span>
                        </div>
                        <ul class="rec-list">
                            <li v-for="(reItem,reIndex) in recData" v-if="recData.length !=0" :key="reIndex">
                                <span>{{reItem.change}}</span>
                                <span>{{reItem.memo}}</span>
                                <span>{{reItem.create_time}}</span>
                            </li>
                            <li class="no_rec mt10 light_blue" v-if="recData.length !=0" @click="more(item.currency)">{{moreLog}}</li>
                            <li class="no_rec mt10 light_blue" v-show="recData.length ==0">{{$t('nodata')}}</li>
                        </ul>
                       </div>
                   </div>
               </li>
           </ul>
           <!-- <div class="tc ft16  mt50" v-show="asset_list.length<=0">暂无数据</div> -->
        </div>
    </div>
</template>
<script>
import indexHeader from '@/view/indexHeader'
import left from '@/view/left'
import "@/lib/clipboard.min.js"
import "@/lib/jquery.qrcode.min.js"
export default {
    name:'finance',
    data(){
        return{
            minBalance:'',
            hideMin:false,  
            recData:[],
            token:'',
            flags:false,
            flag:false,
            isHide:true,
            active:'a',
            active01:'a',
            active02:'a',
            addr:'',
            url:'',
            excharge_address:'',
            address:'',
            number:'',
            rate:'',
            coinname:'',
            balance:'',
            ratenum:'',
            // reachnum:'',
            min_number:'',
            currency:'',
            asset_list:[],
            keyword:'',
            tip_list:[
                '请勿向上述地址充值任何非USDT资产，否则资产将不可找回。','USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。','请勿向上述地址充值任何非USDT资产，否则资产将不可找回。','USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。'
            ],
            tip_list01:[
                '请勿向上述地址充值任何非USDT资产，否则资产将不可找回。','USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。','请勿向上述地址充值任何非USDT资产，否则资产将不可找回。','USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。'
            ],
            page:1,
            moreLog:this.$t('more'),
            rete:'',
            total:'',
            totalCNY:'',
            addressList:[],
            password:'',
            minNum:''
        }
    },
    components:{
        indexHeader,
        left
    },
    computed:{
         reachnum(){                   
                function numSub(num1, num2) {    //解决减法计算精度
                    var baseNum, baseNum1, baseNum2;
                    var precision;// 精度
                    try {
                        baseNum1 = num1.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum1 = 0;
                    }
                    try {
                        baseNum2 = num2.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum2 = 0;
                    }
                    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
                    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
                    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
                }; 
             Math.formatFloat = function(f, digit) { 
                    var m = Math.pow(10, digit); 
                    return parseInt(f * m, 10) / m; 
                } 
               var rateNum = Math.formatFloat(this.number*this.rate,5);
             return numSub(this.number,rateNum);
         },
         rates(){
            function numMulti(num1, num2) {  //解决乘法计算精度
                var baseNum = 0;
                try {
                    baseNum += num1.toString().split(".")[1].length;
                } catch (e) {
                }
                try {
                    baseNum += num2.toString().split(".")[1].length;
                } catch (e) {
                }
                return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
            };
              return numMulti(this.number,this.rate)
         }   
    },
    methods:{
        search(name){
            var l = this.keyword.length;
            if(l){
                if(l>name.length){
                return true;
                } else {
                if(name.slice(0,l) == this.keyword.toUpperCase()){
                    return false;
                } else {
                    return true;
                }
                }
            } else {
                return false;
            }
      
            },
        //刷新页面
        refresh(){
            this.$http({
                url: '/api/wallet/refresh',
                method:'get',
                data:{},
                headers:{'Authorization':this.token}
            }).then( res => {
                if(res.data.type == 'ok'){
                    
                }
            })
        },
         
        goRecord(){
            this.$router.push({name:'coinRecord'})
        },
        init(){
            var that = this;
            var clipboard = new Clipboard('.copy')
            clipboard.on('success', function (e) {
               layer.alert(that.$t('lay.copys'))
            });
            clipboard.on('error', function (e) {
                alert(that.$t('lay.fcopy'))
            });
        },
        getRate(currency){
           this.$http({
                        url: '/api/wallet/get_info',
                        method:'post',
                        data:{currency:currency},
                        headers:{'Authorization':this.token}
                    }).then( res => {
                        if(res.data.type == 'ok'){
                            this.minNum = res.data.message.min_number;
                            this.rate = res.data.message.rate
                        }
                    }) 
        },
        //获得币种地址
        getAddress(currency){
                  var i = layer.load();
                  this.addressList = [];
                   this.$http({
                        url: '/api/wallet/get_address',
                        method:'post',
                        data:{currency:currency},
                        headers:{'Authorization':this.token}
                    }).then( res => {
                        layer.close(i);
                        if(res.data.type == 'ok'){
                             this.addressList = res.data.message;
                        }
                    })
        },
        //充币
        excharge(index,currency){
            console.log(currency);
            this. currency= currency;
            if(this.flag){
                this.flag = false;
                this.active = 'a';
                this.active01 = 'a';
                 this.active02 = 'a';
            }else{
                var i = layer.load();
                this.flag = true;
                this.active = index;
                this.active01 = 'a';
                 this.active02 = 'a';
            }
            this.sendData(currency,i);
            this.getRate(currency);
        },
        sendData(currency,i){   
            var that = this;
            that.excharge_address = ''
            // $.ajax({
            //     type: "POST",
            //     url: '/api/' + 'wallet/get_in_address',
            //     data: {
            //         currency:currency
            //     },
            //     dataType: "json",
            //     async: true,
            //     beforeSend: function beforeSend(request) {
            //         request.setRequestHeader("Authorization", that.token);
            //     },
            //     success: function(res){
            //         if (res.type=="ok"){
            //             console.log(res)
            //             that.excharge_address=res.message;
            //             // 生成二维码
            //             $('#code').qrcode({
            //                 width: 100, //宽度
            //                 height:100, //高度
            //                 text:res.message
            //             });
            //         }else{
            //             console.log(res.message)
            //         }
            //     }
            // })
            this.$http({
                url: '/api/' + 'wallet/get_in_address',
                method:'post',
                data:{currency:currency},
                headers: {'Authorization':  that.token},
                }).then(res=>{
                    layer.close(i);
                    console.log(res)
                    if (res.data.type=="ok"){
                        that.excharge_address=res.data.message;
                        // 生成二维码
                        $('#code').qrcode({
                            width: 100, //宽度
                            height:100, //高度
                            text:res.data.message
                        });
                    }else{
                        console.log(res.data.message)
                    }
                }).catch(error=>{
                    console.log(error)
            })
        },
        //提币
        withdraw(index,currency,currency_name){
            this.currency=currency;
             if(this.flag){
                this.flag = false;
                this.active = 'a';
                this.active01 = 'a'
                 this.active02 = 'a';
            }else{
                this.flag = true;
                 this.active01 = index;
                 this.active = 'a';
                 this.active02 = 'a';
                 this.getAddress(currency)
            }
            this.getNum(currency);
             this.getRate(currency);
        },
        //记录
        rec(index,currency){
            
             if(this.flag){
                this.flag = false;
                this.active = 'a';
                this.active01 = 'a'
                 this.active02 = 'a';
                 console.log(index)
            }else{
                 console.log(index)
                this.flag = true;
                 this.active02 = index;
                 this.active = 'a';
                  this.active01 = 'a';
                  //充币、提币记录
                  this.page = 1;
                 this.recData = [];
                  this.getLog(currency);
                
            }
        },
        
        getLog(currency){
            
            this.$http({
                        url: '/api/wallet/legal_log',
                        method:'post',
                        data:{type:'change',currency:currency,page:this.page},
                        headers:{'Authorization':this.token}
                    }).then( res => {
                        console.log(res);
                        console.log(res.data.message.list)
                        if(res.data.type == 'ok'){
                            console.log(res);
                            this.recData = this.recData.concat(res.data.message.list);
                            if(res.data.message.list.length != 0){
                                this.moreLog = this.$t('more')
                            }else{
                                this.moreLog = this.$t('nomore')
                            }
                        }
                    })
        },
        //加载更多记录
        more(currency){
            this.moreLog = this.$t('loading')
            this.page++;
            this.getLog(currency);
        },

        getNum(currency){
            var that = this;
            $.ajax({
                type: "POST",
                url: '/api/' + 'wallet/get_info',
                data: {
                    currency:currency
                },
                dataType: "json",
                async: true,
                beforeSend: function beforeSend(request) {
                    request.setRequestHeader("Authorization", that.token);
                },
                success: function(res){
                    if (res.type=="ok"){
                        console.log(res)
                        that.coinname=res.message.name;
                        that.balance=res.message.change_balance;
                        that.min_number=res.message.min_number;
                        that.minnumber=res.message.min_number;
                        that.ratenum=res.message.rate+'-'+res.message.rate;
                        // that.reachnum=this.number - this.number*res.message.rate;
                        that.rate=res.message.rate;
                        
                    }else{
                        console.log(res.message)
                    }
                }
            })
        },
        noopen(){
           layer.msg(this.$t('lay.notopen'))
        },
        // 提币按钮
        mention() {
            var that =this;
            var currency = this. currency;
            var address = this.address;
            var number = this.number;
            var rate = this.rate;
            var min_number = this.minnumber;
            if(!address){
                layer.alert(that.$t('lay.caddress'));
                return;
            } 
            if(!number){
                layer.alert(that.$t('lay.cnumber'));
                return;
            } 
            if(!this.password){
                 layer.alert(that.$t('lay.cpwd'));
                return;
            }
            if((number-0)<min_number){
                console.log(number,min_number)
                return layer.alert(that.$t('lay.minnumber'));
            }
            // if(rate=='' || rate>=1){
            //     layer.alert('请输入0-1之间的提币手续费');
            //     return;
            // }
            var i = layer.load();
            $.ajax({
                type: "POST",
                url: '/api/' + 'wallet/out',
                data: {
                    currency:currency,
                    number:number,
                    rate:rate,
                    address:address,
                    password:this.password
                },
                dataType: "json",
                async: true,
                beforeSend: function beforeSend(request) {
                    request.setRequestHeader("Authorization", that.token);
                },
                success: function(res){
                    layer.close(i);
                    console.log(res)
                    if (res.type=="ok"){
                        layer.msg(res.message)
                        setTimeout(() => {
                          window.location.reload();
                    }, 1500);
                    }else if(res.type=='998'){
                        layer.msg(res.message);
                        setTimeout(() => {
                            that.$router.push('/components/resetLegalPwd')
                        }, 1000);
                    }else{
                        layer.msg(res.message);
                    }
                }
            })
            
        },
        exchange(){

        },
        //复制
        copy(){
            var that=this;
          var clipboard = new Clipboard('.copy',{
                    text:function(){
                        return that.excharge_address
                    }
                });
          clipboard.on("success", function (e) {
                        that.flags = true;
                        layer.msg(that.$t('lay.copys'));
                        
                    });
                    clipboard.on("error", function (e) {
                        that.flags = false;
                         layer.msg(that.$t('lay.fcopy'))
                    });
        },
        record(){
            this.$router.push({ name: 'finanrec' });
        },
        withdraw_address(){
            this.$router.push({ name: 'withdraw_address' });
        },
        show_ewm(){
            if(this.isHide){
                this.isHide = false
            }else{
                this.isHide = true
            }
        },
        getdata(){
            var load = layer.load();
            var that = this;
            console.log(that.token)
            // $.ajax({
            //     url: '/api/' + "wallet/list",
            //     type: "POST",
            //     dataType: "json",
            //     async: true,
            //     beforeSend: function beforeSend(request) {
            //        request.setRequestHeader("Authorization", that.token);
            //     },
            //     success: function (data) {
            //     console.log(data)
            //     if (data.type == 'ok') {
            //         that.asset_list=data.message.change_wallet.balance;
            //     } else if (data.type == '999') {
                    
            //     }
            //     }
            // });
            this.$http({
            url: '/api/' + 'wallet/list',
            method:'post',
            data:{},
            headers: {'Authorization':  that.token},
            }).then(res=>{
                layer.close(load)
                console.log(res.data);
                that.minBalance = res.data.message.min_balance;
                that.asset_list=res.data.message.change_wallet.balance;
                that.total = res.data.message.change_wallet.total;
                that.totalCNY = res.data.message.change_wallet.totalCNY;
                that.refresh();
                // this.asset_list.forEach((item,index) => {
                //     this.$http({
                //         url: '/api/wallet/legal_log',
                //         method:'post',
                //         data:{type:'2',currency:item.currency},
                //         headers:{'Authorization':this.token}
                //     }).then( res => {
                //         console.log(res);
                //         console.log(res.data.message.list)
                //         if(res.data.type == 'ok'){
                //             this.recData[index] = res.data.message.list;
                //             console.log(this.recData[index])
                //         }
                //     })
                // })
            }).catch(error=>{
                console.log(error)
            })
        }
    },
    created(){
        this.token= localStorage.getItem('token') || '';
        // this.address=localStorage.getItem('address') || '';
        // console.log(this.address)
        // if(this.address){
        //     this.$http({
        //         url:'/api/'+'money/rechange?user_id='+this.address,
        //         type:'GET'
        //     }).then(res=>{
        //         console.log(res)
        //         this.addr=res.data.message.company_eth_address;
        //         this.url='http://qr.liantu.com/api.php?&w=300&text='+res.data.message.company_eth_address;
        //         var content = this.addr;
        //         // var clipboard = new Clipboard('#copy')
        //     }).catch(error=>{
        //         return error
        //     })
        // }
    },

    mounted(){
        var that = this;
        that.getdata();
        this.init();
    }
};
</script>
<style scoped lang="scss"> 
.search{
    font-size: 14px;
    line-height: 30px;
    margin-left: 16px;
    padding: 0 14px;
    border: 1px solid #ddd;
    border-radius: 2px;
}
    .no_open{
        color: #aaa;
        cursor: not-allowed!important;
    }
    .header{
        padding: 15px 30px;
        overflow: hidden;
    }
    .min_lab{
        margin: 0 10px;
    }
    .min_lab input{
        margin-right: 3px;
    }
    .inp_lab{
        border: 1px solid #6b80ae;
        border-radius: 2px;
        padding: 3px 5px;
    }
    .inp_lab input{
        background: none;
        border: none;
        width: 120px;
        
    }
    .right_text{
        color: #563BD1;
    }
    .right_text span{
        cursor: pointer;
    }
    .record{
        margin-right: 10px;
    }
    .content_ul{
        padding: 0 20px;
    }
    .content_top{
        padding: 10px 20px;
        // background: #161617c7;
    }
    .content_li{
        padding: 15px 0;
        border-bottom: 1px solid #ccc;
    }
    .operation,.copy,.ewm{
        // color: #d45858;
        color: #563BD1;
    }
    .copy{
        margin: 0 30px;
    }
    .copy:hover{
        cursor: pointer;
    }
    .ewm:hover{
        cursor: pointer;
    }
    .operation span{
        cursor: pointer;
    }
    .hide_div{
        border:1px solid #ccc;
        padding: 20px;
    }
    .excharge_record{
        color: #d45858;
    }
    input{
        background: none;
        border: none;
    }
    .address_inp{
        width: 100%;
        border: 1px solid #6b80ae;
        border-radius: 3px;
        padding: 15px 15px;
    }
    .num_lab{
        display: flex;
        width: 100%;
        border: 1px solid #6b80ae;
        border-radius: 3px;
        padding: 15px;
    }
    .num_lab input{
        width: 100%;
    }
    .range_lab,.get_lab{
         border: 1px solid #6b80ae;
        border-radius: 3px;
        padding: 15px;
    }
    
    .right_inp_wrap{
        margin-left: 20px;
    }
    .use_num,.advance{
        color: #d45858;
    }
    .use_num{
        margin-right: 5px;
    }
    .advance{
        margin-left: 5px;
    }
    .withdraw_btn{
        background-color: #d45858;
        color: #fff;
        padding: 15px 70px;
        border: none;
        border-radius: 5px;
    }
    .withdraw_btn:hover{
        cursor: pointer;
    }
    .bg{
        // background: #2b3c71;
    }
    .ewm_wrap{
        position: relative;
    }
    .ewm_img{
        width: 120px;
        height: 120px;
        position: absolute;
        top: 25px;
        left: -30px;
        // border: 10px solid #262a42;
    }
    .hide{
        display: none;
    }
    .rec-box{
        max-height: 400px;
        overflow: auto;
        &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 8px;
           }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #9e9898;
            }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 10px;
                background: #EDEDED;
        }
        .rec-con{
            margin: 10px;
            padding: 0 20px;
            // background: #262a42;
                span{
                    flex:1;text-align: center;
                    line-height: 3;
                }
            .rec-title{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                // color:#fff;
                line-height: 1.5;
            }
            li{
                display: flex;
                
                justify-content: space-between;
                font-size: 12px;
                // color: #728daf;
                // border-top: 1px solid #181b2a;
            }
        }
    }
    .no_rec{
        justify-content: center!important;
        &:hover{
            cursor: pointer;
        }
    }
    .main-wrap{
        height: 820px;
        overflow: auto;
    }
</style>


