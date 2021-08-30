<template>
	<div>
		<div id="rank1" class="clearfix" v-if="detail">
			<p>官方榜</p>
			<hr>
			<div class="songlist" v-for="item in rank" :key="item.id" @click="songListDetail(item)">
				<img :src="item.coverImgUrl">
				<span>{{item.name}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name:'rank',
	data(){
		return {
			rank:[],
			detail: true,
		}
	},
	methods: {
		songListDetail(item){
			this.detail = false
			this.$router.push(`/findSong/songListDetail/${item.id}/${item.name}`)
		},
	},
	mounted() {
		axios({
			method:'GET',
			url:'http://localhost:3000/toplist',
		}).then(respon =>{
			this.rank = respon.data.list
		})
	},
}
</script>

<style scoped>
#rank1 >div{
	width: 17%;
	height: 200px;
	margin: 20px 50px;
	margin-bottom: 30px;
	float: left;
	text-align: center;
}
#rank1 >div >img{
	width: 100%;
	height: 90%;
}
.songlist{
	cursor: pointer;
}
</style>