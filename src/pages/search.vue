<template>
  <div class="search">
    <h1>搜索结果: {{searchkey}}</h1>
    <table>
      <tr class="searchSong">
        <td class="songName">歌名</td>
        <td class="author">歌手</td>
        <td class="Duration">时长</td>
        <td class="album">专辑</td>
      </tr>
      <tr class="searchSong" v-for="item in result.songs" :key="item.id">
        <td class="songName">
					<a @click="geturl(item)" href="javascript:;">{{ item.name }}</a>
					<span @click="addurl(item)" href="javascript:;" class="add">
						<span class="iconfont icon-tianjia1">
							<span class="text">添加到歌单</span>
						</span>
					</span>
				</td>
        <td class="author">
          <router-link v-for="ite in item.ar" :key="ite.index" :to="`/search/${ite.name}`">{{ite.name}}&nbsp;</router-link>
        </td>
        <td class="Duration">{{ (item.dt / 1000).toFixed(0) }}秒</td>
        <td class="album">
          <router-link :to="`/search/${item.al.name}`">{{
            item.al.name
          }}</router-link>
        </td>
      </tr>
    </table>
    <div id="btn">
      <button @click="getsearchs(--page)">上一页</button>
      <button @click="getsearchs(++page)">下一页</button>
    </div>
  </div>
</template>

<script scoped>
import axios from "axios";
export default {
  name: "search",
  props: ["searchkey"],
  data() {
    return {
      result: { songs: 0 },
      page: 0,
    };
  },
  methods: {
    geturl(item) {
      this.$store.commit("GETURL", [item]);
			console.log(item)
    },
		addurl(item){
			this.$store.commit('ADDURL', [item])
		},
    getsearchs(page) {
      if (page < 0) {
        this.page++;
        return 0;
      }
      axios({
        method: "GET",
        url: `http://localhost:3000/cloudsearch?keywords=${this.searchkey}&offset=${page * 30}&limit=30`,
      }).then((respon) => {
        this.result = respon.data.result;
      });
    },
  },
  watch: {
    searchkey() {
      this.page = 0;
      axios({
        method: "GET",
        url: `http://localhost:3000/cloudsearch?keywords=${this.searchkey}`,
      }).then((respon) => {
        this.result = respon.data.result;
      });
    },
  },
  beforeMount() {
    axios({
      method: "GET",
      url: `http://localhost:3000/cloudsearch?keywords=${this.searchkey}`,
    }).then((respon) => {
      this.result = respon.data.result;
    });
  },
};
</script>

<style scoped>
h1 {
  margin: 30px 0;
  margin-left: 20px;
  font-size: 25px;
}
.search {
  height: 100%;
  overflow-y: auto;
}
td {
  border: 1px solid #999;
}
table {
  table-layout: fixed;
  width: 100%;
}
.searchSong {
  display: block;
  font-size: 20px;
  line-height: 40px;
  margin: 0px 100px;
}
.searchSong .songName {
  width: 600px;
}
.searchSong .author {
  width: 200px;
	 text-overflow:ellipsis; 
	 overflow: hidden;
}
.searchSong .Duration {
  width: 70px;
}
.searchSong .album {
  width: 400px;
}
#btn {
  text-align: center;
	margin: 30px 0;
}
.add{
	float: right;
	cursor: pointer;
}
</style>