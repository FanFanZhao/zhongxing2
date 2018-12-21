<template>
	<div id="legaltrade-box" class="clr-part">
		<div class="buy-sell flex bg-part">
			<div class="buy-box bdr-part">
				<div class="title">{{$t('legal.buy')}}</div>
				<ul :class="['flex',{'now':type == 'sell'}]">
					<li v-for="(coin,index) in legals" :key="index" :class="{'current':coin.id == id}" @click="changeClassify(coin.id,1,coin.name)">{{coin.name}}</li>
				</ul>
			</div>
			<div class="sell-box">
				<div class="title">{{$t('legal.sell')}}</div>
				<ul :class="['flex',{'now':type=='buy'}]">
					<li v-for="(coin,index) in legals" :key="index" :class="{'current':coin.id == id}" @click="changeClassify(coin.id,2,coin.name)">{{coin.name}}</li>
				</ul>
			</div>
			<span class="record light_blue" @click="recordList()">{{$t('legal.record')}}</span>
		</div>
		<div class="list-box bg-part">
			<div class="list-title flex ft14">
				<div>{{$t('legal.shoper')}}</div>
				<div>{{$t('legal.number')}}</div>
				<div>{{$t('legal.limit')}}</div>
				<div>{{$t('legal.price')}}</div>
				<div>{{$t('legal.pay')}}</div>
				<div>{{$t('legal.do')}}</div>
			</div>
			<ul class="list ft12">
				<li v-for="(item,index) in list" :key="index" class="flex">
					<div class="flex alcenter">
						<!-- <img :src="url+'upload/'+item.currency_logo" alt=""> -->
						<div class="head">{{item.seller_name | formatTime}}</div>
						<div class="flex column center">
							<span class="light_blue sellerName">{{item.seller_name}}</span>
						<span class="currencyName">{{item.currency_name}}</span>
						</div>
					</div>
					<div class="flex alcenter">{{item.surplus_number}}</div>
					<div class="flex alcenter">{{(item.limitation.min-0).toFixed(2)}}-{{(item.limitation.max-0).toFixed(2)}}CNY</div>
					<div class="flex alcenter">{{item.price}}</div>
					<div class="flex alcenter">
						<img  src="../assets/images/zfb_icon.png" />
						<img src="../assets/images/wx_icon.png" />
						<img src="../assets/images/bank_icon.png" />
					</div>
					<div class="flex alcenter end"  @click="buySell(item.price,item.limitation.min,item.limitation.max,item.id,item.type,item.surplus_number)">
						<button class="btn blue_bg">{{classify}}</button>
					</div>
				</li>
			</ul>
			<!-- 分页 -->
			<paginate v-model="currentpage" v-show="pages" :page-count="pages" :click-handler="pagesList" :prev-text="'上一页'" :next-text="'下一页'"
			 :container-class="'pages'">
			</paginate>
		</div>
		<div class="modal" v-show="shows">
			<div class="mask" @click="closeBtn()"></div>
			<div class="content">
				<div class="content-list layerBg">
					<p class="close light_blue" @click="close">X</p>
					<p class="title">{{classify}}{{name}}</p>
					<p class="price">{{$t('legal.price')}}{{prices}}</p>
					<div class="trade">
						<p class="cur" :class="['trade-name',{'active':types == 'trade'}]" @click="tabClassify(1)">{{name}}{{$t('legal.transaction')}}</p>
						<p class="cur" :class="['trade-num',{'active':types == 'num'}]" @click="tabClassify(2)">{{classify}}{{$t('legal.number')}}</p>
					</div>
					<div class="totals-num bdr-part">
						<input v-if=" types == 'trade' " class="number" type="number" :placeholder='$t("legal.inwant")+money_type+$t("legal.total")' v-model="nums">
						<input v-else class="number" type="number" :placeholder='$t("legal.inwant")+money_type+$t("legal.number")' v-model="nums">
						<button class="all clr-part" type="button" v-if=" type== 'buy' " @click="allMoney();">{{$t('legal.sellall')}}</button>
						<button class="all clr-part" type="button" v-else @click="allMoney();">{{$t('legal.buyall')}}</button>
						<span class="name">{{name01}}</span>
					</div>
					<div class="maxnum">{{$t('legal.limit')}}{{(minNum-0).toFixed(2)}}-{{(maxNum-0).toFixed(2)}}</div>
					<div class="trade-totals">
						<p class="total-price">{{$t('legal.totalmoney')}}</p>
						<p class="prices" v-if=" types == 'trade' ">￥{{nums | toFixeds}}</p>
						<p class="prices" v-else>￥{{nums * prices | toFixeds}}</p>
					</div>
					<p class="tip">{{$t('legal.conactceil')}}</p>
					<div class="btns">
						<p class="cannel">{{time}}s{{$t('legal.autoceil')}}</p>
						<button class="comfirm blue_bg" type="button" @click="buyOrder()">{{$t('legal.placeorder')}}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Paginate from 'vuejs-paginate';
	import Vue from 'vue'
	Vue.filter('formatTime', function (value) {
		return value.substring(0,1)
	})
	export default {
		components: {
			Paginate
		},
		data() {
			return {
				legals: [],
				list: [],
				type: 'sell',
				id: 0,
				page: 1,
				classify: this.$t('legal.buy'),
				name: 'CNY',
				pages: 0,
				prices: 0,
				minNum: 0,
				maxNum: 0,
				names: 'CNY',
				time: '60',
				shows: false,
				types: 'trade',
				nums: '',
				totalNums: '0.00',
				ID:'',
				money_type:'',
				currentpage:1,
				name01:'CNY',
				numbers:'',
				allnum:'',
				idx:1,
				timer:''
			};
		},

		created() {
			console.log(window.location);

			let token = window.localStorage.getItem("token") || "";
			if (token) {
				this.token = token;
				this.getCoins();
			}
		},
		filters: {
			toFixeds: function(value) {
				value = Number(value);
				return value.toFixed(2);
			}
		},
		methods: {
			//关闭弹框
			close(){
				this.types = 'trade';
				this.name01 = 'CNY';
			   this.shows = false;
			    clearInterval(this.timer); //弹框关闭清除定时器
			},
			getCoins() {
				var i = layer.load();
				this.$http({
					url: "/api/currency/legal_list"
				}).then(res => {
					layer.close(i);
					if (res.data.type == "ok") {
						var list = res.data.message;
						if (list.length) {
							this.legals = list;
							var id = list[0].id;
							this.name = list[0].name;
							this.getList("sell", id, 1);
						}
					}
				});
			},
			getList(type, id, page) {
				this.type = type;
				this.id = id;
				this.page = page;
				var i = layer.load(); 
				this.$http({
					url: "/api/legal_deal_platform",
					params: {
						type: type,
						page: page,
						currency_id: id
					},
					headers: {
						Authorization: this.token
					}
				}).then(res => {
					console.log(res)
					layer.close(i);
					if (res.data.type == 'ok') {
						
						this.list = res.data.message.data;
						let total = parseInt(res.data.message.total);
						if (total > 10) {
							this.pages = Math.ceil(total / 10)

						}
					}else{
						this.list = []
						layer.msg(res.data.message)
					}
				});
			},
			// 点击改变选中分类
			changeClassify(ids, type, names) {
				let _this = this;
				console.log(type);
				_this.id = ids;
				if (type == 1) {
					_this.type = 'sell';
					_this.classify = _this.$t('legal.buy')
				} else {
					_this.type = 'buy';
					_this.classify = _this.$t('legal.sell')
				}
				_this.name = names;
				_this.getList(_this.type, ids, 1)

			},
			// 分页改变
			pagesList(pageNum) {
               
				console.log(pageNum)
				let _this = this;
				_this.currentpage = pageNum;
				_this.getList(_this.type, _this.id, pageNum);
			},
			// 出售或者购买按钮
			buySell(prices, min, max,id,type,allnum) {
				// this.nums = '';
				// this.numbers = '';
				console.log(type)
				if(type == 'sell'){
					// this.money_type = '购买'
					this.money_type=this.$t('legal.buy');
				}else if(type == 'buy'){
					// this.money_type = '出售'
					this.money_type=this.$t('legal.sell');
				}
				let _this = this;
				_this.shows = true;
				_this.ID = id;
				_this.time = 60;
				document.getElementsByTagName("body")[0].className = "body";
				_this.prices = prices;
				_this.minNum = min;
				_this.maxNum = max;
				_this.allnum = allnum;
			      _this.timer = setInterval(function() {
					_this.time--;
					if (_this.time <= 0) {
						_this.shows = false;
						document.body.removeAttribute("class", "body");
						//清除定时器
						clearInterval(_this.timer);
					}
				}, 1000)
			},
			// 交易或数量切换
			tabClassify(num) {
				this.nums = '';
				this.idx = num;
				if (num == 1) {
					this.types = 'trade';
					this.name01 = 'CNY'
				} else {
					// this.numbers = this.nums/this.prices;
					this.types = 'num';
					this.name01 = this.name
				}
			},
			// 全部卖出或买入
			allMoney() {
				if(this.types == 'trade'){

					this.nums = this.maxNum;
				} else {
					this.nums = this.allnum;
				}
			},
			// 下单
			buyOrder() {
				
				let _this = this;
				let means = 'money';
				let ids = window.localStorage.getItem("user_id");
				let token = window.localStorage.getItem("token") || "";
				// if (_this.nums) {
					if (_this.types == 'trade') {
						means = 'money';
					} else {
						means = 'number';
					};
					if(_this.nums<=0){
						if(this.type == 'sell' ){
							if (_this.types == 'trade') {
								return	layer.msg(_this.$t('lay.buymoney'));
							}else{
								return layer.msg(_this.$t('lay.buynum'));
							}
						}else {
							if (_this.types == 'trade') {
							
								return layer.msg(_this.$t('lay.sellmoney'));
							}else{
							    return layer.msg(_this.$t('lay.sellnum'));
							}
						}
					}
					
					
					let datas = {
						id: _this.ID,
						means: means,
						value: _this.nums
					};
					//获取实名认证状态
					var review_status; //是否实名认证
					var is_Billing; //是否设置收款方式 1 已设置 0 未设置
					var load = layer.load();
					this.$http({
								url:'/api/user/info',
								method:'GET',
								data:{},
								headers:{Authorization:this.token}
							}).then(res => {
								layer.close(load);
								console.log(res)
								if(res.data.type == 'ok'){
									review_status = res.data.message.review_status;
									is_Billing =  res.data.message.is_Billing;
									if(review_status!=2){
									layer.msg(_this.$t('lay.tname'));
									return false;
								}else if(is_Billing == 0){
									layer.msg(_this.$t('lay.payset'));
									setTimeout(() => {
										 this.$router.push('/userSetting');
									}, 1000);
								  
								   return;
								}
								else{
									_this.buyHttp('/api/do_legal_deal', datas, function(res) {
									
									if(res.data.type == 'ok'){
										// layer.msg(res.data.message)
									if (res.data.message.data.type == 'sell') {
										layer.msg(res.data.message.msg)
										setTimeout(function() {
											_this.$router.push({path:'/legalPay',query:{id:res.data.message.data.id}});
										}, 500)
									} else {
										layer.msg(res.data.message.msg)
										setTimeout(function() {
											_this.$router.push({path:'/components/payCannel',query:{id:res.data.message.data.id}});
										}, 500)
									}
									}else{
										console.log(res.data.message)
									layer.msg(res.data.message);
									}
								});
								}
								}
								
							})
					
					
				// } else {
					
					
				// }
			},
			// 请求
			buyHttp(urls, params, callback) {
				var i = layer.load();
				let _this = this;
				_this.$http({
					url: urls,
					method: "post",
					data: params,
					headers: {
						Authorization: localStorage.getItem("token")
					}
				}).then(res => {
					layer.close(i);
					console.log(res);
					if (res.data.type == 'ok') {
						layer.msg(res.data.message.msg)
						callback && callback(res)
					} else {
						if (res.data.type == '998') {
							layer.msg(res.data.message)
							setTimeout(() => {
								_this.$router.push('/legalTradeSet');
							}, 500);
						}
						if(res.data.type == 'error'){
							layer.msg(res.data.message)
						}

					}
				});
			},
			// 跳转订单记录
			recordList(){
				let _this = this;
				_this.$router.push({path:'/LegalRecord',query:{id:_this.id}});
			}

		}
	};
</script>

<style lang='scss'>
	$purple:#194B64;
    .cur{
		cursor: pointer;
	}
	.body {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.btn{
		cursor: pointer;
	}
	.number{
		background: #acafc3;
	}
	.sellerName,.currencyName{
		line-height: normal;
	}
	.sellerName{
		margin-bottom: 5px;
	}
  
	#legaltrade-box {
		width: 1200px;
		margin: 30px auto;

		>.buy-sell {
			position: relative;
			padding: 20px 20px 20px 0;
			border-radius: 3px;
			>.buy-box {
				padding: 20px;
				border-right: 1px solid #ccc;
			}

			>.sell-box {
				padding: 20px;
			}

			>div {
				width: 50%;
				font-weight: bold;

				ul {
					margin-top: 20px;

					li {
						margin-right: 20px;
						cursor: pointer;
					}
				}

				>.now {
					>.current {
						border-bottom: 2px solid #194B64;
						color: #194B64;
					}
				}
			}
			>.record{
				cursor: pointer;
				font-size: 16px;
				position: absolute;
				right: 20px;
				text-align: right;
				top: 30px;
			}
		}

		>.list-box {
			padding: 20px;
			border-radius: 3px;
            min-height: 600px;
			>.list-title {
				    padding-bottom: 8px;
                    border-bottom: 1px solid #eee;
				>div {
					flex: 1;
				}

				>div:last-child {
					text-align: right;
				}
			}

			>.list {
				>li {
					padding: 20px 0;
					border-bottom: 1px solid #e5e5e5;

					>div {
						flex: 1;
						line-height: 36px;
						.head{
							width: 36px;
							height: 36px;
							border-radius: 50%;
							margin-right: 10px;
							background: #5D8CC2;
							color: #fff;
							text-align: center;
							font-size: 14px;
						}
						>img {
							width: 20px;
							margin: 0 6px;
						}

						>span {
							display: inline-block;
							position: relative;
							top: -10px;
							color: $purple;
						}
					}

					>div:last-child {
						text-align: right;

						>button {
							background-color: $purple;
							padding: 8px 20px;
							color: #fff;
							border-radius: 4px;
						}
					}
				}
			}

			>.pages {
				display: flex;
				justify-content: center;
				margin-top: 30px;

				>li {
					padding: 10px;
					border: 1px solid #e5e5e5;
					margin-right: 10px;
					border-radius: 6px;
				}

				>.active {
					border: 1px solid $purple;
					color: $purple;
				}
			}
		}

		>.modal {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			overflow: hidden;

			>.mask {
				width: 100%;
				height: 100%;
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: #000;
				opacity: 0.3;
				overflow: hidden;
			}

			>.content {
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0);
				position: fixed;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				z-index: 100;
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
                
				>.content-list {
					width: 400px;
					border-radius: 10px;
					margin: auto;
					background-color: #26292b;
					padding: 15px;
					position: relative;
					.close{
						position: absolute;
						top:5px;
						right: 10px;
						cursor: pointer;
					}

					>.title {
						font-size: 16px;
						line-height: 2.0;
						text-align: center;
					}

					>.trade {
						font-size: 0;

						>p {
							display: inline-block;
							font-size: 15px;
							margin: 15px;
							margin: 10px 10px 10px 0;
							line-height: 1.5;
							padding-bottom: 5px;
						}

						.active {
							border-bottom: 1px solid $purple;
							color: $purple;
						}
					}

					>.totals-num {
						width: 100%;
						height: 40px;
						border: 1px solid #eee;
						font-size: 0;

						>input {
							line-height: 38px;
							padding-left: 10px;
							font-size: 15px;
						}

						>button {
							background-color: rgba(0, 0, 0, 0);
							float: right;
							font-size: 15px;
							line-height: 20px;
							margin-right: 15px;
							margin-top: 9px;
							padding-left: 20px;
							border-left: 1px solid #e5e5e5;
						}

						>span {
							font-size: 15px;
							float: right;
							line-height: 38px;
							margin-right: 20px;
						}
					}

					>.maxnum {
						margin-top: 15px;
					}

					>.trade-totals {
						width: 100%;
						font-size: 0;
						height: 40px;
						line-height: 40px;

						>.total-price {
							float: left;
							font-size: 15px;
						}

						>.prices {
							font-size: 15px;
							float: right;


						}
					}

					>.tip {
						color: $purple;
						font-size: 14px;
					}

					>.btns {
						margin-top: 10px;
						font-size: 0;
						height: 40px;

						>.cannel {
							width: 48%;
							height: 40px;
							line-height: 40px;
							background-color: #acafc3;
							color: #333;
							text-align: center;
							border-radius: 6px;
							float: left;
							font-size: 15px;
						}

						>.comfirm {
							float: right;
							width: 48%;
							height: 40px;
							line-height: 40px;
							background-color: $purple;
							border-radius: 6px;
							font-size: 15px;
							color: #fff;
						}
					}

				}
			}
		}
	}
</style>
