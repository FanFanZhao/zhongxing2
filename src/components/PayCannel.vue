<template>
	<div id="paycannel-box">
		<div class="content-header">
			<div class="content-header-left">
				<p class="status">{{status}}</p>
				<p class="status-text">{{statusText}}</p>
			</div>
			<div class="content-header-right">
				<p class="contact-text">{{$t('legal.contact')}}: {{datas.user_cash_info.account_number}}</p>
			</div>
		</div>
		<div class="total">
			<p class="total-text light_blue">{{$t('legal.totalmoney')}}：<span>{{datas.deal_money}}CNY</span></p>
		</div>
		<ul class="list">
			<li>
				<p class="left">{{$t('legal.buyer')}}</p>
				<p class="right">{{datas.user_cash_info.real_name}}</p>
			</li>
			<li>
				<p class="left">{{$t('legal.price')}}</p>
				<p class="right">{{datas.price}}CNY</p>
			</li>
			<li>
				<p class="left">{{$t('legal.number')}}</p>
				<p class="right">{{datas.number}}{{datas.currency_name}}</p>
			</li>
			<li>
				<p class="left">{{$t('legal.ordertime')}}</p>
				<p class="right">{{datas.create_time}}</p>
			</li>
			<li>
				<p class="left">{{$t('legal.reference')}}</p>
				<p class="right">{{datas.id}}</p>
			</li>
			<li>
				<!-- <button class="right" v-show="datas.is_sure == 0 || datas.is_sure == 3" type="button" @click="cannel()">{{$t('legal.ceilorder')}}</button> -->
				<button class="right blue_bg" v-show="comfirmBtn" type="button" @click="comfirm();">{{$t('legal.surepay')}}</button>
			</li>
		</ul>
		<!-- 取消订单弹窗 -->
		<div class="cannel-order" v-show="cannelBtn">
			<div class="cannel-order-modal">
				<div class="title">{{$t('legal.confirmceil')}}？</div>
				<div class="btns">
					<button type="button" @click="cannelBtns()">{{$t('legal.ceil')}}</button>
					<button class="comfirms" type="button" @click="cannelPay()">{{$t('legal.confirm')}}</button>
				</div>
			</div>
		</div>
		<!-- 确认订单弹窗 -->
		<div class="cannel-order" v-show="comfirmOrder">
			<div class="cannel-order-modal">
				<div class="title">{{$t('legal.paysure')}}</div>
				<div class="content tc">{{$t('legal.otherpay')}}</div>
				<div class="btns">
					<button type="button"  @click="cannelBtns()">{{$t('legal.ceil')}}</button>
					<button class="comfirms" type="button" @click="comfirmPay()">{{$t('legal.confirm')}}</button>
				</div>
			</div>
		</div>
		<!--密码框-->
    <div class="shdow flex alcenter center" v-if="isshow">
       <div class="psw_wrap flex column center">
          
            <p class="tc">请输入交易密码</p>
            <input class="mt20" type="password" v-model="psw" />
            <div class="btn_wrap flex alcenter center mt20">
              <div class="no" @click="isshow = false">取消</div>
              <div class="yes" @click="yes">确定</div>
            </div>
       </div>
    </div>
	</div>
</template>

<script>
	export default {

		data() {
			return {
				status: '',
				statusText: '',
				datas: {},
				cannelBtn: false,
				comfirmBtn: false,
				comfirmOrder: false,
				cannelOrder: false,
				isshow:false,
				psw:''

			};
		},
		created() {
			let token = window.localStorage.getItem("token") || "";
			let ids = this.$route.query.id;
			console.log(ids);
			if (token) {
				this.token = token;
				this.getList(ids);
			}
		},
		methods: {
			getList(id) {
				var i = layer.load();
				let _this = this;
				_this.$http({
					url: "/api/legal_deal",
					params: {
						id: id,
					},
					headers: {
						Authorization: _this.token
					}
				}).then(res => {
					layer.close(i);
					console.log(res);
					if (res.data.type == 'ok') {
						_this.datas = res.data.message;
						if (_this.datas.is_sure == 0) {
							_this.status = _this.$t('legal.paywait');
							_this.statusText = _this.$t('legal.waitplease');
						} else if (_this.datas.is_sure == 1) {
							_this.status = _this.$t('legal.finished');
							_this.statusText = _this.$t('legal.ordercomplete');
						} else if (_this.datas.is_sure == 2) {
							_this.status = _this.$t('legal.ceiled');
							_this.statusText = _this.$t('legal.orderceiled');
						} else if (_this.datas.is_sure == 3) {
							_this.status = _this.$t('legal.payed');
							_this.statusText = _this.$t('legal.otherpay');
						}

						if (_this.datas.is_sure == 0) {
							// _this.cannelBtn = true;
						} else {
							_this.cannelBtn = false;
						}
						if (_this.datas.is_sure == 3 && _this.datas.type == 'sell') {
							_this.comfirmBtn = true;
						} else {
							_this.comfirmBtn = false;
						}
					}
				});
			},
			cannel() {
				this.cannelBtn = true;
				document.getElementsByTagName("body")[0].className = "body";
				this.cannelOrder = true;
			},
			comfirm() {
				document.getElementsByTagName("body")[0].className = "body";
				this.comfirmOrder = true;
			},
			//密码框确认
			yes(){
				this.isshow = false
               var i = layer.load();
				let _this = this;
				let ids = this.$route.query.id;
				let params = {
					id: ids,
					pay_password:this.psw
				}
				_this.$http({
					url: '/api/legal_deal_user_sure',
					method: "post",
					data: params,
					headers: {
						Authorization: localStorage.getItem("token")
					}
				}).then(res => {
					this.psw = '';
					layer.close(i);
					console.log(res);
					layer.msg(res.data.message);
					if (res.data.type == 'ok') {
						setInterval(function() {
							// _this.$router.push({
							// 	path: '/LegalRecord'
							// });
							location.reload();
						}, 500)
					} else {
						_this.cannelOrder = false;
						_this.comfirmOrder = false;
					}

				});
			},
			// 取消按钮
			cannelBtns() {
				this.cannelBtn = false;
				document.body.removeAttribute("class", "body");
				this.cannelOrder = false;
				this.comfirmOrder = false;
			},
			// 取消订单
			cannelPay() {
				var i = layer.load();
				let _this = this;
				let ids = this.$route.query.id;
				let params = {
					id: ids,
				}
				_this.$http({
					url: '/api/user_legal_pay_cancel',
					method: "post",
					data: params,
					headers: {
						Authorization: localStorage.getItem("token")
					}
				}).then(res => {
					this.cannelBtn = false;
					layer.close(i);
					console.log(res);
					layer.msg(res.data.message);
					_this.getList(ids);
					_this.cannelOrder = false;
					_this.comfirmOrder = false;
					setTimeout(() => {
						location.reload();
					}, 1000);
				});
			},
			// 确认订单
			comfirmPay() {
				this.comfirmOrder = false;
				this.isshow = true;
			}

		}
	};
</script>

<style lang='scss'>
	$purple:#194B64;
    .status{
		background: none;
		color: #333!important;
	}
	.body {
		height: 100%;
		overflow: hidden;
	}

	#paycannel-box {
		width: 1200px;
		margin: 30px auto;

		>.content-header {
			width: 100%;
			background-color: #f8f8f8;

			>.content-header-left {
				display: inline-block;
				padding: 20px 30px;

				>p {
					font-size: 16px;
					line-height: 2.0;
				}
			}

			>.content-header-right {
				padding-left: 30px;

				>p {
					font-size: 16px;
					line-height: 2.0;
					position: relative;
					top: -20px;
				}
			}

		}

		>.total {
			>.total-text {
				padding-left: 30px;
				margin-top: 20px;
				font-size: 16px;
				background-color: #f8f8f8;
				line-height: 2.5;

				>span {
					font-size: 18px;
					color: $purple;
				}
			}
		}

		>.list {
			background-color: #f8f8f8;
			margin-top: 20px;
			padding: 20px 30px;

			>li {
				padding: 15px 0;

				>.left {
					width: 130px;
				}

				>p {
					display: inline-block;
				}

				>button {
					background-color: $purple;
					color: #fff;
					border-radius: 6px;
					padding: 10px;
					cursor: pointer;
				}

			}
		}

		>.cannel-order {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.3);
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			overflow: hidden;

			>.cannel-order-modal {
				width: 400px;
				margin: 200px auto;
				background-color: #fff;
				border-radius: 4px;

				>.title {
					padding: 15px;
					font-size: 16px;
					text-align: center;
					line-height: 2.0;
				}

				>.content {
					padding: 15px;
					color: $purple;
					line-height: 1.5;
				}

				>.select {
					padding: 15px;
					line-height: 2.0;

					>input {
						margin-right: 10px;
						width: 16px;
						height: 16px;
						position: relative;
						top: 3px;
					}
				}

				>.btns {
					width: 100%;
					border-top: 1px solid #e5e5e5;

					>button {
						width: 49%;
						line-height: 40px;
						border: none;
						outline: none;
						background-color: rgba(0, 0, 0, 0);
						cursor: pointer;
					}

					>button:last-child {
						border-left: 1px solid #e5e5e5;
					}
				}
			}
		}
		.shdow{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
  }
  .psw_wrap{
    width: 450px;
    height: 200px;
    background: #fff;
    border-radius: 5px;
  }
  .psw_wrap input{
    border: 1px solid #ccc;
    width: 70%;
    margin: 0 auto;
    line-height: 50px;
    margin-top: 20px;
    border-radius: 5px;
    padding: 0 12px;
  }
  .yes{
    margin-left: 50px;
    background: #f56c6c;
  }
  .no{
    background: #69c03f;
  }
  .yes,.no{
    padding: 8px 15px;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }
	}
</style>
