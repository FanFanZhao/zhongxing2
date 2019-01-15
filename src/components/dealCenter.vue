<template>
	<div class="home home-box bg-main">
		<div class="main">
			<div class="main-l fl" >
				<div class="sidebar bg-part">
          <market></market>
        </div>
				<div class="notice_box bg-part" style="margin-top:8px;">
        <notice></notice>
      </div>
			</div>
			<div class="main-r">
        <div class="flex">
				<div class="chart_wrap flex column" style="width:67%;">
          <!-- <chart></chart> -->
          <div style="min-width:67%" class="bg-part">
            <!--<kline></kline>-->
			      <tv></tv>
          </div>
          <div class="trade-wrap part-l bg-part" style="padding-bottom:16px;">
						<trade></trade>
					</div>
          
        </div>
        <div class="deadl-wrap part-r" style="width:33%;margin:0 8px">
						<exchange></exchange>
					</div>
          </div>
				<!-- <div class="parts  flex between" > -->
					
					<!-- <div class="deatil_box bg-part" style="width:33%;margin:0 8px">
          <complete></complete>
        </div> -->
				<!-- </div> -->
        <div class="entrust_box bg-part" style="margin:8px 8px 0px 18px">
          <entrust></entrust>
        </div>
        <!-- <div class="entrust_box">
          <hisentrust></hisentrust>
        </div> -->
        <!-- <div class="deatil_box" style="background: #181b2a;">
            <detail></detail>
        </div> -->

				<!-- <div class="currency_box">
          <currency></currency>
        </div> -->
				<!-- <div class="depth-map flex btween" >
					<deal></deal>
				</div> -->

			</div>
		</div>

	</div>
</template>

<script>
import indexHeader from "@/view/indexHeader";
import notice from "@/components/webNotice";
import deal from "@/view/deal";
import exchange from "@/view/exchange";
import market from "@/view/market";
import trade from "@/view/trade";
import chart from "@/view/chart";
import entrust from "@/view/entrust2";
import hisentrust from "@/view/hisentrust";
import detail from "@/view/detail";
import currency from "@/view/currency";
import complete from "@/view/complete";
import tv from '@/view/tv'
export default {
  name: "dealCenter",

  components: {
    indexHeader,
    load:1,
    notice,
    deal,
    exchange,
    market,
    trade,
    chart,
    entrust,
    hisentrust,
    detail,
    currency,
    complete,
	  tv
  },
  data() {
    return {};
  },
  created() {
    this.address = localStorage.getItem("address") || "";

    // console.log(this.address)
  },
  mounted(){
    // console.log('wejdewhbewjdbewjdhbcwj')
    // if(this.load==1){
    //   console.log(1111)
    //   window.location.reload();
    //   this.load=2;
    // }

  }
};
</script>

<style scoped lang="scss">
.home-box {
  padding-top: 8px;
  .main {
      overflow: hidden;
    .main-l {
      width: 350px;
      height: 100%;
      margin: 0 8px;
      overflow: hidden;
      > div {
        padding: 0 10px;
        
      }
    }
    .main-r {
      margin-left: 348px;
      
      .parts {
        margin-top: 8px;
        max-height: 530px;

        > .part-l {
          // background: #181b2a;
          min-width: 67%;
          
        }
        > .part-r {
          width: 33%;
          > div {
            
            height: 100%;
            padding-bottom: 20px;
          }
        }
      }
      >div{
        
      }
      .depth-map {
        max-height: 500px;
        margin-top: 10px;
      }
    }
  }
}
</style>
