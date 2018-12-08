<template>
    <div class="account-box wrap fColor1 bg-part clr-part">
        <div class="title">
                {{$t('auth.auth')}}
                <span class="fr  curPer" @click="goBefore">&lt;&lt;{{$t('auth.back')}}</span>  
        </div>
        <div class="main-content mt20">
            <div class="tc mt10" v-if="review_status==3">{{$t('auth.refause')}}：{{reply}}</div>
            <div v-show="review_status==0||review_status==3">
                <div class="main-input">
                    <div class="flex alcenter center">
                        <span>{{$t('auth.name')}}：</span>
                        <input type="text" :placeholder="$t('auth.truename')" id="name" v-model="name">
                    </div>
                    <div class="flex alcenter center mt20">
                        <span>{{$t('auth.idnum')}}：</span>
                        <input type="text" :placeholder="$t('auth.truenum')" id="card" v-model="card_id">
                    </div>
                </div>
                <div class="mt40 fColor1 ft14 tc">{{$t('auth.img')}}</div>
                <div class="idimg flex center mt40">
                    <div>
                        <img :src="src01" alt="">
                        <input type="file" id="file1" accept="image/*" name="file1" @change="file1">
                    </div>
                    <div>
                        <img :src="src02" alt="">
                        <input type="file" id="file2" accept="image/*" name="file2" @change="file2">
                    </div>
                    <div>
                        <img :src="src03" alt="">
                        <input type="file" id="file3" accept="image/*" name="file3" @change="file3">
                    </div>
                </div>
                <div class="updata tc">
                    <input type="button" class="redBg curPer" :value="$t('auth.up')" @click="updata">
                </div>
            </div>
            <div  v-show="review_status==1">
                <div class="tc ft30 au-statue">
                    {{$t('auth.ising')}} 
                </div> 
            </div>
            <div v-show="review_status==2">
                <div class="tc ft30 au-statue">
                    {{$t('auth.ised')}}
                </div>
            </div>
            
        </div>


       
    </div>
</template>
<script>
export default {
    name:'authentication',
    data(){
        return {
           name:'',
           card_id:'',
           src1:'',
           src2:'',
           src3:'',
           src01:'../../static/imgs/cardFront.jpg',
           src02:'../../static/imgs/cardBack.jpg',
           src03:'../../static/imgs/hdimg.jpg',
           review_status:'',
           reply:''
        }
    },
    created(){
        this.token=localStorage.getItem('token')
    },
    methods:{
        goBefore(){
            this.$router.back(-1);
        },
        file1(){
            var that = this;
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); 
            reader.onload = function(e){
                that.src1=e.target.result
                that.src01=e.target.result
            } 
            var formData = new FormData();
            formData.append("file", event.target.files[0]); 
            console.log(formData);
            var i= layer.load();
            $.ajax({
                url: '/api/'+'upload',
                
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function beforeSend(request) {
                    request.setRequestHeader("Authorization", that.token);
                },
                success: function (msg) {
                    layer.close(i);
                    console.log(msg)
                    that.src1=msg.message

                }
            });     

        },
        file2(){
            var that = this;
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); 
            reader.onload = function(e){
                that.src2=e.target.result
                that.src02=e.target.result
            } 
            var formData = new FormData();
            formData.append("file", event.target.files[0]); 
            var i= layer.load();
            $.ajax({
                url: '/api/'+'upload',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function beforeSend(request) {
                    request.setRequestHeader("Authorization", that.token);
                },
                success: function (msg) {
                    layer.close(i);
                    that.src2=msg.message
                }
            });    
        },
        file3(){
            var that = this;
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); 
            reader.onload = function(e){
                that.src3=e.target.result
                that.src03=e.target.result
            } 
            var formData = new FormData();
            formData.append("file", event.target.files[0]); 
            var i= layer.load();
            $.ajax({
                url: '/api/'+'upload',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function beforeSend(request) {
                    request.setRequestHeader("Authorization", that.token);
                },
                success: function (msg) {
                    layer.close(i);
                    that.src3=msg.message
                }
            });    
        },
        updata(){
            var that = this;
            let name = this.$utils.trim(that.name);
            let card_id = this.$utils.trim(that.card_id);
            // var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(this.name.length == ''){
                layer.tips(that.$t('lay.nameplease'), '#name');
                return;
            }
            if(this.card_id.length == ''){
                layer.tips(that.$t('lay.idplease'), '#card');
                return;
            }
            // if(!reg.test(card_id)){
            //     layer.tips('请输入合法的身份证号!', '#card');
            //     return;
            // }
            if((that.src1==''||that.src2=='')||(that.src3=='')){
                layer.msg(that.$t('lay.comid'))
                return;
            }
            var i= layer.load();
            this.$http({
                url: '/api/'+'user/real_name',
                method:'post',
                data:{
                    name:name,
                    card_id:card_id,
                    front_pic:that.src1,
                    reverse_pic:that.src2,
                    hand_pic:that.src3

                },  
               
                headers: {
                    'Authorization':  that.token,
                   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                }    
            }).then(res=>{
                console.log(res);
                    layer.close(i);
                    if(res.data.type=='ok'){
                        layer.msg(res.data.message)
                        setTimeout(function(){
                            that.$router.back(-1);
                        },2000)
                        
                    }else{
                        layer.msg(res.data.message)
                    }
                   

                }).catch(error=>{
                    
            })  
        },
        Info(){
            var i =layer.load();
            var that = this;
            this.$http({
                url: '/api/'+'user/info',
                method:'get',
                data:{},  
                headers: {'Authorization':  that.token}   
            }).then(res=>{
                layer.close(i);
                that.review_status=res.data.message.review_status;
                }).catch(error=>{
                    
            })
        },
        replyData(){
            this.$http({
            url: '/api/'+'user/user_real_info',
            method:'get',
            data:{},
            headers: {'Authorization':  this.token,}    
        }).then(res=>{
            console.log(res);
            if(res.data.type=='ok'){
                this.reply=res.data.message.reply;
            }else{
                
            }
        })
        }
    },
    mounted(){
       this.Info();
       this.replyData();
    }
}
</script>
<style scoped lang="scss">
    .account-box{
        margin: 30px auto 0;
        width: 1200px;
        min-height: 1080px;
        .title{
            width: 100%;
            line-height: 60px;
            border-radius: 4px;
            padding:0 20px;
        }
        .main-content{
            min-height: 1080px;
            border-radius: 2px;
            .main-input{
                margin: 0 auto;
                text-align: center;
                padding-top: 100px;
                span{
                    width:100px;
                }
                input{
                    width: 320px;
                    min-height: 46px;
                    border: 1px solid #eee;
                    padding: 0 20px;
                    font-size: 14px;
                    border-radius: 3px;
                }
            }
            .idimg{
                div{
                    width: 180px;
                    height: 110px;
                    overflow: hidden;
                    position: relative;
                    // background: url('../../static/imgs/addimg.png') no-repeat;
                    background-size: 100% 100%;
                    border: 1px solid #E2E2E2;
                    margin-left: 50px;
                    img{
                        width: 100%;
                    }
                    input{
                        position: absolute;
                        z-index: 11110;
                        opacity: 0;
                        width: 100%;
                        height: 110px;
                        top: 0;
                        cursor: pointer;
                    }
                }
                
            }
            .updata{
                input{
                    width: 300px;
                    height: 45px;
                    border-radius: 4px;
                    font-size: 14px;
                    margin: 0 auto;
                    margin-left: 100px;
                    margin-top: 60px;
                    // background: #5697f4
                }
            }
            .au-statue{
                padding-top: 100px;
                font-size: 30px
            }
        }
        
    }
    
</style>
