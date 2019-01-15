/**
 * Created by sunxiaofan on 2016/8/26.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
//引入组件
import App from './app.vue';
//主要页面组件
import gwjt from './views/gwjt.vue';
import zongbu from './views/zongbu.vue';
import wangsheng from './views/wangsheng.vue';
import chanye from './views/chanye.vue';
import jinrong from './views/jinrong.vue';
import jingwai from './views/jingwai.vue';
import overseas from './views/overseas.vue';
import login from './views/login.vue';

Vue.use(VueRouter);
var app = Vue.extend(App);
var router = new VueRouter();
//配置路由
router.map({
	'/gwjt':{
		name:'pagegwjt',
		component:gwjt
	},
	'/zongbu':{
		name:'pagegzongbu',
		component:zongbu
	},
	'/wangsheng':{
		name:'pagegwangsheng',
		component:wangsheng
	},
	'/chanye':{
		name:'pagegchanye',
		component:chanye
	},
	'/jinrong':{
		name:'pagegjinrong',
		component:jinrong
	},
	'/jingwai':{
		name:'jingwai',
		component:jingwai
	},
	'/overseas':{
		name:'overseas',
		component:overseas
	},
	'/login':{
		name:'loginpage',
		component:login
	}
});
//设置默认情况下打开的页面
router.redirect({
	'/':'login'
});
router.start(app,'#app');
//暴露路由接口调试
window.router = router;