<template>
  <div id="allrec">
    <div class="title">{{$t('account.allRec')}}</div>
    <div class="list">
      <div class="list-title flex">
        <span>{{$t('number')}}</span>
        <span>{{$t('account.record')}}</span>
        <span>{{$t('time')}}</span>
      </div>
      <ul>
        <li v-for="(item,index) in list" :key="index" class="flex">
          <span>{{item.change}}</span>
          <span>{{item.memo}}</span>
          <span>{{item.create_time}}</span>
        </li>
      </ul>
      <div class="tc" @click="getList">加载更多</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      token:'',
      page:1,
      list:[]
    }
  },
  created(){
    var token = window.localStorage.getItem('token') || '';
    if(token){
      this.token = token;
      this.getList()
    }
  },
  methods:{
    getList(){
      if(this.token){
        var i = layer.load();
        this.$http({
          url:'/api/wallet/legal_log',
          method:'post',
          data:{page:this.page},
          headers:{Authorization:this.token}
        }).then(res => {
          layer.close(i);
          if(res.data.type == 'ok'){
            var list = res.data.message.list;
            if(list.length){
              this.list = this.list.concat(list);
              this.page+=1;
            }
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
#allrec{
  margin: 30px auto 0;
  width: 1200px;
  >.title{
    font-size: 20px;
    line-height: 40px;
    padding: 5px 30px;
    background: #fff;
  }
  >.list{
    margin-top: 20px;
    padding: 10px 30px;
    line-height: 44px;
    background: #fff;
    .list-title{
      font-weight: bold;
    }
    span{
      flex:1;
    }
    span:nth-child(2){
      text-align: center;
    }
    span:nth-child(3){
      text-align: right;
    }
    li{
      font-size: 14px;
      border-top: 1px solid #eee;
    }
  }
  .tc{
    padding: 20px;
    cursor: pointer;
  }
}
</style>
