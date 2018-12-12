<template>
    <div class="noticeDetail clr-part bg-part">
        <indexHeader></indexHeader>
        <div class="account-wrap">
            <div class="account">
                <div>
                    <div class="back-nav  ft20">
                        <span class="fr  curPer" @click="goBefore">&lt;&lt;{{$t('back')}}</span>
                    </div>
                    <div class="nav-after"></div>
                </div>
                <div class="account-content">
                    <div class="detailBig">
                        <div class="mb30 clear">
                            <span class=" w90 fl tc title">{{title}}</span>
                        </div>
                        <div class="detailContent ">
                            <p v-html="content" ref="con"></p>
                        </div> 
                        <div class=" mt40">
                            <p class="tr">{{abstract}}</p>
                            <p class="tr mt5">{{create_time }}</p>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
</template>
<script>
import indexHeader from '@/view/indexHeader'
export default {
    name:'noticeDetail',
    components:{indexHeader},
    data (){
        return{
            title:'',
            content:'',
            abstract:'',
            create_time:''

        }
    },
    created(){
        this.id = this.$route.query.id;
        var locale = window.localStorage.getItem('locale');
        var id = this.id;
        this.getData();
    },
    mounted(){
        // var tags=this.$refs.con.getElementsByTagName('p');
        // console.log(tags)
        // for(var i=0;i<tags.length;i++){
        //     console.log(tags)
        //     console.log(tags[i])
        //     tags[i].style.background='transparent'
        // }
    },
    watch:{
       $route(){
           if(this.$route.query.id != this.id){
               this.id = this.$route.query.id;
               this.$nextTick(()=>{
                   this.getData();
               })
           }
       }
    },
    methods:{
        goBefore(){
            this.$router.back(-1);
        },
        getData(){
            this.$http({
            url:  '/api/news/detail?'+'id='+this.id,
            method:'post',
            headers: { 'Authorization': window.localStorage.getItem('token') }
        }).then(res=>{
            res = res.data;
            if(res.type  === 'ok'){
                console.log('uuuuu')
                console.log(res.message)
                this.title=res.message.title;
                this.content=res.message.content;
                this.abstract=res.message.abstract;
                var time=res.message.create_time;
                console.log(res.message.update_time,time)
                this.create_time= this.timestampToTime(time);
                
                // this.setProperty(this.timestampToTime(res.message.update_time));
                console.log('ppp')
            }else{
                layer.msg(res.message);
            }
        }).catch(error=>{
            console.log(error)
        })
        },
    //    setProperty(){
    //         var tags=document.getElementsByTagName('p');
    //         HTMLCollection.prototype.forEach=function(callback){
    //                 [].slice.call(this).forEach(callback);
    //         };
    //         tags.forEach(function(e, i){
    //                 e.style.backgroundColor='#666 !important'
    //         });
            
            
    //    },
       
        timestampToTime(timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = this.change(date.getDate()) + ' ';
            var h = this.change(date.getHours()) + ':';
            var m = this.change(date.getMinutes()) + ':';
            var s = this.change(date.getSeconds());
            return Y + M + D + h + m + s;
        },
        change(t) {
            if (t < 10) {
                return "0" + t;
            } else {
                return t;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.title{
    font-size: 20px;
    font-weight: bold;
}
.noticeDetail{
    .account-wrap{
        // background: url(../assets/images/account_center_bg.jpg) no-repeat;
        // background-size: cover;
        .account {
            width: 1200px;
            margin: 0 auto;
            padding-top: 30px;
            overflow: hidden;
            min-height: 880px;
            .nav-after{
                display: block;
                height: 10px;
                // background-color: #262a42;
            }
            .account-content {
                width: 100%;
                min-height: 750px;
                // background-color: #181b2a;
                .detailBig{
                    padding: 0px 46px 20px;
                    .mb30{
                        margin-bottom: 30px;
                    }
                    .detailContent{
                        line-height: 26px;
                        p{
                          &>*{
                            // background-color: #181b2a!important;
                           }  
                        }
                       
                    }
                    .mt5{
                        margin-top: 5px;
                    }
                }

            }

        }
    }
}
</style>



