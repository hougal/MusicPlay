<template>
  <div>
		<div v-if="detail">
			<p>热门标签:</p>
    	<hr />
    	<div class="songlist" v-for="item in songlist" :key="item.id" @click="songListDetail(item)">
    	  <img :src="item.coverImgUrl" />
      	<span>{{ item.name }}</span>
    	</div>
    	<div class="butt">
      	<button @click="getSongList">下一页</button>
    	</div>
	</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "songList",
  data() {
    return {
      songlist: [],
			before: 0,
			detail: true,
    };
  },
  methods: {
    getSongList() {
      axios({
        method: "GET",
        url: `http://localhost:3000/top/playlist/highquality?limit=32&before=${this.before}`,
      }).then((respon) => {
        this.songlist = respon.data.playlists;
				this.before = this.songlist[this.songlist.length-1].updateTime 
      });
    },
		songListDetail(item){
			this.detail = false
			this.$router.push(`/findSong/songListDetail/${item.id}/${item.name}`)
		}
  },
  mounted() {
		this.getSongList()
  },
};
</script>

<style scoped>
.songlist {
  display: inline-block;
  position: relative;
  width: 10%;
  height: 150px;
  margin-bottom: 80px;
  margin-right: 30px;
	cursor: pointer;
}
.songlist img {
  height: 100%;
}
.songlist span {
  position: absolute;
}
.butt {
  width: 200px;
  margin: 0 auto;
}
button {
  margin-left: 20px;
  margin-bottom: 60px;
}
</style>