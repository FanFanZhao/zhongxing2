import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import homeContent from '@/view/homeContent'
import dealCenter from '@/components/dealCenter'
import userSetting from '@/components/userSetting'
import HelpCenter from '@/components/HelpCenter'
import c2c from '@/components/c2c'
import login from '@/components/login'
import UserCenter from '@/components/UserCenter'
import BindEmail from '@/view/BindEmail'
import authentication from '@/components/authentication'
import UserSecurity from '@/view/UserSecurity'
import register from '@/components/register'
import account from '@/components/account'
import accountCenter from '@/view/accountCenter'
import accountEntrust from '@/view/accountEntrust'
import accountSet from '@/view/accountSet'
import accountMessage from '@/view/accountMessage'
import setCash from '@/components/setCash'
import recharge from '@/view/recharge'
import rechargeMoney from '@/view/rechargeMoney'
import coinRecord from '@/view/coinRecord'
import noticeList from '@/components/noticeList'
import noticeDetail from '@/components/noticeDetail'
import aceite from '@/view/aceite'
import region from '@/view/region'
import chargeRecord from '@/view/chargeRecord'
import new_account from '@/components/new_account'
import finance from '@/view/accounts/finance'
import lever from '@/view/accounts/lever'
import finanrec from '@/view/accounts/finanrec'
import manger from '@/view/accounts/lever_manger'
import legal from '@/view/accounts/legal'
import legalAccount from '@/view/accounts/legalAccount'
import transferLegal from '@/view/accounts/transferLegal'
import currencyApply from '@/view/currency_apply'
import payOpts from '@/view/payOpts'
import currencyList from '@/view/currency_list'
import currencyEdit from '@/view/edit_currency'
import advice from '@/view/advice'
import aggrement from '@/view/aggrement' //隐私条款
import entrust from '@/view/entrust'
import hisentrust from '@/view/hisentrust'
import forgetLegalPwd from '@/components/ForgetLegalPwd'
//收款方式

import ForgetPwd from '@/components/ForgetPwd' //忘记密码
import ResetPwd from '@/components/ResetPwd' //重置密码密码
import bindPhone from '@/components/bindPhone'//绑定手机号
import LegalRecord from '@/components/LegalRecord' //法币交易记录
import LegalTradeSet from '@/components/LegalTradeSet' //法币交易设置
import LegalSeller from '@/components/LegalSeller' //法币商家详情
import LegalPay from '@/components/LegalPay' //法币交易待付款
import LegalPay2 from '@/components/LegalPay.1' //法币交易除待付款
import ResetLegalPwd from '@/components/ResetLegalPwd' //重置密码密码
import withdraw_address from '@/view/accounts/withdraw_address'
import PayCannel from '@/components/PayCannel'  //取消订单
import webNotice from '@/components/webNotice'

Vue.use(Router)
export default new Router({
	routes: [

		{
			path: '/',
			name: 'home',
			component: home,

			children: [{
					path: '',
					name: 'homeContent',
					component: homeContent

				},
				{
					path:'/legalTrade',
					component:() => import ('../components/LegalTrade.vue')
				},
				{
					path:'/legalPay',
					component:() => import ('../components/LegalPay.vue')
				},
				{
					path:'/legalPay2',
					component:() => import ('../components/LegalPay.1.vue')
				},
				{
					path:'/legalPayDetail',
					component:() => import ('../components/LegalPayDetail.vue')
				},
				{
					path:'/shopLegalPayDetail',
					component:() => import ('../components/shop_legal_pay_detail.vue')
				},
				{
					path:'/legalRecord',
					component:() => import ('../components/LegalRecord.vue')
				},
				{
					path:'/legalTradeSet',
					component:() => import ('../components/LegalTradeSet.vue')
				},
				{
					path:'/legalSeller',
					component:() => import ('../components/LegalSeller.vue')
				},
				{
					path:'/myLegalShops',
					component:() => import ('../components/MyLegalShops.vue')
				},
				{
					path:'/legalShopDetail',
					component:() => import ('../components/LegalShopDetail.vue')
				},
				{
					path:'/shopLegalRecord',
					component:() => import ('../components/shop_legal_record.vue')
				},
				{
					path: '/aggrement',
					name: 'aggrement',
					component: aggrement
				},
						
				{
					path: '/entrust',
					name: 'entrust',
					component: entrust
				},
				{
					path: '/hisentrust',
					name: 'hisentrust',
					component: hisentrust
				},
				
				{
					path: '/dealCenter',
					name: 'dealCenter',
					component: dealCenter
				},
				{
					path: '/HelpCenter',
					name: 'HelpCenter',
					component: HelpCenter,
				},
				{
					path: '/advice',
					name: 'advice',
					component: advice,
				},
			
				{
					path: '/userSetting',
					name: 'userSetting',
					component: userSetting,
					children: [{
						path: '',
						component: payOpts
					}]
				},
				{
					path: '/webNotice',
					name: 'webNotice',
					component: webNotice,
				},
				{
					path: '/c2c',
					name: 'c2c',
					component: () => import('../view/c2c/c2c.vue'),
					children:[
						{
							path:'',
							component:() => import('../view/c2c/C2cList.vue')
						},
						{
							path:'publishC2c',
							component:() => import('../view/c2c/PublishC2c.vue')
						},
						{
							path:'myPublishedC2c',
							component:() => import('../view/c2c/MyPublishedC2c.vue')
						},
						{
							path:'myTransaction',
							component:() => import('../view/c2c/MyTransaction.vue')
						},
					]
				},
				{
					path:'/orderDetail',
					component:() => import('../view/c2c/OrderDetail.vue')
				},
				{
					path:'/allRec',
					component:() => import('../view/accounts/allRec.vue')
				},
				{
					path:'/c2cDetail',
					component:() => import('../view/c2c/C2cDetail.vue')
				},
				{
					path: '/currencyApply',
					name: 'currencyApply',
					component: currencyApply
				},
				{
					path: '/currencyEdit',
					name: 'currencyEdit',
					component: currencyEdit
				},
				{
					path: '/currencyList',
					name: 'currencyList',
					component: currencyList
				},
				{
					path: '/components/noticeList',
					name: 'noticeList',
					component: noticeList
				},
				{
					path: '/components/bindEmail',
					name: 'BindEmail',
					component: BindEmail
				},
				{
					path: '/components/authentication',
					name: 'authentication',
					component: authentication
				},
				{
					path: '/components/resetPwd',
					name: 'ResetPwd',
					component: ResetPwd
				},
				{
					path: '/components/resetLegalPwd',
					name: 'ResetLegalPwd',
					component: ResetLegalPwd
				},
				{
					path: '/components/PayCannel',
					name: 'PayCannel',
					component: PayCannel
				},
				{
					path: '/userCenter',
					name: 'UserCenter',
					component: UserCenter,
					children:[
						{
							path:'',
							component:UserSecurity
						}
					]
				},
				{
					path: '/new_account',
					name: 'new_account',
					component: new_account,
					children: [

						{
							path: '/new_account',
							name: 'finance',
							component: finance
						},
						{
							path: '/lever',
							name: 'lever',
							component: lever
						},
						{
							path: 'legal',
							name: 'legal',
							component: legal
						},
						{
							path: '/legalAccount/:currency_id',
							name: 'legalAccount',
							component: legalAccount
						},
						{
							path: '/transferLegal',
							component: transferLegal
						},
						


					]

				}
			]
		},
		{
			path: '/forgetLegalPwd',
			name: 'forgetLegalPwd',
			component: forgetLegalPwd
		},
		// {
		// 	path:'/dealCenter',
		// 	name:'dealCenter',
		// 	component:dealCenter
		// },
         
		{
			path: '/components/login',
			name: 'login',
			component: login
		},
		
		{
			path: '/components/register',
			name: 'register',
			component: register
		},
		{
			path: '/forgetPwd',
			name: 'forgetPwd',
			component: ForgetPwd
		},
		{
			path: '/components/bindPhone',
			name: 'bindPhone',
			component: bindPhone
		},
		
		{
			path: '/components/noticeDetail',
			name: 'noticeDetail',
			component: noticeDetail
		},
		{
			path: '/account',
			name: 'account',
			component: account,
			children: [{
					path: '/accountCenter',
					name: 'accountCenter',
					component: accountCenter
				},
				{
					path: '/accountEntrust',
					name: 'accountEntrust',
					component: accountEntrust
				},
				{
					path: '/accountMessage',
					name: 'accountMessage',
					component: accountMessage
				},
				{
					path: '/accountSet',
					name: 'accountSet',
					component: accountSet
				},
				{
					path: '/recharge',
					name: 'recharge',
					component: recharge
				},
				{
					path: '/coinRecord',
					name: 'coinRecord',
					component: coinRecord
				},
				{
					path: '/rechargeMoney',
					name: 'rechargeMoney',
					component: rechargeMoney
				},
				{
					path: '/aceite',
					name: 'aceite',
					component: aceite
				},
				{
					path: '/region',
					name: 'region',
					component: region
				},
				{
					path: '/chargeRecord',
					name: 'chargeRecord',
					component: chargeRecord
				}

			]

		},

		// 杠杆管理
		{

			path: '/lever_manger',
			name: 'manger',
			component: manger,
		},
		// 财务记录
		{

			path: '/finanrec',
			name: 'finanrec',
			component: finanrec,
		},
		// 地址管理
		{

			path: '/withdraw_address',
			name: 'withdraw_address',
			component: withdraw_address,
		},
		{
			path: '/setCash',
			name: 'setCash',
			component: setCash
		},
		
	]
})
