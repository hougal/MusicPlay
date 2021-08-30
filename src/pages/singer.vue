<template>
  <div>
    <div id="select">
      <form action="javascript:;">
        <span>语种:</span>
        <input type="radio" name="langtype" value="全部" />全部
        <input type="radio" name="langtype" value="华语" />华语
        <input type="radio" name="langtype" value="欧美" />欧美
        <input type="radio" name="langtype" value="日本" />日本
        <input type="radio" name="langtype" value="韩国" />韩国
        <input type="radio" name="langtype" value="其他" />其他
      </form>
      <form action="javascript:;">
        <span>分类:</span>
        <input type="radio" name="singertype" value="全部" />全部
        <input type="radio" name="singertype" value="男歌手" />男歌手
        <input type="radio" name="singertype" value="女歌手" />女歌手
        <input type="radio" name="singertype" value="乐队" />乐队
      </form>
      <form action="javascript:;">
        <span>筛选:</span>
        <input type="radio" name="select" value="热门" />热门
        <span v-for="(n, index) in letter" :key="index">
          <input type="radio" name="select" class="aaa" :value="index" />{{ n }}
        </span>
      </form>
    </div>
    <div class="clearfix">
      <div class="singer" v-for="item in singers" :key="item.id" @click="seasinger(item.name)">
          <img :src="item.img1v1Url" />
          <span>{{ item.name }}</span>
      </div>
    </div>
    <div id="btn">
      <button @click="getSingers(--page)">上一页</button>
      <button @click="getSingers(++page)">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "singer",
  data() {
    return {
      lett: ["A", "B", "C"],
      singers: [],
      page: 0,
    };
  },
  computed: {
    letter() {
      return "ABCDEFGHIJKLPMOPQRSTUVWXYZ".split("");
    },
  },
  methods: {
		seasinger(name){
			this.$router.push({
				path:`/search/${name}`
			})
		},
    getSingers(page) {
      if (page < 0) {
        this.page++;
        return 0;
      }
      axios({
        method: "GET",
        url: `http://localhost:3000/top/artists?offset=${page}&limit=30`,
      }).then((respon) => {
        this.singers = respon.data.artists;
      });
    },
  },
  mounted() {
    this.getSingers(this.page);
  },
};
</script>

<style scoped>
#select {
  margin-top: 40px;
}
.singer {
  float: left;
  width: 14%;
  height: 200px;
  margin-top: 40px;
  margin-right: 5%;
  text-align: center;
	cursor: pointer;
}
.singer > img {
  width: 100%;
}
#btn {
  text-align: center;
}
</style>