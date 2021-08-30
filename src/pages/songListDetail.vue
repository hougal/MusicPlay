<template>
	<div>
		<h1>{{name}}</h1>
		<button>播放全部</button>
		<br/><br/>
		<table>
      <tr class="searchSong">
        <td class="songName">歌名</td>
        <td class="author">歌手</td>
        <td class="Duration">时长</td>
        <td class="album">专辑</td>
      </tr>
      <tr class="searchSong" v-for="item in list" :key="item.id">
        <td class="songName">
					<a @click="geturl(item)" href="javascript:;">{{item.name}}</a>
					<span @click="addurl(item)" href="javascript:;" class="add">
						<span class="iconfont icon-tianjia1">
							<span class="text">添加到歌单</span>
						</span>
					</span>
				</td>
        <td class="author"><router-link :to="`/search/${item.ar[0].name}`">{{item.ar[0].name}}</router-link></td>
        <td class="Duration">{{(item.dt/1000).toFixed(0)}}秒</td>
        <td class="album"><router-link :to="`/search/${item.al.name}`">{{item.al.name}}</router-link></td>
      </tr>
		</table>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name:'songListDetail',
	props:['id','name'],
	data(){
		return {
			list:[],
		}
	},
	methods: {
		geturl(item){
			this.$store.commit('GETURL', item)
		},
		addurl(item){
			this.$store.commit('ADDURL', [item,'isfm'])
		},
	},
	mounted() {
		axios.get(`http://localhost:3000/playlist/detail?id=${this.id}
			&cookie=${encodeURIComponent(sessionStorage.getItem('cookie'))}`).then(res =>{
			console.log(res.data)
				this.list = res.data.playlist.tracks
				this.$store.commit('GETURLLIST',this.list)
			})
	},
}
</script>

<style scoped>
h1{
	font-size: 50px;
	text-align: center;
}
.search {
  height: 100%;
  overflow-y: auto;
}
table{
	table-layout: fixed;
	width: 100%;
	margin-bottom: 100px;
}
td{
	border: 1px solid #999 ;
}
.searchSong {
	display: block;
  font-size: 20px;
  line-height: 40px;
}
.searchSong >.songName {
  width: 400px;
}
.searchSong >.author {
  width: 250px;
}
.searchSong >.Duration {
  width: 70px;
}
.searchSong >.album {
  width: 500px;
}
.add{
	float: right;
	cursor: pointer;
}
</style>