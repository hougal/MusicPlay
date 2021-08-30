<template>
<keep-alive>
    <div id="newsong">
      <div>
        <span @click="getNewSong(0)">全部</span>
        <span @click="getNewSong(7)">华语</span>
        <span @click="getNewSong(96)">欧美</span>
        <span @click="getNewSong(16)">韩国</span>
        <span @click="getNewSong(8)">日本</span>
        <hr />
      <div class="newsong" v-for="item in newsongs" :key="item.id" @click="getUrl(item)">
        <img class="newsongimg" :src="item.album.picUrl" />
        <span>{{ item.name }}</span>
      </div>
      </div>
    </div>

</keep-alive>
</template>

<script>
import axios from "axios";
export default {
  name: "newSong",
  data() {
    return {
      newsongs: [],
    };
  },
  methods: {
		getUrl(item){
			this.$store.commit('GETURL', [item, 'isfm'])
		},
    getNewSong(id) {
      axios({
        method: "GET",
        url: `http://localhost:3000/top/song?type=${id}`,
      }).then((respon) => {
        this.newsongs = respon.data.data;
      });
    },
  },
  mounted() {
    this.getNewSong(0);
  },
};
</script>

<style scoped>
#newsong {
  text-align: center;
}
#newsong > div {
  text-align: initial;
}
#newsong > div > span {
  margin-right: 10px;
  padding-bottom: 5px;
}
#newsong > div > span:hover {
  cursor: pointer;
  border-bottom: 3px solid #81aee0;
}
.newsong {
  display: inline-block;
  position: relative;
  width: 10%;
  height: 150px;
  margin-bottom: 80px;
  margin-right: 30px;
	cursor: pointer;
}
.newsong > img {
  height: 100%;
}
.newsong > span {
  position: absolute;
  text-align: center;
}
</style>