<template>
  
</template>

<script>
export default {
  data(){
    return {
      id:'',
      token:''
    }
  },
  methods:{
    getOrderDetail(){
      this.$http({
        url:'/api/ctoc/order_detail',
        method:'post',
        data:{id:id},
        headers:{Authorization:this.token}
      }).then(res => {
        layer.msg(res.data.message);
        if(res.data.type == 'ok'){
          
        }
      })
    },
    cancel(id){
      this.$http({
        url:'/api/ctoc/cancel',
        method:'post',
        data:{id:id},
        headers:{Authorization:this.token}
      }).then(res => {
        layer.msg(res.data.message);
        if(res.data.type == 'ok'){
          
        }
      })
    },
    confirmPay(id){
      this.$http({
        url:'/api/ctoc/pay',
        method:'post',
        data:{id:id},
        headers:{Authorization:this.token}
      }).then(res => {
        layer.msg(res.data.message);
        if(res.data.type == 'ok'){
          
        }
      })
    },
    confirm(id){
      this.$http({
        url:'/api/ctoc/confirm',
        method:'post',
        data:{id:id},
        headers:{Authorization:this.token}
      }).then(res => {
        layer.msg(res.data.message);
        if(res.data.type == 'ok'){
          
        }
      })
    }
  }
}
</script>

<style>

</style>
