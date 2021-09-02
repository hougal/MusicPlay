<template>
	<div>
		手机号:<input type="text" placeholder="输入手机号" v-model="user"><br/>
		密&emsp;码:<input type="password" placeholder="输入密码" v-model="pwd"><br/>
      <button @click="login">登录</button>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name:'phone',
	data(){
		return {
			user:'',
			pwd:'',
		}
	},
	methods: {
		login(){
			axios.get(`http://localhost:3000/login/cellphone?phone=${this.user}&password=${encodeURIComponent(this.pwd)}`)
				.then(respon =>{
					if(respon.status == 200){
					this.$store.commit('ADDUSER', respon.data.profile)
					sessionStorage.setItem('cookie',respon.data.cookie)
          this.$store.state.iflogin = true;
        	this.$router.push({
        	  path: "/",
        	});
				}
			})
		}
	},
}
</script>

<style scoped>
button {
  margin-left: 40%;
  margin-top: 10px;
}
</style>