import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
import router from './router'
import {Slider} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Slider)

new Vue({
	router,
	store,
  render: h => h(App),
	beforeCreate(){
		Vue.prototype.$bus = this
	},
}).$mount('#app')
