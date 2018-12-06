<template>
	<div id="paycannel-box">
		<div class="content-header">
			<div class="content-header-left">
				<p class="status">{{status}}</p>
				<p class="status-text">{{statusText}}</p>
			</div>
			<div class="content-header-right">
				<p class="contact-text">联系方式: {{datas.user_cash_info.account_number}}</p>
			</div>
		</div>
		<div class="total">
			<p class="total-text">交易总额：<span>{{datas.deal_money}}CNY</span></p>
		</div>
		<ul class="list">
			<li>
				<p class="left">买家</p>
				<p class="right">{{datas.user_cash_info.real_name}}</p>
			</li>
			<li>
				<p class="left">单价</p>
				<p class="right">{{datas.price}}CNY</p>
			</li>
			<li>
				<p class="left">数量</p>
				<p class="right">{{datas.number}}{{datas.currency_name}}</p>
			</li>
			<li>
				<p class="left">下单时间</p>
				<p class="right">{{datas.create_time}}</p>
			</li>
			<li>
				<p class="left">参考号</p>
				<p class="right">{{datas.id}}</p>
			</li>
			<li>
				<button class="right" v-show="datas.is_sure == 0" type="button" @click="cannel()">取消交易</button>
				<button class="right" v-show="comfirmBtn" type="button" @click="comfirm();">确认已收款</button>
			</li>
		</ul>
		<!-- 取消订单弹窗 -->
		<div class="cannel-order" v-show="cannelBtn">
			<div class="cannel-order-modal">
				<div class="title">确认取消交易？</div>
				<div class="btns">
					<button type="button" @click="cannelBtns()">取消</button>
					<button class="comfirms" type="button" @click="cannelPay()">确认</button>
				</div>
			</div>
		</div>
		<!-- 确认订单弹窗 -->
		<div class="cannel-order" v-show="comfirmOrder">
			<div class="cannel-order-modal">
				<div class="title">付款确认</div>
				<div class="content tc">请确认买家已向您付款</div>
				<div class="btns">
					<button type="button"  @click="cannelBtns()">取消</button>
					<button class="comfirms" type="button" @click="comfirmPay()">确认</button>
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
				cannelOrder: false

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
							_this.status = '待付款';
							_this.statusText = '请等待买家付款';
						} else if (_this.datas.is_sure == 1) {
							_this.status = '已完成';
							_this.statusText = "订单已完成";
						} else if (_this.datas.is_sure == 2) {
							_this.status = '已取消';
							_this.statusText = "订单已取消";
						} else if (_this.datas.is_sure == 3) {
							_this.status = '已付款';
							_this.statusText = "买家已付款，请核实后确认";
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
						// location.reload();
					}, 1000);
				});
			},
			// 确认订单
			comfirmPay() {
				var i = layer.load();
				let _this = this;
				let ids = this.$route.query.id;
				let params = {
					id: ids,
				}
				_this.$http({
					url: '/api/legal_deal_user_sure',
					method: "post",
					data: params,
					headers: {
						Authorization: localStorage.getItem("token")
					}
				}).then(res => {
					layer.close(i);
					console.log(res);
					layer.msg(res.data.message);
					if (res.data.type == 'ok') {
						setInterval(function() {
							_this.$router.push({
								path: '/LegalRecord'
							});
						}, 500)
					} else {
						_this.cannelOrder = false;
						_this.comfirmOrder = false;
					}

				});
			}

		}
	};
</script>

<style lang='scss'>
	$purple:#563BD1;
    .status{
		background: none;
		color: #333;
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
	}
</style>
