<template>
	<div>
		<h1>私人FM</h1>
    <table>
      <tr class="searchSong">
        <td class="songName">歌名</td>
        <td class="author">歌手</td>
        <td class="Duration">时长</td>
      </tr>
      <tr class="searchSong" v-for="item in fm" :key="item.id">
        <td class="songName">
					<a @click="geturl(item)" href="javascript:;">{{ item.name }}</a>
					<span @click="addurl(item)" href="javascript:;" class="add">
						<span class="iconfont icon-tianjia1">
							<span class="text">添加到歌单</span>
						</span>
					</span>
				</td>
        <td class="author">
          <router-link v-for="ite in item.artists" :key="ite.id" :to="`/search/${ite.name}`">{{ite.name}}&nbsp;</router-link>
        </td>
        <td class="Duration">{{ (item.duration / 1000).toFixed(0) }}秒</td>
      </tr>
    </table>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name:'selfFm',
	data(){
		return {
			fm:[],
		}
	},
	methods: {
		geturl(item) {
      this.$store.commit("GETURL", [item ,'isfm']);
			console.log(this.$store.state.url)
    },
		addurl(item){
			this.$store.commit('ADDURL', [item,'isfm'])
		},
	},
	mounted() {
			axios.get(`http://localhost:3000/personal_fm?cookie=${encodeURIComponent(sessionStorage.getItem('cookie'))}`)
			.then(res =>{
				this.fm = res.data.data
			})
	}
}
</script>

<style scoped>
h1{
	font-size: 40px;
	text-align: center;
	margin-top: 20px;
}
td {
  border: 1px solid #999;
}
table {
	position: absolute;
	top: 150px;
	left: 20%;
  table-layout: fixed;
  width: 80%;
}
.searchSong {
  display: block;
  font-size: 20px;
  line-height: 40px;
  margin: 0px 100px;
}
.searchSong .songName {
  width: 700px;
}
.searchSong .author {
  width: 300px;
	 text-overflow:ellipsis; 
	 overflow: hidden;
}
.searchSong .Duration {
  width: 100px;
}
.add{
	float: right;
	cursor: pointer;
}
</style>