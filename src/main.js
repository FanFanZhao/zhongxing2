// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './lang/lang'
import Axios from "axios"
import Util from './lib/utils'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import "@/assets/style/common.scss"
import VueSocketio from 'vue-socket.io'
import echarts from 'echarts'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store'
import {Slider,Input,Row,Col,Button,Form,FormItem,Radio,RadioGroup,Select,Option,Tabs,TabPane,Dialog,Card,Icon} from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Icon)
Vue.use(Slider)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(VueAwesomeSwiper)
Vue.prototype.$echarts = echarts
// Vue.prototype.url = 'http://47.75.200.255:8080/'
// Vue.prototype.url = 'https://www.beltandroad.io/'
window.eventBus = new Vue()
let bus = new Vue()
Vue.prototype.bus = bus
// Vue.use(VueSocketio, 'http://47.75.200.255:2220/');
Vue.use(VueSocketio, 'https://bankex.pro:2220/');
Vue.prototype.$changeTheme = function (type) {
	var head = document.querySelector('head');
	var link = document.querySelector('link#darkTheme');
	console.log(head, link);

	var theme = window.localStorage.getItem('theme');
	if (theme != type) {
		window.localStorage.setItem('theme', type);
	}
	if (type == 'light') {
		if (link == null) {
			console.log('lalalal');

			return;
		} else {
			head.removeChild(link);
			eventBus.$emit('theme', 'light')
		}
	} else {
		if (link == null) {
			link = document.createElement('link');
			link.id = 'darkTheme';
			link.rel = 'stylesheet';
			link.href = './static/theme/dark.css';
			head.appendChild(link);
			eventBus.$emit('theme', 'dark')
		} else {
			return;
		}
	}
}
Vue.prototype.$makeSocketId = function () {
	var d = new Date().getTime();
	console.log(d);
	var ran = parseInt(Math.random() * 888 + 101 + '');
	d = d + '' + ran;
	return d;

}
Vue.config.productionTip = false
Axios.interceptors.request.use(function (config) {
	if (config.url.indexOf('?') === -1) {
		config.url = config.url + '?_timespan=' + (new Date()).getTime()
	} else {
		config.url = config.url + '&_timespan=' + (new Date()).getTime()
	}
	// 在发送请求之前做些什么
	return config
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error)
})
Axios.interceptors.response.use(function (response) {
	if(response.data.type == '999'){
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("accountNum");
		window.localStorage.removeItem("user_id");
		window.localStorage.removeItem("extension_code");
		layer.msg('登录超时,请重新登录');
		setTimeout(function(){
			router.push('/components/login');	
			
		},2000)
	}
	return response;
}, function (error) {
	return Promise.reject(error);
});
//Axios.defaults.baseURL = ''
// Axios.defaults.headers = { 'Content-Type': 'application/json;charset=UTF-8' }application/x-www-form-urlencoded
// Axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Axios.defaults.transformRequest = [(data) => {
	return Qs.stringify(data)
}]
Vue.use(VueAxios, Axios);
Vue.use(Util);
Vue.filter('numFilter', function (value) {
	//截取当前数据到小数点后五位
	let transformVal = Number(value).toFixed(5)
	return Number(transformVal)
})


router.beforeEach((to,from,next) => {
   window.scrollTo(0,0);
   next();

})
//Vue.use(Ws, 'http://test.maxf.pub/users/chatRoom');
/* eslint-disable no-new */
new Vue({
	el: '#app',
	i18n,
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
