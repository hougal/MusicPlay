<template>
  <div>
    <div class="head-left">
      <a href="javascript:;">
        <router-link to="/findSong/recommend">Music</router-link>
      </a>
      <span id="history">
        <button @click="back"><span class="iconfont icon-zuo"></span></button>
        <button @click="forward"><span class="iconfont icon-you"></span></button>
      </span>
      <input type="text" placeholder="搜索音乐, 歌手, 歌词" v-model="searchkey" @keydown.enter="search"/>
    </div>
    <div class="head-right">
      <div>
        <a href="javascript:;" @click="login" v-if="!$store.state.iflogin">
          <span class="iconfont icon-denglu"></span>
          <span>未登录</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "nead",
	data(){
		return {
			searchkey:''
		}
	},
	methods: {
		seelogin(){
			axios.get(`http://localhost:3000/user/account&cookie=${encodeURIComponent(sessionStorage.getItem('cookie'))}`).then(res =>{
				console.log(res)
			})
		},
		forward(){
			this.$router.forward()
		},
		back(){
			this.$router.back()
		},
		search(){
			this.$router.push({
				path:`/search/${this.searchkey}`
			})
		},
		login(){
			this.$router.push({
				path:'/login'
			})
		}
	},
};
</script>

<style scoped>
div {
  height: 6vh;
  background-color: #d31d1d;
  line-height: 60px;
}
.head-left {
  float: left;
  margin-left: 100px;
}
#history{
	margin-left: 10px;
	margin-right: 10px;
}
#history>button{
	height: 35px;
	background-color: #d31d1d;
	border: 0;
}
#history>button:hover{
	border: 1px solid #666;
	cursor: pointer;
}
input{
	height: 25px;
	border: 0;
}
.head-right {
  float: right;
  position: relative;
  right: 100px;
}
</style>